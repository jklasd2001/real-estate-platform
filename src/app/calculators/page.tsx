import Link from 'next/link';

export default function CalculatorsPage() {
  const calculators = [
    {
      title: '매매비용 계산',
      description: '부동산 매매 시 발생하는 모든 비용을 미리 계산해보세요',
      icon: '💰',
      href: '/calculators/purchase-cost',
      features: ['취득세 계산', '등록세 계산', '중개수수료 계산', '기타 비용 포함']
    },
    {
      title: 'DSR 계산',
      description: '총부채원리금상환비율을 계산하여 대출 가능 여부를 확인하세요',
      icon: '📊',
      href: '/calculators/dsr',
      features: ['DSR 비율 계산', '월 상환액 계산', '대출 가능성 판단', '권장사항 제공']
    },
    {
      title: '청약 정보',
      description: '청약 가능 여부와 우선순위를 확인하고 청약 전략을 세워보세요',
      icon: '🏘️',
      href: '/calculators/subscription',
      features: ['청약 자격 확인', '우선순위 점수 계산', '전략적 권장사항', '최신 청약 정보']
    }
  ];

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
              <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-medium">계산기</Link>
              <Link href="/info" className="text-gray-600 hover:text-gray-900">부동산 정보</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">소개</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">계산기 모음</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            부동산 투자와 관련된 모든 계산을 한 곳에서 해결하세요.<br />
            정확하고 빠른 계산으로 현명한 결정을 내리세요.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {calculators.map((calculator, index) => (
            <Link key={index} href={calculator.href} className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{calculator.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{calculator.title}</h3>
                  <p className="text-gray-600 mb-6">{calculator.description}</p>
                </div>
                
                <div className="space-y-2 mb-6">
                  {calculator.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    계산하기 →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">빠른 접근</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/calculators/purchase-cost" className="group">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:from-blue-100 hover:to-blue-200 transition-colors">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">매매비용</h4>
                <p className="text-sm text-gray-600">즉시 계산</p>
              </div>
            </Link>
            
            <Link href="/calculators/dsr" className="group">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 text-center hover:from-green-100 hover:to-green-200 transition-colors">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">DSR 계산</h4>
                <p className="text-sm text-gray-600">즉시 계산</p>
              </div>
            </Link>
            
            <Link href="/calculators/subscription" className="group">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 text-center hover:from-purple-100 hover:to-purple-200 transition-colors">
                <div className="text-3xl mb-3">🏘️</div>
                <h4 className="font-semibold text-gray-900 mb-2">청약 정보</h4>
                <p className="text-sm text-gray-600">즉시 확인</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💡 계산기 활용 팁</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">정확한 계산을 위해</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 최신 정보를 입력해주세요</li>
                <li>• 모든 옵션을 정확히 선택해주세요</li>
                <li>• 지역별 차이를 고려해주세요</li>
                <li>• 계산 결과는 참고용입니다</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">효과적인 활용법</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 여러 시나리오를 비교해보세요</li>
                <li>• 계산 결과를 저장해두세요</li>
                <li>• 전문가 상담과 함께 활용하세요</li>
                <li>• 정기적으로 재계산해보세요</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 부동산 계산기. 모든 계산 결과는 참고용이며, 실제 거래 시에는 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
