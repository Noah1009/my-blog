// app/about/page.tsx

// L01
import type { JSX } from "react";
// L02
import Container from "@components/container";
// L03
import Hero from "@components/hero";
// L04
import PostBody from "@components/post-body";
// L05
import Contact from "@components/contact";
// L06
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@components/two-column";
// L07
import Accordion from "@/components/accordion";
// L08
import Image from "next/image";
// L09
import { siteMeta } from "@/lib/constants";
// L10
import type { Metadata } from "next";

// L12
// ✅ Aboutページ用に metadata をサイト内容へ合わせて更新
export const metadata: Metadata = {
  // L15
  title: `このサイトについて | ${siteMeta.siteTitle}`,
  // L16
  description: "純米酒、とくに生酒を中心に綴る私的なテイスティング・ログ。",
  // L17
  openGraph: {
    // L19
    title: `このサイトについて | ${siteMeta.siteTitle}`,
    // L20
    description: "純米酒、とくに生酒を中心に綴る私的なテイスティング・ログ。",
    // L21
    url: `${siteMeta.siteUrl}/about`,
    // L22
    siteName: siteMeta.siteTitle,
    // L23
    images: [
      {
        // L25
        url: `${siteMeta.siteUrl}/images/about.jpg`,
        // L26
        width: 1200,
        // L27
        height: 630,
      },
    ],
  },
};

// L33
export default function About(): JSX.Element {
  return (
    <Container>
      {/* L37 */}
      {/* ✅ Hero文言を日本酒サイトに合わせて変更 */}
      <Hero title="About this site" subtitle="―― 瓶は残せねど、記録は尽きず。" />

      {/* L41 */}
      <figure style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        <Image
          src="/images/about-ogp.jpg"
          alt="About Image"
          fill
          sizes="(min-width: 1152px) 1152px,100vw"
          priority
          style={{ objectFit: "cover" }}
        />
      </figure>

      {/* L53 */}
      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            {/* L57 */}
            <h2>このサイトについて</h2>
            {/* L59 */}
            {/* <p>―― 瓶は残せねど、記録は尽きず。</p> */}
            {/* L61 */}
            <p>
              このサイトは、日本酒（特に純米酒）の奥深さに魅了された一人の会社員による、私的なテイスティング・ログです。
            </p>
            {/* L65 */}
            <p>
              当初は気に入った銘柄の空きボトルをコレクションしようと試みましたが、
              <strong>「居住スペースの限界」</strong>
              という壁に直面しました。
            </p>
            {/* L70 */}
            <p>
              妻との真剣な家族会議の結果、「物理的なボトルではなく、デジタルな記録として思い出を残す」という解決策に辿り着き、このサイトを開設しました。
            </p>
            {/* L74 */}
            <p>
              一本一本のお酒との出会いを大切に、その味わいと感動をここに書き留めています。
            </p>

            {/* L78 */}
            <h2>日本酒にハマったきっかけ</h2>
            {/* L80 */}
            <p>
              すべては、年末の親族の集まりで義兄から振る舞われた一杯、
              <strong>「新政 X-TYPE No.6」</strong>から始まりました。
            </p>
            {/* L84 */}
            <p>
              それまでの日本酒の概念を覆すような衝撃的な味わいに心打たれ、気づけば義兄と義父が繰り広げる深い酒談義に夢中になっていました。
            </p>
            {/* L88 */}
            <p>
              「もっと知りたい、もっと飲んでみたい」。
              その日を境に、自ら全国の純米酒を探し求める日々がスタートしました。
            </p>

            {/* L93 */}
            <h2>私の楽しみ方</h2>
            {/* L95 */}
            <p>
              特に<strong>「生酒」</strong>を好んで購入します。生酒ならではのフレッシュさはもちろんですが、
              一番の楽しみは<strong>「時間による表情の変化」</strong>です。
            </p>

            {/* L101 */}
            <ul>
              <li>
                <strong>開栓直後：</strong> ピチピチとしたガス感や、若々しい香り。
              </li>
              <li>
                <strong>3日目以降：</strong> 角が取れ、まろやかに花開く旨味。
              </li>
            </ul>

            {/* L111 */}
            <p>
              同じ一本でも、日を追うごとに変化していく繊細な味わいのグラデーションをじっくりと堪能するのが、私にとっての至福の時間です。
            </p>

            {/* L116 */}
            <h2>FAQ</h2>

            {/* L119 */}
            {/* ✅ FAQをサイト内容に合わせて差し替え */}
            <Accordion heading="記録はどんな基準で書いていますか？">
              <p>
                できるだけ先入観を減らしつつ、開栓日・温度帯・香り・味わい（甘/辛・酸・旨味・苦味・余韻）を中心に、
                後から読み返して「その一本を思い出せる」ことを重視して記録しています。
              </p>
            </Accordion>

            {/* L128 */}
            <Accordion heading="生酒はすぐ飲み切らないとダメですか？">
              <p>
                状態や保管環境にもよりますが、私の場合は「変化を楽しむ」前提で数日かけて飲むことがあります。
                開栓直後のフレッシュさ、数日後のまとまり方など、同じ酒でも印象が変わるのが面白いところです。
              </p>
            </Accordion>

            {/* L136 */}
            <Accordion heading="初心者でも参考になりますか？">
              <p>
                専門用語に寄りすぎないよう、できるだけ日常の言葉で表現する方針です。
                「この銘柄はどんな方向性か」「どう飲むと楽しめそうか」が伝わるように書いています。
              </p>
            </Accordion>

            {/* L144 */}
            <Accordion heading="このサイトの更新頻度は？">
              <p>
                飲んだタイミングで随時更新しています。無理なく続けることを最優先にしつつ、
                できるだけ「出会った一本は記録する」ことを目標にしています。
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
