/**
 * Ge'ez Numeral Conversion Utilities (Hybrid Extended System)
 * 
 * Supports unlimited number range using nested myriads (፼):
 * - ፻ = 100 (hundred)
 * - ፼ = 10,000 (myriad)
 * - ፼፼ = 10,000² = 100,000,000 (100 million)
 * - ፼፼፼ = 10,000³ = 1,000,000,000,000 (1 trillion)
 * - And so on...
 * 
 * IMPORTANT: This converter validates proper Ge'ez numeral structure.
 * Invalid sequences like ፫፬፭፪ (multiple ones) are rejected.
 * 
 * Ge'ez numerals use a unique system:
 * - Ones: ፩(1) ፪(2) ፫(3) ፬(4) ፭(5) ፮(6) ፯(7) ፰(8) ፱(9)
 * - Tens: ፲(10) ፳(20) ፴(30) ፵(40) ፶(50) ፷(60) ፸(70) ፹(80) ፺(90)
 * - Hundred: ፻ (100) - multiplicative marker
 * - Myriad: ፼ (10,000) - multiplicative marker, stackable for larger numbers
 * 
 * There is no zero in Ge'ez numerals.
 */

// Ge'ez numeral character mappings
const GEEZ_ONES: Record<number, string> = {
  1: '፩', 2: '፪', 3: '፫', 4: '፬', 5: '፭',
  6: '፮', 7: '፯', 8: '፰', 9: '፱',
}

const GEEZ_TENS: Record<number, string> = {
  10: '፲', 20: '፳', 30: '፴', 40: '፵', 50: '፶',
  60: '፷', 70: '፸', 80: '፹', 90: '፺',
}

const GEEZ_HUNDRED = '፻'  // 100
const GEEZ_MYRIAD = '፼'   // 10,000

// Character sets for validation
const ONES_SET = new Set(['፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'])
const TENS_SET = new Set(['፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'])

// Reverse mappings for Ge'ez to Arabic conversion
const ARABIC_FROM_GEEZ: Record<string, number> = {
  '፩': 1, '፪': 2, '፫': 3, '፬': 4, '፭': 5,
  '፮': 6, '፯': 7, '፰': 8, '፱': 9,
  '፲': 10, '፳': 20, '፴': 30, '፵': 40, '፶': 50,
  '፷': 60, '፸': 70, '፹': 80, '፺': 90,
  '፻': 100,
  '፼': 10000,
}

/**
 * Validates that a Ge'ez numeral string follows proper structure.
 * 
 * Rules:
 * 1. A valid "simple group" (1-99) has at most ONE tens digit followed by at most ONE ones digit
 * 2. Tens must come before ones (፲፩ is valid, ፩፲ is invalid)
 * 3. No consecutive ones digits (፫፬ is invalid)
 * 4. No consecutive tens digits (፲፳ is invalid)
 * 5. ፻ and ፼ act as separators between valid groups
 * 
 * @throws Error with description if invalid
 */
function validateGeezStructure(str: string): void {
  if (!str || str.length === 0) {
    throw new Error('Input cannot be empty')
  }

  // Check for valid characters first
  const validChars = new Set(Object.keys(ARABIC_FROM_GEEZ))
  for (const char of str) {
    if (!validChars.has(char)) {
      throw new Error(`Invalid character: "${char}". Only Ge'ez numerals are allowed.`)
    }
  }

  // Track what we've seen in the current group
  let groupHasTens = false
  let groupHasOnes = false
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const isTens = TENS_SET.has(char)
    const isOnes = ONES_SET.has(char)
    const isHundred = char === GEEZ_HUNDRED
    const isMyriad = char === GEEZ_MYRIAD

    if (isTens) {
      // Tens digit
      if (groupHasTens) {
        throw new Error(`Invalid structure: Multiple tens digits in sequence at position ${i + 1}. "${str}" is not a valid Ge'ez number.`)
      }
      if (groupHasOnes) {
        throw new Error(`Invalid structure: Tens digit after ones digit at position ${i + 1}. Tens must come before ones. "${str}" is not a valid Ge'ez number.`)
      }
      groupHasTens = true
      
    } else if (isOnes) {
      // Ones digit
      if (groupHasOnes) {
        throw new Error(`Invalid structure: Multiple ones digits in sequence at position ${i + 1}. "${str}" is not a valid Ge'ez number.`)
      }
      groupHasOnes = true
      
    } else if (isHundred) {
      // Hundred marker - resets the group for what comes after
      // The prefix (before ፻) must be valid (already validated)
      // Reset for suffix
      groupHasTens = false
      groupHasOnes = false
      
    } else if (isMyriad) {
      // Myriad marker - resets everything for remainder
      groupHasTens = false
      groupHasOnes = false
    }
  }

  // Additional validation: can't end with certain invalid patterns
  // (Most cases already caught above)
}

