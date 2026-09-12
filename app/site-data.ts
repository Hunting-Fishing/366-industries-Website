export type Venture = {
  slug: string;
  name: string;
  category: string;
  status: string;
  description: string;
  impact: string;
  href: string;
  external?: boolean;
  number: string;
  image: string;
};

export type ProjectDetail = Venture & {
  headline: string;
  overview: string;
  pillars: { title: string; copy: string }[];
  nextStep: string;
};

export const ventures: Venture[] = [
  {
    slug: "the-366-initiative",
    name: "The 366 Initiative",
    category: "Humanity",
    status: "Campaign development",
    description: "A humanitarian platform for disaster readiness, drone-delivered aid, water safety and resilient communities.",
    impact: "Preparedness for communities that cannot afford to wait.",
    href: "/ventures/the-366-initiative",
    number: "01",
    image: "/assets/humanity-hero.png",
  },
  {
    slug: "365-motor-sales",
    name: "365 Motor Sales",
    category: "Mobility + Commerce",
    status: "In development",
    description: "A Philippine vehicle and equipment marketplace connecting buyers, sellers, workshops, parts and ownership stories.",
    impact: "A stronger, more transparent mobility economy across the Philippines.",
    href: "/ventures/365-motor-sales",
    number: "02",
    image: "/assets/365-motorsales-logo.webp",
  },
  {
    slug: "barangay-buddy",
    name: "Barangay Buddy",
    category: "Local Infrastructure",
    status: "In development",
    description: "A digital map and micro-commerce layer bringing barangay businesses, services, inventories and local discovery together.",
    impact: "Make every local business easier to find, trust and support.",
    href: "/ventures/barangay-buddy",
    number: "03",
    image: "/assets/community-hero.png",
  },
  {
    slug: "what-is-owed-to-you",
    name: "What Is Owed To You",
    category: "Consumer Intelligence",
    status: "Active build",
    description: "A recall and consumer-rights discovery platform designed to help people find compensation, safety notices and unresolved value.",
    impact: "Turn scattered public information into practical consumer action.",
    href: "/ventures/what-is-owed-to-you",
    number: "04",
    image: "/assets/community-relief.png",
  },
  {
    slug: "worldfix-games",
    name: "366 Games",
    category: "Games",
    status: "Prototype portfolio",
    description: "Purpose-led tabletop and digital games where players prepare, repair communities, coordinate rescue missions and build useful local businesses.",
    impact: "Turn preparedness and visible problem-solving into accessible, replayable entertainment.",
    href: "/ventures/worldfix-games",
    number: "05",
    image: "/assets/carrington-protocol-hero.png",
  },
  {
    slug: "business-ready",
    name: "Business Ready",
    category: "Prosperity",
    status: "Program design",
    description: "Practical, locally grounded startup training for small operators in food, aquaculture, solar, repair and circular industry.",
    impact: "Move people from an idea to their first independent income stream.",
    href: "/ventures/business-ready",
    number: "06",
    image: "/assets/community-hero.png",
  },
  {
    slug: "philippines-crafted-sea-salt",
    name: "Philippines Crafted Sea Salt",
    category: "Food + Export",
    status: "Supplier network development",
    description: "A nationwide sourcing, packaging and export venture connecting Philippine salt makers with premium domestic and international markets.",
    impact: "Create stronger market access for Filipino salt communities while bringing traceable Philippine sea salt to the world.",
    href: "/ventures/philippines-crafted-sea-salt",
    number: "07",
    image: "/assets/philippines-crafted-sea-salt.png",
  },
  {
    slug: "366-ai-designer",
    name: "366 AI Designer",
    category: "AI + Product Creation",
    status: "Builder in development",
    description: "An AI-powered creation workspace designed to help people turn an idea into a working website or web application through clear conversation and visual building tools.",
    impact: "Give more founders, small businesses and community builders the ability to create useful software without needing a full development team.",
    href: "/ai-designer",
    number: "08",
    image: "/assets/ventures-hero.png",
  },
  {
    slug: "pipe-buyer",
    name: "Pipe Buyer",
    category: "Oil & Gas Marketplace",
    status: "Marketplace online",
    description: "A specialized marketplace for buying and selling oilfield pipe, tubular products and related Oil & Gas equipment, with pipe sales at the center.",
    impact: "Help buyers find pipe inventory faster while giving suppliers and equipment owners a focused place to reach qualified industry demand.",
    href: "/ventures/pipe-buyer",
    number: "09",
    image: "/assets/pipe-buyer-hero.png",
  },
  {
    slug: "remote-build-zone",
    name: "Remote Build Zone",
    category: "Interactive Robotics + Live Entertainment",
    status: "Prototype online",
    description: "A live remote-control platform where online viewers can operate physical RC vehicles, diecast racers, construction equipment and drones through streamed camera feeds and managed sessions.",
    impact: "Turn real machines into safe, interactive online experiences while building toward autonomous pits, telemetry and persistent live racing.",
    href: "/ventures/remote-build-zone",
    number: "10",
    image: "/assets/ventures-hero.png",
  },
];

