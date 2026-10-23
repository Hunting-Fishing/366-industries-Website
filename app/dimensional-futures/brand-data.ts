export const dimensionalFutures = {
  name: "Dimensional Futures",
  parentBrand: "A 366 Industries brand",
  tagline: "More Ways Forward.",
  campaignLine: "More ways to see. More ways to think. More ways forward.",
  descriptor: "Inclusive apparel & useful goods.",
  phase: "Brand development",
  availability: "Concepts only — not yet for sale",
  lastUpdated: "October 23, 2026",
  mission:
    "Create clothing and everyday goods that respect different ways of seeing, thinking, sensing, moving, and communicating.",
} as const;

export const collections = [
  {
    id: "shared-futures",
    index: "01",
    name: "Shared Futures",
    marker: "Parallel lines",
    status: "Launch collection",
    description:
      "Universal motivational designs about belonging, pace, access, and making room for human difference.",
    examples: ["Different Is Part of Human", "My Pace Is Still Progress"],
  },
  {
    id: "many-minds",
    index: "02",
    name: "Many Minds",
    marker: "Dot grid",
    status: "Launch collection",
    description:
      "Clear, non-stereotyping messages informed by neurodivergent experiences without treating different communities as interchangeable.",
    examples: ["Focus Is Not a Moral Issue", "Quiet Is Communication"],
  },
  {
    id: "different-view",
    index: "03",
    name: "Different View",
    marker: "Diagonal hatch",
    status: "Testing pathway",
    description:
      "Color-vision-difference designs that combine color with pattern, words, and shape, then undergo printer-specific physical review.",
    examples: ["Color Has More Than One Language", "Same Shirt, Different View"],
  },
  {
    id: "access-forward",
    index: "04",
    name: "Access Forward",
    marker: "Raised path",
    status: "Co-design pathway",
    description:
      "Broader accessibility concepts developed with disabled people, including a later tactile capsule called Access by Touch.",
    examples: ["Make Space, Not Assumptions", "Ask Before Helping"],
  },
] as const;

export type ConceptCategory = "apparel" | "home" | "carry";

export type ConceptSort = "featured" | "name-asc" | "concept-number";

export type ConceptMotif = "lines" | "steps" | "grid" | "quiet" | "path";

export type ConceptProduct = {
  index: string;
  id: string;
  slug: string;
  name: string;
  format: string;
  productType: string;
  category: ConceptCategory;
  collection: string;
  motif: ConceptMotif;
  featured: boolean;
  stage: string;
  status: "Concept · not for sale";
  price: "Not set";
  description: string;
  defined: readonly string[];
  openDecisions: readonly string[];
};

export type ConceptCategoryFilter = {
  value: "all" | ConceptCategory;
  label: string;
};

export type ConceptSortOption = {
  value: ConceptSort;
  label: string;
};

export const conceptCategoryFilters = [
  { value: "all", label: "All concepts" },
  { value: "apparel", label: "Apparel" },
  { value: "home", label: "Home" },
  { value: "carry", label: "Bags & pouches" },
] as const satisfies readonly ConceptCategoryFilter[];

export const conceptSortOptions = [
  { value: "featured", label: "Featured" },
  { value: "concept-number", label: "Concept number" },
  { value: "name-asc", label: "Name: A–Z" },
] as const satisfies readonly ConceptSortOption[];

