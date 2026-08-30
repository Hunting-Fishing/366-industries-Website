import { notFound } from "next/navigation";
import { ArrowLink, Shell } from "../../components";
import { games } from "../game-data";
export function generateStaticParams(){return games.map(({slug})=>({slug}));}
export default async function GamePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const game=games.find(g=>g.slug===slug);if(!game)notFound();return <Shell>
  <section className="game-detail-hero" style={{"--game-color":game.color,backgroundImage:`linear-gradient(90deg,rgba(7,16,20,.96),rgba(7,16,20,.42)),url('${game.image}')`} as React.CSSProperties}><div><span>{game.label}</span><h1>{game.title}</h1><h2>{game.tagline}</h2><p>{game.summary}</p><ArrowLink href="#how-it-plays">See how it plays</ArrowLink></div></section>
  <section className="section game-mission"><div className="section-label">Why this game exists</div><h2>{game.mission}</h2></section>
  <section className="section game-detail-grid" id="how-it-plays"><div><div className="section-label">Core game loop</div><ol>{game.loop.map((x,i)=><li key={x}><span>0{i+1}</span>{x}</li>)}</ol></div><div><div className="section-label">Results players can see</div><div className="outcome-grid">{game.outcomes.map(x=><strong key={x}>{x}<i>✓</i></strong>)}</div></div></section>
  <section className="impact-band game-public-rules"><div className="section-label">Rules of the world</div><h2>How {game.title} earns trust.</h2><div className="rule-cards">{game.rules.map((x,i)=><article key={x}><span>0{i+1}</span><p>{x}</p></article>)}</div></section>
  <section className="section next-game"><ArrowLink href="/games" secondary>Back to all games</ArrowLink><ArrowLink href="/about#partner">Partner with 366 Games</ArrowLink></section>
</Shell>}
