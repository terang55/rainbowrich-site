import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
  description: "부동산 투자의 새로운 패러다임, 레인보우리치로 아파트 매물 정보를 자동으로 엑셀에 저장하세요.",
  keywords: "부동산, 아파트, 매물, 엑셀, 자동저장, 투자, 레인보우리치",
  openGraph: {
    title: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
    description: "부동산 투자의 새로운 패러다임, 레인보우리치로 아파트 매물 정보를 자동으로 엑셀에 저장하세요.",
    type: "website",
    url: "https://rainbowrich.site",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
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
