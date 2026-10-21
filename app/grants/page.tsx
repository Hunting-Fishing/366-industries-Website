import { ArrowLink, Shell } from "../components";

export const metadata = {
  title: "Institutional Grants, Equipment & R&D Roadmap | 366 Industries & 1st Defence Industries",
  description: "Full-mission institutional grant and capital equipment roadmap for 366 Industries and 1st Defence Industries: Solar Borehole Water Hubs, WildGuard Disaster-Response Drones, Clean Energy Microgrids, 400B+ Parameter Local AI Compute Infrastructure, and Field Vehicles & Drilling Equipment.",
};

const fivePillars = [
  [
    "01 / CLEAN WATER & AG-TECH",
    "Solar Borehole & Smart Water Hubs",
    "Deep-aquifer borehole drilling, 100% off-grid solar submersible pumps, multi-stage water filtration, IoT water flow sensors, 24/7 RFID smart prepaid water dispensers and dry-season rural farming irrigation across Ilocos Norte, Philippines and globally.",
  ],
  [
    "02 / AERIAL & RESCUE SYSTEMS",
    "WildGuard Drone Network",
    "Long-range disaster-response drones for emergency medicine, food and inflatable raft delivery when roads fail, thermal coastal/wildlife safety monitoring, and aerial hydrogeological mapping to site new community water wells.",
  ],
  [
    "03 / CLEAN ENERGY MICROGRIDS",
    "Blackout-Resilient Solar & Storage",
    "Modular solar PV arrays, high-cycle LiFePO4 battery storage and community power stations engineered to keep water hubs, homes, farm pumps and emergency communications running during Super Typhoons and prolonged grid outages.",
  ],
  [
    "04 / SOVEREIGN AI COMPUTE",
    "400B+ Parameter Local AI Cluster",
    "Dedicated high-VRAM on-premise AI compute workstation/server architecture engineered to run 400B+ parameter reasoning, coding and multimodal vision models locally—powering 366 AI Designer, real-time drone thermal vision, aquifer modeling and zero-internet disaster operations.",
  ],
  [
    "05 / FIELD FLEET & HEAVY EQUIPMENT",
    "Vehicles, Drilling Rigs & Mobile Command",
    "4x4 off-road field utility trucks, mobile borehole drilling rigs, trailer-mounted solar/filtration units and mobile drone command/charging vehicles built to deploy into mountainous, unpaved and storm-damaged rural barangays.",
  ],
  [
    "06 / TRI-NATIONAL AUDITABILITY",
    "Canada • Philippines • USA",
    "Integrated corporate and field execution across 1st Defence Industries & 366 Industries (British Columbia, Canada), Ilocos Norte Field Operations (Philippines) and Wyoming LLC (USA) with open IoT telemetry and ring-fenced grant accounting.",
  ],
];

const equipmentSpecs = [
  "400B+ Local AI Compute Node (Multi-GPU / High-VRAM)",
  "Mobile Deep-Aquifer Borehole Drilling Rig & Casing",
  "4x4 Field Utility & Mobile Drone Command Vehicles",
  "Solar Submersible Pumps & LiFePO4 Clean Energy Banks",
  "Ultrafiltration, UV, IoT Flow Sensors & Smart Dispensers",
  "Thermal Search-and-Rescue & Heavy-Payload Delivery Drones",
];

const capitalStreams = [
  [
    "Stream 01 — Water, Sanitation & Climate-Smart Agriculture Grants",
    "Funds deep borehole drilling rigs, solar submersible pumps, multi-stage water filtration, IoT water flow sensors, smart prepaid water dispensers and rural farm irrigation in Ilocos Norte (Global Innovation Fund, D-Prize, DOST-PCIEERD/CRADLE, Grand Challenges Canada, FIT & Rotary Global WASH Grants).",
  ],
  [
    "Stream 02 — Sovereign 400B+ AI Compute & Software R&D Grants",
    "Funds on-premise high-VRAM AI server/workstation hardware capable of executing 400B+ parameter models locally without cloud bottlenecks—supporting 366 AI Designer, autonomous drone telemetry and offline disaster intelligence (NRC IRAP Canada, SR&ED, PacifiCan, DOST Startup Grant Fund & Enterprise AI Hardware Grants).",
  ],
  [
    "Stream 03 — Disaster Resilience, Clean Energy & Autonomous Drone Grants",
    "Funds WildGuard search-and-rescue drones, thermal imaging payloads, modular community solar microgrids and blackout power stations for typhoon-vulnerable coastal and rural municipalities (Humanitarian Grand Challenges, Climate Adaptation Funds & LGU DRRM Calamity Partnerships).",
  ],
  [
    "Stream 04 — Field Vehicles, Mobile Rigs & Last-Mile Logistics Capital",
    "Funds 4x4 field engineering trucks, trailer-mounted borehole rigs and mobile command/repair units required to transport drilling, solar and drone hardware into remote rural barangays and agricultural zones.",
  ],
];

