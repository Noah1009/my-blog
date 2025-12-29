// app/page.tsx

import type { JSX } from 'react'
import Meta from '@/components/meta'
import Container from '@/components/container'
import Hero from '@/components/hero'
import Posts from '@/components/posts'
import Pagination from '@/components/pagination'
import { siteMeta } from '@/lib/constants'
import type { Post, SakeArticle } from '@/lib/types'
import Profile from '@/components/Profile'

// 変更：blogs ではなく sake-articles を取得
import { getAllSakeArticles } from '@/lib/api'

// Supabase or ランダム画像取得（これはそのまま）
import { getHeroSakeImage } from '@/lib/getHeroSakeImage'

export const metadata = {
  title: siteMeta.siteTitle,
  description: siteMeta.siteDesc,
}

export default async function Home(): Promise<JSX.Element> {
  // 変更：日本酒記事を取得（最新順の想定：lib/api.ts 側で orders を設定している前提）
  const sakeItems: SakeArticle[] = await getAllSakeArticles(3)

  // 追加：Postsコンポーネントに合わせて Post 形式へ変換（最小改変の要）
  const posts: Post[] = sakeItems.map((sake) => ({
    // Postsがslug前提なら、ここに id を入れる（詳細ページ側のルーティングに合わせて調整可）
    slug: sake.id,
    title: sake.title,
    // publishDate は日本酒に必須ではないので、基準日があれば使う／なければ空文字
    publishDate: sake.asOfDate ?? '',
    // eyecatch は bottleImage を流用（blurDataURLは任意なので未設定でOK）
    eyecatch: sake.bottleImage?.url
      ? {
          url: sake.bottleImage.url,
          // width/height が無い場合に備えて最低限の値を入れる（表示崩れ防止）
          width: sake.bottleImage.width ?? 600,
          height: sake.bottleImage.height ?? 900,
        }
      : undefined,
    // categories は使わない想定なので付けない（Post型で任意ならOK）
  }))

  // Hero 画像取得（そのまま）
  const heroImage = await getHeroSakeImage()

  return (
    <Container>
      <Meta
        pageTitle={siteMeta.siteTitle}
        pageDesc={siteMeta.siteDesc}
        pageUrl={`${siteMeta.siteUrl}/`}
        pageImg="/images/default-ogp.jpg"
      />

      <Hero
        title="日本酒の記憶"
        subtitle="今日の一杯を、未来の自分へ"
        heroBottleUrl={heroImage ?? undefined}
        imageOn={true}
        sakeName="東洋美人 地帆紅"
        breweryName="澄川酒造場（山口県）"
      >
        <Profile />
      </Hero>

      {/* そのまま流用：中身は日本酒由来の疑似Post */}
      <Posts posts={posts} basePath="/sake" />

      {/* 変更：/blog ではなく /sake に誘導 */}
      <Pagination nextUrl="/sake" nextText="More Sake" />
    </Container>
  )
}
