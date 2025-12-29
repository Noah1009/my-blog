// components/Double.tsx
import React from 'react';
import styles from '@/styles/double.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Double({ children }: Props) {
  return (
    <div className={styles.outer}>
      <div className={styles.middle}>
      <div className={styles.inner}>
        {children}
      </div>
      </div>
    </div>
  );
}