'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DSRResult {
  dsrRatio: number;
  monthlyPayment: number;
  totalDebt: number;
  annualIncome: number;
  isEligible: boolean;
  recommendation: string;
}

export default function DSRCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [existingDebt, setExistingDebt] = useState<string>('');
  const [existingMonthlyPayment, setExistingMonthlyPayment] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [loanRate, setLoanRate] = useState<string>('3.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [result, setResult] = useState<DSRResult | null>(null);

  const calculateDSR = () => {
    const income = parseFloat(annualIncome.replace(/,/g, ''));
    const debt = parseFloat(existingDebt.replace(/,/g, ''));
    const existingPayment = parseFloat(existingMonthlyPayment.replace(/,/g, ''));
    const loan = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(loanRate) / 100;
    const term = parseInt(loanTerm);

    if (!income || !loan || !rate || !term) return;

    // 월 이자율
    const monthlyRate = rate / 12;
    const totalMonths = term * 12;

    // 새 대출의 월 상환액 계산 (원리금균등상환)
    const monthlyPayment = loan * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // 총 부채 (기존 부채 + 새 대출)
    const totalDebt = debt + loan;

    // 총 월 상환액 (기존 + 새 대출)
    const totalMonthlyPayment = existingPayment + monthlyPayment;

    // DSR 계산 (연간 상환액 / 연간 소득)
    const annualPayment = totalMonthlyPayment * 12;
    const dsrRatio = (annualPayment / income) * 100;

    // 대출 가능 여부 판단 (DSR 40% 이하)
    const isEligible = dsrRatio <= 40;

    let recommendation = '';
    if (dsrRatio <= 30) {
      recommendation = '안전한 수준입니다. 대출 승인 가능성이 높습니다.';
    } else if (dsrRatio <= 40) {
      recommendation = '적정 수준입니다. 대출 승인 가능성이 있습니다.';
    } else {
      recommendation = '위험한 수준입니다. 대출 승인이 어려울 수 있습니다.';
    }

    setResult({
      dsrRatio,
      monthlyPayment,
      totalDebt,
      annualIncome: income,
      isEligible,
      recommendation,
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">🏠 부동산 계산기</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/calculators" className="text-gray-600 hover:text-gray-900">계산기</Link>
              <Link href="/info" className="text-gray-600 hover:text-gray-900">부동산 정보</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">소개</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📊 DSR 계산기</h1>
          <p className="text-lg text-gray-600">
            총부채원리금상환비율을 계산하여 대출 가능 여부를 확인하세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">소득 및 부채 정보</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연간 소득 (원)
                </label>
                <input
                  type="text"
                  value={annualIncome}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setAnnualIncome(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                  }}
                  placeholder="예: 50,000,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기존 부채 잔액 (원)
                </label>
                <input
                  type="text"
                  value={existingDebt}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setExistingDebt(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                  }}
                  placeholder="예: 100,000,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기존 부채 월 상환액 (원)
                </label>
                <input
                  type="text"
                  value={existingMonthlyPayment}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setExistingMonthlyPayment(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                  }}
                  placeholder="예: 500,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">신규 대출 정보</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      대출 금액 (원)
                    </label>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setLoanAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                      }}
                      placeholder="예: 300,000,000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        금리 (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={loanRate}
                        onChange={(e) => setLoanRate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        대출 기간 (년)
                      </label>
                      <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="10">10년</option>
                        <option value="15">15년</option>
                        <option value="20">20년</option>
                        <option value="25">25년</option>
                        <option value="30">30년</option>
                        <option value="35">35년</option>
                        <option value="40">40년</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={calculateDSR}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                DSR 계산하기
              </button>
            </div>
          </div>

          {/* 결과 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">계산 결과</h2>
            
            {result ? (
              <div className="space-y-6">
                <div className={`rounded-lg p-6 ${result.isEligible ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${result.isEligible ? 'text-green-600' : 'text-red-600'}`}>
                      DSR: {result.dsrRatio.toFixed(2)}%
                    </div>
                    <div className={`text-lg font-medium ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>
                      {result.isEligible ? '✅ 대출 가능' : '❌ 대출 어려움'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">상환 정보</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">신규 대출 월 상환액</span>
                        <span className="font-medium">{formatNumber(Math.round(result.monthlyPayment))}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">총 월 상환액</span>
                        <span className="font-medium">{formatNumber(Math.round(result.monthlyPayment + parseFloat(existingMonthlyPayment.replace(/,/g, ''))))}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">총 부채</span>
                        <span className="font-medium">{formatNumber(Math.round(result.totalDebt))}원</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">💡 권장사항</h3>
                    <p className="text-sm text-blue-800">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                소득 및 부채 정보를 입력하고 계산 버튼을 눌러주세요
              </div>
            )}
          </div>
        </div>

        {/* 참고사항 */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">📋 참고사항</h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• DSR(총부채원리금상환비율)은 연간 상환액을 연간 소득으로 나눈 비율입니다.</li>
            <li>• 일반적으로 DSR 40% 이하일 때 대출 승인 가능성이 높습니다.</li>
            <li>• 실제 대출 승인은 신용도, 담보가치, 소득 안정성 등 다양한 요소를 종합적으로 고려합니다.</li>
            <li>• 금리는 시장 상황에 따라 변동될 수 있으니 최신 금리를 확인하세요.</li>
            <li>• 계산 결과는 참고용이며, 정확한 대출 조건은 금융기관에 문의하시기 바랍니다.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
