import withPWA from "next-pwa";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public", // PWA用ファイルの出力先ディレクトリ
  disable: !isProduction, // 開発環境ではPWAを無効化
  register: true, // サービスワーカーの自動登録
  skipWaiting: true, // 新しいサービスワーカーを即時有効化
})({
  reactStrictMode: false, // ReactのStrictモード
  swcMinify: true, // SWCを使用した最適化
});

export default nextConfig;
