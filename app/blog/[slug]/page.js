// app/blog/[slug]/page.js
import { getPostBySlug, getAllSlugs } from "@/lib/api";
import { getPrevNextPosts } from "@/lib/prev-next-post";
import { extractText } from "@/lib/extract-text";
import { notFound } from "next/navigation";
import ConvertBody from "@/components/convert-body";
import Container from "@/components/container";
import PostHeader from "@/components/post-header";
import PostBody from "@/components/post-body";
import Pagination from "@/components/pagination";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@/components/two-column.js";
import PostCategories from "@/components/post-categories";
import Image from "next/image";

//静的パス生成
export async function generateStaticParams() {
  const posts = await getAllSlugs();
  return posts.map(({ slug }) => ({ slug }));
}

// メタデータの動的生成
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // console.log("アイキャッチ:", post.eyecatch); // ログの確認用

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  const description = extractText(post.content, 100, "…続きを読む");

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `https://example.com/blog/${post.slug}`,
      images: [
        {
          url: post.eyecatch?.url || "/images/default-ogp.jpg",
          width: post.eyecatch?.width || 1200,
          height: post.eyecatch?.height || 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.eyecatch?.url || "/images/default-ogp.jpg"],
    },
  };
}

//　ページコンポーネント
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { title, publishDate, eyecatch, categories, content } = post;

  const allPosts = await getAllSlugs();
  const { prevPost, nextPost } = getPrevNextPosts(allPosts, slug);

  return (
    <Container>
      <article>
        <PostHeader
          title={title}
          subtitle="Blog Article"
          publish={publishDate}
        />

        {/*  アイキャッチ画像  */}
        <figure>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
            }}
          >
            <Image
              src={eyecatch?.url || "/images/default-ogp.jpg"}
              alt={title}
              fill
              priority
            />
          </div>
        </figure>

        {/* 本文とサイドバー */}
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>

          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>

        {/* 前後記事へのリンク */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`}>&larr; {prevPost.title}</Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`}>{nextPost.title} &rarr;</Link>
          ) : (
            <div />
          )}
        </div> */}
        <Pagination
          prevText={prevPost?.title}
          prevUrl={prevPost ? `/blog/${prevPost.slug}` : ""}
          nextText={nextPost?.title}
          nextUrl={nextPost ? `/blog/${nextPost.slug}` : ""}
        />
      </article>
    </Container>
  );
}
