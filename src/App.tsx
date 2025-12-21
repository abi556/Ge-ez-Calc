import { useState, useMemo } from 'react'
import { safeArabicToGeez, safeGeezToArabic, ALL_GEEZ_NUMERALS, validateGeezInput } from './utils/geezConverter'
import { TodayWidget } from './components/TodayWidget'
import { CalendarPage } from './components/CalendarPage'
import { DateConverterPage } from './components/DateConverterPage'
import { LightbulbIcon, CheckIcon } from './components/Icons'

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
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {/* Today's Date Widget - Hero variant for main content */}
          <TodayWidget variant="hero" showEvangelist className="mb-6" />

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
            <div className="p-6">
              {activeTab === 'toGeez' ? (
                /* Arabic to Ge'ez */
                <div className="space-y-6">
                  {/* Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Arabic Number
                    </label>
                    <input
                      type="number"
                      value={arabicInput}
                      onChange={(e) => setArabicInput(e.target.value)}
                      placeholder="e.g., 123"
                      min="1"
                      step="1"
                      className={`w-full px-4 py-3 text-lg text-gray-800 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        arabicError
                          ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                          : 'border-gray-200 focus:ring-teal-500/20 focus:border-teal-500'
                      }`}
                    />
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
                      <div className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl min-h-[60px] flex items-center justify-between">
                        <span className="text-3xl text-gray-800 tracking-wider">
                          {convertedGeez || <span className="text-gray-300 text-lg">—</span>}
                        </span>
                        {convertedGeez && (
                          <button
                            onClick={() => handleCopy(convertedGeez)}
                            className="px-3 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                          >
                            {copyFeedback === convertedGeez ? <><CheckIcon size={14} className="inline mr-1" />Copied!</> : 'Copy'}
                          </button>
                        )}
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
                      <div className={`w-full px-4 py-4 bg-gray-50 border rounded-xl min-h-[60px] flex items-center justify-between ${
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
                      <div className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl min-h-[60px] flex items-center justify-between">
                        <span className="text-3xl font-mono text-gray-800">
                          {convertedArabic || <span className="text-gray-300 text-lg">—</span>}
                        </span>
                        {convertedArabic && (
                          <button
                            onClick={() => handleCopy(convertedArabic)}
                            className="px-3 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                          >
                            {copyFeedback === convertedArabic ? <><CheckIcon size={14} className="inline mr-1" />Copied!</> : 'Copy'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Tip */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <LightbulbIcon size={20} className="text-teal-500 flex-shrink-0" />
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
