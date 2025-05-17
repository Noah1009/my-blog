//next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",　　app/api/blur/route.jsを利用するため削除
  images: {
    // ✅ loaderはデフォルト（不要）
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"], // ✅ モダン画像対応
  },
};

export default nextConfig;
