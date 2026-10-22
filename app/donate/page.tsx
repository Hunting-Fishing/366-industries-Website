import { ArrowLink, PageHero, Shell } from "../components";
import { DonationSection } from "./donation-widget";

export const metadata = {
  title: "Donate to Clean Water, Coastal Shark/Crocodile Drones & Disaster Rescue | 366 Industries",
  description:
    "Support 366 Industries and 1st Defence Industries' humanitarian deployments: Off-Grid Solar Borehole Clean Water Hubs, the WildGuard Coastal Shark & Crocodile Drone Protection Network, and Rapid Disaster Search-and-Rescue Operations.",
};

const sponsorshipPackages = [
  [
    "PACKAGE 01 • $500 USD",
    "Emergency Rescue Raft & Trauma Drop Pack",
    "Equips our WildGuard Disaster-Response Drone fleet with GPS-tracked self-inflating rescue rafts, emergency drinking water pouches and trauma medical kits for typhoon and flood rescues.",
  ],
  [
    "PACKAGE 02 • $2,500 USD",
    "24/7 Barangay Smart Prepaid Water Dispenser Unit",
    "Funds a complete RFID Smart Prepaid Water Dispenser and inline digital IoT water flow sensor module—delivering 24/7 safe household drinking water while funding local maintenance.",
  ],
  [
    "PACKAGE 03 • $6,500 USD",
    "WildGuard Coastal Shark & Crocodile Drone Unit",
    "Sponsors a solar-charged coastal safety UAV equipped with polarized glare-cutting optics, thermal infrared imaging, edge-AI predator detection and aerial loudspeaker alerts.",
  ],
  [
    "PACKAGE 04 • $20,000 USD",
    "Full Dual-Stream Solar Borehole Barangay Water Hub",
    "Commissions an entire off-grid Solar Borehole Water Hub (deep well drilling, solar submersible pump, elevated storage, multi-stage ultrafiltration + UV, smart dispenser & farm irrigation hydrants) serving ~1,250 rural residents.",
  ],
];

export default function DonatePage() {
  return (
    <Shell>
      <PageHero
        image="/assets/community-relief.png"
        eyebrow="366 Humanitarian & Clean-Tech Donations"
        title="Fund clean water. Protect coastlines. Save lives in disasters."
      >
        <p>
          Every contribution to <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> is placed in our <strong>Ring-Fenced Humanitarian Impact Reserve</strong>—directly financing off-grid <strong>Solar Borehole Water Hubs</strong>, our <strong>Coastal Shark &amp; Crocodile Drone Protection Network</strong>, and <strong>Rapid Disaster Search-and-Rescue Operations</strong>.
        </p>
        <div className="actions">
          <ArrowLink href="#donate">Make a Donation Now</ArrowLink>
          <ArrowLink
            href="https://www.gofundme.com/f/clean-water-4-all-j2tyh"
            external
            secondary
          >
            Clean Water 4 All (GoFundMe)
          </ArrowLink>
          <ArrowLink
            href="https://www.gofundme.com/f/wildguard-drone-network"
            external
            secondary
          >
            WildGuard Drones (GoFundMe)
          </ArrowLink>
        </div>
      </PageHero>

      {/* INTERACTIVE DONATION WIDGET */}
      <DonationSection />

      {/* NAMED HARDWARE & COMMUNITY SPONSORSHIP PACKAGES */}
      <section className="section pipe-roadmap">
        <div className="section-heading">
          <div>
            <div className="section-label">Direct Hardware &amp; Community Sponsorships</div>
            <h2>Sponsor a specific piece of life-saving infrastructure.</h2>
          </div>
          <p>
            Individuals, families, corporations, Rotary Clubs and foundations can sponsor dedicated water or coastal safety hardware with permanent plaque recognition and live IoT/flight telemetry reports.
          </p>
        </div>

        <div className="pipe-roadmap-grid">
          {sponsorshipPackages.map(([tag, title, copy]) => (
            <article key={tag}>
              <span>{tag}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* INSTITUTIONAL, CORPORATE & IN-KIND EQUIPMENT DONATIONS */}
      <section className="pipe-trust">
        <div>
          <div className="section-label">Major Gifts, Grants &amp; Equipment-in-Kind</div>
          <h2>Other ways to support our global mission.</h2>
        </div>
        <div className="pipe-trust-list">
          <p>
            <b>Institutional Grants &amp; CSR Partnerships</b>
            <span>
              Review our complete $385,000 USD Multi-Grant Capital &amp; Equipment Dossier at <a href="/grants" style={{ color: "var(--orange)", textDecoration: "underline" }}>366industries.com/grants</a> or contact our audit desk for custom concept notes.
            </span>
          </p>
          <p>
            <b>Hardware &amp; Equipment-in-Kind Donations</b>
            <span>
              We accept donations of solar PV panels, LiFePO4 battery banks, enterprise GPUs/AI servers (for our 400B+ local AI node), industrial UAVs, thermal cameras, borehole drilling equipment and 4x4 field vehicles.
            </span>
          </p>
          <p>
            <b>Rotary Club &amp; Municipal Co-Sponsorships</b>
            <span>
              Partner with our teams in British Columbia (Canada), Ilocos Norte (Philippines) and Wyoming (USA) on joint Rotary Global WASH Grants or LGU Calamity/Development deployments.
            </span>
          </p>
        </div>
      </section>
    </Shell>
  );
}
