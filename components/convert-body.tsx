// components/convert-body.tsx

import type { JSX } from 'react'
import parse, { Element } from 'html-react-parser'
import type { DOMNode } from 'html-react-parser'
import Image from 'next/image'

type Props = {
  contentHTML: string
}

export default function ConvertBody({ contentHTML }: Props): JSX.Element {
  const contentReact = parse(contentHTML, {
    replace: (node: DOMNode) => {
      if (node.type === 'tag' && node.name === 'img') {
        const element = node as Element
        const { src, alt, width, height } = element.attribs

        if (!src || !width || !height) return null

        return (
          <Image
            src={src}
            alt={alt || ''}
            width={Number(width)}
            height={Number(height)}
            sizes="(min-width: 768px) 768px, 100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        )
      }

      return undefined
    },
  })

  return <>{contentReact}</>
}
