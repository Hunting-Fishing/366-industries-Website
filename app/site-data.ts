export type Venture = {
  slug: string;
  name: string;
  category: string;
  division: "humanitarian" | "ai" | "commercial" | "games";
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
    slug: "solar-borehole-water-hubs",
    name: "Solar Borehole & Smart Water Hubs",
    category: "Clean Water + Ag-Tech Infrastructure",
    division: "humanitarian",
    status: "Pilot deployment — Ilocos Norte, PH & Global",
    description:
      "Off-grid Dual-Stream Solar Borehole Water Hubs combining deep-aquifer well drilling, solar submersible pumps, multi-stage ultrafiltration, IoT water flow sensors and 24/7 smart prepaid water dispensers for homes, blackout-hit communities and rural farming irrigation.",
    impact:
      "Deliver uninterrupted safe drinking water during typhoon blackouts and diesel-free dry-season groundwater irrigation for smallholder farmers in the Philippines and water-stressed regions globally.",
    href: "/water",
    number: "01",
    image: "/assets/solar-water-hub-hero.png",
  },
  {
    slug: "the-366-initiative",
    name: "The 366 Humanitarian & WildGuard Drone Network",
    category: "Coastal Safety + Disaster Rescue",
    division: "humanitarian",
    status: "Active campaign & field readiness",
    description:
      "A global humanitarian and aerial protection network deploying AI thermal/optical drones to protect coastal communities and swimmers where sharks and saltwater crocodiles roam, while executing rapid disaster search-and-rescue, medical delivery and inflatable raft drops when storms cut off roads.",
    impact:
      "Keep coastlines safe from shark and crocodile encounters and reach isolated disaster survivors faster with trained local responders.",
    href: "/humanity",
    number: "02",
    image: "/assets/coastal-shark-croc-drone.png",
  },
  {
    slug: "366-ai-designer",
    name: "366 AI Designer",
    category: "AI + Product Creation Program",
    division: "ai",
    status: "Builder online • 400B+ AI Roadmap",
    description:
      "An AI-powered creation workspace designed to help people turn an idea into a working website or web application through clear conversation and visual building tools—backed by our sovereign 400B+ parameter AI compute architecture.",
    impact:
      "Give founders, small businesses and community builders the ability to create useful software while helping fund our global humanitarian missions.",
    href: "/ai-designer",
    number: "03",
    image: "/assets/sovereign-ai-400b-core.png",
  },
  {
    slug: "pipe-buyer",
    name: "Pipe Buyer",
    category: "Industrial Oil & Gas Marketplace",
    division: "commercial",
    status: "Marketplace online",
    description:
      "A specialized marketplace for buying and selling oilfield pipe, tubular products and related Oil & Gas equipment, with structured specs and professional dispatch at the center.",
    impact:
      "Connect industrial pipe supply with qualified demand while contributing commercial platform proceeds toward 366 humanitarian water and rescue initiatives.",
    href: "/ventures/pipe-buyer",
    number: "04",
    image: "/assets/pipe-buyer-hero.png",
  },
  {
    slug: "365-motor-sales",
    name: "365 Motor Sales",
    category: "Mobility + Equipment Commerce",
    division: "commercial",
    status: "In development",
    description:
      "A Philippine vehicle and heavy-equipment marketplace connecting buyers, sellers, workshops, parts and verified ownership records.",
    impact:
      "Build a more transparent mobility economy across the Philippines while supporting local field logistics.",
    href: "/ventures/365-motor-sales",
    number: "05",
    image: "/assets/365-motorsales-logo.webp",
  },
  {
    slug: "philippines-crafted-sea-salt",
    name: "Philippines Crafted Sea Salt",
    category: "Coastal Livelihoods + Export",
    division: "commercial",
    status: "Supplier network development",
    description:
      "A nationwide sourcing, quality-assurance and export venture connecting traditional Filipino coastal salt makers with premium domestic and international markets.",
    impact:
      "Create stronger market access for coastal salt-making families in Ilocos Norte and across the archipelago.",
    href: "/ventures/philippines-crafted-sea-salt",
    number: "06",
    image: "/assets/philippines-crafted-sea-salt.png",
  },
  {
    slug: "barangay-buddy",
    name: "Barangay Buddy",
    category: "Local Community Infrastructure",
    division: "commercial",
    status: "In development",
    description:
      "A digital map and micro-commerce layer bringing barangay businesses, water/power hub locations, emergency notices and local services together.",
    impact:
      "Make every local business and community resource easier to find, trust and support.",
    href: "/ventures/barangay-buddy",
    number: "07",
    image: "/assets/community-hero.png",
  },
  {
    slug: "what-is-owed-to-you",
    name: "What Is Owed To You",
    category: "Consumer Rights Intelligence",
    division: "commercial",
    status: "Active build",
    description:
      "A recall and consumer-rights discovery platform designed to help everyday people find legitimate compensation, safety notices and unresolved value.",
    impact:
      "Turn scattered public notices into practical consumer action.",
    href: "/ventures/what-is-owed-to-you",
    number: "08",
    image: "/assets/community-relief.png",
  },
  {
    slug: "business-ready",
    name: "Business Ready",
    category: "Rural Prosperity & Training",
    division: "commercial",
    status: "Program design",
    description:
      "Practical, locally grounded startup training for small operators in clean water, solar, aquaculture, food processing, repair and circular industry.",
    impact:
      "Move community members from an idea to their first independent, sustainable income stream.",
    href: "/ventures/business-ready",
    number: "09",
    image: "/assets/community-hero.png",
  },
  {
    slug: "worldfix-games",
    name: "366 Purpose-Led Games",
    category: "Interactive Media & Impact Funding",
    division: "games",
    status: "Prototype portfolio",
    description:
      "Purpose-led tabletop and digital games where players prepare for disasters, repair infrastructure, coordinate drone rescues and help fund real-world humanitarian deployments.",
    impact:
      "Turn preparedness and problem-solving into replayable entertainment that channels proceeds into clean water and rescue operations.",
    href: "/ventures/worldfix-games",
    number: "10",
    image: "/assets/carrington-protocol-hero.png",
  },
  {
    slug: "remote-build-zone",
    name: "Remote Build Zone",
    category: "Interactive Robotics + Telemetry",
    division: "games",
    status: "Prototype online",
    description:
      "A live remote-control robotics platform where online users operate physical RC vehicles, construction machines and drones through low-latency camera feeds and managed telemetry sessions.",
    impact:
      "Advance remote telemetry, operator handoff and autonomous docking while engaging global audiences.",
    href: "/ventures/remote-build-zone",
    number: "11",
    image: "/assets/ventures-hero.png",
  },
];

