//  app/api/getBlogs/route.js
import { client } from "@/lib/api";

export async function GET() {
  try {
    const data = await client.get({
      endpoint: "blogs",
    });

    return Response.json(data);
  } catch (error) {
    console.error("microCMSエラー:", error);
    return new Response("データ取得に失敗しました", {
      status: 500,
    });
  }
}
