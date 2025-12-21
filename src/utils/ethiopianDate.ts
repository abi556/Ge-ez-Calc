/**
 * Ethiopian Date Utilities
 * 
 * A comprehensive wrapper around the 'kenat' library for Ethiopian calendar operations.
 * 
 * INSTALLATION:
 * ```bash
 * npm install kenat
 * ```
 * 
 * The kenat library provides:
 * - Bidirectional Gregorian ↔ Ethiopian date conversion
 * - Ethiopian month/day names in Amharic and English
 * - Ge'ez numeral conversion
 * - Bahire Hasab (liturgical calculations)
 * - Holiday detection
 * - Date arithmetic (add/subtract days, months, years)
 * - Ethiopian time conversion
 */

import Kenat, { 
  monthNames, 
  toGeez, 
  toArabic,
  getHolidaysForYear,
  getHolidaysInMonth,
} from 'kenat'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Simple Ethiopian date object (year, month, day)
 */
export interface EthiopianDate {
  year: number
  month: number   // 1-13 (13th month is Pagume)
  day: number     // 1-30 (or 5-6 for Pagume)
}

/**
 * Simple Gregorian date object
 */
export interface GregorianDate {
  year: number
  month: number   // 1-12
  day: number
}

/**
 * Evangelist year info (4-year cycle)
 */
export interface EvangelistInfo {
  name: string        // Amharic name
  nameEnglish: string // English name
  remainder: number   // 0-3
}

/**
 * Full Ethiopian date info with formatting
 */
export interface EthiopianDateInfo {
  // Raw values
  year: number
  month: number
  day: number
  
  // Formatted strings
  monthNameAmharic: string
  monthNameEnglish: string
  dayGeez: string
  yearGeez: string
  
  // Full formatted date
  formattedAmharic: string      // e.g., "ታኅሣሥ ፲፪ ፳፻፲፯"
  formattedEnglish: string      // e.g., "Tahsas 12 2017"
  
  // Evangelist year info
  evangelist: EvangelistInfo
  
  // Gregorian equivalent
  gregorian: GregorianDate
}

/**
 * Holiday information
 */
