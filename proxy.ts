import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/admin/marketing"];

export function proxy(request: NextRequest) {
  if (!protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const password = process.env.MARKETING_DASHBOARD_PASSWORD?.trim();
  if (!password) {
    return new NextResponse(
      "Marketing dashboard protection is not configured. Set MARKETING_DASHBOARD_PASSWORD.",
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }

  const username = process.env.MARKETING_DASHBOARD_USERNAME?.trim() || "owner";
  const authorization = request.headers.get("authorization");
  const credentials = parseBasicAuth(authorization);

  if (credentials?.username === username && credentials.password === password) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Hollyman Marketing"',
      "Cache-Control": "no-store"
    }
  });
}

export const config = {
  matcher: ["/admin/marketing/:path*", "/admin/marketing"]
};

function parseBasicAuth(authorization: string | null) {
  if (!authorization?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(authorization.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return null;

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch {
    return null;
  }
}

