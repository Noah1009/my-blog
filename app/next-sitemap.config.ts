// next-sitemap.config.ts

import type { IConfig } from 'next-sitemap'

const config: IConfig = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://my-blog-zeta-fawn-23.vercel.app/',
  generateRobotsTxt: true, // robots.txt も一緒に生成
  outDir: './public',
  // sitemapSize: 7000, // 必要であればコメントアウト解除
}

export default config
