// lib/gtag.ts

export const GA_MEASUREMENT_ID: string | undefined = process.env.NEXT_PUBLIC_GA_ID
const isProd = process.env.NODE_ENV === 'production'

/**
 * ページビューを送信（ルート変更時などに呼び出す）
 * @param url - 遷移先のURL
 */
export const pageview = (url: string): void => {
  if (!isProd || !GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

/**
 * カスタムイベントを送信
 * @param params - イベントの詳細オブジェクト
 */
export const event = (params: {
  action: string
  category: string
  label?: string
  value?: number
}): void => {
  if (!isProd || typeof window.gtag !== 'function') return

  const { action, category, label, value } = params

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
