import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookie, createAdminSessionToken } from "../../../admin/auth";
import { issueMemberSession, verifyMemberSession } from "../../../lib/member-session";
import {
  getSupabaseConfig,
  isAdminEmail,
  supabaseSignInUser,
  supabaseSignUpUser,
} from "../../../lib/supabase";

const MEMBER_COOKIE = "industries_366_member";

export type MemberSession = {
  id?: string | null;
  name: string;
  email: string;
  role: "admin" | "member";
  accountType: string;
  region: string;
  supabaseSynced: boolean;
  createdAt: string;
};

export async function GET() {
  const cookieStore = await cookies();
  const user = await verifyMemberSession(cookieStore.get(MEMBER_COOKIE)?.value);
  return NextResponse.json({
    authenticated: Boolean(user),
    user,
    supabaseConfigured: Boolean(getSupabaseConfig()),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      mode?: "login" | "signup";
      name?: string;
      email?: string;
      password?: string;
      accountType?: string;
      region?: string;
      updatesOptIn?: boolean;
    };
    const mode = body.mode === "signup" ? "signup" : "login";
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || password.length < 6) {
      return NextResponse.json(
        { ok: false, message: "A valid email and password (minimum 6 characters) are required." },
        { status: 400 }
      );
    }
    if (!getSupabaseConfig()) {
      return NextResponse.json(
        { ok: false, message: "Account authentication is not configured yet." },
        { status: 503 }
      );
    }
    if (mode === "signup" && isAdminEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "The owner account must be provisioned and verified in Supabase Auth." },
        { status: 403 }
      );
    }

    let derivedName = body.name?.trim() || email.split("@")[0].replace(/[._-]/g, " ");
    let resolvedAccountType = body.accountType || "Humanitarian Supporter & AI Builder";
    let resolvedRegion = body.region || "Global (Canada • Philippines • USA)";
    let resolvedRole: "admin" | "member" = "member";
    let authUserId: string | null = null;
    let authAccessToken: string | null = null;

    if (mode === "signup") {
      const result = await supabaseSignUpUser({
        email,
        password,
        name: derivedName,
        accountType: resolvedAccountType,
        region: resolvedRegion,
        updatesOptIn: body.updatesOptIn ?? true,
      });
      if (!result.synced || result.error) {
        return NextResponse.json(
          { ok: false, message: result.error || "Unable to register this account." },
          { status: 400 }
        );
      }
      if (!result.accessToken || !result.authUserId) {
        return NextResponse.json({
          ok: true,
          emailConfirmationRequired: true,
          message: "Registration received. Verify your email, then sign in.",
          user: null,
        });
      }
      authUserId = result.authUserId;
      authAccessToken = result.accessToken;
    } else {
      const result = await supabaseSignInUser({
        email,
        password,
        fallbackName: derivedName,
        fallbackAccountType: resolvedAccountType,
        fallbackRegion: resolvedRegion,
      });
      if (!result.synced || !result.accessToken || !result.authUserId || result.error) {
        return NextResponse.json(
          { ok: false, message: result.error || "Invalid email or password." },
          { status: 401 }
        );
      }
      authUserId = result.authUserId;
      authAccessToken = result.accessToken;
      resolvedRole = result.role;
      if (result.profile) {
        derivedName = result.profile.name;
        resolvedAccountType = result.profile.accountType;
        resolvedRegion = result.profile.region;
      }
    }

    const user: MemberSession = {
      id: authUserId,
      name: derivedName,
      email,
      role: resolvedRole,
      accountType: resolvedAccountType,
      region: resolvedRegion,
      supabaseSynced: true,
      createdAt: new Date().toISOString(),
    };

    // A signed HttpOnly session is mandatory: never accept a user-written JSON cookie.
    let signedMember: string;
    let signedAdmin: string | null = null;
    try {
      signedMember = await issueMemberSession(user);
      if (mode === "login" && resolvedRole === "admin" && isAdminEmail(email)) {
        if (!getSupabaseConfig()?.serviceRoleKey) {
          throw new Error("Administrator session guard is not configured.");
        }
        signedAdmin = await createAdminSessionToken(authAccessToken || "");
      }
    } catch {
      return NextResponse.json(
        { ok: false, message: "Session signing is not configured on the server." },
        { status: 503 }
      );
    }

    const response = NextResponse.json({ ok: true, user, supabaseSynced: true });
    response.cookies.set(MEMBER_COOKIE, signedMember, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    if (signedAdmin) {
      response.cookies.set(adminCookie.name, signedAdmin, adminCookie.options);
    }
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process authentication request." },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(MEMBER_COOKIE);
  response.cookies.delete(adminCookie.name);
  return response;
}