export const projectDetails: ProjectDetail[] = ventures.map((venture) => ({
  ...venture,
  headline: {
    "the-366-initiative": "Practical humanitarian systems built for the emergencies communities face today.",
    "365-motor-sales": "One trusted Philippine marketplace for vehicles, equipment, parts and the people who keep them moving.",
    "barangay-buddy": "Make local businesses, services and community resources visible on one useful map.",
    "what-is-owed-to-you": "Turn recalls, settlements and consumer notices into clear actions people can actually take.",
    "worldfix-games": "Prepare, cooperate and play through real-world problems in tabletop and digital worlds built around practical solutions.",
    "business-ready": "Short, practical paths from local skill to a working small business and independent income.",
    "philippines-crafted-sea-salt": "Source distinctive sea salt from producers across the Philippines and prepare it for responsible, premium export.",
    "366-ai-designer": "Move from a rough idea to a structured, visual and deployable digital product in one guided workspace.",
    "pipe-buyer": "A focused marketplace built to connect pipe inventory with Oil & Gas buyers who are ready to source.",
    "remote-build-zone": "Drive real machines from anywhere: FPV racing, track cameras, queued online control and a path toward autonomous operation.",
  }[venture.slug] || venture.impact,
  overview: venture.description,
  pillars: {
    "the-366-initiative": [
      { title: "Respond", copy: "Support disaster relief, rescue awareness and delivery when roads and ordinary systems fail." },
      { title: "Prepare", copy: "Help communities build water, power, communications and safety readiness before emergencies." },
      { title: "Operate locally", copy: "Train responsible local teams and publish clear safety boundaries for every pilot." },
    ],
    "365-motor-sales": [
      { title: "Discover", copy: "Browse vehicles, motorcycles, equipment, parts and trusted automotive services nationwide." },
      { title: "Build trust", copy: "Use verification, reporting and practical transaction guidance to make deals safer." },
      { title: "Grow", copy: "Give sellers, dealers, workshops and service providers tools to reach more customers." },
    ],
    "barangay-buddy": [
      { title: "Find local", copy: "Surface nearby businesses, services and useful community resources." },
      { title: "Support income", copy: "Give small operators a simple digital presence that customers can discover." },
      { title: "Connect needs", copy: "Help residents and visitors understand what is available in each barangay." },
    ],
    "what-is-owed-to-you": [
      { title: "Find", copy: "Bring scattered recall and consumer-rights information into one searchable experience." },
      { title: "Understand", copy: "Explain what a notice means, who may qualify and which next step matters." },
      { title: "Act", copy: "Help people document, track and follow legitimate claims without promising outcomes." },
    ],
    "worldfix-games": [
      { title: "Prepare together", copy: "Carrington Protocol turns infrastructure resilience and cooperative recovery into a physical board-game challenge." },
      { title: "Build the answer", copy: "World Fix and the digital portfolio let players route resources, coordinate teams and choose practical solutions." },
      { title: "See the result", copy: "Every scenario ends with a clear recovery, rescue or community transformation." },
    ],
    "business-ready": [
      { title: "Learn simply", copy: "Use clear lessons built around realistic local costs, tools and demand." },
      { title: "Start small", copy: "Launch the smallest useful version before committing major capital." },
      { title: "Earn and repeat", copy: "Track results, improve the model and teach successful methods to others." },
    ],
    "philippines-crafted-sea-salt": [
      { title: "Source nationwide", copy: "Build direct relationships with salt farmers, cooperatives and regional producers across the archipelago." },
      { title: "Protect quality", copy: "Document origin, production method, cleanliness, moisture and lot information before salt enters the export program." },
      { title: "Reach new markets", copy: "Develop retail, food-service, private-label and wholesale formats for qualified domestic and international buyers." },
    ],
    "366-ai-designer": [
      { title: "Describe", copy: "Explain the business, audience and outcome in ordinary language instead of starting with code." },
      { title: "Design", copy: "Shape pages, features, data and user journeys in one visual creation workspace." },
      { title: "Launch", copy: "Connect a reviewed project to hosting, a domain and the services it needs when it is ready." },
    ],
    "pipe-buyer": [
      { title: "List pipe", copy: "Present available pipe with the dimensions, grade, quantity, condition, location and documentation serious buyers need." },
      { title: "Source faster", copy: "Give buyers a focused destination for new, used and surplus oilfield pipe instead of searching through broad equipment marketplaces." },
      { title: "Move inventory", copy: "Connect mills, distributors, yards, contractors and equipment owners with relevant Oil & Gas demand." },
    ],
    "remote-build-zone": [
      { title: "Drive live", copy: "Give approved online users timed control sessions over real RC machines with a managed queue, safety limits and operator handoff." },
      { title: "See every angle", copy: "Combine low-latency FPV for the driver with track cameras and a broadcast feed for viewers, races and replays." },
      { title: "Run continuously", copy: "Build toward battery telemetry, automated pit return, charging docks, autonomous safety behavior and unattended race-cycle recovery." },
    ],
  }[venture.slug] || [],
  nextStep: venture.slug === "365-motor-sales" ? "https://365motorsales.com" : venture.slug === "what-is-owed-to-you" ? "https://whatisowedtoyou.com" : venture.slug === "pipe-buyer" ? "https://www.pipebuyer.com" : venture.slug === "remote-build-zone" ? "https://remote-build-zone.lovable.app" : venture.slug === "worldfix-games" ? "/games" : venture.slug === "the-366-initiative" ? "/humanity" : venture.slug === "366-ai-designer" ? "/ai-designer" : "/about#partner",
}));

