// next-sitemap.config.ts
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://your-default-url.com", // 本番URLを記載（例: https://example.com）
  generateRobotsTxt: true, // robots.txt を出力
  outDir: "./public", // 出力先ディレクトリ
  sitemapSize: 7000, // 1ファイルに含める最大URL数（通常は変更不要）
  changefreq: "daily", // 各ページの更新頻度のヒント
  priority: 0.7, // SEO優先度（0.0〜1.0）
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      // 追加の sitemap を指定したい場合（例：カテゴリやタグ別）
      // `${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap.xml`,
    ],
  },
};
