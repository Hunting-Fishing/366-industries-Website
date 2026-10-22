import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  supabaseAdminDeleteUser,
  supabaseAdminUpsertUser,
  supabaseListDonations,
  supabaseListUsers,
} from "../../../lib/supabase";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized admin access." },
      { status: 401 }
    );
  }

  const [usersResult, donationsResult] = await Promise.all([
    supabaseListUsers(),
    supabaseListDonations(),
  ]);

  return NextResponse.json({
    ok: true,
    supabaseSynced: usersResult.synced || donationsResult.synced,
    users: usersResult.users,
    donations: donationsResult.donations,
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized admin access." },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      fullName?: string;
      role?: "admin" | "member";
      status?: "active" | "suspended";
      accountType?: string;
      region?: string;
    };

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, message: "Valid user email is required." },
        { status: 400 }
      );
    }

    const result = await supabaseAdminUpsertUser({
      email,
      fullName: body.fullName,
      role: body.role,
      status: body.status,
      accountType: body.accountType,
      region: body.region,
    });

    const { users } = await supabaseListUsers();
    return NextResponse.json({
      ok: true,
      supabaseSynced: result.synced,
      user: result.user,
      users,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to update user." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized admin access." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const email = String(searchParams.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    return NextResponse.json(
      { ok: false, message: "Email parameter is required." },
      { status: 400 }
    );
  }

  const del = await supabaseAdminDeleteUser(email);
  if (!del.ok) {
    return NextResponse.json(
      { ok: false, message: del.message },
      { status: 400 }
    );
  }

  const { users } = await supabaseListUsers();
  return NextResponse.json({ ok: true, users });
}
