// app/notes/category/[slug]/page.tsx

import Container from '@/components/container'
import PostHeader from '@/components/post-header'
import { siteMeta } from '@/lib/constants'
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// ✅ 仮ページ用メタデータ（カテゴリ機能は準備中）
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  const title = `カテゴリー: ${slug}（準備中）`
  const description = '現在、カテゴリー機能は準備中です。'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteMeta.siteUrl}/blog/category/${slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <Container>
      <PostHeader title={`カテゴリー: ${slug}`} subtitle="準備中" />
      <p style={{ padding: '0 1rem 2rem' }}>
        現在、カテゴリー機能は準備中です。記事数が増え次第、カテゴリページを実装します。
      </p>
    </Container>
  )
}
