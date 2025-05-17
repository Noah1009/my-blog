// components/nav.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/nav.module.css";

export default function Nav() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => setNavIsOpen((prev) => !prev);
  const closeNav = () => setNavIsOpen(false);

  // スクロール禁止処理
  useEffect(() => {
    if (navIsOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [navIsOpen]);

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
        <li>
          <Link href="/blog" onClick={closeNav}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
