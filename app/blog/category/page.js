// app/blog/category/page.js
import { getAllCategories } from "@/lib/api";
import Container from "@/components/container";
import Link from "next/link";
import styles from "@/styles/category-list.module.css";
import Meta from "@/components/meta";
import PostHeader from "@/components/post-header";
import { event } from "@/lib/gtag";
import CategoryLink from "@/components/CategoryLink";

export const metadata = {
  title: "カテゴリー一覧",
  description: "記事カテゴリー一覧のページです。",
};

export default async function CategoryListPage() {
  const categories = await getAllCategories();

  return (
    <Container>
      <Meta
        pageTitle="カテゴリー一覧"
        pageDesc="記事カテゴリー 一覧のページです。"
        pageUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/category`}
      />
      <PostHeader title="カテゴリー 一覧" subtitle="Category List" />
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.listItem}>
            {/* <Link
              href={`/blog/category/${category.slug}`}
              className={styles.card}
              ocClick={() =>
                event({
                  action: "click_category",
                  category: "Category",
                  label: category.name,
                })
              }
            >
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.count}>{category.count}件</span>
              {category.name}
            </Link> */}
            <CategoryLink slug={category.slug} name={category.name} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
