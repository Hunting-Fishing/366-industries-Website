import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookie, createAdminSessionToken } from "../../../admin/auth";
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
  const raw = cookieStore.get(MEMBER_COOKIE)?.value;
  if (!raw) {
    return NextResponse.json({
      authenticated: false,
      user: null,
      supabaseConfigured: Boolean(getSupabaseConfig()),
    });
  }
  try {
    const user = JSON.parse(decodeURIComponent(raw)) as MemberSession;
    if (isAdminEmail(user.email)) {
      user.role = "admin";
    }
    return NextResponse.json({
      authenticated: true,
      user,
      supabaseConfigured: Boolean(getSupabaseConfig()),
    });
  } catch {
    return NextResponse.json({
      authenticated: false,
      user: null,
      supabaseConfigured: Boolean(getSupabaseConfig()),
    });
  }
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

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const isRootAdmin = isAdminEmail(email);

    let derivedName =
      body.name && body.name.trim().length > 0
        ? body.name.trim()
        : isRootAdmin
        ? "Jordi L. W. Bailey (Founder & Super Admin)"
        : email.split("@")[0].replace(/[._-]/g, " ");
    let resolvedAccountType = isRootAdmin
      ? "Root Super Admin • 366 & 1st Defence Industries"
      : body.accountType || "Humanitarian Supporter & AI Builder";
    let resolvedRegion =
      body.region || "Global (Canada • Philippines • USA)";
    let resolvedRole: "admin" | "member" = isRootAdmin ? "admin" : "member";
    let authUserId: string | null = null;
    let supabaseSynced = false;

    if (mode === "signup") {
      const supaRes = await supabaseSignUpUser({
        email,
        password,
        name: derivedName,
        accountType: resolvedAccountType,
        region: resolvedRegion,
        updatesOptIn: body.updatesOptIn ?? true,
      });

      if (supaRes.error && !isRootAdmin) {
        return NextResponse.json(
          { ok: false, message: supaRes.error },
          { status: 400 }
        );
      }
      supabaseSynced = supaRes.synced;
      authUserId = supaRes.authUserId ?? null;
      resolvedRole = supaRes.role;
    } else {
      const supaRes = await supabaseSignInUser({
        email,
        password,
        fallbackName: derivedName,
        fallbackAccountType: resolvedAccountType,
        fallbackRegion: resolvedRegion,
      });

      if (supaRes.error && !isRootAdmin) {
        return NextResponse.json(
          { ok: false, message: supaRes.error },
          { status: 401 }
        );
      }

      supabaseSynced = supaRes.synced;
      authUserId = supaRes.authUserId ?? null;
      resolvedRole = supaRes.role;
      if (supaRes.profile) {
        derivedName = supaRes.profile.name;
        resolvedRole = supaRes.profile.role;
        resolvedAccountType = supaRes.profile.accountType;
        resolvedRegion = supaRes.profile.region;
      }
    }

    const user: MemberSession = {
      id: authUserId,
      name: derivedName,
      email,
      role: resolvedRole,
      accountType: resolvedAccountType,
      region: resolvedRegion,
      supabaseSynced,
      createdAt: new Date().toISOString(),
    };

    const response = NextResponse.json({
      ok: true,
      user,
      supabaseSynced,
    });

    response.cookies.set(MEMBER_COOKIE, encodeURIComponent(JSON.stringify(user)), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    // If user is an admin (e.g. Jordilwbailey@gmail.com), also issue the admin control room cookie!
    if (resolvedRole === "admin") {
      response.cookies.set(
        adminCookie.name,
        await createAdminSessionToken(),
        adminCookie.options
      );
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
