'use client'

import Link from 'next/link'
import { useState } from 'react'

interface PurchaseCostResult {
  totalCost: number
  breakdown: {
    acquisitionTax: number
    registrationTax: number
    educationTax: number
    stampTax: number
    brokerageFee: number
    otherFees: number
  }
}

export default function PurchaseCostCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<string>('')
  const [isFirstHome, setIsFirstHome] = useState<boolean>(false)
  const [isMultipleHomes, setIsMultipleHomes] = useState<boolean>(false)
  const [result, setResult] = useState<PurchaseCostResult | null>(null)

  const calculateCosts = () => {
    const price = Number.parseFloat(propertyPrice.replace(/,/g, ''))
    if (!price || price <= 0) return

    // 취득세 계산 (2024년 기준)
    let acquisitionTaxRate = 0.01 // 기본 1%
    if (price >= 600000000) acquisitionTaxRate = 0.02 // 6억 이상 2%
    if (price >= 900000000) acquisitionTaxRate = 0.03 // 9억 이상 3%
    if (price >= 1200000000) acquisitionTaxRate = 0.04 // 12억 이상 4%

    // 첫 집 구매자 할인
    if (isFirstHome && price <= 900000000) {
      acquisitionTaxRate = 0.01
    }

    // 다주택자 중과세
    if (isMultipleHomes) {
      acquisitionTaxRate *= 1.2
    }

    const acquisitionTax = Math.floor(price * acquisitionTaxRate)

    // 등록세 계산 (취득세의 20%)
    const registrationTax = Math.floor(acquisitionTax * 0.2)

    // 교육세 계산 (취득세의 20%)
    const educationTax = Math.floor(acquisitionTax * 0.2)

    // 인지세 계산
    let stampTax = 0
    if (price >= 10000000) stampTax = 7000
    if (price >= 100000000) stampTax = 35000
    if (price >= 1000000000) stampTax = 70000

    // 중개수수료 계산 (매매가의 0.4~0.9%)
    const brokerageFee = Math.floor(price * 0.006)

    // 기타 비용 (인터넷 등기, 감정평가 등)
    const otherFees = 200000

    const breakdown = {
      acquisitionTax,
      registrationTax,
      educationTax,
      stampTax,
      brokerageFee,
      otherFees,
    }

    const totalCost = Object.values(breakdown).reduce(
      (sum, cost) => sum + cost,
      0,
    )

    setResult({
      totalCost,
      breakdown,
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR')
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💰 매매비용 계산기
          </h1>
          <p className="text-lg text-gray-600">
            부동산 매매 시 발생하는 모든 비용을 미리 계산해보세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              매매 정보 입력
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  매매가격 (원)
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
                  placeholder="예: 500,000,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="firstHome"
                    checked={isFirstHome}
                    onChange={(e) => setIsFirstHome(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="firstHome"
                    className="ml-2 text-sm text-gray-700"
                  >
                    첫 집 구매자 (9억 이하 취득세 1% 적용)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="multipleHomes"
                    checked={isMultipleHomes}
                    onChange={(e) => setIsMultipleHomes(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="multipleHomes"
                    className="ml-2 text-sm text-gray-700"
                  >
                    다주택자 (중과세 20% 추가)
                  </label>
                </div>
              </div>

              <button
                onClick={calculateCosts}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                비용 계산하기
              </button>
            </div>
          </div>

          {/* 결과 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              계산 결과
            </h2>

            {result ? (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      총 비용: {formatNumber(result.totalCost)}원
                    </div>
                    <div className="text-sm text-gray-600">
                      매매가 대비{' '}
                      {(
                        (result.totalCost /
                          Number.parseFloat(propertyPrice.replace(/,/g, ''))) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">취득세</span>
                    <span className="font-medium">
                      {formatNumber(result.breakdown.acquisitionTax)}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">등록세</span>
                    <span className="font-medium">
                      {formatNumber(result.breakdown.registrationTax)}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">교육세</span>
                    <span className="font-medium">
                      {formatNumber(result.breakdown.educationTax)}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">인지세</span>
                    <span className="font-medium">
                      {formatNumber(result.breakdown.stampTax)}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">중개수수료</span>
                    <span className="font-medium">
                      {formatNumber(result.breakdown.brokerageFee)}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">기타 비용</span>
                    <span className="font-medium">
                      {formatNumber(result.breakdown.otherFees)}원
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                매매 정보를 입력하고 계산 버튼을 눌러주세요
              </div>
            )}
          </div>
        </div>

        {/* 참고사항 */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            📋 참고사항
          </h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• 계산 결과는 2024년 기준 세법을 반영한 참고용입니다.</li>
            <li>
              • 실제 거래 시에는 지역별 세율 차이, 특별할인 등이 적용될 수
              있습니다.
            </li>
            <li>
              • 정확한 계산을 위해서는 관할 세무서나 부동산 전문가와 상담하시기
              바랍니다.
            </li>
            <li>• 중개수수료는 실제 거래 시 협의에 따라 달라질 수 있습니다.</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
