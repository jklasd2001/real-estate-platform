'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SubscriptionResult {
  eligibility: {
    canApply: boolean;
    priority: string;
    score: number;
  };
  recommendations: string[];
  requirements: string[];
}

export default function SubscriptionCalculator() {
  const [age, setAge] = useState<string>('');
  const [marriageStatus, setMarriageStatus] = useState<string>('');
  const [children, setChildren] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [assets, setAssets] = useState<string>('');
  const [hasProperty, setHasProperty] = useState<boolean>(false);
  const [hasAppliedBefore, setHasAppliedBefore] = useState<boolean>(false);
  const [result, setResult] = useState<SubscriptionResult | null>(null);

  const calculateEligibility = () => {
    const ageNum = parseInt(age);
    const childrenNum = parseInt(children);
    const incomeNum = parseFloat(income.replace(/,/g, ''));
    const assetsNum = parseFloat(assets.replace(/,/g, ''));

    if (!ageNum || !incomeNum || !assetsNum) return;

    let score = 0;
    let recommendations: string[] = [];
    let requirements: string[] = [];

    // 기본 자격 요건 확인
    const isAdult = ageNum >= 19;
    const isUnderLimit = ageNum <= 60;
    const incomeUnderLimit = incomeNum <= 60000000; // 6천만원 이하
    const assetsUnderLimit = assetsNum <= 300000000; // 3억원 이하

    if (!isAdult) {
      requirements.push('만 19세 이상이어야 합니다.');
    }
    if (!isUnderLimit) {
      requirements.push('만 60세 이하여야 합니다.');
    }
    if (!incomeUnderLimit) {
      requirements.push('연소득 6천만원 이하여야 합니다.');
    }
    if (!assetsUnderLimit) {
      requirements.push('자산 3억원 이하여야 합니다.');
    }

    // 점수 계산
    if (isAdult && isUnderLimit && incomeUnderLimit && assetsUnderLimit) {
      // 나이 점수 (30-40세 최고점)
      if (ageNum >= 30 && ageNum <= 40) {
        score += 20;
      } else if (ageNum >= 25 && ageNum <= 45) {
        score += 15;
      } else {
        score += 10;
      }

      // 결혼 상태 점수
      if (marriageStatus === 'married') {
        score += 15;
        if (childrenNum > 0) {
          score += childrenNum * 5; // 자녀 1명당 5점
        }
      } else if (marriageStatus === 'single') {
        score += 5;
      }

      // 소득 점수 (적정 소득대)
      if (incomeNum >= 20000000 && incomeNum <= 40000000) {
        score += 20;
      } else if (incomeNum >= 15000000 && incomeNum <= 50000000) {
        score += 15;
      } else {
        score += 10;
      }

      // 자산 점수 (적정 자산대)
      if (assetsNum <= 100000000) {
        score += 20;
      } else if (assetsNum <= 200000000) {
        score += 15;
      } else {
        score += 10;
      }

      // 부동산 보유 여부 (보유 시 감점)
      if (hasProperty) {
        score -= 30;
        recommendations.push('부동산을 보유하고 있어 청약 우선순위가 낮아집니다.');
      }

      // 이전 청약 이력 (이력 있으면 감점)
      if (hasAppliedBefore) {
        score -= 10;
        recommendations.push('이전 청약 이력이 있어 우선순위가 낮아집니다.');
      }

      // 권장사항 생성
      if (score >= 70) {
        recommendations.push('청약 우선순위가 높습니다. 신청을 권장합니다.');
      } else if (score >= 50) {
        recommendations.push('청약 가능성이 있습니다. 지역과 주택 유형을 고려해보세요.');
      } else {
        recommendations.push('청약 우선순위가 낮습니다. 다른 주택 구매 방법을 고려해보세요.');
      }

      if (marriageStatus === 'single' && ageNum >= 30) {
        recommendations.push('결혼을 고려하시면 청약 우선순위가 높아집니다.');
      }

      if (childrenNum === 0 && marriageStatus === 'married') {
        recommendations.push('자녀가 있으면 청약 우선순위가 높아집니다.');
      }
    }

    const canApply = isAdult && isUnderLimit && incomeUnderLimit && assetsUnderLimit && !hasProperty;
    
    let priority = '';
    if (score >= 70) {
      priority = '높음';
    } else if (score >= 50) {
      priority = '보통';
    } else {
      priority = '낮음';
    }

    setResult({
      eligibility: {
        canApply,
        priority,
        score: Math.max(0, score),
      },
      recommendations,
      requirements,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🏘️ 청약 정보 확인</h1>
          <p className="text-lg text-gray-600">
            청약 가능 여부와 우선순위를 확인하고 청약 전략을 세워보세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">개인 정보 입력</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  나이
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="예: 30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  결혼 상태
                </label>
                <select
                  value={marriageStatus}
                  onChange={(e) => setMarriageStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">선택하세요</option>
                  <option value="single">미혼</option>
                  <option value="married">기혼</option>
                </select>
              </div>

              {marriageStatus === 'married' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자녀 수
                  </label>
                  <input
                    type="number"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    placeholder="예: 1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연소득 (원)
                </label>
                <input
                  type="text"
                  value={income}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setIncome(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                  }}
                  placeholder="예: 40,000,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  자산 (원)
                </label>
                <input
                  type="text"
                  value={assets}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setAssets(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                  }}
                  placeholder="예: 150,000,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasProperty"
                    checked={hasProperty}
                    onChange={(e) => setHasProperty(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasProperty" className="ml-2 text-sm text-gray-700">
                    부동산 보유 (아파트, 오피스텔 등)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasAppliedBefore"
                    checked={hasAppliedBefore}
                    onChange={(e) => setHasAppliedBefore(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasAppliedBefore" className="ml-2 text-sm text-gray-700">
                    이전 청약 이력 있음
                  </label>
                </div>
              </div>

              <button
                onClick={calculateEligibility}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                청약 가능성 확인하기
              </button>
            </div>
          </div>

          {/* 결과 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">청약 정보 결과</h2>
            
            {result ? (
              <div className="space-y-6">
                <div className={`rounded-lg p-6 ${result.eligibility.canApply ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${result.eligibility.canApply ? 'text-green-600' : 'text-red-600'}`}>
                      {result.eligibility.canApply ? '✅ 청약 가능' : '❌ 청약 불가'}
                    </div>
                    <div className="text-lg text-gray-700">
                      우선순위: <span className="font-medium">{result.eligibility.priority}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      점수: {result.eligibility.score}점
                    </div>
                  </div>
                </div>

                {result.requirements.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-medium text-red-900 mb-2">❌ 자격 요건 미충족</h3>
                    <ul className="text-sm text-red-800 space-y-1">
                      {result.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">💡 권장사항</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                개인 정보를 입력하고 확인 버튼을 눌러주세요
              </div>
            )}
          </div>
        </div>

        {/* 청약 정보 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">📋 청약 기본 정보</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">청약 자격 요건</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 만 19세 이상 60세 이하</li>
                <li>• 연소득 6천만원 이하</li>
                <li>• 자산 3억원 이하</li>
                <li>• 부동산 미보유 (일부 예외 있음)</li>
                <li>• 청약자 본인 및 가족</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">우선순위 기준</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 기혼자 (자녀 수에 따라 가점)</li>
                <li>• 연령대 (30-40세 최고점)</li>
                <li>• 소득 수준 (적정 소득대)</li>
                <li>• 자산 수준 (적정 자산대)</li>
                <li>• 부동산 보유 여부</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ 주의사항</h3>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• 계산 결과는 일반적인 기준이며, 실제 청약 시에는 지역별, 주택별로 기준이 다를 수 있습니다.</li>
            <li>• 청약 신청 시에는 정확한 서류 제출이 필요합니다.</li>
            <li>• 청약 당첨률은 지역과 주택 유형에 따라 크게 달라집니다.</li>
            <li>• 최신 청약 정보는 한국토지주택공사(LH) 홈페이지에서 확인하세요.</li>
            <li>• 청약 조건은 정부 정책에 따라 변경될 수 있습니다.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
