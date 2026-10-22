import Link from "next/link";
import { ArrowLink, Shell } from "./components";
import { DonationSection } from "./donate/donation-widget";
import { futureIdeas, ventures } from "./site-data";

const humanitarianAllocations = [
  {
    percent: "40%",
    tag: "PILLAR 01 • CLEAN WATER & WASH",
    title: "Global Clean Water & Solar Borehole Hubs",
    copy: "Website and commercial platform funds directly co-finance deep-aquifer borehole drilling, 100% off-grid solar submersible pumps, multi-stage ultrafiltration + UV treatment, inline IoT water flow sensors, 24/7 RFID smart prepaid dispensers and dry-season farm irrigation.",
    href: "/water",
    cta: "Explore Water Innovation",
  },
  {
    percent: "25%",
    tag: "PILLAR 02 • COASTAL PREDATOR OVERWATCH",
    title: "Shark & Crocodile Drone Protection Network",
    copy: "Funds solar-charged coastal UAV stations equipped with polarized optical cameras, thermal infrared sensors and edge-AI computer vision to detect sharks, saltwater crocodiles and rip currents along beaches, river mouths and fishing coastlines—alerting swimmers and lifeguards in real time.",
    href: "/humanity/coastal-safety",
    cta: "Explore Coastal Drone Safety",
  },
  {
    percent: "20%",
    tag: "PILLAR 03 • DISASTER SEARCH & RESCUE",
    title: "Typhoon, Flood & Emergency Rescue Operations",
    copy: "Supports rapid-deployment thermal reconnaissance and heavy-payload delivery drones that locate stranded families and drop emergency drinking water, trauma medicine, satellite radios and GPS-tracked self-inflating rescue rafts when storms sever roads.",
    href: "/humanity/disaster-response-drones",
    cta: "Explore Disaster Rescue",
  },
  {
    percent: "15%",
    tag: "PILLAR 04 • LOCAL GOVERNANCE & TRAINING",
    title: "Community Technicians & Lifeguard Readiness",
    copy: "Builds ring-fenced local maintenance reserves and trains Barangay Water Associations, municipal lifeguards and licensed local drone responders across the Philippines, North America and developing coastlines worldwide.",
    href: "/grants",
    cta: "View Audit & Grant Model",
  },
];

