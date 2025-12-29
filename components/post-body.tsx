// components/post-body.tsx

import type { JSX } from 'react'
import type { ReactNode } from 'react'
import styles from '@/styles/post-body.module.css'

type Props = {
  children: ReactNode
}

export default function PostBody({ children }: Props): JSX.Element {
  return <div className={styles.stack}>{children}</div>
}
