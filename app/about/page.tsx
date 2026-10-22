import { ArrowLink, PageHero, Shell } from "../components";

export const metadata = {
  title: "About, Humanitarian Charter & Institutional Audit | 366 Industries & 1st Defence Industries",
  description:
    "Learn how 366 Industries and 1st Defence Industries operate across British Columbia (Canada), Ilocos Norte (Philippines) and Wyoming (USA) to fund and deploy global clean water, coastal shark & crocodile drone safety, disaster rescue and sovereign AI.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHero
        image="/assets/hero-solutions-today.png"
        eyebrow="Why 366 Industries & 1st Defence Industries"
        title="Commercial strength. Humanitarian purpose."
      >
        <p>
          <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> operate across <strong>British Columbia (Canada)</strong>, <strong>Ilocos Norte (Philippines)</strong> and <strong>Wyoming (USA)</strong> to engineer off-grid solar borehole water hubs, coastal shark &amp; crocodile drone protection networks, rapid disaster search-and-rescue systems, and our flagship <strong>366 AI Designer Program</strong>.
        </p>
        <div className="actions">
          <ArrowLink href="/grants">Global Grant &amp; Audit Dossier</ArrowLink>
          <ArrowLink href="/water" secondary>
            Solar Water Innovation
          </ArrowLink>
          <ArrowLink href="#partner" secondary>
            Partner with us
          </ArrowLink>
        </div>
      </PageHero>

      <section className="section origin">
        <div className="section-label">01 / Our Operating Philosophy &amp; Humanitarian Pledge</div>
        <div>
          <h2>One extra day became an operating standard.</h2>
          <p>
            A leap year is remembered for the 366th day—the extra day that does not normally exist. We chose <strong>366</strong> as a commitment to creating extra time, safety and opportunity for communities facing water scarcity, coastal hazards and natural disasters.
          </p>
          <blockquote>“Leap years take breaks. We do not.”</blockquote>
          <p>
            Through our <strong>Humanitarian Revenue &amp; Grant Charter</strong>, proceeds generated across our website and commercial platforms—including <strong>366 AI Designer</strong>, <strong>Pipe Buyer</strong>, <strong>365 Motor Sales</strong>, <strong>Philippines Crafted Sea Salt</strong> and <strong>366 Games</strong>—are paired with international grants to fund permanent clean water wells, coastal shark &amp; crocodile safety drones and disaster rescue operations worldwide.
          </p>
        </div>
      </section>

      <section className="impact-band values">
        <div className="section-label">
          02 / Tri-National Operating Structure (For Auditors &amp; Global Grant Agencies)
        </div>
        <div className="arena-grid">
          <div>
            <span>01 / CANADA</span>
            <h3>1st Defence Industries</h3>
            <p>
              Active British Columbia corporate entity leading clean-tech &amp; 400B+ AI R&amp;D, IoT water flow telemetry, drone vision engineering and Canadian grant compliance.
            </p>
          </div>
          <div>
            <span>02 / PHILIPPINES</span>
            <h3>Ilocos Norte Operations</h3>
            <p>
              Registered Philippine operations in Ilocos Norte leading deep borehole drilling, solar pump installation, coastal/disaster drone pilots and smallholder farmer irrigation.
            </p>
          </div>
          <div>
            <span>03 / UNITED STATES</span>
            <h3>Wyoming LLC</h3>
            <p>
              US corporate structure supporting North American equipment sourcing, commercial platforms and international development grant execution.
            </p>
          </div>
          <div>
            <span>04 / AUDITABLE IMPACT</span>
            <h3>Open Telemetry</h3>
            <p>
              Every water hub and drone unit tracks liters dispensed, water quality lab tests, flight safety logs and ring-fenced community maintenance reserves.
            </p>
          </div>
        </div>
      </section>

      <section id="partner" className="section partner">
        <div>
          <div className="section-label">03 / Partner with 366 &amp; 1st Defence Industries</div>
          <h2>Bring a grant, a coastal or rural community, or an engineering challenge.</h2>
          <p>
            We collaborate with international grant agencies (Global Innovation Fund, D-Prize, Grand Challenges Canada, FIT, Rotary Foundation, IEEE Smart Village, UN/WASH &amp; DRRM programs), Philippine government &amp; academic partners (DOST, Mariano Marcos State University), Canadian R&amp;D programs (NRC IRAP), coastal municipalities and rural farming cooperatives.
          </p>
          <div className="actions">
            <ArrowLink href="/grants">Review Full Global Grant Dossier</ArrowLink>
            <ArrowLink href="/humanity" secondary>
              Explore Coastal &amp; Rescue Drones
            </ArrowLink>
          </div>
        </div>
        <div className="partner-options">
          <div>
            <span>01</span>
            <h3>Clean Water &amp; Ag-Tech</h3>
            <p>
              Deep boreholes, solar submersible pumps, multi-stage filtration, IoT water flow sensors, 24/7 smart prepaid dispensers and dry-season farm irrigation.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Coastal &amp; Disaster Drones</h3>
            <p>
              AI thermal/optical coastal drone patrols where sharks and crocodiles roam, plus typhoon/flood search-and-rescue, medical delivery and GPS rescue raft drops.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Global Grants &amp; R&amp;D</h3>
            <p>
              100% non-repayable humanitarian, WASH, coastal safety, disaster relief, clean energy microgrid and sovereign 400B+ AI compute grant execution.
            </p>
          </div>
          <ArrowLink href="mailto:partnerships@366industries.com">
            Begin an institutional grant or partnership inquiry
          </ArrowLink>
          <small>
            Official institutional verification &amp; audit desk for 366 Industries &amp; 1st Defence Industries.
          </small>
        </div>
      </section>
    </Shell>
  );
}
