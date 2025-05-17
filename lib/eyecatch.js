// lib/eyecatch.js

import { getPlaiceholder } from "@plaiceholder/next";

/**
 * publicフォルダにある画像を fetch で読み込み
 * Vercel環境でも動作可能な Plaiceholder 処理
 */
export async function getLocalPlaiceholder(src) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL;

  const imageUrl = `${baseUrl}/${src.replace(/^\/+/, "")}`;

  const response = await fetch(imageUrl);
  if (!response.ok) {
    console.error("画像取得エラー:", imageUrl);
    throw new Error("画像取得に失敗しました");
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { base64, img } = await getPlaiceholder(buffer);

  return {
    ...img,
    blurDataURL: base64,
  };
}
