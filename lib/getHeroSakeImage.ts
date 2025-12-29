// lib/getHeroSakeImage.ts
// import { supabase } from "@/lib/supabaseClient";

// /**
//  * Hero用の日本酒画像をランダムで取得
//  * 将来的にAIトリミングや画像最適化をここで追加可能
//  */
// export async function getHeroSakeImage(): Promise<string | null> {
//   // label_image_url が null じゃないレコードを取得
//   const { data, error } = await supabase
//     .from("sake_entries")
//     .select("label_image_url")
//     .not("label_image_url", "is", null);

//   if (error) {
//     console.error("Hero画像取得エラー:", error);
//     return null;
//   }

//   if (!data || data.length === 0) return null;

//   // ランダムで選ぶ
//   const randomIndex = Math.floor(Math.random() * data.length);
//   return data[randomIndex].label_image_url;
// }
// lib/getHeroSakeImage.ts

/**
 * Supabase がまだ設定されていないため
 * Hero 画像としてローカルの日本酒画像を返す版
 *
 * 後で Supabase 実装するときは
 * この関数の中身だけ置き換えれば UI 側は変更不要です
 */
export async function getHeroSakeImage(): Promise<string | null> {
  return "/images/sake/jipang.png";
}
