import Link from "next/link";
import { ArrowLink, PageHero, Shell } from "../components";
import { humanityMissions } from "../site-data";
export const metadata = { title: "Humanity & Clean Water" };
export default function HumanityPage(){return <Shell><PageHero image="/assets/humanity-hero.png" eyebrow="The 366 Initiative" title="Preparedness should not be a luxury."><p>Our humanitarian and clean-tech engineering work is built around a simple reality: during power outages, seasonal droughts and disasters, distance and income should not decide which homes or farms have safe water and emergency help.</p><div className="actions"><ArrowLink href="/water">Solar Borehole &amp; Smart Water Hubs</ArrowLink><ArrowLink href="#campaigns" secondary>Support a campaign</ArrowLink></div></PageHero>
<section id="missions" className="section mission-grid">{humanityMissions.map(m=><Link href={`/humanity/${m.slug}`} className="mission-card" style={{backgroundImage:`linear-gradient(0deg,rgba(7,16,20,.96),rgba(7,16,20,.08)),url('${m.image}')`}} key={m.slug}><span>{m.number}</span><div><h2>{m.title}</h2><p>{m.copy}</p><b>Explore mission ↗</b></div></Link>)}</section>
<section className="impact-band statement"><div className="section-label">The standard</div><h2>Useful. Responsible. Locally operated.</h2><p>Every field deployment—led across Canada by 1st Defence Industries &amp; 366 Industries and on the ground in Ilocos Norte, Philippines—publishes clear pilot scope, IoT flow telemetry, water quality lab verification and ring-fenced community maintenance reserves.</p></section>
<section id="campaigns" className="section campaign campaigns-live">
  <div>
    <div className="section-label">Support &amp; institutional grants</div>
    <h2>Real infrastructure. Measurable impact.</h2>
    <p>Explore our flagship Dual-Stream Solar Borehole &amp; Smart Water Hub initiative in Ilocos Norte or support our active community deployments directly.</p>
    <div className="actions"><ArrowLink href="/water">Read Institutional Grant &amp; Water Dossier</ArrowLink></div>
  </div>
  <div className="campaign-cards">
    <Link className="campaign-card campaign-water" href="/water">
      <span>01 / SOLAR BOREHOLE &amp; SMART WATER HUBS (ILOCOS NORTE, PH)</span>
      <h3>Dual-Stream Clean Water &amp; Farm Irrigation</h3>
      <p>Deep borehole drilling, off-grid solar submersible pumps, ultrafiltration, IoT water flow sensors and 24/7 smart prepaid water dispensers for homes, blackout-hit communities and rural farmers.</p>
      <span className="button">Open Water &amp; Grant Brief <i>↗</i></span>
    </Link>
    <a className="campaign-card campaign-wildguard" href="https://www.gofundme.com/f/wildguard-drone-network" target="_blank" rel="noreferrer">
      <span>02 / DRONE RESPONSE</span>
      <h3>WildGuard Drone Network</h3>
      <p>Help build a drone network for search and rescue, disaster relief, supply delivery and safer monitoring around wildlife and waterways.</p>
      <span className="button">Support WildGuard <i>↗</i></span>
    </a>
    <a className="campaign-card campaign-water" href="https://www.gofundme.com/f/clean-water-4-all-j2tyh" target="_blank" rel="noreferrer">
      <span>03 / COMMUNITY CAMPAIGN</span>
      <h3>Clean Water 4 All</h3>
      <p>Support practical clean-water solutions for communities where safe, dependable access is still out of reach.</p>
      <span className="button">Support Clean Water <i>↗</i></span>
    </a>
  </div>
</section></Shell>}
