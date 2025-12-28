import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { safeArabicToGeez, safeGeezToArabic, ALL_GEEZ_NUMERALS, validateGeezInput } from '../utils/geezConverter'
import { Header } from '../components/Header'
import { LightbulbIcon, CheckIcon, ClipboardIcon } from '../components/Icons'
import { updateSEO } from '../utils/seo'

export function NumberConverterPage() {
  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'Ethiopian Number Converter | Ge\'ez Numeral Converter - Arabic to Ge\'ez',
      description: 'Free Ethiopian number converter and Ge\'ez numeral converter. Convert Arabic numbers to Ge\'ez numerals and vice versa. Learn about Ethiopian number system, Ge\'ez numerals, and traditional Ethiopian numbering.',
      keywords: 'ethiopian number, geez number, ethiopian number converter, number conversion, geez numeral converter, arabic to geez, geez to arabic, learn about ethiopian number, ethiopian numeral system, geez numerals, ethiopian numbers, amharic numbers, convert ethiopian numbers',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/numbers',
      ogType: 'website',
    })
  }, [])
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:py-6 lg:px-8">
        <div className="w-full">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
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
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                {/* Tab Switcher */}
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab('toGeez')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'toGeez'
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Arabic → Ge'ez
                  </button>
                  <button
                    onClick={() => setActiveTab('toArabic')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'toArabic'
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Ge'ez → Arabic
                  </button>
                </div>

                {/* Converter Content */}
                <div className="p-6 min-h-[500px]">
                  {activeTab === 'toGeez' ? (
                    <div className="space-y-6">
                      {/* Arabic Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arabic Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={arabicInput}
                            onChange={(e) => setArabicInput(e.target.value)}
                            placeholder="Enter a number (e.g., 1234)"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                          />
                          {arabicInput && (
                            <div className="absolute right-3 top-3 flex gap-2">
                              <button
                                onClick={() => setArabicInput('')}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Clear input"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                        {arabicError && (
                          <p className="mt-2 text-sm text-red-600">{arabicError}</p>
                        )}
                      </div>

                      {/* Ge'ez Result */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ge'ez Numeral
                        </label>
                        <div className="relative">
                          <div className="bg-primary-50 border-2 border-primary-200 rounded p-6 text-center min-h-[150px] flex flex-col items-center justify-center">
                            {convertedGeez ? (
                              <>
                                <div className="text-3xl font-semibold text-primary-700 mb-2">
                                  {convertedGeez}
                                </div>
                                <button
                                  onClick={() => handleCopy(convertedGeez)}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium transition-colors"
                                >
                                  {copyFeedback === convertedGeez ? (
                                    <>
                                      <CheckIcon size={16} />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <ClipboardIcon size={16} />
                                      Copy
                                    </>
                                  )}
                                </button>
                              </>
                            ) : (
                              <div className="text-gray-400 text-sm">
                                Enter a number above to see the Ge'ez conversion
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Ge'ez Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ge'ez Numeral
                        </label>
                        <div className="relative">
                          <div className="w-full px-4 py-3 border border-gray-300 rounded bg-white min-h-[60px] flex items-center">
                            <div className="text-lg font-semibold text-gray-800 text-center flex-1 break-all">
                              {geezInput || <span className="text-gray-400 font-normal">Click buttons below to input</span>}
                            </div>
                          </div>
                          {geezInput && (
                            <div className="absolute right-3 top-3 flex gap-2">
                              <button
                                onClick={handleBackspace}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Delete last character"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setGeezInput('')}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Clear input"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                        {geezError && (
                          <p className="mt-2 text-sm text-red-600">{geezError}</p>
                        )}
                      </div>

                      {/* Ge'ez Keyboard */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ge'ez Numerals
                        </label>
                        <div className="grid grid-cols-10 gap-2">
                          {ALL_GEEZ_NUMERALS.map((num) => (
                            <button
                              key={num.symbol}
                              onClick={() => handleGeezKeyPress(num.symbol)}
                              className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-primary-50 hover:border-primary-300 transition-colors text-xl font-semibold"
                              title={'label' in num ? num.label : `Value: ${num.value}`}
                            >
                              {num.symbol}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Arabic Result */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arabic Number
                        </label>
                        <div className="relative">
                          <div className="bg-primary-50 border-2 border-primary-200 rounded p-6 text-center min-h-[150px] flex flex-col items-center justify-center">
                            {convertedArabic ? (
                              <>
                                <div className="text-3xl font-semibold text-primary-700 mb-2">
                                  {convertedArabic}
                                </div>
                                <button
                                  onClick={() => handleCopy(convertedArabic)}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium transition-colors"
                                >
                                  {copyFeedback === convertedArabic ? (
                                    <>
                                      <CheckIcon size={16} />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <ClipboardIcon size={16} />
                                      Copy
                                    </>
                                  )}
                                </button>
                              </>
                            ) : (
                              <div className="text-gray-400 text-sm">
                                Enter Ge'ez numerals above to see the Arabic conversion
                              </div>
                            )}
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
              {/* Top Row: Quick Facts + Examples side by side */}
              <div className="flex gap-4">
                {/* Quick Facts Card */}
                <div className="flex-1 bg-white rounded border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <LightbulbIcon size={20} className="text-primary-500" />
                    <h3 className="text-sm font-semibold text-gray-800">Quick Facts</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li>• Ge'ez has no zero symbol</li>
                    <li>• Uses prefix multipliers (፻, ፼)</li>
                    <li>• Numbers start from 1</li>
                    <li>• Supports very large numbers</li>
                  </ul>
                </div>

                {/* Examples Card */}
                <div className="flex-1 bg-white rounded border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Examples</h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="text-primary-600 font-medium">123</div>
                      <div className="text-gray-600">፻፳፫</div>
                    </div>
                    <div>
                      <div className="text-primary-600 font-medium">1,000</div>
                      <div className="text-gray-600">፲፻</div>
                    </div>
                    <div>
                      <div className="text-primary-600 font-medium">10,000</div>
                      <div className="text-gray-600">፼</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Ad Placeholder (full width) */}
              <Link
                to="/support"
                className="bg-white rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-5 flex-1 min-h-[140px] hover:border-primary-400 hover:bg-primary-50/30 transition-colors group cursor-pointer"
              >
                <svg 
                  className="w-8 h-8 text-primary-400 mb-2 group-hover:text-primary-500 transition-colors" 
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
                <p className="text-sm font-medium text-primary-500 mb-0.5 group-hover:text-primary-600 transition-colors">Your Ad Here</p>
                <p className="text-xs text-gray-400 text-center group-hover:text-gray-500 transition-colors">
      Support by advertising
                </p>
              </Link>
            </div>
          </div>

          {/* Info Card - Mobile Only (desktop info is in sidebar) */}
          <div className="lg:hidden mt-6 p-4 bg-white rounded border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <LightbulbIcon size={18} className="text-primary-500" />
              <h3 className="text-sm font-semibold text-gray-800">About Ge'ez Numerals</h3>
            </div>
            <p className="text-xs text-gray-600">
              Ge'ez numerals use a unique system with prefix multipliers. The symbol ፻ represents 100, and ፼ represents 10,000.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 lg:px-6 text-sm text-gray-400 border-t border-gray-200" role="contentinfo">
        <div className="flex items-center justify-between">
          <p>Ge'ez Calc — Ethiopian</p>
          <div className="flex items-center gap-4">
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Report
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
  Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

