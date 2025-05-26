// components/CategoryViewTracker.tsx

'use client'

import { useEffect } from 'react'
import { event } from '@/lib/gtag'

// ✅ Propsの型を定義
type CategoryViewTrackerProps = {
  categoryName: string
}

export default function CategoryViewTracker({
  categoryName,
}: CategoryViewTrackerProps): null {
  useEffect(() => {
    event({
      action: 'view_category_page',
      category: 'Category',
      label: categoryName,
    })
  }, [categoryName])

  return null
}
