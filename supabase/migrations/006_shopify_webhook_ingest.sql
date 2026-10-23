-- Atomically deduplicate Shopify webhook deliveries and prevent older events
-- from overwriting newer order state. Only the server-side service role may
-- execute this transaction; no customer personal data is accepted or stored.
ALTER TABLE public.commerce_orders
  ADD COLUMN IF NOT EXISTS shopify_updated_at timestamptz;

CREATE OR REPLACE FUNCTION public.ingest_shopify_order_webhook(
  p_delivery_id text,
  p_topic text,
  p_order_id text,
  p_total numeric,
  p_currency text,
  p_financial_status text,
  p_created_at timestamptz,
  p_occurred_at timestamptz
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  delivery_claimed boolean := false;
  order_applied boolean := false;
BEGIN
  IF p_delivery_id !~ '^[A-Za-z0-9-]{1,200}$'
     OR p_topic NOT IN ('orders/create', 'orders/paid', 'orders/updated')
     OR p_order_id !~ '^\d+$'
     OR p_total < 0 OR p_total > 100000000000
     OR p_currency !~ '^[A-Z]{3}$'
     OR length(p_financial_status) > 64
     OR p_created_at IS NULL OR p_occurred_at IS NULL THEN
    RAISE EXCEPTION 'Invalid Shopify order webhook summary'
      USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.commerce_webhook_receipts (id, topic)
  VALUES (p_delivery_id, p_topic)
  ON CONFLICT (id) DO NOTHING
  RETURNING true INTO delivery_claimed;

  IF NOT coalesce(delivery_claimed, false) THEN
    RETURN 'duplicate';
  END IF;

  INSERT INTO public.commerce_orders (
    id, total, currency, financial_status, created_at, updated_at,
    shopify_updated_at
  ) VALUES (
    p_order_id, p_total, p_currency, p_financial_status, p_created_at, now(),
    p_occurred_at
  )
  ON CONFLICT (id) DO UPDATE SET
    total = EXCLUDED.total,
    currency = EXCLUDED.currency,
    financial_status = EXCLUDED.financial_status,
    updated_at = now(),
    shopify_updated_at = EXCLUDED.shopify_updated_at
  WHERE public.commerce_orders.shopify_updated_at IS NULL
     OR public.commerce_orders.shopify_updated_at <= EXCLUDED.shopify_updated_at
  RETURNING true INTO order_applied;

  IF NOT coalesce(order_applied, false) THEN
    RETURN 'stale';
  END IF;

  INSERT INTO public.commerce_events (agent, action, result)
  VALUES ('Shopify Webhook', 'Order summary received', p_topic);
  RETURN 'applied';
END;
$$;

REVOKE ALL ON FUNCTION public.ingest_shopify_order_webhook(
  text, text, text, numeric, text, text, timestamptz, timestamptz
) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ingest_shopify_order_webhook(
  text, text, text, numeric, text, text, timestamptz, timestamptz
) TO service_role;

COMMENT ON FUNCTION public.ingest_shopify_order_webhook(
  text, text, text, numeric, text, text, timestamptz, timestamptz
) IS 'Atomically deduplicates and applies non-personal Shopify order summaries.';