/**
 * Converts a two-digit number (1-99) to Ge'ez
 */
function twoDigitToGeez(n: number): string {
  if (n === 0) return ''
  if (n < 10) return GEEZ_ONES[n] || ''
  
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  
  let result = GEEZ_TENS[tens] || ''
  if (ones > 0) {
    result += GEEZ_ONES[ones]
  }
  return result
}

/**
 * Converts a number up to 9999 to Ge'ez (used for myriad groups)
 */
function upTo9999ToGeez(n: number): string {
  if (n === 0) return ''
  if (n < 100) return twoDigitToGeez(n)
  
  const hundreds = Math.floor(n / 100)
  const remainder = n % 100
  
  let result = ''
  if (hundreds === 1) {
    result = GEEZ_HUNDRED
  } else {
    result = twoDigitToGeez(hundreds) + GEEZ_HUNDRED
  }
  
  if (remainder > 0) {
    result += twoDigitToGeez(remainder)
  }
  
  return result
}

/**
 * Converts an Arabic (standard) integer to Ge'ez numerals
 * 
 * Hybrid system with nested myriads for unlimited range:
 * - Uses ፻ for 100
 * - Uses ፼ for 10,000
 * - Uses ፼፼ for 100,000,000
 * - Uses ፼፼፼ for 1,000,000,000,000
 * - And so on...
 * 
 * @param n - The number to convert (must be a positive integer)
 * @returns The Ge'ez numeral string representation
 * @throws Error if the input is invalid
 * 
 * @example
 * arabicToGeez(123)         // Returns '፻፳፫'
 * arabicToGeez(10000)       // Returns '፼'
 * arabicToGeez(100000000)   // Returns '፼፼'
 * arabicToGeez(123456789)   // Returns '፩፼፼፳፫፻፵፮፼፸፰፻፹፱'
 */
export function arabicToGeez(n: number): string {
  // Validate input
  if (!Number.isInteger(n)) {
    throw new Error('Ge\'ez numerals do not support decimal numbers')
  }
  
  if (n < 1) {
    throw new Error('Ge\'ez numerals do not have a representation for zero or negative numbers')
  }

  // Handle numbers less than 10,000 directly
  if (n < 10000) {
    return upTo9999ToGeez(n)
  }

  // For larger numbers, break into myriad groups (base 10,000)
  // Each group can be 0-9999, and we stack ፼ symbols for each power
  
  const MYRIAD = 10000
  const groups: number[] = []
  let remaining = n
  
  // Extract groups in base 10,000 (least significant first)
  while (remaining > 0) {
    groups.push(remaining % MYRIAD)
    remaining = Math.floor(remaining / MYRIAD)
  }
  
  // Reverse to get most significant first
  groups.reverse()
  
  let result = ''
  const numGroups = groups.length
  
  for (let i = 0; i < numGroups; i++) {
    const group = groups[i]
    const myriadPower = numGroups - 1 - i  // How many ፼ symbols needed
    
    if (group === 0 && myriadPower > 0) {
      // Skip zero groups (but not the last one)
      continue
    }
    
    // Add the group value
    if (myriadPower === 0) {
      // Last group (ones to thousands) - no myriad suffix
      if (group > 0) {
        result += upTo9999ToGeez(group)
      }
    } else {
      // Groups that need myriad markers
      if (group === 1 && myriadPower > 0) {
        // Implied 1 - just add the myriads
        result += GEEZ_MYRIAD.repeat(myriadPower)
      } else if (group > 0) {
        result += upTo9999ToGeez(group) + GEEZ_MYRIAD.repeat(myriadPower)
      }
    }
  }
  
  return result || GEEZ_ONES[1] // Fallback (shouldn't happen)
}

/**
 * Converts Ge'ez numerals to an Arabic (standard) integer
 * 
 * VALIDATES proper Ge'ez structure - invalid sequences are rejected.
 * 
 * Supports nested myriads:
 * - ፼ = 10,000
 * - ፼፼ = 100,000,000
 * - ፼፼፼ = 1,000,000,000,000
 * 
 * @param geezStr - The Ge'ez numeral string to convert
 * @returns The Arabic numeral value
 * @throws Error if the input contains invalid characters or structure
 * 
 * @example
 * geezToArabic('፻፳፫')     // Returns 123
 * geezToArabic('፼')       // Returns 10000
 * geezToArabic('፫፬፭')     // THROWS: Invalid structure
 */
