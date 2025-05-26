// lib/types.ts
export type Post = {
    slug: string
    title: string
    publishDate: string
    eyecatch?: {
      url: string
      width: number
      height: number
      blurDataURL?: string
    }
  }