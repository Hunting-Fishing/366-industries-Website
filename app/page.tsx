import Link from "next/link";
import { ArrowLink, Shell } from "./components";
import { DonationSection } from "./donate/donation-widget";
import { futureIdeas, ventures } from "./site-data";

const heroShowcaseCards = [
  {
    code: "01 / GLOBAL CLEAN WATER",
    title: "Solar Borehole & Smart Water Hubs",
    subtitle: "Off-grid water access, treatment, aquifer stewardship and accountable operations",
    image: "/assets/solar-water-hub-hero.png",
    href: "/water",
    badge: "WASH & AG-TECH",
  },
  {
    code: "02 / COASTAL SAFETY",
    title: "Shark & Crocodile Drone Network",
    subtitle: "Proposed non-lethal aerial safety observation, field validation and responder alerts",
    image: "/assets/coastal-shark-croc-drone.png",
    href: "/humanity/coastal-safety",
    badge: "WILDGUARD COASTAL",
  },
  {
    code: "03 / DISASTER RESCUE",
    title: "Typhoon & Flood Rescue UAVs",
    subtitle: "Emergency-response planning, authorized aerial mapping and controlled field trials",
    image: "/assets/disaster-rescue-drone.png",
    href: "/humanity/disaster-response-drones",
    badge: "EMERGENCY SAR",
  },
  {
    code: "04 / 366 AI PROGRAM",
    title: "366 AI Designer & 400B+ Core",
    subtitle: "Digital tools and a separate, evidence-led offline AI infrastructure roadmap",
    image: "/assets/sovereign-ai-400b-core.png",
    href: "/ai-designer",
    badge: "ONLINE BUILDER",
  },
];

const humanitarianAllocations = [
  {
    percent: "40%",
    width: "40%",
    tag: "PILLAR 01 • CLEAN WATER & WASH",
    title: "Global Clean Water & Solar Borehole Hubs",
    copy: "Website and commercial platform funds directly co-finance deep-aquifer borehole drilling, 100% off-grid solar submersible pumps, multi-stage ultrafiltration + UV treatment, inline IoT water flow sensors, 24/7 RFID smart prepaid dispensers and dry-season farm irrigation.",
    href: "/water",
    cta: "Explore Water Innovation",
  },
  {
    percent: "25%",
    width: "25%",
    tag: "PILLAR 02 • COASTAL PREDATOR OVERWATCH",
    title: "Shark & Crocodile Drone Protection Network",
    copy: "Funds solar-charged coastal UAV stations equipped with polarized optical cameras, thermal infrared sensors and edge-AI computer vision to detect sharks, saltwater crocodiles and rip currents along beaches, river mouths and fishing coastlines—alerting swimmers and lifeguards in real time.",
    href: "/humanity/coastal-safety",
    cta: "Explore Coastal Drone Safety",
  },
  {
    percent: "20%",
    width: "20%",
    tag: "PILLAR 03 • DISASTER SEARCH & RESCUE",
    title: "Typhoon, Flood & Emergency Rescue Operations",
    copy: "Supports rapid-deployment thermal reconnaissance and heavy-payload delivery drones that locate stranded families and drop emergency drinking water, trauma medicine, satellite radios and GPS-tracked self-inflating rescue rafts when storms sever roads.",
    href: "/humanity/disaster-response-drones",
    cta: "Explore Disaster Rescue",
  },
  {
    percent: "15%",
    width: "15%",
    tag: "PILLAR 04 • LOCAL GOVERNANCE & TRAINING",
    title: "Community Technicians & Lifeguard Readiness",
    copy: "Builds local maintenance reserves and trains community water teams, coastal responders and qualified drone operators wherever safety needs are documented.",
    href: "/grants",
    cta: "View Audit & Grant Model",
  },
];

