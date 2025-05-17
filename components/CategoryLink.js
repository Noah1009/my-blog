// components/CategoryLink.js

"use client";

import Link from "next/link";
import { event } from "@/lib/gtag";

export default function CategoryLink({ slug, name, className, count }) {
  return (
    <Link
      href={`/blog/category/${slug}`}
      className={className}
      onClick={() =>
        event({
          action: "click_category",
          category: "Category",
          label: name,
        })
      }
    >
      <span className="category-name">{name}</span>
      {count && <span className="category-count">{count}件</span>}
    </Link>
  );
}
