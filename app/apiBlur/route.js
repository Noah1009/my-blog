// app/apiBlur/route.js
// /app/api/blur/route.js
import { getPlaiceholder } from "plaiceholder";
import fetch from "node-fetch";

export async function POST(request) {
  const { imageUrl } = await request.json();
  const buffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
  const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  return Response.json({ base64 });
}
