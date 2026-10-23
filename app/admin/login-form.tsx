"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("Jordilwbailey@gmail.com");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [resetNotice, setResetNotice] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as {
      ok: boolean;
      message?: string;
      user?: {
        name: string;
        email: string;
        role: string;
        accountType: string;
        region: string;
      };
    };
    if (!response.ok || !result.ok) {
      setError(result.message ?? "Unable to sign in.");
      setBusy(false);
      return;
    }

    if (result.user) {
      try {
        localStorage.setItem(
          "366_member_session",
          JSON.stringify({
            ...result.user,
            supabaseSynced: true,
            createdAt: new Date().toISOString(),
          })
        );
        window.dispatchEvent(new Event("366-auth-changed"));
      } catch {
        // ignore
      }
    }

    router.refresh();
  }

  async function requestPasswordReset() {
    setResetBusy(true);
    setResetNotice("");
    setError("");
    try {
      const response = await fetch("/api/admin/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(result.message ?? "Password recovery is temporarily unavailable.");
      } else {
        setResetNotice(
          result.message ??
            "If the owner account is available, a secure reset link has been sent."
        );
      }
    } catch {
      setError("Network error while requesting password recovery. Please try again.");
    } finally {
      setResetBusy(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label htmlFor="admin-email">Admin email address</label>
      <input
        id="admin-email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <label htmlFor="admin-password">Admin password</label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your admin password"
        required
        autoFocus
      />
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={busy}>
        {busy ? "Authenticating Admin…" : "Enter Admin & Users Control Room"}{" "}
        <span>→</span>
      </button>
      <button
        className="admin-reset-link"
        type="button"
        disabled={busy || resetBusy}
        onClick={requestPasswordReset}
      >
        {resetBusy ? "Sending secure reset link…" : "Forgot password? Email a secure reset link"}
      </button>
      {resetNotice && (
        <p className="form-notice" role="status">
          {resetNotice}
        </p>
      )}
    </form>
  );
}
