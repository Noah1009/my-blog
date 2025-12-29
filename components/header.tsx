// components/header.tsx

import type { JSX } from 'react'
import Container from '@/components/container'
import Logo from '@/components/logo'
import Nav from '@/components/nav'
import styles from '@/styles/header.module.css'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header(): JSX.Element {
  return (
    <header className={styles.stickyHeader}>
      <Container large>
        <div className={styles.flexContainer}>
          <Logo boxOn /> {/* ✅ props付きコンポーネント */}
          <ThemeToggle />
          <div className={styles.rightBlock}>
          <Nav />
          
        </div>
        </div>
      </Container>
    </header>
  )
}
