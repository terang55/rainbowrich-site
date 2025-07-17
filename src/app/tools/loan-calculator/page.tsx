'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorWrapper from '@/components/CalculatorWrapper';

interface CalculationResult {
    // 기본 계산
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;

    // 상환 스케줄
    schedule: {
        year: number;
        principal: number;
        interest: number;
        balance: number;
        monthlyPayment: number;
    }[];

    // 비교 분석
    comparison: {
        equalPayment: {
            monthlyPayment: number;
            totalInterest: number;
        };
        equalPrincipal: {
            firstPayment: number;
            lastPayment: number;
            totalInterest: number;
        };
        savings: number; // 원금균등이 절약하는 이자
    };

    // 중도상환 분석
    earlyPayment: {
        year3: { remainingBalance: number; savedInterest: number };
        year5: { remainingBalance: number; savedInterest: number };
        year10: { remainingBalance: number; savedInterest: number };
    };

    // 금리 민감도 분석
    rateSensitivity: {
        rate1Lower: { monthlyPayment: number; totalInterest: number };
        rate1Higher: { monthlyPayment: number; totalInterest: number };
        rate2Higher: { monthlyPayment: number; totalInterest: number };
    };

    // 투자 대안 분석
    investmentAlternative: {
        monthlyInvestment: number;
        expectedReturn: number;
        futureValue: number;
        netBenefit: number;
    };
}

