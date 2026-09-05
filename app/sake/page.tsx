// app/sake/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getAllSakeArticles } from '@/lib/api'
import styles from '@/styles/sake-list.module.css'

export const metadata = {
  title: '日本酒一覧',
  description: '日本酒の記録一覧',
}

export const revalidate = 60

export default async function Page() {
  const items = await getAllSakeArticles(100)

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.kicker}>Sake log</p>
        <h1 className={styles.title}>日本酒一覧</h1>
        <p className={styles.description}>
          飲んだ記憶を、香り・温度・酒質の手がかりからたどるための記録。
        </p>
      </header>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.card}>
            <Link href={`/sake/${item.id}`} className={styles.link}>
              <div className={styles.row}>
                {item.bottleImage?.url && (
                  <div className={styles.imageFrame}>
                    <Image
                      src={item.bottleImage.url}
                      alt={item.title}
                      width={120}
                      height={150}
                    />
                  </div>
                )}

                <div className={styles.content}>
                  <div className={styles.name}>{item.title}</div>

                  <div className={styles.meta}>
                    {item.breweryName}（{item.prefecture}）
                  </div>

                  {item.cardLead && (
                    <div className={styles.lead}>{item.cardLead}</div>
                  )}

                  <div className={styles.attributes}>
                    {item.positioning && <span>{item.positioning}</span>}
                    {!!item.serveTemp?.length && <span>{item.serveTemp.join(' / ')}</span>}
                    {item.isNama && <span>生酒</span>}
                  </div>

                  {!!item.styleTags?.length && (
                    <div className={styles.tags}>
                      {item.styleTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
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
