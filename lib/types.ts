// lib/types.ts

// ===== カテゴリー =====
export type Category = {
  id: string
  name: string
  slug: string
}

export type Post = {
  slug: string
  title: string
  publishDate: string
  body?: any // ★追加：Notes本文（microCMSのリッチ/Markdownは型が揺れるため暫定 any）
  eyecatch?: {
    url: string
    width: number
    height: number
    blurDataURL?: string
  }
  categories?: Category[]
}


// ===== 日本酒記事（sake-articles）用 =====
export type SakeArticle = {
  id: string
  title: string
  titleKana?: string

  breweryName?: string
  prefecture?: string

  bottleImage?: {
    url: string
    width?: number
    height?: number
  }

  positioning?: string
  isNama?: boolean
  styleTags?: string[]
  serveTemp?: string[]

  cardLead?: string
  body?: any // microCMS のリッチエディタ / Markdown（まずは any でOK）

  asOfDate?: string
  sourceNote?: string

  designation?: string
  abv?: number
  rice?: string
  polishRate?: number
}
