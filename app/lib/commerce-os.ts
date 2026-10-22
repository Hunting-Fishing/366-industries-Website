/* 366 Commerce OS — owner-only, server-side data and Shopify connectors.
   NEVER import this module into a client component. */
import "server-only";

export const commerceKinds = ["dropshipping", "print_on_demand", "digital", "original_creation"] as const;
export type CommerceKind = typeof commerceKinds[number];
export type ProductStatus = "idea" | "copy_ready" | "approved" | "syncing" | "shopify_draft" | "needs_check";

export type CommerceProduct = {
  id: string;
  kind: CommerceKind;
  title: string;
  theme: string;
  supplier: string;
  note: string;
  description: string;
  social_copy: string;
  price: number;
  unit_cost: number;
  shipping_cost: number;
  ad_allowance: number;
  currency: string;
  rights_confirmed: boolean;
  source_verified: boolean;
  status: ProductStatus;
  shopify_id: string | null;
  created_at: string;
};

export function contribution(p: CommerceProduct) {
  const result = Number(p.price) - Number(p.unit_cost) - Number(p.shipping_cost) -
    Number(p.ad_allowance) - Number(p.price) * 0.03 - 0.30;
  return Math.round(result * 100) / 100;
}

/** Verified by the owner from their Supabase project URL.
 * The Supabase project is currently labeled "366-AI-Software-Homebrew",
 * and belongs to the 366 Industries AI Platform organization.
 * Pinning the project ensures commerce writes never reach 365 Motor Sales
 * or another unrelated Supabase project.
 */
export const JORDI_COMMERCE_SUPABASE_REF = "ujkizgblscqcejghxemb";

function dataConfig() {
  const expectedUrl = "https://" + JORDI_COMMERCE_SUPABASE_REF + ".supabase.co";
  const ref = process.env.JORDI_SHOPIFY_SUPABASE_PROJECT_REF || JORDI_COMMERCE_SUPABASE_REF;
  const explicitUrl = (process.env.JORDI_SHOPIFY_SUPABASE_URL || expectedUrl).replace(new RegExp("/+$"), "");
  if (ref !== JORDI_COMMERCE_SUPABASE_REF || explicitUrl !== expectedUrl) {
    throw new Error("Jordi Commerce Supabase project does not match the verified 366 Industries project.");
  }

  // Reuse an existing website service-role credential ONLY when its associated
  // URL exactly matches the owner's confirmed project. Otherwise the dedicated
  // JORDI_SHOPIFY_SUPABASE_SECRET_KEY is mandatory.
  const genericUrl = (process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(new RegExp("/+$"), "");
  const sharedKey = genericUrl === expectedUrl
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "")
    : "";
  const key = process.env.JORDI_SHOPIFY_SUPABASE_SECRET_KEY || sharedKey;
  if (!key) {
    throw new Error("Jordi Commerce database needs JORDI_SHOPIFY_SUPABASE_SECRET_KEY configured as a server-side Worker secret.");
  }
  return { url: expectedUrl, key };
}

export function commerceDatabaseConfigured() {
  try { dataConfig(); return true; } catch { return false; }
}

export function shopifyConfigured() {
  return Boolean(process.env.SHOPIFY_SHOP &&
    (process.env.SHOPIFY_ACCESS_TOKEN ||
      (process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET)));
}

