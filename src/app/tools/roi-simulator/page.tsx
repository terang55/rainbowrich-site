'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorWrapper from '@/components/CalculatorWrapper';

interface Scenario {
  name: string;
  purchasePrice: number;
  appreciationRate: number;
  rentalYield: number;
  expenses: number;
}

interface SimulationResult {
  // 기본 시나리오
  scenarios: {
    name: string;
    year1: number;
    year3: number;
    year5: number;
    year10: number;
    totalReturn: number;
    annualReturn: number;
    risk: 'low' | 'medium' | 'high';
    finalValue: number;
    totalCashFlow: number;
    capitalGain: number;
  }[];
  
  // 세금 고려 분석
  taxAnalysis: {
    capitalGainsTax: number;
    rentalIncomeTax: number;
    netReturn: number;
    effectiveTaxRate: number;
  };
  
  // 인플레이션 조정 분석
  inflationAdjusted: {
    realReturn: number;
    purchasingPower: number;
    inflationImpact: number;
  };
  
  // 리스크 분석
  riskAnalysis: {
    volatility: number;
    maxDrawdown: number;
    sharpeRatio: number;
    riskScore: number;
  };
  
  // 비교 분석
  benchmarkComparison: {
    stockMarket: { return: number; risk: string };
    bonds: { return: number; risk: string };
    deposits: { return: number; risk: string };
    gold: { return: number; risk: string };
  };
  
  // 민감도 분석
  sensitivityAnalysis: {
    priceChange10: { up: number; down: number };
    rentChange20: { up: number; down: number };
    expenseChange30: { up: number; down: number };
  };
  
  bestScenario: string;
  recommendation: string;
}

