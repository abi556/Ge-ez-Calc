import { useState } from 'react'
import { ContentBlock as ContentBlockType } from '../utils/learnContent'
import { CheckIcon, ClipboardIcon } from './Icons'
import { TimeConverterWidget } from './TimeConverterWidget'

interface ContentBlockProps {
  block: ContentBlockType
}

export function ContentBlock({ block }: ContentBlockProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-sm text-gray-600 leading-relaxed">
          {block.data.text}
        </p>
      )

    case 'heading':
      return (
        <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">
          {block.data.text}
        </h4>
      )

    case 'list':
      return (
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 ml-2">
          {block.data.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-gray-50">
              <tr>
                {block.data.headers.map((header: string, i: number) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {block.data.rows.map((row: string[], i: number) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell: string, j: number) => (
                    <td
                      key={j}
                      className="px-4 py-3 text-sm text-gray-600"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'example':
      return <ExampleBlock text={block.data.text} />

    case 'key-points':
      return (
        <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg my-4">
          <h5 className="font-semibold text-primary-800 mb-2">Key Points</h5>
          <ul className="space-y-1 text-sm text-primary-700">
            {block.data.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'interactive':
      if (block.data.type === 'time-converter') {
        return <TimeConverterWidget className="my-4" />
      }
      return null

    default:
      return null
  }
}

// Example Block with Copy Functionality
function ExampleBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4 my-4 relative">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Example
        </p>
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-primary-600 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded transition-colors flex items-center gap-1"
          title="Copy example"
        >
          {copied ? (
            <>
              <CheckIcon size={12} /> Copied
            </>
          ) : (
            <>
              <ClipboardIcon size={12} /> Copy
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-gray-800">{text}</p>
    </div>
  )
}

