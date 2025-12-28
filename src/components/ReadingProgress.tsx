import { useState, useEffect } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const scrolled = scrollTop / scrollableHeight
      setProgress(Math.min(100, Math.max(0, scrolled * 100)))
    }

    window.addEventListener('scroll', updateProgress)
    window.addEventListener('resize', updateProgress)
    updateProgress() // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  if (progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-primary-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

