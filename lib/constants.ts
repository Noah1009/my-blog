// lib/constants.js
export const siteMeta = {
  siteTitle: '日本酒の記憶',
  siteDesc: '今日の一杯を、未来の自分へ',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://my-blog-9skw.vercel.app',
  siteLang: 'ja',
  siteLocale: 'ja_JP',
  siteType: 'website',
  siteIcon: '/favicon.png',
} as const

export const eyecatchLocal: {
  url: string
  width: number
  height: number
} = {
  url: '/images/default-ogp.jpg',
  width: 1200,
  height: 630,
}
