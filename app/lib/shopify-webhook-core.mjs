export function selectShopifyWebhookSecret(
  adminConfigured,
  clientSecretValue,
  webhookSecretValue
) {
  if (!adminConfigured) return "";
  const clientSecret = clientSecretValue?.trim() || "";
  const webhookSecret = webhookSecretValue?.trim() || "";
  if (clientSecret) {
    if (webhookSecret && webhookSecret !== clientSecret) return "";
    return clientSecret;
  }
  return webhookSecret;
}

function constantTimeEquals(left, right) {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

export async function verifyShopifyWebhookHmac(bytes, suppliedHmac, secret) {
  if (!secret || !suppliedHmac) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {name: "HMAC", hash: "SHA-256"},
    false,
    ["sign"]
  );
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, bytes));
  const expected = btoa(Array.from(signature, (value) => String.fromCharCode(value)).join(""));
  return constantTimeEquals(suppliedHmac, expected);
}

export function parseShopifyOrderSummary(payload, triggeredAt) {
  if (!payload || typeof payload !== "object") return null;
  const orderId = String(payload.id || "");
  const total = Number(payload.total_price);
  const currency = String(payload.currency || "").toUpperCase();
  const financialStatus = String(payload.financial_status || "");
  const createdAt = typeof payload.created_at === "string" ? payload.created_at : "";
  const payloadUpdatedAt = typeof payload.updated_at === "string" ? payload.updated_at : "";
  const occurredAt = triggeredAt || payloadUpdatedAt;
  if (!/^\d+$/.test(orderId) || !Number.isFinite(total) || total < 0 ||
      !/^[A-Z]{3}$/.test(currency) || financialStatus.length > 64 ||
      !Number.isFinite(Date.parse(createdAt)) || !Number.isFinite(Date.parse(occurredAt))) {
    return null;
  }
  return {
    orderId,
    total,
    currency,
    financialStatus,
    createdAt: new Date(createdAt).toISOString(),
    occurredAt: new Date(occurredAt).toISOString(),
  };
}
