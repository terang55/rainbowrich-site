'use client';

export default function OrderPage() {
  // 구글폼 URL
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1nJc-tLw6ph1ccxl-9p2RWYE4EguPe1EA_UdJ954tjrw/viewform";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">레인보우리치 구매하기</h1>
        <p className="text-lg sm:text-xl text-gray-600 px-2">아파트 매물 엑셀 자동 저장 & 분석 프로그램</p>
      </div>

      {/* 상품 정보 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 주문 상품</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">레인보우리치 프로그램</h3>
          <p className="text-gray-600 mb-4">아파트 매물 정보 엑셀 자동저장 & 분석 도구</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-blue-600">무제한 사용 가능 </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-blue-600">구독 기간 선택 가능</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-blue-600">무제한 업데이트</span>
            </div>
          </div>
        </div>
      </div>

      {/* 구글폼 연결 안내 */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 구매 신청하기</h2>
        
        <div className="space-y-4 mb-8">
          <p className="text-gray-700">아래 버튼을 클릭하시면 구매 신청서로 이동합니다.</p>
          <p className="text-sm text-gray-600">사용기한을 선택하고 결제하시면 이메일로 프로그램을 보내드립니다.</p>
        </div>

        {/* 주문 과정 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📋 구매 과정</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p className="text-gray-700 text-left">신청서 작성 및 사용기한 선택</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p className="text-gray-700 text-left">계좌로 입금후 구글폼 작성 완료</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p className="text-gray-700 text-left">입금 완료 후 이메일로 프로그램 다운로드 링크 전송</p>
            </div>
          </div>
        </div>

        {/* 구글폼 연결 버튼 */}
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
        >
          구독 신청서 작성하기
        </a>
        
        <p className="text-xs text-gray-500 mt-4">새 창에서 열립니다</p>
      </div>

      {/* 추가 안내 */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💡 추가 안내</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• 입금 확인 후 이메일로 프로그램 다운로드 링크 전송</p>
          <p>• 설치 및 사용에 어려움이 있으시면 언제든 문의주세요.</p>
        </div>
      </div>

      {/* 구매 문의 안내 */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>구매 관련 문의: rainbowcr55@gmail.com</p>
        <p> 9:00-22:00 (주말, 공휴일도 언제든지 연락주세요.)</p>
      </div>
    </div>
  );
} 