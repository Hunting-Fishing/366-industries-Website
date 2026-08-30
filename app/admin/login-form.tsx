"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const result = (await response.json()) as { ok: boolean; message?: string };
    if (!response.ok) {
      setError(result.message ?? "Unable to sign in.");
      setBusy(false);
      return;
    }
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label htmlFor="admin-password">Admin access password</label>
      <input
        id="admin-password"
        name="password"
        type="password"
        inputMode="numeric"
        autoComplete="current-password"
        required
        autoFocus
      />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={busy}>
        {busy ? "Checking…" : "Enter admin portal"} <span>→</span>
      </button>
    </form>
  );
}
