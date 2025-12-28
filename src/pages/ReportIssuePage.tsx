import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'
import { Header } from '../components/Header'
import { updateSEO } from '../utils/seo'

export function ReportIssuePage() {
  const [state, handleSubmit] = useForm("mbdjayvd")

  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'Report Issue | Bug Report & Feature Request - Ge\'ez Calc',
      description: 'Report bugs, suggest features, or provide feedback for Ge\'ez Calc - Ethiopian calendar and number converter tools. Help us improve the Ethiopian calendar converter, date converter, and number converter.',
      keywords: 'report bug ethiopian calendar, feedback ethiopian calendar converter, suggest feature geez calc, report issue ethiopian calendar',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/report',
      ogType: 'website',
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:py-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Report an Issue
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Found a bug or have a suggestion? We'd love to hear from you!
            </p>
          </div>

          {/* Report Form */}
          <div className="bg-white rounded border border-gray-200 p-6">
            {state.succeeded ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Thank you!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your report has been submitted. We'll review it and get back to you soon.
                </p>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium transition-colors"
                >
                  Back to Support
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Report
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Brief description of the issue or suggestion"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <ValidationError 
                    prefix="Title" 
                    field="title"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Please provide as much detail as possible. For bugs, include steps to reproduce the issue."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                    required
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    We'll use this to follow up if needed
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded font-medium transition-colors"
                  >
                    {state.submitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                  <Link
                    to="/support"
                    className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 bg-primary-50 rounded border border-primary-200 p-4">
            <h3 className="text-sm font-semibold text-primary-800 mb-2">Tips for reporting bugs:</h3>
            <ul className="text-xs text-primary-700 space-y-1 list-disc list-inside">
              <li>Describe what you expected to happen vs. what actually happened</li>
              <li>Include the browser and device you're using</li>
              <li>If possible, include steps to reproduce the issue</li>
              <li>Screenshots are helpful if you can attach them via email</li>
            </ul>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Support
            </Link>
          </div>
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
    </div>
  )
}

export default ReportIssuePage