/** Only called by protected server routes. Never accepts caller-provided table names. */
export async function commerceRest<T>(table: "commerce_products" | "commerce_orders" | "commerce_webhook_receipts" | "commerce_events" | "commerce_promotions" | "commerce_work_items",
  query = "", method = "GET", body?: unknown, prefer = "return=representation"): Promise<T> {
  const { url, key } = dataConfig();
  const headers: Record<string,string> = {
    apikey: key,
    "Content-Type": "application/json",
  };
  // New sb_secret_* keys are API gateway credentials, not JWTs.
  if (!key.startsWith("sb_secret_")) headers.Authorization = "Bearer " + key;
  if (method !== "GET") headers.Prefer = prefer;
  const response = await fetch(url + "/rest/v1/" + table + query, {
    method, headers, body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (!response.ok) {
    // Do not relay database error details or service keys to the browser.
    throw new Error("Commerce database operation failed (HTTP " + response.status + "). Apply migration 002 and check server configuration.");
  }
  if (prefer === "return=minimal" && method !== "GET") return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : []) as T;
}

export async function listCommerceProducts() {
  return commerceRest<CommerceProduct[]>("commerce_products", "?select=*&order=created_at.desc&limit=200");
}
export async function getCommerceProduct(id: string) {
  const rows = await commerceRest<CommerceProduct[]>("commerce_products",
    "?select=*&id=eq." + encodeURIComponent(id) + "&limit=1");
  return rows[0] || null;
}
export async function updateCommerceProduct(id: string, patch: Record<string, unknown>, extraFilter = "") {
  const rows = await commerceRest<CommerceProduct[]>("commerce_products",
    "?id=eq." + encodeURIComponent(id) + extraFilter,
    "PATCH", { ...patch, updated_at: new Date().toISOString() });
  return rows[0] || null;
}
export async function recordCommerceEvent(agent: string, action: string, result: string, productId?: string) {
  try {
    await commerceRest<void>("commerce_events", "", "POST", {
      agent, action, result: result.slice(0, 500), product_id: productId ?? null,
    }, "return=minimal");
  } catch { /* Logging is best effort; fail closed in the actual write paths. */ }
}

export function assertSameOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  // Dashboard uses fetch POST/PATCH with Origin; reject cross-site form posts.
  if (!origin || origin !== requestOrigin) throw new Error("Cross-origin action blocked.");
}
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
export function safeText(value: unknown, limit = 250) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}
export function safeAmount(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 100000) throw new Error("Invalid monetary amount.");
  return Math.round(n * 100) / 100;
}
export function htmlEscape(raw: string) {
  return raw.replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch] ?? ch);
}
export async function generateCommerceCopy(product: CommerceProduct) {
  const fallback = {
    description: product.title + ". Specifications, accessibility claims, materials and delivery details will be confirmed before listing.",
    social: "Coming soon: " + product.title + ". Details and availability subject to review.",
    generator: "safe template",
  };
  if (!process.env.OPENAI_API_KEY) return fallback;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: "Write factual draft ecommerce copy. Use only supplied facts. Return ONLY JSON with fields description and social. Description max 450 characters, social max 250. Do not invent product performance, accessibility outcomes, scientific claims, warranties, testimonials, stock, shipping times or endorsements. Do not reproduce famous movie quotes, trademarked slogans or protected characters. For color-vision designs, describe them as experimental until tested with target participants.",
      input: JSON.stringify({
        title: product.title, kind: product.kind, theme: product.theme,
        supplier: product.supplier, note: product.note,
      }),
    }),
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error("AI draft provider error (" + response.status + ").");
  const payload = await response.json() as {
    output?: Array<{content?: Array<{type?: string; text?: string}>}>;
  };
  const raw = payload.output?.flatMap(item => item.content || [])
    .filter(item => item.type === "output_text").map(item => item.text || "").join("") || "";
  const clean = raw.replace(/^```(?:json)?\s*|\s*```$/gi, "");
  let parsed: { description?: string; social?: string };
  try { parsed = JSON.parse(clean); }
  catch { throw new Error("AI draft did not return valid JSON. Please retry."); }
  if (typeof parsed.description !== "string" || typeof parsed.social !== "string")
    throw new Error("AI draft was missing required content.");
  return {
    description: parsed.description.slice(0, 450),
    social: parsed.social.slice(0, 250),
    generator: "OpenAI draft",
  };
}

async function shopifyAccessToken(shop: string) {
  if (process.env.SHOPIFY_ACCESS_TOKEN) return process.env.SHOPIFY_ACCESS_TOKEN;
  if (!process.env.SHOPIFY_CLIENT_ID || !process.env.SHOPIFY_CLIENT_SECRET)
    throw new Error("Shopify credentials not configured.");
  const result = await fetch("https://" + shop + "/admin/oauth/access_token", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!result.ok) throw new Error("Shopify authentication failed (" + result.status + ").");
  const data = await result.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Shopify access token absent.");
  return data.access_token;
}

export async function shopifyGraphQL(query: string, variables: Record<string, unknown>) {
  const name = process.env.SHOPIFY_SHOP || "";
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(name)) throw new Error("Set SHOPIFY_SHOP to a myshopify.com subdomain only.");
  const version = process.env.SHOPIFY_API_VERSION || "2026-10";
  if (!/^\d{4}-\d{2}$/.test(version)) throw new Error("Invalid Shopify API version.");
  const shop = name + ".myshopify.com";
  const token = await shopifyAccessToken(shop);
  const response = await fetch("https://" + shop + "/admin/api/" + version + "/graphql.json", {
    method: "POST",
    headers: { "X-Shopify-Access-Token": token, "Content-Type": "application/json" },
    body: JSON.stringify({query, variables}),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error("Shopify API error (HTTP " + response.status + ").");
  const data = await response.json() as {data?: Record<string, unknown>; errors?: unknown[]};
  if (data.errors?.length || !data.data) throw new Error("Shopify returned GraphQL errors.");
  return data.data;
}
