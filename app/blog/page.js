// app/blog/page.js
"use client";

import { useEffect, useState } from "react";
import Meta from "@components/meta";
import Container from "@components/container";
import Hero from "@components/hero";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/getBlogs")
      .then((res) => res.json())
      .then((data) => {
        console.log("取得成功:", data);
        setBlogs(data.contents); //microCMSは　contents に配列で記事が入っている
      })
      .catch((err) => {
        console.error("取得失敗:", err);
      });
  }, []);

  return (
    <Container>
      <Meta pageTitle="ブログ" pageDesc="ブログ記事一覧" />
      <Hero title="Blog" subtitle="Recent Posts" />

      {/* ブログ記事一覧の表示　*/}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      {/* ブログページ固有の内容 */}
    </Container>
  );
}
