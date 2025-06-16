import { getNotionPage } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "구매/문의",
  description: "레인보우리치 프로그램 구매 및 문의사항은 여기서! 크몽을 통한 안전한 결제, 이메일 및 블로그를 통한 지원. FAQ와 상세한 연락처 정보를 확인하세요.",
  keywords: ["레인보우리치 구매", "프로그램 문의", "크몽 결제", "고객지원", "FAQ"],
  openGraph: {
    title: "구매/문의 | 레인보우리치",
    description: "레인보우리치 프로그램 구매 및 문의사항은 여기서! 크몽을 통한 안전한 결제, 이메일 및 블로그를 통한 지원. FAQ와 상세한 연락처 정보를 확인하세요.",
    url: "https://rainbowrich.site/contact",
  },
};

export default async function Contact() {
  // 환경변수 확인
  const apiKey = process.env.NOTION_API_KEY;
  const pageId = process.env.NOTION_CONTACT_PAGE_ID;

  console.log('Contact API Key exists:', !!apiKey);
  console.log('Contact Page ID:', pageId);

  if (!apiKey || !pageId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">구매/문의</h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notion API 설정이 필요합니다</h2>
            <p className="text-gray-700">
              환경변수 파일(.env.local)에 NOTION_API_KEY와 NOTION_CONTACT_PAGE_ID를 설정해주세요.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보</h3>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900">이메일</h4>
                <p className="text-gray-700">support@rainbowrich.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">크몽</h4>
                <a href="https://kmong.com/gig/540283" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  https://kmong.com/gig/540283
                </a>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">구매/문의</h1>
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