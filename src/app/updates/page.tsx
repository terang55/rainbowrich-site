import { getNotionPage } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "업데이트 내역",
  description: "레인보우리치 프로그램의 최신 업데이트 내역을 확인하세요. R2.90부터 R1.1까지 모든 버전의 개선사항과 새로운 기능을 상세히 안내합니다.",
  keywords: ["레인보우리치 업데이트", "프로그램 버전", "새로운 기능", "버그 수정", "개선사항"],
  openGraph: {
    title: "업데이트 내역 | 레인보우리치",
    description: "레인보우리치 프로그램의 최신 업데이트 내역을 확인하세요. R2.90부터 R1.1까지 모든 버전의 개선사항과 새로운 기능을 상세히 안내합니다.",
    url: "https://rainbowrich.site/updates",
  },
};

export default async function Updates() {
  // 환경변수 확인
  const apiKey = process.env.NOTION_API_KEY;
  const pageId = process.env.NOTION_UPDATES_PAGE_ID;

  console.log('Updates API Key exists:', !!apiKey);
  console.log('Updates Page ID:', pageId);

  if (!apiKey || !pageId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">업데이트 내역</h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notion API 설정이 필요합니다</h2>
            <p className="text-gray-700">
              환경변수 파일(.env.local)에 NOTION_API_KEY와 NOTION_UPDATES_PAGE_ID를 설정해주세요.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">최근 업데이트</h3>
            <div className="space-y-6 text-left">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">R2.90 (최신)</h4>
                <p className="text-gray-700">최신 기능 업데이트 및 버그 수정</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">R2.80</h4>
                <p className="text-gray-700">성능 개선 및 안정성 향상</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">R2.70</h4>
                <p className="text-gray-700">새로운 분석 기능 추가</p>
              </div>
            </div>
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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <NotionRenderer blocks={pageData.blocks} />
      </div>
    );
  } catch (error) {
    console.error('페이지 로딩 오류:', error);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">업데이트 내역</h1>
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