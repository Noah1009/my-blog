//  app/api/blur/route.js
// import { client } from "@/lib/api";
import { getPlaiceholder } from "plaiceholder";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("image");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "image URL missing" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const buffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return new Response(JSON.stringify({ base64 }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed  to generate blurDataURL" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
