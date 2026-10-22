-- Jordi Shopify & Promotions: verified Supabase project ujkizgblscqcejghxemb
-- Dashboard labels this project "366-AI-Software-Homebrew" within
-- the "366 Industries AI Platform" Supabase organization.
-- The owner explicitly selected this exact project as the commerce workspace database.
-- These comments group six private tables under the same business function.
COMMENT ON TABLE public.commerce_products IS
  'Jordi Shopify & Promotions | Private catalog: dropshipping, POD, digital, original creations.';
COMMENT ON TABLE public.commerce_events IS
  'Jordi Shopify & Promotions | Private audit trail for Shopify and AI commerce agents.';
COMMENT ON TABLE public.commerce_orders IS
  'Jordi Shopify & Promotions | Private non-PII Shopify order summaries.';
COMMENT ON TABLE public.commerce_webhook_receipts IS
  'Jordi Shopify & Promotions | Verified webhook delivery deduplication.';
COMMENT ON TABLE public.commerce_promotions IS
  'Jordi Shopify & Promotions | Personal affiliate, social, sponsor and advertising campaign planner.';
COMMENT ON TABLE public.commerce_work_items IS
  'Jordi Shopify & Promotions | Personal business setup and AI agent launch checklist.';

-- Provide an initial private business launch board. Each seed title inserts only once.
INSERT INTO public.commerce_work_items (title,area,notes,priority,status)
SELECT new.title, new.area, new.notes, new.priority, 'backlog'
FROM (VALUES
  ('Connect private Supabase secret to 366 website','integrations',
   'Target Supabase project ujkizgblscqcejghxemb. Configure a server-only Shopify workspace key in the Cloudflare Worker. Verify owner login and CRUD; never expose API secrets.', 'high'),
  ('Verify Jordi-only access and tracking persistence','automation',
   'Test signed root admin session, products, tasks, campaigns and RLS. Check anonymous and normal-member access is denied.', 'high'),
  ('Create the Shopify store and business policies','store_setup',
   'Store, domain, checkout, payment eligibility, international markets, merchant tax settings, customer policies and returns.', 'high'),
  ('Choose worldwide print-on-demand and dropshipping suppliers','sourcing',
   'Verify supplier quality, actual costs, shipping ranges, product compliance, fees and return handling before products are approved.', 'high'),
  ('Prototype color-vision experimental art and apparel','design',
   'Deer, dolphins, house/tree, solar system. Test printed designs with different observers and lighting, avoid unsupported claims.', 'normal'),
  ('Develop hidden empowering and conversation-starter collections','design',
   'Original uplifting messages and deer/adventure, space and dating icebreaker items. Clear original artwork and usage rights.', 'normal'),
  ('Create digital downloads and original book concepts','books',
   'Downloadable conversation cards, journals, planners, books and original creative merchandise. Check licensing and print formats.', 'normal'),
  ('Build affiliate offers and sponsor disclosure workflow','marketing',
   'Research compliant affiliate programs, tracking links and ad placements. Disclose compensation and get approval before activation.', 'normal'),
  ('Connect AI marketing agents with budget approvals','automation',
   'Supervised product research, marketing drafts, channel scheduling, customer service escalation and spend caps; no unauthorized purchasing.', 'normal')
) AS new(title,area,notes,priority)
WHERE NOT EXISTS (
  SELECT 1 FROM public.commerce_work_items existing WHERE existing.title=new.title
);
