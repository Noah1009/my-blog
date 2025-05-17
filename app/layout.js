// app/layout.js
import "@/styles/global.css";
import Analytics from "@/components/Analytics";
import Header from "@components/header";
import Footer from "@components/footer";
import { siteMeta } from "@/lib/constants";

export const metadata = {
  title: siteMeta.siteTitle,
  description: siteMeta.siteDesc,
  openGraph: {
    title: siteMeta.siteTitle,
    description: siteMeta.siteDesc,
    url: siteMeta.siteUrl,
    siteName: siteMeta.siteTitle,
    images: [
      {
        url: `${siteMeta.siteUrl}/images/ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang={siteMeta.siteLang}>
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
