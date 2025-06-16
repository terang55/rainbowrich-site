import { getNotionPage } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';

export default async function Contact() {
  const apiKey = process.env.NOTION_API_KEY;
  const pageId = process.env.NOTION_CONTACT_PAGE_ID;

  if (!apiKey || !pageId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">구매/문의</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Notion API 설정이 필요합니다</h2>
          <p className="text-gray-700">
            환경변수 파일(.env.local)에 NOTION_API_KEY와 NOTION_CONTACT_PAGE_ID를 설정해주세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 구매하기</h3>
            <p className="text-gray-700 mb-4">
              레인보우리치 프로그램을 지금 바로 구매하세요.
            </p>
            <a 
              href="https://kmong.com/gig/540283" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              크몽에서 구매하기
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📧 문의하기</h3>
            <p className="text-gray-700 mb-4">
              궁금한 점이 있으시면 언제든 문의해주세요.
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 이메일: olaf55@naver.com</p>
              <p>📝 블로그: blog.naver.com/olaf55</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    const blocks = await getNotionPage(pageId);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">구매/문의</h1>
        <NotionRenderer blocks={blocks} />
      </div>
    );
  } catch (error) {
    console.error('문의 페이지 로딩 오류:', error);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">구매/문의</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">페이지 로딩 오류</h2>
          <p className="text-red-700">
            문의 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }
} 