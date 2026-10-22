import { NextResponse } from "next/server";
import {
  adminCookie,
  constantTimeEqual,
  createAdminSessionToken,
} from "../../../admin/auth";
import {
  isAdminEmail,
  ROOT_ADMIN_EMAIL,
  supabaseSignInUser,
} from "../../../lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const expectedAdminPassword = process.env.ADMIN_PASSWORD ?? "";

  let authorized = false;
  let adminEmail = ROOT_ADMIN_EMAIL;
  let adminName = "Jordi L. W. Bailey (Founder & Super Admin)";

  // 1. Check if signing in as Root Admin email (Jordilwbailey@gmail.com)
  if (isAdminEmail(email) && password.length >= 4) {
    const supaCheck = await supabaseSignInUser({
      email,
      password,
      fallbackName: adminName,
      fallbackAccountType: "Root Super Admin • 366 & 1st Defence Industries",
      fallbackRegion: "Canada (BC) • Philippines (Ilocos Norte) • USA",
    });
    if (!supaCheck.error) {
      authorized = true;
      adminEmail = email;
      if (supaCheck.profile?.name) {
        adminName = supaCheck.profile.name;
      }
    }
  }

  // 2. Also allow ADMIN_PASSWORD environment variable if configured
  if (
    !authorized &&
    expectedAdminPassword &&
    constantTimeEqual(password, expectedAdminPassword)
  ) {
    authorized = true;
  }

  if (!authorized) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Access denied. Sign in with Admin email (Jordilwbailey@gmail.com) and password.",
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    ok: true,
    user: {
      name: adminName,
      email: adminEmail,
      role: "admin",
      accountType: "Root Super Admin • 366 & 1st Defence Industries",
      region: "Canada (BC) • Philippines (Ilocos Norte) • USA",
    },
  });

  response.cookies.set(
    adminCookie.name,
    await createAdminSessionToken(),
    adminCookie.options
  );

  response.cookies.set(
    "industries_366_member",
    encodeURIComponent(
      JSON.stringify({
        name: adminName,
        email: adminEmail,
        role: "admin",
        accountType: "Root Super Admin • 366 & 1st Defence Industries",
        region: "Canada (BC) • Philippines (Ilocos Norte) • USA",
        supabaseSynced: true,
        createdAt: new Date().toISOString(),
      })
    ),
    {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    }
  );

  return response;
}
