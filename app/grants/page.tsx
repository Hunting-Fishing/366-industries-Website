import { ArrowLink, Shell } from "../components";

export const metadata = {
  title: "Global Grant Candidate Dossier, Equipment & R&D Roadmap | 366 Industries & 1st Defence Industries",
  description:
    "Institutional grant qualification, UN SDG alignment and capital equipment dossier for 366 Industries and 1st Defence Industries: Global Clean Water Innovation, Coastal Shark & Crocodile Drone Protection Network, Disaster Search-and-Rescue UAVs, Clean Energy Microgrids, 400B+ Sovereign AI Compute, and Field Fleet.",
};

const fivePillars = [
  [
    "01 / GLOBAL WATER INNOVATION & WASH",
    "Solar Borehole & Smart Water Hubs",
    "Deep-aquifer borehole drilling, 100% off-grid solar submersible pumps, multi-stage ultrafiltration + UV, inline IoT water flow sensors, 24/7 RFID smart prepaid water dispensers and dry-season smallholder farm irrigation across Ilocos Norte, Philippines and globally.",
  ],
  [
    "02 / COASTAL SHARK & CROCODILE DRONE NETWORK",
    "WildGuard Coastal & Waterway Safety",
    "Solar-charged aerial overwatch drones equipped with polarized optical cameras, thermal infrared sensors and edge-AI computer vision to spot sharks, saltwater/estuarine crocodiles and rip currents along populated coastlines, beaches and fishing villages—alerting swimmers and lifeguards in real time.",
  ],
  [
    "03 / DISASTER SEARCH, RESCUE & RELIEF",
    "All-Weather Emergency Response UAVs",
    "Heavy-payload and thermal reconnaissance drones that locate stranded flood/typhoon survivors and deliver emergency drinking water, trauma medicine, satellite communications and GPS-tracked self-inflating rescue rafts when roads and bridges collapse.",
  ],
  [
    "04 / CLEAN ENERGY MICROGRIDS",
    "Blackout-Resilient Solar & LiFePO4 Storage",
    "Modular solar PV arrays, high-cycle LiFePO4 battery storage banks and community charging stations engineered to keep water hubs, coastal drone stations, farm pumps and emergency communications running through Super Typhoons and prolonged grid outages.",
  ],
  [
    "05 / SOVEREIGN 400B+ AI COMPUTE",
    "Local High-VRAM AI & Telemetry Cluster",
    "Dedicated on-premise multi-GPU AI server/workstation architecture capable of executing 400B+ parameter reasoning, coding and multimodal vision models locally—powering 366 AI Designer, real-time shark/crocodile/rescue drone computer vision, aquifer modeling and zero-internet disaster operations.",
  ],
  [
    "06 / FIELD FLEET & HEAVY EQUIPMENT",
    "4x4 Command Trucks & Mobile Drilling Rigs",
    "Dedicated 4x4 off-road utility trucks, trailer-mounted borehole drilling rigs, mobile water-testing labs and mobile drone command/charging units built to deploy into unpaved, mountainous and storm-damaged coastal and rural communities.",
  ],
];

const equipmentSpecs = [
  "400B+ Local AI Compute Node (512GB+ Multi-GPU / High-VRAM)",
  "Mobile Deep-Aquifer Borehole Drilling Rig & uPVC Casing",
  "Coastal Shark/Crocodile AI Detection & Thermal Rescue Drones",
  "Solar Submersible Pumps & LiFePO4 Clean Energy Microgrids",
  "Ultrafiltration, UV, IoT Flow Sensors & Smart Prepaid Dispensers",
  "4x4 Field Utility Truck & Mobile Drone/Water Command Trailer",
];