export function geezToArabic(geezStr: string): number {
  if (!geezStr || geezStr.trim() === '') {
    throw new Error('Input cannot be empty')
  }
  
  const str = geezStr.trim()
  
  // First, validate the structure
  validateGeezStructure(str)

  // Parse the validated string
  let total = 0
  let currentGroup = 0
  let i = 0
  
  while (i < str.length) {
    const char = str[i]
    
    if (char === GEEZ_MYRIAD) {
      // Count consecutive myriads
      let myriadCount = 0
      while (i < str.length && str[i] === GEEZ_MYRIAD) {
        myriadCount++
        i++
      }
      
      // Calculate the myriad value (10,000 ^ myriadCount)
      const myriadValue = Math.pow(10000, myriadCount)
      
      // Multiply the current group by this myriad value
      if (currentGroup === 0) {
        currentGroup = 1  // Implied 1
      }
      total += currentGroup * myriadValue
      currentGroup = 0
      
    } else if (char === GEEZ_HUNDRED) {
      // Hundred multiplier
      if (currentGroup === 0) {
        currentGroup = 100
      } else {
        currentGroup = currentGroup * 100
      }
      i++
      
    } else {
      // Regular digit (ones or tens)
      currentGroup += ARABIC_FROM_GEEZ[char]
      i++
    }
  }
  
  // Add any remaining group value
  total += currentGroup
  
  return total
}

/**
 * Safely attempts conversion, returning null on error instead of throwing
 * Useful for real-time input validation
 */
export function safeArabicToGeez(n: number): string | null {
  try {
    return arabicToGeez(n)
  } catch {
    return null
  }
}

export function safeGeezToArabic(geezStr: string): number | null {
  try {
    return geezToArabic(geezStr)
  } catch {
    return null
  }
}

/**
 * Validates a Ge'ez numeral string and returns detailed error info
 * Returns null if valid, or an error message if invalid
 */
export function validateGeezInput(geezStr: string): string | null {
  if (!geezStr || geezStr.trim() === '') {
    return 'Input cannot be empty'
  }
  
  try {
    validateGeezStructure(geezStr.trim())
    return null
  } catch (e) {
    return e instanceof Error ? e.message : 'Invalid Ge\'ez numeral'
  }
}

/**
 * Ge'ez numeral reference data for the on-screen keypad
 */
export const GEEZ_NUMERALS = {
  ones: [
    { symbol: '፩', value: 1 },
    { symbol: '፪', value: 2 },
    { symbol: '፫', value: 3 },
    { symbol: '፬', value: 4 },
    { symbol: '፭', value: 5 },
    { symbol: '፮', value: 6 },
    { symbol: '፯', value: 7 },
    { symbol: '፰', value: 8 },
    { symbol: '፱', value: 9 },
  ],
  tens: [
    { symbol: '፲', value: 10 },
    { symbol: '፳', value: 20 },
    { symbol: '፴', value: 30 },
    { symbol: '፵', value: 40 },
    { symbol: '፶', value: 50 },
    { symbol: '፷', value: 60 },
    { symbol: '፸', value: 70 },
    { symbol: '፹', value: 80 },
    { symbol: '፺', value: 90 },
  ],
  multipliers: [
    { symbol: '፻', value: 100, label: 'hundred' },
    { symbol: '፼', value: 10000, label: 'myriad (stackable)' },
  ],
} as const

export const ALL_GEEZ_NUMERALS = [
  ...GEEZ_NUMERALS.ones,
  ...GEEZ_NUMERALS.tens,
  ...GEEZ_NUMERALS.multipliers,
]

/**
 * Get human-readable explanation of the myriad power system
 */
export function getMyriadPowerInfo(power: number): { value: number; name: string } {
  const value = Math.pow(10000, power)
  const names: Record<number, string> = {
    1: 'Myriad (፼)',
    2: 'Double Myriad (፼፼) - 100 Million',
    3: 'Triple Myriad (፼፼፼) - 1 Trillion',
    4: 'Quadruple Myriad (፼፼፼፼) - 10 Quadrillion',
  }
  return {
    value,
    name: names[power] || `${power}× Myriad (10,000^${power})`
  }
}
