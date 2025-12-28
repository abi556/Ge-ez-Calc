import { Topic } from '../utils/learnContent'

interface WelcomeTopicCardProps {
  topic: Topic
  onClick: () => void
  delay?: number
}

export function WelcomeTopicCard({ topic, onClick, delay = 0 }: WelcomeTopicCardProps) {
  const isCore = topic.category === 'core'
  const borderColor = isCore ? 'border-primary-200 hover:border-primary-400' : 'border-primary-200 hover:border-primary-400'
  const badgeColor = isCore ? 'bg-primary-100 text-primary-700' : 'bg-primary-100 text-primary-700'
  const accentColor = isCore ? 'text-primary-500' : 'text-primary-500'

  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={`
        w-full bg-white rounded border-2 ${borderColor} p-6 text-left
        shadow-sm hover:shadow-sm transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-primary-500/20
        opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]
        group
      `}
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`Explore ${topic.title}`}
    >
      {/* Category Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2.5 py-1 rounded text-xs font-medium ${badgeColor}`}>
          {isCore ? 'Core' : 'Additional'}
        </span>
        <svg
          className={`w-5 h-5 ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Topic Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-700 transition-colors">
        {topic.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {topic.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>{topic.parts.length} {topic.parts.length === 1 ? 'part' : 'parts'}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{topic.estimatedTime}</span>
        </div>
      </div>
    </button>
  )
}

