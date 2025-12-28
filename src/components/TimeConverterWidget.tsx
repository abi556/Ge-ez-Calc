import { useState, useMemo } from 'react'

interface TimeConverterWidgetProps {
  className?: string
}

export function TimeConverterWidget({ className = '' }: TimeConverterWidgetProps) {
  const [ethiopianTime, setEthiopianTime] = useState(1)
  const [isDaytime, setIsDaytime] = useState(true)

  // Convert Ethiopian time to International time
  const convertToInternational = useMemo(() => {
    // Ethiopian time is 6 hours behind
    // Daytime cycle: 12:00 Ethiopian = 6:00 AM International (dawn)
    // Nighttime cycle: 12:00 Ethiopian = 6:00 PM International (dusk)
    if (isDaytime) {
      // Daytime: Ethiopian 12 = 6 AM, Ethiopian 1 = 7 AM, ..., Ethiopian 11 = 5 PM
      return ethiopianTime === 12 ? 6 : 6 + ethiopianTime
    } else {
      // Nighttime: Ethiopian 12 = 6 PM, Ethiopian 1 = 7 PM, ..., Ethiopian 11 = 5 AM next day
      if (ethiopianTime === 12) {
        return 18 // 6 PM
      } else if (ethiopianTime <= 5) {
        return 18 + ethiopianTime // 7 PM to 11 PM
      } else {
        return ethiopianTime - 6 // 12 AM to 5 AM (next day)
      }
    }
  }, [ethiopianTime, isDaytime])

  // Convert International time to Ethiopian time
  const handleInternationalChange = (hour: number) => {
    if (hour >= 6 && hour < 18) {
      // Daytime cycle (6 AM - 5:59 PM)
      setIsDaytime(true)
      if (hour === 6) {
        setEthiopianTime(12)
      } else {
        setEthiopianTime(hour - 6)
      }
    } else {
      // Nighttime cycle (6 PM - 5:59 AM)
      setIsDaytime(false)
      if (hour === 18) {
        setEthiopianTime(12) // 6 PM = Ethiopian 12 (night)
      } else if (hour > 18) {
        setEthiopianTime(hour - 18) // 7 PM = 1, 8 PM = 2, etc.
      } else {
        setEthiopianTime(hour + 6) // 12 AM = 6, 1 AM = 7, etc.
      }
    }
  }

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:00 ${period}`
  }

  const formatEthiopianTime = (hour: number) => {
    return hour === 12 ? '12:00' : `${hour}:00`
  }

  return (
    <div className={`bg-white rounded border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ethiopian Time Converter</h3>
      
      <div className="space-y-6">
        {/* Ethiopian Time Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Ethiopian Time
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDaytime(true)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  isDaytime
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setIsDaytime(false)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  !isDaytime
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Night
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="12"
              value={ethiopianTime}
              onChange={(e) => setEthiopianTime(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary-500"
            />
            <div className="w-20 text-center">
              <div className="text-2xl font-semibold text-primary-600">
                {formatEthiopianTime(ethiopianTime)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isDaytime ? 'Daytime' : 'Nighttime'}
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Arrow */}
        <div className="flex items-center justify-center">
          <div className="text-primary-500 text-2xl">↓</div>
        </div>

        {/* International Time Display */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            International Time (EAT)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="23"
              value={convertToInternational}
              onChange={(e) => handleInternationalChange(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-primary-500"
            />
            <div className="w-24 text-center">
              <div className="text-2xl font-semibold text-gray-800">
                {formatTime(convertToInternational)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {convertToInternational < 12 ? 'Morning' : convertToInternational < 18 ? 'Afternoon' : 'Evening'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="bg-gray-50 rounded p-4 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Quick Examples
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Ethiopian 1:00 (Day) =</span>
              <span className="font-medium text-gray-800">7:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>Ethiopian 6:00 (Day) =</span>
              <span className="font-medium text-gray-800">12:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Ethiopian 12:00 (Day) =</span>
              <span className="font-medium text-gray-800">6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Ethiopian 1:00 (Night) =</span>
              <span className="font-medium text-gray-800">7:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

