import Link from "next/link";

export default function Privacy() {
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 개인정보 수집·이용 목적</h2>
              <p className="text-gray-700 leading-7">
                본 웹사이트는 부동산 계산 서비스 제공을 위해 최소한의 개인정보를 수집·이용합니다.
                계산기 기능 제공, 서비스 개선, 웹사이트 운영을 위한 목적으로만 사용됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>
              <div className="text-gray-700 leading-7">
                <p className="mb-4">본 웹사이트에서 수집하는 정보는 다음과 같습니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>계산기 이용 시 입력하는 부동산 관련 수치 정보 (일시적 처리용)</li>
                  <li>웹사이트 이용 로그 (접속 IP, 브라우저 정보, 접속 시간)</li>
                  <li>쿠키를 통한 이용자 경험 개선 정보</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 개인정보 보유 및 이용기간</h2>
              <p className="text-gray-700 leading-7">
                계산 입력 데이터는 계산 완료 후 즉시 삭제되며, 웹사이트 이용 로그는 1년간 보관 후 자동 삭제됩니다.
                법령에 따라 보관이 필요한 경우 해당 기간 동안 보관합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 제3자 제공</h2>
              <p className="text-gray-700 leading-7">
                본 웹사이트는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
                다만, 법령에 따라 요구되는 경우에는 관련 법령에 따라 제공할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 광고 서비스 관련 정보</h2>
              <div className="text-gray-700 leading-7">
                <p className="mb-4">본 웹사이트는 Google AdSense를 통해 광고를 게재합니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google AdSense는 쿠키를 사용하여 관련성 있는 광고를 제공합니다</li>
                  <li>광고 개인화 설정은 <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:text-blue-800 underline">Google 광고 설정</a>에서 관리할 수 있습니다</li>
                  <li>브라우저 쿠키 설정을 통해 광고 쿠키를 거부할 수 있습니다</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 쿠키 정책</h2>
              <div className="text-gray-700 leading-7">
                <p className="mb-4">본 웹사이트는 다음과 같은 쿠키를 사용합니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>필수 쿠키:</strong> 웹사이트 기본 기능 제공</li>
                  <li><strong>성능 쿠키:</strong> 웹사이트 이용 통계 수집 (익명)</li>
                  <li><strong>광고 쿠키:</strong> Google AdSense를 통한 맞춤 광고 제공</li>
                </ul>
                <p className="mt-4">
                  브라우저 설정에서 쿠키를 관리할 수 있으며, 필수 쿠키를 제외한 쿠키는 거부할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 이용자 권리</h2>
              <div className="text-gray-700 leading-7">
                <p className="mb-4">이용자는 다음과 같은 권리를 가집니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>개인정보 처리 현황에 대한 열람 요구</li>
                  <li>오류 등이 있을 경우 정정·삭제 요구</li>
                  <li>개인정보 처리정지 요구</li>
                  <li>손해배상 요구</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 정보보호 책임자</h2>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                <p>개인정보 처리에 관한 업무를 총괄하여 책임지는 개인정보 보호책임자의 연락처는 다음과 같습니다:</p>
                <div className="mt-2">
                  <p><strong>이메일:</strong> privacy@realestatecalc.kr</p>
                  <p className="text-sm text-gray-600 mt-2">
                    개인정보와 관련한 문의사항이 있으실 경우 위 연락처로 문의하시기 바랍니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 정책 변경</h2>
              <p className="text-gray-700 leading-7">
                본 개인정보처리방침은 법령이나 서비스의 변경에 따라 수정될 수 있습니다.
                변경 시에는 웹사이트 공지사항을 통해 공지하며, 중요한 변경사항은 30일 전에 미리 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. 시행일자</h2>
              <p className="text-gray-700 leading-7">
                본 개인정보처리방침은 2024년 1월 1일부터 시행됩니다.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              본 개인정보처리방침에 대한 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
            </p>
            <div className="text-center mt-4">
              <Link 
                href="/" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">개인정보처리방침</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">이용약관</Link>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 부동산 계산기. 모든 계산 결과는 참고용이며, 실제 거래 시에는 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </footer>
    </div>
  );
}