export const humanityMissions = [
  { slug: "disaster-response-drones", number: "01 / AIR", title: "Disaster-response drones", copy: "Delivery concepts for food, medicine, communications equipment and GPS-tracked inflatable rafts when roads are cut off.", image: "/assets/drone-guardian.png", outcome: "Reach isolated people faster while keeping trained responders in control." },
  { slug: "coastal-safety", number: "02 / WATER", title: "Coastal safety", copy: "Aerial awareness for sharks, crocodiles, rip currents and people in distress—supporting trained responders, not replacing them.", image: "/assets/humanity-hero.png", outcome: "Give safety teams earlier visual awareness around beaches and waterways." },
  { slug: "community-resilience", number: "03 / LAND", title: "Community resilience", copy: "Modular solar power, water, storage and communications designed for barangays facing storms and prolonged outages.", image: "/assets/community-relief.png", outcome: "Keep essential services available when the grid and supply routes fail." },
  { slug: "wildlife-protection", number: "04 / SCIENCE", title: "Wildlife protection", copy: "Responsible thermal monitoring and mapping tools for researchers, conservation teams and communities living near wildlife.", image: "/assets/hero-solutions-today.png", outcome: "Protect people and animals through earlier, evidence-based awareness." },
];

export const futureIdeas = [
  { title: "Community Power & Water", tag: "Preparedness", copy: "Affordable solar charging, water purification and communications packages for barangays facing storms and outages." },
  { title: "Local Aid Network", tag: "Coordination", copy: "Match urgent community needs with verified supplies, transport, volunteers and donors already close enough to help." },
  { title: "Drone Safety Teams", tag: "Rescue", copy: "Train local operators to support flood response, coastal awareness, medicine delivery and emergency mapping." },
  { title: "Small Business Classroom", tag: "Education", copy: "Short practical courses, buying groups and startup guides that help people turn local skills into dependable income." },
  { title: "Connected Barangays", tag: "Networking", copy: "Give businesses and services simple online identities so residents, visitors and partners can find them easily." },
  { title: "Community Games Studio", tag: "Creativity", copy: "Create accessible mobile games and digital stories that entertain, teach and fund more locally useful projects." },
];
