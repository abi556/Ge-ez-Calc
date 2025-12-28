import { Topic } from '../utils/learnContent'
import { WelcomeTopicCard } from './WelcomeTopicCard'

interface TopicWelcomeScreenProps {
  topics: Topic[]
  onSelectTopic: (topicId: string) => void
}

export function TopicWelcomeScreen({ topics, onSelectTopic }: TopicWelcomeScreenProps) {
  const coreTopics = topics.filter(t => t.category === 'core')
  const additionalTopics = topics.filter(t => t.category === 'additional')

  return (
    <div className="w-full">
      {/* Welcome Header */}
      <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
        <h1 className="mb-4">
          <span 
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Welcome
          </span>
          <span 
            className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight ml-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em',
            }}
          >
            to Learn Hub
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
          Explore Ethiopian heritage through Ge'ez numerals and calendar
        </p>
        <p className="text-sm md:text-base text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
          Choose a topic below to begin your journey
        </p>
      </div>

      {/* Core Topics Section */}
      {coreTopics.length > 0 && (
        <div className="mb-8 opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.2s_forwards]">
          <div className="mb-4 pb-2 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">
              Core Topics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {coreTopics.map((topic, index) => (
              <WelcomeTopicCard
                key={topic.id}
                topic={topic}
                onClick={() => onSelectTopic(topic.id)}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      )}

      {/* Additional Topics Section */}
      {additionalTopics.length > 0 && (
        <div className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.3s_forwards]">
          <div className="mb-4 pb-2 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">
              More Topics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {additionalTopics.map((topic, index) => (
              <WelcomeTopicCard
                key={topic.id}
                topic={topic}
                onClick={() => onSelectTopic(topic.id)}
                delay={(coreTopics.length + index) * 100}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

