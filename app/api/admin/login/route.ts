import { NextResponse } from "next/server";
import {
  adminCookie,
  constantTimeEqual,
  createAdminSessionToken,
} from "../../../admin/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || !constantTimeEqual(password, expected)) {
    return NextResponse.json(
      { ok: false, message: "Incorrect access password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    adminCookie.name,
    await createAdminSessionToken(),
    adminCookie.options,
  );
  return response;
}
