// app/api/update-post-count/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type WebhookBody = {
  id?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: WebhookBody = await req.json();

    // 受信したWebhookの内容を確認
    console.log("Received webhook", body);

    const updateCategoryId = body.id;

    // 対象カテゴリーがなければ処理終了
    if (!updateCategoryId) {
      return NextResponse.json(
        { success: false, error: "category ID is missing" },
        { status: 400 }
      );
    }

    // TODO: 本実装
    // 現在の lib/api.ts には getAllPosts / getAllCategories が無いため
    // ここで投稿数を再計算して microCMS に反映する処理は一旦スキップする
    console.log(
      `Skipping update (not implemented): categoryId=${updateCategoryId}`
    );

    return NextResponse.json({ success: true, skipped: true });
  } catch (error: any) {
    console.error("❌webhook handling error:", error);
    return NextResponse.json(
      { success: false, error: error?.message ?? "unknown error" },
      { status: 500 }
    );
  }
}
