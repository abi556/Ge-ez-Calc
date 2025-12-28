import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Kenat, { monthNames } from 'kenat'
import { CalendarDayCell } from './CalendarDayCell'
import { Header } from './Header'
import { arabicToGeez } from '../utils/geezConverter'
import { CalendarIcon } from './Icons'
import { updateSEO } from '../utils/seo'

// Weekday headers
const WEEKDAYS = {
  english: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  amharic: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
}

// Holiday English translations
const HOLIDAY_TRANSLATIONS: Record<string, string> = {
  // Fixed holidays (Official)
  'እንቁጣጣሽ': 'Ethiopian New Year',
  'መስቀል': 'Finding of the True Cross',
  'ገና': 'Ethiopian Christmas',
  'ጥምቀት': 'Ethiopian Epiphany',
  'የአድዋ ድል በዓል': 'Victory of Adwa',
  'የሰማዕታት ቀን': 'Martyrs\' Day',
  'የአርበኞች ቀን': 'Patriots\' Victory Day',
  'የሰራተኞች ቀን': 'International Labour Day',
  'የብሔር ብሔረሰቦች ቀን': 'Nations, Nationalities, and Peoples\' Day',
  // Movable Christian holidays (Official)
  'ስቅለት': 'Good Friday',
  'ፋሲካ': 'Ethiopian Easter',
  // Religious observances (Not official holidays)
  'ጾመ ነነዌ': 'Fast of Nineveh',
  'ዐቢይ ጾም': 'Great Lent',
  'ደብረ ዘይት': 'Mid-Lent Sunday',
  'ሆሳዕና': 'Palm Sunday',
  'ርክበ ካህናት': 'Meeting of the Priests',
  'ዕርገት': 'Ascension',
  'ጰራቅሊጦስ': 'Pentecost',
  'ጾመ ሐዋርያት': 'Apostles\' Fast',
  'ጾመ ድኅነት': 'Fast of Salvation',
  // Islamic holidays (Official)
  'ዒድ አል ፈጥር': 'Eid al-Fitr',
  'ዒድ አል አድሐ': 'Eid al-Adha',
  'መውሊድ': 'Moulid',
}

// Official holidays (government/school recognized)
const OFFICIAL_HOLIDAYS = new Set([
  // Fixed Christian holidays
  'እንቁጣጣሽ',
  'መስቀል',
  'ገና',
  'ጥምቀት',
  // National holidays
  'የአድዋ ድል በዓል',
  'የሰማዕታት ቀን',
  'የአርበኞች ቀን',
  'የሰራተኞች ቀን',
  'የብሔር ብሔረሰቦች ቀን',
  // Movable Christian holidays (official)
  'ስቅለት',
  'ፋሲካ',
  // Islamic holidays
  'ዒድ አል ፈጥር',
  'ዒድ አል አድሐ',
  'መውሊድ',
])

/**
 * CalendarPage - Full Ethiopian calendar view
 * 
 * Features:
 * - Monthly grid view with Ethiopian dates
 * - Dual number system (Arabic primary, Ge'ez subscript)
 * - Gregorian date reference in each cell
 * - Month/year navigation
 * - Today highlighting
 * - Holiday indicators
 */
