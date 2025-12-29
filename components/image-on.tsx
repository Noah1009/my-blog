// components/image-on.tsx

'use client'

import type { JSX } from 'react'
import { useState, useEffect, ReactNode } from 'react'

type Props = {
  children: (imageOn: boolean) => ReactNode
}

export default function ImageOn({ children }: Props): JSX.Element {
  const [imageOn, setImageOn] = useState(false)

  useEffect(() => {
    setImageOn(true)
  }, [])

  return <>{children(imageOn)}</>
}
