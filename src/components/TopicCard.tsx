import { Topic } from '../utils/learnContent'

interface TopicCardProps {
  topic: Topic
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <div className="bg-white rounded border border-gray-200 p-6 mb-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-2">
          {topic.title}
        </h2>
        <p className="text-sm text-gray-500">
          {topic.description}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <span>{topic.parts.length} parts</span>
        <span>•</span>
        <span>{topic.estimatedTime}</span>
      </div>
    </div>
  )
}