export const projectDetails: ProjectDetail[] = ventures.map((venture) => ({
  ...venture,
  headline:
    {
      "the-366-initiative":
        "Coastal shark & crocodile drone protection, rapid disaster search-and-rescue and community water resilience.",
      "365-motor-sales":
        "One trusted Philippine marketplace for vehicles, equipment, parts and the people who keep them moving.",
      "barangay-buddy":
        "Make local businesses, community water hubs and essential services visible on one useful map.",
      "what-is-owed-to-you":
        "Turn recalls, settlements and consumer notices into clear actions people can actually take.",
      "worldfix-games":
        "Prepare, cooperate and play through real-world challenges in tabletop and digital worlds that help fund humanitarian work.",
      "business-ready":
        "Short, practical paths from local skill to a working small business and independent income.",
      "philippines-crafted-sea-salt":
        "Source distinctive sea salt from coastal producers across the Philippines and prepare it for responsible, premium export.",
      "366-ai-designer":
        "Move from a rough idea to a structured, visual and deployable digital product in one guided workspace.",
      "pipe-buyer":
        "A focused marketplace built to connect pipe inventory with Oil & Gas buyers who are ready to source.",
      "remote-build-zone":
        "Drive real machines from anywhere: FPV racing, track cameras, queued online control and a path toward autonomous operation.",
      "solar-borehole-water-hubs":
        "Deep borehole drilling, off-grid solar pumping, multi-stage filtration, IoT flow sensors and smart prepaid water dispensers for homes, blackout-hit communities and rural farms.",
    }[venture.slug] || venture.impact,
  overview: venture.description,
  pillars:
    {
      "the-366-initiative": [
        {
          title: "Coastal Shark & Crocodile Overwatch",
          copy: "Deploy AI-assisted thermal and optical drones along coastlines, river mouths and beaches where sharks and saltwater crocodiles roam—alerting swimmers, fishermen and lifeguards before encounters occur.",
        },
        {
          title: "Disaster Search & Rescue",
          copy: "Deliver emergency drinking water, trauma medicine, satellite communications and GPS-tracked self-inflating rescue rafts when typhoons and floods cut off roads.",
        },
        {
          title: "Locally Operated & Audited",
          copy: "Train licensed local pilots, lifeguards and barangay responders with transparent safety protocols and measurable grant telemetry.",
        },
      ],
      "365-motor-sales": [
        {
          title: "Discover",
          copy: "Browse vehicles, motorcycles, equipment, parts and trusted automotive services nationwide.",
        },
        {
          title: "Build trust",
          copy: "Use verification, reporting and practical transaction guidance to make deals safer.",
        },
        {
          title: "Grow",
          copy: "Give sellers, dealers, workshops and service providers tools to reach more customers.",
        },
      ],
      "barangay-buddy": [
        {
          title: "Find local",
          copy: "Surface nearby businesses, services and useful community resources.",
        },
        {
          title: "Support income",
          copy: "Give small operators a simple digital presence that customers can discover.",
        },
        {
          title: "Connect needs",
          copy: "Help residents and visitors understand what is available in each barangay.",
        },
      ],
      "what-is-owed-to-you": [
        {
          title: "Find",
          copy: "Bring scattered recall and consumer-rights information into one searchable experience.",
        },
        {
          title: "Understand",
          copy: "Explain what a notice means, who may qualify and which next step matters.",
        },
        {
          title: "Act",
          copy: "Help people document, track and follow legitimate claims without promising outcomes.",
        },
      ],
      "worldfix-games": [
        {
          title: "Prepare together",
          copy: "Carrington Protocol turns infrastructure resilience and cooperative recovery into a physical board-game challenge.",
        },
        {
          title: "Build the answer",
          copy: "World Fix and the digital portfolio let players route resources, coordinate teams and choose practical solutions.",
        },
        {
          title: "Fund real impact",
          copy: "Proceeds from 366 Games support our humanitarian water hubs and coastal rescue drone deployments.",
        },
      ],
      "business-ready": [
        {
          title: "Learn simply",
          copy: "Use clear lessons built around realistic local costs, tools and demand.",
        },
        {
          title: "Start small",
          copy: "Launch the smallest useful version before committing major capital.",
        },
        {
          title: "Earn and repeat",
          copy: "Track results, improve the model and teach successful methods to others.",
        },
      ],
      "philippines-crafted-sea-salt": [
        {
          title: "Source nationwide",
          copy: "Build direct relationships with salt farmers, cooperatives and regional producers across the archipelago.",
        },
        {
          title: "Protect quality",
          copy: "Document origin, production method, cleanliness, moisture and lot information before salt enters the export program.",
        },
        {
          title: "Reach new markets",
          copy: "Develop retail, food-service, private-label and wholesale formats for qualified domestic and international buyers.",
        },
      ],
      "366-ai-designer": [
        {
          title: "Describe",
          copy: "Explain the business, audience and outcome in ordinary language instead of starting with code.",
        },
        {
          title: "Design",
          copy: "Shape pages, features, data and user journeys in one visual creation workspace.",
        },
        {
          title: "Launch",
          copy: "Connect a reviewed project to hosting, a domain and the services it needs when it is ready.",
        },
      ],
      "pipe-buyer": [
        {
          title: "List pipe",
          copy: "Present available pipe with the dimensions, grade, quantity, condition, location and documentation serious buyers need.",
        },
        {
          title: "Source faster",
          copy: "Give buyers a focused destination for new, used and surplus oilfield pipe instead of searching through broad equipment marketplaces.",
        },
        {
          title: "Move inventory",
          copy: "Connect mills, distributors, yards, contractors and equipment owners with relevant Oil & Gas demand.",
        },
      ],
      "remote-build-zone": [
        {
          title: "Drive live",
          copy: "Give approved online users timed control sessions over real RC machines with a managed queue, safety limits and operator handoff.",
        },
        {
          title: "See every angle",
          copy: "Combine low-latency FPV for the driver with track cameras and a broadcast feed for viewers, races and replays.",
        },
        {
          title: "Run continuously",
          copy: "Build toward battery telemetry, automated pit return, charging docks, autonomous safety behavior and unattended race-cycle recovery.",
        },
      ],
      "solar-borehole-water-hubs": [
        {
          title: "Drill & power with solar",
          copy: "Tap deep, climate-resilient aquifers with 100% off-grid solar submersible pumps so homes and communities never lose water during grid outages or typhoons.",
        },
        {
          title: "Filter & dispense 24/7",
          copy: "Deliver safe household drinking water through multi-stage ultrafiltration, UV purification and RFID smart prepaid water dispensers that self-fund local maintenance.",
        },
        {
          title: "Irrigate & monitor via IoT",
          copy: "Route metered borehole water through IoT water flow sensors to rural smallholder farms during the dry season while protecting aquifer health in real time.",
        },
      ],
    }[venture.slug] || [],
  nextStep:
    venture.slug === "365-motor-sales"
      ? "https://365motorsales.com"
      : venture.slug === "what-is-owed-to-you"
      ? "https://whatisowedtoyou.com"
      : venture.slug === "pipe-buyer"
      ? "https://www.pipebuyer.com"
      : venture.slug === "remote-build-zone"
      ? "https://remote-build-zone.lovable.app"
      : venture.slug === "worldfix-games"
      ? "/games"
      : venture.slug === "the-366-initiative"
      ? "/humanity"
      : venture.slug === "366-ai-designer"
      ? "/ai-designer"
      : "/about#partner",
}));