export interface HolidayInfo {
  key: string
  name: string
  description?: string
  tags: string[]
  movable: boolean
  ethiopian: EthiopianDate
  gregorian: GregorianDate
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Evangelist names (4-year cycle: Matthew → Mark → Luke → John)
const EVANGELISTS = {
  amharic: { 0: 'ዮሐንስ', 1: 'ማቴዎስ', 2: 'ማርቆስ', 3: 'ሉቃስ' },
  english: { 0: 'John', 1: 'Matthew', 2: 'Mark', 3: 'Luke' },
} as const

/**
 * Ethiopian month names in both languages
 */
export const ETHIOPIAN_MONTHS = {
  amharic: monthNames.amharic as string[],
  english: monthNames.english as string[],
}

// ============================================================================
// CORE CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert a JavaScript Date (Gregorian) to Ethiopian date components
 * 
 * @param date - JavaScript Date object
 * @returns Object with Ethiopian year, month, day
 * 
 * @example
 * const eth = gregorianToEthiopianSimple(new Date('2025-12-21'))
 * // { year: 2018, month: 4, day: 12 }
 */
export function gregorianToEthiopianSimple(date: Date): EthiopianDate {
  const kenat = new Kenat(date)
  return kenat.getEthiopian()
}

/**
 * Convert Ethiopian date components to a JavaScript Date (Gregorian)
 * 
 * @param year - Ethiopian year
 * @param month - Ethiopian month (1-13)
 * @param day - Ethiopian day (1-30)
 * @returns JavaScript Date object
 * 
 * @example
 * const greg = ethiopianToGregorianSimple(2018, 4, 12)
 * // Date object for December 21, 2025
 */
export function ethiopianToGregorianSimple(year: number, month: number, day: number): Date {
  const kenat = new Kenat({ year, month, day })
  const greg = kenat.getGregorian()
  return new Date(greg.year, greg.month - 1, greg.day)
}

/**
 * Convert a Gregorian date to Ethiopian with full formatting info
 * 
 * @param date - JavaScript Date object
 * @returns Full Ethiopian date info including formatting
 */
export function gregorianToEthiopian(date: Date): EthiopianDateInfo {
  const kenat = new Kenat(date)
  const eth = kenat.getEthiopian()
  const greg = kenat.getGregorian()
  const bahireHasab = kenat.getBahireHasab()
  
  return {
    year: eth.year,
    month: eth.month,
    day: eth.day,
    
    monthNameAmharic: monthNames.amharic[eth.month - 1],
    monthNameEnglish: monthNames.english[eth.month - 1],
    dayGeez: toGeez(eth.day),
    yearGeez: toGeez(eth.year),
    
    formattedAmharic: kenat.formatInGeezAmharic(),
    formattedEnglish: kenat.format({ lang: 'english' }),
    
    evangelist: {
      name: bahireHasab.evangelist.name,
      nameEnglish: EVANGELISTS.english[bahireHasab.evangelist.remainder as keyof typeof EVANGELISTS.english],
      remainder: bahireHasab.evangelist.remainder,
    },
    
    gregorian: {
      year: greg.year,
      month: greg.month,
      day: greg.day,
    },
  }
}

/**
 * Convert Ethiopian date to Gregorian Date object
 */
export function ethiopianToGregorian(year: number, month: number, day: number): Date {
  const kenat = new Kenat({ year, month, day })
  const greg = kenat.getGregorian()
  return new Date(greg.year, greg.month - 1, greg.day)
}

/**
 * Get today's Ethiopian date with full formatting
 */
export function getTodayEthiopian(): EthiopianDateInfo {
  return gregorianToEthiopian(new Date())
}

// ============================================================================
// DATE ARITHMETIC
// ============================================================================

/**
 * Add days to an Ethiopian date
 * 
 * @param ethDate - Ethiopian date object or { year, month, day }
 * @param days - Number of days to add (can be negative)
 * @returns New Ethiopian date
 */
export function addDaysToEthiopian(ethDate: EthiopianDate, days: number): EthiopianDate {
  const kenat = new Kenat(ethDate)
  const result = kenat.addDays(days)
  return result.getEthiopian()
}

/**
 * Add months to an Ethiopian date
 */
export function addMonthsToEthiopian(ethDate: EthiopianDate, months: number): EthiopianDate {
  const kenat = new Kenat(ethDate)
  const result = kenat.addMonths(months)
  return result.getEthiopian()
}

/**
 * Add years to an Ethiopian date
 */
export function addYearsToEthiopian(ethDate: EthiopianDate, years: number): EthiopianDate {
  const kenat = new Kenat(ethDate)
  const result = kenat.addYears(years)
  return result.getEthiopian()
}

/**
 * Calculate difference in days between two Ethiopian dates
 */
export function diffInDays(date1: EthiopianDate, date2: EthiopianDate): number {
  const kenat1 = new Kenat(date1)
  const kenat2 = new Kenat(date2)
  return kenat1.diffInDays(kenat2)
}

// ============================================================================
// FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format an Ethiopian date in Amharic with Ge'ez numerals
 * 
 * @example
 * formatEthiopianAmharic({ year: 2017, month: 4, day: 12 })
 * // "ታኅሣሥ ፲፪ ፳፻፲፯"
 */
export function formatEthiopianAmharic(ethDate: EthiopianDate): string {
  const kenat = new Kenat(ethDate)
  return kenat.formatInGeezAmharic()
}

/**
 * Format an Ethiopian date in English
 * 
 * @example
 * formatEthiopianEnglish({ year: 2017, month: 4, day: 12 })
 * // "Tahsas 12 2017"
 */
export function formatEthiopianEnglish(ethDate: EthiopianDate): string {
  const kenat = new Kenat(ethDate)
  return kenat.format({ lang: 'english' })
}

/**
 * Format an Ethiopian date with weekday
 * 
 * @example
 * formatWithWeekday({ year: 2017, month: 4, day: 12 }, 'english')
 * // "Saturday, Tahsas 12 2017"
 */
export function formatWithWeekday(ethDate: EthiopianDate, lang: 'amharic' | 'english' = 'amharic'): string {
  const kenat = new Kenat(ethDate)
  return kenat.formatWithWeekday(lang)
}

/**
 * Get the month name for a given month number
 */
export function getMonthName(month: number, lang: 'amharic' | 'english' = 'amharic'): string {
  if (month < 1 || month > 13) {
    throw new Error('Month must be between 1 and 13')
  }
  return monthNames[lang][month - 1]
}

/**
 * Get all month names
 */
export function getMonthNames(lang: 'amharic' | 'english' = 'amharic'): string[] {
  return monthNames[lang]
}

// ============================================================================
// HOLIDAY FUNCTIONS
// ============================================================================

/**
 * Get all holidays for an Ethiopian year
 * 
 * @param year - Ethiopian year
 * @param filter - Optional tag filter ('public', 'christian', 'muslim', etc.)
 */
export function getHolidays(year: number, filter?: string | string[]): HolidayInfo[] {
  const options = filter ? { filter } : undefined
  return getHolidaysForYear(year, options)
}

/**
 * Get holidays for a specific Ethiopian month
 */
export function getHolidaysForMonth(year: number, month: number): HolidayInfo[] {
  return getHolidaysInMonth(year, month)
}

/**
 * Check if an Ethiopian date is a holiday
 */
export function isHoliday(ethDate: EthiopianDate): HolidayInfo[] {
  const kenat = new Kenat(ethDate)
  return kenat.isHoliday()
}

// ============================================================================
// BAHIRE HASAB (LITURGICAL CALCULATIONS)
// ============================================================================

/**
 * Get Bahire Hasab calculations for a year
 * Includes evangelist, movable feasts (Fasika/Easter, etc.)
 */
export function getBahireHasab(year: number) {
  const kenat = new Kenat({ year, month: 1, day: 1 })
  return kenat.getBahireHasab()
}

/**
 * Get the evangelist for a given Ethiopian year
 */
export function getEvangelist(year: number): EvangelistInfo {
  const bahireHasab = getBahireHasab(year)
  return {
    name: bahireHasab.evangelist.name,
    nameEnglish: EVANGELISTS.english[bahireHasab.evangelist.remainder as keyof typeof EVANGELISTS.english],
    remainder: bahireHasab.evangelist.remainder,
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if an Ethiopian year is a leap year
 * (Every 4th year before the Ethiopian New Year)
 */
export function isLeapYear(year: number): boolean {
  const kenat = new Kenat({ year, month: 1, day: 1 })
  return kenat.isLeapYear()
}

/**
 * Get the number of days in an Ethiopian month
 * (30 days for months 1-12, 5 or 6 for Pagume/month 13)
 */
export function getDaysInMonth(year: number, month: number): number {
  if (month < 1 || month > 13) {
    throw new Error('Month must be between 1 and 13')
  }
  if (month <= 12) {
    return 30
  }
  // Pagume (13th month): 5 days normally, 6 in leap year
  return isLeapYear(year) ? 6 : 5
}

/**
 * Validate an Ethiopian date
 */
export function isValidEthiopianDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 13) return false
  if (day < 1) return false
  const maxDays = getDaysInMonth(year, month)
  return day <= maxDays
}

// ============================================================================
// GE'EZ NUMERAL FUNCTIONS (re-exported from kenat)
// ============================================================================

/**
 * Convert a number to Ge'ez numerals
 * Note: This is kenat's built-in converter, different from our custom hybrid one
 */
export { toGeez, toArabic }

// ============================================================================
// QUICK REFERENCE
// ============================================================================

/**
 * Ethiopian Calendar Quick Reference:
 * 
 * MONTHS (13 total):
 * 1.  Meskerem (መስከረም)     - Sep/Oct
 * 2.  Tikimt (ጥቅምት)        - Oct/Nov
 * 3.  Hidar (ኅዳር)          - Nov/Dec
 * 4.  Tahsas (ታኅሣሥ)        - Dec/Jan
 * 5.  Tir (ጥር)             - Jan/Feb
 * 6.  Yekatit (የካቲት)       - Feb/Mar
 * 7.  Megabit (መጋቢት)       - Mar/Apr
 * 8.  Miyazia (ሚያዝያ)       - Apr/May
 * 9.  Ginbot (ግንቦት)        - May/Jun
 * 10. Sene (ሰኔ)            - Jun/Jul
 * 11. Hamle (ሐምሌ)          - Jul/Aug
 * 12. Nehase (ነሐሴ)         - Aug/Sep
 * 13. Pagume (ጳጉሜ)         - Sep (5-6 days)
 * 
 * YEAR GAP:
 * Ethiopian calendar is 7-8 years behind Gregorian
 * (Based on different calculation of Annunciation of Jesus)
 * 
 * NEW YEAR:
 * Enkutatash (እንቁጣጣሽ) - September 11 (or 12 in leap years)
 * 
 * EVANGELIST CYCLE (4 years):
 * Matthew (ማቴዎስ) → Mark (ማርቆስ) → Luke (ሉቃስ) → John (ዮሐንስ)
 */
