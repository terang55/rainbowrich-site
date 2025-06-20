'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "레인보우리치 프로그램은 어떤 부동산 사이트를 지원하나요?",
    answer: "주요 부동산 플랫폼의 매물 정보를 자동으로 엑셀에 저장할 수 있습니다. 클릭 한 번으로 매물 정보, 가격, 면적, 위치 등의 데이터를 체계적으로 관리할 수 있습니다."
  },
  {
    question: "부동산 투자 초보자도 사용할 수 있나요?",
    answer: "네, 매우 쉽습니다. 프로그램 설치 후 간단한 설정만으로 누구나 사용 가능합니다. 부동산 투자 경험이 없어도 매물 분석과 시세 파악이 쉬워집니다."
  },
  {
    question: "프로그램 가격과 구매 방법은?",
    answer: "프로그램 구입문의는 홈페이지 상단의 구매하기 버튼에서 확인 가능합니다."
  },
  {
    question: "엑셀 데이터를 어떻게 활용할 수 있나요?",
    answer: "수집된 데이터로 시세 파악, 급매 확인이 가능합니다. 트래킹 기능을 통해 단지의 시세 변화도 한눈에 파악가능합니다. 분석 툴을 통해 그래프로 시각화하여 한눈에 파악할 수 있습니다."
  },
  {
    question: "프로그램 업데이트는 어떻게 받나요?",
    answer: "정기적으로 무료 업데이트를 제공합니다. 부동산 사이트 변경사항이나 새로운 기능 추가 시 이메일로 업데이트 프로그램을 보내드립니다."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-2">
            레인보우리치 부동산 프로그램에 대한 궁금한 점들을 확인해보세요
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mx-2 sm:mx-0">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <h3 className="font-semibold text-gray-900 pr-3 sm:pr-4 text-sm sm:text-base">
                  {faq.question}
                </h3>
                <span className="text-blue-600 font-bold text-lg sm:text-xl flex-shrink-0">
                  {openItems.includes(index) ? '−' : '+'}
                </span>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 px-4 sm:px-0">
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            더 궁금한 점이 있으시다면 언제든 문의해주세요!
          </p>
          
          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            {/* 무료 샘플 신청하기 버튼 */}
            <a 
              href="/sample" 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span className="mr-2">📄</span>
              무료 샘플 신청하기
            </a>
            
            {/* 구매 문의하기 버튼 */}
            <a 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span className="mr-2">💬</span>
              구매 문의하기
            </a>
          </div>
          
          {/* 추가 안내 텍스트 */}
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            <p className="mb-1">🎁 무료 샘플로 먼저 체험해보세요!</p>
          </div>
        </div>
      </div>

      {/* FAQ 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
} 