import { notFound } from "next/navigation";
import { ArrowLink, PageHero, Shell } from "../../components";
import { humanityMissions } from "../../site-data";

export function generateStaticParams(){ return humanityMissions.map(m => ({ slug: m.slug })); }

export default async function MissionDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const mission=humanityMissions.find(m=>m.slug===slug);
  if(!mission) notFound();
  return <Shell><PageHero image={mission.image} eyebrow={mission.number} title={mission.title}><p>{mission.copy}</p><div className="actions"><ArrowLink href="/humanity#campaigns">Support the missions</ArrowLink><ArrowLink href="/humanity" secondary>Back to Humanity</ArrowLink></div></PageHero>
  <section className="section project-story"><div><div className="section-label">Intended result</div><h2>A visible outcome—not a technology demonstration.</h2></div><p>{mission.outcome} Each pilot must define trained operators, permissions, safety limits, partner responsibilities and measurable results before deployment.</p></section>
  <section className="impact-band"><div className="section-label">Operating rules</div><div className="arena-grid"><div><span>01</span><h3>Local partners</h3><p>Work with communities and qualified responders.</p></div><div><span>02</span><h3>Safety first</h3><p>Set clear aviation, wildlife and emergency boundaries.</p></div><div><span>03</span><h3>Measure</h3><p>Publish useful pilot outcomes and lessons.</p></div><div><span>04</span><h3>Maintain</h3><p>Plan for training, repairs and operating costs.</p></div></div></section></Shell>;
}
