// app/page.js
"use client";

import { useState, useEffect } from "react";
import Meta from "@components/meta";
import Container from "@components/container";
import Hero from "@components/hero"; // エイリアス設定に合わせる
import PageLayout from "@components/PageLayout"; // 共通レイアウトを使う場合
// import ImageOn from "@components/ImageOn";

export default function Home() {
  // imageOnを定着
  const [imageOn, setImageOn] = useState(false);

  // コンポーネントがマウントされたら　true　にする
  useEffect(() => {
    setImageOn(true);
  }, []);

  return (
    <Container>
      <Meta />
      <Hero
        title="CUBE"
        subtitle="アウトプットしていくサイト"
        imageOn={imageOn} //imageOn　を　props　に渡す
      />
      {/* ホームページ固有の内容 */}
    </Container>
  );
}
