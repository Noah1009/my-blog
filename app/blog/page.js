// app/blog/page.js

import { getAllPosts } from "@/lib/api";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Posts from "@/components/posts";
import { siteMeta } from "@/lib/constants";
// import Meta from "@/components/meta";

export const metadata = {
  title: `ブログ | ${siteMeta.siteTitle}`,
  description: "ブログ記事一覧",
  openGraph: {
    title: `ブログ | ${siteMeta.siteTitle}`,
    description: "ブログ記事一覧",
    url: `${siteMeta.siteUrl}/blog`,
    siteName: siteMeta.siteTitle,
    images: [
      {
        url: `${siteMeta.siteUrl}/images/default-ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <Container>
      <Hero title="Blog" subtitle="Recent Posts" />
      <Posts posts={posts} />
    </Container>
  );
}
