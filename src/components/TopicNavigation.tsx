import { Topic } from '../utils/learnContent'

interface TopicNavigationProps {
  topics: Topic[]
  selectedTopic: string
  onSelectTopic: (topicId: string) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function TopicNavigation({ topics, selectedTopic, onSelectTopic, searchQuery, onSearchChange }: TopicNavigationProps) {
  const coreTopics = topics.filter(t => t.category === 'core')
  const additionalTopics = topics.filter(t => t.category === 'additional')

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 flex-col gap-4">
        {/* Search Box */}
        {onSearchChange && (
          <div className="bg-white rounded border border-gray-200 p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search topics..."
                className="w-full px-3 py-2 pl-9 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
              <svg
                className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
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
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-gray-500">
                {topics.length} {topics.length === 1 ? 'topic' : 'topics'} found
              </p>
            )}
          </div>
        )}
        {/* Core Topics */}
        {coreTopics.length > 0 && (
          <div className="bg-white rounded border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Core Topics</h3>
            <nav className="space-y-1">
              {coreTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onSelectTopic(topic.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded text-sm transition-colors
                    ${selectedTopic === topic.id
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {topic.title}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Additional Topics */}
        {additionalTopics.length > 0 && (
          <div className="bg-white rounded border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">More Topics</h3>
            <nav className="space-y-1">
              {additionalTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => onSelectTopic(topic.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelectTopic(topic.id)
                    }
                  }}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150
                    ${selectedTopic === topic.id
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20
                  `}
                  aria-current={selectedTopic === topic.id ? 'page' : undefined}
                >
                  {topic.title}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-4">
        {/* Mobile Search */}
        {onSearchChange && (
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search topics..."
                className="w-full px-4 py-2 pl-10 text-sm text-gray-800 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
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
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-gray-500 text-sm">
                {topics.length} {topics.length === 1 ? 'topic' : 'topics'} found
              </p>
            )}
          </div>
        )}
        <div className="bg-white rounded border border-gray-200 p-2 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={`
                  px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedTopic === topic.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

