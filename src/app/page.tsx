import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🏠 부동산 계산기</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/calculators" className="text-gray-600 hover:text-gray-900">계산기</Link>
              <Link href="/info" className="text-gray-600 hover:text-gray-900">부동산 정보</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">소개</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            스마트한 부동산 투자를 위한<br />
            <span className="text-blue-600">종합 계산기</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            매매비용, DSR 계산, 청약 정보까지 한 번에 확인하세요.<br />
            정확한 계산으로 현명한 부동산 투자를 시작하세요.
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link href="/calculators/purchase-cost" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">매매비용 계산</h3>
                <p className="text-gray-600 mb-4">
                  부동산 매매 시 발생하는 모든 비용을 미리 계산해보세요
                </p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  계산하기 →
                </div>
              </div>
            </div>
          </Link>

          <Link href="/calculators/dsr" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">DSR 계산</h3>
                <p className="text-gray-600 mb-4">
                  총부채원리금상환비율을 계산하여 대출 가능 여부를 확인하세요
                </p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  계산하기 →
                </div>
              </div>
            </div>
          </Link>

          <Link href="/calculators/subscription" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🏘️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">청약 정보</h3>
                <p className="text-gray-600 mb-4">
                  청약 가능 여부와 우선순위를 확인하고 청약 전략을 세워보세요
                </p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  확인하기 →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">주요 기능</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">정확한 계산</h4>
              <p className="text-sm text-gray-600">최신 세법과 규정을 반영한 정확한 계산</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">빠른 결과</h4>
              <p className="text-sm text-gray-600">입력 즉시 결과를 확인할 수 있는 빠른 계산</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">모바일 최적화</h4>
              <p className="text-sm text-gray-600">모든 기기에서 편리하게 사용 가능</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🆓</div>
              <h4 className="font-semibold text-gray-900 mb-2">무료 이용</h4>
              <p className="text-sm text-gray-600">회원가입 없이 무료로 모든 기능 이용</p>
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
