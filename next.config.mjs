//next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 画像セットのサイズ構成
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 修正箇所: deviceSize -> deviceSizes と統一
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // レスポンスイメージの画像フォーマット
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"], // 画像フォーマットの設定
  },
};

export default nextConfig; // 修正箇所: module.exports から export default に変更
