// components/two-column.tsx

import type { JSX } from 'react'
import type { ReactNode } from 'react'
import styles from '@/styles/two-column.module.css'

type Props = {
  children: ReactNode
}

export function TwoColumn({ children }: Props): JSX.Element {
  return <div className={styles.flexContainer}>{children}</div>
}

export function TwoColumnMain({ children }: Props): JSX.Element {
  return <div className={styles.main}>{children}</div>
}

export function TwoColumnSidebar({ children }: Props): JSX.Element {
  return <div className={styles.sidebar}>{children}</div>
}
