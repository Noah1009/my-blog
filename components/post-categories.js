// components/post-categories.js
import styles from "styles/post-categories.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

export default function PostCategories({ categories = [] }) {
  const safeCategories = Array.isArray(categories)
    ? categories.filter((c) => c && c.name && c.slug)
    : [];

  return (
    <div className={styles.flexContainer}>
      {/* カテゴリ見出し */}
      <h3 className={styles.heading}>
        <FontAwesomeIcon
          icon={faFolderOpen}
          style={{ fontSize: "1rem", width: "1.25em", height: "1.25em" }}
        />
        <span className="sr-only">Categories</span>
      </h3>

      {/* カテゴリリスト */}
      <ul className={styles.list}>
        {safeCategories.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/blog/category/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
