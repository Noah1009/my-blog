// app/blog/[slug]/page.js
import { getPostBySlug, getAllSlugs } from "@/lib/api";
import { extractText } from "@/lib/extract-text";
import { notFound } from "next/navigation";
import ConvertBody from "@/components/convert-body";
import Container from "@/components/container";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

// OGP用メタデータの動的生成
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

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

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article>
        <h1>{post.title}</h1>
      </article>
    </Container>
  );
}
