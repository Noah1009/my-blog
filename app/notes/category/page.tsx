// app/notes/category/page.tsx

import Container from '@/components/container'
import PostHeader from '@/components/post-header'
import { siteMeta } from '@/lib/constants'

export const metadata = {
  title: 'カテゴリー一覧（準備中）',
  description: '現在、カテゴリー機能は準備中です。',
  openGraph: {
    title: 'カテゴリー一覧（準備中）',
    description: '現在、カテゴリー機能は準備中です。',
    url: `${siteMeta.siteUrl}/notes/category`,
  },
  twitter: {
    card: 'summary',
    title: 'カテゴリー一覧（準備中）',
    description: '現在、カテゴリー機能は準備中です。',
  },
}

export default function CategoryListPage() {
  return (
    <Container>
      <PostHeader title="カテゴリー一覧" subtitle="準備中" />
      <p style={{ padding: '0 1rem 2rem' }}>
        現在、カテゴリー機能は準備中です。記事数が増え次第、実装予定です。
      </p>
    </Container>
  )
}
