// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // 保護したいパス（例: /profile から始まるパス）
  const protectedPaths = ["/profile"];

  // リクエスト URL のパスを取得
  const { pathname } = req.nextUrl;

  // 保護対象のパスにマッチする場合のみトークンチェックを行う
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // NextAuth.js の getToken を使ってトークンを取得
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    // トークンがない（認証されていない）場合は /login にリダイレクト
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 認証済み、または保護対象外ならそのまま次に進む
  return NextResponse.next();
}

// Next.js のミドルウェアのマッチャーを設定
export const config = {
  matcher: ["/profile/:path*"],
};
