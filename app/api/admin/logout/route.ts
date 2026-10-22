import { NextResponse } from "next/server";
import { adminCookie } from "../../../admin/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.delete(adminCookie.name);
  response.cookies.delete("industries_366_member");
  return response;
}
