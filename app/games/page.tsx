import Link from "next/link";
import { ArrowLink, PageHero, Shell } from "../components";
import { games } from "./game-data";
export const metadata = { title: "Games | 366 Industries", description: "Purpose-led tabletop and digital games about preparedness, fixing problems, rescuing people and building stronger communities." };
export default function GamesPage(){return <Shell>
  <PageHero image="/assets/carrington-protocol-hero.png" eyebrow="366 Games" title="Play with purpose."><p>Tabletop and digital games with strong visual results. Every title gets its own world, rules and reason to exist—built to be affordable to produce, fun to replay and capable of growing a loyal community.</p></PageHero>
  <section className="section games-intro"><div className="section-label">The 366 game rule</div><h2>Show the change.<br/><em>Make it playable.</em></h2><p>Players should never have to read a manifesto to understand the impact. They see the flood recede, the water run clean, the rescue arrive and the business come alive.</p></section>
  <section className="game-catalog">{games.map((game, i)=><article className="game-card" key={game.slug} style={{"--game-color":game.color} as React.CSSProperties}>
    <Link className="game-card-image" href={`/games/${game.slug}`} style={{backgroundImage:`linear-gradient(0deg,rgba(7,16,20,.82),transparent 70%),url('${game.image}')`}} aria-label={`Open ${game.title}`}/>
    <div className="game-card-copy"><span>0{i+1} / {game.label}</span><h2>{game.title}</h2><h3>{game.tagline}</h3><p>{game.summary}</p><ArrowLink href={`/games/${game.slug}`}>Enter the game</ArrowLink></div>
  </article>)}</section>
  <section className="section game-principles"><div><div className="section-label">Designed to launch lean</div><h2>Small first. Expand from proof.</h2></div><div className="principles">{[["01","Mobile first","One core mechanic and short sessions."],["02","Reusable systems","Shared maps, missions and progression reduce cost."],["03","Visible outcomes","Every action changes the scene or result." ]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>
  <section className="closing-cta"><div className="section-label">Publishing & crowdfunding</div><h2>Help turn practical ideas into games people remember.</h2><p>Carrington Protocol is our flagship physical board game for crowdfunding, while World Fix leads a connected digital portfolio built around visible, hopeful change.</p><ArrowLink href="/about#partner">Build it with us</ArrowLink></section>
</Shell>}
