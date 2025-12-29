// lib/fonts.ts
import localFont from 'next/font/local'
import {
  Open_Sans,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Zen_Antique_Soft,
  Lora,
} from 'next/font/google'

// Savoye LET（ロゴ等）
export const savoyeLET = localFont({
  src: './fonts/SavoyeLet.ttf',
  variable: '--font-savoye',
  display: 'swap',
})

// Open Sans（英文UI向け）
export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
  display: 'swap',
})

// Noto Sans JP（本文向け・日本語）
// ✅ japanese subset は存在しないため指定不可
// ✅ preload を無効化して subsets 指定要求を回避
export const notoSansJP = Noto_Sans_JP({
  variable: '--font-notojp',
  display: 'swap',
  preload: false, // ★追加（ここが重要）
})

// Lora（補助英字見出し）
export const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

// 日本酒ブログの H2/H3（日本語見出し）向け Serif
// ✅ preload を無効化して subsets 指定要求を回避
export const notoSerifJP = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  weight: ['400', '700'],
  display: 'swap',
  preload: false, // ★追加（ここが重要）
})

// 「雫の記憶」専用タイトルフォント
export const zenAntiqueSoft = Zen_Antique_Soft({
  subsets: ['latin'],
  variable: '--font-zen-antique-soft',
  weight: ['400'],
  display: 'swap',
})
