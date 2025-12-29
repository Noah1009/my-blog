// app/sake/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getAllSakeArticles } from '@/lib/api'
import styles from '@/styles/sake-list.module.css'

export const metadata = {
  title: '日本酒一覧',
  description: '日本酒の記録一覧',
}

export default async function Page() {
  const items = await getAllSakeArticles(100)

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>日本酒一覧</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.card}>
            <Link href={`/sake/${item.id}`} className={styles.link}>
              <div className={styles.row}>
                {item.bottleImage?.url && (
                  <Image
                    src={item.bottleImage.url}
                    alt={item.title}
                    width={90}
                    height={160}
                  />
                )}

                <div>
                  <div className={styles.name}>{item.title}</div>

                  <div className={styles.meta}>
                    {item.breweryName}（{item.prefecture}）
                  </div>

                  {item.cardLead && (
                    <div className={styles.lead}>{item.cardLead}</div>
                  )}

                  <div className={styles.sub}>
                    {item.positioning} / {item.serveTemp}
                    {item.isNama ? ' / 生酒' : ''}
                  </div>

                  {!!item.styleTags?.length && (
                    <div className={styles.sub}>
                      タグ：{item.styleTags.join(' / ')}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
