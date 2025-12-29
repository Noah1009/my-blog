// components/meta.tsx

import type { JSX } from 'react'
import Head from 'next/head'
import { siteMeta } from '@/lib/constants'

const { siteTitle, siteDesc, siteUrl,siteLocale, siteType, siteIcon } = siteMeta

type Props = {
  pageTitle?: string
  pageDesc?: string
  pageImg?: string
  pageImgW?: number
  pageImgH?: number
  pageUrl?: string
}

export default function Meta({
  pageTitle,
  pageDesc = siteDesc,
  pageImg = '/images/ogp.jpg',
  pageImgW = 1200,
  pageImgH = 630,
  pageUrl = siteUrl,
}: Props): JSX.Element {
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
  const url = pageUrl

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={pageImg} />
      <meta property="og:image:width" content={pageImgW.toString()} />
      <meta property="og:image:height" content={pageImgH.toString()} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={siteLocale} />
      <link rel="canonical" href={url} />
      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />
    </Head>
  )
}