export const humanityMissions = [
  {
    slug: "coastal-safety",
    number: "01 / COASTAL & WATERWAY PROTECTION",
    title: "Shark & Crocodile Drone Protection Network",
    copy: "AI-assisted aerial, polarized-optical and thermal drone patrols along coastlines, beaches, river mouths and estuaries where sharks, saltwater crocodiles and rip currents threaten swimmers, families and fishermen.",
    image: "/assets/coastal-shark-croc-drone.png",
    outcome:
      "Provide real-time early warning, automated beach/community alerts, lifeguard dispatch and drop-deployed flotation devices so coastal communities and visitors stay safe in the water.",
    specs: [
      "Edge-AI Shark & Saltwater Crocodile Detection (Optical + Thermal IR)",
      "Polarized Glare-Reduction Lenses for Sub-Surface Water Visibility",
      "Automated Acoustic Early-Warning Speaker & Lifeguard Alert Dispatch",
      "Drop-Deployable Self-Inflating Rescue Flotation Pods for Rip Currents",
    ],
  },
  {
    slug: "disaster-response-drones",
    number: "02 / EMERGENCY SEARCH & RESCUE",
    title: "Disaster-Response & Rescue UAV Fleet",
    copy: "All-weather heavy-payload and thermal reconnaissance drones engineered to locate stranded survivors and deliver clean water, trauma medicine, emergency radios and GPS-tracked inflatable rescue rafts when typhoons or floods sever roads.",
    image: "/assets/disaster-rescue-drone.png",
    outcome:
      "Reach isolated families across flooded barangays, washed-out bridges and storm-hit coastlines in minutes rather than days while keeping human responders out of lethal hazards.",
    specs: [
      "Thermal Night/Storm Search-and-Rescue Survivor Detection",
      "Heavy-Payload Delivery: Clean Water, Medical Kits & Satellite Comms",
      "GPS-Tracked Self-Inflating Emergency Raft Deployment",
      "Offline Mesh Telemetry Powered by Sovereign 400B+ Local AI Node",
    ],
  },
  {
    slug: "community-resilience",
    number: "03 / GLOBAL WATER INNOVATION",
    title: "Solar Borehole & Smart Water Hubs",
    copy: "Off-grid Dual-Stream Solar Borehole Water Hubs combining deep well drilling, solar submersible pumps, multi-stage ultrafiltration, IoT water flow sensors, 24/7 smart prepaid dispensers and dry-season farm irrigation.",
    image: "/assets/solar-water-hub-hero.png",
    outcome:
      "Guarantee 24/7 safe drinking water during grid blackouts and typhoons while providing diesel-free groundwater irrigation for smallholder farmers.",
    specs: [
      "Deep-Aquifer Borehole Drilling & 100% Solar Submersible Pumping",
      "Multi-Stage Ultrafiltration + UV Meeting WHO & PNSDW Standards",
      "24/7 RFID Smart Prepaid Water Dispensers Funding Local Maintenance",
      "Inline Digital IoT Flow Sensors & Metered Smallholder Farm Hydrants",
    ],
  },
  {
    slug: "wildlife-protection",
    number: "04 / HUMAN-WILDLIFE COEXISTENCE",
    title: "Ecological & Watershed Monitoring",
    copy: "Non-invasive thermal mapping, estuarine crocodile habitat tracking, marine megafauna monitoring and hydrogeological watershed surveys for conservation scientists and rural municipalities.",
    image: "/assets/sovereign-ai-400b-core.png",
    outcome:
      "Protect both human lives and vulnerable marine/estuarine species through non-lethal early warning, habitat mapping and science-backed coexistence.",
    specs: [
      "Non-Lethal Shark & Crocodile Movement Mapping (No Nets / No Drumlines)",
      "Estuarine & Riverine Nesting/Migration Corridor Telemetry",
      "Multispectral Watershed, Aquifer Recharge & Floodplain Mapping",
      "Open Research Data for Universities, LGUs & Conservation Grants",
    ],
  },
];

