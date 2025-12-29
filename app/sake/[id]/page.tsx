// app/sake/[id]/page.tsx

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getSakeArticleById } from '@/lib/api'
import styles from '@/styles/sake/detail.module.css'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const item = await getSakeArticleById(id)
  if (!item) return notFound()

  return (
    <main className={styles.container}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.meta}>
          {item.breweryName}（{item.prefecture}）
        </p>
        {item.cardLead && <p className={styles.lead}>{item.cardLead}</p>}
      </header>

      {/* ✅ 画像は2カラムに入れず、ここで大きく表示 */}
      {item.bottleImage?.url && (
        <section className={styles.heroWide}>
          <div className={styles.heroMedia}>
            <Image
              src={item.bottleImage.url}
              alt={item.title}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </section>
      )}

      {/* 2カラム（本文 / スペック） */}
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
              <li>立ち位置：{item.positioning}</li>
              <li>推奨温度：{item.serveTemp}</li>
              <li>生酒：{item.isNama ? 'はい' : 'いいえ'}</li>
              {!!item.styleTags?.length && <li>酒質タグ：{item.styleTags.join(' / ')}</li>}

              {item.designation && <li>特定名称：{item.designation}</li>}
              {typeof item.abv === 'number' && <li>アルコール度数：{item.abv}%</li>}
              {item.rice && <li>使用米：{item.rice}</li>}
              {typeof item.polishRate === 'number' && <li>精米歩合：{item.polishRate}%</li>}

              {item.asOfDate && <li>情報基準日：{item.asOfDate}</li>}
              {item.sourceNote && <li>情報ソース：{item.sourceNote}</li>}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  )
}
