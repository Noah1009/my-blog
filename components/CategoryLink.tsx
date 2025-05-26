// components/CategoryLink.tsx

'use client'

import Link from 'next/link'
import { event } from '@/lib/gtag'

// ✅ Props型を定義
type CategoryLinkProps = {
  slug: string
  name: string
  className?: string
  count?: number
}

export default function CategoryLink({
  slug,
  name,
  className = '',
  count,
}: CategoryLinkProps): JSX.Element {
  return (
    <Link
      href={`/blog/category/${slug}`}
      className={className}
      aria-label={`カテゴリー: ${name}`}
      onClick={() =>
        event({
          action: 'click_category',
          category: 'Category',
          label: name,
        })
      }
    >
      <span className="category-name">{name}</span>
      {count != null && <span className="category-count">{count}件</span>}
    </Link>
  )
}
