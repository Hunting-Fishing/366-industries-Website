export type BriefId = "water" | "coastal" | "rescue" | "ai";

type BriefItem = { title: string; text: string };
type BriefPanel = {
  id: "overview" | "delivery" | "funding" | "evidence" | "governance";
  label: string;
  title: string;
  intro: string;
  items: BriefItem[];
};

export type ProjectBrief = {
  title: string;
  eyebrow: string;
  summary: string;
  status: string;
  image: string;
  grantFocus: string;
  panels: BriefPanel[];
};

export const projectBriefs: Record<BriefId, ProjectBrief> = {
  water: {
    title: "Solar Borehole & Smart Water Hubs",
    eyebrow: "01 / Global clean-water infrastructure",
    image: "/assets/solar-water-hub-hero.png",
    summary: "A replicable, off-grid water access model connecting groundwater assessment, solar pumping, treatment, community dispensing and measured irrigation.",
    status: "Concept and pilot development • locations and partners to be validated",
    grantFocus: "WASH • climate adaptation • food security • rural infrastructure",
    panels: [
      { id: "overview", label: "The case", title: "A long-term service, not just a drilled well", intro: "The aim is to make community water reliable, safe, measurable and maintainable after a grant period ends.", items: [
        { title: "The need", text: "Water access can fail when pumps rely on unreliable grids, treatment is absent, aquifers are poorly assessed or maintenance has no funding source." },
        { title: "Proposed solution", text: "Site-specific boreholes connect to solar pumps, safe storage, appropriate treatment, supervised dispensing, meters and a local operating model." },
        { title: "Who could benefit", text: "Water-stressed households, clinics, emergency shelters and smallholder farms—subject to consultation, water-rights assessment and technical feasibility." },
      ]},
      { id: "delivery", label: "Technical plan", title: "Six linked implementation workstreams", intro: "Every site would be designed against a documented local demand assessment rather than a universal equipment template.", items: [
        { title: "01 / Survey and approvals", text: "Hydrogeology, water rights, environmental review, baseline sampling, demand mapping and community consultation before drilling." },
        { title: "02 / Build and commission", text: "Permitted borehole works, pump sizing, solar/storage engineering, water-quality treatment validation and operational acceptance tests." },
        { title: "03 / Operations and skills", text: "Train local operators; establish sampling schedules, preventative maintenance, spares inventory, fee safeguards and outage procedures." },
      ]},
      { id: "funding", label: "Funding", title: "What a funder would finance", intro: "Site-specific costings, procurement quotes and a staged disbursement plan must be attached before making a formal funding request.", items: [
        { title: "Capital works", text: "Geophysical studies, drilling, sanitary protection, pumps, solar modules, batteries if justified, storage, filtration, meters and civil works." },
        { title: "Community capacity", text: "Independent water testing, technician training, safeguarding, accessibility, documentation and start-up maintenance reserves." },
        { title: "Financing approach", text: "Potential mix of project grants, corporate sponsorships, local co-funding and separately negotiated investment. No investor return or cost-saving outcome is guaranteed." },
      ]},
      { id: "evidence", label: "Impact metrics", title: "Evidence donors and grant reviewers can audit", intro: "Performance claims will be measured after commissioning against a baseline and publicly distinguished from targets.", items: [
        { title: "Water access", text: "Commissioned uptime, liters dispensed by use category, service hours, breakdown duration and households reached—without identifying residents." },
        { title: "Safety and resilience", text: "Independent drinking-water laboratory reports, response to failed samples, power-outage performance, extraction monitoring and aquifer stewardship." },
        { title: "Community outcomes", text: "Affordability surveys, operating costs, maintenance reserve balance and farmer uptake compared against locally verified baseline data." },
      ]},
      { id: "governance", label: "Due diligence", title: "Documents required before deployment", intro: "The items below are requirements for a credible grant or investment package—not a claim that they are already completed.", items: [
        { title: "Technical assurance", text: "Water-use permits, hydrogeology report, treatment process design, lab results, engineer sign-offs, supplier warranties and contingency plans." },
        { title: "Financial assurance", text: "Itemized bill of quantities, independent quotations, source-of-funds record, milestone budget, expense controls and maintenance commitments." },
        { title: "Social safeguards", text: "Site consent, community governance, equitable access policy, grievance route, data privacy and a documented exit/asset-transfer plan." },
      ]},
    ],
  },
  coastal: {
    title: "WildGuard Coastal Safety Drone Network",
    eyebrow: "02 / Non-lethal coastal and waterway safety",
    image: "/assets/coastal-shark-croc-drone.png",
    summary: "A proposed aerial observation and early-warning capability to help trained coastal responders monitor hazardous conditions without harming wildlife.",
    status: "Research and deployment planning • no operational detection claims",
    grantFocus: "Public safety • marine conservation • community resilience • responsible AI",
    panels: [
      { id: "overview", label: "The case", title: "Faster awareness for coastal safety teams", intro: "Human responders remain responsible for decisions; drones are supporting tools, not a guarantee that hazards can be detected.", items: [
        { title: "The challenge", text: "Coastal hazards are difficult to observe from shore, especially in glare, poor weather, surf and estuary environments." },
        { title: "Proposed capability", text: "Aerial observation, geolocated reporting and defined communication protocols for lifeguards and authorized maritime responders." },
        { title: "Community relevance", text: "Candidate users include public beaches, fishing communities, estuaries and emergency teams where local partners identify a documented safety need." },
      ]},
      { id: "delivery", label: "Technical plan", title: "Pilot, validate, then expand", intro: "Deployment must be limited by aviation rules, weather and independent field-validation results.", items: [
        { title: "01 / Stakeholder and risk study", text: "Agree patrol boundaries, protected habitats, privacy standards, incident procedures and responsible agencies." },
        { title: "02 / Flight and detection pilot", text: "Test optical sensors, visibility limits, battery endurance and candidate AI classifiers using controlled, ethically sourced validation datasets." },
        { title: "03 / Responder handoff", text: "Run drills, establish alert thresholds, track false positives/negatives and train responders to confirm hazards before issuing warnings." },
      ]},
      { id: "funding", label: "Funding", title: "Proposed funding uses", intro: "The model can be presented to public-safety grantmakers and conservation partners once quotations and a validated pilot protocol exist.", items: [
        { title: "Aircraft and ground station", text: "Commercially supportable UAV platforms, optical equipment, chargers, weather monitoring, field computers and replacements." },
        { title: "Responsible AI and trials", text: "Labeled data, independent sensor evaluation, controlled flights, auditing, alert integration, regulatory permits and insurance." },
        { title: "Community operations", text: "Lifeguard training, maintenance, incident reporting and public information that clearly communicates system limitations." },
      ]},
      { id: "evidence", label: "Impact metrics", title: "Publish both successes and detection limits", intro: "Accuracy must be validated for specific species, local conditions, sensor types and safe operating distances.", items: [
        { title: "Field performance", text: "Document sorties, coverage hours, weather no-go days, sensor visibility and equipment downtime." },
        { title: "AI quality", text: "Independent detection sensitivity, precision, missed events, false alarms and environment-specific limitations." },
        { title: "Community benefit", text: "Responder drill outcomes, alert-to-acknowledgement times, adoption by authorized teams and community safety feedback." },
      ]},
      { id: "governance", label: "Due diligence", title: "Safety, permissions and wildlife protection", intro: "No fully autonomous rescue or wildlife-safety guarantees should be made prior to field testing and formal approval.", items: [
        { title: "Approvals", text: "Flight authorization, local maritime/coastal permissions, conservation restrictions, insurance and trained pilot documentation." },
        { title: "Privacy and accountability", text: "Data minimization, limited image retention, consent and notice measures, human verification and a false-alarm escalation policy." },
        { title: "Deployment stage gates", text: "Written pilot protocol, external evaluation, procurement review, operating budget and independent go/no-go safety sign-off." },
      ]},
    ],
  },
  rescue: {
    title: "Disaster Response & Rescue UAVs",
    eyebrow: "03 / Disaster readiness and last-mile relief",
    image: "/assets/disaster-rescue-drone.png",
    summary: "A phased disaster-response program investigating aerial search, communications support and emergency payload delivery for communities isolated by extreme events.",
    status: "Concept / controlled-test planning • emergency operations subject to authorization",
    grantFocus: "Disaster risk reduction • emergency preparedness • resilient communications",
    panels: [
      { id: "overview", label: "The case", title: "Keep access open when infrastructure fails", intro: "Drones can support trained incident commanders only within safe payload, aircraft, weather and airspace limits.", items: [
        { title: "The operating challenge", text: "Flooding, washed-out crossings and communications outages can slow initial damage assessment and emergency supply coordination." },
        { title: "Program intent", text: "Plan aerial mapping, daytime/thermal reconnaissance where suitable, and delivery of authorized small emergency supplies." },
        { title: "Not a substitute", text: "Aircraft do not replace helicopters, rescue boats, medical response teams or incident-command procedures." },
      ]},
      { id: "delivery", label: "Technical plan", title: "Train safely before a real emergency", intro: "Capabilities such as inflatable raft drops remain proposed and require engineering validation and regulator approval.", items: [
        { title: "01 / Mission design", text: "Agree search routes, command hierarchy, communications interoperability, hazard maps and risk thresholds with local responders." },
        { title: "02 / Controlled exercises", text: "Test payload containment, delivery accuracy, range, return-to-home, safe battery margins and day/night performance in authorized conditions." },
        { title: "03 / Emergency integration", text: "Document dispatch approval, medical chain-of-custody, incident logging, post-flight review and equipment readiness checks." },
      ]},
      { id: "funding", label: "Funding", title: "An accountable response-readiness budget", intro: "A fundable proposal separates capital purchases from recurring training and operating expenditures.", items: [
        { title: "Aircraft and equipment", text: "Suitable platforms, payload hardware, spare batteries, thermal cameras if justified, safety cases and charging/communications support." },
        { title: "Training and exercises", text: "Qualified pilots, incident commanders, emergency partners, safety observers, insurance, simulation and field drills." },
        { title: "Long-term readiness", text: "Maintenance, consumables, deployment transport, secure storage, periodic audits and replacement planning." },
      ]},
      { id: "evidence", label: "Impact metrics", title: "Track readiness before making rescue claims", intro: "The initial program should report preparedness and field-test measures, not hypothetical lives saved.", items: [
        { title: "Response readiness", text: "Dispatch preparation time, equipment availability, number of trained personnel, exercise completion and authorized incident participation." },
        { title: "Operational reliability", text: "Payload delivery accuracy in tests, navigation integrity, communications uptime and safety incidents or near misses." },
        { title: "Independent review", text: "Exercise reports signed by partner responders, procurement records and documented improvements after each pilot." },
      ]},
      { id: "governance", label: "Due diligence", title: "Controls that protect communities and crews", intro: "Grant commitments should be subject to partner agreements and a formal safety case.", items: [
        { title: "Regulatory fit", text: "Civil aviation permissions, coordination with active incident airspace, radio rules, medical delivery restrictions and liability coverage." },
        { title: "Safety gates", text: "Payload release assessments, exclusion zones, safe return procedures, weather limits and a trained human-in-command requirement." },
        { title: "Reporting", text: "Expense ledgers, inventory controls, documented consent for data collection and incident/near-miss disclosure." },
      ]},
    ],
  },
  ai: {
    title: "366 AI Designer & Sovereign AI Program",
    eyebrow: "04 / Digital infrastructure and field technology",
    image: "/assets/sovereign-ai-400b-core.png",
    summary: "A digital product-creation platform paired with a longer-term plan to evaluate local and offline AI systems for community and humanitarian infrastructure.",
    status: "Software platform operating • proposed future compute expansion",
    grantFocus: "Digital inclusion • technology development • resilience R&D • workforce skills",
    panels: [
      { id: "overview", label: "The case", title: "Build useful tools and support real-world missions", intro: "The available software builder and planned large-model compute infrastructure are different stages and should be evaluated separately.", items: [
        { title: "Software access", text: "Help approved users prototype websites, applications, game concepts and digital services with guided AI-assisted workflows." },
        { title: "Community benefit", text: "Explore practical software for water-asset records, incident reporting, localized directories, education and volunteer coordination." },
        { title: "Future R&D", text: "Assess the cost, licensing, energy requirements and operational viability of offline models; 400B+ scale is a roadmap, not a deployed capability." },
      ]},
      { id: "delivery", label: "Technical plan", title: "Different milestones for product and research", intro: "Delivery should be incremental, measured and restricted by security, user consent and available hardware.", items: [
        { title: "01 / Reliable builder", text: "Stabilize user projects, secure authentication, previews, deployments, accessibility and reproducible software builds." },
        { title: "02 / Field prototypes", text: "Prove telemetry integrations, offline queues and secure synchronization with representative community use cases." },
        { title: "03 / AI compute evaluation", text: "Benchmark candidate open models, inference hardware, power consumption, data protection, performance and total cost of ownership." },
      ]},
      { id: "funding", label: "Funding", title: "Separate platform revenue from grant deliverables", intro: "Funding opportunities may include product partnerships, responsible R&D grants and project-specific sponsorships, with distinct reporting and terms.", items: [
        { title: "Platform development", text: "Engineering time, secure hosting, backups, quality assurance, accessibility and reliable user support." },
        { title: "Research equipment", text: "Pilot hardware or cloud test allocation only after approved specifications and benchmark results support the expense." },
        { title: "Humanitarian integrations", text: "Telemetry prototypes, responder training tools, maintenance dashboards and measurable community-facing demonstrations." },
      ]},
      { id: "evidence", label: "Impact metrics", title: "Demonstrate product traction and public value", intro: "The investor case should use verifiable financial metrics; the grant case should use beneficiary and technical outcomes.", items: [
        { title: "Commercial evidence", text: "Active users, retention, customer acquisition cost, revenue, support burden and gross margin, reported only from verified records." },
        { title: "Engineering evidence", text: "Deployment success, build reliability, defect rates, inference benchmarks, cost per task and energy consumption." },
        { title: "Community benefit", text: "Number of successfully piloted tools, accessibility outcomes, partner adoption and independently confirmed time or cost savings." },
      ]},
      { id: "governance", label: "Due diligence", title: "Security and responsible deployment by design", intro: "No grant award, model performance or investment outcome is implied by this proposed roadmap.", items: [
        { title: "Security", text: "Document permissions, data processing, project isolation, disaster recovery, dependency licensing, penetration testing and incident response." },
        { title: "Financial review", text: "Distinguish current operating cost from planned capital purchases, audited statements if available, and approved spending caps." },
        { title: "Governance", text: "Explain model limitations, human review requirements, project ownership, contributor rights and safeguards for sensitive field data." },
      ]},
    ],
  },
};
