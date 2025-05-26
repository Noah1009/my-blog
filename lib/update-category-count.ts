// lib/update-category-count.js

import { createClient } from 'microcms-js-sdk'

// microCMS クライアント初期化
const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
})

/**
 * カテゴリーIDに紐づく投稿件数をmicroCMSに更新する関数
 * @param categoryId - カテゴリーのcontentId
 * @param postCount - 更新する投稿数（数値）
 */
export async function updatePostCountForCategory(
  categoryId: string,
  postCount: number
): Promise<any> {
  if (!categoryId || typeof postCount !== 'number') {
    throw new Error('無効な引数です。categoryIdまたはpostCountが不正です。')
  }

  try {
    const res = await client.update({
      endpoint: 'categories',
      contentId: categoryId,
      content: { postCount },
    })

    console.log(`✅ postCount 更新成功: ${postCount}件 (ID: ${categoryId})`)
    return res
  } catch (err: any) {
    console.error('❌ postCount 更新エラー', err?.message || err)
    throw err
  }
}
