# Barangay Sidekick merchandise catalog expansion — November 26, 2026

Target store: `kefuqu-mv.myshopify.com`, PHP trial.
Approved brand logo: `Hunting-Fishing/barangay-sidekick/public/brand/barangay-sidekick-logo.webp` (1000×424). The exact original approved artwork must retain its identity.

## Actual Shopify changes

- **67 new Shopify DRAFT product listings** with **437 option variants** (sizes, colors, capacities, family sizes, phone cases) across 7 new smart collections:
  - Sidekick Tees & Tops (`bsk-tops`)
  - Sidekick Hoodies & Layers (`bsk-layers`)
  - Sidekick Hats & Headwear (`bsk-hats`)
  - Sidekick Mugs & Drinkware (`bsk-drinkware`)
  - Sidekick Bags & Travel (`bsk-bags`)
  - Sidekick Home & Desk (`bsk-home`)
  - Sidekick Kids & Family (`bsk-family`)
- 6 earlier Sidekick drafts retained (including one ceramic mug concept); three unrelated existing products untouched.
- All 67 new listings tagged `bsk-collection-2026`, `barangay-sidekick-apparel`, and relevant category.
- **All remain unpublished.** New variants are placeholder priced `0.00 PHP` (not a retail price). Source artwork reference and labeled preview concept mockups attached to the product galleries. The first five original Sidekick products have category mockups moved to featured media.
- Original brand logo file ID is in Shopify Assets, and the new mockups are also Shopify Files.

**Important:** The 437 options are catalog-structure ideas, NOT 437 supplier-mapped, shippable products. The installed Printful Shopify app and active Printful fulfillment location do not themselves create a fulfillment map. Need approved design print file, actual Printful product ID and variant map, garment samples, costs, suitable mockups, domestic/international shipping and PHP margin before publishing.

The user's screenshot of the Shopify **Digital Products** app displaying a physical T-shirt doesn't represent the real POD production workflow. Do not upload apparel mockups as Digital Products downloads.

## Generated artwork

Supabase Storage public bucket `barangay-sidekick-merch` on `ujkizgblscqcejghxemb`. Railway function `sidekick-merch-art-generator` id `b57f18d8-ee10-43a5-bc9c-c883b261fcc2` generated **20 review-only PNG files**. Its source is versioned alongside this document in `automations/railway/sidekick-merch-art-generator.ts`. No network access or secrets are required to read this source.

### 12 transparent print composition concepts (4500×5400; 300-dpi metadata)

- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/official-logo-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/proud-of-my-barangay-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/bayanihan-in-action-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/sidekick-crew-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/together-we-rise-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/neighbors-helping-neighbors-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/local-heart-global-spirit-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/kumusta-ask-me-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/community-champions-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/future-sidekick-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/one-community-many-stories-4500x5400.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/print/v2/good-morning-barangay-4500x5400.png

### 8 labeled concept garment/product illustrations (1200×1200)

- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/tshirt-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/hoodie-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/cap-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/mug-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/tote-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/notebook-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/poster-concept.png
- https://ujkizgblscqcejghxemb.supabase.co/storage/v1/object/public/barangay-sidekick-merch/mockups/v2/kids-concept.png

All assets preserve the exact original logo image; new slogan text is rendered using the SIL Open Font License **Anton** font converted to vector outlines by `opentype.js`. This avoids Railway's missing Fontconfig. The source logo is only 1000px wide and was enlarged for layouts; **enlargement does not create optical detail** and must be inspected in printed samples. Assets are not officially certified print files or Printful mockups. Some logo/color backgrounds may require light/dark ink proofs.

## Product production release gates

1. Open **Printful**, not Shopify Digital Products. In Printful's Design Maker choose actual blanks/variants available for the intended selling markets. Adapt and upload print composition files above; choose correct placement, artwork scaling, background inks, and printing/embroidery technique. Do not try to embroider the full-color detailed wide logo before verifying stitch suitability.
2. Generate actual **Printful** mockups, validate expected garment colors, materials, size chart, sample print, print resolution and manufacturing region.
3. Prefer publishing a new Printful-sourced product into Shopify as a draft and reconciling it with one of our Shopify drafts, avoiding duplicate live products. When using manual sync of existing products, Shopify may require a product to be active for Printful import; do not activate placeholders until safe pricing, fulfillment and print specs are configured.
4. Record confirmed manufacturer costs, shipping charges per destination, exchange rates, returns, taxes and VAT, and compute actual PHP contribution. Do not leave draft products priced at PHP 0.
5. Only when Printful variant mappings and regional availability are verified may individual products be published and advertising launched, with explicit spend caps and user approval.

Shopify Admin: https://admin.shopify.com/store/kefuqu-mv/products
Printful account: https://www.printful.com/dashboard
Private 366 Industries management: https://366-industries-website.jordilwbailey.workers.dev/admin/jordi-shopify-promotions

We intentionally limited this batch to distinctive themes rather than creating 300 near-duplicate unsuppliable product listings. The catalog has >300 *option variants*, not 300 Printful-produced goods. Expand on real supplier validation.
