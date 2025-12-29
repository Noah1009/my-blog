// components/container.js

  import type { JSX } from 'react'
import type { ReactNode } from 'react'
import styles from '@/styles/container.module.css'

type ContainerProps = {
  children: ReactNode
  large?: boolean
}

export default function Container({ children, large = false }: ContainerProps): JSX.Element {
  return (
    // default は常に適用。large が true の場合は large も追加
    <div className={`${styles.default} ${large ? styles.large : ''}`}>
      {children}
    </div>
  )
}
