// lib/constants.js
export const siteMeta = {
  siteTitle: 'CUBE',
  siteDesc: 'アウトプットしていくサイト',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
