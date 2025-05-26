// components/accordion.tsx

'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import styles from '@/styles/accordion.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'

// ✅ Props型の定義
type AccordionProps = {
  heading: string
  children: ReactNode
}

export default function Accordion({ heading, children }: AccordionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [height, setHeight] = useState<number>(0)
  const refText = useRef<HTMLDivElement | null>(null)

  const toggle = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    if (refText.current) {
      setHeight(refText.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className={isOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="accordion-content" // ✅ typo修正：aria-controls
        >
          {heading}
          <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon} />
        </button>
      </h3>
      <div
        id="accordion-content"
        className={styles.text}
        ref={refText}
        style={{
          maxHeight: isOpen ? `${height}px` : '0',
        }}
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  )
}
