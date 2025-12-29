// components/post-header.js

import type { JSX } from 'react'
import styles from '@/styles/post-header.module.css'
import ConvertDate from '@/components/convert-date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

type Props = {
  title: string
  subtitle: string
  publish?: string
}

export default function PostHeader({ title, subtitle, publish = '' }: Props): JSX.Element {
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
      {publish && (
        <div className={styles.publish}>
          <FontAwesomeIcon icon={faClock} size="lg" color="var(--gray-25)" />
          <ConvertDate dateISO={publish} />
        </div>
      )}
    </div>
  )
}