const globalGrantCategories = [
  {
    code: "GRANT TRACK 01",
    title: "Global Clean Water (WASH) & Climate-Smart Agriculture",
    targets:
      "International WASH innovation programs • community water funders • climate-adaptation and rural resilience grants",
    scope:
      "Funds off-grid Solar Borehole Water Hubs, ultrafiltration, IoT water flow telemetry, 24/7 smart prepaid dispensers and smallholder farm irrigation.",
  },
  {
    code: "GRANT TRACK 02",
    title: "Coastal Safety, Shark & Crocodile Mitigation & Marine Innovation",
    targets:
      "Coastal Lifesaving & Beach Safety Funds • Indo-Pacific Estuarine & Marine Safety Grants • Non-Lethal Wildlife Coexistence Programs",
    scope:
      "Funds AI-assisted coastal drone patrols, polarized/thermal shark & crocodile detection, automated beach warning systems and drop-deployed flotation pods.",
  },
  {
    code: "GRANT TRACK 03",
    title: "Disaster Risk Reduction (DRRM) & Search-and-Rescue UAVs",
    targets:
      "Humanitarian Grand Challenge ($250K) • DOST-DRRM / GIA • UN/WFP Innovation • Municipal 5% Calamity (LDRRMF) Joint Ventures",
    scope:
      "Funds all-weather thermal search-and-rescue drones, heavy-lift medical/water payload delivery, GPS inflatable rescue rafts and mobile command trailers.",
  },
  {
    code: "GRANT TRACK 04",
    title: "Sovereign 400B+ AI Compute, Clean Energy & Deep-Tech R&D",
    targets:
      "Public-interest research grants • clean-tech equipment programs • community energy and resilience funders",
    scope:
      "Funds our 400B+ parameter local AI workstation/server cluster (powering 366 AI Designer & offline drone CV), community solar microgrids and 4x4 field trucks.",
  },
];

