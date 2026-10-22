import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MEMBER_COOKIE = "industries_366_member";

export type MemberSession = {
  name: string;
  email: string;
  accountType: string;
  region: string;
  createdAt: string;
};

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(MEMBER_COOKIE)?.value;
  if (!raw) {
    return NextResponse.json({ authenticated: false, user: null });
  }
  try {
    const user = JSON.parse(decodeURIComponent(raw)) as MemberSession;
    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
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
    };

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

    const derivedName =
      body.name && body.name.trim().length > 0
        ? body.name.trim()
        : email.split("@")[0].replace(/[._-]/g, " ");

    const user: MemberSession = {
      name: derivedName,
      email,
      accountType: body.accountType || "Humanitarian Supporter & AI Builder",
      region: body.region || "Global (Canada • Philippines • USA)",
      createdAt: new Date().toISOString(),
    };

    const response = NextResponse.json({ ok: true, user });
    response.cookies.set(MEMBER_COOKIE, encodeURIComponent(JSON.stringify(user)), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
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
  return response;
}
