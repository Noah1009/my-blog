// components/Analytics.js
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    if (!window.gtag) return;

    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      {/* gtag.jsの読込み(非同期)</> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* 初期化スクリプト */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            `}
      </Script>
    </>
  );
}
