import { useMemo, useState } from 'react'
import Kenat, { monthNames } from 'kenat'
import { TodayWidget } from './TodayWidget'
import { arabicToGeez } from '../utils/geezConverter'
import { CalendarIcon, CheckIcon, ClipboardIcon } from './Icons'

// Evangelist names (4-year cycle)
const EVANGELISTS = {
  0: { amharic: 'ዮሐንስ', english: 'John' },
  1: { amharic: 'ማቴዎስ', english: 'Matthew' },
  2: { amharic: 'ማርቆስ', english: 'Mark' },
  3: { amharic: 'ሉቃስ', english: 'Luke' },
} as const

// Gregorian month names (constant)
const GREG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

interface DateConverterPageProps {
  onNavigate: (page: 'converter' | 'calendar' | 'learn' | 'dates') => void
}

/**
 * DateConverterPage - Gregorian ↔ Ethiopian Date Converter
 *
 * Features:
 * - Two-way conversion (Gregorian → Ethiopian and Ethiopian → Gregorian)
 * - Ethiopian month dropdown (13 months)
 * - Rich result display with Amharic names and Ge'ez numerals
 * - Evangelist year display
 */
export function DateConverterPage({ onNavigate }: DateConverterPageProps) {
  // Conversion direction
  const [direction, setDirection] = useState<'toEthiopian' | 'toGregorian'>(
    'toEthiopian',
  )

  // Gregorian input state
  const [gregYear, setGregYear] = useState(new Date().getFullYear())
  const [gregMonth, setGregMonth] = useState(new Date().getMonth() + 1)
  const [gregDay, setGregDay] = useState(new Date().getDate())

  // Ethiopian input state
  const today = useMemo(() => new Kenat().getEthiopian(), [])
  const [ethYear, setEthYear] = useState(today.year)
  const [ethMonth, setEthMonth] = useState(today.month)
  const [ethDay, setEthDay] = useState(today.day)

  // Copy feedback
  const [copyFeedback, setCopyFeedback] = useState(false)

  // Get days in Gregorian month
  const getDaysInGregMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
  }

  // Get days in Ethiopian month
  const getDaysInEthMonth = (year: number, month: number) => {
    if (month === 13) {
      // Pagume - check if leap year
      const kenat = new Kenat({ year, month: 1, day: 1 })
      return kenat.isLeapYear() ? 6 : 5
    }
    return 30
  }

  // Convert Gregorian to Ethiopian
  const ethiopianResult = useMemo(() => {
    if (direction !== 'toEthiopian') return null

    try {
      // Create a JavaScript Date and pass it to Kenat
      const gregorianDate = new Date(gregYear, gregMonth - 1, gregDay)
      const kenat = new Kenat(gregorianDate)
      const eth = kenat.getEthiopian()
      const bahireHasab = kenat.getBahireHasab()

      return {
        year: eth.year,
        month: eth.month,
        day: eth.day,
        monthNameAmharic: monthNames.amharic[eth.month - 1],
        monthNameEnglish: monthNames.english[eth.month - 1],
        dayGeez: arabicToGeez(eth.day),
        yearGeez: arabicToGeez(eth.year),
        evangelist:
          EVANGELISTS[
            bahireHasab.evangelist.remainder as keyof typeof EVANGELISTS
          ],
      }
    } catch {
      return null
    }
  }, [direction, gregYear, gregMonth, gregDay])

  // Convert Ethiopian to Gregorian
  const gregorianResult = useMemo(() => {
    if (direction !== 'toGregorian') return null

    try {
      const kenat = new Kenat({ year: ethYear, month: ethMonth, day: ethDay })
      const greg = kenat.getGregorian()

      return {
        year: greg.year,
        month: greg.month,
        day: greg.day,
        monthName: GREG_MONTHS[greg.month - 1],
        formatted: `${GREG_MONTHS[greg.month - 1]} ${greg.day}, ${greg.year}`,
      }
    } catch {
      return null
    }
  }, [direction, ethYear, ethMonth, ethDay])

  // Handle copy
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopyFeedback(true)
    setTimeout(() => setCopyFeedback(false), 2000)
  }

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
              onClick={() => onNavigate('calendar')}
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              Calendar
            </button>
            <button
              onClick={() => onNavigate('dates')}
              className="text-white hover:text-teal-400 transition-colors"
            >
              Dates
            </button>
            <button
              onClick={() => onNavigate('converter')}
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              Numbers
            </button>
            <button
              onClick={() => onNavigate('learn')}
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
              Date Converter
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Convert between Gregorian and Ethiopian calendars
            </p>
          </div>

          {/* Two Column Layout for Desktop */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left Column - Main Converter */}
            <div className="flex-1">
              {/* Converter Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
                {/* Direction Tabs */}
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setDirection('toEthiopian')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      direction === 'toEthiopian'
                        ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Gregorian → Ethiopian
                  </button>
                  <button
                    onClick={() => setDirection('toGregorian')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      direction === 'toGregorian'
                        ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Ethiopian → Gregorian
                  </button>
                </div>

                {/* Converter Content */}
                <div className="p-6 min-h-[420px]">
                  {direction === 'toEthiopian' ? (
                    /* Gregorian to Ethiopian */
                    <div className="space-y-6">
                      {/* Gregorian Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Enter Gregorian Date
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Month */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Month
                            </label>
                            <select
                              value={gregMonth}
                              onChange={(e) => setGregMonth(Number(e.target.value))}
                              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            >
                              {GREG_MONTHS.map((month, i) => (
                                <option key={month} value={i + 1} className="text-gray-800">
                                  {month}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Day */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Day
                            </label>
                            <select
                              value={gregDay}
                              onChange={(e) => setGregDay(Number(e.target.value))}
                              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            >
                              {Array.from(
                                { length: getDaysInGregMonth(gregYear, gregMonth) },
                                (_, i) => (
                                  <option key={i + 1} value={i + 1} className="text-gray-800">
                                    {i + 1}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                          {/* Year */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Year</label>
                            <input
                              type="number"
                              value={gregYear}
                              onChange={(e) => setGregYear(Number(e.target.value))}
                              min="1900"
                              max="2100"
                              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Result */}
                      <div className="bg-linear-to-br from-teal-50 to-gray-50 rounded-xl p-5 border border-teal-100 h-[220px] flex items-center justify-center">
                        <div className="text-center w-full">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                            Ethiopian Date
                          </p>

                          {ethiopianResult ? (
                            <>
                              {/* Ge'ez Display */}
                              <p className="text-3xl text-teal-700 mb-1">
                                {ethiopianResult.monthNameAmharic} {ethiopianResult.dayGeez}
                              </p>
                              <p className="text-xl text-gray-600 mb-3">
                                {ethiopianResult.yearGeez}{' '}
                                <span className="text-gray-400">ዓ/ም</span>
                              </p>

                              {/* English Display */}
                              <p className="text-sm text-gray-600">
                                {ethiopianResult.monthNameEnglish} {ethiopianResult.day},{' '}
                                {ethiopianResult.year}
                              </p>

                              {/* Evangelist */}
                              <div className="mt-4 pt-4 border-t border-teal-100">
                                <p className="text-xs text-gray-500">
                                  Year of{' '}
                                  <span className="font-medium text-teal-600">
                                    {ethiopianResult.evangelist.english}
                                  </span>
                                  <span className="text-gray-400 mx-1">•</span>
                                  <span className="text-teal-600">
                                    {ethiopianResult.evangelist.amharic}
                                  </span>
                                </p>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-400 text-lg py-4">Select a valid date above</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Ethiopian to Gregorian */
                    <div className="space-y-6">
                      {/* Ethiopian Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Enter Ethiopian Date
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Month */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Month
                            </label>
                            <select
                              value={ethMonth}
                              onChange={(e) => setEthMonth(Number(e.target.value))}
                              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            >
                              {monthNames.amharic.map((name: string, i: number) => (
                                <option key={i} value={i + 1} className="text-gray-800">
                                  {name} ({monthNames.english[i]})
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Day */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Day</label>
                            <select
                              value={ethDay}
                              onChange={(e) => setEthDay(Number(e.target.value))}
                              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            >
                              {Array.from({ length: getDaysInEthMonth(ethYear, ethMonth) }, (_, i) => (
                                <option key={i + 1} value={i + 1} className="text-gray-800">
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Year */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Year (ዓ/ም)</label>
                            <input
                              type="number"
                              value={ethYear}
                              onChange={(e) => setEthYear(Number(e.target.value))}
                              min="1900"
                              max="2100"
                              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Result */}
                      <div className="bg-linear-to-br from-teal-50 to-gray-50 rounded-xl p-5 border border-teal-100 h-[220px] flex items-center justify-center">
                        <div className="text-center w-full">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                            Gregorian Date
                          </p>

                          {gregorianResult ? (
                            <>
                              {/* Main Display */}
                              <p className="text-3xl text-teal-700 mb-1">
                                {gregorianResult.monthName} {gregorianResult.day}
                              </p>
                              <p className="text-xl text-gray-600 mb-3">{gregorianResult.year}</p>

                              {/* Spacer line to match Ethiopian result height */}
                              <p className="text-sm text-gray-400">International Calendar</p>

                              {/* Full Formatted Date */}
                              <div className="mt-4 pt-4 border-t border-teal-100">
                                <p className="text-sm text-teal-600 font-medium">
                                  {gregorianResult.formatted}
                                </p>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-400 text-lg py-4">Select a valid date above</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Copy Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => {
                        if (direction === 'toEthiopian' && ethiopianResult) {
                          handleCopy(
                            `${ethiopianResult.monthNameEnglish} ${ethiopianResult.day}, ${ethiopianResult.year} ዓ/ም`,
                          )
                        } else if (direction === 'toGregorian' && gregorianResult) {
                          handleCopy(gregorianResult.formatted)
                        }
                      }}
                      disabled={!(ethiopianResult || gregorianResult)}
                      className="py-3 px-8 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {copyFeedback ? (
                        <>
                          <CheckIcon size={16} className="inline" /> Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardIcon size={16} className="inline" /> Copy Result
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar (Desktop Only) */}
            <div className="hidden lg:flex lg:w-[500px] flex-col gap-4">
              {/* Top Row: Facts + Evangelist Year side by side */}
              <div className="flex gap-4">
                {/* Quick Facts Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CalendarIcon size={18} className="text-teal-500" />
                    Quick Facts
                  </h3>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>7-8 years behind Gregorian</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>13 months (12×30 + Pagume)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>New Year: Sept 11 or 12</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      <span>Pagume: 5-6 days</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onNavigate('learn')}
                    className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium hover:underline"
                  >
                    Learn more →
                  </button>
                </div>

                {/* Year Cycle Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Evangelist Year</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(EVANGELISTS).map(([key, { amharic, english }]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-2.5 text-center">
                        <p className="font-medium text-teal-600 text-sm">{english}</p>
                        <p className="text-gray-500 text-xs">{amharic}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">4-year rotating cycle</p>
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
              <CalendarIcon size={20} className="text-teal-500 shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Calendar Difference:</span> The Ethiopian
                calendar is 7-8 years behind the Gregorian calendar. It has 13 months — 12 months of
                30 days plus <strong>Pagume</strong> (5-6 days). New Year falls on September 11 (or 12
                in leap years).
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

export default DateConverterPage

