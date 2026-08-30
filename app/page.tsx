import Link from "next/link";
import { ArrowLink, Shell } from "./components";
import { futureIdeas, ventures } from "./site-data";

export default function Home() {
  return <Shell>
    <section className="home-hero">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-copy">
        <div className="hero-kicker">Leap years take breaks. <strong>We do not.</strong></div>
        <h1>Solutions<br/>for today.<br/><em>Opportunity<br/>for tomorrow.</em></h1>
        <p>366 Industries connects practical projects that save lives, strengthen small businesses, educate communities and bring people together—with games and creative projects that make the journey fun.</p>
        <div className="actions"><ArrowLink href="/ventures">See what we are building</ArrowLink><ArrowLink href="/about#partner" secondary>Work with 366</ArrowLink></div>
      </div>
      <div className="hero-index"><span>PEOPLE • PURPOSE • PROGRESS</span><i /></div>
      <div className="hero-rail">
        {[["01","Save lives","/humanity"],["02","Grow business","/future"],["03","Connect people","/ventures"],["04","Create & play","/games"]].map(([n,label,href]) => <Link href={href} key={href}><small>{n}</small><strong>{label}</strong><span>→</span></Link>)}
      </div>
    </section>

    <section className="manifesto section">
      <div className="section-label">Why we exist</div>
      <div><h2>Big problems need useful answers.</h2><p>We focus on needs people face right now: emergency access, disaster readiness, trusted local services, small-business education, mobility and staying connected. We use available technology—including drones and web platforms—only where it makes the solution more useful.</p></div>
    </section>

    <section className="section venture-section">
      <div className="section-heading"><div><div className="section-label">Projects in motion</div><h2>Different projects. One purpose.</h2></div><ArrowLink href="/ventures" secondary>View all projects</ArrowLink></div>
      <div className="venture-list">{[...ventures.slice(0,3), ventures.find(v => v.slug === "pipe-buyer")!].map(v => <article className="venture-row" key={v.slug}><span className="venture-number">{v.number}</span><div><span className="tag">{v.category}</span><h3>{v.name}</h3></div><p>{v.description}</p><Link href={v.href} target={v.external ? "_blank" : undefined} aria-label={`Explore ${v.name}`}>↗</Link></article>)}</div>
    </section>

    <section className="impact-band">
      <div className="section-label">How 366 improves daily life</div>
      <div className="arena-grid">{[["Relief","Drones, supplies and safer emergency response"],["Opportunity","Small-business education and independent income"],["Connection","Local services linked to a wider world"],["Mobility","Vehicles, parts, repairs and trusted commerce"],["Creativity","Mobile games and original entertainment"]].map(([a,b],i)=><div key={a}><span>0{i+1}</span><h3>{a}</h3><p>{b}</p></div>)}</div>
    </section>

    <section className="section future-preview">
      <div className="section-heading"><div><div className="section-label">Practical ideas to develop</div><h2>More ways to help communities thrive.</h2></div><p>These ideas begin with problems already visible today. Each one advances through community feedback, realistic budgets and small field tests.</p></div>
      <div className="idea-grid">{futureIdeas.slice(0,3).map((idea,i)=><article key={idea.title}><span>0{i+1} / {idea.tag}</span><h3>{idea.title}</h3><p>{idea.copy}</p></article>)}</div>
      <ArrowLink href="/future">Explore community opportunities</ArrowLink>
    </section>

    <section className="closing-cta"><div className="connection-map" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div><div className="section-label">Network the world together</div><h2>Local solutions become powerful when communities share what works.</h2><p>366 connects organizers, educators, businesses, builders, funders and everyday people across borders.</p><ArrowLink href="/about#partner">Join the 366 network</ArrowLink></section>
  </Shell>;
}
