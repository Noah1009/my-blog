// components/hero.tsx
'use client'

import { useEffect, useState } from 'react'
import type { ReactNode, JSX } from 'react'
import Image from 'next/image'
import styles from '@/styles/hero.module.css'

type Props = {
  title: string
  subtitle: string
  imageOn?: boolean
  heroBottleUrl?: string
  sakeName?: string
  breweryName?: string
  children?: ReactNode
}

export default function Hero({
  title,
  subtitle,
  imageOn = false,
  heroBottleUrl,
  sakeName,
  breweryName,
  children,
}: Props): JSX.Element {
  /* ★追加: スクロール量（0〜1） */
  const [scrollRatio, setScrollRatio] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const max = 300 // ★Hero内で完結させる距離
      const y = Math.min(window.scrollY, max)
      setScrollRatio(y / max)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.flexContainer}>
        {/* 酒瓶 */}
        {imageOn && heroBottleUrl && (
          <figure className={styles.image}>
            <div
              className={styles.sakeCard}
              style={{
                /* ★追加: 最大10pxだけ下に流れる */
                transform: `translateY(${scrollRatio * 10}px)`,
              }}
            >
              <Image
                src={heroBottleUrl}
                alt={sakeName ? `日本酒「${sakeName}」のボトル` : '日本酒ボトル'}
                width={460}
                height={920}
                priority
                className={styles.sakeImage}
              />
            </div>

            {(sakeName || breweryName) && (
              <figcaption className={styles.sakeMeta}>
                {sakeName && <span className={styles.sakeName}>{sakeName}</span>}
                {breweryName && (
                  <span className={styles.sakeBrewery}>{breweryName}</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* テキスト */}
        <div className={styles.text}>
          <h1 className={`${styles.titleRainbow} ${styles.heroTitle}`}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.profileContainer}>{children}</div>
          <p className={styles.credit}>🍶　URASAKIによって作られました</p>
        </div>
      </div>
    </section>
  )
}
