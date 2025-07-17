'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorWrapper from '@/components/CalculatorWrapper';

interface CalculationResult {
  // 현금흐름
  monthlyIncome: number;
  monthlyExpense: number;
  monthlyCashFlow: number;
  totalCashFlow: number;
  
  // 매도차익
  capitalGain: number;
  transactionCosts: number;
  netCapitalGain: number;
  
  // 총 수익
  totalProfit: number;
  totalInvestment: number;
  totalReturn: number;
  annualReturn: number;
  
  // 분석
  holdingPeriod: number;
  breakEvenPrice: number;
}

function GapCalculatorContent() {
  const [inputs, setInputs] = useState({
    purchasePrice: '',      // 매수가
    expectedSalePrice: '',  // 예상 매도가
    jeonsePrice: '',        // 전세가
    holdingPeriod: '3',     // 보유기간 (년)
    loanAmount: '',         // 대출금액
    interestRate: '',       // 대출금리
    managementFee: '',      // 관리비
    propertyTax: '',        // 재산세 (연간)
    maintenanceCost: '',    // 유지비 (월간)
    transactionCost: '3'    // 거래비용 (%)
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    // 숫자만 입력 허용 (소수점 포함)
    const numericValue = value.replace(/[^0-9.]/g, '');
    setInputs(prev => ({
      ...prev,
      [field]: numericValue
    }));
    
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!inputs.purchasePrice || parseFloat(inputs.purchasePrice) <= 0) {
      newErrors.purchasePrice = '매수가를 입력해주세요';
    }
    if (!inputs.expectedSalePrice || parseFloat(inputs.expectedSalePrice) <= 0) {
      newErrors.expectedSalePrice = '예상 매도가를 입력해주세요';
    }
    if (!inputs.jeonsePrice || parseFloat(inputs.jeonsePrice) <= 0) {
      newErrors.jeonsePrice = '전세가를 입력해주세요';
    }
    if (!inputs.loanAmount || parseFloat(inputs.loanAmount) < 0) {
      newErrors.loanAmount = '대출금액을 입력해주세요 (0 이상)';
    }
    // 대출이 있는 경우에만 금리 검증
    if (inputs.loanAmount && parseFloat(inputs.loanAmount) > 0) {
      if (!inputs.interestRate || parseFloat(inputs.interestRate) <= 0) {
        newErrors.interestRate = '대출이 있는 경우 대출금리를 입력해주세요';
      }
    }

    // 전세가가 매매가보다 큰 경우
    if (inputs.purchasePrice && inputs.jeonsePrice) {
      if (parseFloat(inputs.jeonsePrice) >= parseFloat(inputs.purchasePrice)) {
        newErrors.jeonsePrice = '전세가는 매매가보다 작아야 합니다';
      }
    }

    // 대출금액이 매매가보다 큰 경우
    if (inputs.purchasePrice && inputs.loanAmount) {
      if (parseFloat(inputs.loanAmount) > parseFloat(inputs.purchasePrice)) {
        newErrors.loanAmount = '대출금액은 매매가보다 작아야 합니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateGapInvestment = () => {
    if (!validateInputs()) return;

    const purchasePrice = parseFloat(inputs.purchasePrice) * 10000; // 만원 → 원
    const expectedSalePrice = parseFloat(inputs.expectedSalePrice) * 10000;
    const jeonsePrice = parseFloat(inputs.jeonsePrice) * 10000;
    const holdingPeriod = parseFloat(inputs.holdingPeriod);
    const loanAmount = parseFloat(inputs.loanAmount || '0') * 10000;
    const interestRate = parseFloat(inputs.interestRate || '0') / 100;
    const managementFee = parseFloat(inputs.managementFee || '0') * 10000;
    const propertyTax = parseFloat(inputs.propertyTax || '0') * 10000;
    const maintenanceCost = parseFloat(inputs.maintenanceCost || '0') * 10000;
    const transactionCostRate = parseFloat(inputs.transactionCost) / 100;

    // 1. 현금흐름 계산
    // 월 대출 이자 (원리금균등상환 방식)
    let monthlyLoanPayment = 0;
    if (loanAmount > 0 && interestRate > 0) {
      const monthlyInterestRate = interestRate / 12;
      const loanPeriod = 30 * 12; // 30년
      monthlyLoanPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriod)) / 
                          (Math.pow(1 + monthlyInterestRate, loanPeriod) - 1);
    }

    // 월 수입 (전세 보증금 운용 수익 - 연 4% 가정)
    const monthlyIncome = (jeonsePrice * 0.04) / 12;

    // 월 지출
    const monthlyExpense = monthlyLoanPayment + managementFee + (propertyTax / 12) + maintenanceCost;

    // 월 현금흐름
    const monthlyCashFlow = monthlyIncome - monthlyExpense;

    // 보유기간 총 현금흐름
    const totalCashFlow = monthlyCashFlow * 12 * holdingPeriod;

    // 2. 매도차익 계산
    const capitalGain = expectedSalePrice - purchasePrice;
    
    // 거래비용 (매수가 기준으로 계산)
    const transactionCosts = purchasePrice * transactionCostRate;
    
    // 순 매도차익
    const netCapitalGain = capitalGain - transactionCosts;

    // 3. 총 수익 계산
    const totalProfit = netCapitalGain + totalCashFlow;
    
    // 총 투자금액 (자기자본 + 거래비용)
    const totalInvestment = (purchasePrice - loanAmount) + (purchasePrice * transactionCostRate);

    // 총 수익률
    const totalReturn = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
    
    // 연평균 수익률 (복리)
    const annualReturn = totalInvestment > 0 ? 
      (Math.pow(1 + (totalProfit / totalInvestment), 1 / holdingPeriod) - 1) * 100 : 0;

    // 손익분기점 매도가
    const breakEvenPrice = purchasePrice + transactionCosts - totalCashFlow;

    const calculationResult: CalculationResult = {
      // 현금흐름
      monthlyIncome: Math.round(monthlyIncome),
      monthlyExpense: Math.round(monthlyExpense),
      monthlyCashFlow: Math.round(monthlyCashFlow),
      totalCashFlow: Math.round(totalCashFlow),
      
      // 매도차익
      capitalGain: Math.round(capitalGain),
      transactionCosts: Math.round(transactionCosts),
      netCapitalGain: Math.round(netCapitalGain),
      
      // 총 수익
      totalProfit: Math.round(totalProfit),
      totalInvestment: Math.round(totalInvestment),
      totalReturn: Math.round(totalReturn * 100) / 100,
      annualReturn: Math.round(annualReturn * 100) / 100,
      
      // 분석
      holdingPeriod: holdingPeriod,
      breakEvenPrice: Math.round(breakEvenPrice)
    };

    setResult(calculationResult);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatWon = (num: number) => {
    if (num >= 100000000) {
      return `${Math.round(num / 100000000 * 10) / 10}억원`;
    } else if (num >= 10000) {
      return `${Math.round(num / 10000)}만원`;
    } else {
      return `${formatNumber(num)}원`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
          <span className="mr-2">💰</span>
          갭투자 전문 계산기
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          갭투자 수익률 계산기
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          갭투자의 예상 수익률과 현금흐름을 정확하게 계산하여 투자 결정을 도와드립니다
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 입력 폼 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📝 투자 정보 입력</h2>
          
          <div className="space-y-4">
            {/* 매수가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                매수가 (만원) *
              </label>
              <input
                type="text"
                value={inputs.purchasePrice}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 50000 (5억원)"
              />
              {errors.purchasePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
              )}
            </div>

            {/* 예상 매도가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예상 매도가 (만원) *
              </label>
              <input
                type="text"
                value={inputs.expectedSalePrice}
                onChange={(e) => handleInputChange('expectedSalePrice', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.expectedSalePrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 55000 (5.5억원)"
              />
              {errors.expectedSalePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.expectedSalePrice}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">매도 시점의 예상 시세를 입력하세요</p>
            </div>

            {/* 보유기간 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                보유기간 (년)
              </label>
              <select
                value={inputs.holdingPeriod}
                onChange={(e) => handleInputChange('holdingPeriod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="1">1년</option>
                <option value="2">2년</option>
                <option value="3">3년</option>
                <option value="4">4년</option>
                <option value="5">5년</option>
                <option value="7">7년</option>
                <option value="10">10년</option>
              </select>
            </div>

            {/* 전세가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전세가 (만원) *
              </label>
              <input
                type="text"
                value={inputs.jeonsePrice}
                onChange={(e) => handleInputChange('jeonsePrice', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.jeonsePrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 40000 (4억원)"
              />
              {errors.jeonsePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.jeonsePrice}</p>
              )}
            </div>

            {/* 대출금액 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대출금액 (만원) *
              </label>
              <input
                type="text"
                value={inputs.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 35000 (3.5억원) 또는 0 (현금 투자)"
              />
              {errors.loanAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">현금으로만 투자하는 경우 0을 입력하세요</p>
            </div>

            {/* 대출금리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대출금리 (연%) *
              </label>
              <input
                type="text"
                value={inputs.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.interestRate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 4.5"
              />
              {errors.interestRate && (
                <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
              )}
            </div>

            {/* 관리비 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                관리비 (만원/월)
              </label>
              <input
                type="text"
                value={inputs.managementFee}
                onChange={(e) => handleInputChange('managementFee', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: 15"
              />
            </div>

            {/* 재산세 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                재산세 (만원/년)
              </label>
              <input
                type="text"
                value={inputs.propertyTax}
                onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: 200"
              />
            </div>

            {/* 유지비 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기타 유지비 (만원/월)
              </label>
              <input
                type="text"
                value={inputs.maintenanceCost}
                onChange={(e) => handleInputChange('maintenanceCost', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: 5"
              />
            </div>

            {/* 거래비용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                거래비용 (%)
              </label>
              <select
                value={inputs.transactionCost}
                onChange={(e) => handleInputChange('transactionCost', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="0">0% (거래비용 없음)</option>
                <option value="2">2% (최소)</option>
                <option value="3">3% (일반적)</option>
                <option value="4">4% (보수적)</option>
                <option value="5">5% (최대)</option>
              </select>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">💡 거래비용 구성</p>
                <div className="text-xs text-blue-600 space-y-1">
                  <div className="flex justify-between">
                    <span>• 취득세 (매수시)</span>
                    <span>~1.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 중개수수료 (매수+매도)</span>
                    <span>~1.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 기타 (등기비, 인지세 등)</span>
                    <span>~0.5%</span>
                  </div>
                  <hr className="my-1 border-blue-200" />
                  <div className="flex justify-between font-medium">
                    <span>총 거래비용</span>
                    <span>{inputs.transactionCost}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculateGapInvestment}
            className="w-full mt-6 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
          >
            갭투자 수익률 계산하기
          </button>
        </div>

        {/* 결과 표시 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📊 계산 결과</h2>
          
          {result ? (
            <div className="space-y-6">
              {/* 총 수익률 요약 */}
              <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">갭투자 총 수익률</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {result.totalReturn >= 0 ? '+' : ''}{result.totalReturn}%
                </div>
                <div className="text-sm text-gray-600">
                  연평균 {result.annualReturn >= 0 ? '+' : ''}{result.annualReturn}% 
                  ({result.holdingPeriod}년 보유)
                </div>
              </div>

              {/* 수익 구성 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">💰 수익 구성</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">매도차익 (시세상승)</span>
                      <span className="font-medium">{formatWon(result.capitalGain)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 pl-2">
                      = 예상 매도가 - 매수가 ({formatWon(parseFloat(inputs.expectedSalePrice) * 10000)} - {formatWon(parseFloat(inputs.purchasePrice) * 10000)})
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span className="text-red-600">거래비용</span>
                      <span className="font-medium">-{formatWon(result.transactionCosts)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 pl-2">
                      = 매수가 × {inputs.transactionCost}% ({formatWon(parseFloat(inputs.purchasePrice) * 10000)} × {inputs.transactionCost}%)
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">순 매도차익</span>
                      <span className="font-medium">{formatWon(result.netCapitalGain)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 pl-2">
                      = 매도차익 - 거래비용 ({formatWon(result.capitalGain)} - {formatWon(result.transactionCosts)})
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span className="text-green-600">보유기간 현금흐름</span>
                      <span className="font-medium">{formatWon(result.totalCashFlow)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 pl-2">
                      = 월 현금흐름 × 12개월 × {result.holdingPeriod}년 ({formatWon(result.monthlyCashFlow)} × 12 × {result.holdingPeriod})
                    </div>
                  </div>
                  
                  <hr className="my-2" />
                  <div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 수익</span>
                      <span className={result.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {result.totalProfit >= 0 ? '+' : ''}{formatWon(result.totalProfit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 pl-2">
                      = 순 매도차익 + 보유기간 현금흐름 ({formatWon(result.netCapitalGain)} + {formatWon(result.totalCashFlow)})
                    </div>
                  </div>
                </div>
              </div>

              {/* 월 현금흐름 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📊 월 현금흐름</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">월 수입 (전세금 운용)</span>
                    <span className="font-medium">+{formatWon(result.monthlyIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">월 지출 (대출이자+관리비 등)</span>
                    <span className="font-medium">-{formatWon(result.monthlyExpense)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>월 순현금흐름</span>
                    <span className={result.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {result.monthlyCashFlow >= 0 ? '+' : ''}{formatWon(result.monthlyCashFlow)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 투자 분석 */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📈 투자 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>총 투자금액</span>
                    <span className="font-medium">{formatWon(result.totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>손익분기점 매도가</span>
                    <span className="font-medium">{formatWon(result.breakEvenPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>보유기간</span>
                    <span className="font-medium">{result.holdingPeriod}년</span>
                  </div>
                </div>
              </div>

              {/* 투자 조언 */}
              <div className={`rounded-lg p-4 border ${
                result.totalReturn >= 15 ? 'bg-green-50 border-green-200' :
                result.totalReturn >= 5 ? 'bg-blue-50 border-blue-200' :
                result.totalReturn >= 0 ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  result.totalReturn >= 15 ? 'text-green-800' :
                  result.totalReturn >= 5 ? 'text-blue-800' :
                  result.totalReturn >= 0 ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  💡 투자 조언
                </h3>
                <div className={`text-sm space-y-1 ${
                  result.totalReturn >= 15 ? 'text-green-700' :
                  result.totalReturn >= 5 ? 'text-blue-700' :
                  result.totalReturn >= 0 ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {result.totalReturn >= 15 && (
                    <>
                      <p>🎉 총 수익률 15% 이상! 매우 우수한 갭투자입니다!</p>
                      <p>✅ 매도차익과 현금흐름이 모두 양호합니다</p>
                    </>
                  )}
                  {result.totalReturn >= 5 && result.totalReturn < 15 && (
                    <>
                      <p>✅ 총 수익률 5% 이상으로 양호한 투자입니다</p>
                      <p>📊 시장 상황을 고려하여 매도 시점을 결정하세요</p>
                    </>
                  )}
                  {result.totalReturn >= 0 && result.totalReturn < 5 && (
                    <>
                      <p>⚠️ 수익률이 낮습니다. 다른 투자 옵션과 비교해보세요</p>
                      <p>📈 시세 상승 여력을 재검토해보세요</p>
                    </>
                  )}
                  {result.totalReturn < 0 && (
                    <>
                      <p>❌ 손실이 예상됩니다. 투자를 재검토하세요</p>
                      <p>🔍 매도가 예상이 너무 낙관적일 수 있습니다</p>
                    </>
                  )}
                  
                  {result.monthlyCashFlow >= 0 ? (
                    <p>💰 월 현금흐름이 양수로 보유 중에도 수익이 발생합니다</p>
                  ) : (
                    <p>⚠️ 월 현금흐름이 음수입니다. 추가 자금 준비가 필요합니다</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-500">
                좌측에 투자 정보를 입력하고<br />
                계산 버튼을 눌러주세요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-3">⚠️ 계산 시 주의사항</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 전세금 운용 수익률은 연 4%로 가정하여 계산됩니다</li>
          <li>• 대출은 30년 원리금균등상환 방식으로 계산됩니다</li>
          <li>• 실제 투자 시에는 취득세, 중개수수료 등 추가 비용을 고려하세요</li>
          <li>• 시세 변동, 공실 위험 등은 계산에 포함되지 않습니다</li>
          <li>• 본 계산기는 참고용이며, 실제 투자 결정 시 전문가와 상담하세요</li>
        </ul>
      </div>

      {/* 다른 계산기 링크 */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">다른 계산기도 사용해보세요</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/tools/jeonse-ratio" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            전세가율 계산기
          </Link>
          <Link href="/tools/loan-calculator" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            대출 이자 계산기
          </Link>
          <Link href="/tools/roi-simulator" className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
            ROI 시뮬레이터
          </Link>
          <Link href="/tools/fair-price" className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
            적정가 계산기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GapCalculatorPage() {
  return (
    <CalculatorWrapper>
      <GapCalculatorContent />
    </CalculatorWrapper>
  );
}