import { notFound } from "next/navigation";
import { ArrowLink, PageHero, Shell } from "../../components";
import { humanityMissions } from "../../site-data";

export function generateStaticParams() {
  return humanityMissions.map((m) => ({ slug: m.slug }));
}

export default async function MissionDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = humanityMissions.find((m) => m.slug === slug);
  if (!mission) notFound();

  return (
    <Shell>
      <PageHero image={mission.image} eyebrow={mission.number} title={mission.title}>
        <p>{mission.copy}</p>
        <div className="actions">
          <ArrowLink href="/grants">Global Grant &amp; Audit Dossier</ArrowLink>
          <ArrowLink href="/humanity#campaigns" secondary>
            Support this mission
          </ArrowLink>
          <ArrowLink href="/humanity" secondary>
            All Humanitarian Missions
          </ArrowLink>
        </div>
      </PageHero>

      <section className="section project-story">
        <div>
          <div className="section-label">Mission outcome &amp; field protocol</div>
          <h2>Engineered to save lives in the real world.</h2>
        </div>
        <div>
          <p style={{ fontSize: "20px", lineHeight: 1.75, color: "var(--stone)" }}>
            {mission.outcome} Every deployment led by <strong>366 Industries</strong> and <strong>1st Defence Industries</strong> defines trained local operators, aviation/maritime permissions, safety boundaries, municipal partner responsibilities and measurable telemetry before launch.
          </p>
          {mission.specs && (
            <div className="pipe-spec-grid" style={{ marginTop: "32px", borderTop: "1px solid var(--rule)" }}>
              {mission.specs.map((spec, i) => (
                <span key={spec} style={{ borderColor: "var(--rule)" }}>
                  <b style={{ color: "var(--orange)" }}>0{i + 1}</b>
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="impact-band">
        <div className="section-label">Operating &amp; Grant Compliance Rules</div>
        <div className="arena-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div>
            <span>01</span>
            <h3>Local Responders</h3>
            <p>Operate alongside coastal lifeguards, barangay councils, coast guards and municipal DRRM teams.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Safety &amp; Aviation</h3>
            <p>Strict CAAP / Transport Canada / FAA flight envelopes, non-lethal wildlife protocols and fail-safe return-to-home.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Open Telemetry</h3>
            <p>Log flight hours, predator detections, rescue drops and liters dispensed for grant auditors.</p>
          </div>
          <div>
            <span>04</span>
            <h3>Self-Sustaining</h3>
            <p>Combine website revenue allocations, grants and local maintenance reserves for long-term operation.</p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
