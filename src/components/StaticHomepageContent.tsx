import Link from 'next/link';
import FAQ from './FAQ';

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            레인보우리치
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            부동산 투자의 새로운 패러다임! 클릭 한 번으로 아파트 매물 정보를 엑셀에 자동 저장. 
            500명 이상이 검증한 프로그램으로 급매 기회를 놓치지 마세요.
          </p>
          
          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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

      {/* FAQ 섹션 */}
      <FAQ />
    </>
  );
}