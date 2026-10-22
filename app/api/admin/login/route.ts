import { NextResponse } from "next/server";
import {
  adminCookie,
  constantTimeEqual,
  createAdminSessionToken,
} from "../../../admin/auth";
import { issueMemberSession } from "../../../lib/member-session";
import { isAdminEmail, ROOT_ADMIN_EMAIL, supabaseSignInUser } from "../../../lib/supabase";
import type { MemberSession } from "../../auth/session/route";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid login request." }, { status: 400 });
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!isAdminEmail(email) || !password) {
    return NextResponse.json({ ok: false, message: "Invalid admin credentials." }, { status: 401 });
  }

  let authenticatedWithSupabase = false;
  const configuredPassword = process.env.ADMIN_PASSWORD || "";
  // Environment-password recovery is opt-in; do not authorize based only on
  // a supplied email, local fallback data, or an unverified signup.
  let authorized = configuredPassword.length >= 16 &&
    constantTimeEqual(password, configuredPassword);

  if (!authorized) {
    const auth = await supabaseSignInUser({
      email,
      password,
      fallbackName: "366 Industries Owner",
      fallbackAccountType: "Administrator",
      fallbackRegion: "Global",
    });
    authorized = Boolean(auth.synced && auth.accessToken && auth.authUserId && auth.role === "admin" && !auth.error);
    authenticatedWithSupabase = authorized;
  }

  if (!authorized) {
    return NextResponse.json({ ok: false, message: "Invalid admin credentials." }, { status: 401 });
  }

  const user: MemberSession = {
    name: "366 Industries Owner",
    email: ROOT_ADMIN_EMAIL,
    role: "admin",
    accountType: "Administrator",
    region: "Global",
    supabaseSynced: authenticatedWithSupabase,
    createdAt: new Date().toISOString(),
  };

  let adminSession: string;
  let memberSession: string;
  try {
    adminSession = await createAdminSessionToken();
    memberSession = await issueMemberSession(user);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Server admin session key is not configured." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ ok: true, user });
  response.cookies.set(adminCookie.name, adminSession, adminCookie.options);
  response.cookies.set("industries_366_member", memberSession, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
