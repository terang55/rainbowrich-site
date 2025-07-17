'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorWrapper from '@/components/CalculatorWrapper';

interface CalculationResult {
  // 기본 계산
  jeonseRatio: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
  
  // 수익률 분석
  monthlyRent: number;
  rentalYield: number;
  jeonseYield: number; // 전세 수익률 (4% 가정)
  
  // 갭투자 분석
  gapInvestmentAmount: number; // 갭투자 필요 자금
  gapRatio: number; // 갭 비율
  
  // 지역 비교
  comparison: {
    regional: number;
    nationwide: number;
    difference: number;
  };
  
  // 안전성 분석
  safetyScore: number; // 안전도 점수 (100점 만점)
  marketRisk: 'low' | 'medium' | 'high';
  
  // 투자 시나리오
  scenarios: {
    conservative: number; // 보수적 시나리오
    realistic: number;    // 현실적 시나리오
    optimistic: number;   // 낙관적 시나리오
  };
}

function JeonseRatioContent() {
  const [inputs, setInputs] = useState({
    purchasePrice: '',    // 매매가
    jeonsePrice: '',      // 전세가
    monthlyRentPrice: '', // 월세 (선택)
    region: 'seoul',      // 지역
    buildingAge: '',      // 건물 연식
    area: '',             // 전용면적
    loanAmount: '',       // 예상 대출금액
    interestRate: '4.5'   // 대출금리
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // 지역별 평균 전세가율 데이터
  const regionAverages = {
    seoul: 65,
    gyeonggi: 70,
    incheon: 72,
    busan: 75,
    daegu: 78,
    gwangju: 80,
    daejeon: 77,
    ulsan: 74
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'region') {
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
    
    if (!inputs.purchasePrice || parseFloat(inputs.purchasePrice) <= 0) {
      newErrors.purchasePrice = '매매가를 입력해주세요';
    }
    if (!inputs.jeonsePrice || parseFloat(inputs.jeonsePrice) <= 0) {
      newErrors.jeonsePrice = '전세가를 입력해주세요';
    }

    if (inputs.purchasePrice && inputs.jeonsePrice) {
      if (parseFloat(inputs.jeonsePrice) >= parseFloat(inputs.purchasePrice)) {
        newErrors.jeonsePrice = '전세가는 매매가보다 작아야 합니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateJeonseRatio = () => {
    if (!validateInputs()) return;

    const purchasePrice = parseFloat(inputs.purchasePrice) * 10000; // 만원 → 원
    const jeonsePrice = parseFloat(inputs.jeonsePrice) * 10000;
    const monthlyRentPrice = parseFloat(inputs.monthlyRentPrice || '0') * 10000;
    const area = parseFloat(inputs.area || '84');
    const buildingAge = parseFloat(inputs.buildingAge || '10');
    // 대출 관련 변수는 현재 사용되지 않지만 향후 기능 확장을 위해 주석 처리
    // const loanAmount = parseFloat(inputs.loanAmount || '0') * 10000;
    // const interestRate = parseFloat(inputs.interestRate) / 100;

    // 1. 기본 전세가율 계산
    const jeonseRatio = Math.round((jeonsePrice / purchasePrice) * 100 * 10) / 10;

    // 2. 갭투자 분석
    const gapInvestmentAmount = purchasePrice - jeonsePrice; // 갭투자 필요 자금
    const gapRatio = Math.round((gapInvestmentAmount / purchasePrice) * 100 * 10) / 10;

    // 3. 수익률 분석
    const monthlyRent = monthlyRentPrice * 12; // 연간 월세
    const rentalYield = purchasePrice > 0 ? Math.round((monthlyRent / purchasePrice) * 100 * 100) / 100 : 0;
    const jeonseYield = 4.0; // 전세 수익률 4% 가정

    // 4. 안전성 분석 (100점 만점)
    let safetyScore = 100;
    
    // 전세가율에 따른 점수 차감
    if (jeonseRatio > 60) safetyScore -= (jeonseRatio - 60) * 2;
    if (jeonseRatio > 80) safetyScore -= (jeonseRatio - 80) * 3;
    
    // 건물 연식에 따른 점수 차감
    if (buildingAge > 15) safetyScore -= (buildingAge - 15) * 1;
    if (buildingAge > 30) safetyScore -= (buildingAge - 30) * 2;
    
    // 면적에 따른 점수 조정 (소형 평수는 리스크 증가)
    if (area < 60) safetyScore -= 5;
    if (area > 135) safetyScore -= 3; // 대형 평수도 약간의 리스크

    safetyScore = Math.max(0, Math.min(100, Math.round(safetyScore)));

    // 5. 시장 위험도 평가
    let marketRisk: 'low' | 'medium' | 'high';
    if (safetyScore >= 80) marketRisk = 'low';
    else if (safetyScore >= 60) marketRisk = 'medium';
    else marketRisk = 'high';

    // 6. 위험도 평가 (기존 로직 개선)
    let riskLevel: 'low' | 'medium' | 'high';
    let recommendation: string;

    if (jeonseRatio <= 60 && safetyScore >= 70) {
      riskLevel = 'low';
      recommendation = '매우 안전한 투자 구간입니다. 갭투자에 최적화된 매물입니다.';
    } else if (jeonseRatio <= 70 && safetyScore >= 60) {
      riskLevel = 'low';
      recommendation = '안전한 투자 구간입니다. 갭투자에 적합합니다.';
    } else if (jeonseRatio <= 80) {
      riskLevel = 'medium';
      recommendation = '보통 위험 구간입니다. 신중한 검토가 필요합니다.';
    } else {
      riskLevel = 'high';
      recommendation = '고위험 구간입니다. 투자를 재고해보세요.';
    }

    // 7. 지역 평균과 비교
    const regionAverage = regionAverages[inputs.region as keyof typeof regionAverages];
    const nationwide = 72; // 전국 평균
    const difference = Math.round((jeonseRatio - regionAverage) * 10) / 10;

    // 8. 투자 시나리오 분석
    const scenarios = {
      conservative: Math.round((jeonseRatio + 5) * 10) / 10, // 보수적: +5%p
      realistic: jeonseRatio, // 현실적: 현재 수준
      optimistic: Math.round((jeonseRatio - 3) * 10) / 10 // 낙관적: -3%p
    };

    const calculationResult: CalculationResult = {
      // 기본 계산
      jeonseRatio,
      riskLevel,
      recommendation,
      
      // 수익률 분석
      monthlyRent: Math.round(monthlyRent / 10000), // 원 → 만원
      rentalYield,
      jeonseYield,
      
      // 갭투자 분석
      gapInvestmentAmount: Math.round(gapInvestmentAmount),
      gapRatio,
      
      // 지역 비교
      comparison: {
        regional: regionAverage,
        nationwide,
        difference
      },
      
      // 안전성 분석
      safetyScore,
      marketRisk,
      
      // 투자 시나리오
      scenarios
    };

    setResult(calculationResult);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low': return '낮음 (안전)';
      case 'medium': return '보통 (주의)';
      case 'high': return '높음 (위험)';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
          <span className="mr-2">📊</span>
          전세가율 전문 계산기
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          전세가율 계산기
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          매매가 대비 전세가 비율을 계산하여 투자 안전성을 판단하세요
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 입력 폼 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📝 매물 정보 입력</h2>
          
          <div className="space-y-4">
            {/* 매매가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                매매가 (만원) *
              </label>
              <input
                type="text"
                value={inputs.purchasePrice}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 50000 (5억원)"
              />
              {errors.purchasePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
              )}
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.jeonsePrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 35000 (3.5억원)"
              />
              {errors.jeonsePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.jeonsePrice}</p>
              )}
            </div>

            {/* 월세 (선택사항) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월세 (만원/월) - 선택사항
              </label>
              <input
                type="text"
                value={inputs.monthlyRentPrice}
                onChange={(e) => handleInputChange('monthlyRentPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: 150 (월세 150만원)"
              />
              <p className="text-xs text-gray-500 mt-1">월세를 입력하면 임대수익률도 함께 계산됩니다</p>
            </div>

            {/* 전용면적 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전용면적 (㎡)
              </label>
              <input
                type="text"
                value={inputs.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: 84 (84㎡)"
              />
              <p className="text-xs text-gray-500 mt-1">면적별 시세 분석에 활용됩니다</p>
            </div>

            {/* 건물 연식 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                건물 연식 (년)
              </label>
              <input
                type="text"
                value={inputs.buildingAge}
                onChange={(e) => handleInputChange('buildingAge', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: 15 (15년)"
              />
              <p className="text-xs text-gray-500 mt-1">건물 노후도 평가에 활용됩니다</p>
            </div>

            {/* 예상 대출금액 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예상 대출금액 (만원)
              </label>
              <input
                type="text"
                value={inputs.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: 30000 (3억원) 또는 0 (현금 투자)"
              />
              <p className="text-xs text-gray-500 mt-1">갭투자 분석에 활용됩니다</p>
            </div>

            {/* 대출금리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대출금리 (연%)
              </label>
              <select
                value={inputs.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="3.5">3.5%</option>
                <option value="4.0">4.0%</option>
                <option value="4.5">4.5%</option>
                <option value="5.0">5.0%</option>
                <option value="5.5">5.5%</option>
                <option value="6.0">6.0%</option>
              </select>
            </div>

            {/* 지역 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지역 선택
              </label>
              <select
                value={inputs.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="seoul">서울</option>
                <option value="gyeonggi">경기</option>
                <option value="incheon">인천</option>
                <option value="busan">부산</option>
                <option value="daegu">대구</option>
                <option value="gwangju">광주</option>
                <option value="daejeon">대전</option>
                <option value="ulsan">울산</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateJeonseRatio}
            className="w-full mt-6 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            전세가율 계산하기
          </button>
        </div>

        {/* 결과 표시 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📊 계산 결과</h2>
          
          {result ? (
            <div className="space-y-6">
              {/* 전세가율 & 안전도 */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전세가율 분석</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {result.jeonseRatio}%
                </div>
                <div className="flex justify-center items-center space-x-4 mb-3">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(result.riskLevel)}`}>
                    위험도: {getRiskText(result.riskLevel)}
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    안전도: {result.safetyScore}점
                  </div>
                </div>
              </div>

              {/* 갭투자 분석 */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">💰 갭투자 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>갭투자 필요 자금</span>
                    <span className="font-medium">{formatNumber(Math.round(result.gapInvestmentAmount / 10000))}만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>갭 비율</span>
                    <span className="font-medium">{result.gapRatio}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    = 매매가 - 전세가 ({formatNumber(Math.round(parseFloat(inputs.purchasePrice)))}만원 - {formatNumber(Math.round(parseFloat(inputs.jeonsePrice)))}만원)
                  </div>
                </div>
              </div>

              {/* 수익률 분석 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📈 수익률 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>전세 수익률 (4% 가정)</span>
                    <span className="font-medium text-blue-600">{result.jeonseYield}%</span>
                  </div>
                  {result.monthlyRent > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span>월세 수익률</span>
                        <span className="font-medium text-green-600">{result.rentalYield}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>연간 월세 수입</span>
                        <span className="font-medium">{formatNumber(result.monthlyRent)}만원</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 지역 비교 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">🗺️ 지역 평균과 비교</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>현재 매물</span>
                    <span className="font-bold text-blue-600">{result.jeonseRatio}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>지역 평균</span>
                    <span className="font-medium">{result.comparison.regional}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>전국 평균</span>
                    <span className="font-medium">{result.comparison.nationwide}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>지역 대비 차이</span>
                    <span className={`font-medium ${result.comparison.difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.comparison.difference >= 0 ? '+' : ''}{result.comparison.difference}%p
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {result.comparison.difference < 0 ? 
                      '✅ 지역 평균보다 낮아 상대적으로 안전합니다' : 
                      '⚠️ 지역 평균보다 높아 주의가 필요합니다'
                    }
                  </div>
                </div>
              </div>

              {/* 시나리오 분석 */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">🎯 시나리오 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-600">보수적 시나리오</span>
                    <span className="font-medium">{result.scenarios.conservative}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">현실적 시나리오</span>
                    <span className="font-medium">{result.scenarios.realistic}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">낙관적 시나리오</span>
                    <span className="font-medium">{result.scenarios.optimistic}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    전세 시장 변동을 고려한 다양한 시나리오입니다
                  </div>
                </div>
              </div>

              {/* 투자 조언 */}
              <div className={`rounded-lg p-4 border ${
                result.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
                result.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  result.riskLevel === 'low' ? 'text-green-800' :
                  result.riskLevel === 'medium' ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  💡 종합 투자 조언
                </h3>
                <p className={`text-sm mb-3 ${
                  result.riskLevel === 'low' ? 'text-green-700' :
                  result.riskLevel === 'medium' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {result.recommendation}
                </p>
                
                <div className={`text-sm space-y-1 ${
                  result.riskLevel === 'low' ? 'text-green-700' :
                  result.riskLevel === 'medium' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {result.safetyScore >= 80 && (
                    <p>🏆 안전도 점수가 매우 높습니다 ({result.safetyScore}점)</p>
                  )}
                  {result.safetyScore >= 60 && result.safetyScore < 80 && (
                    <p>⚖️ 안전도 점수가 보통입니다 ({result.safetyScore}점)</p>
                  )}
                  {result.safetyScore < 60 && (
                    <p>⚠️ 안전도 점수가 낮습니다 ({result.safetyScore}점)</p>
                  )}
                  
                  {result.gapRatio <= 40 && (
                    <p>✅ 갭 비율이 낮아 갭투자에 매우 적합합니다</p>
                  )}
                  {result.gapRatio > 40 && result.gapRatio <= 60 && (
                    <p>⚠️ 갭 비율이 보통 수준입니다</p>
                  )}
                  {result.gapRatio > 60 && (
                    <p>❌ 갭 비율이 높아 많은 자기자본이 필요합니다</p>
                  )}
                  
                  {result.comparison.difference < -5 && (
                    <p>🎯 지역 평균보다 5%p 이상 낮아 매우 좋은 조건입니다</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-500">
                좌측에 매물 정보를 입력하고<br />
                계산 버튼을 눌러주세요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 전세가율 가이드 */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📚 전세가율 투자 가이드</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">60% 이하 (안전)</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 갭투자에 최적</li>
              <li>• 낮은 위험도</li>
              <li>• 안정적인 현금흐름</li>
              <li>• 전세 보증금으로 대부분 커버</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">60-80% (보통)</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 신중한 검토 필요</li>
              <li>• 중간 위험도</li>
              <li>• 추가 자금 필요 가능</li>
              <li>• 시장 상황 면밀 분석</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">80% 이상 (위험)</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• 고위험 투자</li>
              <li>• 전세 시장 변동 위험</li>
              <li>• 많은 자기자본 필요</li>
              <li>• 투자 재고 권장</li>
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

export default function JeonseRatioPage() {
  return (
    <CalculatorWrapper>
      <JeonseRatioContent />
    </CalculatorWrapper>
  );
}