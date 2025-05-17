// lib/update-category-count.js

import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

// カテゴリーIDに紐づく投稿件数をmicroCMSに更新
export async function updatePostCountForCategory(categoryId, postCount) {
  if (!categoryId || typeof postCount !== "number") {
    throw new Error("無効な引数です。categoryIdまたはpostCountが不正です。");
  }

  try {
    const res = await client.update({
      endpoint: "categories",
      contentId: categoryId,
      content: { postCount },
    });
    console.log(`✅ postCount 更新成功: ${postCount}件 (ID: ${categoryId})`);
    return res;
  } catch (err) {
    console.error("❌ postCount 更新エラー", err.message);
    throw err;
  }
}
