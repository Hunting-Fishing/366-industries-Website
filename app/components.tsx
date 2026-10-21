"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Projects", "/ventures"],
    ["Water Hubs", "/water"],
    ["Grants & Infra", "/grants"],
    ["AI Designer", "/ai-designer"],
    ["Humanity", "/humanity"],
    ["Community", "/future"],
    ["Games", "/games"],
    ["About", "/about"],
  ];
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="366 Industries home"><span>366</span> INDUSTRIES</Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? "Close" : "Menu"}</button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <a className="nav-launch" href="https://designer.366industries.com">Launch AI Designer <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div><Link className="brand" href="/"><span>366</span> INDUSTRIES</Link><p>Building what humanity needs next — in partnership with 1st Defence Industries (BC, Canada), Ilocos Norte Operations (Philippines) &amp; Wyoming LLC (USA).</p></div>
      <div className="footer-links"><Link href="/ventures">Projects</Link><Link href="/water">Solar Water Hubs</Link><Link href="/grants">Grants &amp; Equipment</Link><Link href="/ventures/pipe-buyer">Pipe Buyer</Link><Link href="/ai-designer">366 AI Designer (400B+)</Link><Link href="/humanity">Humanity &amp; Drones</Link><Link href="/future">Community ideas</Link><Link href="/about">About &amp; Audit</Link></div>
      <div className="footer-motto">LEAP YEARS TAKE BREAKS.<br/><strong>WE DO NOT.</strong></div>
      <div className="footer-bottom"><span>Canada (BC) ↔ Philippines (Ilocos Norte) ↔ USA (Wyoming) ↔ The World</span><span>© {new Date().getFullYear()} 366 Industries &amp; 1st Defence Industries</span></div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) { return <><Header/><main>{children}</main><Footer/></>; }

export function ArrowLink({ href, children, secondary = false, external = false }: { href: string; children: ReactNode; secondary?: boolean; external?: boolean }) {
  return <Link className={secondary ? "button secondary" : "button"} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function PageHero({ eyebrow, title, children, image }: { eyebrow: string; title: string; children: ReactNode; image?: string }) {
  return <section className={`page-hero${image ? " page-hero-image" : ""}`} style={image ? {"--page-hero-image": `url('${image}')`} as React.CSSProperties : undefined}><div className="page-hero-copy"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><div className="page-intro">{children}</div></div></section>;
}
