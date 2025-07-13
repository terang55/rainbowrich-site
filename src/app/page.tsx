import { getNotionPage } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import FAQ from '@/components/FAQ';
import StaticHomepageContent from '@/components/StaticHomepageContent';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
  description: "부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장. 500명 이상이 검증한 프로그램으로 급매 기회를 놓치지 마세요. 50,000원 단 한 번 결제로 평생 사용!",
  keywords: ["부동산 투자", "아파트 매물", "엑셀 자동저장", "부동산 프로그램", "매물 분석", "투자 도구"],
  openGraph: {
    title: "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
    description: "부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장. 500명 이상이 검증한 프로그램으로 급매 기회를 놓치지 마세요.",
    url: "https://rainbowrich.site",
  },
};

// export const dynamic = 'force-dynamic'; // SEO 개선을 위해 ISR로 변경
export const revalidate = 3600; // 1시간마다 갱신 (ISR)

export default async function Home() {
  // 환경변수 확인
  const apiKey = process.env.NOTION_API_KEY;
  const pageId = process.env.NOTION_MAIN_PAGE_ID;

  console.log('API Key exists:', !!apiKey);
  console.log('Page ID:', pageId);

  if (!apiKey || !pageId) {
    // Notion API 설정이 없을 때 정적 콘텐츠 제공 (SEO 최적화)
    return <StaticHomepageContent />;
  }

  try {
    const pageData = await getNotionPage(pageId);
    
    if (!pageData) {
      // Notion 데이터 없을 때 정적 콘텐츠 제공 (SEO 최적화)
      return <StaticHomepageContent />;
    }
    
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <NotionRenderer blocks={pageData.blocks} />
        </div>
        <FAQ />
      </>
    );
  } catch (error) {
    console.error('페이지 로딩 오류:', error);
    
    // 에러 발생 시에도 정적 콘텐츠 제공 (SEO 최적화)
    return <StaticHomepageContent />;
  }
}
