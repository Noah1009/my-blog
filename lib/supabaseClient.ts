// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase 環境変数が設定されていません");
}

// ★ ここがポイント：名前付き export で supabase を出す
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
