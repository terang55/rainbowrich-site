import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "기능 소개 - 레인보우리치 아파트 매물 자동저장 프로그램",
  description: "레인보우리치의 강력한 기능들을 확인하세요. 자동 매물 수집, 엑셀 데이터 분석, 시세 추적, 급매 알림 등 부동산 투자에 필요한 모든 기능을 제공합니다.",
  keywords: [
    "부동산 프로그램 기능", "매물 자동수집", "엑셀 데이터 분석", "아파트 시세 추적",
    "급매 알림", "부동산 자동화", "매물 관리", "투자 분석 도구",
    "부동산 데이터 시각화", "매물 비교 분석", "시장 동향 분석", "ROI 계산기"
  ],
  openGraph: {
    title: "레인보우리치 기능 소개 - 부동산 투자의 모든 것",
    description: "자동 매물 수집부터 투자 분석까지, 부동산 투자에 필요한 모든 기능을 한 번에!",
    url: "https://rainbowrich.site/features",
    type: "website",
  },
  alternates: {
    canonical: "https://rainbowrich.site/features",
  },
};

const features = [
  {
    icon: "🏠",
    title: "자동 매물 수집",
    description: "클릭 한 번으로 아파트 매물 정보를 자동으로 엑셀에 저장합니다.",
    benefits: [
      "시간 절약 - 수동 입력 대비 90% 시간 단축",
      "정확성 - 오타나 누락 없는 정확한 데이터",
      "실시간 - 최신 매물 정보 즉시 수집"
    ]
  },
  {
    icon: "📊",
    title: "데이터 분석 도구",
    description: "수집된 매물 데이터를 다양한 방식으로 분석하고 시각화합니다.",
    benefits: [
      "시세 분석 - 지역별, 평형별 상세 시세 분석",
      "트렌드 파악 - 가격 변동 추이 그래프",
      "비교 분석 - 유사 매물 간 비교 분석"
    ]
  },
  {
    icon: "📈",
    title: "투자 수익률 계산",
    description: "매물별 예상 수익률과 투자 리스크를 자동으로 계산합니다.",
    benefits: [
      "ROI 계산 - 정확한 투자 수익률 산출",
      "리스크 분석 - 투자 위험도 평가",
      "현금흐름 - 월별 현금흐름 예측"
    ]
  },
  {
    icon: "🔔",
    title: "급매 알림 시스템",
    description: "시세보다 저렴한 급매 매물을 실시간으로 알려드립니다.",
    benefits: [
      "실시간 알림 - 급매 매물 즉시 알림",
      "맞춤 설정 - 관심 지역 및 조건 설정",
      "기회 포착 - 투자 기회 놓치지 않음"
    ]
  },
  {
    icon: "📋",
    title: "매물 관리 시스템",
    description: "관심 매물을 체계적으로 관리하고 추적할 수 있습니다.",
    benefits: [
      "즐겨찾기 - 관심 매물 북마크 기능",
      "메모 기능 - 매물별 상세 메모 작성",
      "상태 추적 - 매물 상태 변화 추적"
    ]
  },
  {
    icon: "🎯",
    title: "맞춤형 검색 필터",
    description: "다양한 조건으로 원하는 매물을 정확하게 찾을 수 있습니다.",
    benefits: [
      "다중 필터 - 가격, 면적, 지역 등 복합 조건",
      "저장된 검색 - 자주 사용하는 검색 조건 저장",
      "정렬 기능 - 다양한 기준으로 매물 정렬"
    ]
  }
];

const stats = [
  { number: "500+", label: "사용자" },
  { number: "50,000+", label: "수집된 매물" },
  { number: "90%", label: "시간 절약" },
  { number: "24/7", label: "실시간 모니터링" }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            레인보우리치 기능 소개
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            부동산 투자의 모든 과정을 자동화하고 최적화하는 강력한 기능들
          </p>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              핵심 기능들
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              부동산 투자 성공을 위한 모든 도구가 하나의 프로그램에
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            지금 바로 시작하세요!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            무료 샘플로 레인보우리치의 강력한 기능을 직접 체험해보세요
          </p>
          <div className="space-x-4">
            <a
              href="/sample"
              className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
            >
              무료 샘플 받기
            </a>
            <a
              href="/order"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              지금 구매하기
            </a>
          </div>
        </div>
      </section>

      {/* 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "레인보우리치 - 아파트 매물 엑셀 자동저장 프로그램",
            "description": "부동산 투자를 위한 매물 자동수집 및 분석 프로그램",
            "url": "https://rainbowrich.site/features",
            "image": "https://rainbowrich.site/og-image.jpg",
            "brand": {
              "@type": "Brand",
              "name": "레인보우리치"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://rainbowrich.site/order",
              "priceCurrency": "KRW",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "500"
            },
            "hasFeature": features.map(feature => ({
              "@type": "Feature",
              "name": feature.title,
              "description": feature.description
            }))
          })
        }}
      />
    </div>
  );
} 