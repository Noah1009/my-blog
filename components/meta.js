// components/meta.js
"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";

//サイトに関する情報
import { siteMeta } from "lib/constants";
const { siteTitle, siteDesc, siteUrl, siteLocal, siteType, siteIcon } =
  siteMeta;

export default function Meta({ pageTitle, pageDesc }) {
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

  //ページの説明
  const desc = pageDesc ?? siteDesc;

  //ページのURL
  const pathname = usePathname();
  const url = `${siteUrl}${pathname}`;
  // OGP画像のパス
  const ogImage = "/images/ogp.jpg";

  return (
    <Head>
      {/* {文字コードの指定} */}
      <meta charSet="utf-8" />
      {/* {ビューポートの設定} */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* {ページタイトル} */}
      {/* <title>
        {pageTitle} | {siteTitle}
      </title> */}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {/* <meta property="og:title" content={`${pageTitle} | ${siteTitle}`} /> */}
      {/* ページ説明 */}
      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />
      {/* URL */}
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      {/* OGP画像 */}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* その他のOGP設定 */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={siteLocal} />
      {/* ファビコン */}
      <link rel="icon" href="/images/favicon.png" />
      <link rel="apple-touch-icon" href="/images/favicon.png" />
    </Head>
  );
}
