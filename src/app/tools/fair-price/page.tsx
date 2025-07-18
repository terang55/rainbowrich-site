'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorWrapper from '@/components/CalculatorWrapper';

interface CalculationResult {
  // 기본 계산
  fairPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  
  // 가격 분석
  pricePerSquareMeter: number;
  pricePerPyeong: number;
  
  // 시세 비교
  marketComparison: {
    averagePrice: number;
    difference: number;
    percentDifference: number;
  };
  
  // 투자 가치 평가
  investmentValue: 'excellent' | 'good' | 'fair' | 'poor';
  recommendation: string;
  
  // 협상 전략
  negotiation: {
    suggestedOffer: number;
    maxOffer: number;
  };
}

function FairPriceCalculatorContent() {
  const [inputs, setInputs] = useState({
    apartmentName: '',
    area: '',
    floor: '5',
    age: '10',
    location: '일반',
    recentTransactions: '',
    condition: '보통',
    facilities: '보통',
    transportationAccess: '보통'
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    if (['floor', 'age', 'location', 'condition', 'facilities', 'transportationAccess'].includes(field)) {
      setInputs(prev => ({ ...prev, [field]: value }));
    } else {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setInputs(prev => ({ ...prev, [field]: field === 'apartmentName' ? value : numericValue }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!inputs.apartmentName) {
      newErrors.apartmentName = '아파트 이름을 입력해주세요';
    }
    if (!inputs.area || parseFloat(inputs.area) <= 0) {
      newErrors.area = '면적을 입력해주세요';
    }
    if (!inputs.recentTransactions || parseFloat(inputs.recentTransactions) <= 0) {
      newErrors.recentTransactions = '최근 실거래가를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateFairPrice = () => {
    if (!validateInputs()) return;

    const area = parseFloat(inputs.area);
    const recentTransactions = parseFloat(inputs.recentTransactions) * 10000; // 만원 단위를 원 단위로 변환
    const floor = parseInt(inputs.floor);
    const age = parseInt(inputs.age);
    
    // 1. 기본 가격 계산 (최근 실거래가 기준)
    const basePrice = recentTransactions;
    
    // 2. 층수 조정
    const floorFactor = floor <= 1 ? 0.98 : floor >= 15 ? 1.05 : 1 + (floor - 5) * 0.005;
    
    // 3. 건물 연식 조정
    const ageFactor = Math.max(0.85, 1 - age * 0.01);
    
    // 4. 위치 조정
    let locationFactor = 1;
    switch (inputs.location) {
      case '우수': locationFactor = 1.1; break;
      case '좋음': locationFactor = 1.05; break;
      case '일반': locationFactor = 1; break;
      case '불량': locationFactor = 0.95; break;
    }
    
    // 5. 상태 조정
    let conditionFactor = 1;
    switch (inputs.condition) {
      case '최상': conditionFactor = 1.05; break;
      case '좋음': conditionFactor = 1.02; break;
      case '보통': conditionFactor = 1; break;
      case '불량': conditionFactor = 0.97; break;
    }
    
    // 6. 편의시설 조정
    let facilitiesFactor = 1;
    switch (inputs.facilities) {
      case '우수': facilitiesFactor = 1.03; break;
      case '좋음': facilitiesFactor = 1.01; break;
      case '보통': facilitiesFactor = 1; break;
      case '부족': facilitiesFactor = 0.98; break;
    }
    
    // 7. 교통 접근성 조정
    let transportationFactor = 1;
    switch (inputs.transportationAccess) {
      case '우수': transportationFactor = 1.04; break;
      case '좋음': transportationFactor = 1.02; break;
      case '보통': transportationFactor = 1; break;
      case '불량': transportationFactor = 0.97; break;
    }
    
    // 8. 최종 적정가 계산
    const fairPrice = Math.round(basePrice * floorFactor * ageFactor * locationFactor * conditionFactor * facilitiesFactor * transportationFactor);
    
    // 9. 가격 범위 계산
    const minPrice = Math.round(fairPrice * 0.95);
    const maxPrice = Math.round(fairPrice * 1.05);
    
    // 10. 평당 가격 계산
    const pricePerSquareMeter = Math.round(fairPrice / area);
    const pricePerPyeong = Math.round(pricePerSquareMeter * 3.3058);
    
    // 11. 시세 비교
    const averagePrice = recentTransactions;
    const difference = fairPrice - averagePrice;
    const percentDifference = Math.round((difference / averagePrice) * 100 * 10) / 10;
    
    // 12. 투자 가치 평가
    let investmentValue: 'excellent' | 'good' | 'fair' | 'poor';
    let recommendation = '';
    
    if (percentDifference <= -5) {
      investmentValue = 'excellent';
      recommendation = '현재 시세보다 낮게 평가되어 투자 가치가 매우 높습니다. 적극적인 매수를 고려해보세요.';
    } else if (percentDifference <= 0) {
      investmentValue = 'good';
      recommendation = '적정 시세에 가까워 투자 가치가 있습니다. 협상을 통해 좋은 조건으로 매수를 고려해보세요.';
    } else if (percentDifference <= 5) {
      investmentValue = 'fair';
      recommendation = '약간 고평가되어 있으나 협상의 여지가 있습니다. 신중하게 접근하세요.';
    } else {
      investmentValue = 'poor';
      recommendation = '현재 시세보다 높게 평가되어 투자 가치가 낮습니다. 다른 매물을 찾아보는 것이 좋겠습니다.';
    }
    
    // 13. 협상 전략
    const suggestedOffer = Math.round(fairPrice * 0.97);
    const maxOffer = fairPrice;
    
    const calculationResult: CalculationResult = {
      fairPrice,
      priceRange: {
        min: minPrice,
        max: maxPrice
      },
      pricePerSquareMeter,
      pricePerPyeong,
      marketComparison: {
        averagePrice,
        difference,
        percentDifference
      },
      investmentValue,
      recommendation,
      negotiation: {
        suggestedOffer,
        maxOffer
      }
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

  const getValueColor = (value: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (value) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getValueText = (value: 'excellent' | 'good' | 'fair' | 'poor') => {
    switch (value) {
      case 'excellent': return '매우 좋음';
      case 'good': return '좋음';
      case 'fair': return '보통';
      case 'poor': return '낮음';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
          <span className="mr-2">🏠</span>
          아파트 적정가 계산기
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          아파트 적정가 계산기
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          다양한 요소를 고려하여 아파트의 적정 매매가를 산출하고 투자 가치를 평가해보세요
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 입력 폼 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📝 아파트 정보 입력</h2>
          
          <div className="space-y-4">
            {/* 아파트 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아파트 이름 *
              </label>
              <input
                type="text"
                value={inputs.apartmentName}
                onChange={(e) => handleInputChange('apartmentName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.apartmentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 래미안 아파트"
              />
              {errors.apartmentName && (
                <p className="text-red-500 text-sm mt-1">{errors.apartmentName}</p>
              )}
            </div>

            {/* 면적 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전용면적 (㎡) *
              </label>
              <input
                type="text"
                value={inputs.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.area ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 84.5"
              />
              {errors.area && (
                <p className="text-red-500 text-sm mt-1">{errors.area}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">평수 환산: 약 {inputs.area ? Math.round(parseFloat(inputs.area) / 3.3058 * 10) / 10 : 0}평</p>
            </div>

            {/* 층수 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                층수
              </label>
              <select
                value={inputs.floor}
                onChange={(e) => handleInputChange('floor', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="1">1층</option>
                <option value="2">2층</option>
                <option value="3">3층</option>
                <option value="4">4층</option>
                <option value="5">5층</option>
                <option value="6">6~10층</option>
                <option value="15">11~15층</option>
                <option value="20">16~20층</option>
                <option value="25">21층 이상</option>
              </select>
            </div>

            {/* 건물 연식 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                건물 연식
              </label>
              <select
                value={inputs.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="0">신축</option>
                <option value="3">3년 이내</option>
                <option value="5">5년 이내</option>
                <option value="10">10년 이내</option>
                <option value="15">15년 이내</option>
                <option value="20">20년 이내</option>
                <option value="25">25년 이상</option>
              </select>
            </div>

            {/* 최근 실거래가 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최근 실거래가 (만원) *
              </label>
              <input
                type="text"
                value={inputs.recentTransactions}
                onChange={(e) => handleInputChange('recentTransactions', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.recentTransactions ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 80000 (8억원)"
              />
              {errors.recentTransactions && (
                <p className="text-red-500 text-sm mt-1">{errors.recentTransactions}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">해당 아파트 또는 인근 유사 아파트의 최근 실거래가</p>
            </div>

            {/* 위치 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                위치 상태
              </label>
              <select
                value={inputs.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="우수">우수 (역세권, 학군 우수)</option>
                <option value="좋음">좋음 (편의시설 인접)</option>
                <option value="일반">일반 (평균적인 위치)</option>
                <option value="불량">불량 (접근성 떨어짐)</option>
              </select>
            </div>

            {/* 아파트 상태 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아파트 상태
              </label>
              <select
                value={inputs.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="최상">최상 (리모델링 완료)</option>
                <option value="좋음">좋음 (관리 상태 양호)</option>
                <option value="보통">보통 (일반적인 상태)</option>
                <option value="불량">불량 (노후화 진행)</option>
              </select>
            </div>

            {/* 편의시설 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                편의시설
              </label>
              <select
                value={inputs.facilities}
                onChange={(e) => handleInputChange('facilities', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="우수">우수 (다양한 커뮤니티 시설)</option>
                <option value="좋음">좋음 (기본 시설 충실)</option>
                <option value="보통">보통 (일반적인 수준)</option>
                <option value="부족">부족 (기본 시설만 있음)</option>
              </select>
            </div>

            {/* 교통 접근성 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                교통 접근성
              </label>
              <select
                value={inputs.transportationAccess}
                onChange={(e) => handleInputChange('transportationAccess', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="우수">우수 (지하철역 5분 이내)</option>
                <option value="좋음">좋음 (대중교통 편리)</option>
                <option value="보통">보통 (일반적인 접근성)</option>
                <option value="불량">불량 (대중교통 불편)</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateFairPrice}
            className="w-full mt-6 bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-lg"
          >
            적정가 계산하기
          </button>
        </div>

        {/* 결과 표시 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📊 적정가 분석 결과</h2>
          
          {result ? (
            <div className="space-y-6">
              {/* 적정가 결과 */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">🏠 적정 매매가</h3>
                <p className="text-3xl font-bold text-orange-600 mb-2">{formatWon(result.fairPrice)}</p>
                <p className="text-sm text-orange-700">
                  예상 가격 범위: {formatWon(result.priceRange.min)} ~ {formatWon(result.priceRange.max)}
                </p>
              </div>

              {/* 단위 가격 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">제곱미터당 가격</h3>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(result.pricePerSquareMeter)}원/㎡</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">평당 가격</h3>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(result.pricePerPyeong)}원/평</p>
                </div>
              </div>

              {/* 시세 비교 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📈 시세 비교 분석</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">최근 실거래가</span>
                    <span className="font-medium">{formatWon(result.marketComparison.averagePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">적정가와의 차이</span>
                    <span className={`font-medium ${result.marketComparison.difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.marketComparison.difference >= 0 ? '+' : ''}{formatWon(result.marketComparison.difference)}
                      ({result.marketComparison.percentDifference >= 0 ? '+' : ''}{result.marketComparison.percentDifference}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* 투자 가치 평가 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">⭐ 투자 가치 평가</h3>
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 mr-2">투자 가치:</span>
                  <span className={`font-bold ${getValueColor(result.investmentValue)}`}>
                    {getValueText(result.investmentValue)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                  {result.recommendation}
                </p>
              </div>

              {/* 협상 전략 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">💬 협상 전략</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">제안 가격</span>
                    <span className="font-medium text-blue-600">{formatWon(result.negotiation.suggestedOffer)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">최대 제시 가격</span>
                    <span className="font-medium text-red-600">{formatWon(result.negotiation.maxOffer)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * 협상 전략은 참고용이며, 실제 시장 상황에 따라 조정이 필요할 수 있습니다.
                </p>
              </div>

              {/* 주의사항 */}
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">📌 주의사항</p>
                <p>이 계산 결과는 참고용으로만 사용하시고, 실제 투자 결정 시에는 전문가와 상담하세요.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">아파트 정보를 입력하세요</h3>
              <p className="text-gray-500 max-w-md">
                왼쪽 폼에 아파트 정보를 입력하고 &apos;적정가 계산하기&apos; 버튼을 클릭하면 상세한 분석 결과를 확인할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 적정가 계산 방법</h2>
        <p className="text-gray-600 mb-4">
          아파트 적정가 계산기는 다음과 같은 요소들을 종합적으로 고려하여 적정 매매가를 산출합니다:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">기본 요소</h3>
            <ul className="space-y-1 text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>최근 실거래가 데이터</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>아파트 면적 (전용면적)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>층수 및 건물 연식</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">조정 요소</h3>
            <ul className="space-y-1 text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>위치 및 접근성</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>아파트 상태 및 관리 상태</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>편의시설 및 교통 접근성</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 관련 계산기 */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">다른 부동산 계산기도 확인해보세요</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tools/gap-calculator" className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
            갭투자 수익률 계산기
          </Link>
          <Link href="/tools/jeonse-ratio" className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
            전세가율 계산기
          </Link>
          <Link href="/tools/loan-calculator" className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
            대출 이자 계산기
          </Link>
          <Link href="/tools/roi-simulator" className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
            투자 수익률 시뮬레이터
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FairPriceCalculatorPage() {
  return (
    <CalculatorWrapper>
      <FairPriceCalculatorContent />
    </CalculatorWrapper>
  );
}