'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ResponsiveAd } from 'src/components/ad-sense'

interface LoanResult {
  // 대출 한도 정보
  maxLoanAmount: number
  availableAmount: number

  // 월 상환액 정보
  principalInterest: number // 원리금 상환액
  insuranceAmount: number // 보험료
  totalMonthlyPayment: number // 총 월 납입액

  // DSR 관련 정보
  dsrRatio: number
  dsrLimit: number
  isEligible: boolean

  // 필요 자금 정보
  downPayment: number // 계약금
  intermediatePayment: number // 중도금
  balance: number // 잔금
  purchaseCosts: number // 취득비용
  totalRequiredFunds: number // 총 필요자금

  // 상환 정보
  totalInterest: number // 총 이자
  totalAmount: number // 총 상환액

  recommendation: string
}

interface LoanParams {
  loanType: 'mortgage' | 'jeonse' | 'credit'
  region: 'regulated' | 'non-regulated'
  isFirstTime: boolean
  hasMultipleProperties: boolean
}

export default function LoanCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<string>('')
  const [annualIncome, setAnnualIncome] = useState<string>('')
  const [existingDebt, setExistingDebt] = useState<string>('')
  const [existingMonthlyPayment, setExistingMonthlyPayment] =
    useState<string>('')
  const [loanType, setLoanType] = useState<'mortgage' | 'jeonse' | 'credit'>(
    'mortgage',
  )
  const [region, setRegion] = useState<'regulated' | 'non-regulated'>(
    'regulated',
  )
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true)
  const [hasMultipleProperties, setHasMultipleProperties] =
    useState<boolean>(false)
  const [loanTerm, setLoanTerm] = useState<string>('30')
  const [interestRate, setInterestRate] = useState<string>('')
  const [result, setResult] = useState<LoanResult | null>(null)

  // 2024년 기준 대출 정책 적용
  const getLoanPolicy = () => {
    const price = Number.parseFloat(propertyPrice.replace(/,/g, ''))

    // 규제지역 여부와 주택가격에 따른 LTV/DTI 한도
    let ltvRatio = 0.7 // 기본 LTV 70%
    let dtiRatio = 0.4 // 기본 DTI 40%
    const dsrRatio = 0.4 // 기본 DSR 40%

    if (region === 'regulated') {
      // 규제지역 (서울, 수도권)
      if (price >= 1500000000) {
        // 15억 초과
        ltvRatio = 0.4
        dtiRatio = 0.3
      } else if (price >= 900000000) {
        // 9억~15억
        ltvRatio = 0.5
        dtiRatio = 0.4
      } else {
        // 9억 이하
        ltvRatio = 0.6
        dtiRatio = 0.4
      }
    } else {
      // 비규제지역
      if (price >= 600000000) {
        // 6억 초과
        ltvRatio = 0.6
      } else {
        ltvRatio = 0.7
      }
    }

    // 생애최초/다주택자 조건
    if (isFirstTime && !hasMultipleProperties) {
      ltvRatio = Math.min(ltvRatio + 0.1, 0.8) // 최대 80%
      dtiRatio = Math.min(dtiRatio + 0.1, 0.6) // 최대 60%
    }

    if (hasMultipleProperties) {
      ltvRatio = Math.max(ltvRatio - 0.1, 0.3) // 최소 30%
      dtiRatio = Math.max(dtiRatio - 0.1, 0.3) // 최소 30%
    }

    // 현재 시장 금리 (2024년 기준)
    let baseRate = 4.5 // 기준금리
    if (loanType === 'mortgage') {
      baseRate = region === 'regulated' ? 4.8 : 4.5
    } else if (loanType === 'jeonse') {
      baseRate = 4.2
    } else {
      baseRate = 6.5 // 신용대출
    }

    return { ltvRatio, dtiRatio, dsrRatio, baseRate }
  }

  const calculateLoan = () => {
    const price = Number.parseFloat(propertyPrice.replace(/,/g, ''))
    const income = Number.parseFloat(annualIncome.replace(/,/g, ''))
    const debt = Number.parseFloat(existingDebt.replace(/,/g, '')) || 0
    const existingPayment =
      Number.parseFloat(existingMonthlyPayment.replace(/,/g, '')) || 0
    const term = Number.parseInt(loanTerm)
    const customRate = Number.parseFloat(interestRate) || 0

    if (!price || !income) return

    const policy = getLoanPolicy()
    const rate = customRate > 0 ? customRate / 100 : policy.baseRate / 100

    // 대출 한도 계산
    const ltvAmount = price * policy.ltvRatio // LTV 기준
    const dtiAmount =
      (income * policy.dtiRatio) /
      (((rate / 12) * (1 + rate / 12) ** (term * 12)) /
        ((1 + rate / 12) ** (term * 12) - 1)) // DTI 기준
    const maxLoanAmount = Math.min(ltvAmount, dtiAmount)

    // 월 상환액 계산
    const monthlyRate = rate / 12
    const totalMonths = term * 12
    const principalInterest =
      (maxLoanAmount * (monthlyRate * (1 + monthlyRate) ** totalMonths)) /
      ((1 + monthlyRate) ** totalMonths - 1)

    // 보험료 (대출금액의 0.1~0.3% 정도)
    const insuranceAmount = (maxLoanAmount * 0.002) / 12 // 연 0.2%
    const totalMonthlyPayment = principalInterest + insuranceAmount

    // DSR 계산
    const totalMonthlyDebt = totalMonthlyPayment + existingPayment
    const dsrRatio = (totalMonthlyDebt * 12) / income
    const isEligible = dsrRatio <= policy.dsrRatio

    // 필요 자금 계산
    const downPayment = price * 0.1 // 계약금 10%
    const intermediatePayment = price * 0.1 // 중도금 10%
    const balance = price - maxLoanAmount - downPayment - intermediatePayment // 잔금

    // 취득비용 (취득세, 등록세 등 - 간단히 2.5% 적용)
    const purchaseCosts = price * 0.025
    const totalRequiredFunds =
      downPayment + intermediatePayment + balance + purchaseCosts

    // 총 상환 정보
    const totalAmount = principalInterest * totalMonths
    const totalInterest = totalAmount - maxLoanAmount

    // 추천사항
    let recommendation = ''
    if (dsrRatio <= 0.3) {
      recommendation =
        '매우 안전한 수준입니다. 대출 승인 가능성이 높고, 여유 있는 상환이 가능합니다.'
    } else if (dsrRatio <= 0.4) {
      recommendation =
        '적정 수준입니다. 대출 승인 가능성이 있으나, 가계 지출 관리가 필요합니다.'
    } else if (dsrRatio <= 0.6) {
      recommendation =
        '위험 수준입니다. 대출 승인이 어려울 수 있으며, 소득 증대나 기존 부채 정리가 필요합니다.'
    } else {
      recommendation =
        '매우 위험한 수준입니다. 현재 조건으로는 대출이 매우 어렵습니다.'
    }

    setResult({
      maxLoanAmount,
      availableAmount: Math.max(0, maxLoanAmount),
      principalInterest,
      insuranceAmount,
      totalMonthlyPayment,
      dsrRatio: dsrRatio * 100,
      dsrLimit: policy.dsrRatio * 100,
      isEligible,
      downPayment,
      intermediatePayment,
      balance: Math.max(0, balance),
      purchaseCosts,
      totalRequiredFunds,
      totalInterest,
      totalAmount,
      recommendation,
    })
  }

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString('ko-KR')
  }

  const formatWon = (num: number) => {
    const value = Math.round(num)
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억원`
    }
    if (value >= 10000000) {
      return `${Math.round(value / 10000000)}천만원`
    }
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`
    }
    return `${formatNumber(value)}원`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🏠 부동산 계산기
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/calculators"
                className="text-gray-600 hover:text-gray-900"
              >
                계산기
              </Link>
              <Link href="/info" className="text-gray-600 hover:text-gray-900">
                부동산 정보
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                소개
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🏦 종합 대출 계산기
          </h1>
          <p className="text-lg text-gray-600">
            주택담보대출, 전세대출, 필요자금을 종합적으로 계산하여 최적의 대출
            계획을 세우세요
          </p>
        </div>

        {/* Top Ad */}
        <div className="mb-8 flex justify-center">
          <ResponsiveAd />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 입력 폼 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 부동산 정보 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🏠 부동산 정보
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    매매가격/전세가격 (원)
                  </label>
                  <input
                    type="text"
                    value={propertyPrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setPropertyPrice(
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      )
                    }}
                    placeholder="예: 800,000,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대출 유형
                  </label>
                  <select
                    value={loanType}
                    onChange={(e) =>
                      setLoanType(
                        e.target.value as 'mortgage' | 'jeonse' | 'credit',
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="mortgage">주택담보대출</option>
                    <option value="jeonse">전세대출</option>
                    <option value="credit">신용대출</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지역 구분
                  </label>
                  <select
                    value={region}
                    onChange={(e) =>
                      setRegion(e.target.value as 'regulated' | 'non-regulated')
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="regulated">규제지역 (서울/수도권 등)</option>
                    <option value="non-regulated">비규제지역</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4 pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isFirstTime}
                      onChange={(e) => setIsFirstTime(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">생애최초</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasMultipleProperties}
                      onChange={(e) =>
                        setHasMultipleProperties(e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">다주택자</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 소득 및 부채 정보 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                💰 소득 및 부채 정보
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연간 소득 (원)
                  </label>
                  <input
                    type="text"
                    value={annualIncome}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setAnnualIncome(
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      )
                    }}
                    placeholder="예: 60,000,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    기존 부채 (원)
                  </label>
                  <input
                    type="text"
                    value={existingDebt}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setExistingDebt(
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      )
                    }}
                    placeholder="예: 50,000,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기존 월 상환액 (원)
                </label>
                <input
                  type="text"
                  value={existingMonthlyPayment}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '')
                    setExistingMonthlyPayment(
                      value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    )
                  }}
                  placeholder="예: 300,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 대출 조건 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ⚙️ 대출 조건
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대출 기간
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
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    금리 (%, 선택사항)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="미입력시 시장금리 적용"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={calculateLoan}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
              >
                종합 대출 계산하기
              </button>
            </div>
          </div>

          {/* 결과 */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* DSR 현황 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📊 DSR 현황
                  </h3>
                  <div
                    className={`rounded-lg p-4 text-center ${result.isEligible ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    <div
                      className={`text-2xl font-bold mb-2 ${result.isEligible ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {result.dsrRatio.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      한도: {result.dsrLimit}%
                    </div>
                    <div
                      className={`font-medium ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}
                    >
                      {result.isEligible ? '✅ 승인 가능' : '❌ 승인 어려움'}
                    </div>
                  </div>
                </div>

                {/* 대출 한도 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💳 대출 한도
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">최대 대출액</span>
                      <span className="font-semibold text-blue-600">
                        {formatWon(result.maxLoanAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 월 납입액 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📅 월 납입액
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">원리금</span>
                      <span className="font-medium">
                        {formatNumber(result.principalInterest)}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">보험료</span>
                      <span className="font-medium">
                        {formatNumber(result.insuranceAmount)}원
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                          총 월 납입액
                        </span>
                        <span className="font-bold text-lg text-blue-600">
                          {formatNumber(result.totalMonthlyPayment)}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 필요 자금 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💸 필요 자금
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">계약금 (10%)</span>
                      <span className="font-medium">
                        {formatWon(result.downPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">중도금 (10%)</span>
                      <span className="font-medium">
                        {formatWon(result.intermediatePayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">잔금</span>
                      <span className="font-medium">
                        {formatWon(result.balance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">취득비용</span>
                      <span className="font-medium">
                        {formatWon(result.purchaseCosts)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                          총 필요자금
                        </span>
                        <span className="font-bold text-lg text-red-600">
                          {formatWon(result.totalRequiredFunds)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 총 상환 정보 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    📈 총 상환 정보
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 이자</span>
                      <span className="font-medium">
                        {formatWon(result.totalInterest)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                          총 상환액
                        </span>
                        <span className="font-bold text-lg text-gray-900">
                          {formatWon(result.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 추천사항 */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    💡 추천사항
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">🏦</div>
                  <p>
                    부동산 정보와 소득을 입력하고
                    <br />
                    계산 버튼을 눌러주세요
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 중간 광고 */}
        <div className="mt-12 mb-8 flex justify-center">
          <ResponsiveAd />
        </div>

        {/* 참고사항 */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">
            📋 2024년 대출 정책 참고사항
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-yellow-700">
            <div>
              <h4 className="font-semibold mb-2">🏠 주택담보대출 (LTV/DTI)</h4>
              <ul className="space-y-1">
                <li>• 규제지역 15억 초과: LTV 40%, DTI 30%</li>
                <li>• 규제지역 9~15억: LTV 50%, DTI 40%</li>
                <li>• 규제지역 9억 이하: LTV 60%, DTI 40%</li>
                <li>• 생애최초 우대: LTV +10%p, DTI +10%p</li>
                <li>• 다주택자 제한: LTV -10%p, DTI -10%p</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 DSR 및 기타</h4>
              <ul className="space-y-1">
                <li>• DSR 40% 이하 (일반적 기준)</li>
                <li>• 스트레스 DSR: 대출금리 +1.5%p 적용</li>
                <li>• 전세대출: 전세가의 80~90% 한도</li>
                <li>• 금리 상승 리스크 고려 필요</li>
                <li>• 실제 승인은 은행별 심사 기준 상이</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">
              ⚠️ 본 계산기는 참고용이며, 실제 대출 승인 및 조건은 금융기관의
              심사를 통해 결정됩니다. 정확한 대출 상담은 각 금융기관에
              문의하시기 바랍니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
