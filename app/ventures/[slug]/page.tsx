import { notFound } from "next/navigation";
import { ArrowLink, PageHero, Shell } from "../../components";
import { projectDetails } from "../../site-data";

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export default async function VentureDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetails.find((p) => p.slug === slug);
  if (!project) notFound();
  const external = project.nextStep.startsWith("http");
  if (slug === "pipe-buyer") return <PipeBuyerPage />;
  if (slug === "solar-borehole-water-hubs") return <SolarWaterHubsPage />;
  return (
    <Shell>
      <PageHero
        image={project.image}
        eyebrow={`${project.number} / ${project.category}`}
        title={project.name}
      >
        <p>{project.headline}</p>
        <div className="actions">
          <ArrowLink href={project.nextStep} external={external}>
            {external ? "Visit live project" : "Explore the work"}
          </ArrowLink>
          <ArrowLink href="/ventures" secondary>
            All separated divisions
          </ArrowLink>
        </div>
      </PageHero>
      <section className="section project-story">
        <div>
          <div className="section-label">The project &amp; humanitarian alignment</div>
          <h2>Built around a problem worth solving.</h2>
        </div>
        <p>
          {project.overview} {project.impact}
        </p>
      </section>
      <section className="section project-pillars">
        {project.pillars.map((pillar, i) => (
          <article key={pillar.title}>
            <span>0{i + 1}</span>
            <h2>{pillar.title}</h2>
            <p>{pillar.copy}</p>
          </article>
        ))}
      </section>
      <section className="closing-cta">
        <div className="section-label">Next move</div>
        <h2>Help move {project.name} from ambition to evidence.</h2>
        <div className="actions">
          <ArrowLink href={project.nextStep} external={external}>
            {external ? "Open the project" : "Continue exploring"}
          </ArrowLink>
          <ArrowLink href="/grants" secondary>
            Global Grant Dossier
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}

