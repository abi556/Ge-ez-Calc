import { useState } from 'react'
import { Topic, searchTopics } from '../utils/learnContent'

interface TopicSearchProps {
  topics: Topic[]
  onSelectTopic: (topicId: string) => void
  selectedTopicId: string
}

export function TopicSearch({ topics }: TopicSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const filteredTopics = searchQuery.trim()
    ? searchTopics(searchQuery)
    : topics

  return (
    <div className="mb-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsSearching(e.target.value.length > 0)
          }}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setTimeout(() => setIsSearching(false), 200)}
          placeholder="Search topics..."
          className="w-full px-4 py-2 pl-10 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setIsSearching(false)
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Count */}
      {isSearching && (
        <p className="mt-2 text-xs text-gray-500">
          {filteredTopics.length} {filteredTopics.length === 1 ? 'topic' : 'topics'} found
        </p>
      )}
    </div>
  )
}

