import { cookies } from "next/headers";
import { getAuthenticatedAdminEmail } from "../../admin/auth";
import { verifyMemberSession } from "../../lib/member-session";
import { digest, runStory, StoryError } from "../../lib/tiny-worlds.mjs";

export const dynamic = "force-dynamic";
const LIMIT_BYTES = 12_000_000;
const activity = new Map<string, { since: number; count: number; busy: boolean }>();

function configuration() {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    secret: process.env.TINY_WORLDS_SESSION_SECRET || process.env.MEMBER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET,
    model: process.env.TINY_WORLDS_MODEL || "gpt-5.4-mini",
    imageModel: process.env.TINY_WORLDS_IMAGE_MODEL || "gpt-image-2.5-flare"
  };
}
async function identity() {
  const jar = await cookies();
  const member = await verifyMemberSession(jar.get("industries_366_member")?.value);
  const email = member?.email || await getAuthenticatedAdminEmail();
  return email ? await digest("366-tiny-worlds:" + email.trim().toLowerCase()) : null;
}
function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
export async function GET() {
  const config = configuration();
  return json({
    configured: Boolean(config.apiKey && config.secret && config.secret.length >= 32),
    authenticated: Boolean(await identity())
  });
}
async function readBody(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new StoryError("Send a JSON story request.", 415);
  if (Number(request.headers.get("content-length")) > LIMIT_BYTES) throw new StoryError("The reference pictures are too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new StoryError("The story request is empty.");
  const decoder = new TextDecoder();
  let text = "", size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > LIMIT_BYTES) { await reader.cancel(); throw new StoryError("The reference pictures are too large.", 413); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof StoryError) throw error;
    throw new StoryError("The story request could not be read.");
  } finally { reader.releaseLock(); }
}
export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin) return json({ error: "Open Tiny Worlds on this website to create a story." }, 403);
    const owner = await identity();
    if (!owner) return json({ error: "Sign in to your 366 account to create a story." }, 401);
    const config = configuration();
    if (!config.apiKey || !config.secret || config.secret.length < 32)
      return json({ error: "Story creation is not connected yet. Your cast and saved books are still available." }, 503);
    const body = await readBody(request);
    const now = Date.now();
    for (const [id, entry] of activity) if (now - entry.since > 3600000 && !entry.busy) activity.delete(id);
    const current = activity.get(owner) || { since: now, count: 0, busy: false };
    if (current.busy) return json({ error: "Your previous page is still being created." }, 409);
    if (current.count >= 24) return json({ error: "You have reached the hourly story limit. Come back a little later." }, 429);
    current.count++; current.busy = true; activity.set(owner, current);
    const aborter = new AbortController();
    const abort = () => aborter.abort();
    request.signal.addEventListener("abort", abort, { once: true });
    if (request.signal.aborted) aborter.abort();
    const stream = new ReadableStream({
      async start(controller) {
        let closed = false;
        const emit = (event: unknown) => {
          if (closed || aborter.signal.aborted) return;
          try { controller.enqueue(new TextEncoder().encode(JSON.stringify(event) + "\n")); }
          catch { closed = true; aborter.abort(); }
        };
        // Heartbeats keep the stream alive during image generation.
        const heartbeat = setInterval(() => emit({ type: "heartbeat" }), 12000);
        try { await runStory(body, owner, config, emit, aborter.signal); }
        catch (error) {
          emit({ type: "error", error: error instanceof StoryError ? error.message : "This page could not be created. Your saved story is safe." });
        } finally {
          clearInterval(heartbeat);
          current.busy = false;
          request.signal.removeEventListener("abort", abort);
          if (!closed) { try { controller.close(); } catch { /* cancelled stream */ } }
        }
      },
      cancel() { aborter.abort(); }
    });
    return new Response(stream, { headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform", "X-Content-Type-Options": "nosniff",
      "X-Accel-Buffering": "no"
    } });
  } catch (error) {
    return json({ error: error instanceof StoryError ? error.message : "Unable to read this story request." },
      error instanceof StoryError ? error.status : 500);
  }
}
