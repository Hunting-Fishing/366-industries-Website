import Link from "next/link";
import { ArrowLink, PageHero, Shell } from "../components";
import { DonationSection } from "../donate/donation-widget";
import { humanityMissions } from "../site-data";

export const metadata = {
  title: "Humanity, Coastal Shark & Crocodile Drone Network & Disaster Rescue | 366 Industries",
  description:
    "Global humanitarian operations by 366 Industries & 1st Defence Industries: WildGuard Coastal Shark & Crocodile Drone Protection Network, Rapid Disaster Search-and-Rescue UAVs, and Off-Grid Solar Borehole Clean Water Hubs.",
};

const coastalSafetySteps = [
  [
    "01 / AERIAL & THERMAL OVERWATCH",
    "Polarized Optical + Thermal Scanning",
    "Solar-charged UAVs patrol beaches, coastlines, river mouths, mangroves and estuaries where bull sharks, tiger sharks, great whites and saltwater crocodiles roam—cutting through surface glare to spot submerged predators.",
  ],
  [
    "02 / EDGE-AI PREDATOR DETECTION",
    "Real-Time Shark, Crocodile & Rip-Current AI",
    "Computer-vision models trained on marine and estuarine predators classify sharks, saltwater crocodiles and dangerous rip currents in seconds—distinguishing threats from harmless rays, dolphins or boats.",
  ],
  [
    "03 / INSTANT COMMUNITY & LIFEGUARD ALERT",
    "Automated Siren, Megaphone & GPS Dispatch",
    "The moment a shark or crocodile is detected near swimmers or fishing boats, the drone triggers an onboard aerial loudspeaker warning while transmitting exact GPS coordinates and live video to lifeguards and barangay responders.",
  ],
  [
    "04 / EMERGENCY FLOTATION DROP",
    "Self-Inflating Rescue Pods & Rafts",
    "For swimmers caught in rip currents, capsized fishermen or flood victims, heavy-payload drones drop GPS-tracked self-inflating flotation pods and emergency rescue rafts within seconds.",
  ],
];

const disasterCapabilities = [
  [
    "CAPABILITY 01",
    "Typhoon & Flood Search-and-Rescue",
    "Thermal infrared night/storm reconnaissance locates families stranded on rooftops, cut-off riverbanks or adrift at sea when roads and bridges are destroyed.",
  ],
  [
    "CAPABILITY 02",
    "Heavy-Lift Medical & Clean Water Delivery",
    "Delivers emergency drinking water pouches, trauma first-aid kits, insulin/antibiotics and two-way mesh radios across washed-out mountain and coastal corridors.",
  ],
  [
    "CAPABILITY 03",
    "GPS Inflatable Rescue Raft Deployment",
    "Drops high-buoyancy, self-inflating emergency rafts with GPS beacons to stabilize flood and maritime survivors until boat or helicopter extraction arrives.",
  ],
  [
    "CAPABILITY 04",
    "Zero-Internet Offline AI & Solar Command",
    "Operates from 4x4 mobile command trailers equipped with solar + LiFePO4 battery banks and local 400B+ AI inference when municipal power grids and cell towers fail.",
  ],
];

