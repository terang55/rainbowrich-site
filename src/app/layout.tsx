import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "./analytics";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
    template: "%s | 레인보우리치"
  },
  description: "부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장. 500명 이상이 검증한 프로그램으로 급매 기회를 놓치지 마세요.",
  keywords: [
    "부동산 투자", "아파트 매물", "엑셀 자동저장", "부동산 프로그램", 
    "매물 분석", "부동산 중개", "투자 도구", "레인보우리치", 
    "부동산 데이터", "매물 관리", "부동산 자동화", "투자 분석",
    "네이버 부동산", "직방", "다방", "매물 크롤링", "부동산 툴",
    "아파트 시세", "전세 매매", "부동산 빅데이터", "매물 추천",
    "부동산 AI", "투자 수익률", "갭투자", "영끌", "부동산 스크래핑",
    "급매", "경매", "공매", "임장", "수익률 계산", "ROI 분석"
  ],
  authors: [{ name: "레인보우리치" }],
  creator: "레인보우리치",
  publisher: "레인보우리치",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://rainbowrich.site',
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://rainbowrich.site",
    title: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
    description: "부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장. 500명 이상이 검증한 프로그램으로 급매 기회를 놓치지 마세요.",
    siteName: "레인보우리치",
    images: [
      {
        url: "https://rainbowrich.site/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
    description: "부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장.",
    images: ["https://rainbowrich.site/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code", // 나중에 Google Search Console에서 받을 코드
  },
  category: "technology",
  applicationName: "레인보우리치",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL('https://rainbowrich.site'),
  icons: {
    icon: [
      { url: '/favicon.ico?v=1', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 웹마스터도구 인증 메타태그 */}
        <meta name="naver-site-verification" content="f8d19522a1459a867dfef4d71aff96c371910a07" />
        
        {/* 추가 SEO 메타태그 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="light" />
        
        {/* 지역 및 언어 SEO */}
        <meta name="geo.region" content="KR" />
        <meta name="geo.country" content="Korea" />
        <meta name="language" content="ko" />
        
        {/* 부동산 특화 메타태그 */}
        <meta name="subject" content="부동산 투자 자동화 프로그램" />
        <meta name="topic" content="아파트 매물 데이터 수집" />
        <meta name="summary" content="부동산 투자를 위한 매물 정보 자동 수집 및 분석 도구" />
        
        {/* 소셜 미디어 최적화 */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="twitter:site" content="@rainbowrich" />
        <meta name="twitter:creator" content="@rainbowrich" />
        
        {/* PWA 매니페스트 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* 향상된 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "레인보우리치",
              "description": "부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장하는 프로그램",
              "url": "https://rainbowrich.site",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Windows",
              "offers": {
                "@type": "Offer",
                "price": "50000",
                "priceCurrency": "KRW",
                "availability": "https://schema.org/InStock",
                  "url": "https://rainbowrich.site/order"
              },
              "creator": {
                "@type": "Organization",
                "name": "레인보우리치",
                "url": "https://rainbowrich.site"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "500"
              }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "레인보우리치",
                "url": "https://rainbowrich.site",
                "description": "부동산 투자 자동화 프로그램 개발사",
                "sameAs": [
                  "https://rainbowrich.site"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "레인보우리치",
                "url": "https://rainbowrich.site",
                "description": "아파트 매물 엑셀 자동저장 프로그램",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://rainbowrich.site/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        <NavBar />
        
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2023 레인보우리치. All rights reserved.</p>
              <p className="mt-2">부동산 투자의 새로운 패러다임</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
