"use client";

import { useState } from "react";
import type {
  SupabaseDonationRow,
  SupabaseMemberProfileRow,
} from "../lib/supabase";

const ROOT_ADMIN_EMAIL = "jordilwbailey@gmail.com";

export function AdminUsersControl({
  initialUsers,
  initialDonations,
  supabaseSyncedInitial,
}: {
  initialUsers: SupabaseMemberProfileRow[];
  initialDonations: SupabaseDonationRow[];
  supabaseSyncedInitial: boolean;
}) {
  const [users, setUsers] = useState<SupabaseMemberProfileRow[]>(initialUsers);
  const [donations] = useState<SupabaseDonationRow[]>(initialDonations);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "member">("member");
  const [newAccountType, setNewAccountType] = useState(
    "Humanitarian Supporter & Donor"
  );
  const [newRegion, setNewRegion] = useState("Global");
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  async function handleAddOrUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          fullName: newName,
          role: newRole,
          status: "active",
          accountType: newAccountType,
          region: newRegion,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        users?: SupabaseMemberProfileRow[];
        message?: string;
      };
      if (data.ok && data.users) {
        setUsers(data.users);
        setNewEmail("");
        setNewName("");
        setStatusMsg(`Saved user ${newEmail} (${newRole.toUpperCase()}).`);
      } else {
        setStatusMsg(data.message || "Unable to save user.");
      }
    } catch {
      setStatusMsg("Network error while saving user.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleRole(user: SupabaseMemberProfileRow) {
    if (user.email.toLowerCase() === ROOT_ADMIN_EMAIL) return;
    const nextRole: "admin" | "member" =
      user.role === "admin" ? "member" : "admin";
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        fullName: user.full_name,
        role: nextRole,
        status: user.status || "active",
        accountType: user.account_type,
        region: user.region,
      }),
    });
    const data = (await res.json()) as {
      ok?: boolean;
      users?: SupabaseMemberProfileRow[];
    };
    if (data.ok && data.users) {
      setUsers(data.users);
      setStatusMsg(
        `Updated ${user.email} role to ${nextRole.toUpperCase()}.`
      );
    }
  }

  async function toggleStatus(user: SupabaseMemberProfileRow) {
    if (user.email.toLowerCase() === ROOT_ADMIN_EMAIL) return;
    const nextStatus: "active" | "suspended" =
      user.status === "suspended" ? "active" : "suspended";
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        status: nextStatus,
        accountType: user.account_type,
        region: user.region,
      }),
    });
    const data = (await res.json()) as {
      ok?: boolean;
      users?: SupabaseMemberProfileRow[];
    };
    if (data.ok && data.users) {
      setUsers(data.users);
      setStatusMsg(`Updated ${user.email} status to ${nextStatus.toUpperCase()}.`);
    }
  }

  async function removeUser(email: string) {
    if (email.toLowerCase() === ROOT_ADMIN_EMAIL) return;
    const res = await fetch(
      `/api/admin/users?email=${encodeURIComponent(email)}`,
      { method: "DELETE" }
    );
    const data = (await res.json()) as {
      ok?: boolean;
      users?: SupabaseMemberProfileRow[];
      message?: string;
    };
    if (data.ok && data.users) {
      setUsers(data.users);
      setStatusMsg(`Removed user ${email}.`);
    } else if (data.message) {
      setStatusMsg(data.message);
    }
  }

  return (
    <>
      {/* USERS & ROLE CONTROL PANEL */}
      <article className="admin-panel admin-wide">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span>01 / USERS &amp; ROLE CONTROL (SUPABASE + ADMIN REGISTRY)</span>
          <span className="pledge-pill" style={{ marginBottom: 0 }}>
            ROOT SUPER ADMIN: JORDILWBAILEY@GMAIL.COM •{" "}
            {supabaseSyncedInitial ? "SUPABASE CONNECTED" : "LOCAL + SUPABASE READY"}
          </span>
        </div>
        <h2 style={{ margin: "18px 0 12px" }}>
          Users, Admins &amp; Access Control
        </h2>
        <p style={{ color: "var(--stone)", marginBottom: "24px" }}>
          Manage registered website members, donors, 366 AI Designer builders and administrator permissions.{" "}
          <strong>Jordilwbailey@gmail.com</strong> is permanently locked as Root Super Admin.
        </p>

        {/* ADD OR PROMOTE USER FORM */}
        <form
          onSubmit={handleAddOrUpdateUser}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "10px",
            padding: "20px",
            border: "1px solid var(--rule-strong)",
            background: "rgba(5, 12, 20, 0.75)",
            borderRadius: "10px",
            marginBottom: "24px",
          }}
        >
          <input
            type="email"
            placeholder="User Email (e.g. partner@org.com)"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            style={{
              height: "44px",
              padding: "0 12px",
              background: "#07121c",
              border: "1px solid var(--rule-strong)",
              color: "var(--ivory)",
            }}
          />
          <input
            type="text"
            placeholder="Full Name / Organization"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            style={{
              height: "44px",
              padding: "0 12px",
              background: "#07121c",
              border: "1px solid var(--rule-strong)",
              color: "var(--ivory)",
            }}
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as "admin" | "member")}
            style={{
              height: "44px",
              padding: "0 12px",
              background: "#07121c",
              border: "1px solid var(--rule-strong)",
              color: "var(--ivory)",
            }}
          >
            <option value="member">Role: Member / Supporter</option>
            <option value="admin">Role: Administrator</option>
          </select>
          <input
            type="text"
            placeholder="Account Type (e.g. Grant Auditor)"
            value={newAccountType}
            onChange={(e) => setNewAccountType(e.target.value)}
            style={{
              height: "44px",
              padding: "0 12px",
              background: "#07121c",
              border: "1px solid var(--rule-strong)",
              color: "var(--ivory)",
            }}
          />
          <input
            type="text"
            placeholder="Region (e.g. Canada / PH)"
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            style={{
              height: "44px",
              padding: "0 12px",
              background: "#07121c",
              border: "1px solid var(--rule-strong)",
              color: "var(--ivory)",
            }}
          />
          <button
            type="submit"
            className="button"
            disabled={busy}
            style={{ minHeight: "44px", justifyContent: "center" }}
          >
            {busy ? "Saving…" : "+ Add / Update User"}
          </button>
        </form>

        {statusMsg && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "18px",
              border: "1px solid var(--teal-bright)",
              background: "rgba(45, 212, 191, 0.12)",
              color: "var(--ivory)",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {statusMsg}
          </div>
        )}

        <div className="audit-table-wrap">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Name &amp; Email</th>
                <th>Role</th>
                <th>Account Type &amp; Region</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isRoot = u.email.toLowerCase() === ROOT_ADMIN_EMAIL;
                return (
                  <tr key={u.email}>
                    <td>
                      <strong>{u.full_name}</strong>
                      <br />
                      <span style={{ fontSize: "13px", color: "var(--teal-bright)" }}>
                        {u.email}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          u.role === "admin"
                            ? "utility-pill highlight"
                            : "utility-pill"
                        }
                      >
                        {isRoot ? "★ ROOT SUPER ADMIN" : u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {u.account_type}
                      <br />
                      <small style={{ color: "var(--stone)" }}>{u.region}</small>
                    </td>
                    <td>
                      <span
                        style={{
                          color:
                            u.status === "suspended"
                              ? "#ff7b54"
                              : "var(--teal-bright)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          fontSize: "12px",
                        }}
                      >
                        {u.status || "active"}
                      </span>
                    </td>
                    <td>
                      {isRoot ? (
                        <small style={{ color: "var(--stone)" }}>
                          Protected Owner Account
                        </small>
                      ) : (
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button
                            type="button"
                            className="utility-pill"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleRole(u)}
                          >
                            {u.role === "admin" ? "Set Member" : "Make Admin"}
                          </button>
                          <button
                            type="button"
                            className="utility-pill"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleStatus(u)}
                          >
                            {u.status === "suspended" ? "Activate" : "Suspend"}
                          </button>
                          <button
                            type="button"
                            className="utility-pill highlight"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeUser(u.email)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>

      {/* DONATIONS & PLEDGES LEDGER */}
      <article className="admin-panel admin-wide">
        <span>02 / HUMANITARIAN DONATIONS &amp; PLEDGES LEDGER (SUPABASE)</span>
        <h2 style={{ margin: "18px 0 12px" }}>Recorded Donations &amp; Pledges</h2>
        {donations.length === 0 ? (
          <p style={{ color: "var(--stone)" }}>
            No donation pledges recorded in the current session yet. Pledges submitted on{" "}
            <a href="/donate" style={{ color: "var(--orange)" }}>
              /donate
            </a>{" "}
            appear here and in your Supabase <code>public.donations</code> table.
          </p>
        ) : (
          <div className="audit-table-wrap">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Donor</th>
                  <th>Amount (USD)</th>
                  <th>Designated Mission</th>
                  <th>Note / Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.pledge_ref}>
                    <td>
                      <code>{d.pledge_ref}</code>
                    </td>
                    <td>
                      <strong>{d.donor_name}</strong>
                      <br />
                      <small>{d.donor_email}</small>
                    </td>
                    <td className="amount-cell">
                      ${Number(d.amount_usd).toLocaleString()} ({d.frequency})
                    </td>
                    <td>{d.mission_title}</td>
                    <td>
                      {d.donor_note || "—"}
                      <br />
                      <small>{d.created_at}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </>
  );
}
