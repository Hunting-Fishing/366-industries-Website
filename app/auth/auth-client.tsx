"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MemberSession } from "../api/auth/session/route";

const ACCOUNT_TYPES = [
  "Humanitarian Supporter & Donor (Clean Water & Coastal Drones)",
  "366 AI Designer Builder & Founder",
  "Institutional Grant Officer / Audit Partner",
  "Coastal Municipality / Barangay Partner",
  "Commercial Marketplace Member (Pipe Buyer / 365 Motor Sales)",
];

const REGIONS = [
  "Philippines (Ilocos Norte / Nationwide)",
  "Canada (British Columbia / Nationwide)",
  "United States (Wyoming / Nationwide)",
  "Australia & Indo-Pacific",
  "Europe / United Kingdom",
  "Global / Other Region",
];

export function AuthPortal({ initialMode }: { initialMode: "login" | "signup" }) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState(ACCOUNT_TYPES[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [updatesOptIn, setUpdatesOptIn] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<MemberSession | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("366_member_session");
      if (saved) {
        setUser(JSON.parse(saved) as MemberSession);
      }
    } catch {
      // ignore storage errors
    }

    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data: { authenticated?: boolean; user?: MemberSession | null }) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          try {
            localStorage.setItem("366_member_session", JSON.stringify(data.user));
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match. Please verify your password.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name,
          email,
          password,
          accountType,
          region,
          updatesOptIn,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        user?: MemberSession;
      };
      if (!res.ok || !data.ok || !data.user) {
        setError(data.message ?? "Unable to authenticate. Please check your details.");
        setBusy(false);
        return;
      }

      setUser(data.user);
      try {
        localStorage.setItem("366_member_session", JSON.stringify(data.user));
        window.dispatchEvent(new Event("366-auth-changed"));
      } catch {
        // ignore
      }
      setBusy(false);
    } catch {
      setError("Network error while signing in. Please try again.");
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => {});
    try {
      localStorage.removeItem("366_member_session");
      window.dispatchEvent(new Event("366-auth-changed"));
    } catch {
      // ignore
    }
    setUser(null);
    setPassword("");
    setConfirmPassword("");
  }

  if (user) {
    const isAdmin =
      user.role === "admin" ||
      user.email.trim().toLowerCase() === "jordilwbailey@gmail.com";

    return (
      <section className="section auth-section">
        <div className="member-dashboard-card">
          <div className="member-dashboard-header">
            <div>
              <span className="pledge-pill">
                {isAdmin
                  ? "★ ROOT SUPER ADMIN SESSION ACTIVE (JORDILWBAILEY@GMAIL.COM)"
                  : "AUTHENTICATED 366 ACCOUNT ACTIVE"}
              </span>
              <h2>Welcome, {user.name}</h2>
              <p>
                Signed in as <strong>{user.email}</strong> • Role:{" "}
                <strong>{isAdmin ? "SUPER ADMIN" : user.accountType}</strong> •
                Region: <strong>{user.region}</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {isAdmin && (
                <Link href="/admin" className="button">
                  ★ Open Admin &amp; Users Control Room <span>↗</span>
                </Link>
              )}
              <button
                type="button"
                className="button secondary"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="member-portal-grid">
            {isAdmin && (
              <article
                className="member-portal-tile"
                style={{
                  gridColumn: "1 / -1",
                  borderColor: "var(--orange)",
                  background:
                    "linear-gradient(135deg, rgba(249, 115, 22, 0.16), rgba(14, 30, 48, 0.9))",
                }}
              >
                <span>00 / ROOT SUPER ADMIN CONTROL (JORDILWBAILEY@GMAIL.COM)</span>
                <h3>Admin &amp; Users Control Room</h3>
                <p>
                  Manage all registered website users, promote/demote administrators, suspend accounts, and inspect the live Supabase Humanitarian Donations &amp; Pledges ledger.
                </p>
                <Link href="/admin" className="button">
                  Enter Admin &amp; Users Control Room (/admin) <span>→</span>
                </Link>
              </article>
            )}
            <article className="member-portal-tile">
              <span>01 / HUMANITARIAN &amp; DONATIONS</span>
              <h3>Support Clean Water &amp; Coastal Drones</h3>
              <p>
                Make a ring-fenced donation toward our Solar Borehole Clean Water Hubs, Shark &amp; Crocodile Coastal Drone Network, or Typhoon Disaster Rescue Fleet.
              </p>
              <Link href="/donate" className="button">
                Open Donor &amp; Sponsorship Portal <span>↗</span>
              </Link>
            </article>

            <article className="member-portal-tile">
              <span>02 / 366 AI PROGRAM</span>
              <h3>366 AI Designer Workspace</h3>
              <p>
                Launch the 366 AI Designer builder to create, edit and deploy websites and web applications powered by our sovereign 400B+ AI roadmap.
              </p>
              <a
                href="https://designer.366industries.com"
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                Launch 366 AI Designer <span>↗</span>
              </a>
            </article>

            <article className="member-portal-tile">
              <span>03 / INSTITUTIONAL GRANT DOSSIER</span>
              <h3>Global Grant &amp; $385K Capital Stack</h3>
              <p>
                Review our UN SDG alignment, 6-stream global grant matching matrix, and itemized $385,000 USD capital equipment budget.
              </p>
              <Link href="/grants" className="button secondary">
                Open Grant &amp; Audit Dossier <span>↗</span>
              </Link>
            </article>

            <article className="member-portal-tile">
              <span>04 / FIELD TELEMETRY &amp; DIVISIONS</span>
              <h3>Water Hubs, Drones &amp; Ventures</h3>
              <p>
                Explore our Solar Borehole Water Hubs in Ilocos Norte, WildGuard Coastal Drone safety protocols, and commercial marketplaces.
              </p>
              <Link href="/water" className="button secondary">
                Explore Solar Water Hubs <span>↗</span>
              </Link>
            </article>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section auth-section">
      <div className="auth-layout-grid">
        {/* LEFT COLUMN: WHY CREATE / SIGN IN TO A 366 ACCOUNT */}
        <div className="auth-info-column">
          <div className="section-label">
            366 Industries &amp; 1st Defence Industries • Unified Account Portal
          </div>
          <h1>
            {mode === "login"
              ? "Sign in to your 366 account."
              : "Create your 366 account."}
          </h1>
          <p className="auth-lead">
            One unified portal connecting humanitarian donors, <strong>366 AI Designer</strong> builders, institutional grant auditors and community partners across Canada, the Philippines, the United States and globally.
          </p>

          <div className="auth-benefit-list">
            <div className="auth-benefit-item">
              <span>01 / HUMANITARIAN DONOR &amp; TELEMETRY ACCESS</span>
              <h4>Track Clean Water &amp; Coastal Drone Impact</h4>
              <p>
                Manage your donations, generate official contribution pledge references, and follow field deployments across our Solar Borehole Water Hubs and Shark &amp; Crocodile Coastal Drone Network.
              </p>
            </div>
            <div className="auth-benefit-item">
              <span>02 / 366 AI DESIGNER PROGRAM</span>
              <h4>Build Websites &amp; Apps with AI</h4>
              <p>
                Move seamlessly into our guided AI software creation workspace at{" "}
                <strong>designer.366industries.com</strong> backed by our 400B+ Sovereign AI compute roadmap.
              </p>
            </div>
            <div className="auth-benefit-item">
              <span>03 / INSTITUTIONAL GRANT &amp; PARTNER DESK</span>
              <h4>Access Full Audit &amp; Engineering Dossiers</h4>
              <p>
                Review itemized budgets, UN SDG compliance and tri-national verification for Global WASH, Coastal Safety, Disaster Relief and R&amp;D grants.
              </p>
            </div>
          </div>

          <div className="auth-quick-links">
            <Link href="/donate" className="utility-pill highlight">
              Make a Direct Donation ↗
            </Link>
            <Link href="/grants" className="utility-pill">
              Global Grant Dossier ↗
            </Link>
            <Link href="/admin" className="utility-pill">
              Staff Admin Control Room ↗
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE LOGIN / SIGNUP CARD */}
        <div className="auth-card">
          <div className="auth-mode-tabs" role="tablist">
            <Link
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                setMode("login");
                setError("");
              }}
              className={mode === "login" ? "auth-tab active" : "auth-tab"}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                setMode("signup");
                setError("");
              }}
              className={mode === "signup" ? "auth-tab active" : "auth-tab"}
            >
              Sign Up (Create Account)
            </Link>
          </div>

          <div className="auth-card-body">
            <span className="section-label">
              {mode === "login"
                ? "MEMBER, DONOR & PARTNER SIGN IN"
                : "NEW ACCOUNT REGISTRATION"}
            </span>
            <h2>
              {mode === "login" ? "Welcome back to 366" : "Join the 366 Network"}
            </h2>
            <p>
              {mode === "login"
                ? "Enter your email and password to access your 366 Member, Donor & AI Builder portal."
                : "Register your account to support humanitarian missions, access grant dossiers or build with 366 AI Designer."}
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full Name or Organization</label>
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="e.g. Jordan Smith / Coastal Safety Foundation"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email Address</label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {mode === "signup" && (
                <>
                  <div className="auth-field">
                    <label htmlFor="auth-account-type">Primary Account Purpose</label>
                    <select
                      id="auth-account-type"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                    >
                      {ACCOUNT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="auth-field">
                    <label htmlFor="auth-region">Primary Region</label>
                    <select
                      id="auth-region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    >
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              {mode === "signup" && (
                <>
                  <div className="auth-field">
                    <label htmlFor="auth-confirm-password">Confirm Password</label>
                    <input
                      id="auth-confirm-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={6}
                      required
                    />
                  </div>

                  <label className="auth-checkbox">
                    <input
                      type="checkbox"
                      checked={updatesOptIn}
                      onChange={(e) => setUpdatesOptIn(e.target.checked)}
                    />
                    <span>
                      Send me field impact reports on Clean Water Hubs, the Coastal Shark &amp; Crocodile Drone Network, and Disaster Rescue deployments.
                    </span>
                  </label>
                </>
              )}

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="button auth-submit-btn" disabled={busy}>
                {busy
                  ? "Authenticating…"
                  : mode === "login"
                  ? "Sign In to 366 Portal"
                  : "Create 366 Account"}{" "}
                <span>→</span>
              </button>
            </form>

            <div className="auth-divider">
              <span>OR LAUNCH DIRECTLY</span>
            </div>

            <div className="auth-alt-actions">
              <a
                href="https://designer.366industries.com"
                target="_blank"
                rel="noreferrer"
                className="button secondary auth-full-btn"
              >
                Open 366 AI Designer Workspace <span>↗</span>
              </a>
              <Link href="/donate" className="button secondary auth-full-btn">
                Donate Without Creating an Account <span>↗</span>
              </Link>
            </div>

            <p className="auth-switch-prompt">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account yet?{" "}
                  <Link href="/signup" onClick={() => setMode("signup")}>
                    Create a 366 account →
                  </Link>
                </>
              ) : (
                <>
                  Already have a 366 account?{" "}
                  <Link href="/login" onClick={() => setMode("login")}>
                    Log in here →
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
