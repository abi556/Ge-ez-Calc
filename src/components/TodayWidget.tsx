import { useMemo } from 'react'
import { getTodayEthiopian } from '../utils/ethiopianDate'

interface TodayWidgetProps {
  /** Show evangelist year info */
  showEvangelist?: boolean
  /** Variant: 'header' for compact, 'hero' for prominent display */
  variant?: 'header' | 'hero'
  /** Additional CSS classes */
  className?: string
}

/**
 * TodayWidget - Displays today's Ethiopian date in Ge'ez numerals
 * 
 * A minimalist, fixed component for showing the current Ethiopian date.
 * Designed for use in headers with subtle styling.
 */
export function TodayWidget({ 
  showEvangelist = false, 
  variant = 'header',
  className = '' 
}: TodayWidgetProps) {
  // Fetch today's Ethiopian date (memoized - only runs once on mount)
  const today = useMemo(() => getTodayEthiopian(), [])

  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-gray-400 text-xs font-light uppercase tracking-widest mb-1">
          Today
        </p>
        <p className="text-2xl font-extralight text-gray-700 tracking-wide">
          <span className="text-teal-600">
            {today.monthNameAmharic} {today.dayGeez}
          </span>
          <span className="text-gray-300 mx-2">•</span>
          <span className="text-gray-500">{today.yearGeez}</span>
        </p>
        {showEvangelist && (
          <p className="text-xs text-gray-400 font-light mt-1">
            Year of {today.evangelist.nameEnglish}
            <span className="text-gray-300 mx-1">·</span>
            <span className="text-teal-500/70">{today.evangelist.name}</span>
          </p>
        )}
      </div>
    )
  }

  // Header variant - compact, subtle
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Ethiopian Date in Ge'ez */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-light text-gray-300 tracking-wide">
          {today.monthNameAmharic}
        </span>
        <span className="text-sm font-light text-teal-400/80">
          {today.dayGeez}
        </span>
        <span className="text-gray-500 text-xs">•</span>
        <span className="text-xs font-light text-gray-400">
          {today.yearGeez}
        </span>
      </div>
      
      {/* Evangelist indicator (optional) */}
      {showEvangelist && (
        <>
          <span className="text-gray-600 text-xs">|</span>
          <span className="text-xs font-light text-gray-500" title={today.evangelist.name}>
            {today.evangelist.nameEnglish}
          </span>
        </>
      )}
    </div>
  )
}

export default TodayWidget

