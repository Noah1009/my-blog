// app/notes/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Container from '@/components/container'
import Hero from '@/components/hero'
import { getNoteBySlug } from '@/lib/api'
import { siteMeta } from '@/lib/constants'
import type { Post } from '@/lib/types'

// ✅ .next/types が要求している形（params が Promise）
type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// ============================================================
// 動的ページ用Metadata
// ============================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const note: Post | null = await getNoteBySlug(slug)

  if (!note) {
    return {
      title: '記事が見つかりません',
    }
  }

  const title = `${note.title} | ${siteMeta.siteTitle}`
  const url = `${siteMeta.siteUrl}/notes/${note.slug}`

  return {
    title,
    description: note.title,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description: note.title,
      url,
      siteName: siteMeta.siteTitle,
      locale: siteMeta.siteLocale,
      type: 'article',

      images: note.eyecatch?.url
        ? [
            {
              url: note.eyecatch.url,
              width: note.eyecatch.width,
              height: note.eyecatch.height,
            },
          ]
        : [
            {
              url: `${siteMeta.siteUrl}/images/default-ogp.jpg`,
              width: 1200,
              height: 630,
            },
          ],
    },
  }
}

export default async function Page({ params }: PageProps) {
  // ✅ Promise なので await して取り出す
  const { slug } = await params

  const note: Post | null = await getNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return (
    <Container>
      <Hero title={note.title} subtitle={note.publishDate} />

      {/* ここに本文（body/content）を表示 */}
      {/* <ArticleContent content={note.content} /> */}
    </Container>
  )
}