export default function GrantsPage() {
  return (
    <Shell>
      <section className="pipe-hero" style={{ backgroundImage: "url('/assets/hero-solutions-today.png')" }}>
        <div className="pipe-hero-shade" />
        <div className="pipe-hero-copy">
          <div className="pipe-status">
            <i /> Institutional Grant, R&amp;D &amp; Capital Equipment Dossier • 1st Defence Industries &amp; 366 Industries
          </div>
          <div className="section-label">Canada (BC) • Philippines (Ilocos Norte) • United States (Wyoming)</div>
          <h1>
            Clean water. Clean energy.<br />
            <em>Drones &amp; 400B+ AI.</em><br />
            Built for the field.
          </h1>
          <p className="pipe-lead">
            A unified operational and audit dossier for grantmakers, government R&amp;D agencies and institutional funders supporting our deployments across Solar Borehole Water Hubs, WildGuard Disaster Drones, Clean Energy Microgrids, 400B+ Local AI Compute and Field Vehicles &amp; Drilling Equipment.
          </p>
          <div className="actions">
            <ArrowLink href="/water">Solar Water Hubs Dossier</ArrowLink>
            <ArrowLink href="mailto:partnerships@366industries.com" secondary>
              Contact Grant &amp; Audit Desk
            </ArrowLink>
          </div>
          <div className="pipe-audiences">
            <span>SOLAR BOREHOLE DRILLING</span>
            <span>WILDGUARD DRONES</span>
            <span>CLEAN ENERGY MICROGRIDS</span>
            <span>400B+ LOCAL AI COMPUTE</span>
            <span>4X4 FIELD VEHICLES &amp; RIGS</span>
            <span>IOT TELEMETRY</span>
          </div>
        </div>
      </section>

      <section className="pipe-value section">
        <div>
          <div className="section-label">Why our mission requires integrated hardware &amp; compute</div>
          <h2>Software alone cannot drill a well, fly in a typhoon or run when the grid is down.</h2>
        </div>
        <div>
          <p>
            <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> solve physical, last-mile challenges in regions where infrastructure is fragile. Delivering safe drinking water to homes during power outages, irrigating smallholder farms during 6-month droughts in <strong>Ilocos Norte</strong>, flying search-and-rescue drones after storms, and running <strong>400B+ parameter AI models</strong> for software creation and offline disaster analysis requires dedicated physical capital: <strong>borehole drilling rigs, solar &amp; battery arrays, heavy-duty 4x4 field vehicles, industrial drones, and high-VRAM local AI compute workstations</strong>.
          </p>
          <div className="pipe-proof">
            <b>100% Mission-Aligned Capital Deployment</b>
            <span>Every piece of compute, drilling, solar, drone and vehicle hardware directly serves measurable field outcomes and R&amp;D milestones.</span>
          </div>
        </div>
      </section>

      <section className="pipe-spec-band">
        <div>
          <div className="section-label">Capital equipment &amp; technical readiness</div>
          <h2>Core infrastructure required for our 2026–2027 deployments.</h2>
        </div>
        <div className="pipe-spec-grid">
          {equipmentSpecs.map((x, i) => (
            <span key={x}>
              <b>0{i + 1}</b>
              {x}
            </span>
          ))}
        </div>
      </section>

      <section className="section pipe-buyers">
        <div className="section-heading">
          <div>
            <div className="section-label">Five-pillar mission architecture</div>
            <h2>One ecosystem. Five reinforcing capabilities.</h2>
          </div>
          <p>
            Each division of 366 Industries and 1st Defence Industries shares engineering, AI compute, field vehicles and local technician teams—multiplying the impact of every grant dollar invested.
          </p>
        </div>
        <div className="pipe-feature-grid">
          {fivePillars.map(([n, t, c]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pipe-sides">
        <article>
          <span>400B+ LOCAL AI COMPUTE</span>
          <h2>Sovereign AI without cloud limits.</h2>
          <p>
            Running 400B+ parameter models on dedicated in-house high-VRAM hardware powers <strong>366 AI Designer</strong>, processes drone thermal/aerial mapping, models groundwater aquifers and guarantees offline AI inference when typhoons sever internet connectivity.
          </p>
          <ArrowLink href="/ai-designer">Explore 366 AI Designer</ArrowLink>
        </article>
        <article>
          <span>DRONES &amp; CLEAN ENERGY</span>
          <h2>Air &amp; power when grids collapse.</h2>
          <p>
            <strong>WildGuard Drones</strong> deliver emergency supplies and coastal/rescue awareness while modular <strong>Clean Energy solar + LiFePO4 battery hubs</strong> keep community water pumps and communications online through blackouts.
          </p>
          <ArrowLink href="/humanity">Explore Humanity &amp; Drones</ArrowLink>
        </article>
        <article>
          <span>VEHICLES &amp; DRILLING RIGS</span>
          <h2>Heavy equipment for the last mile.</h2>
          <p>
            Dedicated <strong>4x4 field trucks, mobile borehole drilling rigs and service trailers</strong> allow our team in Ilocos Norte and North America to haul casing, solar arrays, filtration skids and drone command units into remote communities.
          </p>
          <ArrowLink href="/water">Explore Solar Water Hubs</ArrowLink>
        </article>
      </section>

      <section className="section pipe-roadmap">
        <div className="section-heading">
          <div>
            <div className="section-label">Grant &amp; capital allocation streams</div>
            <h2>Structured for non-dilutive R&amp;D, humanitarian &amp; infrastructure grants.</h2>
          </div>
          <p>
            Our programs are structured into four auditable funding streams aligned with Canadian, Philippine, United States and global grant mandates.
          </p>
        </div>
        <div className="pipe-roadmap-grid">
          {capitalStreams.map(([t, c], i) => (
            <article key={t}>
              <span>{String(i + 1).padStart(2, "0")} / FUNDING STREAM</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pipe-trust">
        <div>
          <div className="section-label">Auditor &amp; grant compliance checklist</div>
          <h2>Built for institutional due diligence.</h2>
        </div>
        <div className="pipe-trust-list">
          <p>
            <b>1st Defence Industries (British Columbia, Canada)</b>
            <span>Active Canadian corporate entity leading clean-tech &amp; AI R&amp;D, 400B+ model compute architecture, IoT sensor engineering and Canadian federal/provincial grant execution.</span>
          </p>
          <p>
            <b>Ilocos Norte Field Operations (Philippines)</b>
            <span>Active SEC/DTI-registered Philippine operations in Ilocos Norte executing borehole drilling, solar microgrids, smart water dispensers, farm irrigation and drone field pilots.</span>
          </p>
          <p>
            <b>Wyoming LLC (United States)</b>
            <span>US entity supporting North American equipment, vehicle and compute procurement, commercial operations and US/international grant partnerships.</span>
          </p>
          <p>
            <b>Asset &amp; Impact Accountability</b>
            <span>All grant-funded capital equipment (AI compute clusters, drilling rigs, 4x4 field vehicles, solar arrays and drones) is tracked with serial-level asset logs, IoT usage telemetry and ring-fenced project accounting.</span>
          </p>
        </div>
      </section>

      <section className="closing-cta pipe-close" style={{ backgroundImage: "linear-gradient(135deg,rgba(7,16,20,.94),rgba(7,16,20,.65)),url('/assets/drone-guardian.png')" }}>
        <div className="section-label">Water • Clean Energy • Drones • 400B+ AI • Field Fleet</div>
        <h2>Partner with a builder that executes in the real world.</h2>
        <p>
          Contact our institutional grant and engineering desk to request technical specifications, budget breakdowns or pilot documentation.
        </p>
        <div className="actions">
          <ArrowLink href="mailto:partnerships@366industries.com">Request Grant &amp; Equipment Dossier</ArrowLink>
          <ArrowLink href="/water" secondary>
            View Solar Borehole Water Hubs
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