export function CalendarPage() {
  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'Ethiopian Calendar 2026 | Ge\'ez Calendar Converter - Free Online Tool',
      description: 'Free Ethiopian calendar 2026 with holidays. Convert Ethiopian calendar dates to Gregorian. View Ethiopian months, holidays, and observances. Learn about Ge\'ez calendar system, Ethiopian timekeeping, and traditional Ethiopian calendar.',
      keywords: 'ethiopian calendar, geez calendar, ethiopian calendar 2026, ethiopian calendar converter, ethiopian calendar dates, ethiopian holidays, ethiopian months, learn about ethiopian calendar, ethiopian calendar system, amharic calendar, ethiopian time system, ethiopian calendar online, free ethiopian calendar',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/',
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Ethiopian Calendar Converter',
        applicationCategory: 'UtilityApplication',
        description: 'Free Ethiopian calendar with holidays, date conversion, and educational content about Ethiopian calendar system.',
        // TODO: Replace with actual domain when purchased - temporary Vercel URL
        url: 'https://ge-ez-calc.vercel.app/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    })
  }, [])

  // Get today's Ethiopian date
  const today = useMemo(() => {
    const kenat = new Kenat()
    return kenat.getEthiopian()
  }, [])

  // Current view state (month and year being displayed)
  const [viewYear, setViewYear] = useState(today.year)
  const [viewMonth, setViewMonth] = useState(today.month)

  // Generate calendar data for the current view
  const calendarData = useMemo(() => {
    return {
      monthName: monthNames.amharic[viewMonth - 1],
      monthNameEnglish: monthNames.english[viewMonth - 1],
      year: viewYear,
      yearGeez: arabicToGeez(viewYear),
    }
  }, [viewYear, viewMonth])

  // Get Gregorian month range for display
  const gregorianRange = useMemo(() => {
    const firstDay = new Kenat({ year: viewYear, month: viewMonth, day: 1 })
    const lastDay = new Kenat({ year: viewYear, month: viewMonth, day: viewMonth === 13 ? (new Kenat({ year: viewYear, month: 1, day: 1 }).isLeapYear() ? 6 : 5) : 30 })
    
    const firstGreg = firstDay.getGregorian()
    const lastGreg = lastDay.getGregorian()
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    if (firstGreg.month === lastGreg.month) {
      return `${months[firstGreg.month - 1]} ${firstGreg.year}`
    }
    return `${months[firstGreg.month - 1]} - ${months[lastGreg.month - 1]} ${lastGreg.year}`
  }, [viewYear, viewMonth])

  // Navigation handlers
  const goToPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(13)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 13) {
      setViewMonth(1)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const goToToday = () => {
    setViewYear(today.year)
    setViewMonth(today.month)
  }

  // Generate the days for the grid
  const generateDays = () => {
    const days: Array<{
      ethiopianDay: number
      gregorianDate: string
      isToday: boolean
      isHoliday: boolean
      isOfficialHoliday: boolean
      holidayName?: string
      isCurrentMonth: boolean
    } | null> = []

    // Get first day of month to determine starting weekday
    const firstDayKenat = new Kenat({ year: viewYear, month: viewMonth, day: 1 })
    const firstDayWeekday = firstDayKenat.weekday() // 0 = Sunday

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null)
    }

    // Determine days in month (30 for months 1-12, 5 or 6 for Pagume)
    const isLeap = new Kenat({ year: viewYear, month: 1, day: 1 }).isLeapYear()
    const daysInMonth = viewMonth === 13 ? (isLeap ? 6 : 5) : 30

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const kenat = new Kenat({ year: viewYear, month: viewMonth, day })
      const greg = kenat.getGregorian()
      const holidays = kenat.isHoliday()
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      const holidayName = holidays.length > 0 ? holidays[0].name : undefined
      const isOfficialHoliday = holidayName ? OFFICIAL_HOLIDAYS.has(holidayName) : false
      
      days.push({
        ethiopianDay: day,
        gregorianDate: `${months[greg.month - 1]} ${greg.day}`,
        isToday: viewYear === today.year && viewMonth === today.month && day === today.day,
        isHoliday: holidays.length > 0,
        isOfficialHoliday,
        holidayName,
        isCurrentMonth: true,
      })
    }

    return days
  }

  const days = useMemo(generateDays, [viewYear, viewMonth, today])

  // Get holidays for the current month
  const monthHolidays = useMemo(() => {
    const holidays: Array<{ day: number, name: string, nameEnglish: string, dayGeez: string, isOfficial: boolean }> = []
    const isLeap = new Kenat({ year: viewYear, month: 1, day: 1 }).isLeapYear()
    const daysInMonth = viewMonth === 13 ? (isLeap ? 6 : 5) : 30

    for (let day = 1; day <= daysInMonth; day++) {
      const kenat = new Kenat({ year: viewYear, month: viewMonth, day })
      const dayHolidays = kenat.isHoliday()
      if (dayHolidays.length > 0) {
        const amharicName = dayHolidays[0].name
        holidays.push({
          day,
          name: amharicName,
          nameEnglish: HOLIDAY_TRANSLATIONS[amharicName] || '',
          dayGeez: arabicToGeez(day),
          isOfficial: OFFICIAL_HOLIDAYS.has(amharicName),
        })
      }
    }
    return holidays
  }, [viewYear, viewMonth])

  // Separate holidays and observances
  const officialHolidays = useMemo(() => monthHolidays.filter(h => h.isOfficial), [monthHolidays])
  const observances = useMemo(() => monthHolidays.filter(h => !h.isOfficial), [monthHolidays])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* LEFT: All calendar content flows naturally */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Month Navigation */}
            <div className="bg-white rounded border border-gray-200 p-3">
              <div className="flex items-center justify-between">
                {/* Prev Button */}
                <button
                  onClick={goToPrevMonth}
                  className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
                >
                  <span className="text-xl">←</span>
                </button>

                {/* Month/Year Display */}
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {calendarData.monthName}
                    <span className="text-primary-500 ml-2">{calendarData.yearGeez}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    {calendarData.monthNameEnglish} {viewYear} ዓ/ም
                    <span className="text-gray-300 mx-2">•</span>
                    <span className="text-gray-400">{gregorianRange}</span>
                  </p>
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
                >
                  <span className="text-xl">→</span>
                </button>
              </div>

              {/* Today Button - Always reserve space for consistent height */}
              <div className="mt-3 text-center">
                <button
                  onClick={goToToday}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    viewYear !== today.year || viewMonth !== today.month
                      ? 'text-primary-600 bg-primary-50 hover:bg-primary-100'
                      : 'invisible'
                  }`}
                >
                  Go to Today
                </button>
              </div>
            </div>

            {/* Month Selector */}
            <div className="bg-white rounded border border-gray-200 p-3 overflow-x-auto">
              <div className="flex justify-center gap-1 min-w-max">
                {monthNames.amharic.map((name: string, index: number) => {
                  // English month abbreviations
                  const engAbbrev = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Pagume'][index]
                  return (
                    <button
                      key={index}
                      onClick={() => setViewMonth(index + 1)}
                      className={`
                        px-2 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap flex flex-col items-center
                        ${viewMonth === index + 1 
                          ? 'bg-primary-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      <span>{name}</span>
                      <span className={`text-[10px] ${viewMonth === index + 1 ? 'text-primary-100' : 'text-gray-400'}`}>
                        {engAbbrev}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded border border-gray-200 p-4">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.english.map((day, index) => (
                  <div
                    key={day}
                    className="text-center py-2"
                  >
                    {/* English name */}
                    <span className="block text-xs font-medium text-gray-600">
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{day.charAt(0)}</span>
                    </span>
                    {/* Amharic name below */}
                    <span className="block text-[10px] sm:text-xs text-gray-400 mt-0.5">
                      {WEEKDAYS.amharic[index]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  day ? (
                    <CalendarDayCell
                      key={`${viewYear}-${viewMonth}-${day.ethiopianDay}`}
                      ethiopianDay={day.ethiopianDay}
                      gregorianDate={day.gregorianDate}
                      isToday={day.isToday}
                      isHoliday={day.isHoliday}
                      isOfficialHoliday={day.isOfficialHoliday}
                      holidayName={day.holidayName}
                      isCurrentMonth={day.isCurrentMonth}
                    />
                  ) : (
                    <div key={`empty-${index}`} className="min-h-[60px] sm:min-h-[80px]" />
                  )
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:w-72 shrink-0 space-y-4">
            {/* Ad Placeholder - Height matches month nav + month selector */}
            <Link 
              to="/support"
              className="bg-white rounded border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center min-h-[205px] hover:border-primary-400 hover:bg-primary-50/30 transition-colors group cursor-pointer"
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

             {/* Legend - Compact inline */}
             <div className="flex items-center justify-center gap-4 text-xs text-gray-500 py-1">
               <div className="flex items-center gap-1.5">
                 <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                 <span>Today</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--holiday-indicator)' }}></span>
                 <span>Holiday</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--observance-indicator)' }}></span>
                 <span>Observance</span>
               </div>
             </div>

            {/* Holidays & Observances List */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-primary-50 border-b border-primary-100">
                 <h3 className="text-sm font-medium text-primary-800">
                   Holidays & Observances in {calendarData.monthName}
                 </h3>
              </div>
              {monthHolidays.length > 0 ? (
                <div>
                  {/* Official Holidays Section */}
                  {officialHolidays.length > 0 && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Official Holidays</p>
                    </div>
                  )}
                  {officialHolidays.length > 0 && (
                    <ul className="divide-y divide-gray-100">
                      {officialHolidays.map((holiday) => (
                        <li key={holiday.day} className="px-4 py-3">
                          <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: 'var(--holiday-indicator)' }}></span>
                            <div>
                              <span className="text-sm text-gray-800 font-medium block">{holiday.name}</span>
                              <span className="text-xs text-gray-400 block">{holiday.nameEnglish}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 pl-4 mt-1">
                            <span className="text-primary-600 font-medium">{holiday.dayGeez}</span>
                            <span className="mx-1">•</span>
                            <span>{calendarData.monthNameEnglish} {holiday.day}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Religious Observances Section */}
                  {observances.length > 0 && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Religious Observances</p>
                    </div>
                  )}
                  {observances.length > 0 && (
                    <ul className="divide-y divide-gray-100">
                      {observances.map((observance) => (
                        <li key={observance.day} className="px-4 py-3">
                          <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: 'var(--observance-indicator)' }}></span>
                            <div>
                              <span className="text-sm text-gray-800 font-medium block">{observance.name}</span>
                              <span className="text-xs text-gray-400 block">{observance.nameEnglish}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 pl-4 mt-1">
                            <span className="text-primary-600 font-medium">{observance.dayGeez}</span>
                            <span className="mx-1">•</span>
                            <span>{calendarData.monthNameEnglish} {observance.day}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-500">No holidays this month</p>
                  <p className="text-xs text-gray-400 mt-1">በዚህ ወር በዓል የለም</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Info - Full width, centered content */}
        <div className="mt-6">
          <div className="bg-white rounded border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
              <CalendarIcon size={20} className="text-primary-500 shrink-0" />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Ethiopian Calendar</span>
                <span className="hidden sm:inline"> — </span>
                <br className="sm:hidden" />
                The Ethiopian calendar has 13 months — 12 months of 30 days each, 
                plus <strong>Pagume</strong> (ጳጉሜ), a 13th month of 5 or 6 days. 
                The year is 7-8 years behind the Gregorian calendar.
                <Link 
                  to="/learn"
                  className="ml-2 text-primary-600 hover:text-primary-700 font-medium hover:underline"
                >
                  Learn more →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-4 lg:px-6 text-sm text-gray-400 border-t border-gray-200">
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

export default CalendarPage

