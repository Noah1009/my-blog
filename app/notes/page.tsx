// app/notes/page.tsx
import type { JSX } from 'react'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Posts from '@/components/posts'
import { siteMeta } from '@/lib/constants'
import type { Post, SakeArticle } from '@/lib/types'
import { getAllSakeArticles } from '@/lib/api'

export const revalidate = 60

export const metadata = {
  title: `Notes | ${siteMeta.siteTitle}`,
  description: '日本酒記事一覧',
  openGraph: {
    title: `Notes | ${siteMeta.siteTitle}`,
    description: '日本酒記事一覧',
    url: `${siteMeta.siteUrl}/notes`,
    siteName: siteMeta.siteTitle,
    images: [
      {
        url: `${siteMeta.siteUrl}/images/default-ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default async function Notes(): Promise<JSX.Element> {
  const sakeItems: SakeArticle[] = await getAllSakeArticles(100)

  // Posts が期待する Post 形式に変換
  const posts: Post[] = sakeItems.map((sake) => ({
    slug: sake.id, // ★クリック先で /sake/{id} を作るため id を入れる
    title: sake.title,
    publishDate: sake.asOfDate ?? '',
    eyecatch: sake.bottleImage?.url
      ? {
          url: sake.bottleImage.url,
          width: sake.bottleImage.width ?? 600,
          height: sake.bottleImage.height ?? 900,
        }
      : undefined,
  }))

  return (
    <Container>
      <Hero title="Notes" subtitle="Latest Sake Notes" />
      {/* ★クリック先は既に動いている /sake/[id] へ */}
      <Posts posts={posts} basePath="/sake" />
    </Container>
  )
}
