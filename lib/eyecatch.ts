// lib/eyecatch.js

import { getPlaiceholder } from 'plaiceholder'

/**
 * 投稿の eyecatch 情報の型
 */
type Eyecatch = {
  url: string
  width: number
  height: number
  blurDataURL?: string
}

type Post = {
  eyecatch?: Eyecatch
  title: string
}

/**
 * アイキャッチが存在しない投稿に対して安全なデータを返す関数
 */
export function getEyecatchData(post: Post) {
  const { eyecatch, title } = post

  return {
    src: eyecatch?.url || '/images/default-ogp.jpg',
    width: eyecatch?.width || 1200,
    height: eyecatch?.height || 630,
    alt: title,
    placeholder: eyecatch?.blurDataURL ? 'blur' : undefined,
    blurDataURL: eyecatch?.blurDataURL,
  }
}

/**
 * public フォルダ内のローカル画像から blurDataURL を生成する関数（Plaiceholder最新版対応）
 */
export async function getLocalPlaiceholder(src: string): Promise<{
  width: number
  height: number
  blurDataURL: string
}> {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_SITE_URL

  const imageUrl = `${baseUrl}/${src.replace(/^\/+/, '')}`

  const response = await fetch(imageUrl)
  if (!response.ok) {
    console.error('画像取得エラー:', imageUrl)
    throw new Error('画像取得に失敗しました')
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const result = await getPlaiceholder(buffer)

  return {
    width: result.metadata.width,
    height: result.metadata.height,
    blurDataURL: result.base64,
  }
}
