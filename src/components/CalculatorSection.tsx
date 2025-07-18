'use client';

import Link from 'next/link';
import CalculatorCard from './CalculatorCard';

const featuredCalculators = [
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
  }
];

export default function CalculatorSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <span className="mr-2">🧮</span>
            무료 부동산 계산기
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            투자 결정을 도와주는 부동산 계산기
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            전문적인 부동산 투자 분석을 위한 5가지 무료 부동산 계산기를 제공합니다
          </p>
        </div>

        {/* 계산기 카드들 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCalculators.map((calc) => (
            <CalculatorCard key={calc.id} {...calc} />
          ))}
        </div>

        {/* 더 보기 버튼 */}
        <div className="text-center">
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            모든 계산기 보기
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* 통계 */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">5개</div>
            <div className="text-sm text-gray-600">전문 계산기</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">무료 이용</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">실시간</div>
            <div className="text-sm text-gray-600">결과 분석</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">전문가</div>
            <div className="text-sm text-gray-600">수준 조언</div>
          </div>
        </div>
      </div>
    </section>
  );
}