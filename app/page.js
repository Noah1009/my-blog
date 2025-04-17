// app/page.js
"use client";

import Meta from "@components/meta";
import Container from "@components/container";
import { useState, useEffect } from "react";
import Hero from "@components/hero"; // エイリアス設定に合わせる
import PageLayout from "@components/PageLayout"; // 共通レイアウトを使う場合
// import ImageOn from "@components/ImageOn";

export default function Home() {
  return (
    <Container>
      <Meta />
      <Hero
        title="CUBE"
        subtitle="アウトプットしていくサイト"
        imageOn={imageOn}
      />{" "}
      {/* imageOn を props として渡す　← 変更（例: 14行目） */}
      {/* ホームページ固有の内容 */}
    </Container>
  );
}
