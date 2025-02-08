import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "../auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ルートパス（"/"）へのアクセスの場合 "/home" にリダイレクト
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  console.log("[Middleware] Request received:", pathname);
  const session = await auth();

  if (!session) {
    console.log("[Middleware] Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/favorite/:path*", "/home/:path*", "/"],
};
