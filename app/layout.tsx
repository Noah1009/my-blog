// app/layout.tsx

import '@/styles/global.css'
import type { Metadata } from 'next'
import { siteMeta } from '@/lib/constants'
import Analytics from '@/components/Analytics'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ThemeClientProvider from '@/components/ThemeClientProvider'
import Script from 'next/script'
import { savoyeLET, openSans, notoSansJP, lora, notoSerifJP, zenAntiqueSoft } from "@/lib/fonts";

export const metadata: Metadata = {
  title: siteMeta.siteTitle,
  description: siteMeta.siteDesc,
  openGraph: {
    title: siteMeta.siteTitle,
    description: siteMeta.siteDesc,
    url: siteMeta.siteUrl,
    siteName: siteMeta.siteTitle,
    images: [
      {
        url: `${siteMeta.siteUrl}/images/default-ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMeta.siteLang || 'ja'}
      className={`
    ${zenAntiqueSoft.variable}
    ${notoSerifJP.variable}
    ${notoSansJP.variable}
    ${openSans.variable}
    ${lora.variable}
    ${savoyeLET.variable}
  `}
    >
      <body>
        <Script src="/theme-toggle.js" strategy="beforeInteractive" />
        <ThemeClientProvider>
          <Analytics />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeClientProvider>
      </body>
    </html>
  )
}