"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import {passwordResetCompletion} from "../../lib/password-reset-policy.mjs";

const OWNER_EMAIL = "jordilwbailey@gmail.com";
const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 128;

type Phase = "checking" | "ready" | "saving" | "complete" | "warning" | "error";

export function ResetPasswordForm({
  supabaseUrl,
  supabaseAnonKey,
}: {
  supabaseUrl: string;
  supabaseAnonKey: string;
}) {
  const clientRef = useRef<SupabaseClient | null>(null);
  const [phase, setPhase] = useState<Phase>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("Checking the secure recovery link…");

  useEffect(() => {
    let cancelled = false;

    async function prepareRecoverySession() {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hash.get("access_token") ?? "";
      const refreshToken = hash.get("refresh_token") ?? "";
      const recoveryType = hash.get("type") ?? "";
      const providerError = hash.get("error_description") ?? "";

      // URL fragments are not sent to the server. Remove the tokens from the
      // visible URL immediately, before any asynchronous network work begins.
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      if (!supabaseUrl || !supabaseAnonKey) {
        setPhase("error");
        setMessage("Password recovery is not configured on the server.");
        return;
      }
      if (
        providerError ||
        recoveryType !== "recovery" ||
        !accessToken ||
        !refreshToken
      ) {
        setPhase("error");
        setMessage(
          "This recovery link is invalid or expired. Request a new link from the administrator sign-in page."
        );
        return;
      }

      const client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          flowType: "implicit",
          persistSession: false,
        },
      });
      clientRef.current = client;

      const { data: sessionData, error: sessionError } =
        await client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      if (cancelled) return;
      if (sessionError || !sessionData.session) {
        setPhase("error");
        setMessage(
          "This recovery link is invalid or expired. Request a new link from the administrator sign-in page."
        );
        return;
      }

      // getUser validates the bearer token with Supabase Auth. Do not trust
      // user-editable metadata or an email value supplied by the browser.
      const { data: userData, error: userError } = await client.auth.getUser(
        sessionData.session.access_token
      );
      if (cancelled) return;
      if (
        userError ||
        userData.user?.email?.trim().toLowerCase() !== OWNER_EMAIL
      ) {
        await client.auth.signOut({ scope: "local" }).catch(() => undefined);
        setPhase("error");
        setMessage("This link is not valid for the 366 Industries owner account.");
        return;
      }

      setPhase("ready");
      setMessage("Owner identity verified. Choose a new password.");
    }

    void prepareRecoverySession();
    return () => {
      cancelled = true;
    };
  }, [supabaseAnonKey, supabaseUrl]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase !== "ready" || !clientRef.current) return;

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      setMessage(
        `Use a password or passphrase between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`
      );
      return;
    }
    if (password !== confirmPassword) {
      setMessage("The two password entries do not match.");
      return;
    }
    if (password.toLowerCase().includes(OWNER_EMAIL)) {
      setMessage("Do not include the owner email address in the password.");
      return;
    }

    setPhase("saving");
    setMessage("Updating the owner password…");
    const client = clientRef.current;
    const { error } = await client.auth.updateUser({ password });
    if (error) {
      setPhase("ready");
      setMessage(
        "The password could not be updated. The link may have expired; request a new recovery email and try again."
      );
      return;
    }

    // Global sign-out revokes the Auth sessions checked by every privileged
    // route. Also explicitly clear this browser's website cookies.
    let signOutFailed = false;
    try {
      const { error: signOutError } = await client.auth.signOut({ scope: "global" });
      signOutFailed = Boolean(signOutError);
    } catch {
      signOutFailed = true;
    }
    const logoutResponse = await fetch("/api/auth/session", {
      method: "DELETE",
      credentials: "same-origin",
      headers: {Accept: "application/json"},
    }).catch(() => null);
    try {
      localStorage.removeItem("366_member_session");
    } catch {
      // Presentation-only cache; the HttpOnly cookies are the security boundary.
    }

    setPassword("");
    setConfirmPassword("");
    const completion = passwordResetCompletion(signOutFailed, Boolean(logoutResponse?.ok));
    setPhase(completion.phase);
    setMessage(completion.message);
  }

  if (phase === "complete" || phase === "warning") {
    return (
      <div className="admin-login-form" aria-live="polite">
        <p className={phase === "warning" ? "form-error" : "form-notice"}>{message}</p>
        <a className="button" href="/admin">
          Continue to administrator sign in <span>→</span>
        </a>
      </div>
    );
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <p
        className={phase === "error" ? "form-error" : "form-notice"}
        role={phase === "error" ? "alert" : "status"}
      >
        {message}
      </p>
      {phase !== "error" && (
        <>
          <label htmlFor="new-admin-password">New password or passphrase</label>
          <input
            id="new-admin-password"
            name="new-password"
            type="password"
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_PASSWORD_LENGTH}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={phase !== "ready"}
            required
          />
          <label htmlFor="confirm-admin-password">Confirm new password</label>
          <input
            id="confirm-admin-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_PASSWORD_LENGTH}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={phase !== "ready"}
            required
          />
          <small>
            Use at least {MIN_PASSWORD_LENGTH} characters. A unique passphrase is
            easier to remember and safer than a short complex password.
          </small>
          <button className="button" type="submit" disabled={phase !== "ready"}>
            {phase === "saving" ? "Updating password…" : "Update owner password"}
          </button>
        </>
      )}
    </form>
  );
}
