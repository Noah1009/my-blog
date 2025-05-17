// app/blog/category/[slug]/page.js

import { getAllCategories, getPostsByCategorySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import PostHeader from "@/components/post-header";
import Posts from "@/components/posts";
import { eyecatchLocal } from "@/lib/constants";
import CategoryViewTracker from "@/components/CategoryViewTracker";
import { siteMeta } from "@/lib/constants";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return { title: "カテゴリーが見つかりません" };
  }

  return {
    title: `${category.name}の記事一覧`,
    description: `${category.name}に関する記事の一覧ページです。`,
    openGraph: {
      title: `${category.name}の記事一覧`,
      description: `${category.name}に関する記事の一覧ページです。`,
      url: `${siteMeta.siteUrl}/blog/category/${slug}`,
      images: [
        {
          url: eyecatchLocal.url,
          width: eyecatchLocal.width,
          height: eyecatchLocal.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name}の記事一覧`,
      description: `${category.name}に関する記事の一覧ページです。`,
      images: [eyecatchLocal.url],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) notFound();

  let posts = await getPostsByCategorySlug(category.id);

  posts = await Promise.all(
    posts.map(async (post) => {
      if (!post.eyecatch) {
        post.eyecatch = {
          ...eyecatchLocal,
        };
      }
      return post;
    })
  );

  return (
    <Container>
      <CategoryViewTracker categoryName={category.name} />
      <PostHeader title={category.name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  );
}
