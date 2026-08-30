import { notFound } from "next/navigation";
import { ArrowLink, PageHero, Shell } from "../../components";
import { projectDetails } from "../../site-data";

export function generateStaticParams(){ return projectDetails.map(p => ({ slug: p.slug })); }

export default async function VentureDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=projectDetails.find(p=>p.slug===slug);
  if(!project) notFound();
  const external=project.nextStep.startsWith("http");
  if(slug==="pipe-buyer") return <PipeBuyerPage />;
  return <Shell>
    <PageHero image={project.image} eyebrow={`${project.number} / ${project.category}`} title={project.name}><p>{project.headline}</p><div className="actions"><ArrowLink href={project.nextStep} external={external}>{external?"Visit live project":"Explore the work"}</ArrowLink><ArrowLink href="/ventures" secondary>All projects</ArrowLink></div></PageHero>
    <section className="section project-story"><div><div className="section-label">The project</div><h2>Built around a problem worth solving.</h2></div><p>{project.overview} {project.impact}</p></section>
    <section className="section project-pillars">{project.pillars.map((pillar,i)=><article key={pillar.title}><span>0{i+1}</span><h2>{pillar.title}</h2><p>{pillar.copy}</p></article>)}</section>
    <section className="closing-cta"><div className="section-label">Next move</div><h2>Help move {project.name} from ambition to evidence.</h2><ArrowLink href={project.nextStep} external={external}>{external?"Open the project":"Continue exploring"}</ArrowLink></section>
  </Shell>;
}

