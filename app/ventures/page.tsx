import Link from "next/link";
import { ArrowLink, PageHero, Shell } from "../components";
import { ventures } from "../site-data";

export const metadata = {
  title: "Separated Divisions & Ventures Portfolio | 366 Industries & 1st Defence Industries",
  description:
    "Explore the cleanly separated divisions of 366 Industries and 1st Defence Industries: Humanitarian Clean Water & Coastal Drone Protection, the 366 AI Designer Program, Commercial Marketplaces, and Purpose-Led Games.",
};

export default function VenturesPage() {
  const divisions = [
    {
      id: "humanitarian-division",
      badge: "DIVISION I • HUMANITARIAN, CLEAN WATER & COASTAL DRONE SAFETY",
      title: "Global Clean Water, Shark/Crocodile Coastal Protection & Disaster Rescue",
      desc: "Our primary humanitarian infrastructure programs—funded through institutional grants, community campaigns and ring-fenced proceeds from our commercial platforms.",
      items: ventures.filter((v) => v.division === "humanitarian"),
    },
    {
      id: "ai-division",
      badge: "DIVISION II • 366 AI PROGRAM & SOVEREIGN 400B+ COMPUTE",
      title: "366 AI Designer & Local High-VRAM AI Infrastructure",
      desc: "Our flagship AI software creation workspace and sovereign 400B+ parameter compute roadmap—empowering builders while providing computer-vision and telemetry intelligence for our water and drone networks.",
      items: ventures.filter((v) => v.division === "ai"),
    },
    {
      id: "commercial-division",
      badge: "DIVISION III • COMMERCIAL MARKETPLACES & RURAL LIVELIHOODS",
      title: "Commercial Platforms that Build Opportunity & Co-Fund Humanitarian Impact",
      desc: "Focused industrial marketplaces, export supply chains and small-business platforms generating sustainable commercial revenue that reinforces our Humanitarian Impact Reserve.",
      items: ventures.filter((v) => v.division === "commercial"),
    },
    {
      id: "games-division",
      badge: "DIVISION IV • PURPOSE-LED GAMES & INTERACTIVE ROBOTICS",
      title: "Entertainment & Live Telemetry Platforms Funding Real-World Relief",
      desc: "Tabletop, digital and live remote-control robotics experiences designed around resilience, rescue and engineering.",
      items: ventures.filter((v) => v.division === "games"),
    },
  ];

  return (
    <Shell>
      <PageHero
        image="/assets/ventures-hero.png"
        eyebrow="Cleanly Separated Organization Portfolio"
        title="Four distinct divisions. One humanitarian commitment."
      >
        <p>
          <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> separate our frontline <strong>Humanitarian Water &amp; Coastal Drone Operations</strong>, our <strong>366 AI Program</strong>, our <strong>Commercial Marketplaces</strong>, and our <strong>Purpose-Led Games</strong> into clearly structured divisions—so grant auditors, commercial customers and community partners can evaluate each program with clarity.
        </p>
        <div className="actions">
          <ArrowLink href="#humanitarian-division">Humanitarian &amp; Water</ArrowLink>
          <ArrowLink href="#ai-division" secondary>
            366 AI Program
          </ArrowLink>
          <ArrowLink href="#commercial-division" secondary>
            Commercial Ventures
          </ArrowLink>
        </div>
      </PageHero>

      {divisions.map((div) => (
        <section id={div.id} key={div.id} className="section" style={{ borderBottom: "1px solid var(--rule)" }}>
          <div className="section-heading">
            <div>
              <div className="section-label">{div.badge}</div>
              <h2>{div.title}</h2>
            </div>
            <p>{div.desc}</p>
          </div>
          <div className="portfolio-grid">
            {div.items.map((v) => (
              <article id={v.slug} key={v.slug} className="portfolio-card">
                <Link
                  className={`portfolio-card-image ${
                    v.slug === "365-motor-sales" ? "logo-card-image" : ""
                  }`}
                  href={v.href}
                  style={{
                    backgroundImage: `linear-gradient(0deg,rgba(7,16,20,.82),rgba(7,16,20,.02)),url('${v.image}')`,
                  }}
                  aria-label={`Open ${v.name}`}
                />
                <div className="portfolio-card-content">
                  <div className="portfolio-top">
                    <span>{v.number}</span>
                    <span className="tag">{v.category}</span>
                  </div>
                  <h2>
                    <Link href={v.href}>{v.name}</Link>
                  </h2>
                  <p>{v.description}</p>
                  <div className="impact">
                    <small>Humanitarian &amp; Economic Impact</small>
                    {v.impact}
                  </div>
                  <div className="card-footer">
                    <span>{v.status}</span>
                    <Link href={v.href}>Explore project ↗</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="section build-principles">
        <div className="section-label">How our divisions work together</div>
        <div className="principles">
          <div>
            <span>01</span>
            <h3>Humanitarian First</h3>
            <p>
              Clean water, shark &amp; crocodile coastal drone protection and disaster search-and-rescue receive ring-fenced grant and platform funding.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Shared 400B+ AI Engine</h3>
            <p>
              Our 366 AI Program powers software creation online while delivering offline computer vision and IoT telemetry for our water hubs and drones.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Auditable Separation</h3>
            <p>
              Each division maintains separate project accounting, clear performance metrics and institutional compliance across Canada, the Philippines and the USA.
            </p>
          </div>
        </div>
        <div className="actions">
          <ArrowLink href="/grants">View Global Grant Dossier</ArrowLink>
          <ArrowLink href="/about#partner" secondary>
            Partner with 366 Industries
          </ArrowLink>
        </div>
      </section>
    </Shell>
  );
}
