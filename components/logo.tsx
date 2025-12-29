// components/logo.tsx
'use client'

import type { JSX } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/logo.module.css'
import { useTheme } from '@/components/ThemeProvider' // もしくは @/context/ThemeContext

type Props = {
  boxOn?: boolean
}

export default function Logo({ boxOn = false }: Props): JSX.Element {
  const { theme } = useTheme()

  // ダークモードでは白いロゴ（背景が黒）、ライトモードでは黒いロゴ（背景が白）
  const logoSrc = theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'

  return (
    <Link href="/" className={boxOn ? styles.box : styles.basic}>
      <div className={styles.logoWrapper}>
        <Image
          key={logoSrc} // 切り替え時に再描画させる
          src={logoSrc}
          alt="Code Atelier Logo"
          fill
          sizes="(max-width: 768px) 120px, 160px"
          className={styles.logoImage}
          priority
        />
      </div>
    </Link>
  )
}
