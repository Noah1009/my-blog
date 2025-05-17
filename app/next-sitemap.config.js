// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://my-blog-zeta-fawn-23.vercel.app/",
  generateRobotsTxt: true, // robots.txt も一緒に生成される.
  outDir: "./public",
  //   sitemapSize: 7000, // 1ファイルに含める最大URL数（通常このままでOK）
};
