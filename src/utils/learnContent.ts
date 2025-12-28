// Types for Learn Hub content
export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'table' | 'example' | 'key-points' | 'interactive'
  data: {
    text?: string
    items?: string[]
    headers?: string[]
    rows?: string[][]
    points?: string[]
    type?: string
    [key: string]: unknown
  }
}

export interface Part {
  id: string
  title: string
  content: ContentBlock[]
  order: number
}

export interface Topic {
  id: string
  title: string
  description: string
  category: 'core' | 'additional'
  estimatedTime: string
  parts: Part[]
}

// Load topic data
export async function loadTopic(topicId: string): Promise<Topic | null> {
  try {
    const response = await fetch(`/src/data/learn/${topicId}.json`)
    if (!response.ok) return null
    const data = await response.json()
    return data as Topic
  } catch (error) {
    console.error(`Error loading topic ${topicId}:`, error)
    return null
  }
}

// Load all topics
export async function loadAllTopics(): Promise<Topic[]> {
  const topicIds = [
    'numeral-system',
    'calendar-origin',
    'timekeeping-system',
    'holidays',
    'punctuation',
    'measurements',
    'leap-years',
    'currency',
  ]
  
  const topics = await Promise.all(
    topicIds.map(id => loadTopic(id))
  )
  
  return topics.filter((topic): topic is Topic => topic !== null)
}

// For development: import directly (avoids fetch issues)
import numeralSystemData from '../data/learn/numeral-system.json'
import calendarOriginData from '../data/learn/calendar-origin.json'
import timekeepingSystemData from '../data/learn/timekeeping-system.json'
import holidaysData from '../data/learn/holidays.json'
import punctuationData from '../data/learn/punctuation.json'
import measurementsData from '../data/learn/measurements.json'
import leapYearsData from '../data/learn/leap-years.json'
import currencyData from '../data/learn/currency.json'

export function getTopic(topicId: string): Topic | null {
  const topics: Record<string, Topic> = {
    'numeral-system': numeralSystemData as Topic,
    'calendar-origin': calendarOriginData as Topic,
    'timekeeping-system': timekeepingSystemData as Topic,
    'holidays': holidaysData as Topic,
    'punctuation': punctuationData as Topic,
    'measurements': measurementsData as Topic,
    'leap-years': leapYearsData as Topic,
    'currency': currencyData as Topic,
  }
  
  return topics[topicId] || null
}

export function getAllTopics(): Topic[] {
  return [
    numeralSystemData as Topic,
    calendarOriginData as Topic,
    timekeepingSystemData as Topic,
    holidaysData as Topic,
    punctuationData as Topic,
    measurementsData as Topic,
    leapYearsData as Topic,
    currencyData as Topic,
  ]
}

// Search topics by query
export function searchTopics(query: string): Topic[] {
  if (!query.trim()) return getAllTopics()
  
  const lowerQuery = query.toLowerCase()
  return getAllTopics().filter(topic => {
    const searchText = `${topic.title} ${topic.description} ${topic.parts.map(p => p.title).join(' ')}`.toLowerCase()
    return searchText.includes(lowerQuery)
  })
}

// Get related topics (topics in same category or with similar themes)
export function getRelatedTopics(currentTopicId: string, limit: number = 3): Topic[] {
  const currentTopic = getTopic(currentTopicId)
  if (!currentTopic) return []
  
  const allTopics = getAllTopics()
  const related = allTopics
    .filter(t => t.id !== currentTopicId)
    .filter(t => {
      // Same category gets priority
      if (t.category === currentTopic.category) return true
      // Core topics are related to each other
      if (currentTopic.category === 'core' && t.category === 'core') return true
      return false
    })
    .slice(0, limit)
  
  return related
}

