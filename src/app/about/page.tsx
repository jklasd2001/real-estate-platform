import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      title: '정확한 계산',
      description: '최신 세법과 규정을 반영한 정확한 계산 결과를 제공합니다.',
      icon: '🎯'
    },
    {
      title: '빠른 결과',
      description: '입력 즉시 결과를 확인할 수 있는 빠른 계산 시스템입니다.',
      icon: '⚡'
    },
    {
      title: '모바일 최적화',
      description: '모든 기기에서 편리하게 사용할 수 있도록 최적화되었습니다.',
      icon: '📱'
    },
    {
      title: '무료 이용',
      description: '회원가입 없이 무료로 모든 기능을 이용할 수 있습니다.',
      icon: '🆓'
    }
  ];

  const calculators = [
    {
      name: '매매비용 계산기',
      description: '부동산 매매 시 발생하는 취득세, 등록세, 중개수수료 등 모든 비용을 계산합니다.',
      accuracy: '95%'
    },
    {
      name: 'DSR 계산기',
      description: '총부채원리금상환비율을 계산하여 대출 가능 여부를 판단합니다.',
      accuracy: '98%'
    },
    {
      name: '청약 정보 확인',
      description: '청약 자격 요건과 우선순위를 확인하여 청약 전략을 수립합니다.',
      accuracy: '90%'
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
              <Link href="/calculators" className="text-gray-600 hover:text-gray-900">계산기</Link>
              <Link href="/info" className="text-gray-600 hover:text-gray-900">부동산 정보</Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium">소개</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            부동산 계산기 소개
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            스마트한 부동산 투자를 위한 종합 계산기 플랫폼입니다.<br />
            정확한 계산과 신뢰할 수 있는 정보로 현명한 부동산 투자 결정을 도와드립니다.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/calculators" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              계산기 사용하기
            </Link>
            <Link href="/info" className="bg-white text-gray-700 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
              부동산 정보 보기
            </Link>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">우리의 미션</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              복잡한 부동산 투자 과정에서 발생하는 모든 계산을 간단하고 정확하게 제공하여, 
              누구나 쉽게 부동산 투자에 대한 정보를 얻고 현명한 결정을 내릴 수 있도록 돕는 것이 우리의 목표입니다.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">주요 특징</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculators */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">계산기 정확도</h2>
          <div className="space-y-6">
            {calculators.map((calculator, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{calculator.name}</h3>
                    <p className="text-gray-600 mb-4">{calculator.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{calculator.accuracy}</div>
                    <div className="text-sm text-gray-500">정확도</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">기술 스택</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚛️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">React & Next.js</h3>
              <p className="text-gray-600">현대적인 웹 기술로 빠르고 안정적인 서비스 제공</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
              <p className="text-gray-600">반응형 디자인으로 모든 기기에서 최적의 경험</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">실시간 계산</h3>
              <p className="text-gray-600">입력 즉시 정확한 결과를 제공하는 실시간 계산 엔진</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">문의하기</h2>
          <p className="text-lg text-gray-600 mb-8">
            계산기 사용 중 궁금한 점이나 개선 사항이 있으시면 언제든 연락해주세요.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">이메일</h3>
              <p className="text-gray-600">support@realestate-calc.com</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">피드백</h3>
              <p className="text-gray-600">계산기 개선 의견</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">업데이트</h3>
              <p className="text-gray-600">정기적인 기능 업데이트</p>
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
