// app/api/blur/route.js
import { getPlaiceholder } from "@plaiceholder/next";
import { Buffer } from "node:buffer";

/**
 * POSTメソッド：画像URLからbase64のblurDataURLを返す
 */
export async function POST(request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "imageUrl is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 画像をフェッチしてバッファ化
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // blurDataURLを生成
    const { base64 } = await getPlaiceholder(buffer);

    return new Response(JSON.stringify({ base64 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[ERROR] blur API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
