import test from "node:test";
import assert from "node:assert/strict";
import { startState, readState, signState, digest, validateImage, prepareStory, runStory, callResponses } from "../app/lib/tiny-worlds.mjs";

const secret = "test-secret-only-not-a-real-credential-12345678";
const owner = "test-user";
const picture = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
const cast = [{ id: "cali", name: "Cali", appearance: "Three-legged cat; rear LEFT leg missing completely; no nub.", personality: "Kind and brave." }];
const start = { action: "start", cast, setting: "Whiskerton Lands", style: "storybook", references: [] };
const page = {
  title: "The Lantern", text: "Cali followed a warm light. A tiny door appeared beneath the old tree.",
  choices: ["Open the door", "Ask the owl", "Follow the river"],
  illustration: "Three-legged Cali sees the lantern beside a tree door.",
  summary: "Cali found a lantern and a mysterious tree door in Whiskerton."
};
function fakeApi(failImage = false) {
  const calls = [];
  const fetch = async (url, options) => {
    assert.equal(url, "https://api.openai.com/v1/responses");
    assert.equal(options.headers.Authorization, "Bearer test-only");
    const body = JSON.parse(options.body); calls.push(body);
    if (body.tools && failImage) return new Response("unavailable", { status: 500 });
    return Response.json({ status: "completed", output: body.tools
      ? [{ type: "image_generation_call", result: picture.split(",")[1] }]
      : [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(page) }] }] });
  };
  return { calls, config: { secret, apiKey: "test-only", fetch } };
}
test("canonical character details survive signing and bookmarks belong to one user", async () => {
  const state = await startState(start, owner);
  const token = await signState(state, secret);
  assert.deepEqual((await readState(token, secret, owner)).cast[0].appearance, cast[0].appearance);
  await assert.rejects(readState(token, secret, "another-user"), /account/);
  await assert.rejects(readState(token.slice(0, -1) + (token.endsWith("a") ? "b" : "a"), secret, owner), /changed/);
  await assert.rejects(readState(token, secret, owner, state.expiresAt + 1), /expired/);
});
test("invalid character input, duplicate IDs and remote image URLs are rejected", async () => {
  await assert.rejects(startState({ ...start, cast: [] }, owner), /one to four/);
  await assert.rejects(startState({ ...start, cast: [cast[0], cast[0]] }, owner), /different ID/);
  await assert.rejects(startState({ ...start, setting: "x".repeat(1501) }, owner), /Setting/);
  assert.throws(() => validateImage("https://internal.example/picture"), /reference picture/);
  assert.throws(() => validateImage("data:image/webp;base64,YWJj"), /file type/);
  assert.equal(validateImage(picture), picture);
});
test("opening scene writes exactly three choices and invokes Responses image generation", async () => {
  const { calls, config } = fakeApi(), events = [];
  await runStory(start, owner, config, event => events.push(event));
  assert.deepEqual(events.map(e => e.type), ["phase", "checkpoint", "phase", "complete"]);
  assert.equal(events[3].scene.image, picture);
  assert.equal(events[3].scene.choices.length, 3);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].text.format.strict, true);
  assert.equal(calls[1].tools[0].type, "image_generation");
  assert.deepEqual(calls[1].tool_choice, { type: "image_generation" });
  for (const call of calls) { assert.equal(call.safety_identifier, owner); assert.equal(call.store, false); }
});
test("typed continuation carries cumulative memory, canonical anatomy and original picture", async () => {
  const first = fakeApi(), events = [];
  await runStory(start, owner, first.config, e => events.push(e));
  const saved = events.at(-1), next = fakeApi(), nextEvents = [];
  await runStory({ action: "continue", token: saved.token, idea: "Invite the owl to tea", anchor: picture }, owner, next.config, e => nextEvents.push(e));
  const prompt = JSON.parse(next.calls[0].input);
  assert.equal(prompt.selectedAction, "Invite the owl to tea");
  assert.equal(prompt.memory, page.summary);
  assert.equal(prompt.canonicalCast[0].appearance, cast[0].appearance);
  assert.equal(nextEvents.at(-1).scene.chapter, 2);
  assert.ok(next.calls[1].input[0].content.some(part => part.image_url === picture));
  const state = await readState(nextEvents.at(-1).token, secret, owner);
  assert.equal(state.anchorHash, await digest(picture));
  await assert.rejects(prepareStory({ action: "continue", token: nextEvents.at(-1).token, idea: "Go on" }, owner, next.config), /original illustration/);
});
test("uploaded character pictures are bound to the story and cannot silently change", async () => {
  const withPicture = { ...start, cast: [{ ...cast[0], reference: picture }] };
  await assert.rejects(prepareStory(withPicture, owner, { secret }), /missing or changed/);
  const prepared = await prepareStory({ ...withPicture, references: [{ id: "cali", image: picture }] }, owner, { secret });
  assert.ok(prepared.references.some(p => p.image_url === picture));
});
test("failed illustration preserves a signed written page and retry does not rewrite", async () => {
  const first = fakeApi(true), events = [];
  await runStory(start, owner, first.config, e => events.push(e));
  const saved = events.at(-1);
  assert.equal(saved.scene.image, null);
  assert.ok(saved.scene.imageError);
  const retry = fakeApi(), retried = [];
  await runStory({ action: "illustrate", token: saved.token }, owner, retry.config, e => retried.push(e));
  assert.equal(retry.calls.length, 1);
  assert.ok(retry.calls[0].tools);
  assert.equal(retried.at(-1).scene.id, saved.scene.id);
  assert.equal(retried.at(-1).scene.text, saved.scene.text);
  assert.equal(retried.at(-1).scene.image, picture);
});
test("API refusals, incomplete responses and missing credentials fail explicitly", async () => {
  await assert.rejects(callResponses({}, { apiKey: "" }), /not connected/);
  await assert.rejects(callResponses({}, { apiKey: "test", fetch: async () => Response.json({ status: "incomplete" }) }), /could not finish/);
  await assert.rejects(callResponses({}, { apiKey: "test", fetch: async () => Response.json({ status: "completed", output: [{ content: [{ type: "refusal" }] }] }) }), /gentler/);
  await assert.rejects(callResponses({}, { apiKey: "test", fetch: async () => new Response("", { status: 401 }) }), /configuration update/);
});
test("repeated choices and malformed model JSON never become a saved scene", async () => {
  for (const content of ["not json", JSON.stringify({ ...page, choices: ["same", "same", "same"] })]) {
    const events = [];
    const config = { secret, apiKey: "test", fetch: async () => Response.json({ status: "completed", output: [{ content: [{ type: "output_text", text: content }] }] }) };
    await assert.rejects(runStory(start, owner, config, e => events.push(e)));
    assert.equal(events.some(e => e.type === "checkpoint"), false);
  }
});
test("story memory stays bounded while the chapter count continues", async () => {
  const { config } = fakeApi();
  let body = start;
  for (let i = 0; i < 8; i++) {
    const events = [];
    await runStory(body, owner, config, e => events.push(e));
    const saved = events.at(-1), state = await readState(saved.token, secret, owner);
    assert.equal(state.chapter, i + 1);
    assert.ok(state.recent.length <= 3);
    body = { action: "continue", token: saved.token, idea: "Explore together", anchor: picture };
  }
});

test("multilingual cumulative memory can be read back without truncating its signed bookmark", async () => {
  const state = await startState(start, owner);
  state.summary = "友".repeat(7000);
  state.recent = Array.from({ length: 3 }, () => ({ title: "友".repeat(120), text: "友".repeat(3500), choice: "友".repeat(1200) }));
  state.scene = { text: "友".repeat(3500), illustration: "友".repeat(2200) };
  const token = await signState(state, secret);
  assert.ok(token.length > 75000);
  assert.equal((await readState(token, secret, owner)).summary, state.summary);
});
