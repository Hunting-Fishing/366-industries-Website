import { AuthPortal } from "../auth/auth-client";
import { Shell } from "../components";

export const metadata = {
  title: "Log In — Member, Donor & 366 AI Portal | 366 Industries & 1st Defence Industries",
  description:
    "Sign in to your 366 Industries & 1st Defence Industries account to manage humanitarian donations, launch 366 AI Designer, and access institutional grant dossiers.",
};

export default function LoginPage() {
  return (
    <Shell>
      <AuthPortal initialMode="login" />
    </Shell>
  );
}
