import Link from 'next/link';

export default function RealEstateInfoPage() {
  const infoSections = [
    {
      title: '부동산 시장 동향',
      icon: '📈',
      content: [
        '전국 아파트 평균 매매가격 동향',
        '지역별 부동산 시장 분석',
        '부동산 투자 전망',
        '정부 정책 영향 분석'
      ]
    },
    {
      title: '세금 정보',
      icon: '💰',
      content: [
        '취득세 계산 방법',
        '양도소득세 계산',
        '종합부동산세 정보',
        '세금 절약 방법'
      ]
    },
    {
      title: '대출 정보',
      icon: '🏦',
      content: [
        '주택담보대출 조건',
        '전세자금대출 정보',
        'DSR 규제 현황',
        '금리 동향 및 전망'
      ]
    },
    {
      title: '청약 정보',
      icon: '🏘️',
      content: [
        '청약 자격 요건',
        '청약 우선순위 기준',
        '신규 분양 정보',
        '청약 전략 가이드'
      ]
    }
  ];

  const recentNews = [
    {
      title: '2024년 부동산 시장 전망',
      date: '2024.01.15',
      summary: '정부의 부동산 정책 변화와 시장 전망에 대한 전문가 분석'
    },
    {
      title: 'DSR 규제 완화 논의',
      date: '2024.01.10',
      summary: '총부채원리금상환비율 규제 완화 가능성에 대한 검토'
    },
    {
      title: '신규 청약 단지 정보',
      date: '2024.01.08',
      summary: '전국 주요 지역 신규 분양 단지 정보 및 청약 일정'
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
              <Link href="/info" className="text-blue-600 hover:text-blue-700 font-medium">부동산 정보</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">소개</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">부동산 정보 센터</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            부동산 투자와 관련된 최신 정보와 유용한 자료를 제공합니다.<br />
            정확한 정보로 현명한 부동산 투자 결정을 내리세요.
          </p>
        </div>

        {/* Information Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {infoSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-700">
                    <span className="text-blue-500 mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📰 최신 부동산 뉴스</h3>
          <div className="space-y-6">
            {recentNews.map((news, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{news.title}</h4>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <p className="text-gray-600">{news.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/calculators/purchase-cost" className="group">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:from-blue-100 hover:to-blue-200 transition-colors">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">매매비용 계산</h4>
              <p className="text-sm text-gray-600">부동산 매매 시 모든 비용을 계산해보세요</p>
            </div>
          </Link>
          
          <Link href="/calculators/dsr" className="group">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 text-center hover:from-green-100 hover:to-green-200 transition-colors">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900 mb-2">DSR 계산</h4>
              <p className="text-sm text-gray-600">대출 가능 여부를 미리 확인하세요</p>
            </div>
          </Link>
          
          <Link href="/calculators/subscription" className="group">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 text-center hover:from-purple-100 hover:to-purple-200 transition-colors">
              <div className="text-3xl mb-3">🏘️</div>
              <h4 className="font-semibold text-gray-900 mb-2">청약 정보</h4>
              <p className="text-sm text-gray-600">청약 가능성과 전략을 확인하세요</p>
            </div>
          </Link>
        </div>

        {/* Market Trends */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 시장 동향 요약</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">주요 지표</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">전국 아파트 평균가</span>
                  <span className="font-medium text-gray-900">4억 2천만원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">전월 대비 변동</span>
                  <span className="font-medium text-red-600">-0.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">주택담보대출 금리</span>
                  <span className="font-medium text-gray-900">3.5~4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">DSR 규제 기준</span>
                  <span className="font-medium text-gray-900">40% 이하</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">투자 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 지역별 시장 분석을 통한 투자 기회 파악</li>
                <li>• 정부 정책 변화에 따른 시장 영향 분석</li>
                <li>• 장기적 관점에서의 부동산 투자 전략</li>
                <li>• 리스크 관리와 포트폴리오 구성</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 부동산 계산기. 모든 정보는 참고용이며, 투자 결정 시에는 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
