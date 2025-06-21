import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "부동산 투자 가이드 - 레인보우리치 블로그",
  description: "부동산 투자 성공 노하우, 매물 분석 방법, 시장 동향 분석 등 전문가가 알려주는 실전 투자 가이드를 확인하세요.",
  keywords: [
    "부동산 투자 가이드", "아파트 투자 방법", "부동산 시장 분석", "매물 분석 노하우",
    "부동산 투자 전략", "아파트 시세 분석", "갭투자 방법", "부동산 데이터 활용법",
    "투자 수익률 계산", "부동산 투자 팁", "매물 선별 기준", "부동산 투자 성공사례"
  ],
  openGraph: {
    title: "부동산 투자 가이드 - 레인보우리치 블로그",
    description: "부동산 투자 성공 노하우와 매물 분석 방법을 전문가가 알려드립니다.",
    url: "https://rainbowrich.site/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://rainbowrich.site/blog",
  },
};

const blogPosts = [
  {
    id: 1,
    title: "2024년 부동산 투자 전망과 전략",
    excerpt: "올해 부동산 시장 동향을 분석하고 성공적인 투자 전략을 제시합니다.",
    date: "2024-06-21",
    readTime: "5분",
    category: "시장분석",
    slug: "2024-real-estate-outlook"
  },
  {
    id: 2,
    title: "아파트 매물 분석 체크리스트 10가지",
    excerpt: "좋은 매물을 선별하기 위한 필수 체크포인트를 정리했습니다.",
    date: "2024-06-20",
    readTime: "7분",
    category: "투자노하우",
    slug: "apartment-analysis-checklist"
  },
  {
    id: 3,
    title: "갭투자 성공 사례와 주의사항",
    excerpt: "실제 갭투자 성공 사례를 통해 배우는 투자 노하우와 리스크 관리법",
    date: "2024-06-19",
    readTime: "6분",
    category: "성공사례",
    slug: "gap-investment-success-cases"
  },
  {
    id: 4,
    title: "부동산 데이터 활용법 - 엑셀 분석 팁",
    excerpt: "레인보우리치로 수집한 데이터를 효과적으로 분석하는 방법을 알려드립니다.",
    date: "2024-06-18",
    readTime: "8분",
    category: "데이터분석",
    slug: "excel-data-analysis-tips"
  },
  {
    id: 5,
    title: "초보자를 위한 부동산 투자 시작하기",
    excerpt: "부동산 투자가 처음이신 분들을 위한 기초 가이드입니다.",
    date: "2024-06-17",
    readTime: "10분",
    category: "초보가이드",
    slug: "beginner-real-estate-guide"
  },
  {
    id: 6,
    title: "지역별 아파트 시세 동향 분석",
    excerpt: "서울, 경기, 인천 주요 지역의 아파트 시세 변화를 분석합니다.",
    date: "2024-06-16",
    readTime: "12분",
    category: "시장분석",
    slug: "regional-apartment-price-trends"
  }
];

const categories = ["전체", "시장분석", "투자노하우", "성공사례", "데이터분석", "초보가이드"];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          부동산 투자 가이드
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          전문가가 알려주는 부동산 투자 성공 노하우와 실전 팁을 확인하세요
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* 블로그 포스트 그리드 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  자세히 보기 →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA 섹션 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          더 효율적인 부동산 투자를 원하시나요?
        </h2>
        <p className="text-gray-700 mb-6">
          레인보우리치 프로그램으로 매물 분석 시간을 90% 단축하세요
        </p>
        <div className="space-x-4">
          <a
            href="/sample"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            무료 샘플 받기
          </a>
          <a
            href="/order"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            프로그램 구매하기
          </a>
        </div>
      </div>

      {/* SEO를 위한 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "레인보우리치 부동산 투자 가이드",
            "description": "부동산 투자 성공 노하우와 매물 분석 방법을 전문가가 알려드리는 블로그",
            "url": "https://rainbowrich.site/blog",
            "publisher": {
              "@type": "Organization",
              "name": "레인보우리치",
              "url": "https://rainbowrich.site"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "url": `https://rainbowrich.site/blog/${post.slug}`,
              "author": {
                "@type": "Organization",
                "name": "레인보우리치"
              }
            }))
          })
        }}
      />
    </div>
  );
} 