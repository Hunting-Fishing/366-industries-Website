"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    function syncAuth() {
      try {
        const raw = localStorage.getItem("366_member_session");
        if (raw) {
          const parsed = JSON.parse(raw) as {
            name?: string;
            email?: string;
            role?: string;
          };
          setMemberName(parsed.name || "Member");
          setIsAdminUser(
            parsed.role === "admin" ||
              parsed.email?.trim().toLowerCase() === "jordilwbailey@gmail.com"
          );
        } else {
          setMemberName(null);
          setIsAdminUser(false);
        }
      } catch {
        setMemberName(null);
        setIsAdminUser(false);
      }
    }
    syncAuth();
    window.addEventListener("366-auth-changed", syncAuth);
    return () => window.removeEventListener("366-auth-changed", syncAuth);
  }, []);

  const links: [string, string, string?][] = [
    ["Clean Water", "/water", "WASH"],
    ["Coastal Drones & Rescue", "/humanity", "WILDGUARD"],
    ["Donate", "/donate", "GIVE ❤"],
    ["Global Grants", "/grants", "DOSSIER"],
    ["366 AI Program", "/ai-designer", "AI"],
    ["Ventures", "/ventures"],
    ["Games", "/games"],
    ["About", "/about"],
  ];

  return (
    <div className="header-wrapper">
      <div className="top-utility-bar">
        <div className="top-utility-left">
          <span className="pulse-dot" aria-hidden="true" />
          <strong>HUMANITARIAN &amp; CLEAN-TECH INFRASTRUCTURE:</strong>
          <span>Global Humanitarian Efforts for Safety • Clean Water • Coastal Protection • Disaster Readiness</span>
        </div>
        <div className="top-utility-right">
          <Link href="/donate" className="utility-pill highlight">
            ❤ Donate to Clean Water &amp; Drones
          </Link>
          <Link href="/grants" className="utility-pill">
            Global Grant Dossier ↗
          </Link>
          {memberName ? (
            <Link href="/login" className="utility-pill auth-pill">
              ● {memberName} (Account)
            </Link>
          ) : (
            <>
              <Link href="/login" className="utility-pill auth-pill">
                Log In
              </Link>
              <Link href="/signup" className="utility-pill auth-pill-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="366 Industries home">
          <span>366</span>
          <div className="brand-text">
            <strong>INDUSTRIES</strong>
            <small>&amp; 1ST DEFENCE INDUSTRIES</small>
          </div>
        </Link>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? "✕ Close" : "☰ Menu"}
        </button>

        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {links.map(([label, href, badge]) => {
            const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={isActive ? "nav-link active" : "nav-link"}
                onClick={() => setOpen(false)}
              >
                {badge && <small className="nav-badge">{badge}</small>}
                <span>{label}</span>
              </Link>
            );
          })}
          <div className="nav-auth-group">
            {isAdminUser && (
              <Link
                href="/admin"
                className="nav-auth-btn signup"
                onClick={() => setOpen(false)}
              >
                ★ Admin Control
              </Link>
            )}
            <Link
              href="/login"
              className="nav-auth-btn"
              onClick={() => setOpen(false)}
            >
              {memberName ? "My Portal" : "Log In"}
            </Link>
            {!memberName && (
              <Link
                href="/signup"
                className="nav-auth-btn signup"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            )}
            <a
              className="nav-launch"
              href="https://designer.366industries.com"
              target="_blank"
              rel="noreferrer"
            >
              Launch AI Designer <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-charter-banner">
        <div className="footer-charter-badge">HUMANITARIAN REVENUE, DONATIONS &amp; GRANT CHARTER</div>
        <p>
          <strong>Platform Funds &amp; Donor Contributions Dedicated to Global Impact:</strong> Revenues generated across 366 Industries’ commercial platforms, software (<strong>366 AI Designer</strong>), marketplaces and purpose-led games are paired with public donations and international grants to fund off-grid <strong>Solar Borehole Clean Water Hubs</strong>, our <strong>Coastal Shark &amp; Crocodile Drone Protection Network</strong>, and <strong>Rapid Disaster Search-and-Rescue Operations</strong> worldwide.
        </p>
        <div className="footer-charter-actions">
          <Link href="/donate" className="charter-btn">
            ❤ Donate Now ↗
          </Link>
          <Link href="/grants" className="charter-btn secondary">
            Global Grant Dossier ↗
          </Link>
          <Link href="/signup" className="charter-btn secondary">
            Create 366 Account ↗
          </Link>
        </div>
      </div>

      <div className="footer-grid">
        <div className="footer-col-brand">
          <Link className="brand" href="/">
            <span>366</span>
            <div className="brand-text">
              <strong>INDUSTRIES</strong>
              <small>&amp; 1ST DEFENCE INDUSTRIES</small>
            </div>
          </Link>
          <p>
            Developing practical clean-water infrastructure, coastal safety technology, disaster preparedness and responsible AI solutions for communities worldwide.
          </p>
          <div className="footer-motto">
            LEAP YEARS TAKE BREAKS.<br />
            <strong>WE DO NOT.</strong>
          </div>
        </div>

        <div className="footer-col">
          <h4>01 / Humanitarian &amp; Donations</h4>
          <div className="footer-links-col">
            <Link href="/donate">Donate to Humanitarian Missions ❤</Link>
            <Link href="/water">Global Clean Water &amp; Solar Boreholes</Link>
            <Link href="/humanity">WildGuard Drone Protection Network</Link>
            <Link href="/humanity/coastal-safety">Shark &amp; Crocodile Coastal Safety</Link>
            <Link href="/humanity/disaster-response-drones">Disaster Search &amp; Rescue UAVs</Link>
            <Link href="/humanity/community-resilience">Outage-Resilient Community Hubs</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>02 / Global Grants &amp; AI Program</h4>
          <div className="footer-links-col">
            <Link href="/grants">Global Grant Candidate Dossier</Link>
            <Link href="/grants#grant-programs">International Grant Matching Matrix</Link>
            <Link href="/grants#capital-budget">$385K Capital &amp; Equipment Stack</Link>
            <Link href="/ai-designer">366 AI Designer Program</Link>
            <Link href="/ai-designer#sovereign-compute">400B+ Sovereign AI Compute Core</Link>
            <Link href="/about">Governance &amp; Partner Information</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>03 / Accounts &amp; Ventures</h4>
          <div className="footer-links-col">
            <Link href="/login">Member &amp; Donor Log In</Link>
            <Link href="/signup">Create a 366 Account (Sign Up)</Link>
            <Link href="/ventures">All Separated Ventures</Link>
            <Link href="/ventures/pipe-buyer">Pipe Buyer Marketplace</Link>
            <Link href="/games">366 Purpose-Led Games</Link>
            <Link href="/future">Community Innovation Pipeline</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Global Humanitarian Efforts for Safety • Local Partnerships • Measurable Impact</span>
        <span>© {new Date().getFullYear()} 366 Industries &amp; 1st Defence Industries • Humanitarian Funding &amp; Grant Transparency</span>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function ArrowLink({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <Link
      className={secondary ? "button secondary" : "button"}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  image?: string;
}) {
  return (
    <section
      className={`page-hero${image ? " page-hero-image" : ""}`}
      style={
        image
          ? ({ "--page-hero-image": `url('${image}')` } as React.CSSProperties)
          : undefined
      }
    >
      <div className="page-hero-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <div className="page-intro">{children}</div>
      </div>
    </section>
  );
}
