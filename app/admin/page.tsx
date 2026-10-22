import Link from "next/link";
import { AdminUsersControl } from "./admin-users-client";
import { getAuthenticatedAdminEmail } from "./auth";
import { AdminLoginForm } from "./login-form";
import { supabaseListDonations, supabaseListUsers } from "../lib/supabase";

export const metadata = {
  title: "Admin & Users Control Room | 366 Industries & 1st Defence Industries",
  robots: { index: false, follow: false },
};

const campaigns = [
  {
    name: "Solar Borehole & Smart Water Hubs (Ilocos Norte & Global)",
    href: "/water",
    focus:
      "Off-grid solar borehole drilling, filtration, IoT water flow sensors, smart prepaid water dispensers & rural farming irrigation",
  },
  {
    name: "WildGuard Coastal Shark/Crocodile & Disaster Drone Network",
    href: "https://www.gofundme.com/f/wildguard-drone-network",
    focus:
      "Coastal shark & crocodile aerial overwatch, disaster search-and-rescue, medical drops & GPS inflatable rescue rafts",
  },
  {
    name: "Clean Water 4 All Campaign",
    href: "https://www.gofundme.com/f/clean-water-4-all-j2tyh",
    focus: "Practical access to safer drinking water for underserved communities",
  },
];

export default async function AdminPage() {
  const adminEmail = await getAuthenticatedAdminEmail();

  if (!adminEmail) {
    return (
      <main className="admin-shell">
        <section className="admin-login-card">
          <Link className="brand" href="/" aria-label="Return to 366 Industries">
            <span>366</span> INDUSTRIES
          </Link>
          <div className="section-label">
            Root Admin: Jordilwbailey@gmail.com • Users &amp; Platform Control
          </div>
          <h1>Admin portal</h1>
          <p>
            Sign in with your administrator account (<strong>Jordilwbailey@gmail.com</strong>) to manage users, roles, humanitarian donations and platform operations.
          </p>
          <AdminLoginForm />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "14px",
              fontSize: "13px",
            }}
          >
            <Link className="admin-back" href="/">
              ← Return to public website
            </Link>
            <Link className="admin-back" href="/login">
              Member &amp; Donor Login →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const [usersResult, donationsResult] = await Promise.all([
    supabaseListUsers(),
    supabaseListDonations(),
  ]);

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar">
        <Link className="brand" href="/">
          <span>366</span> INDUSTRIES • ADMIN CONTROL
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span className="utility-pill highlight">
            ★ Signed in: {adminEmail}
          </span>
          <form action="/api/admin/logout" method="post">
            <button type="submit">Sign out</button>
          </form>
        </div>
      </header>
      <section className="admin-heading">
        <div>
          <div className="section-label">
            Executive Administration • Jordilwbailey@gmail.com
          </div>
          <h1>366 &amp; 1st Defence Control Room</h1>
          <p>
            Full control over registered users, administrator roles, humanitarian donation pledges, grant dossiers and live website routes.
          </p>
        </div>
        <span className="admin-status">Root Admin Session Active</span>
      </section>

      <section className="admin-grid">
        {/* INTERACTIVE USERS & DONATIONS CONTROL */}
        <AdminUsersControl
          initialUsers={usersResult.users}
          initialDonations={donationsResult.donations}
          supabaseSyncedInitial={usersResult.synced}
        />

        <article className="admin-panel">
          <span>03 / LIVE WEBSITE ROUTES</span>
          <h2>Public &amp; Portal Pages</h2>
          <div className="admin-links">
            <Link href="/" target="_blank">
              Homepage (/) ↗
            </Link>
            <Link href="/donate" target="_blank">
              Donations &amp; Sponsorship Portal (/donate) ↗
            </Link>
            <Link href="/login" target="_blank">
              Member &amp; Admin Login (/login) ↗
            </Link>
            <Link href="/signup" target="_blank">
              Account Registration (/signup) ↗
            </Link>
            <Link href="/water" target="_blank">
              Solar Borehole &amp; Smart Water Hubs (/water) ↗
            </Link>
            <Link href="/humanity" target="_blank">
              Coastal Shark/Crocodile &amp; Rescue Drones (/humanity) ↗
            </Link>
            <Link href="/grants" target="_blank">
              Global Grant &amp; $385K Capital Dossier (/grants) ↗
            </Link>
            <Link href="/ai-designer" target="_blank">
              366 AI Designer &amp; 400B+ Compute (/ai-designer) ↗
            </Link>
            <Link href="/ventures" target="_blank">
              Separated Ventures Portfolio (/ventures) ↗
            </Link>
          </div>
        </article>

        <article className="admin-panel">
          <span>04 / FUNDRAISING &amp; GRANTS</span>
          <h2>Live Campaigns</h2>
          {campaigns.map((campaign) => (
            <Link
              className="admin-campaign"
              href={campaign.href}
              target="_blank"
              rel="noreferrer"
              key={campaign.href}
            >
              <strong>{campaign.name}</strong>
              <small>{campaign.focus}</small>
              <b>Open Campaign / Dossier ↗</b>
            </Link>
          ))}
        </article>
      </section>
    </main>
  );
}
