// app/notes/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Meta from '@/components/meta'
import { getNoteBySlug } from '@/lib/api'
import { siteMeta } from '@/lib/constants'
import type { Post } from '@/lib/types'

// ✅ .next/types が要求している形（params が Promise）
type PageProps = {
  params: Promise<{
    slug: string
  }>
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
      <Meta
        pageTitle={note.title}
        pageDesc={note.title}
        pageUrl={`${siteMeta.siteUrl}/notes/${note.slug}`}
        pageImg={note.eyecatch?.url}
        pageImgW={note.eyecatch?.width}
        pageImgH={note.eyecatch?.height}
      />

      <Hero title={note.title} subtitle={note.publishDate} />

      {/* ここに本文（body/content）を表示 */}
      {/* <ArticleContent content={note.content} /> */}
    </Container>
  )
}
