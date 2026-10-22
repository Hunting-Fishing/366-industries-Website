import { AuthPortal } from "../auth/auth-client";
import { Shell } from "../components";

export const metadata = {
  title: "Sign Up — Create Your Account | 366 Industries & 1st Defence Industries",
  description:
    "Create your 366 Industries & 1st Defence Industries account to support global clean water and coastal drone safety, build software with 366 AI Designer, or partner on institutional grants.",
};

export default function SignupPage() {
  return (
    <Shell>
      <AuthPortal initialMode="signup" />
    </Shell>
  );
}
