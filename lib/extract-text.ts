// lib/extract-text.js
import { convert } from 'html-to-text';

/**
 * HTML文字列からプレーンテキストを抽出し、指定文字数で切り取る
 * @param html HTML文字列
 * @param length 最大文字数（デフォルト：80文字）
 * @param more 末尾に追加する記号（デフォルト：「…」）
 * @returns プレーンテキスト
 */
export function extractText(html: string, length: number = 80, more: string = '…'): string {
  const text = convert(html, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { ignoreHref: true } },
    ],
  })

  return text.slice(0, length) + more
}