function PipeBuyerPage(){
  const liveFeatures=[
    ["01","Search focused inventory","Browse industrial pipe, tubulars, equipment and materials without fighting through a general classified site."],
    ["02","Post exactly what you need","Create Wanted Ads so yards, distributors and owners can bring matching inventory to you."],
    ["03","Compare ways to buy","Use marketplace listings, direct offers and timed auctions to find the right commercial path."],
    ["04","Talk in context","Keep buyer and seller conversations connected to the actual listing, offer or request."],
    ["05","Plan the move","Use Dispatch to publish trucking requirements, receive carrier quotes and manage the delivery workflow."],
    ["06","Buy with better signals","See structured product details, location controls, reporting tools and seller information designed for industrial trade."],
  ];
  const pipeData=["Outside diameter & wall","Grade & specification","Length & quantity","New, used or surplus","Location & availability","Documentation & condition"];
  const coming=[
    ["Smarter Wanted matching","Automatic, explainable matches between buyer requirements and newly listed supply, with alerts for both sides."],
    ["Stronger industrial search","Faster indexed filters, sorting, pagination and location-aware discovery across large inventories."],
    ["End-to-end Dispatch","Carrier review, quote revisions, awards, protected route details, delivery milestones and proof-of-delivery support."],
    ["Pipe confidence tools","Improved catalog coverage, weight calculations, source attribution, confidence levels and correction review."],
    ["Professional transaction records","Revision history, confirmations, cancellations, disputes and clearer commercial audit trails."],
    ["North American expansion","Future controlled marketplaces for industrial property, mineral and royalty interests, energy assets and businesses—activated only after licensing and legal approval."],
  ];
  return <Shell>
    <section className="pipe-hero">
      <div className="pipe-hero-shade" />
      <div className="pipe-hero-copy">
        <div className="pipe-status"><i/> Pipe-focused industrial marketplace</div>
        <div className="section-label">09 / Oil &amp; Gas Marketplace</div>
        <h1>Find the pipe.<br/><em>Make the deal.</em><br/>Move the load.</h1>
        <p className="pipe-lead">Pipe Buyer brings industrial pipe inventory, serious purchase demand and professional dispatch into one focused marketplace.</p>
        <div className="actions"><ArrowLink href="https://www.pipebuyer.com" external>Search pipe inventory</ArrowLink><ArrowLink href="https://www.pipebuyer.com" external secondary>Post a Wanted Ad</ArrowLink></div>
        <div className="pipe-audiences"><span>BUYERS</span><span>PIPE YARDS</span><span>DISTRIBUTORS</span><span>CONTRACTORS</span><span>CARRIERS</span></div>
      </div>
    </section>

    <section className="pipe-value section">
      <div><div className="section-label">Built for industrial sourcing</div><h2>Stop searching everywhere for inventory that may not exist.</h2></div>
      <div><p>General marketplaces bury critical specifications, mix industrial supply with unrelated equipment and leave transportation until after the deal. Pipe Buyer is being built around the way pipe is actually sourced: define the requirement, expose available supply, compare the commercial path, speak directly and arrange the move.</p><div className="pipe-proof"><b>One account.</b><span>Listings • Wanted Ads • Auctions • Offers • Messaging • Dispatch</span></div></div>
    </section>

    <section className="pipe-spec-band">
      <div><div className="section-label">A useful pipe listing starts with useful data</div><h2>Know what you are calling about.</h2></div>
      <div className="pipe-spec-grid">{pipeData.map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div>
    </section>

    <section className="section pipe-buyers">
      <div className="section-heading"><div><div className="section-label">For pipe buyers</div><h2>From requirement to delivery.</h2></div><p>Use a single marketplace journey to find available material, signal unmet demand and bring qualified sellers or carriers into the conversation.</p></div>
      <div className="pipe-feature-grid">{liveFeatures.map(([n,t,c])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
      <div className="actions pipe-actions"><ArrowLink href="https://www.pipebuyer.com" external>Start sourcing on Pipe Buyer</ArrowLink></div>
    </section>

    <section className="pipe-sides">
      <article><span>BUY</span><h2>Need pipe?</h2><p>Search active supply, publish a Wanted Ad, follow matching listings and open a direct conversation around the exact material you need.</p><ArrowLink href="https://www.pipebuyer.com" external>Find inventory</ArrowLink></article>
      <article><span>SELL</span><h2>Holding inventory?</h2><p>Put new, used and surplus pipe in front of focused industrial demand—with the specifications and location buyers need to act.</p><ArrowLink href="https://www.pipebuyer.com" external>List pipe for sale</ArrowLink></article>
      <article><span>MOVE</span><h2>Ready to haul?</h2><p>Connect the transaction to Dispatch, collect carrier quotes and build a clearer path from the yard to the destination.</p><ArrowLink href="https://www.pipebuyer.com" external>Explore Dispatch</ArrowLink></article>
    </section>

    <section className="section pipe-roadmap">
      <div className="section-heading"><div><div className="section-label">What is coming</div><h2>A marketplace growing into industrial infrastructure.</h2></div><p>These capabilities are documented in the Pipe Buyer engineering roadmap. They will be released through staged testing and safety gates—not marketed as live before they are ready.</p></div>
      <div className="pipe-roadmap-grid">{coming.map(([t,c],i)=><article key={t}><span>{String(i+1).padStart(2,"0")} / ROADMAP</span><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className="pipe-trust"><div><div className="section-label">Professional by design</div><h2>Built for deals where details matter.</h2></div><div className="pipe-trust-list"><p><b>Structured commercial records</b><span>Offers, revisions and activity stay tied to the transaction.</span></p><p><b>Protected information</b><span>Exact locations and sensitive details are designed for controlled access.</span></p><p><b>Trust and reporting</b><span>Verification, moderation and reporting workflows help protect marketplace quality.</span></p><p><b>Safety-gated expansion</b><span>Regulated property and energy transactions remain disabled until approvals exist.</span></p></div></section>

    <section className="closing-cta pipe-close"><div className="section-label">The shortest path to the right pipe starts here</div><h2>Source it. Sell it. Ship it.</h2><p>Join the focused marketplace connecting industrial supply with real Oil &amp; Gas demand.</p><div className="actions"><ArrowLink href="https://www.pipebuyer.com" external>Open Pipe Buyer</ArrowLink><ArrowLink href="https://www.pipebuyer.com" external secondary>Create your account</ArrowLink></div></section>
  </Shell>;
}