export default function Home() {
  const humanitarianVentures = ventures.filter((v) => v.division === "humanitarian");
  const aiVentures = ventures.filter((v) => v.division === "ai");
  const commercialAndGamesVentures = ventures.filter(
    (v) => v.division === "commercial" || v.division === "games"
  );

  return (
    <Shell>
      {/* REDESIGNED MODERN SPLIT HERO */}
      <section className="home-hero-modern">
        <div className="hero-bg-backdrop" aria-hidden="true" />
        <div className="hero-split-container">
          <div className="hero-copy-modern">
            <div className="hero-kicker">
              GLOBAL HUMANITARIAN &amp; CLEAN-TECH INFRASTRUCTURE •{" "}
              <strong>GLOBAL HUMANITARIAN EFFORTS FOR SAFETY</strong>
            </div>
            <h1>
              Clean water.<br />
              Coastal safety.<br />
              <em>Built to save lives.</em>
            </h1>
            <p className="hero-lead-modern">
              <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> engineer practical humanitarian systems worldwide—combining off-grid <strong>Solar Borehole &amp; Smart Water Hubs</strong>, our <strong>WildGuard Coastal Drone Protection Network</strong> where sharks and saltwater crocodiles roam, <strong>Rapid Disaster Search-and-Rescue UAVs</strong>, and our flagship <strong>366 AI Designer Program</strong>.
            </p>
            <div className="actions">
              <ArrowLink href="/water">Global Water Innovation</ArrowLink>
              <ArrowLink href="/humanity" secondary>
                Shark, Crocodile &amp; Rescue Drones
              </ArrowLink>
              <ArrowLink href="/donate" secondary>
                ❤ Donate Now
              </ArrowLink>
            </div>

            <div className="hero-trust-pills">
              <span>Transparent humanitarian funding model</span>
              <span>Measurable safety and resilience outcomes</span>
              <span>Grant and partner due-diligence briefings</span>
            </div>
          </div>

          <div className="hero-visual-grid">
            {heroShowcaseCards.map((card) => (
              <Link href={card.href} key={card.code} className="hero-showcase-card">
                <div
                  className="hero-showcase-img"
                  style={{ backgroundImage: `url('${card.image}')` }}
                >
                  <span className="hero-showcase-badge">{card.badge}</span>
                </div>
                <div className="hero-showcase-content">
                  <small>{card.code}</small>
                  <strong>{card.title}</strong>
                  <p>{card.subtitle}</p>
                  <span className="showcase-link">Explore mission &amp; funding details <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL METRICS BAR */}
      <section className="metrics-strip" aria-label="Key Institutional Metrics">
        <div className="metrics-strip-inner">
          <Link href="/water#project-brief" className="metric-item">
            <span className="metric-kicker">CLEAN WATER &amp; AG-TECH</span>
            <strong>Dual-Stream Solar Hubs</strong>
            <p>Explore proposed off-grid water access, treatment and irrigation planning.</p>
            <span className="metric-link">Read full project brief ↗</span>
          </Link>
          <Link href="/humanity/coastal-safety#project-brief" className="metric-item">
            <span className="metric-kicker">COASTAL SAFETY &amp; CONSERVATION</span>
            <strong>Coastal Safety Monitoring</strong>
            <p>Review the proposed non-lethal drone pilot, responder protocols and field validation.</p>
            <span className="metric-link">Read full project brief ↗</span>
          </Link>
          <Link href="/humanity/disaster-response-drones#project-brief" className="metric-item">
            <span className="metric-kicker">EMERGENCY PREPAREDNESS</span>
            <strong>Disaster Rescue &amp; Relief</strong>
            <p>See the proposed disaster-readiness roadmap, field trials and safety requirements.</p>
            <span className="metric-link">Read full project brief ↗</span>
          </Link>
          <Link href="/grants#grant-programs" className="metric-item">
            <span className="metric-kicker">GLOBAL PARTNER OPPORTUNITIES</span>
            <strong>Grant &amp; Investor Briefings</strong>
            <p>Review project funding needs, proposed milestones, verification and safeguards.</p>
            <span className="metric-link">Explore grant opportunities ↗</span>
          </Link>
        </div>
      </section>

      {/* SECTION 1: HUMANITARIAN REVENUE & WEBSITE FUNDS CHARTER */}
      <section className="section humanitarian-pledge-section">
        <div className="section-heading">
          <div>
            <div className="section-label">01 / Our Humanitarian Revenue &amp; Impact Charter</div>
            <h2>How our website &amp; commercial funds power global humanitarian action.</h2>
          </div>
          <p>
            <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> propose a dual-engine humanitarian model: eligible commercial proceeds from software, marketplaces and games may be combined with donations and grant awards under documented, separately reportable project budgets. The structure and allocations are subject to legal, financial and donor review.
          </p>
        </div>

        <div className="pledge-banner-card">
          <div className="pledge-banner-left">
            <span className="pledge-pill">PROPOSED HUMANITARIAN FUNDING MODEL</span>
            <h3>Every commercial venture, donation &amp; grant dollar strengthens frontline community survival.</h3>
            <p>
              Our proposed funding framework combines commercial revenue, eligible grants and voluntary support to pursue durable water infrastructure, coastal safety research and disaster preparedness for communities worldwide.
            </p>
          </div>
          <div className="pledge-banner-right">
            <div className="pledge-stat">
              <strong>OPEN</strong>
              <span>Project Budgets &amp; Independent Due Diligence</span>
            </div>
            <div className="pledge-stat">
              <strong>24/7</strong>
              <span>IoT Flow Sensor &amp; Drone Mission Telemetry Logs</span>
            </div>
          </div>
        </div>

        <div className="allocation-grid">
          {humanitarianAllocations.map((item) => (
            <article className="allocation-card" key={item.title}>
              <div className="allocation-top">
                <span className="allocation-tag">{item.tag}</span>
                <strong className="allocation-percent">{item.percent}</strong>
              </div>
              <div className="allocation-progress-track" aria-hidden="true">
                <div className="allocation-progress-fill" style={{ width: item.width }} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link href={item.href} className="allocation-link">
                {item.cta} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 2: THREE CORE HUMANITARIAN & WATER INNOVATION OPERATIONS */}
      <section className="section core-missions-section">
        <div className="section-heading">
          <div>
            <div className="section-label">02 / Frontline Humanitarian &amp; Water Innovation</div>
            <h2>Innovating water, coastal safety &amp; disaster rescue globally.</h2>
          </div>
          <p>
            We engineer integrated physical systems that protect human life around water—from deep underground drinking aquifers to coastlines where sharks and crocodiles roam, to flooded disaster zones.
          </p>
        </div>

        <div className="three-pillar-showcase">
          <article className="pillar-feature-card">
            <div
              className="pillar-feature-img"
              style={{ backgroundImage: "url('/assets/solar-water-hub-hero.png')" }}
            >
              <span className="pillar-badge">GLOBAL WATER INNOVATION</span>
            </div>
            <div className="pillar-feature-body">
              <div className="section-label">A / CLEAN DRINKING WATER &amp; AG-TECH</div>
              <h3>Dual-Stream Solar Borehole &amp; Smart Water Hubs</h3>
              <p>
                We drill deep into climate-resilient aquifers and power extraction with 100% off-grid solar submersible pumps. Each hub delivers multi-stage ultrafiltered + UV safe drinking water via 24/7 RFID Smart Prepaid Dispensers while routing metered irrigation water to smallholder farmers through inline IoT water flow sensors.
              </p>
              <ul className="pillar-spec-list">
                <li>Uninterrupted safe household water during Super Typhoons &amp; grid blackouts</li>
                <li>Cuts family drinking water costs by 60–70% while self-funding local maintenance</li>
                <li>Eliminates expensive diesel pump fuel during 6-month agricultural droughts</li>
              </ul>
              <div className="actions">
                <ArrowLink href="/water">Open Water Innovation Dossier</ArrowLink>
              </div>
            </div>
          </article>

          <article className="pillar-feature-card">
            <div
              className="pillar-feature-img"
              style={{ backgroundImage: "url('/assets/coastal-shark-croc-drone.png')" }}
            >
              <span className="pillar-badge">COASTAL SHARK &amp; CROCODILE SAFETY</span>
            </div>
            <div className="pillar-feature-body">
              <div className="section-label">B / WILDGUARD COASTAL DRONE PROTECTION NETWORK</div>
              <h3>Protecting People Along Coastlines Where Sharks &amp; Crocodiles Roam</h3>
              <p>
                Across tropical and temperate coastlines, river mouths, estuaries and beaches globally, swimmers, children, surfers and artisanal fishermen face unseen dangers from <strong>sharks, saltwater/estuarine crocodiles and rip currents</strong>. Our solar-charged WildGuard Drone Network patrols the water from above with polarized optical lenses, thermal sensors and edge-AI predator recognition.
              </p>
              <ul className="pillar-spec-list">
                <li>Real-time AI detection of submerged sharks &amp; surface/estuarine crocodiles</li>
                <li>Instant GPS alerts to lifeguards, barangay patrol boats &amp; beach loudspeakers</li>
                <li>Drop-deployable self-inflating flotation pods for swimmers in rip currents</li>
              </ul>
              <div className="actions">
                <ArrowLink href="/humanity/coastal-safety">Explore Coastal Drone Network</ArrowLink>
              </div>
            </div>
          </article>

          <article className="pillar-feature-card">
            <div
              className="pillar-feature-img"
              style={{ backgroundImage: "url('/assets/disaster-rescue-drone.png')" }}
            >
              <span className="pillar-badge">EMERGENCY SEARCH &amp; RESCUE</span>
            </div>
            <div className="pillar-feature-body">
              <div className="section-label">C / RAPID DISASTER RELIEF &amp; RESCUE FLEET</div>
              <h3>Operating in Disasters When Roads, Bridges &amp; Power Grids Fail</h3>
              <p>
                When Super Typhoons, flash floods, landslides or coastal surges isolate communities, every minute counts. Our disaster-response UAVs, 4x4 mobile command vehicles and portable solar microgrids deploy immediately to locate survivors and deliver life-saving aid where conventional vehicles cannot pass.
              </p>
              <ul className="pillar-spec-list">
                <li>Day/night thermal search-and-rescue for flood, rooftop &amp; maritime survivors</li>
                <li>Heavy-payload drone drops of clean water, trauma medicine &amp; emergency comms</li>
                <li>Aerial deployment of GPS-tracked self-inflating rescue rafts in floodwaters</li>
              </ul>
              <div className="actions">
                <ArrowLink href="/humanity/disaster-response-drones">Explore Disaster Rescue Ops</ArrowLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* DIRECT DONATIONS SECTION ON HOMEPAGE */}
      <DonationSection compact />

      {/* SECTION 3: DEDICATED 366 AI PROGRAM SPOTLIGHT (CLEANLY SEPARATED) */}
      <section className="section ai-spotlight-section">
        <div className="ai-spotlight-box">
          <div className="ai-spotlight-copy">
            <div className="eyebrow ai-online">
              <i aria-hidden="true" /> 366 AI PROGRAM • ONLINE &amp; EXPANDING
            </div>
            <div className="section-label" style={{ marginTop: "16px" }}>
              03 / Software Creation &amp; Sovereign 400B+ AI Compute Division
            </div>
            <h2>
              366 AI Designer &amp;<br />
              <em>400B+ Sovereign AI Core.</em>
            </h2>
            <p>
              Our <strong>366 AI Program</strong> is cleanly separated into its own dedicated technology division while sharing core infrastructure with our humanitarian operations. <strong>366 AI Designer</strong> empowers founders, small businesses and community builders to turn ideas into working websites and web applications through natural conversation and visual building tools.
            </p>
            <p>
              Behind the scenes, our <strong>400B+ Parameter Local AI Compute Roadmap</strong> powers both 366 AI Designer code synthesis and our offline field intelligence—running real-time shark/crocodile computer vision, thermal search-and-rescue detection and aquifer telemetry even when typhoons sever internet connectivity.
            </p>
            <div className="actions">
              <ArrowLink href="https://designer.366industries.com" external>
                Launch 366 AI Designer
              </ArrowLink>
              <ArrowLink href="/ai-designer" secondary>
                Explore 366 AI Program &amp; 400B+ Compute
              </ArrowLink>
            </div>
          </div>

          <div className="ai-spotlight-cards">
            <div
              className="ai-spotlight-visual-frame"
              style={{ backgroundImage: "url('/assets/sovereign-ai-400b-core.png')" }}
              aria-label="366 AI Designer and 400B+ Sovereign AI Compute Center"
            >
              <span>SOVEREIGN 400B+ AI &amp; TELEMETRY CORE</span>
            </div>
            <div className="ai-mini-card">
              <span>01 / PRODUCT BUILDER</span>
              <h4>366 AI Designer Workspace</h4>
              <p>
                Move from plain-language concept to a structured, visual and deployable web application at designer.366industries.com.
              </p>
            </div>
            <div className="ai-mini-card">
              <span>02 / HUMANITARIAN CV &amp; TELEMETRY</span>
              <h4>Offline Coastal &amp; Disaster AI</h4>
              <p>
                Powers real-time shark/crocodile aerial detection, flood survivor thermal recognition and predictive borehole pump diagnostics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: GLOBAL GRANT CANDIDATE QUALIFICATION MATRIX */}
      <section className="section grant-readiness-section">
        <div className="section-heading">
          <div>
            <div className="section-label">04 / Global Institutional Grant Readiness</div>
            <h2>Engineered to qualify for premier humanitarian, water, drone &amp; R&amp;D grants worldwide.</h2>
          </div>
          <p>
            Grant auditors and institutional funders require registered legal entities, measurable field outcomes, local university/municipal partnerships and sustainable post-grant maintenance. We check every box across three countries.
          </p>
        </div>

        <div className="grant-tracks-grid">
          {globalGrantCategories.map((g) => (
            <article className="grant-track-card" key={g.code}>
              <span className="grant-track-code">{g.code}</span>
              <h3>{g.title}</h3>
              <div className="grant-track-targets">
                <strong>Primary Global Programs:</strong> {g.targets}
              </div>
              <p>{g.scope}</p>
            </article>
          ))}
        </div>

        <div className="grant-cta-strip">
          <div>
            <strong>
              Review our complete $385,000 USD Multi-Grant Capital, Water, Drone, Clean Energy &amp; 400B+ AI Dossier
            </strong>
            <span>
              Includes proposed equipment budgets, UN SDG alignment and project-specific diligence requirements.
            </span>
          </div>
          <div className="actions" style={{ marginTop: 0 }}>
            <ArrowLink href="/grants">Open Full Global Grant Dossier</ArrowLink>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROPERLY SEPARATED DIVISIONS & VENTURE PORTFOLIO */}
      <section className="section venture-section">
        <div className="section-heading">
          <div>
            <div className="section-label">05 / Cleanly Separated Organization Structure</div>
            <h2>Structured divisions. One unified mission.</h2>
          </div>
          <ArrowLink href="/ventures" secondary>
            View complete portfolio
          </ArrowLink>
        </div>

        {/* DIVISION GROUP 1: HUMANITARIAN & WATER */}
        <div className="division-group">
          <div className="division-group-header">
            <span className="division-pill humanitarian">
              DIVISION I • HUMANITARIAN, CLEAN WATER &amp; COASTAL DRONE SAFETY
            </span>
            <p>
              Frontline physical infrastructure funded by institutional grants, community donations and ring-fenced platform revenues.
            </p>
          </div>
          <div className="venture-list">
            {humanitarianVentures.map((v) => (
              <article className="venture-row" key={v.slug}>
                <span className="venture-number">{v.number}</span>
                <div>
                  <span className="tag">{v.category}</span>
                  <h3>{v.name}</h3>
                </div>
                <p>{v.description}</p>
                <Link href={v.href} aria-label={`Explore ${v.name}`}>
                  ↗
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* DIVISION GROUP 2: 366 AI PROGRAM */}
        <div className="division-group">
          <div className="division-group-header">
            <span className="division-pill ai">
              DIVISION II • 366 AI PROGRAM &amp; SOVEREIGN 400B+ COMPUTE
            </span>
            <p>
              Guided AI software creation workspace and high-VRAM local AI compute infrastructure.
            </p>
          </div>
          <div className="venture-list">
            {aiVentures.map((v) => (
              <article className="venture-row" key={v.slug}>
                <span className="venture-number">{v.number}</span>
                <div>
                  <span className="tag">{v.category}</span>
                  <h3>{v.name}</h3>
                </div>
                <p>{v.description}</p>
                <Link href={v.href} aria-label={`Explore ${v.name}`}>
                  ↗
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* DIVISION GROUP 3: COMMERCIAL VENTURES & GAMES (IMPACT ENGINE) */}
        <div className="division-group">
          <div className="division-group-header">
            <span className="division-pill commercial">
              DIVISION III • COMMERCIAL MARKETPLACES, LIVELIHOODS &amp; PURPOSE-LED GAMES
            </span>
            <p>
              Independent commercial platforms and interactive media that build local economic opportunity and generate sustainable funding for Division I.
            </p>
          </div>
          <div className="venture-list">
            {commercialAndGamesVentures.slice(0, 5).map((v) => (
              <article className="venture-row" key={v.slug}>
                <span className="venture-number">{v.number}</span>
                <div>
                  <span className="tag">{v.category}</span>
                  <h3>{v.name}</h3>
                </div>
                <p>{v.description}</p>
                <Link
                  href={v.href}
                  target={v.external ? "_blank" : undefined}
                  aria-label={`Explore ${v.name}`}
                >
                  ↗
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY & FUTURE PIPELINE */}
      <section className="section future-preview">
        <div className="section-heading">
          <div>
            <div className="section-label">06 / Next-Generation Field Pipeline</div>
            <h2>Practical community programs in development.</h2>
          </div>
          <p>
            Every program advances through community consultation, realistic engineering budgets and audited field validation.
          </p>
        </div>
        <div className="idea-grid">
          {futureIdeas.slice(0, 3).map((idea, i) => (
            <article key={idea.title}>
              <span>
                0{i + 1} / {idea.tag}
              </span>
              <h3>{idea.title}</h3>
              <p>{idea.copy}</p>
            </article>
          ))}
        </div>
        <ArrowLink href="/future">Explore all community initiatives</ArrowLink>
      </section>

      {/* CLOSING CTA */}
      <section className="closing-cta">
        <div className="connection-map" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="section-label">
          Global Water Innovation • Shark &amp; Crocodile Drone Safety • Disaster Rescue
        </div>
        <h2>Partner with a builder that executes on the ground and along the coast.</h2>
        <p>
          366 Industries and 1st Defence Industries connect engineers, coastal municipalities, rural barangays, smallholder farmers, universities and international grantmakers across borders.
        </p>
        <div className="actions">
          <ArrowLink href="/donate">❤ Donate to Frontline Missions</ArrowLink>
          <ArrowLink href="/grants" secondary>
            View Global Grant &amp; Audit Dossier
          </ArrowLink>
          <ArrowLink href="/login" secondary>
            Member &amp; Donor Sign In
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