export default function HumanityPage() {
  return (
    <Shell>
      <PageHero
        image="/assets/humanity-hero.png"
        eyebrow="The 366 Humanitarian & WildGuard Initiative"
        title="Safe water. Safe coastlines. Rapid disaster rescue."
      >
        <p>
          Supported by our ring-fenced website &amp; commercial platform revenues and international grants, <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> engineer frontline humanitarian systems: <strong>Global Clean Water Innovation</strong>, our <strong>Coastal Shark &amp; Crocodile Drone Protection Network</strong>, and <strong>All-Weather Disaster Search-and-Rescue Operations</strong>.
        </p>
        <div className="actions">
          <ArrowLink href="#coastal-protection">Coastal Shark &amp; Crocodile Drones</ArrowLink>
          <ArrowLink href="#disaster-rescue" secondary>
            Disaster Search &amp; Rescue
          </ArrowLink>
          <ArrowLink href="/water" secondary>
            Global Clean Water Hubs
          </ArrowLink>
        </div>
      </PageHero>

      {/* FOUR CORE HUMANITARIAN MISSIONS */}
      <section id="missions" className="section">
        <div className="section-heading">
          <div>
            <div className="section-label">01 / Four Integrated Humanitarian Pillars</div>
            <h2>Protecting life on land, along the coast &amp; during disasters.</h2>
          </div>
          <p>
            Every mission combines field-proven hardware, local responder training, IoT/aerial telemetry and transparent grant accountability.
          </p>
        </div>

        <div className="mission-grid">
          {humanityMissions.map((m) => (
            <Link
              href={`/humanity/${m.slug}`}
              className="mission-card"
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(7,16,20,.96) 15%,rgba(7,16,20,.35) 65%,rgba(7,16,20,.15)),url('${m.image}')`,
              }}
              key={m.slug}
            >
              <span>{m.number}</span>
              <div>
                <h2>{m.title}</h2>
                <p>{m.copy}</p>
                <b>Explore mission protocol &amp; specs ↗</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DEEP DIVE 1: COASTAL SHARK & CROCODILE DRONE PROTECTION NETWORK */}
      <section id="coastal-protection" className="section pipe-roadmap">
        <div className="section-heading">
          <div>
            <div className="section-label">02 / WildGuard Coastal &amp; Waterway Drone Protection Network</div>
            <h2>Keeping people safe along coastlines where sharks &amp; crocodiles roam.</h2>
          </div>
          <p>
            Across the Indo-Pacific, Philippines, Australia, Africa and the Americas, coastal communities, children, swimmers, surfers and artisanal fishermen share waters with <strong>sharks</strong> and <strong>saltwater/estuarine crocodiles</strong>. We replace lethal shark nets and blind guesswork with a non-lethal, AI-powered aerial safety perimeter.
          </p>
        </div>

        <div className="pipe-feature-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {coastalSafetySteps.map(([code, title, copy]) => (
            <article key={code}>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="pledge-banner-card" style={{ marginTop: "28px" }}>
          <div className="pledge-banner-left">
            <span className="pledge-pill">GLOBAL COASTAL DEPLOYMENT READINESS</span>
            <h3>Designed for beaches, fishing villages, river mouths &amp; island municipalities.</h3>
            <p>
              Our coastal drone stations charge via off-grid solar microgrids and work alongside local lifeguards, coast guards and barangay sea patrols—protecting both human life and marine biodiversity without harming wildlife.
            </p>
          </div>
          <div className="actions" style={{ marginTop: 0 }}>
            <ArrowLink href="/humanity/coastal-safety">Coastal Safety Technical Brief</ArrowLink>
            <ArrowLink href="/grants" secondary>
              Coastal &amp; Marine Grant Dossier
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* DEEP DIVE 2: DISASTER SEARCH, RESCUE & HUMANITARIAN RELIEF */}
      <section id="disaster-rescue" className="section">
        <div className="section-heading">
          <div>
            <div className="section-label">03 / Rapid Disaster Response &amp; Search-and-Rescue Fleet</div>
            <h2>When typhoons, floods or earthquakes strike, we operate where roads fail.</h2>
          </div>
          <p>
            Our disaster-response fleet integrates heavy-payload UAVs, thermal search-and-rescue sensors, 4x4 mobile command vehicles and off-grid solar water/power units to save lives during the critical first 72 hours of an emergency.
          </p>
        </div>

        <div className="pipe-roadmap-grid">
          {disasterCapabilities.map(([code, title, copy]) => (
            <article key={code}>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* THE STANDARD BAND */}
      <section className="impact-band statement">
        <div className="section-label">04 / The 366 Humanitarian Standard</div>
        <h2>Funded by our platforms. Backed by global grants. Operated locally.</h2>
        <p>
          Every field deployment—led across Canada by 1st Defence Industries &amp; 366 Industries, in the United States via Wyoming LLC, and on the ground in Ilocos Norte, Philippines—publishes clear pilot scope, IoT flow telemetry, drone flight logs and ring-fenced community maintenance reserves.
        </p>
      </section>

      {/* INTERACTIVE DONATION SECTION */}
      <DonationSection compact />

      {/* ACTIVE CAMPAIGNS & GRANT SUPPORT */}
      <section id="campaigns" className="section campaign campaigns-live">
        <div>
          <div className="section-label">05 / Support &amp; Institutional Grants</div>
          <h2>Real infrastructure. Measurable humanitarian outcomes.</h2>
          <p>
            Alongside our own website &amp; commercial platform revenue allocations, we welcome institutional grantmakers, municipal DRRM/coastal safety partners and community backers across our three active humanitarian deployments.
          </p>
          <div className="actions">
            <ArrowLink href="/grants">Read Full Global Grant Dossier</ArrowLink>
            <ArrowLink href="/water" secondary>
              Solar Water Hubs Dossier
            </ArrowLink>
          </div>
        </div>
        <div className="campaign-cards">
          <Link className="campaign-card campaign-water" href="/water">
            <span>01 / GLOBAL WATER INNOVATION (ILOCOS NORTE, PH &amp; GLOBAL)</span>
            <h3>Dual-Stream Solar Borehole &amp; Smart Water Hubs</h3>
            <p>
              Deep borehole drilling, off-grid solar submersible pumps, ultrafiltration, IoT water flow sensors and 24/7 smart prepaid water dispensers for homes, blackout-hit communities and rural farmers.
            </p>
            <span className="button">
              Open Water &amp; Grant Brief <i>↗</i>
            </span>
          </Link>
          <a
            className="campaign-card campaign-wildguard"
            href="https://www.gofundme.com/f/wildguard-drone-network"
            target="_blank"
            rel="noreferrer"
          >
            <span>02 / COASTAL SHARK &amp; CROCODILE SAFETY + DISASTER RESCUE</span>
            <h3>WildGuard Drone Protection Network</h3>
            <p>
              Help build our coastal &amp; disaster drone network protecting swimmers and fishermen where sharks and crocodiles roam, while executing typhoon search-and-rescue and emergency supply drops.
            </p>
            <span className="button">
              Support WildGuard Network <i>↗</i>
            </span>
          </a>
          <a
            className="campaign-card campaign-water"
            href="https://www.gofundme.com/f/clean-water-4-all-j2tyh"
            target="_blank"
            rel="noreferrer"
          >
            <span>03 / DIRECT COMMUNITY WATER RELIEF</span>
            <h3>Clean Water 4 All Campaign</h3>
            <p>
              Support practical off-grid clean-water filtration and solar pumping solutions for underserved rural communities where safe, dependable water is still out of reach.
            </p>
            <span className="button">
              Support Clean Water 4 All <i>↗</i>
            </span>
          </a>
        </div>
      </section>
    </Shell>
  );
}
