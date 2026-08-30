import Link from "next/link";
import { ArrowLink, PageHero, Shell } from "../components";
import { humanityMissions } from "../site-data";
export const metadata = { title: "Humanity" };
export default function HumanityPage(){return <Shell><PageHero image="/assets/humanity-hero.png" eyebrow="The 366 Initiative" title="Preparedness should not be a luxury."><p>Our humanitarian work is built around a simple reality: during disasters and daily emergencies, distance and income should not decide who receives help.</p><div className="actions"><ArrowLink href="#missions">Explore the missions</ArrowLink><ArrowLink href="#campaigns" secondary>Support a campaign</ArrowLink></div></PageHero>
<section id="missions" className="section mission-grid">{humanityMissions.map(m=><Link href={`/humanity/${m.slug}`} className="mission-card" style={{backgroundImage:`linear-gradient(0deg,rgba(7,16,20,.96),rgba(7,16,20,.08)),url('${m.image}')`}} key={m.slug}><span>{m.number}</span><div><h2>{m.title}</h2><p>{m.copy}</p><b>Explore mission ↗</b></div></Link>)}</section>
<section className="impact-band statement"><div className="section-label">The standard</div><h2>Useful. Responsible. Locally operated.</h2><p>We will publish pilot scope, partner roles, safety boundaries and use-of-funds before asking the public to trust a campaign.</p></section>
<section id="campaigns" className="section campaign campaigns-live">
  <div>
    <div className="section-label">Support the work</div>
    <h2>Two campaigns. Real problems. Practical action.</h2>
    <p>Choose the mission closest to you. Every contribution, share and introduction helps us move from planning into responsible field deployment.</p>
  </div>
  <div className="campaign-cards">
    <a className="campaign-card campaign-wildguard" href="https://www.gofundme.com/f/wildguard-drone-network" target="_blank" rel="noreferrer">
      <span>01 / DRONE RESPONSE</span>
      <h3>WildGuard Drone Network</h3>
      <p>Help build a drone network for search and rescue, disaster relief, supply delivery and safer monitoring around wildlife and waterways.</p>
      <span className="button">Support WildGuard <i>↗</i></span>
    </a>
    <a className="campaign-card campaign-water" href="https://www.gofundme.com/f/clean-water-4-all-j2tyh" target="_blank" rel="noreferrer">
      <span>02 / CLEAN WATER</span>
      <h3>Clean Water 4 All</h3>
      <p>Support practical clean-water solutions for communities where safe, dependable access is still out of reach.</p>
      <span className="button">Support Clean Water <i>↗</i></span>
    </a>
  </div>
</section></Shell>}
