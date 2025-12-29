// lib/api.ts
import { createClient } from 'microcms-js-sdk'
import { eyecatchLocal } from '@/lib/constants'
import type { Post, SakeArticle } from '@/lib/types'
import { getPlaiceholder } from 'plaiceholder'

// =========================
// microCMS client
// =========================
const SERVICE_DOMAIN = process.env.SERVICE_DOMAIN
const API_KEY = process.env.API_KEY

export const client = createClient({
  serviceDomain: SERVICE_DOMAIN || '',
  apiKey: API_KEY || '',
})

const isProd = process.env.NODE_ENV === 'production'

/**
 * microCMS 環境変数チェック
 * ※ 未設定でも即 throw はせず、ログで気づけるようにする
 */
function assertMicroCMSConfig(): void {
  if (!SERVICE_DOMAIN || !API_KEY) {
    console.error('[microCMS] Missing env config', {
      SERVICE_DOMAIN: !!SERVICE_DOMAIN,
      API_KEY: !!API_KEY,
      NODE_ENV: process.env.NODE_ENV,
    })
  }
}

// =========================
// eyecatch normalize
// =========================
async function normalizeEyecatch(raw: any): Promise<Post['eyecatch']> {
  const url = raw?.url && typeof raw.url === 'string' ? raw.url : eyecatchLocal.url

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const fetchUrl = url.startsWith('/') ? `${siteUrl}${url}` : url

    const buffer = await fetch(fetchUrl)
      .then((res) => res.arrayBuffer())
      .then((buf) => Buffer.from(buf))

    const { base64, metadata } = await getPlaiceholder(buffer)

    return {
      url,
      width: metadata.width ?? eyecatchLocal.width,
      height: metadata.height ?? eyecatchLocal.height,
      blurDataURL: isProd ? base64 : '',
    }
  } catch (err) {
    console.error('normalizeEyecatch error:', err)
    return {
      url,
      width: eyecatchLocal.width,
      height: eyecatchLocal.height,
      blurDataURL: '',
    }
  }
}

// =========================
// NOTES
// =========================

/**
 * Notes 一覧取得
 */
export async function getAllNotes(maxLimit = 100): Promise<Post[]> {
  assertMicroCMSConfig()

  const all: Post[] = []
  let page = 0

  try {
    while (true) {
      const { contents }: { contents: any[] } = await client.get({
        endpoint: 'notes',
        queries: {
          orders: '-publishDate',
          // 一覧は軽量でOK（本文は不要）
          fields: 'title,slug,eyecatch,publishDate',
          limit: maxLimit,
          offset: page * maxLimit,
        },
      })

      console.log('[getAllNotes]', page, contents.length)

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
    console.error('~~ getAllNotes error ~~', err)
  }

  return all
}

/**
 * Notes 詳細（slug）
 * ★本文（body）も取得する
 */
export async function getNoteBySlug(slug: string): Promise<Post | null> {
  assertMicroCMSConfig()

  try {
    const { contents }: { contents: any[] } = await client.get({
      endpoint: 'notes',
      queries: {
        filters: `slug[equals]${encodeURIComponent(slug)}`,
        limit: 1,
        // ★追加：本文フィールド（microCMS側のフィールドIDが body の前提）
        fields: 'title,slug,eyecatch,publishDate,body',
      },
    })

    if (!contents.length) return null

    const note = contents[0]

    return {
      ...note,
      eyecatch: await normalizeEyecatch(note.eyecatch),
    }
  } catch (err) {
    console.error('~~ getNoteBySlug error ~~', err)
    return null
  }
}

// =========================
// SAKE ARTICLES
// =========================

/**
 * 日本酒記事一覧取得
 */
export async function getAllSakeArticles(limit = 100): Promise<SakeArticle[]> {
  assertMicroCMSConfig()

  try {
    const { contents }: { contents: any[] } = await client.get({
      endpoint: 'sake-articles',
      queries: {
        limit,
        orders: '-publishedAt',
        fields:
          'id,title,titleKana,breweryName,prefecture,bottleImage,positioning,isNama,styleTags,serveTemp,cardLead,asOfDate,sourceNote',
      },
    })

    return contents as SakeArticle[]
  } catch (err) {
    console.error('~~ getAllSakeArticles error ~~', err)
    return []
  }
}

/**
 * 日本酒記事詳細（ID）
 */
export async function getSakeArticleById(id: string): Promise<SakeArticle | null> {
  assertMicroCMSConfig()

  try {
    const data = await client.get({
      endpoint: 'sake-articles',
      contentId: id,
      queries: {
        fields:
          'id,title,titleKana,breweryName,prefecture,bottleImage,positioning,isNama,styleTags,serveTemp,cardLead,body,asOfDate,sourceNote,designation,abv,rice,polishRate',
      },
    })

    return data as SakeArticle
  } catch (err) {
    console.error('~~ getSakeArticleById error ~~', err)
    return null
  }
}
