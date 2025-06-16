import { getNotionPage } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';

export default async function Updates() {
  const apiKey = process.env.NOTION_API_KEY;
  const pageId = process.env.NOTION_UPDATES_PAGE_ID;

  if (!apiKey || !pageId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">업데이트 내역</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Notion API 설정이 필요합니다</h2>
          <p className="text-gray-700">
            환경변수 파일(.env.local)에 NOTION_API_KEY와 NOTION_UPDATES_PAGE_ID를 설정해주세요.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">R2.90 (최신)</h3>
            <p className="text-gray-600 mb-4">2024년 최신 업데이트</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>성능 최적화 및 안정성 개선</li>
              <li>새로운 매물 사이트 지원 추가</li>
              <li>사용자 인터페이스 개선</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  try {
    const blocks = await getNotionPage(pageId);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">업데이트 내역</h1>
        <NotionRenderer blocks={blocks} />
      </div>
    );
  } catch (error) {
    console.error('업데이트 페이지 로딩 오류:', error);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">업데이트 내역</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">페이지 로딩 오류</h2>
          <p className="text-red-700">
            업데이트 내역을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }
} 