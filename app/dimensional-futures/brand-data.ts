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

export const launchConcepts = [
  {
    index: "01",
    name: "Different Is Part of Human",
    format: "Graphic tee",
    collection: "Shared Futures",
    motif: "lines",
    description:
      "A bold everyday statement celebrating the many ways people think, sense, communicate, move, and experience the world.",
  },
  {
    index: "02",
    name: "My Pace Is Still Progress",
    format: "Graphic tee",
    collection: "Shared Futures",
    motif: "steps",
    description:
      "A steady reminder that progress does not follow one schedule and can happen at the pace that works for you.",
  },
  {
    index: "03",
    name: "My Pace Is Still Progress",
    format: "Mug",
    collection: "Shared Futures",
    motif: "steps",
    description:
      "The same message for desks, kitchens, and quiet pauses, planned as a separate physical product concept.",
  },
  {
    index: "04",
    name: "Make Room for Every Mind",
    format: "Hoodie",
    collection: "Many Minds",
    motif: "grid",
    description:
      "An invitation to shape classrooms, workplaces, homes, and communities with more than one kind of mind in mind.",
  },
  {
    index: "05",
    name: "Focus Is Not a Moral Issue",
    format: "Graphic tee",
    collection: "Many Minds",
    motif: "grid",
    description:
      "A direct message that attention can vary and does not determine a person's effort, character, or worth.",
  },
  {
    index: "06",
    name: "Quiet Is Communication",
    format: "Low-ink tee",
    collection: "Many Minds",
    motif: "quiet",
    description:
      "An understated concept honoring communication that may be spoken, signed, written, typed, gestured, or quiet.",
  },
  {
    index: "07",
    name: "Tools, Not Apologies",
    format: "Organizer pouch",
    collection: "Many Minds",
    motif: "grid",
    description:
      "A practical home for personal supports such as pens, chargers, communication cards, and fidgets—no explanation required.",
  },
  {
    index: "08",
    name: "Access Is Everybody's Business",
    format: "Tote",
    collection: "Access Forward",
    motif: "path",
    description:
      "A clear statement that accessibility is a shared responsibility, not an individual burden.",
  },
] as const;

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
