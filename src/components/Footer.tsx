import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo Section */}
          <div>
            <img src="/ge-ez_footer.png" alt="Ge'ez Calc Logo" className="h-12 w-auto mb-3" />
            <p className="text-sm text-gray-400">Ethiopian calendar, date, and number conversion tools</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Support Us
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Ge'ez Calc. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

