// app/blog/category/[slug]/page.js

import { getAllCategories, getPostsByCategorySlug } from "@/lib/api"; // ★ import修正
import { notFound } from "next/navigation"; // ★ 追加
import Container from "@/components/container";
import PostHeader from "@/components/post-header";
import Posts from "@/components/posts";
import { eyecatchLocal } from "@/lib/constants";
import Meta from "@/components/meta";
import CategoryViewTracker from "@/components/CategoryViewTracker";
// import styles from "@/styles/category.module.css";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params; // ★ await不要
  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return { title: "カテゴリーが見つかりません" };
  }

  return {
    title: `${category.name}の記事一覧`,
    description: `${category.name}に関する記事の一覧ページです。`, // ★ discription -> description
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params; // ★ await不要
  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  let posts = await getPostsByCategorySlug(category.id); // ★ 関数名修正

  // アイキャッチがない記事にはローカルアイキャッチをセット
  posts = await Promise.all(
    posts.map(async (post) => {
      if (!post.eyecatch) {
        post.eyecatch = {
          ...eyecatchLocal,
          blurDataURL: "", // ローカル画像だからblur生成はここではしない
        };
      }
      return post;
    })
  );

  return (
    <Container>
      <CategoryViewTracker categoryName={category.name} />
      <Meta
        pageTitle={`${category.name}の記事一覧`}
        pageDesc={`${category.name}に関する記事の一覧ページです。`}
        pageImg={eyecatchLocal.url}
        pageImgW={eyecatchLocal.width}
        pageImgH={eyecatchLocal.height}
        pageUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/category/${slug}`}
      />
      <PostHeader title={category.name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  );
}