function LoanCalculatorContent() {
    const [inputs, setInputs] = useState({
        loanAmount: '',        // 대출금액
        interestRate: '',      // 연이율
        loanPeriod: '30',      // 대출기간 (년)
        paymentType: 'equal',  // 상환방식 (원리금균등/원금균등)
        earlyPaymentAmount: '', // 중도상환 금액
        investmentReturn: '6'   // 투자 수익률 (%)
    });

    const [result, setResult] = useState<CalculationResult | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (field: string, value: string) => {
        if (field === 'paymentType') {
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
        const newErrors: { [key: string]: string } = {};

        if (!inputs.loanAmount || parseFloat(inputs.loanAmount) <= 0) {
            newErrors.loanAmount = '대출금액을 입력해주세요';
        }
        if (!inputs.interestRate || parseFloat(inputs.interestRate) <= 0) {
            newErrors.interestRate = '대출금리를 입력해주세요';
        }
        if (!inputs.loanPeriod || parseFloat(inputs.loanPeriod) <= 0) {
            newErrors.loanPeriod = '대출기간을 입력해주세요';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateLoan = () => {
        if (!validateInputs()) return;

        const principal = parseFloat(inputs.loanAmount) * 10000; // 만원 → 원
        const annualRate = parseFloat(inputs.interestRate) / 100;
        const monthlyRate = annualRate / 12;
        const totalMonths = parseFloat(inputs.loanPeriod) * 12;
        const earlyPaymentAmount = parseFloat(inputs.earlyPaymentAmount || '0') * 10000;
        const investmentReturn = parseFloat(inputs.investmentReturn) / 100;

        // 1. 원리금균등 방식 계산
        const equalMonthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        const equalTotalPayment = equalMonthlyPayment * totalMonths;
        const equalTotalInterest = equalTotalPayment - principal;

        // 2. 원금균등 방식 계산
        const principalMonthlyPayment = principal / totalMonths;
        const principalFirstPayment = principalMonthlyPayment + (principal * monthlyRate);
        const principalLastPayment = principalMonthlyPayment + ((principal / totalMonths) * monthlyRate);

        let principalTotalInterest = 0;
        let remainingBalance = principal;
        for (let month = 1; month <= totalMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate;
            principalTotalInterest += interestPayment;
            remainingBalance -= principalMonthlyPayment;
        }

        // 3. 현재 선택된 방식의 기본 계산
        let monthlyPayment: number;
        let totalPayment: number;
        let totalInterest: number;
        const schedule: CalculationResult['schedule'] = [];

        if (inputs.paymentType === 'equal') {
            monthlyPayment = equalMonthlyPayment;
            totalPayment = equalTotalPayment;
            totalInterest = equalTotalInterest;

            let remainingBalance = principal;
            for (let month = 1; month <= Math.min(totalMonths, 360); month++) {
                const interestPayment = remainingBalance * monthlyRate;
                const principalPayment = monthlyPayment - interestPayment;
                remainingBalance -= principalPayment;

                if (month % 12 === 0 || month === totalMonths) {
                    schedule.push({
                        year: Math.ceil(month / 12),
                        principal: Math.round(principalPayment),
                        interest: Math.round(interestPayment),
                        balance: Math.round(Math.max(0, remainingBalance)),
                        monthlyPayment: Math.round(monthlyPayment)
                    });
                }
            }
        } else {
            monthlyPayment = principalFirstPayment;
            totalPayment = principal + principalTotalInterest;
            totalInterest = principalTotalInterest;

            let remainingBalance = principal;
            for (let month = 1; month <= Math.min(totalMonths, 360); month++) {
                const interestPayment = remainingBalance * monthlyRate;
                const principalPayment = principalMonthlyPayment;
                const currentMonthlyPayment = principalPayment + interestPayment;
                remainingBalance -= principalPayment;

                if (month % 12 === 0 || month === totalMonths) {
                    schedule.push({
                        year: Math.ceil(month / 12),
                        principal: Math.round(principalPayment),
                        interest: Math.round(interestPayment),
                        balance: Math.round(Math.max(0, remainingBalance)),
                        monthlyPayment: Math.round(currentMonthlyPayment)
                    });
                }
            }
        }

        // 4. 비교 분석
        const comparison = {
            equalPayment: {
                monthlyPayment: Math.round(equalMonthlyPayment),
                totalInterest: Math.round(equalTotalInterest)
            },
            equalPrincipal: {
                firstPayment: Math.round(principalFirstPayment),
                lastPayment: Math.round(principalLastPayment),
                totalInterest: Math.round(principalTotalInterest)
            },
            savings: Math.round(equalTotalInterest - principalTotalInterest)
        };

        // 5. 중도상환 분석
        const calculateEarlyPayment = (years: number) => {
            const months = years * 12;
            let balance = principal;
            let totalInterestPaid = 0;

            for (let month = 1; month <= months; month++) {
                const interestPayment = balance * monthlyRate;
                const principalPayment = inputs.paymentType === 'equal'
                    ? monthlyPayment - interestPayment
                    : principalMonthlyPayment;

                totalInterestPaid += interestPayment;
                balance -= principalPayment;
            }

            // 중도상환 후 남은 잔액
            const remainingAfterEarlyPayment = Math.max(0, balance - earlyPaymentAmount);

            // 중도상환하지 않았을 때의 총 이자
            const originalTotalInterest = totalInterest;

            // 중도상환 후 남은 기간의 이자 (간단 계산)
            const remainingMonths = totalMonths - months;
            const remainingInterest = remainingAfterEarlyPayment > 0
                ? (remainingAfterEarlyPayment * monthlyRate * remainingMonths)
                : 0;

            const savedInterest = originalTotalInterest - (totalInterestPaid + remainingInterest);

            return {
                remainingBalance: Math.round(balance),
                savedInterest: Math.round(Math.max(0, savedInterest))
            };
        };

        const earlyPayment = {
            year3: calculateEarlyPayment(3),
            year5: calculateEarlyPayment(5),
            year10: calculateEarlyPayment(10)
        };

        // 6. 금리 민감도 분석
        const calculateRateSensitivity = (rateChange: number) => {
            const newRate = (annualRate + rateChange) / 12;
            const newMonthlyPayment = principal * (newRate * Math.pow(1 + newRate, totalMonths)) /
                (Math.pow(1 + newRate, totalMonths) - 1);
            const newTotalInterest = (newMonthlyPayment * totalMonths) - principal;

            return {
                monthlyPayment: Math.round(newMonthlyPayment),
                totalInterest: Math.round(newTotalInterest)
            };
        };

        const rateSensitivity = {
            rate1Lower: calculateRateSensitivity(-0.01), // -1%p
            rate1Higher: calculateRateSensitivity(0.01), // +1%p
            rate2Higher: calculateRateSensitivity(0.02)  // +2%p
        };

        // 7. 투자 대안 분석
        const monthlyInvestment = monthlyPayment;
        const investmentMonths = totalMonths;

        // 복리 계산: FV = PMT × [((1 + r)^n - 1) / r]
        const monthlyInvestmentReturn = investmentReturn / 12;
        const futureValue = monthlyInvestment *
            ((Math.pow(1 + monthlyInvestmentReturn, investmentMonths) - 1) / monthlyInvestmentReturn);

        // const totalInvestmentAmount = monthlyInvestment * investmentMonths; // 현재 사용되지 않음
        const netBenefit = futureValue - totalPayment;

        const investmentAlternative = {
            monthlyInvestment: Math.round(monthlyInvestment),
            expectedReturn: investmentReturn * 100,
            futureValue: Math.round(futureValue),
            netBenefit: Math.round(netBenefit)
        };

        const calculationResult: CalculationResult = {
            // 기본 계산
            monthlyPayment: Math.round(monthlyPayment),
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalInterest),

            // 상환 스케줄
            schedule: schedule.slice(0, 10),

            // 비교 분석
            comparison,

            // 중도상환 분석
            earlyPayment,

            // 금리 민감도 분석
            rateSensitivity,

            // 투자 대안 분석
            investmentAlternative
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* 헤더 */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                    <span className="mr-2">🏦</span>
                    대출 이자 전문 계산기
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    대출 이자 계산기
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    주택담보대출의 월 상환액과 총 이자를 미리 계산해보세요
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 입력 폼 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">📝 대출 정보 입력</h2>

                    <div className="space-y-4">
                        {/* 대출금액 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                대출금액 (만원) *
                            </label>
                            <input
                                type="text"
                                value={inputs.loanAmount}
                                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="예: 30000 (3억원)"
                            />
                            {errors.loanAmount && (
                                <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
                            )}
                        </div>

                        {/* 대출금리 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                연이율 (%) *
                            </label>
                            <input
                                type="text"
                                value={inputs.interestRate}
                                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.interestRate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="예: 4.5"
                            />
                            {errors.interestRate && (
                                <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
                            )}
                        </div>

                        {/* 대출기간 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                대출기간 (년) *
                            </label>
                            <select
                                value={inputs.loanPeriod}
                                onChange={(e) => handleInputChange('loanPeriod', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="10">10년</option>
                                <option value="15">15년</option>
                                <option value="20">20년</option>
                                <option value="25">25년</option>
                                <option value="30">30년</option>
                                <option value="35">35년</option>
                            </select>
                        </div>

                        {/* 상환방식 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                상환방식
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        value="equal"
                                        checked={inputs.paymentType === 'equal'}
                                        onChange={(e) => handleInputChange('paymentType', e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <div className="font-medium">원리금균등</div>
                                        <div className="text-xs text-gray-500">매월 동일한 금액</div>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        value="principal"
                                        checked={inputs.paymentType === 'principal'}
                                        onChange={(e) => handleInputChange('paymentType', e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <div className="font-medium">원금균등</div>
                                        <div className="text-xs text-gray-500">원금은 동일, 이자 감소</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* 중도상환 금액 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                중도상환 예상 금액 (만원)
                            </label>
                            <input
                                type="text"
                                value={inputs.earlyPaymentAmount}
                                onChange={(e) => handleInputChange('earlyPaymentAmount', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="예: 5000 (5천만원) 또는 0 (중도상환 없음)"
                            />
                            <p className="text-xs text-gray-500 mt-1">중도상환 효과 분석에 활용됩니다</p>
                        </div>

                        {/* 투자 수익률 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                대안 투자 수익률 (연%)
                            </label>
                            <select
                                value={inputs.investmentReturn}
                                onChange={(e) => handleInputChange('investmentReturn', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="3">3% (안전 자산)</option>
                                <option value="4">4% (채권형 펀드)</option>
                                <option value="5">5% (혼합형 펀드)</option>
                                <option value="6">6% (주식형 펀드)</option>
                                <option value="7">7% (적극 투자)</option>
                                <option value="8">8% (고위험 투자)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">대출 vs 투자 비교 분석에 활용됩니다</p>
                        </div>
                    </div>

                    <button
                        onClick={calculateLoan}
                        className="w-full mt-6 bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
                    >
                        대출 이자 계산하기
                    </button>
                </div>

                {/* 결과 표시 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">📊 계산 결과</h2>

                    {result ? (
                        <div className="space-y-6">
                            {/* 월 상환액 */}
                            <div className="text-center bg-purple-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {inputs.paymentType === 'equal' ? '월 상환액' : '첫 달 상환액'}
                                </h3>
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {formatWon(result.monthlyPayment)}
                                </div>
                                {inputs.paymentType === 'principal' && (
                                    <p className="text-sm text-gray-600">원금균등 방식은 매월 상환액이 감소합니다</p>
                                )}
                            </div>

                            {/* 총 상환 정보 */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">총 상환 정보</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>대출원금</span>
                                        <span className="font-medium">{formatWon(parseFloat(inputs.loanAmount) * 10000)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>총 이자</span>
                                        <span className="font-medium text-red-600">{formatWon(result.totalInterest)}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>총 상환액</span>
                                        <span className="text-purple-600">{formatWon(result.totalPayment)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 이자 비율 */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">이자 비율</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>원금 비율</span>
                                        <span className="font-medium">
                                            {Math.round((parseFloat(inputs.loanAmount) * 10000 / result.totalPayment) * 100)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>이자 비율</span>
                                        <span className="font-medium text-red-600">
                                            {Math.round((result.totalInterest / result.totalPayment) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 상환방식 비교 */}
                            <div className="bg-yellow-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">⚖️ 상환방식 비교</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium text-blue-600 mb-2">원리금균등</h4>
                                            <div className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span>월 상환액</span>
                                                    <span className="font-medium">{formatWon(result.comparison.equalPayment.monthlyPayment)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>총 이자</span>
                                                    <span className="font-medium">{formatWon(result.comparison.equalPayment.totalInterest)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-600 mb-2">원금균등</h4>
                                            <div className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span>첫 달 상환액</span>
                                                    <span className="font-medium">{formatWon(result.comparison.equalPrincipal.firstPayment)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>총 이자</span>
                                                    <span className="font-medium">{formatWon(result.comparison.equalPrincipal.totalInterest)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 rounded p-3 text-center">
                                        <span className="font-semibold text-green-800">
                                            원금균등 방식으로 {formatWon(result.comparison.savings)} 절약 가능!
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 중도상환 분석 */}
                            {parseFloat(inputs.earlyPaymentAmount || '0') > 0 && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3">💰 중도상환 효과 분석</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <div className="font-medium text-blue-600">3년 후</div>
                                                <div className="text-xs text-gray-600">잔액: {formatWon(result.earlyPayment.year3.remainingBalance)}</div>
                                                <div className="text-xs text-green-600">절약: {formatWon(result.earlyPayment.year3.savedInterest)}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-blue-600">5년 후</div>
                                                <div className="text-xs text-gray-600">잔액: {formatWon(result.earlyPayment.year5.remainingBalance)}</div>
                                                <div className="text-xs text-green-600">절약: {formatWon(result.earlyPayment.year5.savedInterest)}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-blue-600">10년 후</div>
                                                <div className="text-xs text-gray-600">잔액: {formatWon(result.earlyPayment.year10.remainingBalance)}</div>
                                                <div className="text-xs text-green-600">절약: {formatWon(result.earlyPayment.year10.savedInterest)}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            {formatWon(parseFloat(inputs.earlyPaymentAmount) * 10000)} 중도상환 시 이자 절약 효과
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 금리 민감도 분석 */}
                            <div className="bg-red-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">📈 금리 변동 영향 분석</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-green-600">금리 1%p 하락 시</span>
                                        <span className="font-medium">{formatWon(result.rateSensitivity.rate1Lower.monthlyPayment)}/월</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">현재 금리 ({inputs.interestRate}%)</span>
                                        <span className="font-medium">{formatWon(result.monthlyPayment)}/월</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-600">금리 1%p 상승 시</span>
                                        <span className="font-medium">{formatWon(result.rateSensitivity.rate1Higher.monthlyPayment)}/월</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-600">금리 2%p 상승 시</span>
                                        <span className="font-medium">{formatWon(result.rateSensitivity.rate2Higher.monthlyPayment)}/월</span>
                                    </div>
                                </div>
                            </div>

                            {/* 투자 대안 분석 */}
                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">💼 투자 vs 대출 비교</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>월 투자금액</span>
                                        <span className="font-medium">{formatWon(result.investmentAlternative.monthlyInvestment)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>예상 수익률</span>
                                        <span className="font-medium">{result.investmentAlternative.expectedReturn}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>투자 최종 가치</span>
                                        <span className="font-medium">{formatWon(result.investmentAlternative.futureValue)}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>투자 vs 대출 차이</span>
                                        <span className={result.investmentAlternative.netBenefit >= 0 ? 'text-green-600' : 'text-red-600'}>
                                            {result.investmentAlternative.netBenefit >= 0 ? '+' : ''}{formatWon(result.investmentAlternative.netBenefit)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {result.investmentAlternative.netBenefit >= 0
                                            ? '💡 투자가 대출보다 유리할 수 있습니다'
                                            : '💡 대출 상환이 투자보다 유리합니다'
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* 종합 조언 */}
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h3 className="font-semibold text-purple-800 mb-2">💡 종합 투자 조언</h3>
                                <div className="text-sm text-purple-700 space-y-1">
                                    {result.comparison.savings > 0 && (
                                        <p>✅ 원금균등 방식으로 {formatWon(result.comparison.savings)} 이자 절약 가능</p>
                                    )}
                                    {parseFloat(inputs.earlyPaymentAmount || '0') > 0 && result.earlyPayment.year5.savedInterest > 0 && (
                                        <p>💰 5년 후 중도상환으로 {formatWon(result.earlyPayment.year5.savedInterest)} 절약 가능</p>
                                    )}
                                    {result.investmentAlternative.netBenefit > 0 && (
                                        <p>📈 {inputs.investmentReturn}% 수익률 투자가 대출보다 {formatWon(result.investmentAlternative.netBenefit)} 유리</p>
                                    )}
                                    {result.totalInterest > parseFloat(inputs.loanAmount) * 10000 && (
                                        <p>⚠️ 총 이자가 원금을 초과합니다. 대출 조건 재검토 필요</p>
                                    )}
                                    <p>🏦 금리 변동에 민감하니 고정금리 vs 변동금리를 신중히 선택하세요</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🏦</div>
                            <p className="text-gray-500">
                                좌측에 대출 정보를 입력하고<br />
                                계산 버튼을 눌러주세요
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 상환 스케줄 */}
            {result && result.schedule.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">📅 연도별 상환 스케줄 (처음 10년)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 text-left font-medium text-gray-900">연도</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-900">원금상환</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-900">이자납부</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-900">잔여원금</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.schedule.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-3 font-medium">{item.year}년차</td>
                                        <td className="px-4 py-3 text-right">{formatWon(item.principal * 12)}</td>
                                        <td className="px-4 py-3 text-right text-red-600">{formatWon(item.interest * 12)}</td>
                                        <td className="px-4 py-3 text-right font-medium">{formatWon(item.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 대출 가이드 */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📚 대출 상환 방식 비교</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">원리금균등상환</h4>
                        <div className="text-sm text-blue-700 space-y-2">
                            <p><strong>장점:</strong></p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>매월 동일한 상환액으로 계획 수립 용이</li>
                                <li>초기 부담이 상대적으로 적음</li>
                            </ul>
                            <p><strong>단점:</strong></p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>총 이자 부담이 더 큼</li>
                                <li>초기에는 이자 비중이 높음</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-3">원금균등상환</h4>
                        <div className="text-sm text-green-700 space-y-2">
                            <p><strong>장점:</strong></p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>총 이자 부담이 적음</li>
                                <li>시간이 지날수록 부담 감소</li>
                            </ul>
                            <p><strong>단점:</strong></p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>초기 상환액이 높음</li>
                                <li>초기 현금흐름 부담</li>
                            </ul>
                        </div>
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

export default function LoanCalculatorPage() {
    return (
        <CalculatorWrapper>
            <LoanCalculatorContent />
        </CalculatorWrapper>
    );
}