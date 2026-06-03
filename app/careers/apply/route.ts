import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const redirectUrl = new URL("/thank-you", request.url);
  redirectUrl.searchParams.set("source", "careers-application");

  return NextResponse.redirect(redirectUrl, { status: 303 });
}
