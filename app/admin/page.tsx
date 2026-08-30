import Link from "next/link";
import { AdminLoginForm } from "./login-form";
import { isAdminAuthenticated } from "./auth";

export const metadata = {
  title: "Admin Portal",
  robots: { index: false, follow: false },
};

const campaigns = [
  {
    name: "WildGuard Drone Network",
    href: "https://www.gofundme.com/f/wildguard-drone-network",
    focus: "Drone rescue, wildlife monitoring and disaster response",
  },
  {
    name: "Clean Water 4 All",
    href: "https://www.gofundme.com/f/clean-water-4-all-j2tyh",
    focus: "Practical access to safer water for communities",
  },
];

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="admin-shell">
        <section className="admin-login-card">
          <Link className="brand" href="/" aria-label="Return to 366 Industries">
            <span>366</span> INDUSTRIES
          </Link>
          <div className="section-label">Private administration</div>
          <h1>Admin portal</h1>
          <p>This area is separate from the public website. Enter the private access password to continue.</p>
          <AdminLoginForm />
          <Link className="admin-back" href="/">← Return to public website</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar">
        <Link className="brand" href="/"><span>366</span> INDUSTRIES</Link>
        <form action="/api/admin/logout" method="post">
          <button type="submit">Sign out</button>
        </form>
      </header>
      <section className="admin-heading">
        <div>
          <div className="section-label">Private administration</div>
          <h1>366 control room</h1>
          <p>Quick access to the live website, public campaigns and the next operational tasks.</p>
        </div>
        <span className="admin-status">Secure session active</span>
      </section>
      <section className="admin-grid">
        <article className="admin-panel">
          <span>01 / WEBSITE</span>
          <h2>Public pages</h2>
          <div className="admin-links">
            <Link href="/" target="_blank">Homepage ↗</Link>
            <Link href="/humanity" target="_blank">Humanity ↗</Link>
            <Link href="/ventures" target="_blank">Projects ↗</Link>
            <Link href="/future" target="_blank">Community ideas ↗</Link>
            <Link href="/games" target="_blank">Games portfolio ↗</Link>
            <Link href="/ai-designer" target="_blank">366 AI Designer ↗</Link>
          </div>
        </article>
        <article className="admin-panel">
          <span>02 / FUNDRAISING</span>
          <h2>Live campaigns</h2>
          {campaigns.map((campaign) => (
            <Link className="admin-campaign" href={campaign.href} target="_blank" rel="noreferrer" key={campaign.href}>
              <strong>{campaign.name}</strong>
              <small>{campaign.focus}</small>
              <b>Open GoFundMe ↗</b>
            </Link>
          ))}
        </article>
        <article className="admin-panel admin-wide">
          <span>03 / CARRINGTON PROTOCOL KICKSTARTER</span>
          <h2>Board game campaign plan</h2>
          <div className="kickstarter-grid">
            <div><b>Promise</b><p>A cooperative tabletop game where players prepare for an extreme solar storm, repair cascading infrastructure failures and keep communities connected.</p></div>
            <div><b>Core box</b><p>Foldable regional map, crisis and equipment cards, specialist role boards, system tracks, route and repair tokens, dice, reference sheets and a scenario book.</p></div>
            <div><b>Proof before launch</b><p>Print-and-play prototype, photographed playthrough, final component list, blind-playtest feedback, manufacturing quotes and a realistic freight calendar.</p></div>
            <div><b>Audience</b><p>Cooperative strategy players, preparedness communities, educators, families, repair-minded players and fans of high-stakes disaster management.</p></div>
            <div><b>Reward ladder</b><p>Print-and-play; core game; Kickstarter edition; deluxe component pack; classroom/community bundle; retailer case. Avoid fulfillment-heavy novelty rewards.</p></div>
            <div><b>Campaign rhythm</b><p>Prototype → 50+ blind tests → prelaunch community → 30-day campaign → manufacturing proof → freight updates → fulfillment → expansion scenarios.</p></div>
          </div>
        </article>
        <article className="admin-panel">
          <span>04 / CARRINGTON PROTOCOL RULES</span>
          <h2>Core rules</h2>
          <ul className="admin-rule-list"><li>Players win or lose as one response team.</li><li>Every round advances the solar-storm timeline.</li><li>Power, water, communications, mobility and trust affect one another.</li><li>Repairs require the correct skills, tools, routes and resources.</li><li>Unresolved failures cascade into neighboring systems.</li><li>Each scenario ends with a clear recovery objective and debrief.</li></ul>
        </article>
        <article className="admin-panel">
          <span>05 / PRODUCTION</span>
          <h2>First tabletop prototype</h2>
          <div className="admin-links"><Link href="/games/carrington-protocol" target="_blank">Review Carrington Protocol page ↗</Link><span>Scenario 01: The First 72 Hours</span><span>Players: 1–5 cooperative</span><span>Target playtime: 60–90 minutes</span><span>Prototype: cards, paper map and standard tokens</span></div>
        </article>
        <article className="admin-panel admin-wide">
          <span>06 / WORLD FIX DIGITAL GAME</span>
          <h2>Digital production plan</h2>
          <div className="kickstarter-grid">
            <div><b>First chapter</b><p>Clean Water: route, build and balance a practical water system until the community can operate it sustainably.</p></div>
            <div><b>Lean target</b><p>One mobile-first vertical slice with a reusable map, mission and progression system for future purpose-led games.</p></div>
            <div><b>Non-negotiables</b><p>Visible before-and-after results, plausible solutions, respectful communities, no pay-to-win and no predatory timers.</p></div>
          </div>
        </article>
        <article className="admin-panel admin-wide">
          <span>07 / 366 AI DESIGNER</span>
          <h2>Builder integration</h2>
          <div className="kickstarter-grid">
            <div><b>Public product page</b><p>The marketing, capability and trust page lives at /ai-designer and remains open to every visitor.</p></div>
            <div><b>Application destination</b><p>Connect the finished builder to designer.366industries.com, then change the public launch control from “in development” to “Launch AI Designer.”</p></div>
            <div><b>Authentication boundary</b><p>Builder accounts, projects and billing belong inside the application. The main 366 website remains public and does not require a ChatGPT account.</p></div>
            <div><b>Handoff contract</b><p>The builder should provide a production URL, sign-in method, status endpoint, logo assets and support contact before the public launch control is activated.</p></div>
          </div>
        </article>
        <article className="admin-panel admin-wide">
          <span>08 / NEXT TASKS</span>
          <h2>Launch checklist</h2>
          <ul className="admin-checklist">
            <li><b>Complete:</b> Public website and custom domains</li>
            <li><b>Complete:</b> GoFundMe campaign links</li>
            <li><b>Next:</b> Replace the temporary admin password</li>
            <li><b>Next:</b> Add official contact email and social accounts</li>
            <li><b>Next:</b> Add campaign updates, budgets and public impact reporting</li>
            <li><b>Next:</b> Produce and blind-test the Carrington Protocol print-and-play prototype</li>
            <li><b>Next:</b> Produce the World Fix vertical-slice gameplay prototype</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
