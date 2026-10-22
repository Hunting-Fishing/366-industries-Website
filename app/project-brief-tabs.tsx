"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { projectBriefs, type BriefId } from "./project-brief-data";

export function ProjectBriefTabs({ project }: { project: BriefId }) {
  const brief = projectBriefs[project];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = brief.panels[active];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % brief.panels.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + brief.panels.length) % brief.panels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = brief.panels.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="project-brief" className="project-brief section" aria-labelledby={`project-brief-heading-${project}`}>
      <div className="project-brief-header">
        <div>
          <div className="section-label">Investor &amp; grant partner briefing / Global humanitarian efforts for safety</div>
          <h2 id={`project-brief-heading-${project}`}>Explore the project. Examine the plan.</h2>
          <p>{brief.summary}</p>
          <div className="brief-tags">
            <span>{brief.eyebrow}</span>
            <span>{brief.grantFocus}</span>
          </div>
        </div>
        <div className="project-brief-image" style={{ backgroundImage: `url("${brief.image}")` }} role="img" aria-label={`Illustration of ${brief.title}`} />
      </div>

      <div className="project-brief-status" role="note">
        <strong>Current stage:</strong> {brief.status}
        <span>Project briefs describe intended work and required evidence, not completed deployments or promised returns.</span>
      </div>

      <div className="brief-tablist" role="tablist" aria-label={`${brief.title} briefing sections`}>
        {brief.panels.map((panel, index) => (
          <button
            key={panel.id}
            type="button"
            role="tab"
            id={`brief-${project}-tab-${panel.id}`}
            aria-selected={active === index}
            aria-controls={`brief-${project}-panel-${panel.id}`}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => { tabRefs.current[index] = element; }}
            onClick={() => setActive(index)}
            onKeyDown={(e) => onTabKeyDown(e, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {panel.label}
          </button>
        ))}
      </div>

      {brief.panels.map((panel, index) => (
        <div
          key={panel.id}
          id={`brief-${project}-panel-${panel.id}`}
          role="tabpanel"
          aria-labelledby={`brief-${project}-tab-${panel.id}`}
          tabIndex={0}
          className="brief-panel"
          hidden={index !== active}
        >
          <div className="brief-panel-heading">
            <div>
              <div className="section-label">{brief.eyebrow} / {panel.label}</div>
              <h3>{panel.title}</h3>
            </div>
            <p>{panel.intro}</p>
          </div>
          <div className="brief-item-grid">
            {panel.items.map((item, i) => (
              <article className="brief-item" key={item.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      ))}

      <div className="project-brief-cta">
        <div>
          <strong>Review the funding case or request a technical discussion.</strong>
          <p>Grant applications and investment discussions require project-specific budgets, approvals, verified evidence and appropriate legal documentation.</p>
        </div>
        <div className="actions">
          <Link href="/grants#capital-budget" className="button">View Funding &amp; Grant Dossier <span aria-hidden="true">↗</span></Link>
          <Link href="/about#partner" className="button secondary">Discuss a Partnership <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
