import { getNotionPage } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import FAQ from '@/components/FAQ';
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

export const dynamic = 'force-dynamic'; // Notion Signed URL 갱신을 위해 요청마다 재검사

export default async function Home() {
  // 환경변수 확인
  const apiKey = process.env.NOTION_API_KEY;
  const pageId = process.env.NOTION_MAIN_PAGE_ID;

  console.log('API Key exists:', !!apiKey);
  console.log('Page ID:', pageId);

  if (!apiKey || !pageId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">레인보우리치</h1>
          <p className="text-xl text-gray-600 mb-8">아파트 매물 엑셀 자동저장 프로그램</p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notion API 설정이 필요합니다</h2>
            <p className="text-gray-700">
              환경변수 파일(.env.local)에 NOTION_API_KEY와 NOTION_MAIN_PAGE_ID를 설정해주세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 매물 자동저장</h3>
              <p className="text-gray-700">
                아파트 매물 정보를 자동으로 엑셀 파일에 저장하여 효율적인 부동산 투자를 지원합니다.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 데이터 분석</h3>
              <p className="text-gray-700">
                수집된 매물 데이터를 분석하여 투자 기회를 발견할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <a 
              href="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block mr-4"
            >
              지금 구매하기
            </a>
            <br />
            <p className="text-sm text-gray-600">간단한 신청서 작성 후 담당자가 연락드립니다</p>
          </div>
        </div>
      </div>
    );
  }

  try {
    const pageData = await getNotionPage(pageId);
    
    if (!pageData) {
      throw new Error('페이지 데이터를 불러올 수 없습니다.');
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
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">레인보우리치</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">페이지 로딩 오류</h2>
            <p className="text-red-700">
              Notion 페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
