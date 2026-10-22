-- Jordi Shopify & Promotions: private tracking section inside the 366 Industries Supabase project.
-- Apply only to the verified 366 Industries Supabase project, never 365 Motor Sales,
-- Barangay Buddy or 366-AI-Software-Homebrew.
-- No public/normal-member database permissions or RLS policies are granted.
CREATE TABLE IF NOT EXISTS public.commerce_promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  kind text NOT NULL CHECK (kind IN
    ('social','affiliate','sponsorship','paid_ad','product_launch','other')),
  channel text NOT NULL DEFAULT '',
  destination_url text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  planned_budget_usd numeric(12,2) NOT NULL DEFAULT 0
    CHECK (planned_budget_usd >= 0 AND planned_budget_usd <= 1000000),
  status text NOT NULL DEFAULT 'idea'
    CHECK (status IN ('idea','draft','ready','running','finished')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS commerce_promotions_created_idx ON public.commerce_promotions(created_at DESC);
CREATE INDEX IF NOT EXISTS commerce_promotions_status_idx ON public.commerce_promotions(status);

CREATE TABLE IF NOT EXISTS public.commerce_work_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  area text NOT NULL CHECK (area IN
    ('store_setup','automation','sourcing','design','marketing','books','integrations','operations')),
  notes text NOT NULL DEFAULT '',
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low','normal','high')),
  status text NOT NULL DEFAULT 'backlog'
    CHECK (status IN ('backlog','in_progress','done')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS commerce_work_items_created_idx ON public.commerce_work_items(created_at DESC);
CREATE INDEX IF NOT EXISTS commerce_work_items_status_idx ON public.commerce_work_items(status);

ALTER TABLE public.commerce_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commerce_work_items ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.commerce_promotions FROM anon, authenticated;
REVOKE ALL ON TABLE public.commerce_work_items FROM anon, authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE public.commerce_promotions TO service_role;
GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE public.commerce_work_items TO service_role;
-- The website's server is responsible for verifying signed root-admin sessions.
-- Planning status does not place ads, activate affiliate campaigns or spend money.