export function SolarWaterHubsPage() {
  const techStack = [
    [
      "01 / HYDROGEOLOGY & DRILLING",
      "Deep-Aquifer Borehole Drilling",
      "Aerial drone watershed surveys, resistivity siting, deep borehole drilling, sanitary seals and food-grade uPVC casing tapping climate-resilient groundwater aquifers.",
    ],
    [
      "02 / SOLAR EXTRACTION",
      "Off-Grid Solar Submersible Pumps",
      "100% solar-powered borehole extraction with LiFePO4 battery buffering into elevated storage tanks—guaranteeing pressurized water for homes and communities during grid power outages and Super Typhoons.",
    ],
    [
      "03 / SAFE DRINKING WATER",
      "Multi-Stage Ultrafiltration + UV",
      "Automated sediment, ultrafiltration membrane and UV/chlorination treatment engineered to meet World Health Organization (WHO) and Philippine National Standards for Drinking Water (PNSDW).",
    ],
    [
      "04 / SELF-FUNDING ACCESS",
      "24/7 Smart Prepaid Water Dispensers",
      "RFID card and mobile-wallet dispensing that cuts household safe drinking water costs by 60–70% while automatically funding a transparent local Barangay Maintenance Reserve.",
    ],
    [
      "05 / REAL-TIME TELEMETRY",
      "IoT Water Flow Sensors & Aquifer Probes",
      "Inline digital water flow meters, pressure sensors and aquifer level probes providing real-time drawdown protection, grant audit logs and predictive maintenance alerts before breakdowns occur.",
    ],
    [
      "06 / CLIMATE-SMART AG-TECH",
      "Rural Smallholder Farm Irrigation",
      "Metered raw borehole water routed to smallholder farm supply hydrants—eliminating expensive diesel pumping fuel during 6-month dry seasons in Ilocos Norte and globally.",
    ],
  ];

  const hubSpecs = [
    "100% Off-Grid Solar Submersible Pumping",
    "Ultrafiltration + UV Safe Drinking Water (WHO/PNSDW)",
    "24/7 RFID Smart Prepaid Water Dispensers",
    "Digital IoT Water Flow & Aquifer Telemetry",
    "Dry-Season Smallholder Farm Irrigation",
    "Paired with Coastal & Watershed Safety Drones",
  ];

  const grantRoadmap = [
    [
      "Phase 01 — Flagship Barangay Hub (Ilocos Norte, PH)",
      "Commission 1 complete Dual-Stream Solar Borehole Hub serving 250+ rural households (~1,250 residents) and 35 smallholder farms in Ilocos Norte, validating 99%+ uptime during grid brownouts.",
    ],
    [
      "Phase 02 — 6-Hub Regional Validation Pilot",
      "Deploy 6 Dual-Stream Solar Borehole Hubs across water-scarce barangays in Ilocos Norte, serving ~9,000 rural residents and 300+ farming households with full IoT flow telemetry and certified water lab verification.",
    ],
    [
      "Phase 03 — Academic, Drone & AI Telemetry Integration",
      "Collaborate with Canadian (NRC IRAP) and Philippine (DOST / Mariano Marcos State University) researchers on predictive pump diagnostics, drone watershed mapping and sustainable aquifer recharge modeling.",
    ],
    [
      "Phase 04 — Global Replication & Coastal Integration",
      "Scale to 500+ community water and coastal safety hubs across the Philippines, Southeast Asia, Sub-Saharan Africa, Latin America and rural North America via WASH grants, LGU Calamity/Development Funds and platform revenue co-financing.",
    ],
  ];

  return (
    <Shell>
      <section
        className="pipe-hero"
        style={{ backgroundImage: "url('/assets/community-relief.png')" }}
      >
        <div className="pipe-hero-shade" />
        <div className="pipe-hero-copy">
          <div className="pipe-status">
            <i /> Global Clean Water Innovation • 1st Defence Industries (BC, Canada) • 366 Industries • Ilocos Norte (PH) • Wyoming (USA)
          </div>
          <div className="section-label">
            01 / Global Clean-Tech, WASH &amp; Agricultural Water Infrastructure
          </div>
          <h1>
            Drill deep.<br />
            <em>Power with solar.</em><br />
            Water every home &amp; farm.
          </h1>
          <p className="pipe-lead">
            Co-funded by our website &amp; commercial platform revenues and international WASH grants, our <strong>Dual-Stream Solar Borehole &amp; Smart Water Hubs</strong> combine deep well drilling, off-grid solar pumping, multi-stage filtration, IoT water flow sensors and 24/7 smart prepaid dispensers to serve rural homes, blackout-hit communities and smallholder farms globally.
          </p>
          <div className="actions">
            <ArrowLink href="/grants">Global Grant &amp; Budget Dossier</ArrowLink>
            <ArrowLink href="/humanity" secondary>
              Coastal Shark/Croc &amp; Rescue Drones
            </ArrowLink>
            <ArrowLink
              href="https://www.gofundme.com/f/clean-water-4-all-j2tyh"
              external
              secondary
            >
              Support Clean Water 4 All
            </ArrowLink>
          </div>
          <div className="pipe-audiences">
            <span>GLOBAL CLEAN WATER</span>
            <span>HOMES &amp; POWER OUTAGES</span>
            <span>SMALLHOLDER FARMERS</span>
            <span>SOLAR SUBMERSIBLE PUMPS</span>
            <span>SMART PREPAID DISPENSERS</span>
            <span>IOT FLOW TELEMETRY</span>
          </div>
        </div>
      </section>

      <section className="pipe-value section">
        <div>
          <div className="section-label">
            01 / Built for Climate, Drought &amp; Outage Resilience
          </div>
          <h2>When the power grid fails or the dry season hits, clean water cannot stop.</h2>
        </div>
        <div>
          <p>
            In rural <strong>Ilocos Norte, Philippines</strong> and underserved regions globally, communities face two compounding water crises: a severe 6-month dry season that dries up shallow wells and parches smallholder farms, and frequent Super Typhoons and grid brownouts that disable municipal electric water pumps for days or weeks. Meanwhile, up to 40% of traditional charity-drilled wells fail within three years because they lack off-grid solar power, IoT flow telemetry and local maintenance revenue. We solve all three problems in one permanently sustainable system.
          </p>
          <div className="pipe-proof">
            <b>One Solar Borehole. Two Essential Community Streams.</b>
            <span>
              Stream A: Ultrafiltered + UV Safe Drinking Water via 24/7 Smart Prepaid Dispensers • Stream B: Metered Rural Farm Irrigation via Inline IoT Water Flow Sensors
            </span>
          </div>
        </div>
      </section>

      <section className="pipe-spec-band">
        <div>
          <div className="section-label">02 / Integrated Clean-Tech Architecture</div>
          <h2>Engineered for 15+ years of self-sustaining operation.</h2>
        </div>
        <div className="pipe-spec-grid">
          {hubSpecs.map((x, i) => (
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
            <div className="section-label">03 / The 6-Part Technical Stack</div>
            <h2>From deep underground aquifer to household tap and farm field.</h2>
          </div>
          <p>
            Every Dual-Stream Solar Borehole Hub combines proven hydrogeological drilling with automated clean-tech hardware, IoT grant telemetry and transparent community governance.
          </p>
        </div>
        <div className="pipe-feature-grid">
          {techStack.map(([n, t, c]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
        <div className="actions pipe-actions">
          <ArrowLink href="/grants">View Full $385K Grant &amp; Equipment Dossier</ArrowLink>
          <ArrowLink href="/about#partner" secondary>
            Partner or Co-Fund a Water Hub
          </ArrowLink>
        </div>
      </section>

      {/* GLOBAL WATER + COASTAL DRONE SYNERGY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="pledge-banner-card">
          <div className="pledge-banner-left">
            <span className="pledge-pill">AQUIFER-TO-COASTLINE WATER INNOVATION</span>
            <h3>Complete water security: Safe drinking water inland + Drone protection along the coast.</h3>
            <p>
              Our water innovation does not stop at the wellhead. Each solar microgrid water hub can also power and charge our <strong>WildGuard Coastal &amp; Disaster Drone Network</strong>—mapping watersheds before drilling, delivering emergency water pouches during floods, and patrolling coastal waters where <strong>sharks and saltwater crocodiles</strong> roam so fishing and coastal families remain safe.
            </p>
          </div>
          <div className="actions" style={{ marginTop: 0 }}>
            <ArrowLink href="/humanity">Explore Coastal &amp; Rescue Drones</ArrowLink>
          </div>
        </div>
      </section>

      <section className="pipe-sides">
        <article>
          <span>HOMES &amp; OUTAGES</span>
          <h2>Uninterrupted safe drinking water.</h2>
          <p>
            Solar submersible pumps and elevated storage keep multi-stage filtered water flowing to homes and 24/7 Smart Prepaid Water Dispensers even when typhoons or brownouts knock out municipal power grids.
          </p>
          <ArrowLink href="/humanity">Explore humanitarian impact</ArrowLink>
        </article>
        <article>
          <span>RURAL FARMING</span>
          <h2>Diesel-free dry-season irrigation.</h2>
          <p>
            Smallholder farmers growing rice, garlic, shallots and vegetables receive metered groundwater through IoT water flow sensors—eliminating crippling diesel pump fuel costs during the dry season.
          </p>
          <ArrowLink href="/future">See community models</ArrowLink>
        </article>
        <article>
          <span>SELF-SUSTAINING</span>
          <h2>Built-in maintenance reserve.</h2>
          <p>
            Affordable RFID prepaid water credits (saving families 60–70% vs. vended water) combine with our website revenue pledge to fund filter replacements, local caretaker stipends and technician servicing.
          </p>
          <ArrowLink href="/grants">View Grant &amp; Audit Model</ArrowLink>
        </article>
      </section>

      <section className="section pipe-roadmap">
        <div className="section-heading">
          <div>
            <div className="section-label">04 / Pilot &amp; Global Scaling Roadmap</div>
            <h2>From Ilocos Norte flagship hubs to 500+ resilient communities worldwide.</h2>
          </div>
          <p>
            Our deployment model is structured in measurable, audited stages so grantmakers, government partners and local barangays can verify every liter delivered.
          </p>
        </div>
        <div className="pipe-roadmap-grid">
          {grantRoadmap.map(([t, c], i) => (
            <article key={t}>
              <span>{String(i + 1).padStart(2, "0")} / DEPLOYMENT STAGE</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="auditor-verification" className="pipe-trust">
        <div>
          <div className="section-label">05 / For Grant Auditors &amp; Institutional Funders</div>
          <h2>Verified tri-national operations &amp; accountability.</h2>
        </div>
        <div className="pipe-trust-list">
          <p>
            <b>Canadian R&amp;D &amp; Corporate Lead</b>
            <span>
              <strong>1st Defence Industries</strong> &amp; <strong>366 Industries</strong> (British Columbia, Canada) lead systems engineering, IoT flow sensor/controller R&amp;D, North American procurement and institutional compliance.
            </span>
          </p>
          <p>
            <b>Philippine Field &amp; Drilling Hub</b>
            <span>
              Active SEC/DTI-registered operations with founders and field crew physically based in <strong>Ilocos Norte, Philippines</strong>—handling borehole drilling, barangay deployment, NWRB permitting and local maintenance.
            </span>
          </p>
          <p>
            <b>United States Entity</b>
            <span>
              <strong>Wyoming LLC</strong> operations supporting US clean-tech equipment sourcing, cross-border commercial operations and international development grant execution.
            </span>
          </p>
          <p>
            <b>Audit &amp; Telemetry Standards</b>
            <span>
              Every grant-funded hub includes certified microbiological water quality testing, automated IoT liter-by-liter flow logs, gender-inclusive Barangay Water Association governance and ring-fenced financial reporting.
            </span>
          </p>
        </div>
      </section>

      <section
        className="closing-cta pipe-close"
        style={{
          backgroundImage:
            "linear-gradient(135deg,rgba(7,16,20,.94),rgba(7,16,20,.65)),url('/assets/community-relief.png')",
        }}
      >
        <div className="section-label">
          Water security • Food security • Outage resilience • Global WASH
        </div>
        <h2>Build permanent water infrastructure with us.</h2>
        <p>
          We welcome inquiries from international grant auditors, government agencies (DOST, NRC IRAP, Global Affairs Canada, USAID), Rotary Clubs, universities and impact funders.
        </p>
        <div className="actions">
          <ArrowLink href="mailto:partnerships@366industries.com">
            Contact Grant &amp; Engineering Desk
          </ArrowLink>
          <ArrowLink href="/grants" secondary>
            View Global Grant Dossier
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}

function PipeBuyerPage() {
  const liveFeatures = [
    [
      "01",
      "Search focused inventory",
      "Browse industrial pipe, tubulars, equipment and materials without fighting through a general classified site.",
    ],
    [
      "02",
      "Post exactly what you need",
      "Create Wanted Ads so yards, distributors and owners can bring matching inventory to you.",
    ],
    [
      "03",
      "Compare ways to buy",
      "Use marketplace listings, direct offers and timed auctions to find the right commercial path.",
    ],
    [
      "04",
      "Talk in context",
      "Keep buyer and seller conversations connected to the actual listing, offer or request.",
    ],
    [
      "05",
      "Plan the move",
      "Use Dispatch to publish trucking requirements, receive carrier quotes and manage the delivery workflow.",
    ],
    [
      "06",
      "Buy with better signals",
      "See structured product details, location controls, reporting tools and seller information designed for industrial trade.",
    ],
  ];
  const pipeData = [
    "Outside diameter & wall",
    "Grade & specification",
    "Length & quantity",
    "New, used or surplus",
    "Location & availability",
    "Documentation & condition",
  ];
  const coming = [
    [
      "Smarter Wanted matching",
      "Automatic, explainable matches between buyer requirements and newly listed supply, with alerts for both sides.",
    ],
    [
      "Stronger industrial search",
      "Faster indexed filters, sorting, pagination and location-aware discovery across large inventories.",
    ],
    [
      "End-to-end Dispatch",
      "Carrier review, quote revisions, awards, protected route details, delivery milestones and proof-of-delivery support.",
    ],
    [
      "Pipe confidence tools",
      "Improved catalog coverage, weight calculations, source attribution, confidence levels and correction review.",
    ],
    [
      "Professional transaction records",
      "Revision history, confirmations, cancellations, disputes and clearer commercial audit trails.",
    ],
    [
      "North American expansion",
      "Future controlled marketplaces for industrial property, mineral and royalty interests, energy assets and businesses—activated only after licensing and legal approval.",
    ],
  ];
  return (
    <Shell>
      <section className="pipe-hero">
        <div className="pipe-hero-shade" />
        <div className="pipe-hero-copy">
          <div className="pipe-status">
            <i /> Pipe-focused industrial marketplace • Commercial Division
          </div>
          <div className="section-label">04 / Oil &amp; Gas Marketplace</div>
          <h1>
            Find the pipe.<br />
            <em>Make the deal.</em><br />
            Move the load.
          </h1>
          <p className="pipe-lead">
            Pipe Buyer brings industrial pipe inventory, serious purchase demand and professional dispatch into one focused marketplace—while contributing platform proceeds toward 366 Industries’ global humanitarian water and rescue programs.
          </p>
          <div className="actions">
            <ArrowLink href="https://www.pipebuyer.com" external>
              Search pipe inventory
            </ArrowLink>
            <ArrowLink href="https://www.pipebuyer.com" external secondary>
              Post a Wanted Ad
            </ArrowLink>
          </div>
          <div className="pipe-audiences">
            <span>BUYERS</span>
            <span>PIPE YARDS</span>
            <span>DISTRIBUTORS</span>
            <span>CONTRACTORS</span>
            <span>CARRIERS</span>
          </div>
        </div>
      </section>

      <section className="pipe-value section">
        <div>
          <div className="section-label">Built for industrial sourcing</div>
          <h2>Stop searching everywhere for inventory that may not exist.</h2>
        </div>
        <div>
          <p>
            General marketplaces bury critical specifications, mix industrial supply with unrelated equipment and leave transportation until after the deal. Pipe Buyer is being built around the way pipe is actually sourced: define the requirement, expose available supply, compare the commercial path, speak directly and arrange the move.
          </p>
          <div className="pipe-proof">
            <b>One account.</b>
            <span>Listings • Wanted Ads • Auctions • Offers • Messaging • Dispatch</span>
          </div>
        </div>
      </section>

      <section className="pipe-spec-band">
        <div>
          <div className="section-label">A useful pipe listing starts with useful data</div>
          <h2>Know what you are calling about.</h2>
        </div>
        <div className="pipe-spec-grid">
          {pipeData.map((x, i) => (
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
            <div className="section-label">For pipe buyers</div>
            <h2>From requirement to delivery.</h2>
          </div>
          <p>
            Use a single marketplace journey to find available material, signal unmet demand and bring qualified sellers or carriers into the conversation.
          </p>
        </div>
        <div className="pipe-feature-grid">
          {liveFeatures.map(([n, t, c]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
        <div className="actions pipe-actions">
          <ArrowLink href="https://www.pipebuyer.com" external>
            Start sourcing on Pipe Buyer
          </ArrowLink>
        </div>
      </section>

      <section className="pipe-sides">
        <article>
          <span>BUY</span>
          <h2>Need pipe?</h2>
          <p>
            Search active supply, publish a Wanted Ad, follow matching listings and open a direct conversation around the exact material you need.
          </p>
          <ArrowLink href="https://www.pipebuyer.com" external>
            Find inventory
          </ArrowLink>
        </article>
        <article>
          <span>SELL</span>
          <h2>Holding inventory?</h2>
          <p>
            Put new, used and surplus pipe in front of focused industrial demand—with the specifications and location buyers need to act.
          </p>
          <ArrowLink href="https://www.pipebuyer.com" external>
            List pipe for sale
          </ArrowLink>
        </article>
        <article>
          <span>MOVE</span>
          <h2>Ready to haul?</h2>
          <p>
            Connect the transaction to Dispatch, collect carrier quotes and build a clearer path from the yard to the destination.
          </p>
          <ArrowLink href="https://www.pipebuyer.com" external>
            Explore Dispatch
          </ArrowLink>
        </article>
      </section>

      <section className="section pipe-roadmap">
        <div className="section-heading">
          <div>
            <div className="section-label">What is coming</div>
            <h2>A marketplace growing into industrial infrastructure.</h2>
          </div>
          <p>
            These capabilities are documented in the Pipe Buyer engineering roadmap. They will be released through staged testing and safety gates—not marketed as live before they are ready.
          </p>
        </div>
        <div className="pipe-roadmap-grid">
          {coming.map(([t, c], i) => (
            <article key={t}>
              <span>{String(i + 1).padStart(2, "0")} / ROADMAP</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pipe-trust">
        <div>
          <div className="section-label">Professional by design</div>
          <h2>Built for deals where details matter.</h2>
        </div>
        <div className="pipe-trust-list">
          <p>
            <b>Structured commercial records</b>
            <span>Offers, revisions and activity stay tied to the transaction.</span>
          </p>
          <p>
            <b>Protected information</b>
            <span>Exact locations and sensitive details are designed for controlled access.</span>
          </p>
          <p>
            <b>Trust and reporting</b>
            <span>Verification, moderation and reporting workflows help protect marketplace quality.</span>
          </p>
          <p>
            <b>Safety-gated expansion</b>
            <span>Regulated property and energy transactions remain disabled until approvals exist.</span>
          </p>
        </div>
      </section>

      <section className="closing-cta pipe-close">
        <div className="section-label">The shortest path to the right pipe starts here</div>
        <h2>Source it. Sell it. Ship it.</h2>
        <p>Join the focused marketplace connecting industrial supply with real Oil &amp; Gas demand.</p>
        <div className="actions">
          <ArrowLink href="https://www.pipebuyer.com" external>
            Open Pipe Buyer
          </ArrowLink>
          <ArrowLink href="https://www.pipebuyer.com" external secondary>
            Create your account
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
