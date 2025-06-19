'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    const orderNum = searchParams.get('orderNumber');
    if (orderNum) {
      setOrderNumber(orderNum);
    }
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">주문이 완료되었습니다!</h1>
        <p className="text-xl text-gray-600">계좌이체 안내 이메일을 확인해주세요</p>
      </div>

      {orderNumber && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">📋 주문 정보</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">주문번호:</span> {orderNumber}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">상품:</span> 레인보우리치 프로그램
            </p>
            <p className="text-gray-700">
              <span className="font-medium">결제금액:</span> 50,000원
            </p>
          </div>
        </div>
      )}

      {/* 계좌이체 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 계좌이체 안내</h2>
        
        <div className="bg-white border border-blue-300 rounded-md p-4 mb-4">
          <h3 className="font-bold text-gray-900 mb-3">📋 입금 계좌 정보</h3>
          <div className="space-y-1">
            <p className="text-lg font-medium text-gray-900">우리은행 1002-852-776368</p>
            <p className="text-gray-700">예금주: 이건희</p>
            <p className="text-lg font-bold text-blue-600">입금액: 50,000원</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
          <h3 className="font-bold text-blue-800 mb-2">💡 입금자명 안내</h3>
          <div className="space-y-1 text-blue-700">
            <p><strong>입금자명:</strong> 고객명으로 입금해주세요</p>
            <p className="text-sm">예시: 홍길동</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <p className="text-gray-700">위 계좌로 50,000원을 입금해주세요</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <p className="text-gray-700">입금자명에 <strong>고객명</strong>으로 입금해주세요</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <p className="text-gray-700">입금 확인 후 <strong>24시간 이내</strong> 프로그램을 이메일로 전송드립니다</p>
          </div>
        </div>
      </div>

      {/* 이메일 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📧 이메일 확인</h2>
        <div className="space-y-2">
          <p className="text-gray-700">주문 확인 및 계좌이체 안내 이메일이 발송되었습니다.</p>
          <p className="text-gray-700">이메일이 도착하지 않았다면 <strong>스팸함</strong>을 확인해주세요.</p>
          <p className="text-sm text-gray-600">Gmail, Naver 등 일부 메일에서는 스팸으로 분류될 수 있습니다.</p>
        </div>
      </div>

      {/* 배송 및 지원 안내 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📦 배송 및 지원</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">입금 확인 후 24시간 이내 이메일로 프로그램 파일 전송</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">설치 및 사용 가이드 포함</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">평생 무료 업데이트 제공</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">이메일 기술 지원 (rainbowcr55@gmail.com)</p>
          </div>
        </div>
      </div>

      {/* 문의 정보 */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">문의사항이 있으시나요?</h3>
        <p className="text-gray-600 mb-4">언제든지 연락주세요!</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>이메일:</strong> rainbowcr55@gmail.com</p>
          <p><strong>운영시간:</strong> 평일 9:00-18:00 (주말, 공휴일 제외)</p>
          <p className="text-xs text-gray-500">일반적으로 2-4시간 이내 답변드립니다.</p>
        </div>

        <div className="mt-8">
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block mr-4"
          >
            홈페이지로 돌아가기
          </Link>
          <Link 
            href="/contact"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-12 text-center">로딩 중...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
} 