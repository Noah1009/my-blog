// app/blog/category/page.js

import { getAllCategories } from "@/lib/api";
import Container from "@/components/container";
import styles from "@/styles/category-list.module.css";
import PostHeader from "@/components/post-header";
import CategoryLink from "@/components/CategoryLink";
import { siteMeta } from "@/lib/constants";

export const metadata = {
  title: "カテゴリー一覧",
  description: "記事カテゴリー一覧のページです。",
  openGraph: {
    title: "カテゴリー一覧",
    description: "記事カテゴリー一覧のページです。",
    url: `${siteMeta.siteUrl}/blog/category`,
  },
  twitter: {
    card: "summary_large_image",
    title: "カテゴリー一覧",
    description: "記事カテゴリー一覧のページです。",
  },
};

export default async function CategoryListPage() {
  const categories = await getAllCategories();

  return (
    <Container>
      <PostHeader title="カテゴリー一覧" subtitle="Category List" />
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.listItem}>
            <CategoryLink slug={category.slug} name={category.name} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
