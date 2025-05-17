// components/CategoryViewTracker.js
"use client";

import { useEffect } from "react";
import { event } from "@/lib/gtag";

export default function CategoryViewTracker({ categoryName }) {
  useEffect(() => {
    event({
      action: "view_category_page",
      category: "Category",
      label: categoryName,
    });
  }, [categoryName]);

  return null;
}
