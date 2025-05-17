// app/api/update-post-count/route.js
import { NextResponse } from "next/server";
import { getAllPosts, getAllCategories } from "@/lib/api";
import { updatePostCountForCategory } from "@/lib/update-category-count";

// console.log("API動いてる");

export async function POST(req) {
  try {
    const body = await req.json();

    // 受信したWebhookの内容を確認
    console.log("Received webhook", body);

    const { id: updateCategoryId } = body;

    //対象カテゴリーがなければ処理終了
    if (!updateCategoryId) {
      return NextResponse.json(
        { success: false, error: "category ID is missing" },
        { status: 400 }
      );
    }

    // 全ての投稿を取得
    const allPosts = await getAllPosts();

    // 投稿の中でこのカテゴリに属するものをカウント
    const matchingCount = allPosts.filter((post) =>
      post.categories?.some((cat) => cat.id === updateCategoryId)
    ).length;

    console.log(
      `🔢投稿数を更新: カテゴリID=${updateCategoryId}, 件数=${matchingCount}`
    );

    //件数をmicroCMSに更新
    await updatePostCountForCategory(updateCategoryId, matchingCount);

    return NextResponse.json({ success: true, count: matchingCount });
  } catch (error) {
    console.error("❌webhook handling error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