const globalGrantMatrix = [
  {
    stream: "GRANT STREAM 01 • GLOBAL WASH & AGRICULTURE",
    title: "Clean Water Innovation, Boreholes & Climate-Smart Irrigation Grants",
    agencies:
      "Global Innovation Fund ($220K USD) • D-Prize Safe Water / Agriculture ($20K USD) • Rotary Foundation Global WASH Grants ($30K–$400K USD) • Fund for Innovation & Transformation - FIT ($150K–$250K CAD) • Grand Challenges Canada • USAID DIV • Water.org / Aqua for All",
    qualification:
      "We solve the #1 reason rural water charity projects fail (lack of power and maintenance funds) by combining 100% solar submersible pumping, IoT drawdown telemetry, 24/7 RFID smart prepaid dispensers that fund a local Barangay Maintenance Reserve, and dual-stream dry-season irrigation for smallholder farmers.",
  },
  {
    stream: "GRANT STREAM 02 • COASTAL SAFETY & WILDLIFE COEXISTENCE",
    title: "Coastal Shark & Crocodile Drone Protection & Marine Safety Grants",
    agencies:
      "Global Coastal Lifesaving & Maritime Safety Funds • Indo-Pacific Coastal & Estuarine Safety Grants • Non-Lethal Human-Wildlife Coexistence Grants (WWF / Conservation Tech / National Geographic Society) • Municipal Tourism & Beach Safety Co-Funding",
    qualification:
      "Provides a non-lethal, science-backed alternative to shark nets and culling. Our solar-charged WildGuard drones use polarized optics, thermal IR and edge AI to protect swimmers, children, surfers and artisanal fishermen from sharks, saltwater crocodiles and rip currents while generating open marine conservation data.",
  },
  {
    stream: "GRANT STREAM 03 • DISASTER RESILIENCE & HUMANITARIAN RESCUE",
    title: "Disaster Risk Reduction (DRRM), Search-and-Rescue & Humanitarian UAV Grants",
    agencies:
      "Creating Hope in Conflict: Humanitarian Grand Challenge ($100K–$250K CAD) • UN OCHA / WFP Innovation Accelerator • DOST-GIA / DRRM Philippines • Philippine LGU 5% Calamity Fund (LDRRMF) Joint Ventures • Red Cross / Red Crescent Climate & Disaster Innovation",
    qualification:
      "Operates during the critical first 72 hours after Super Typhoons, flash floods and earthquakes when roads and cell towers fail—delivering thermal survivor search, emergency water/medical payload drops, and GPS-tracked self-inflating rescue rafts.",
  },
  {
    stream: "GRANT STREAM 04 • CLEAN ENERGY & OUTAGE MICROGRIDS",
    title: "Community Solar Microgrids & Productive-Use Clean Energy Grants",
    agencies:
      "IEEE Smart Village ($50K–$100K USD) • UNDP-GEF Small Grants Programme ($50K USD) • Energy Globe Foundation • Asian Development Bank (ADB) Climate & Clean Energy Ventures • CEIA",
    qualification:
      "Delivers blackout-resilient clean energy directly tied to productive community outcomes: powering municipal drinking water filtration, dry-season agricultural pumps, coastal safety drone charging docks and emergency communications.",
  },
  {
    stream: "GRANT STREAM 05 • SOVEREIGN AI & DEEP-TECH R&D",
    title: "400B+ Parameter Local AI Compute, Edge Computer Vision & Software R&D Grants",
    agencies:
      "DOST-PCIEERD Startup Grant Fund & CRADLE Equipment Outlay (up to ₱5,000,000 PHP) • NRC IRAP & SR&ED (British Columbia, Canada) • PacifiCan • NVIDIA Inception Program • Microsoft Founders Hub / AWS Activate ($100K–$350K Compute & Hardware Credits)",
    qualification:
      "Frames our high-VRAM 400B+ local AI compute workstation/server cluster as essential R&D infrastructure powering (a) 366 AI Designer software synthesis, (b) real-time shark, crocodile & flood-survivor drone computer vision, (c) hydrogeological aquifer modeling, and (d) offline disaster intelligence.",
  },
  {
    stream: "GRANT STREAM 06 • FIELD FLEET & LAST-MILE LOGISTICS",
    title: "Mobile Drilling Rigs, 4x4 Command Vehicles & Rural Infrastructure Capital",
    agencies:
      "Global Innovation Fund (Test/Scale Stage) • USAID Development Innovation Ventures • Philippine Municipal 20% Development Fund Partnerships • USDA Rural Development & North American Regional Infrastructure Grants",
    qualification:
      "Budgets our 4x4 utility truck and trailer as a specialized Mobile Borehole Drilling, Water Quality Lab & Drone Command Unit required to haul drilling rigs, solar skids and rescue UAVs into unpaved, storm-damaged mountain and coastal communities.",
  },
];

