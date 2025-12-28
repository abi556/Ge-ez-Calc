import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllTopics, getTopic, getRelatedTopics, searchTopics } from '../utils/learnContent'
import { TopicNavigation } from './TopicNavigation'
import { TopicCard } from './TopicCard'
import { TopicWelcomeScreen } from './TopicWelcomeScreen'
import { PartSection } from './PartSection'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'
import { ReadingProgress } from './ReadingProgress'
import { updateSEO } from '../utils/seo'

// No props needed - routing handled by React Router
export function LearnPage() {
  const allTopics = useMemo(() => getAllTopics(), [])
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter topics based on search
  const displayedTopics = useMemo(() => {
    if (!searchQuery.trim()) return allTopics
    return searchTopics(searchQuery)
  }, [allTopics, searchQuery])
  
  // Get related topics
  const relatedTopics = useMemo(() => {
    if (!selectedTopicId) return []
    return getRelatedTopics(selectedTopicId, 3)
  }, [selectedTopicId])

  const selectedTopic = useMemo(() => {
    if (!selectedTopicId) return null
    return getTopic(selectedTopicId)
  }, [selectedTopicId])

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId)
    setSearchQuery('') // Clear search when selecting a topic
    // Scroll to top when selecting a topic
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToTopics = () => {
    setSelectedTopicId(null)
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  // Update document title and meta tags for SEO
  useEffect(() => {
    if (selectedTopic) {
      const topicKeywords = getTopicKeywords(selectedTopic.id)
      updateSEO({
        title: `${selectedTopic.title} | Learn About Ethiopian Calendar & Numbers - Ge'ez Calc`,
        description: selectedTopic.description || `Learn about ${selectedTopic.title.toLowerCase()} - Ethiopian calendar, numbers, and timekeeping system. Educational content about Ethiopian heritage.`,
        keywords: topicKeywords,
        // TODO: Replace with actual domain when purchased - temporary Vercel URL
        canonicalUrl: `https://ge-ez-calc.vercel.app/learn?topic=${selectedTopic.id}`,
        ogType: 'article',
      })
    } else {
      updateSEO({
        title: 'Learn About Ethiopian Calendar & Numbers | Ge\'ez Calc Educational Hub',
        description: 'Learn about Ethiopian calendar, Ge\'ez numerals, Ethiopian timekeeping system, holidays, and traditional measurements. Comprehensive educational content about Ethiopian heritage and culture.',
        keywords: 'learn about ethiopian calendar, learn about ethiopian number, learn about ethiopian time system, ethiopian calendar education, geez numerals guide, ethiopian calendar explained, ethiopian number system, ethiopian timekeeping, ethiopian calendar tutorial',
        // TODO: Replace with actual domain when purchased - temporary Vercel URL
        canonicalUrl: 'https://ge-ez-calc.vercel.app/learn',
        ogType: 'website',
      })
    }
  }, [selectedTopic])

  // Helper function to generate topic-specific keywords
  function getTopicKeywords(topicId: string): string {
    const keywordMap: Record<string, string> = {
      'numeral-system': 'learn about ethiopian number, ethiopian number system, geez numerals, ethiopian numerals explained, how to read ethiopian numbers, ethiopian number conversion',
      'calendar-origin': 'learn about ethiopian calendar, ethiopian calendar explained, ethiopian calendar history, how does ethiopian calendar work, ethiopian calendar system, ethiopian calendar tutorial',
      'timekeeping-system': 'learn about ethiopian time system, ethiopian timekeeping, ethiopian clock system, ethiopian time explained, how ethiopian time works, ethiopian time conversion',
      'holidays': 'ethiopian holidays, ethiopian festivals, ethiopian celebrations, ethiopian calendar holidays, learn about ethiopian holidays',
      'punctuation': 'geez punctuation, ethiopian punctuation, amharic punctuation, ethiopian writing system',
      'measurements': 'ethiopian measurements, traditional ethiopian units, ethiopian measurement system',
      'leap-years': 'ethiopian leap year, ethiopian calendar leap year, how ethiopian calendar calculates leap years',
      'currency': 'ethiopian currency history, traditional ethiopian money, ethiopian currency system',
    }
    return keywordMap[topicId] || 'ethiopian calendar, ethiopian numbers, ethiopian heritage'
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:py-6 lg:px-8" role="main">
        <div className="w-full">
          {/* Show Welcome Screen or Topic Content */}
          {!selectedTopicId ? (
            /* Welcome Screen with Topic Cards */
            <div className="max-w-6xl mx-auto">
              <TopicWelcomeScreen
                topics={allTopics}
                onSelectTopic={handleSelectTopic}
              />
            </div>
          ) : (
            /* Topic Content View */
            <>
              {/* Back to Topics Button */}
              <div className="mb-6">
                <button
                  onClick={handleBackToTopics}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleBackToTopics()
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  aria-label="Back to topic selection"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Topics</span>
                </button>
              </div>

              {/* Two Column Layout for Desktop */}
              <div className="flex flex-col lg:flex-row gap-5">
                {/* Left Column - Main Content */}
                <div className="flex-1">
                  {selectedTopic ? (
                    <div className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
                      {/* Topic Overview Card */}
                      <TopicCard topic={selectedTopic} />

                      {/* Parts Sections */}
                      <div className="space-y-4">
                        {selectedTopic.parts.map((part, index) => (
                          <div
                            key={part.id}
                            className="opacity-0 animate-[fadeIn_0.2s_ease-in-out_forwards]"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <PartSection
                              part={part}
                              topicId={selectedTopic.id}
                            />
                          </div>
                        ))}
                      </div>

                  {/* Related Topics */}
                  {relatedTopics.length > 0 && (
                    <div className="mt-8 bg-white rounded border border-gray-200 p-5 opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.2s_forwards]">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Related Topics</h3>
                      <div className="space-y-2" role="navigation" aria-label="Related topics">
                        {relatedTopics.map(topic => (
                          <button
                            key={topic.id}
                            onClick={() => handleSelectTopic(topic.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleSelectTopic(topic.id)
                              }
                            }}
                            className="w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150 border border-transparent hover:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            aria-label={`Navigate to ${topic.title}`}
                          >
                            <div className="font-medium">{topic.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{topic.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded border border-gray-200 p-12 text-center">
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              )}
            </div>

                {/* Right Column - Sidebar Navigation (Desktop Only) */}
                <TopicNavigation
                  topics={displayedTopics}
                  selectedTopic={selectedTopicId}
                  onSelectTopic={handleSelectTopic}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            </>
          )}
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

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default LearnPage

