-- 366 Industries owner-only Commerce OS.
-- This migration has been applied to the owner-confirmed project
-- ujkizgblscqcejghxemb (currently displayed as 366-AI-Software-Homebrew).
-- Provision a dedicated server-only secret on the Cloudflare Worker.
-- Never put secret or Shopify token in a NEXT_PUBLIC_* variable.
-- Public or normal members have NO direct access to these tables.
CREATE TABLE IF NOT EXISTS public.commerce_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('dropshipping','print_on_demand','digital','original_creation')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  theme text NOT NULL DEFAULT '',
  supplier text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  social_copy text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL CHECK (price > 0),
  unit_cost numeric(12,2) NOT NULL DEFAULT 0 CHECK (unit_cost >= 0),
  shipping_cost numeric(12,2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  ad_allowance numeric(12,2) NOT NULL DEFAULT 0 CHECK (ad_allowance >= 0),
  currency text NOT NULL DEFAULT 'USD' CHECK (currency='USD'),
  source_verified boolean NOT NULL DEFAULT false,
  rights_confirmed boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'idea' CHECK (status IN
    ('idea','copy_ready','approved','syncing','shopify_draft','needs_check')),
  shopify_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_commerce_products_created ON public.commerce_products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commerce_products_status ON public.commerce_products(status);

CREATE TABLE IF NOT EXISTS public.commerce_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.commerce_products(id) ON DELETE SET NULL,
  agent text NOT NULL,
  action text NOT NULL,
  result text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_commerce_events_created ON public.commerce_events(created_at DESC);

-- Only non-personal order summary data are stored. No names, emails, or addresses.
CREATE TABLE IF NOT EXISTS public.commerce_orders (
  id text PRIMARY KEY,
  total numeric(14,2) NOT NULL,
  currency text NOT NULL,
  financial_status text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.commerce_webhook_receipts (
  id text PRIMARY KEY,
  topic text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.commerce_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commerce_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commerce_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commerce_webhook_receipts ENABLE ROW LEVEL SECURITY;
-- No anon / authenticated policies are intentionally created.
REVOKE ALL ON public.commerce_products FROM anon, authenticated;
REVOKE ALL ON public.commerce_events FROM anon, authenticated;
REVOKE ALL ON public.commerce_orders FROM anon, authenticated;
REVOKE ALL ON public.commerce_webhook_receipts FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_products TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_events TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_orders TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_webhook_receipts TO service_role;