function ROISimulatorContent() {
  const [inputs, setInputs] = useState({
    initialInvestment: '',     // 초기 투자금
    purchasePrice: '',         // 매매가
    currentRentalIncome: '',   // 현재 임대수입
    annualExpenses: '',        // 연간 관리비용
    simulationPeriod: '5',     // 시뮬레이션 기간
    taxRate: '22',             // 세율 (%)
    inflationRate: '2.5',      // 인플레이션율 (%)
    holdingPeriod: '3',        // 보유기간 (년)
    leverageRatio: '0'         // 레버리지 비율 (%)
  });

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    if (['simulationPeriod', 'taxRate', 'inflationRate', 'holdingPeriod', 'leverageRatio'].includes(field)) {
      setInputs(prev => ({ ...prev, [field]: value }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs(prev => ({ ...prev, [field]: numericValue }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!inputs.initialInvestment || parseFloat(inputs.initialInvestment) <= 0) {
      newErrors.initialInvestment = '초기 투자금을 입력해주세요';
    }
    if (!inputs.purchasePrice || parseFloat(inputs.purchasePrice) <= 0) {
      newErrors.purchasePrice = '매매가를 입력해주세요';
    }
    if (!inputs.currentRentalIncome || parseFloat(inputs.currentRentalIncome) < 0) {
      newErrors.currentRentalIncome = '임대수입을 입력해주세요 (0 이상)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateROI = () => {
    if (!validateInputs()) return;

    const initialInvestment = parseFloat(inputs.initialInvestment) * 10000;
    const purchasePrice = parseFloat(inputs.purchasePrice) * 10000;
    const annualRental = parseFloat(inputs.currentRentalIncome) * 12 * 10000;
    const annualExpenses = parseFloat(inputs.annualExpenses || '0') * 10000;
    const period = parseInt(inputs.simulationPeriod);

    // 다양한 시나리오 설정
    const scenarios: Scenario[] = [
      {
        name: '보수적 시나리오',
        purchasePrice,
        appreciationRate: 0.02, // 연 2% 상승
        rentalYield: annualRental / purchasePrice,
        expenses: annualExpenses
      },
      {
        name: '현실적 시나리오',
        purchasePrice,
        appreciationRate: 0.04, // 연 4% 상승
        rentalYield: annualRental / purchasePrice,
        expenses: annualExpenses
      },
      {
        name: '낙관적 시나리오',
        purchasePrice,
        appreciationRate: 0.06, // 연 6% 상승
        rentalYield: annualRental / purchasePrice,
        expenses: annualExpenses
      },
      {
        name: '비관적 시나리오',
        purchasePrice,
        appreciationRate: -0.01, // 연 1% 하락
        rentalYield: annualRental / purchasePrice * 0.9, // 임대료 10% 감소
        expenses: annualExpenses * 1.2 // 관리비 20% 증가
      }
    ];

    const simulationResults = scenarios.map(scenario => {
      const results = [];
      let currentValue = scenario.purchasePrice;
      let totalCashFlow = 0;

      for (let year = 1; year <= Math.max(period, 10); year++) {
        // 자산 가치 상승
        currentValue *= (1 + scenario.appreciationRate);
        
        // 연간 현금흐름 (임대수입 - 관리비용)
        const annualCashFlow = (scenario.purchasePrice * scenario.rentalYield) - scenario.expenses;
        totalCashFlow += annualCashFlow;

        // 총 수익 = 자산 가치 상승 + 누적 현금흐름 - 초기 투자금
        const totalReturn = (currentValue - scenario.purchasePrice) + totalCashFlow - initialInvestment;
        const roi = (totalReturn / initialInvestment) * 100;

        if (year === 1 || year === 3 || year === 5 || year === 10) {
          results.push({ year, roi: Math.round(roi * 10) / 10 });
        }
      }

      // 연평균 수익률 계산
      const finalReturn = results[results.length - 1]?.roi || 0;
      const annualReturn = Math.round(((Math.pow(1 + finalReturn / 100, 1 / period) - 1) * 100) * 10) / 10;

      // 위험도 평가
      let risk: 'low' | 'medium' | 'high';
      if (scenario.appreciationRate >= 0.04 && scenario.rentalYield >= 0.04) {
        risk = 'low';
      } else if (scenario.appreciationRate >= 0.02 && scenario.rentalYield >= 0.02) {
        risk = 'medium';
      } else {
        risk = 'high';
      }

      return {
        name: scenario.name,
        year1: results.find(r => r.year === 1)?.roi || 0,
        year3: results.find(r => r.year === 3)?.roi || 0,
        year5: results.find(r => r.year === 5)?.roi || 0,
        year10: results.find(r => r.year === 10)?.roi || 0,
        totalReturn: finalReturn,
        annualReturn,
        risk
      };
    });

    // 최적 시나리오 찾기
    const bestScenario = simulationResults.reduce((best, current) => 
      current.annualReturn > best.annualReturn ? current : best
    );

    // 추천사항 생성
    let recommendation = '';
    const avgReturn = simulationResults.reduce((sum, s) => sum + s.annualReturn, 0) / simulationResults.length;
    
    if (avgReturn >= 8) {
      recommendation = '매우 좋은 투자 기회입니다. 적극 검토해보세요.';
    } else if (avgReturn >= 5) {
      recommendation = '양호한 투자입니다. 리스크를 고려하여 결정하세요.';
    } else if (avgReturn >= 2) {
      recommendation = '보통 수준의 투자입니다. 다른 옵션과 비교해보세요.';
    } else {
      recommendation = '수익률이 낮습니다. 투자를 재검토하는 것이 좋겠습니다.';
    }

    // 추가 분석 계산
    const taxRate = parseFloat(inputs.taxRate) / 100;
    const inflationRate = parseFloat(inputs.inflationRate) / 100;
    const holdingPeriod = parseFloat(inputs.holdingPeriod);

    // 8. 세금 고려 분석
    const avgScenario = simulationResults.find(s => s.name === '현실적 시나리오')!;
    const capitalGain = purchasePrice * 0.04 * period; // 4% 연간 상승 가정
    const capitalGainsTax = holdingPeriod < 2 ? capitalGain * 0.5 : capitalGain * 0.22; // 단기보유 중과세
    const rentalIncomeTax = annualRental * taxRate * period;
    const totalTax = capitalGainsTax + rentalIncomeTax;
    const netReturn = avgScenario.totalReturn - (totalTax / initialInvestment * 100);
    const effectiveTaxRate = totalTax / (capitalGain + annualRental * period) * 100;

    const taxAnalysis = {
      capitalGainsTax: Math.round(capitalGainsTax),
      rentalIncomeTax: Math.round(rentalIncomeTax),
      netReturn: Math.round(netReturn * 10) / 10,
      effectiveTaxRate: Math.round(effectiveTaxRate * 10) / 10
    };

    // 9. 인플레이션 조정 분석
    const nominalReturn = avgScenario.annualReturn / 100;
    const realReturn = ((1 + nominalReturn) / (1 + inflationRate) - 1) * 100;
    const purchasingPower = Math.pow(1 + inflationRate, period);
    const inflationImpact = (nominalReturn - realReturn / 100) * initialInvestment * period;

    const inflationAdjusted = {
      realReturn: Math.round(realReturn * 10) / 10,
      purchasingPower: Math.round(purchasingPower * 100) / 100,
      inflationImpact: Math.round(inflationImpact)
    };

    // 10. 리스크 분석
    const returns = simulationResults.map(s => s.annualReturn);
    const avgReturnForRisk = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturnForRisk, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance);
    const maxDrawdown = Math.max(...returns) - Math.min(...returns);
    const sharpeRatio = avgReturnForRisk / volatility;
    const riskScore = Math.max(0, Math.min(100, 100 - volatility * 5));

    const riskAnalysis = {
      volatility: Math.round(volatility * 10) / 10,
      maxDrawdown: Math.round(maxDrawdown * 10) / 10,
      sharpeRatio: Math.round(sharpeRatio * 100) / 100,
      riskScore: Math.round(riskScore)
    };

    // 11. 벤치마크 비교
    const benchmarkComparison = {
      stockMarket: { return: 8.5, risk: '높음' },
      bonds: { return: 3.5, risk: '낮음' },
      deposits: { return: 2.0, risk: '매우 낮음' },
      gold: { return: 4.0, risk: '보통' }
    };

    // 12. 민감도 분석
    const baseReturn = avgScenario.annualReturn;
    const sensitivityAnalysis = {
      priceChange10: {
        up: Math.round((baseReturn + 2) * 10) / 10,   // 가격 10% 상승 시 약 2%p 증가
        down: Math.round((baseReturn - 2) * 10) / 10  // 가격 10% 하락 시 약 2%p 감소
      },
      rentChange20: {
        up: Math.round((baseReturn + 1.5) * 10) / 10,   // 임대료 20% 상승 시 약 1.5%p 증가
        down: Math.round((baseReturn - 1.5) * 10) / 10  // 임대료 20% 하락 시 약 1.5%p 감소
      },
      expenseChange30: {
        up: Math.round((baseReturn - 1) * 10) / 10,   // 관리비 30% 증가 시 약 1%p 감소
        down: Math.round((baseReturn + 1) * 10) / 10  // 관리비 30% 감소 시 약 1%p 증가
      }
    };

    // 향상된 시나리오 결과 (추가 정보 포함)
    const enhancedScenarios = simulationResults.map(scenario => ({
      ...scenario,
      finalValue: Math.round(initialInvestment * (1 + scenario.totalReturn / 100)),
      totalCashFlow: Math.round(annualRental * period),
      capitalGain: Math.round(purchasePrice * (scenario.name === '보수적 시나리오' ? 0.02 : 
                                              scenario.name === '현실적 시나리오' ? 0.04 :
                                              scenario.name === '낙관적 시나리오' ? 0.06 : -0.01) * period)
    }));

    const simulationResult: SimulationResult = {
      scenarios: enhancedScenarios,
      taxAnalysis,
      inflationAdjusted,
      riskAnalysis,
      benchmarkComparison,
      sensitivityAnalysis,
      bestScenario: bestScenario.name,
      recommendation
    };

    setResult(simulationResult);
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return '낮음';
      case 'medium': return '보통';
      case 'high': return '높음';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
          <span className="mr-2">📈</span>
          투자 수익률 시뮬레이터
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ROI 시뮬레이터
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          다양한 시나리오별 투자 수익률을 시뮬레이션하여 최적의 투자 결정을 내리세요
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 입력 폼 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📝 투자 정보 입력</h2>
          
          <div className="space-y-4">
            {/* 초기 투자금 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                초기 투자금 (만원) *
              </label>
              <input
                type="text"
                value={inputs.initialInvestment}
                onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.initialInvestment ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 15000 (1.5억원)"
              />
              {errors.initialInvestment && (
                <p className="text-red-500 text-sm mt-1">{errors.initialInvestment}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">자기자본 + 취득비용 포함</p>
            </div>

            {/* 매매가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                매매가 (만원) *
              </label>
              <input
                type="text"
                value={inputs.purchasePrice}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 50000 (5억원)"
              />
              {errors.purchasePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
              )}
            </div>

            {/* 월 임대수입 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월 임대수입 (만원) *
              </label>
              <input
                type="text"
                value={inputs.currentRentalIncome}
                onChange={(e) => handleInputChange('currentRentalIncome', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.currentRentalIncome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 200 (월세 200만원)"
              />
              {errors.currentRentalIncome && (
                <p className="text-red-500 text-sm mt-1">{errors.currentRentalIncome}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">전세의 경우 0 입력</p>
            </div>

            {/* 연간 관리비용 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연간 관리비용 (만원)
              </label>
              <input
                type="text"
                value={inputs.annualExpenses}
                onChange={(e) => handleInputChange('annualExpenses', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="예: 500 (관리비, 세금, 수리비 등)"
              />
              <p className="text-xs text-gray-500 mt-1">관리비, 재산세, 수리비 등 포함</p>
            </div>

            {/* 시뮬레이션 기간 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시뮬레이션 기간
              </label>
              <select
                value={inputs.simulationPeriod}
                onChange={(e) => handleInputChange('simulationPeriod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="3">3년</option>
                <option value="5">5년</option>
                <option value="7">7년</option>
                <option value="10">10년</option>
              </select>
            </div>

            {/* 세율 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                종합소득세율 (%)
              </label>
              <select
                value={inputs.taxRate}
                onChange={(e) => handleInputChange('taxRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="6">6% (1,200만원 이하)</option>
                <option value="15">15% (4,600만원 이하)</option>
                <option value="24">24% (8,800만원 이하)</option>
                <option value="35">35% (1.5억원 이하)</option>
                <option value="38">38% (3억원 이하)</option>
                <option value="40">40% (5억원 이하)</option>
                <option value="42">42% (10억원 이하)</option>
                <option value="45">45% (10억원 초과)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">임대소득 세금 계산에 활용됩니다</p>
            </div>

            {/* 인플레이션율 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연간 인플레이션율 (%)
              </label>
              <select
                value={inputs.inflationRate}
                onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="1.5">1.5% (낮음)</option>
                <option value="2.0">2.0% (한국은행 목표)</option>
                <option value="2.5">2.5% (보통)</option>
                <option value="3.0">3.0% (높음)</option>
                <option value="4.0">4.0% (매우 높음)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">실질 수익률 계산에 활용됩니다</p>
            </div>

            {/* 보유기간 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예상 보유기간 (년)
              </label>
              <select
                value={inputs.holdingPeriod}
                onChange={(e) => handleInputChange('holdingPeriod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="1">1년 (단기)</option>
                <option value="2">2년 (양도세 50% 중과)</option>
                <option value="3">3년 (일반)</option>
                <option value="5">5년 (장기)</option>
                <option value="10">10년 (초장기)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">양도소득세 계산에 활용됩니다</p>
            </div>
          </div>

          <button
            onClick={simulateROI}
            className="w-full mt-6 bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
          >
            ROI 시뮬레이션 시작
          </button>
        </div>

        {/* 결과 표시 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📊 시뮬레이션 결과</h2>
          
          {result ? (
            <div className="space-y-6">
              {/* 최적 시나리오 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">🏆 최적 시나리오</h3>
                <p className="text-green-700 font-medium">{result.bestScenario}</p>
                <p className="text-sm text-green-600 mt-1">{result.recommendation}</p>
              </div>

              {/* 시나리오별 결과 */}
              <div className="space-y-4">
                {result.scenarios.map((scenario, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(scenario.risk)}`}>
                        위험도: {getRiskText(scenario.risk)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">1년 수익률:</span>
                        <span className={`ml-2 font-medium ${scenario.year1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {scenario.year1 >= 0 ? '+' : ''}{scenario.year1}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">3년 수익률:</span>
                        <span className={`ml-2 font-medium ${scenario.year3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {scenario.year3 >= 0 ? '+' : ''}{scenario.year3}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">5년 수익률:</span>
                        <span className={`ml-2 font-medium ${scenario.year5 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {scenario.year5 >= 0 ? '+' : ''}{scenario.year5}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">연평균 수익률:</span>
                        <span className={`ml-2 font-bold ${scenario.annualReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {scenario.annualReturn >= 0 ? '+' : ''}{scenario.annualReturn}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 bg-gray-50 rounded p-2">
                      <div>최종가치: {formatWon(scenario.finalValue)}</div>
                      <div>현금흐름: {formatWon(scenario.totalCashFlow)}</div>
                      <div>시세차익: {formatWon(scenario.capitalGain)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 세금 고려 분석 */}
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">💸 세금 고려 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>양도소득세</span>
                    <span className="font-medium text-red-600">{formatWon(result.taxAnalysis.capitalGainsTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>임대소득세 ({inputs.taxRate}%)</span>
                    <span className="font-medium text-red-600">{formatWon(result.taxAnalysis.rentalIncomeTax)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>세후 수익률</span>
                    <span className={result.taxAnalysis.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {result.taxAnalysis.netReturn >= 0 ? '+' : ''}{result.taxAnalysis.netReturn}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    실효세율: {result.taxAnalysis.effectiveTaxRate}%
                  </div>
                </div>
              </div>

              {/* 인플레이션 조정 분석 */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📊 인플레이션 조정 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>명목 수익률</span>
                    <span className="font-medium">{result.scenarios.find(s => s.name === '현실적 시나리오')?.annualReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>실질 수익률 (인플레이션 {inputs.inflationRate}% 고려)</span>
                    <span className="font-medium text-blue-600">{result.inflationAdjusted.realReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>구매력 변화</span>
                    <span className="font-medium">{result.inflationAdjusted.purchasingPower}배</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    인플레이션 영향: {formatWon(result.inflationAdjusted.inflationImpact)} 손실
                  </div>
                </div>
              </div>

              {/* 리스크 분석 */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">⚖️ 리스크 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>변동성 (표준편차)</span>
                    <span className="font-medium">{result.riskAnalysis.volatility}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>최대 손실폭</span>
                    <span className="font-medium text-red-600">{result.riskAnalysis.maxDrawdown}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>샤프 비율</span>
                    <span className="font-medium">{result.riskAnalysis.sharpeRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>리스크 점수</span>
                    <span className={`font-medium ${result.riskAnalysis.riskScore >= 70 ? 'text-green-600' : result.riskAnalysis.riskScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {result.riskAnalysis.riskScore}점/100점
                    </span>
                  </div>
                </div>
              </div>

              {/* 벤치마크 비교 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📈 다른 투자 대안과 비교</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>부동산 (현재 투자)</span>
                    <span className="font-bold text-blue-600">{result.scenarios.find(s => s.name === '현실적 시나리오')?.annualReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주식시장 (코스피)</span>
                    <span className="font-medium">{result.benchmarkComparison.stockMarket.return}% (위험도: {result.benchmarkComparison.stockMarket.risk})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>채권</span>
                    <span className="font-medium">{result.benchmarkComparison.bonds.return}% (위험도: {result.benchmarkComparison.bonds.risk})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예금</span>
                    <span className="font-medium">{result.benchmarkComparison.deposits.return}% (위험도: {result.benchmarkComparison.deposits.risk})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>금</span>
                    <span className="font-medium">{result.benchmarkComparison.gold.return}% (위험도: {result.benchmarkComparison.gold.risk})</span>
                  </div>
                </div>
              </div>

              {/* 민감도 분석 */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">🎯 민감도 분석</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">부동산 가격 10% 변동 시</h4>
                    <div className="flex justify-between">
                      <span className="text-green-600">10% 상승</span>
                      <span className="font-medium">{result.sensitivityAnalysis.priceChange10.up}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">10% 하락</span>
                      <span className="font-medium">{result.sensitivityAnalysis.priceChange10.down}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">임대료 20% 변동 시</h4>
                    <div className="flex justify-between">
                      <span className="text-green-600">20% 상승</span>
                      <span className="font-medium">{result.sensitivityAnalysis.rentChange20.up}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">20% 하락</span>
                      <span className="font-medium">{result.sensitivityAnalysis.rentChange20.down}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">관리비 30% 변동 시</h4>
                    <div className="flex justify-between">
                      <span className="text-red-600">30% 증가</span>
                      <span className="font-medium">{result.sensitivityAnalysis.expenseChange30.up}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">30% 감소</span>
                      <span className="font-medium">{result.sensitivityAnalysis.expenseChange30.down}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <p className="text-gray-500">
                좌측에 투자 정보를 입력하고<br />
                시뮬레이션을 시작해주세요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 시뮬레이션 가정 */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-3">📋 시뮬레이션 가정사항</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
          <div>
            <h4 className="font-medium mb-2">시나리오별 가정:</h4>
            <ul className="space-y-1">
              <li>• 보수적: 연 2% 가격상승, 현재 임대료 유지</li>
              <li>• 현실적: 연 4% 가격상승, 현재 임대료 유지</li>
              <li>• 낙관적: 연 6% 가격상승, 현재 임대료 유지</li>
              <li>• 비관적: 연 1% 가격하락, 임대료 10% 감소</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">주의사항:</h4>
            <ul className="space-y-1">
              <li>• 실제 시장은 예측과 다를 수 있습니다</li>
              <li>• 세금, 거래비용 등은 고려되지 않았습니다</li>
              <li>• 공실, 임차인 변경 등의 리스크 미포함</li>
              <li>• 참고용으로만 사용하시기 바랍니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 다른 계산기 링크 */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">다른 계산기도 사용해보세요</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/tools/gap-calculator" className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
            갭투자 계산기
          </Link>
          <Link href="/tools/jeonse-ratio" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            전세가율 계산기
          </Link>
          <Link href="/tools/loan-calculator" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            대출 이자 계산기
          </Link>
          <Link href="/tools/fair-price" className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
            적정가 계산기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ROISimulatorPage() {
  return (
    <CalculatorWrapper>
      <ROISimulatorContent />
    </CalculatorWrapper>
  );
}