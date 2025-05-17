// app/about/page.js

import Container from "@components/container";
import Hero from "@components/hero";
import PostBody from "@components/post-body";
import Contact from "@components/contact";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@components/two-column";
import Accordion from "@/components/accordion";
import Image from "next/image";
// import eyecatch from "public/images/about.jpg";
// import Meta from "@components/meta";
import { siteMeta } from "@/lib/constants";

export const metadata = {
  title: "アバウト | ${siteMeta.siteTitle}",
  description: "About development activities",
  openGraph: {
    title: `アバウト | ${siteMeta.siteTitle}`,
    description: "About development activities",
    url: `${siteMeta.siteUrl}/about`,
    siteName: siteMeta.siteTitle,
    images: [
      {
        url: `${siteMeta.siteUrl}/images/about.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function About() {
  return (
    <Container>
      {/* <Meta pageTitle="アバウト" pageDesc="About development activities" /> */}
      <Hero title="About" subtitle="About developments activities" />

      <figure
        style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
      >
        <Image
          src="/images/about.jpg"
          alt="About Image"
          fill
          sizes="(min-width: 1152px) 1152px,100vw"
          priority
          style={{ objectFit: "cover" }}
          // placeholder="blur"
        />
      </figure>

      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            <p>
              Cubeが得意とする分野はものづくりです。3次元から2次元の造形、プログラミングやデザインなど、さまざまな技術を組み合わせることによって社会や環境と結びつけるクリエイティブを提案し続けいています。
            </p>
            <h2>モノづくりで目指していること</h2>
            <p>
              モノづくりではデータの解析からクリエイティブまで幅広いことを目指しています。新しいことを取り入れながら、ユーザーにマッチした提案を実現するのが目標です。たくさんの開発・提供が数多くありますが、特にそこを磨く作業に力を入れています。
            </p>
            <p>
              単純に形にするだけでなく、作る過程や、なぜそのようにしたのかを大事にしながらものづくりをしています。毎回課題解決テーマをもって「モノ」と向き合い制作し、フィードバックしてもらうことで自分の中にあるモヤモヤを言葉にして「問い」への答えを出しています。
            </p>
            <h3>新しいことへのチャレンジ</h3>
            <p>
              今までと違うものを作ることで愛着が湧いていきます。そこで興味を持ったことは小さなことでもいいから取り入れて、良いものを作れるようにしています。小さなヒントから新しいものを生み出すようなモノづくりは、これからも続けていきたいです。
            </p>
            <h2>FAQ</h2>
            <Accordion heading="プログラミングのポイントについて">
              <p>
                プログラミングのポイントは、作りたいものを作ることです。楽しいことから思いつき、目標とゴールを決め、そこに向かってさまざまな課題を設定していきながら、プログラムを作っていきます。
              </p>
            </Accordion>
            <Accordion heading="古代語の解読について">
              <p>
                古代語を解読するのに必要なのは、書かれた文字そのものだけです。古代の世界観や思考方法。
                それらを読み取ってこそ古代の世界感が理解できます。
              </p>
            </Accordion>
            <Accordion heading="公開リポジトリの活用について">
              <p>
                公開リポジトリを活用すると、全世界のどこからでもアクセスし、開発者が関連するプロジェクトのタスクをを利用することができます。
              </p>
            </Accordion>
          </PostBody>
        </TwoColumnMain>

        <TwoColumnSidebar>
          <Contact />
        </TwoColumnSidebar>
      </TwoColumn>
    </Container>
  );
}
