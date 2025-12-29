// components/social.tsx
import type { JSX } from 'react'
import Image from 'next/image'
import styles from '@/styles/social.module.css'

type Props = {
  iconSize?: string
}

export default function Social({ iconSize = 'initial' }: Props): JSX.Element {
  return (
    <ul className={styles.list}>
      <li>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.circle}
        >
          <Image
            src="/social/Facebook_Logo_Primary.png"
            alt="Facebook"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles['sr-only']}>Facebook</span>
        </a>
      </li>
      <li>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.circle}
        >
          <Image
            src="/social/Instagram_Glyph_Gradient.png"
            alt="Instagram"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles['sr-only']}>Instagram</span>
        </a>
      </li>
      <li>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.circle}
        >
          <Image
            src="/social/youtube_social_icon_red.png"
            alt="YouTube"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles['sr-only']}>YouTube</span>
        </a>
      </li>
      <li>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.circle}
        >
          <Image
            src="/social/github-mark.png"
            alt="GitHub"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles['sr-only']}>GitHub</span>
        </a>
      </li>
    </ul>
  )
}
