// lib/api.ts
import { createClient } from 'microcms-js-sdk'
import { eyecatchLocal } from '@/lib/constants'
import type { Post } from '@/lib/types'
import { getPlaiceholder } from 'plaiceholder'

// microCMS クライアント初期化
export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
})

const isProd = process.env.NODE_ENV === 'production'

// アイキャッチ画像を正規化し、blurDataURLを生成（Plaiceholder v3.0.0対応）
async function normalizeEyecatch(raw: any): Promise<Post['eyecatch']> {
  const url = raw?.url && typeof raw.url === 'string' ? raw.url : eyecatchLocal.url

  try {
    const buffer = await fetch(
      url.startsWith('/') ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : url
    )
      .then(res => res.arrayBuffer())
      .then(buf => Buffer.from(buf))

    const { base64, metadata } = await getPlaiceholder(buffer)

    return {
      url,
      width: metadata.width,
      height: metadata.height,
      blurDataURL: isProd ? base64 : '',
    }
  } catch (err) {
    console.error('normalizeEyecatch エラー:', err)
    return {
      url,
      width: eyecatchLocal.width,
      height: eyecatchLocal.height,
      blurDataURL: '',
    }
  }
}

// 全記事取得（ページネーション対応）
export async function getAllPosts(maxLimit = 100): Promise<Post[]> {
  const all: Post[] = []
  let page = 0

  try {
    while (true) {
      const { contents }: { contents: any[] } = await client.get({
        endpoint: 'blogs',
        queries: {
          fields: 'title,slug,eyecatch,publishDate',
          limit: maxLimit,
          offset: page * maxLimit,
        },
      })

      const enriched: Post[] = await Promise.all(
        contents.map(async ({ slug, title, eyecatch, publishDate }) => ({
          slug,
          title,
          publishDate,
          eyecatch: await normalizeEyecatch(eyecatch),
        }))
      )

      all.push(...enriched)
      if (contents.length < maxLimit) break
      page++
    }
  } catch (err) {
    console.error('~~ getAllPosts エラー ~~', err)
  }

  return all
}

// slug による記事取得
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { contents }: { contents: any[] } = await client.get({
      endpoint: 'blogs',
      queries: {
        filters: `slug[equals]${encodeURIComponent(slug)}`,
        limit: 1,
      },
    })

    if (!contents.length) return null

    const post = contents[0]
    return {
      ...post,
      eyecatch: await normalizeEyecatch(post.eyecatch),
    }
  } catch (err) {
    console.error('~~ getPostBySlug エラー ~~', err)
    return null
  }
}

// slug 一覧取得
export async function getAllSlugs(limit = 100): Promise<{ slug: string }[]> {
  const posts = await getAllPosts(limit)
  return posts.map(({ slug }) => ({ slug }))
}

// 最新記事だけ取得（トップページ用）
export async function getLatestPosts(limit = 4): Promise<Post[]> {
  try {
    const { contents }: { contents: any[] } = await client.get({
      endpoint: 'blogs',
      queries: {
        limit,
        orders: '-publishDate',
        fields: 'title,slug,eyecatch,publishDate',
      },
    })

    const enriched: Post[] = await Promise.all(
      contents.map(async ({ slug, title, publishDate, eyecatch }) => ({
        slug,
        title,
        publishDate,
        eyecatch: await normalizeEyecatch(eyecatch),
      }))
    )

    return enriched
  } catch (err) {
    console.error('~~ getLatestPosts エラー ~~', err)
    return []
  }
}

// カテゴリー一覧取得
export async function getAllCategories(): Promise<any[]> {
  try {
    const { contents }: { contents: any[] } = await client.get({
      endpoint: 'categories',
    })
    return contents
  } catch (err) {
    console.error('~~ getAllCategories エラー ~~', err)
    return []
  }
}

// 特定のカテゴリのスラッグに属する記事を取得
export async function getPostsByCategorySlug(slug: string): Promise<Post[]> {
  try {
    const { contents }: { contents: any[] } = await client.get({
      endpoint: 'blogs',
      queries: {
        filters: `categories[contains]${slug}`,
        fields: 'title,slug,eyecatch,publishDate',
      },
    })

    const enriched: Post[] = await Promise.all(
      contents.map(async ({ slug, title, publishDate, eyecatch }) => ({
        slug,
        title,
        publishDate,
        eyecatch: await normalizeEyecatch(eyecatch),
      }))
    )

    return enriched
  } catch (err) {
    console.error('~~ getPostsByCategorySlug エラー ~~', err)
    return []
  }
}
