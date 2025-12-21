import { useMemo, useState } from 'react'
import { arabicToGeez } from '../utils/geezConverter'

interface CalendarDayCellProps {
  /** Ethiopian day number (1-30) */
  ethiopianDay: number
  /** Gregorian date string (e.g., "Dec 21") */
  gregorianDate: string
  /** Is this day today? */
  isToday?: boolean
  /** Is this a holiday? */
  isHoliday?: boolean
  /** Holiday name if applicable */
  holidayName?: string
  /** Is this day in the current month? (for faded display of adjacent months) */
  isCurrentMonth?: boolean
  /** Click handler */
  onClick?: () => void
}

/**
 * CalendarDayCell - A single day cell in the Ethiopian calendar grid
 * 
 * Displays:
 * - Arabic numeral (primary, large)
 * - Ge'ez numeral (subscript, small)
 * - Gregorian date (tiny, reference)
 */
export function CalendarDayCell({
  ethiopianDay,
  gregorianDate,
  isToday = false,
  isHoliday = false,
  holidayName,
  isCurrentMonth = true,
  onClick,
}: CalendarDayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // Convert to Ge'ez (memoized)
  const geezDay = useMemo(() => {
    try {
      return arabicToGeez(ethiopianDay)
    } catch {
      return ''
    }
  }, [ethiopianDay])

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => isHoliday && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          relative w-full p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] rounded-lg transition-all
          flex flex-col items-center justify-start gap-0.5
          ${isCurrentMonth ? '' : 'opacity-40'}
          ${isToday 
            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 ring-2 ring-teal-400' 
            : 'bg-white hover:bg-gray-50 border border-gray-100'
          }
          ${isHoliday && !isToday ? 'bg-amber-50 border-amber-200 hover:bg-amber-100' : ''}
        `}
      >
        {/* Arabic Numeral - Primary */}
        <span className={`
          text-lg sm:text-xl font-semibold leading-none
          ${isToday ? 'text-white' : 'text-gray-800'}
        `}>
          {ethiopianDay}
        </span>
        
        {/* Ge'ez Numeral - Subscript */}
        <span className={`
          text-[10px] sm:text-xs leading-none
          ${isToday ? 'text-teal-100' : 'text-teal-500'}
        `}>
          {geezDay}
        </span>
        
        {/* Gregorian Date - Reference */}
        <span className={`
          text-[9px] sm:text-[10px] leading-none mt-auto
          ${isToday ? 'text-teal-200' : 'text-gray-400'}
        `}>
          {gregorianDate}
        </span>

        {/* Holiday Indicator */}
        {isHoliday && (
          <span className={`
            absolute top-1 right-1 w-2 h-2 rounded-full
            ${isToday ? 'bg-white' : 'bg-amber-500'}
          `} />
        )}
      </button>

      {/* Holiday Tooltip */}
      {isHoliday && holidayName && showTooltip && (
        <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
          <span className="font-medium">{holidayName}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  )
}

export default CalendarDayCell

