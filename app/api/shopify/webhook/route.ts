import { NextResponse } from "next/server";
import { commerceRest, recordCommerceEvent } from "../../../lib/commerce-os";

export const dynamic = "force-dynamic";

function constantTimeEquals(a: string, b: string) {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i=0;i<len;i++) diff |= (a.charCodeAt(i)||0) ^ (b.charCodeAt(i)||0);
  return diff === 0;
}

/** HMAC-verified, limited-data, no-customer-PII Shopify order summaries. */
export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET || process.env.SHOPIFY_CLIENT_SECRET;
  if (!secret) return NextResponse.json({ok:false,message:"Webhook not configured."},{status:503});
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 512000) return NextResponse.json({ok:false},{status:413});
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength > 512000) return NextResponse.json({ok:false},{status:413});
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256") || "";
  const key = await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC",key,bytes));
  // btoa accepts a binary string of byte codes.
  const expected = btoa(Array.from(signature, n=>String.fromCharCode(n)).join(""));
  if (!constantTimeEquals(hmacHeader,expected))
    return NextResponse.json({ok:false},{status:401});
  const expectedShop = (process.env.SHOPIFY_SHOP || "").toLowerCase() + ".myshopify.com";
  const shop = (request.headers.get("x-shopify-shop-domain") || "").toLowerCase();
  if (!process.env.SHOPIFY_SHOP || shop !== expectedShop)
    return NextResponse.json({ok:false},{status:403});
  const topic = request.headers.get("x-shopify-topic") || "";
  const deliveryId = request.headers.get("x-shopify-webhook-id") || "";
  if (!deliveryId) return NextResponse.json({ok:false},{status:400});
  if (!["orders/create","orders/paid","orders/updated"].includes(topic))
    return NextResponse.json({received:true,ignored:true});
  let payload: Record<string,unknown>;
  try { payload = JSON.parse(new TextDecoder().decode(bytes)) as Record<string,unknown>; }
  catch {return NextResponse.json({ok:false},{status:400});}
  if (!/^\d+$/.test(String(payload.id || "")) || !Number.isFinite(Number(payload.total_price)))
    return NextResponse.json({ok:false},{status:400});
  try {
    // Upsert is idempotent; retries are safe and don't skip the order if receipt insert failed.
    await commerceRest<void>("commerce_orders","?on_conflict=id","POST",{
      id:String(payload.id),total:Number(payload.total_price),currency:String(payload.currency||""),
      financial_status:String(payload.financial_status||""),
      created_at:typeof payload.created_at==="string"?payload.created_at:new Date().toISOString(),
      updated_at:new Date().toISOString(),
    },"resolution=merge-duplicates,return=minimal");
    await commerceRest<void>("commerce_webhook_receipts","?on_conflict=id","POST",{
      id:deliveryId,topic,
    },"resolution=ignore-duplicates,return=minimal");
    await recordCommerceEvent("Shopify Webhook","Order summary received",topic);
    return NextResponse.json({received:true});
  } catch {
    // Shopify should retry a temporary integration/database failure.
    return NextResponse.json({received:false},{status:503});
  }
}
