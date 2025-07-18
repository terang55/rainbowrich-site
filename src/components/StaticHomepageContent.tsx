import Link from 'next/link';
import FAQ from './FAQ';
import CalculatorSection from './CalculatorSection';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

function FeatureCard({ icon, title, description, benefits }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

export default function StaticHomepageContent() {
  return (
    <>
      {/* 히어로 섹션 */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 배경 그래디언트 효과 */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10 rounded-3xl opacity-70"></div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 왼쪽: 텍스트 콘텐츠 */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              레인보우리치
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장.
              <span className="font-semibold text-blue-600"> 500명 이상이 검증한</span> 프로그램으로 급매 기회를 놓치지 마세요.
            </p>
            
            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link 
                href="/sample"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                무료 샘플 신청
              </Link>
              <Link 
                href="/order"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                지금 구매하기
              </Link>
            </div>
            
            <p className="text-sm text-gray-600">
              💎 50,000원 단 한 번 결제로 평생 사용 • 📞 24시간 고객지원
            </p>
          </div>
          
          {/* 오른쪽: 이미지/애니메이션 */}
          <div className="relative mt-8 md:mt-0">
            <div className="bg-white rounded-xl shadow-xl p-4 transform rotate-2 hover:rotate-0 transition-transform">
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-600 font-medium">레인보우리치 대시보드</p>
                </div>
              </div>
            </div>
            
            {/* 플로팅 요소들 */}
            <div className="absolute -top-4 -right-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold animate-bounce">
              신규 기능!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
              90% 시간 절약
            </div>
          </div>
        </div>
      </div>

        {/* 통계 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
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

        {/* 핵심 기능 섹션 */}
        <div className="mb-16">
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
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* 신뢰성 섹션 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ✅ 검증된 신뢰성
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900">업계 1위</h3>
              <p className="text-gray-600">부동산 자동화 도구 분야</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-900">평점 4.8/5.0</h3>
              <p className="text-gray-600">500명+ 사용자 만족도</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900">100% 안전</h3>
              <p className="text-gray-600">데이터 보안 보장</p>
            </div>
          </div>
        </div>

        {/* 최종 CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            무료 샘플로 레인보우리치의 강력한 기능을 직접 체험해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/sample"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📄 무료 샘플 받기
            </Link>
            <Link 
              href="/order"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              💳 바로 구매하기
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ⚡ 결제 후 즉시 다운로드 • 🎯 투자 성공률 300% 향상
          </p>
        </div>
      </div>

      {/* 사용자 후기 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">⭐</span>
              사용자 후기
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              500명 이상이 검증한 프로그램
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              레인보우리치를 사용한 실제 사용자들의 생생한 후기를 확인하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 후기 카드 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                  김OO
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">김OO님</h3>
                  <p className="text-sm text-gray-500">서울 강남구</p>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">
                  ★★★★★
                </div>
              </div>
              <p className="text-gray-600">
                "매물 정보를 일일이 찾아보는 시간이 너무 많이 들었는데, 레인보우리치를 사용하면서 시간이 90% 이상 절약되었습니다. 덕분에 좋은 매물을 빠르게 발견할 수 있었어요."
              </p>
            </div>
            
            {/* 후기 카드 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">
                  박OO
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">박OO님</h3>
                  <p className="text-sm text-gray-500">경기도 분당구</p>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">
                  ★★★★★
                </div>
              </div>
              <p className="text-gray-600">
                "급매 알림 기능이 정말 유용해요. 시세보다 저렴한 매물이 나왔을 때 바로 알림을 받아서 좋은 기회를 놓치지 않게 되었습니다. 투자 수익률도 크게 향상되었어요."
              </p>
            </div>
            
            {/* 후기 카드 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold mr-4">
                  이OO
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">이OO님</h3>
                  <p className="text-sm text-gray-500">부산 해운대구</p>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">
                  ★★★★☆
                </div>
              </div>
              <p className="text-gray-600">
                "데이터 분석 기능이 정말 뛰어납니다. 지역별, 평형별 시세를 한눈에 파악할 수 있어서 투자 결정을 내리는 데 큰 도움이 되었어요. 고객 지원도 매우 친절합니다."
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/reviews"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              모든 후기 보기
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 블로그 섹션 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">📝</span>
              부동산 투자 가이드
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              최신 부동산 투자 정보
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              성공적인 부동산 투자를 위한 전문가의 조언과 최신 시장 동향을 확인하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 블로그 카드 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-blue-500 h-48 flex items-center justify-center text-white text-4xl">
                📈
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">2025년 7월 15일</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2025년 하반기 부동산 시장 전망
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  2025년 하반기 부동산 시장은 어떻게 변화할까요? 금리 정책, 정부 규제, 시장 동향을 종합적으로 분석하여 투자자들이 알아야 할 핵심 정보를 정리했습니다.
                </p>
                <Link 
                  href="/blog/2025-real-estate-trends"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  자세히 보기
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
            
            {/* 블로그 카드 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-green-500 h-48 flex items-center justify-center text-white text-4xl">
                🏠
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">2025년 7월 10일</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  초보자를 위한 부동산 투자 전략
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  부동산 투자를 처음 시작하는 분들을 위한 단계별 가이드입니다. 자금 준비부터 매물 선정, 계약 체결까지 알아야 할 모든 것을 알려드립니다.
                </p>
                <Link 
                  href="/blog/beginner-investment-strategy"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  자세히 보기
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
            
            {/* 블로그 카드 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-purple-500 h-48 flex items-center justify-center text-white text-4xl">
                💰
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">2025년 7월 5일</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  부동산 투자자를 위한 세금 절약 팁
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  부동산 투자에서 세금은 수익률에 큰 영향을 미칩니다. 양도소득세, 종합부동산세, 취득세 등을 최적화하는 합법적인 방법을 알아보세요.
                </p>
                <Link 
                  href="/blog/tax-saving-tips"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  자세히 보기
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/blog"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              모든 글 보기
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 계산기 섹션 */}
      <CalculatorSection />

      {/* FAQ 섹션 */}
      <FAQ />
    </>
  );
}