const budgetRows = [
  [
    "1. 400B+ Local AI Compute Workstation / Server Cluster",
    "High-VRAM Multi-GPU AI Node (512GB–768GB Unified/VRAM) for local 400B+ LLM & vision inference (366 AI Designer, Shark/Crocodile/Rescue Drone CV & Offline Disaster AI)",
    "$38,000",
  ],
  [
    "2. Mobile Borehole Drilling Rig & Hydrogeological Equipment",
    "Portable/trailer-mounted deep borehole drilling rig, mud pump, drill rods, air compressor, aquifer resistivity meter & food-grade uPVC casing for 6 flagship hubs",
    "$85,000",
  ],
  [
    "3. Clean Energy Solar Microgrids & Submersible Pumps",
    "Off-grid solar PV arrays, LiFePO4 battery storage banks (blackout power), DC submersible borehole pumps & elevated water storage tanks (6 barangay/coastal sites)",
    "$62,000",
  ],
  [
    "4. Water Filtration, Smart Prepaid Dispensers & IoT Flow Sensors",
    "Multi-stage ultrafiltration + UV units, 24/7 RFID Smart Prepaid Water Dispensers, digital IoT water flow sensors, aquifer probes & smallholder farm irrigation hydrants",
    "$60,000",
  ],
  [
    "5. WildGuard Coastal (Shark/Croc) & Disaster-Rescue Drone Fleet",
    "Polarized/thermal coastal predator detection UAVs, heavy-lift payload delivery drone (medicine/water/GPS inflatable rescue raft drop), loudspeaker alert module & solar charging dock",
    "$42,000",
  ],
  [
    "6. 4x4 Field Deployment Truck & Mobile Command Trailer",
    "Dedicated 4x4 off-road utility vehicle outfitted to tow the borehole drilling rig, transport solar/filtration skids, and serve as a mobile drone & water-testing command unit",
    "$58,000",
  ],
  [
    "7. Field Engineering, Permitting, Lab Testing & Responder Training",
    "NWRB/CAAP permitting, certified microbiological water lab testing, Barangay Water Association governance & coastal lifeguard/drone operator training",
    "$40,000",
  ],
];

const sdgBadges = [
  ["SDG 6", "Clean Water & Sanitation", "24/7 safe household drinking water via solar boreholes & ultrafiltration"],
  ["SDG 2", "Zero Hunger & Ag-Tech", "Diesel-free dry-season groundwater irrigation for smallholder farmers"],
  ["SDG 7", "Affordable Clean Energy", "100% off-grid solar PV pumping & LiFePO4 community blackout microgrids"],
  ["SDG 9", "Industry & AI Innovation", "Sovereign 400B+ AI compute, 366 AI Designer & IoT water flow telemetry"],
  ["SDG 11", "Resilient Communities", "Typhoon/flood search-and-rescue drones, raft drops & outage water security"],
  ["SDG 14", "Life Below Water & Coasts", "Non-lethal AI drone shark & crocodile coastal safety without nets or culling"],
];

