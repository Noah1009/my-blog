// components/nav.tsx
'use client'

import type { JSX } from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/nav.module.css'

export default function Nav(): JSX.Element {
  const [navIsOpen, setNavIsOpen] = useState(false)

  const toggleNav = () => setNavIsOpen((prev) => !prev)
  const closeNav = () => setNavIsOpen(false)

  useEffect(() => {
    if (navIsOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [navIsOpen])

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      <button
        className={styles.btn}
        onClick={toggleNav}
        aria-label="メニューを開く"
        aria-expanded={navIsOpen}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.menu}>MENU</span>
      </button>

      <ul className={styles.list}>
        <li>
          <Link href="/" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeNav}>
            About
          </Link>
        </li>

        {/* ✅ 修正：/blog → /notes */}
        <li>
          <Link href="/notes" onClick={closeNav}>
            Notes
          </Link>
        </li>
      </ul>
    </nav>
  )
}
