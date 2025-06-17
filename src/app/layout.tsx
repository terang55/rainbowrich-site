import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Analytics from "./analytics";

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
    "부동산 데이터", "매물 관리", "부동산 자동화", "투자 분석"
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
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
        
        {/* PWA 매니페스트 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                "url": "https://kmong.com/gig/540283"
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
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                레인보우리치
              </Link>
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  홈
                </Link>
                <Link href="/updates" className="text-gray-700 hover:text-blue-600 transition-colors">
                  업데이트 내역
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  구매/문의
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 레인보우리치. All rights reserved.</p>
              <p className="mt-2">부동산 투자의 새로운 패러다임</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