const globalGrantCategories = [
  {
    code: "GRANT TRACK 01",
    title: "Global Clean Water (WASH) & Climate-Smart Agriculture",
    targets: "Global Innovation Fund ($220K) • D-Prize ($20K) • Rotary Foundation Global WASH ($30K–$400K) • Grand Challenges Canada • FIT",
    scope: "Funds off-grid Solar Borehole Water Hubs, ultrafiltration, IoT water flow telemetry, 24/7 smart prepaid dispensers and smallholder farm irrigation.",
  },
  {
    code: "GRANT TRACK 02",
    title: "Coastal Safety, Shark & Crocodile Mitigation & Marine Innovation",
    targets: "Coastal Lifesaving & Beach Safety Funds • Indo-Pacific Estuarine & Marine Safety Grants • Non-Lethal Wildlife Coexistence Programs",
    scope: "Funds AI-assisted coastal drone patrols, polarized/thermal shark & crocodile detection, automated beach warning systems and drop-deployed flotation pods.",
  },
  {
    code: "GRANT TRACK 03",
    title: "Disaster Risk Reduction (DRRM) & Search-and-Rescue UAVs",
    targets: "Humanitarian Grand Challenge ($250K) • DOST-DRRM / GIA • UN/WFP Innovation • Municipal 5% Calamity (LDRRMF) Joint Ventures",
    scope: "Funds all-weather thermal search-and-rescue drones, heavy-lift medical/water payload delivery, GPS inflatable rescue rafts and mobile command trailers.",
  },
  {
    code: "GRANT TRACK 04",
    title: "Sovereign 400B+ AI Compute, Clean Energy & Deep-Tech R&D",
    targets: "NRC IRAP Canada • SR&ED • DOST-PCIEERD Equipment Outlay (₱5M) • IEEE Smart Village ($100K) • UNDP-GEF Small Grants",
    scope: "Funds our 400B+ parameter local AI workstation/server cluster (powering 366 AI Designer & offline drone CV), community solar microgrids and 4x4 field trucks.",
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
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-kicker">
            GLOBAL HUMANITARIAN &amp; CLEAN-TECH ENGINEERING • <strong>CANADA • PHILIPPINES • USA</strong>
          </div>
          <h1>
            Clean water.<br />
            Coastal safety.<br />
            <em>Built to save lives.</em>
          </h1>
          <p>
            <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> engineer practical humanitarian infrastructure worldwide—combining off-grid <strong>Solar Borehole &amp; Smart Water Hubs</strong>, our <strong>WildGuard Coastal Drone Protection Network</strong> where sharks and saltwater crocodiles roam, <strong>Rapid Disaster Search-and-Rescue UAVs</strong>, and our flagship <strong>366 AI Program</strong>.
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
        </div>

        <div className="hero-index">
          <span>CLEAN WATER • COASTAL DRONES • DISASTER RESCUE • 366 AI</span>
          <i />
        </div>

        <div className="hero-rail">
          {[
            ["01 / CLEAN WATER", "Solar Borehole & Water Hubs", "/water"],
            ["02 / COASTAL & RESCUE", "Shark, Croc & Disaster Drones", "/humanity"],
            ["03 / GLOBAL GRANTS", "Institutional Audit & Dossier", "/grants"],
            ["04 / 366 AI PROGRAM", "366 AI Designer & 400B+ Core", "/ai-designer"],
          ].map(([n, label, href]) => (
            <Link href={href} key={href}>
              <small>{n}</small>
              <strong>{label}</strong>
              <span>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* INSTITUTIONAL METRICS BAR */}
      <section className="metrics-strip" aria-label="Key Institutional Metrics">
        <div className="metrics-strip-inner">
          <div className="metric-item">
            <span className="metric-kicker">CLEAN WATER &amp; AG-TECH</span>
            <strong>Dual-Stream Solar Hubs</strong>
            <p>24/7 safe household drinking water + metered dry-season smallholder farm irrigation</p>
          </div>
          <div className="metric-item">
            <span className="metric-kicker">COASTAL DRONE PROTECTION</span>
            <strong>Shark &amp; Crocodile Overwatch</strong>
            <p>AI optical &amp; thermal UAV patrols protecting beaches, estuaries &amp; coastal communities</p>
          </div>
          <div className="metric-item">
            <span className="metric-kicker">EMERGENCY RESPONSE</span>
            <strong>Disaster Rescue &amp; Relief</strong>
            <p>Typhoon &amp; flood search-and-rescue, medical drops &amp; GPS inflatable rescue rafts</p>
          </div>
          <div className="metric-item">
            <span className="metric-kicker">TRI-NATIONAL COMPLIANCE</span>
            <strong>100% Audit-Ready Entities</strong>
            <p>Registered across BC (Canada), Ilocos Norte (Philippines) &amp; Wyoming (USA)</p>
          </div>
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
            Unlike traditional charities that rely solely on one-time donations, <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> operate a <strong>Dual-Engine Humanitarian Model</strong>: revenues from our software (<strong>366 AI Designer</strong>), commercial marketplaces and games are pooled with international grants into a <strong>Ring-Fenced Humanitarian Impact Reserve</strong>.
          </p>
        </div>

        <div className="pledge-banner-card">
          <div className="pledge-banner-left">
            <span className="pledge-pill">AUDITED HUMANITARIAN FUND ALLOCATION</span>
            <h3>Every commercial venture &amp; grant dollar strengthens frontline community survival.</h3>
            <p>
              Our website funds, platform subscriptions, marketplace fees and non-dilutive institutional grants are structured with transparent accounting to deploy permanent clean water infrastructure, coastal predator protection and emergency disaster rescues across the Philippines and underserved regions globally.
            </p>
          </div>
          <div className="pledge-banner-right">
            <div className="pledge-stat">
              <strong>100%</strong>
              <span>Ring-Fenced Grant &amp; Humanitarian Reserve Accounting</span>
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
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link href={item.href} className="allocation-link">
                {item.cta} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* DIRECT DONATIONS SECTION ON HOMEPAGE */}
      <DonationSection compact />

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
              style={{ backgroundImage: "url('/assets/community-relief.png')" }}
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
              style={{ backgroundImage: "url('/assets/humanity-hero.png')" }}
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
              style={{ backgroundImage: "url('/assets/drone-guardian.png')" }}
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
            <div className="ai-mini-card">
              <span>01 / PRODUCT BUILDER</span>
              <h4>366 AI Designer Workspace</h4>
              <p>Move from plain-language concept to a structured, visual and deployable web application at designer.366industries.com.</p>
            </div>
            <div className="ai-mini-card">
              <span>02 / SOVEREIGN 400B+ AI</span>
              <h4>High-VRAM Local AI Node</h4>
              <p>On-premise multi-GPU architecture engineered to execute 400B+ parameter reasoning, coding &amp; multimodal vision models locally.</p>
            </div>
            <div className="ai-mini-card">
              <span>03 / HUMANITARIAN CV &amp; TELEMETRY</span>
              <h4>Offline Coastal &amp; Disaster AI</h4>
              <p>Powers real-time shark/crocodile aerial detection, flood survivor thermal recognition and predictive borehole pump diagnostics.</p>
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
            <strong>Review our complete $385,000 USD Multi-Grant Capital, Water, Drone, Clean Energy &amp; 400B+ AI Dossier</strong>
            <span>Includes line-item equipment specifications, UN SDG alignment, and tri-national corporate verification.</span>
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
            <span className="division-pill humanitarian">DIVISION I • HUMANITARIAN, CLEAN WATER &amp; COASTAL DRONE SAFETY</span>
            <p>Frontline physical infrastructure funded by institutional grants, community campaigns and ring-fenced platform revenues.</p>
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
            <span className="division-pill ai">DIVISION II • 366 AI PROGRAM &amp; SOVEREIGN 400B+ COMPUTE</span>
            <p>Guided AI software creation workspace and high-VRAM local AI compute infrastructure.</p>
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
            <span className="division-pill commercial">DIVISION III • COMMERCIAL MARKETPLACES, LIVELIHOODS &amp; PURPOSE-LED GAMES</span>
            <p>Independent commercial platforms and interactive media that build local economic opportunity and generate sustainable funding for Division I.</p>
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
        <div className="section-label">Global Water Innovation • Shark &amp; Crocodile Drone Safety • Disaster Rescue</div>
        <h2>Partner with a builder that executes on the ground and along the coast.</h2>
        <p>
          366 Industries and 1st Defence Industries connect engineers, coastal municipalities, rural barangays, smallholder farmers, universities and international grantmakers across borders.
        </p>
        <div className="actions">
          <ArrowLink href="/grants">View Global Grant &amp; Audit Dossier</ArrowLink>
          <ArrowLink href="/water" secondary>
            Explore Solar Water Hubs
          </ArrowLink>
          <ArrowLink href="/humanity" secondary>
            Explore Coastal &amp; Rescue Drones
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
