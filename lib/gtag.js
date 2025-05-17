// lib/gtag.js

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const isProd = process.env.NODE_ENV === "production";

/**
 * ページビューを送信（ルート変更時などに呼び出す）
 * @param {string} url - 遷移先のURL
 */
export const pageview = (url) => {
  if (!isProd || !GA_MEASUREMENT_ID || typeof window.gtag !== "function")
    return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * カスタムイベントを送信
 * @param {Object} param0 - イベント詳細
 * @param {string} param0.action - イベントの名前（必須）
 * @param {string} param0.category - 分類（例："CTA", "Blog", "Form" など）
 * @param {string} [param0.label] - 詳細内容（例："記事タイトル", "ボタン名" など）
 * @param {number} [param0.value] - 数値として送る情報（例：クリック数、再生時間など）
 */
export const event = ({ action, category, label, value }) => {
  if (!isProd || typeof window.gtag !== "function") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
