// app/sake/[id]/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSakeArticleById } from '@/lib/api'
import { siteMeta } from '@/lib/constants'
import styles from '@/styles/sake/detail.module.css'

function formatText(value: unknown): string {
  if (Array.isArray(value)) return value.filter(Boolean).join(' / ').trim()
  if (typeof value === 'string') return value.trim()
  return ''
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = await getSakeArticleById(id)

  if (!item) return {}

  const description = item.cardLead || siteMeta.siteDesc
  const image = item.ogpImage || item.heroImage || item.bottleImage
  const canonical = `/sake/${id}`

  return {
    title: `${item.title} | ${siteMeta.siteTitle}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: item.title,
      description,
      url: canonical,
      siteName: siteMeta.siteTitle,
      locale: siteMeta.siteLocale,
      type: 'article',
      images: image
        ? [{ url: image.url, width: image.width, height: image.height }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description,
      images: image ? [image.url] : undefined,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const item = await getSakeArticleById(id)
  if (!item) return notFound()
  const positioning = formatText(item.positioning)
  const designation = formatText(item.designation)
  const rice = formatText(item.rice)
  const sourceNote = formatText(item.sourceNote)

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link href="/sake" className={styles.backLink}>
          日本酒一覧へ戻る
        </Link>
        <p className={styles.kicker}>Sake detail</p>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.meta}>
          {item.breweryName}（{item.prefecture}）
        </p>
        {item.cardLead && <p className={styles.lead}>{item.cardLead}</p>}
      </header>

      {(item.heroImage?.url || item.bottleImage?.url) && (
        <section className={styles.heroWide}>
          <div className={styles.heroMedia}>
            <Image
              src={(item.heroImage || item.bottleImage)!.url}
              alt={item.title}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </section>
      )}

      <div className={styles.layout}>
        <div>
          {item.body && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>本文</h2>
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </section>
          )}
        </div>

        <aside className={styles.side}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>スペック</h2>
            <ul className={styles.specList}>
              {positioning && (
                <li>
                  <span>立ち位置</span>
                  <strong>{positioning}</strong>
                </li>
              )}
              {!!item.serveTemp?.length && (
                <li>
                  <span>推奨温度</span>
                  <strong>{item.serveTemp.join(' / ')}</strong>
                </li>
              )}
              {item.isNama && (
                <li>
                  <span>状態</span>
                  <strong>生酒</strong>
                </li>
              )}
              {!!item.styleTags?.length && (
                <li className={styles.tagRow}>
                  <span>酒質タグ</span>
                  <div className={styles.tags}>
                    {item.styleTags.map((tag) => (
                      <strong key={tag}>{tag}</strong>
                    ))}
                  </div>
                </li>
              )}

              {designation && (
                <li>
                  <span>特定名称</span>
                  <strong>{designation}</strong>
                </li>
              )}
              {typeof item.abv === 'number' && (
                <li>
                  <span>アルコール度数</span>
                  <strong>{item.abv}%</strong>
                </li>
              )}
              {rice && (
                <li>
                  <span>使用米</span>
                  <strong>{rice}</strong>
                </li>
              )}
              {typeof item.polishRate === 'number' && (
                <li>
                  <span>精米歩合</span>
                  <strong>{item.polishRate}%</strong>
                </li>
              )}

              {item.asOfDate && (
                <li>
                  <span>情報基準日</span>
                  <strong>{new Date(item.asOfDate).toLocaleDateString('ja-JP')}</strong>
                </li>
              )}
              {sourceNote && (
                <li>
                  <span>情報ソース</span>
                  <strong>{sourceNote}</strong>
                </li>
              )}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  )
}
