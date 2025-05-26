// app/page.tsx

import { getLatestPosts } from '@/lib/api'
import Meta from '@/components/meta'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Posts from '@/components/posts'
import Pagination from '@/components/pagination'
import { siteMeta } from '@/lib/constants'
import type { Post } from '@/lib/types'

export const metadata = {
  title: siteMeta.siteTitle,
  description: siteMeta.siteDesc,
  openGraph: {
    title: siteMeta.siteTitle,
    description: siteMeta.siteDesc,
    url: siteMeta.siteUrl,
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

export default async function Home(): Promise<JSX.Element> {
  const posts: Post[] = await getLatestPosts(4)

  return (
    <Container>
      <Meta
        pageTitle={siteMeta.siteTitle}
        pageDesc={siteMeta.siteDesc}
        pageUrl={`${siteMeta.siteUrl}/`}
        pageImg="/images/default-ogp.jpg"
        pageImgW={1200}
        pageImgH={630}
      />
      <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn={true} />
      <Posts posts={posts} />
      <Pagination nextUrl="/blog" nextText="More Posts" />
    </Container>
  )
}
