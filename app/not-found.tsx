// app/not-found.tsx
"use client";

import type { JSX } from 'react'
import { useEffect } from "react";
import Link from "next/link";
import Meta from "@/components/meta";
import Container from "@/components/container";
import Hero from "@/components/hero";
import { motion } from "framer-motion";
import styles from "@/styles/not-found.module.css";

// motion化された Link コンポーネントを定義
const MotionLink = motion(Link);

export default function NotFound(): JSX.Element {
  useEffect(() => {
    console.warn("404ページに遷移しました");
  }, []);

  return (
    <Container>
      <Meta pageTitle="404 - Page not found" />

      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero title="404" subtitle="ページが見つかりませんでした" />
        <p className={styles.message}>
          お探しのページは存在しないか、削除された可能性があります。
        </p>

        <div>
          <MotionLink
            href="/"
            className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ホームに戻る
          </MotionLink>
        </div>
      </motion.div>
    </Container>
  );
}
