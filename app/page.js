// app/page.js
import { getLatestPosts } from "@/lib/api";
import Meta from "@/components/meta";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Posts from "@/components/posts";
import Pagination from "@/components/pagination";
import { siteMeta } from "@/lib/constants";

export default async function Home() {
  const posts = await getLatestPosts(4);

  return (
    <Container>
      <Meta pageUrl={`${siteMeta.siteUrl}/`} />
      <Hero
        title="CUBE"
        subtitle="アウトプットしていくサイト"
        imageOn={true} // 必要に応じて true または false を固定値で渡す
      />
      <Posts posts={posts} />
      <Pagination nextUrl="/blog" nextText="More Posts" />
    </Container>
  );
}
