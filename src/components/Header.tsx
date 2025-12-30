import { Link, useLocation } from 'react-router-dom'
import { TodayWidget } from './TodayWidget'

export function Header() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="bg-gray-800 text-white" role="banner">
      <div className="px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
            <img src="/ge-ez.png" alt="Ge'ez Calc Logo" className="h-6 sm:h-8 w-auto flex-shrink-0" aria-hidden="true" />
            <h1 className="hidden sm:block text-2xl font-medium tracking-tight">
              <span style={{ color: '#ebbe7c' }}>Ge'ez</span>{' '}
              <span style={{ color: '#c99443' }}>Calc</span>
            </h1>
          </Link>
          <div className="hidden sm:block border-l border-gray-700 pl-4">
            <TodayWidget variant="header" />
          </div>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm min-w-0" role="navigation" aria-label="Main navigation">
          <Link
            to="/"
            className={`transition-colors focus:outline-none rounded px-2 py-1 ${
              isActive('/') ? 'text-white' : 'text-gray-400 hover:text-primary-400'
            }`}
            aria-label="Navigate to Calendar page"
          >
            Calendar
          </Link>
          <Link
            to="/dates"
            className={`transition-colors focus:outline-none rounded px-2 py-1 ${
              isActive('/dates') ? 'text-white' : 'text-gray-400 hover:text-primary-400'
            }`}
            aria-label="Navigate to Date Converter page"
          >
            Dates
          </Link>
          <Link
            to="/numbers"
            className={`transition-colors focus:outline-none rounded px-2 py-1 ${
              isActive('/numbers') ? 'text-white' : 'text-gray-400 hover:text-primary-400'
            }`}
            aria-label="Navigate to Number Converter page"
          >
            Numbers
          </Link>
          <Link
            to="/learn"
            className={`transition-colors focus:outline-none rounded px-2 py-1 ${
              isActive('/learn') ? 'text-white' : 'text-gray-400 hover:text-primary-400'
            }`}
            aria-label="Navigate to Learn Hub page"
            aria-current={isActive('/learn') ? 'page' : undefined}
          >
            Learn
          </Link>
        </nav>
      </div>
    </header>
  )
}