export const futureIdeas = [
  {
    title: "Solar Borehole & Smart Water Hubs",
    tag: "Clean Water + Ag-Tech",
    copy: "Deep borehole drilling, solar submersible pumps, multi-stage filtration, IoT water flow sensors and smart prepaid water dispensers serving homes, outage-hit barangays and rural farmers in Ilocos Norte and globally.",
  },
  {
    title: "Coastal Shark & Crocodile Safe-Zone Network",
    tag: "Coastal Drone Overwatch",
    copy: "Solar-charged drone stations positioned along high-risk beaches, river mouths and fishing villages to spot sharks, crocodiles and rip currents before accidents happen.",
  },
  {
    title: "Typhoon & Flood Drone Rescue Teams",
    tag: "Disaster Search & Rescue",
    copy: "Train and equip local barangay and municipal operators to fly thermal reconnaissance, drop inflatable rescue rafts and deliver emergency water and medicine when roads fail.",
  },
  {
    title: "Local Aid & Water Telemetry Network",
    tag: "Humanitarian Coordination",
    copy: "Connect real-time IoT borehole water levels, solar battery reserves and emergency supply inventories with verified municipal responders and international grant auditors.",
  },
  {
    title: "Small Business & Technician Classroom",
    tag: "Livelihoods & Education",
    copy: "Practical training teaching local residents how to maintain solar water hubs, operate coastal safety drones and build independent rural enterprises.",
  },
  {
    title: "Purpose-Led Community Games Studio",
    tag: "Impact Media",
    copy: "Create accessible tabletop and digital games that simulate disaster readiness and infrastructure recovery while channeling proceeds into real-world water and drone deployments.",
  },
];
