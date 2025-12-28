import { Part } from '../utils/learnContent'
import { ContentBlock } from './ContentBlock'

interface PartSectionProps {
  part: Part
  topicId: string
}

export function PartSection({ part }: PartSectionProps) {
  return (
    <div className="bg-white rounded border border-gray-200 overflow-hidden">
      {/* Part Header */}
      <div
        id={`part-header-${part.id}`}
        className="px-5 py-4 border-b border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-800">{part.title}</h3>
      </div>

      {/* Part Content - Always Visible */}
      <div
        id={`part-content-${part.id}`}
        className="px-5 pb-5 space-y-4 pt-4"
        role="region"
        aria-labelledby={`part-header-${part.id}`}
      >
        {part.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>
    </div>
  )
}