export default function GrantsPage() {
  return (
    <Shell>
      <section
        className="pipe-hero"
        style={{ backgroundImage: "url('/assets/hero-solutions-today.png')" }}
      >
        <div className="pipe-hero-shade" />
        <div className="pipe-hero-copy">
          <div className="pipe-status">
            <i /> Global Institutional Grant, Audit &amp; Capital Equipment Dossier • 1st Defence Industries &amp; 366 Industries
          </div>
          <div className="section-label">
            Canada (BC) • Philippines (Ilocos Norte) • United States (Wyoming) • Global Deployment Ready
          </div>
          <h1>
            Clean water. Coastal safety.<br />
            <em>Disaster rescue &amp; 400B+ AI.</em><br />
            Built for global grants.
          </h1>
          <p className="pipe-lead">
            A comprehensive qualification and technical dossier for international grantmakers, UN/WASH agencies, coastal safety authorities, disaster-relief funders and government R&amp;D programs evaluating <strong>366 Industries</strong> and <strong>1st Defence Industries</strong>.
          </p>
          <div className="actions">
            <ArrowLink href="#grant-programs">Global Grant Matching Matrix</ArrowLink>
            <ArrowLink href="#capital-budget" secondary>
              $385K Capital &amp; Equipment Budget
            </ArrowLink>
            <ArrowLink href="/water" secondary>
              Solar Water Hubs Dossier
            </ArrowLink>
          </div>
          <div className="pipe-audiences">
            <span>SOLAR BOREHOLE WATER HUBS</span>
            <span>SHARK &amp; CROCODILE COASTAL DRONES</span>
            <span>DISASTER RESCUE UAVS</span>
            <span>CLEAN ENERGY MICROGRIDS</span>
            <span>400B+ LOCAL AI COMPUTE</span>
            <span>4X4 FIELD FLEET &amp; RIGS</span>
          </div>
        </div>
      </section>

      {/* WHY WE ARE IDEAL GLOBAL GRANT CANDIDATES */}
      <section className="pipe-value section">
        <div>
          <div className="section-label">01 / Why Grant Auditors Approve Our Model</div>
          <h2>Turnkey institutional readiness backed by our own platform revenue pledge.</h2>
        </div>
        <div>
          <p>
            International grant committees reject thousands of applicants every year because they lack registered operating entities, rely on unproven theory, or have no plan to maintain equipment after grant funds end. <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> eliminate those risks through a <strong>Tri-National Operating Structure</strong> (British Columbia, Canada • Ilocos Norte, Philippines • Wyoming, USA) paired with our <strong>Humanitarian Revenue Co-Financing Charter</strong>—where revenues from our commercial software (<strong>366 AI Designer</strong>), marketplaces and games co-fund maintenance alongside local smart-water micro-tariffs.
          </p>
          <div className="pipe-proof">
            <b>100% Mission-Tied Hardware, Compute &amp; Field Deployment</b>
            <span>
              Every piece of capital equipment—from our 400B+ AI workstation and borehole drilling rig to coastal shark/crocodile drones, solar microgrids and 4x4 field trucks—is tied to measurable humanitarian and R&amp;D milestones.
            </span>
          </div>
        </div>
      </section>

      {/* UN SDG ALIGNMENT BAR */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <div>
            <div className="section-label">02 / United Nations Sustainable Development Goals (UN SDG) Alignment</div>
            <h2>Verified impact across six global development mandates.</h2>
          </div>
          <p>
            Our integrated water, coastal safety, disaster rescue, clean energy and AI programs allow a single deployment to satisfy multiple international funding mandates simultaneously.
          </p>
        </div>
        <div className="sdg-grid">
          {sdgBadges.map(([code, title, desc]) => (
            <div className="sdg-card" key={code}>
              <span className="sdg-code">{code}</span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAPITAL EQUIPMENT SPEC BAND */}
      <section className="pipe-spec-band">
        <div>
          <div className="section-label">03 / Capital Equipment &amp; Technical Readiness</div>
          <h2>Core hardware &amp; compute required for our 2026–2027 global deployments.</h2>
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

      {/* SIX REINFORCING CAPABILITIES */}
      <section className="section pipe-buyers">
        <div className="section-heading">
          <div>
            <div className="section-label">04 / Six-Pillar Mission Architecture</div>
            <h2>One ecosystem. Six reinforcing capabilities.</h2>
          </div>
          <p>
            Each division of 366 Industries and 1st Defence Industries shares engineering, 400B+ AI compute, 4x4 field vehicles and local technician teams—multiplying the return on every grant dollar invested.
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

      {/* GLOBAL GRANT MATCHING MATRIX */}
      <section id="grant-programs" className="section pipe-roadmap">
        <div className="section-heading">
          <div>
            <div className="section-label">05 / Global Grant Eligibility &amp; Matching Matrix</div>
            <h2>Structured for non-dilutive humanitarian, WASH, coastal safety, DRRM &amp; R&amp;D grants worldwide.</h2>
          </div>
          <p>
            Below are the six primary global grant tracks for which 366 Industries and 1st Defence Industries are structured as turnkey candidates.
          </p>
        </div>
        <div className="pipe-roadmap-grid">
          {globalGrantMatrix.map((item) => (
            <article key={item.stream} className="grant-matrix-card">
              <span>{item.stream}</span>
              <h3>{item.title}</h3>
              <div className="grant-agencies-box">
                <strong>Target Global Grant Programs:</strong>
                <p>{item.agencies}</p>
              </div>
              <p>{item.qualification}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FULL $385,000 USD CAPITAL & EQUIPMENT BUDGET TABLE */}
      <section id="capital-budget" className="section budget-table-section">
        <div className="section-heading">
          <div>
            <div className="section-label">06 / Audited Multi-Grant Capital &amp; Equipment Stack</div>
            <h2>Full-Scope Deployment Budget ($385,000 USD Target Stack).</h2>
          </div>
          <p>
            Modularly structured so individual grantmakers can fund a single barangay water hub ($20K), a coastal/disaster drone unit ($42K), a regional R&amp;D &amp; 400B+ AI compute package ($90K), or the complete 6-hub flagship deployment ($385K).
          </p>
        </div>

        <div className="audit-table-wrap">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Capital &amp; Equipment Category</th>
                <th>Technical Specification &amp; Humanitarian / R&amp;D Mission Purpose</th>
                <th>Allocation (USD)</th>
              </tr>
            </thead>
            <tbody>
              {budgetRows.map(([cat, spec, amount]) => (
                <tr key={cat}>
                  <td>
                    <strong>{cat}</strong>
                  </td>
                  <td>{spec}</td>
                  <td className="amount-cell">{amount}</td>
                </tr>
              ))}
              <tr className="audit-total-row">
                <td colSpan={2}>
                  <strong>TOTAL FULL-MISSION CAPITAL &amp; DEPLOYMENT STACK (100% Non-Repayable Multi-Grant Target)</strong>
                </td>
                <td className="amount-cell">
                  <strong>$385,000 USD</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* THREE SIDE-BY-SIDE PILLARS */}
      <section className="pipe-sides">
        <article>
          <span>400B+ LOCAL AI COMPUTE</span>
          <h2>Sovereign AI without cloud limits.</h2>
          <p>
            Running 400B+ parameter models on dedicated in-house high-VRAM hardware powers <strong>366 AI Designer</strong>, processes real-time shark/crocodile and search-and-rescue drone vision, models groundwater aquifers and guarantees offline AI inference when typhoons sever internet connectivity.
          </p>
          <ArrowLink href="/ai-designer">Explore 366 AI Program</ArrowLink>
        </article>
        <article>
          <span>COASTAL &amp; DISASTER DRONES</span>
          <h2>Safe coastlines &amp; rapid rescue.</h2>
          <p>
            <strong>WildGuard Drones</strong> patrol beaches and river mouths for sharks and crocodiles, deliver emergency supplies and GPS inflatable rescue rafts during floods, and charge from modular <strong>Clean Energy solar + LiFePO4 battery hubs</strong>.
          </p>
          <ArrowLink href="/humanity">Explore Coastal &amp; Rescue Drones</ArrowLink>
        </article>
        <article>
          <span>WATER HUBS &amp; FIELD FLEET</span>
          <h2>Heavy equipment for the last mile.</h2>
          <p>
            Dedicated <strong>4x4 field trucks, mobile borehole drilling rigs and service trailers</strong> allow our teams in Ilocos Norte and North America to haul casing, solar arrays, filtration skids and drone command units into remote communities.
          </p>
          <ArrowLink href="/water">Explore Solar Water Hubs</ArrowLink>
        </article>
      </section>

      {/* TRI-NATIONAL AUDITOR VERIFICATION */}
      <section className="pipe-trust">
        <div>
          <div className="section-label">07 / Auditor &amp; Grant Compliance Checklist</div>
          <h2>Built for institutional due diligence.</h2>
        </div>
        <div className="pipe-trust-list">
          <p>
            <b>1st Defence Industries (British Columbia, Canada)</b>
            <span>
              Active Canadian corporate entity leading clean-tech &amp; AI R&amp;D, 400B+ model compute architecture, IoT sensor/drone engineering and Canadian federal/provincial grant execution (NRC IRAP, SR&amp;ED, Grand Challenges Canada, FIT).
            </span>
          </p>
          <p>
            <b>Ilocos Norte Field Operations (Philippines)</b>
            <span>
              Active SEC/DTI-registered Philippine operations in Ilocos Norte executing deep borehole drilling, solar microgrids, smart water dispensers, smallholder farm irrigation, coastal shark/crocodile drone patrols and DOST/MMSU/LGU partnerships.
            </span>
          </p>
          <p>
            <b>Wyoming LLC (United States)</b>
            <span>
              US entity supporting North American equipment, vehicle and compute procurement, commercial marketplace operations and US/international development grant partnerships (GIF, D-Prize, USAID DIV, IEEE Smart Village, Rotary).
            </span>
          </p>
          <p>
            <b>Ring-Fenced Accounting &amp; Open Telemetry</b>
            <span>
              All grant-funded capital equipment (400B+ AI compute clusters, drilling rigs, 4x4 field vehicles, solar arrays and WildGuard drones) and website revenue contributions are tracked with serial-level asset logs, IoT liter-by-liter flow logs, flight telemetry and audited project accounting.
            </span>
          </p>
        </div>
      </section>

      <section
        className="closing-cta pipe-close"
        style={{
          backgroundImage:
            "linear-gradient(135deg,rgba(7,16,20,.94),rgba(7,16,20,.65)),url('/assets/drone-guardian.png')",
        }}
      >
        <div className="section-label">
          Clean Water • Shark &amp; Crocodile Coastal Safety • Disaster Rescue • 400B+ AI • Field Fleet
        </div>
        <h2>Partner with a builder that executes in the real world.</h2>
        <p>
          Contact our institutional grant and engineering desk to request concept notes, technical specifications, itemized budgets or field pilot documentation.
        </p>
        <div className="actions">
          <ArrowLink href="mailto:partnerships@366industries.com">
            Contact Institutional Grant &amp; Audit Desk
          </ArrowLink>
          <ArrowLink href="/water" secondary>
            View Solar Borehole Water Hubs
          </ArrowLink>
          <ArrowLink href="/humanity" secondary>
            View Coastal &amp; Disaster Drone Network
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
