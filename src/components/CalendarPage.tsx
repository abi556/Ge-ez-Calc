import { useState, useMemo } from 'react'
import Kenat, { monthNames } from 'kenat'
import { CalendarDayCell } from './CalendarDayCell'
import { TodayWidget } from './TodayWidget'
import { arabicToGeez } from '../utils/geezConverter'
import { CalendarIcon } from './Icons'

// Weekday headers
const WEEKDAYS = {
  english: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  amharic: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
}

interface CalendarPageProps {
  onNavigate: (page: 'converter' | 'calendar' | 'learn' | 'dates') => void
}

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
export function CalendarPage({ onNavigate }: CalendarPageProps) {
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
      
      days.push({
        ethiopianDay: day,
        gregorianDate: `${months[greg.month - 1]} ${greg.day}`,
        isToday: viewYear === today.year && viewMonth === today.month && day === today.day,
        isHoliday: holidays.length > 0,
        holidayName: holidays.length > 0 ? holidays[0].name : undefined,
        isCurrentMonth: true,
      })
    }

    return days
  }

  const days = useMemo(generateDays, [viewYear, viewMonth, today])

  // Get holidays for the current month
  const monthHolidays = useMemo(() => {
    const holidays: Array<{ day: number, name: string, dayGeez: string }> = []
    const isLeap = new Kenat({ year: viewYear, month: 1, day: 1 }).isLeapYear()
    const daysInMonth = viewMonth === 13 ? (isLeap ? 6 : 5) : 30

    for (let day = 1; day <= daysInMonth; day++) {
      const kenat = new Kenat({ year: viewYear, month: viewMonth, day })
      const dayHolidays = kenat.isHoliday()
      if (dayHolidays.length > 0) {
        holidays.push({
          day,
          name: dayHolidays[0].name,
          dayGeez: arabicToGeez(day),
        })
      }
    }
    return holidays
  }, [viewYear, viewMonth])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header - Same as main site */}
      <header className="bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
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
              onClick={() => onNavigate('calendar')}
              className="text-white hover:text-teal-400 transition-colors"
            >
              Calendar
            </button>
            <button 
              onClick={() => onNavigate('dates')}
              className="text-gray-400 hover:text-teal-400 transition-colors"
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

      {/* Calendar Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Month Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex items-center justify-between">
            {/* Prev Button */}
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-teal-600"
            >
              <span className="text-xl">←</span>
            </button>

            {/* Month/Year Display */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {calendarData.monthName}
                <span className="text-teal-500 ml-2">{calendarData.yearGeez}</span>
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
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-teal-600"
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Today Button */}
          {(viewYear !== today.year || viewMonth !== today.month) && (
            <div className="mt-3 text-center">
              <button
                onClick={goToToday}
                className="px-3 py-1 text-xs font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors"
              >
                Go to Today
              </button>
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {monthNames.amharic.map((name: string, index: number) => (
              <button
                key={index}
                onClick={() => setViewMonth(index + 1)}
                className={`
                  px-2 py-1 text-xs rounded-md transition-colors whitespace-nowrap
                  ${viewMonth === index + 1 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
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
                  holidayName={day.holidayName}
                  isCurrentMonth={day.isCurrentMonth}
                />
              ) : (
                <div key={`empty-${index}`} className="min-h-[60px] sm:min-h-[80px]" />
              )
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-500"></span>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>Holiday</span>
          </div>
        </div>

        {/* Holidays List */}
        {monthHolidays.length > 0 && (
          <div className="mt-4 bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
              <h3 className="text-sm font-medium text-amber-800">
                Holidays in {calendarData.monthNameEnglish} ({calendarData.monthName})
              </h3>
            </div>
            <ul className="divide-y divide-gray-100">
              {monthHolidays.map((holiday) => (
                <li key={holiday.day} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-sm text-gray-800 font-medium">{holiday.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="text-teal-600 font-medium">{holiday.dayGeez}</span>
                    <span className="mx-1">•</span>
                    <span>{calendarData.monthNameEnglish} {holiday.day}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-start gap-3">
            <CalendarIcon size={20} className="text-teal-500 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-1">Ethiopian Calendar</p>
              <p className="leading-relaxed">
                The Ethiopian calendar has 13 months — 12 months of 30 days each, 
                plus <strong>Pagume</strong> (ጳጉሜ), a 13th month of 5 or 6 days. 
                The year is 7-8 years behind the Gregorian calendar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage

