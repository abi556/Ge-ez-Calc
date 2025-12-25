import { useState, useMemo } from 'react'
import { safeArabicToGeez, safeGeezToArabic, ALL_GEEZ_NUMERALS, validateGeezInput } from './utils/geezConverter'
import { TodayWidget } from './components/TodayWidget'
import { CalendarPage } from './components/CalendarPage'
import { DateConverterPage } from './components/DateConverterPage'
import { LightbulbIcon, CheckIcon, ClipboardIcon } from './components/Icons'

// Page types for navigation
type Page = 'converter' | 'calendar' | 'learn' | 'dates'

function App() {
  // Page navigation state - Calendar is the default landing page
  const [currentPage, setCurrentPage] = useState<Page>('calendar')

  // Converter state
  const [arabicInput, setArabicInput] = useState('')
  const [geezInput, setGeezInput] = useState('')
  const [activeTab, setActiveTab] = useState<'toGeez' | 'toArabic'>('toGeez')
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)

  // Real conversion using geezify library
  const convertedGeez = useMemo(() => {
    if (!arabicInput) return ''
    const num = parseInt(arabicInput, 10)
    if (isNaN(num) || num < 1) return ''
    return safeArabicToGeez(num) ?? ''
  }, [arabicInput])

  const convertedArabic = useMemo(() => {
    if (!geezInput) return ''
    const result = safeGeezToArabic(geezInput)
    return result !== null ? result.toLocaleString() : ''
  }, [geezInput])

  // Validation messages
  const arabicError = useMemo(() => {
    if (!arabicInput) return null
    const num = parseFloat(arabicInput)
    if (isNaN(num)) return 'Please enter a valid number'
    if (num < 1) return 'Ge\'ez numerals start from 1 (no zero)'
    if (!Number.isInteger(num)) return 'Decimals are not supported in Ge\'ez'
    // No upper limit - hybrid system with nested ፼ supports any size!
    return null
  }, [arabicInput])

  // Validate Ge'ez input structure
  const geezError = useMemo(() => {
    if (!geezInput) return null
    return validateGeezInput(geezInput)
  }, [geezInput])

  const handleGeezKeyPress = (symbol: string) => {
    setGeezInput(prev => prev + symbol)
  }

  const handleBackspace = () => {
    setGeezInput(prev => prev.slice(0, -1))
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopyFeedback(text)
    setTimeout(() => setCopyFeedback(null), 2000)
  }

  // Render Calendar Page
  if (currentPage === 'calendar') {
    return <CalendarPage onNavigate={setCurrentPage} />
  }

  // Render Dates Page
  if (currentPage === 'dates') {
    return <DateConverterPage onNavigate={setCurrentPage} />
  }

  // Render Learn Page (placeholder for now)
  if (currentPage === 'learn') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header - Full width */}
        <header className="bg-gray-800 text-white">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-teal-400 text-xl font-semibold">ግ</span>
                <h1 className="text-lg font-medium tracking-tight">Ge'ez Calc</h1>
              </div>
              <div className="hidden sm:block border-l border-gray-700 pl-4">
                <TodayWidget variant="header" />
              </div>
            </div>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm">
              <button 
                onClick={() => setCurrentPage('calendar')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Calendar
              </button>
              <button 
                onClick={() => setCurrentPage('dates')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Dates
              </button>
              <button 
                onClick={() => setCurrentPage('converter')}
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                Numbers
              </button>
              <button 
                onClick={() => setCurrentPage('learn')}
                className="text-white hover:text-teal-400 transition-colors"
              >
                Learn
              </button>
            </nav>
          </div>
        </header>

        {/* Learn Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Learn Hub</h2>
            <p className="text-gray-600 mb-6">Coming soon! Educational content about Ge'ez numerals and Ethiopian calendar.</p>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-sm text-gray-400 border-t border-gray-200">
          <p>Ge'ez Calc — Discover Ethiopian Heritage</p>
        </footer>
      </div>
    )
  }

  // Render Converter Page (default)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header - Full width */}
      <header className="bg-gray-800 text-white">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-xl font-semibold">ግ</span>
              <h1 className="text-lg font-medium tracking-tight">Ge'ez Calc</h1>
            </div>
            {/* Today's Date in Header - Subtle */}
            <div className="hidden sm:block border-l border-gray-700 pl-4">
              <TodayWidget variant="header" />
            </div>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm">
            <button 
              onClick={() => setCurrentPage('calendar')}
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              Calendar
            </button>
            <button 
              onClick={() => setCurrentPage('dates')}
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              Dates
            </button>
            <button 
              onClick={() => setCurrentPage('converter')}
              className="text-white hover:text-teal-400 transition-colors"
            >
              Numbers
            </button>
            <button 
              onClick={() => setCurrentPage('learn')}
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              Learn
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:py-6 lg:px-8">
        <div className="w-full">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
              Number Converter
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Convert between Arabic and Ge'ez numerals
            </p>
          </div>

          {/* Two Column Layout for Desktop */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left Column - Main Converter */}
            <div className="flex-1">
              {/* Converter Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
                {/* Tab Switcher */}
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab('toGeez')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'toGeez'
                        ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Arabic → Ge'ez
                  </button>
                  <button
                    onClick={() => setActiveTab('toArabic')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'toArabic'
                        ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Ge'ez → Arabic
                  </button>
                </div>

                {/* Converter Content */}
                <div className="p-6 min-h-[500px]">
                  {activeTab === 'toGeez' ? (
                    /* Arabic to Ge'ez */
                    <div className="space-y-6">
                      {/* Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter Arabic Number
                        </label>
                        <div className="relative">
                          <div className={`w-full px-4 py-3 bg-gray-50 border rounded-xl flex items-center justify-between ${
                            arabicError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                          }`}>
                            <input
                              type="number"
                              value={arabicInput}
                              onChange={(e) => setArabicInput(e.target.value)}
                              placeholder="e.g., 123"
                              min="1"
                              step="1"
                              className={`flex-1 text-lg text-gray-800 bg-transparent border-0 focus:outline-none ${
                                arabicError ? 'text-red-700' : ''
                              }`}
                            />
                            <div className="flex gap-2">
                              {arabicInput && (
                                <>
                                  <button
                                    onClick={() => setArabicInput(arabicInput.slice(0, -1))}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    title="Backspace"
                                  >
                                    ←
                                  </button>
                                  <button
                                    onClick={() => setArabicInput('')}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                  >
                                    Clear
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {arabicError ? (
                          <p className="mt-2 text-xs text-red-500">{arabicError}</p>
                        ) : (
                          <p className="mt-2 text-xs text-gray-400">
                            Note: Ge'ez numerals do not support decimals or zero
                          </p>
                        )}
                      </div>

                      {/* Result */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ge'ez Result
                        </label>
                        <div className="relative">
                          <div className="w-full px-4 py-6 bg-gradient-to-br from-teal-50 to-gray-50 border border-teal-100 rounded-xl min-h-[120px] flex items-center justify-center">
                            <div className="text-center w-full">
                              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                Ge'ez Numeral
                              </p>
                              <span className="text-4xl lg:text-5xl text-teal-700 tracking-wider block mb-2">
                                {convertedGeez || <span className="text-gray-300 text-2xl">—</span>}
                              </span>
                              {convertedGeez && (
                                <button
                                  onClick={() => handleCopy(convertedGeez)}
                                  className="mt-3 px-4 py-2 text-sm font-medium text-teal-600 bg-white hover:bg-teal-50 border border-teal-200 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
                                >
                                  {copyFeedback === convertedGeez ? (
                                    <>
                                      <CheckIcon size={16} /> Copied!
                                    </>
                                  ) : (
                                    <>
                                      <ClipboardIcon size={16} /> Copy
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Ge'ez to Arabic */
                    <div className="space-y-6">
                      {/* Input Display */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ge'ez Input
                        </label>
                        <div className="relative">
                          <div className={`w-full px-4 py-3 bg-gray-50 border rounded-xl flex items-center justify-between ${
                            geezError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                          }`}>
                            <span className={`text-3xl tracking-wider ${geezError ? 'text-red-700' : 'text-gray-800'}`}>
                              {geezInput || <span className="text-gray-300 text-lg">Use keypad below</span>}
                            </span>
                            <div className="flex gap-2">
                              {geezInput && (
                                <>
                                  <button
                                    onClick={handleBackspace}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    title="Backspace"
                                  >
                                    ←
                                  </button>
                                  <button
                                    onClick={() => setGeezInput('')}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                  >
                                    Clear
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {geezError && (
                          <p className="mt-2 text-xs text-red-500">
                            {geezError}
                          </p>
                        )}
                      </div>

                      {/* Ge'ez Keypad */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ge'ez Keypad
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {ALL_GEEZ_NUMERALS.map(({ symbol, value }) => (
                            <button
                              key={symbol}
                              onClick={() => handleGeezKeyPress(symbol)}
                              className="h-12 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-lg text-lg font-medium text-gray-700 hover:text-teal-700 transition-all active:scale-95"
                              title={`${value}`}
                            >
                              {symbol}
                            </button>
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-gray-400 text-center">
                          Tap a symbol to add it • ፻ = 100 • ፼ = 10,000
                        </p>
                      </div>

                      {/* Result */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arabic Result
                        </label>
                        <div className="relative">
                          <div className="w-full px-4 py-6 bg-gradient-to-br from-teal-50 to-gray-50 border border-teal-100 rounded-xl min-h-[120px] flex items-center justify-center">
                            <div className="text-center w-full">
                              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                Arabic Number
                              </p>
                              <span className="text-4xl lg:text-5xl font-mono text-teal-700 block mb-2">
                                {convertedArabic || <span className="text-gray-300 text-2xl">—</span>}
                              </span>
                              {convertedArabic && (
                                <button
                                  onClick={() => handleCopy(convertedArabic)}
                                  className="mt-3 px-4 py-2 text-sm font-medium text-teal-600 bg-white hover:bg-teal-50 border border-teal-200 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
                                >
                                  {copyFeedback === convertedArabic ? (
                                    <>
                                      <CheckIcon size={16} /> Copied!
                                    </>
                                  ) : (
                                    <>
                                      <ClipboardIcon size={16} /> Copy
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar (Desktop Only) */}
            <div className="hidden lg:flex lg:w-[500px] flex-col gap-4">
              {/* Top Row: Facts + Examples side by side */}
              <div className="flex gap-4">
                {/* Quick Facts Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <LightbulbIcon size={18} className="text-teal-500" />
                    Quick Facts
                  </h3>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>No zero symbol in Ge'ez</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>፻ = 100 (hundred)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>፼ = 10,000 (myriad)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>Nested ፼፼ = 100 million</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>Unlimited range support</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setCurrentPage('learn')}
                    className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium hover:underline"
                  >
                    Learn more →
                  </button>
                </div>

                {/* Examples Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Examples</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Arabic</span>
                        <span className="text-xs text-gray-500">Ge'ez</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-800">123</span>
                        <span className="text-lg text-teal-600">፻፳፫</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Arabic</span>
                        <span className="text-xs text-gray-500">Ge'ez</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-800">10,000</span>
                        <span className="text-lg text-teal-600">፼</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Arabic</span>
                        <span className="text-xs text-gray-500">Ge'ez</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-800">2,021</span>
                        <span className="text-lg text-teal-600">፳፻፳፩</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Ad Placeholder (full width) */}
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-5 flex-1 min-h-[140px]">
                <svg
                  className="w-9 h-9 text-teal-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                <p className="text-sm font-medium text-teal-500 mb-0.5">Your Ad Here</p>
                <p className="text-xs text-gray-400 text-center">Support Ge'ez Calc by advertising</p>
              </div>
            </div>
          </div>

          {/* Info Card - Mobile Only (desktop info is in sidebar) */}
          <div className="lg:hidden mt-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <LightbulbIcon size={20} className="text-teal-500 shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Did you know?</span> Ge'ez numerals 
                have no symbol for zero. This converter uses a hybrid system: ፻ (100), ፼ (10,000), 
                and nested ፼፼ (100 million), ፼፼፼ (1 trillion) for unlimited range!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-400 border-t border-gray-200">
        <p>Ge'ez Calc — Discover Ethiopian Heritage</p>
      </footer>
    </div>
  )
}

export default App
