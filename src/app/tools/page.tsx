import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '부동산 투자 계산기 모음 - 무료 도구',
  description: '부동산 투자에 필요한 모든 계산을 한 곳에서! 갭투자 수익률, 전세가율, 대출 이자, ROI 시뮬레이터, 아파트 적정가 계산기를 무료로 이용하세요.',
  keywords: [
    '부동산 계산기 모음', '무료 부동산 도구', '부동산 투자 계산기',
    '갭투자 계산기', '전세가율 계산기', '대출 계산기', 'ROI 계산기',
    '아파트 적정가 계산기', '부동산 투자 도구', '부동산 분석 도구'
  ],
  openGraph: {
    title: '부동산 투자 계산기 모음 - 레인보우리치',
    description: '부동산 투자 성공을 위한 5가지 필수 계산기를 무료로 제공합니다.',
    url: 'https://rainbowrich.site/tools',
  },
  alternates: {
    canonical: 'https://rainbowrich.site/tools',
  },
};

const calculators = [
  {
    id: 'gap-calculator',
    title: '갭투자 수익률 계산기',
    description: '갭투자의 예상 수익률과 현금흐름을 정확하게 계산해보세요',
    icon: '💰',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    features: ['월 현금흐름 계산', '연간 수익률 산출', '투자 회수 기간'],
    popular: true
  },
  {
    id: 'jeonse-ratio',
    title: '전세가율 계산기',
    description: '매매가 대비 전세가 비율을 계산하여 투자 안전성을 판단하세요',
    icon: '📊',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    features: ['전세가율 자동 계산', '지역 평균 비교', '투자 위험도 평가']
  },
  {
    id: 'loan-calculator',
    title: '대출 이자 계산기',
    description: '주택담보대출의 월 상환액과 총 이자를 미리 계산해보세요',
    icon: '🏦',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    features: ['월 상환액 계산', '총 이자 비용', '상환 스케줄']
  },
  {
    id: 'roi-simulator',
    title: '투자 수익률 시뮬레이터',
    description: '다양한 시나리오별 투자 수익률을 시뮬레이션해보세요',
    icon: '📈',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    features: ['시나리오 분석', '리스크 평가', '수익률 비교']
  },
  {
    id: 'fair-price',
    title: '아파트 적정가 계산기',
    description: '시세 분석을 통해 아파트의 적정 매매가를 산출해보세요',
    icon: '🏠',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    features: ['시세 기반 적정가', '협상 가격 제안', '투자 가치 평가']
  }
];

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          부동산 투자 계산기 모음
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          부동산 투자 성공을 위한 필수 계산기들을 무료로 제공합니다
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <span className="mr-2">🎁</span>
          모든 계산기 100% 무료 이용
        </div>
      </div>

      {/* 계산기 그리드 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {calculators.map((calc) => (
          <Link
            key={calc.id}
            href={`/tools/${calc.id}`}
            className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {calc.popular && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                인기
              </div>
            )}
            
            <div className="p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${calc.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{calc.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {calc.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {calc.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {calc.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className={`inline-flex items-center px-4 py-2 ${calc.color} ${calc.hoverColor} text-white rounded-lg font-medium transition-colors group-hover:shadow-lg`}>
                계산하기
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 사용법 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          💡 계산기 사용법
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">계산기 선택</h3>
            <p className="text-sm text-gray-600">목적에 맞는 계산기를 선택하세요</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">정보 입력</h3>
            <p className="text-sm text-gray-600">필요한 정보를 정확히 입력하세요</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">결과 확인</h3>
            <p className="text-sm text-gray-600">상세한 분석 결과를 확인하세요</p>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          더 정확한 분석이 필요하신가요?
        </h2>
        <p className="text-blue-100 mb-6 text-lg">
          레인보우리치 프로그램으로 실제 매물 데이터를 자동 수집하고 분석하세요
        </p>
        <div className="space-x-4">
          <Link
            href="/sample"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            무료 샘플 받기
          </Link>
          <Link
            href="/order"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            프로그램 구매하기
          </Link>
        </div>
      </div>

      {/* SEO를 위한 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "부동산 투자 계산기 모음",
              "description": "부동산 투자에 필요한 모든 계산을 한 곳에서 할 수 있는 무료 계산기 모음",
              "url": "https://rainbowrich.site/tools",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "creator": {
                "@type": "Organization",
                "name": "레인보우리치"
              },
              "hasFeature": calculators.map(calc => ({
                "@type": "SoftwareFeature",
                "name": calc.title,
                "description": calc.description
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "부동산 투자 계산기 목록",
              "description": "무료 부동산 투자 계산기 5종 세트",
              "numberOfItems": calculators.length,
              "itemListElement": calculators.map((calc, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "WebApplication",
                  "name": calc.title,
                  "description": calc.description,
                  "url": `https://rainbowrich.site/tools/${calc.id}`,
                  "applicationCategory": "FinanceApplication"
                }
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "부동산 계산기는 무료인가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "네, 모든 부동산 투자 계산기는 100% 무료로 제공됩니다. 회원가입이나 결제 없이 바로 사용하실 수 있습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "어떤 계산기들이 있나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "갭투자 수익률 계산기, 전세가율 계산기, 대출 이자 계산기, ROI 시뮬레이터, 아파트 적정가 계산기 총 5가지를 제공합니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "계산 결과는 정확한가요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "전문적인 부동산 평가 방법론을 기반으로 계산하며, 참고용으로 사용하시기 바랍니다. 실제 투자 결정 시에는 전문가와 상담하세요."
                  }
                }
              ]
            }
          ])
        }}
      />
    </div>
  );
}