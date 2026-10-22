import Link from "next/link";
import { getSupabaseConfig } from "../../lib/supabase";
import { ResetPasswordForm } from "./reset-password-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reset Administrator Password | 366 Industries",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ResetPasswordPage() {
  const config = getSupabaseConfig();

  return (
    <main className="admin-shell">
      <section className="admin-login-card">
        <Link className="brand" href="/" aria-label="Return to 366 Industries">
          <span>366</span> INDUSTRIES
        </Link>
        <div className="section-label">Verified owner account recovery</div>
        <h1>Set a new owner password</h1>
        <p>
          This page accepts a single-use Supabase recovery session for the
          verified 366 Industries owner account. It never displays or stores
          your recovery token.
        </p>
        <ResetPasswordForm
          supabaseUrl={config?.url ?? ""}
          supabaseAnonKey={config?.anonKey ?? ""}
        />
        <Link className="admin-back" href="/admin">
          ← Return to administrator sign in
        </Link>
      </section>
    </main>
  );
}