export const launchConcepts = [
  {
    index: "01",
    id: "different-is-part-of-human-tee",
    slug: "different-is-part-of-human-tee",
    name: "Different Is Part of Human",
    format: "Graphic tee",
    productType: "Graphic tee",
    category: "apparel",
    collection: "Shared Futures",
    motif: "lines",
    featured: true,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "A bold everyday statement celebrating the many ways people think, sense, communicate, move, and experience the world.",
    defined: ["Core message", "Graphic tee format", "Shared Futures collection"],
    openDecisions: ["Original artwork", "Blank, materials, fit, and sizes", "Colors, supplier, samples, and price"],
  },
  {
    index: "02",
    id: "my-pace-is-still-progress-tee",
    slug: "my-pace-is-still-progress-tee",
    name: "My Pace Is Still Progress",
    format: "Graphic tee",
    productType: "Graphic tee",
    category: "apparel",
    collection: "Shared Futures",
    motif: "steps",
    featured: true,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "A steady reminder that progress does not follow one schedule and can happen at the pace that works for you.",
    defined: ["Core message", "Graphic tee format", "Shared Futures collection"],
    openDecisions: ["Original artwork", "Blank, materials, fit, and sizes", "Colors, supplier, samples, and price"],
  },
  {
    index: "03",
    id: "my-pace-is-still-progress-mug",
    slug: "my-pace-is-still-progress-mug",
    name: "My Pace Is Still Progress",
    format: "Mug",
    productType: "Mug",
    category: "home",
    collection: "Shared Futures",
    motif: "steps",
    featured: false,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "The same message for desks, kitchens, and quiet pauses, planned as a separate physical product concept.",
    defined: ["Core message", "Mug format", "Shared Futures collection"],
    openDecisions: ["Original wrap artwork", "Mug material, size, and handle", "Supplier, sample, print method, and price"],
  },
  {
    index: "04",
    id: "make-room-for-every-mind-hoodie",
    slug: "make-room-for-every-mind-hoodie",
    name: "Make Room for Every Mind",
    format: "Hoodie",
    productType: "Hoodie",
    category: "apparel",
    collection: "Many Minds",
    motif: "grid",
    featured: true,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "An invitation to shape classrooms, workplaces, homes, and communities with more than one kind of mind in mind.",
    defined: ["Core message", "Hoodie format", "Many Minds collection"],
    openDecisions: ["Original artwork", "Blank, fabric weight, fit, and sizes", "Colors, supplier, samples, and price"],
  },
  {
    index: "05",
    id: "focus-is-not-a-moral-issue-tee",
    slug: "focus-is-not-a-moral-issue-tee",
    name: "Focus Is Not a Moral Issue",
    format: "Graphic tee",
    productType: "Graphic tee",
    category: "apparel",
    collection: "Many Minds",
    motif: "grid",
    featured: false,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "A direct message that attention can vary and does not determine a person's effort, character, or worth.",
    defined: ["Core message", "Graphic tee format", "Many Minds collection"],
    openDecisions: ["Original artwork", "Paid community review", "Blank, sizes, supplier, samples, and price"],
  },
  {
    index: "06",
    id: "quiet-is-communication-tee",
    slug: "quiet-is-communication-tee",
    name: "Quiet Is Communication",
    format: "Low-ink tee",
    productType: "Low-ink tee",
    category: "apparel",
    collection: "Many Minds",
    motif: "quiet",
    featured: true,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "An understated concept honoring communication that may be spoken, signed, written, typed, gestured, or quiet.",
    defined: ["Core message", "Low-ink tee direction", "Many Minds collection"],
    openDecisions: ["Original artwork and ink coverage", "Paid community review", "Blank, sizes, supplier, samples, and price"],
  },
  {
    index: "07",
    id: "tools-not-apologies-organizer-pouch",
    slug: "tools-not-apologies-organizer-pouch",
    name: "Tools, Not Apologies",
    format: "Organizer pouch",
    productType: "Organizer pouch",
    category: "carry",
    collection: "Many Minds",
    motif: "grid",
    featured: false,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "A practical home for personal supports such as pens, chargers, communication cards, and fidgets—no explanation required.",
    defined: ["Core message", "Organizer pouch format", "Many Minds collection"],
    openDecisions: ["Original artwork", "Dimensions, fabric, closure, and compartments", "Supplier, samples, durability testing, and price"],
  },
  {
    index: "08",
    id: "access-is-everybodys-business-tote",
    slug: "access-is-everybodys-business-tote",
    name: "Access Is Everybody's Business",
    format: "Tote",
    productType: "Tote",
    category: "carry",
    collection: "Access Forward",
    motif: "path",
    featured: true,
    stage: "Concept review",
    status: "Concept · not for sale",
    price: "Not set",
    description:
      "A clear statement that accessibility is a shared responsibility, not an individual burden.",
    defined: ["Core message", "Tote format", "Access Forward collection"],
    openDecisions: ["Original artwork", "Dimensions, material, handle, and weight rating", "Paid review, supplier, samples, and price"],
  },
] as const satisfies readonly ConceptProduct[];

export const designCommitments = [
  {
    index: "01",
    title: "Design with people",
    copy: "Pay community advisors and featured artists, and involve the people represented before a product is approved.",
  },
  {
    index: "02",
    title: "Describe exact features",
    copy: "Publish measurable material, fit, texture, contrast, care, and tactile details instead of promising a universal experience.",
  },
  {
    index: "03",
    title: "Never rely on color alone",
    copy: "Pair every collection color with a written label, symbol, and grayscale-readable pattern or shape.",
  },
  {
    index: "04",
    title: "Make impact traceable",
    copy: "Name a contribution amount, percentage, or beneficiary only after written agreements and accounting are in place.",
  },
] as const;

export const developmentStatus = [
  {
    label: "Brand direction",
    state: "Defined",
    detail: "Working name, mission, visual direction, and collection architecture documented.",
  },
  {
    label: "Launch capsule",
    state: "Concept review",
    detail: "Eight initial messages and formats documented; original production artwork is still required.",
  },
  {
    label: "Suppliers & samples",
    state: "Not selected",
    detail: "No blank products, materials, production partners, or physical samples have been approved.",
  },
  {
    label: "Community review",
    state: "Not started",
    detail: "Relevant paid reviewers and physical testing plans must be confirmed before sale.",
  },
  {
    label: "Pricing & availability",
    state: "Not set",
    detail: "Costs, shipping, returns, taxes, contribution model, margin, and launch date remain open.",
  },
] as const;

export const approvalGates = [
  "Select the exact supplier, blank product, variants, sizes, colors, and shipping regions.",
  "Order and inspect the intended physical sample for print clarity, fit, texture, and durability.",
  "Complete paid community review for the message and any access features represented.",
  "Approve original artwork, accurate mockups, product details, and useful alternative text.",
  "Calculate full costs and document any community contribution before setting a price.",
] as const;
