import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { updateSEO } from '../utils/seo'
import bmcButton from '../assets/bmc-button.png'
import kofiButton from '../assets/support_me_on_kofi_beige.png'

export function SupportPage() {
  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'Advertise on Ethiopian Calendar Website | Ge\'ez Calc - Ad Placement & Support',
      description: 'Advertise on Ge\'ez Calc - Reach professionals and businesses working with Ethiopian calendar, dates, and numbers. High visibility ad placement on Ethiopian calendar converter, date converter, and number converter tools. Support Ethiopian calendar website development. Place your ad on Ethiopian calendar website. Publish advertisement on Ethiopian calendar converter.',
      keywords: 'advertise on ethiopian website, ethiopian site to place ad, website to publish my ad, ethiopian calendar advertising, advertise ethiopian calendar site, ethiopian number converter advertising, ge\'ez calc advertising, support ethiopian calendar website, ethiopian calendar ad placement, advertise on ethiopian calendar converter, place ad ethiopian calendar, publish ad ethiopian website, ethiopian calendar ad space',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/support',
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Advertise on Ge\'ez Calc - Ethiopian Calendar Website',
        description: 'Advertise on Ge\'ez Calc to reach professionals and businesses working with Ethiopian calendar, dates, and numbers. High visibility ad placement opportunities.',
        // TODO: Replace with actual domain when purchased - temporary Vercel URL
        url: 'https://ge-ez-calc.vercel.app/support',
        mainEntity: {
          '@type': 'Organization',
          name: "Ge'ez Calc",
          // TODO: Replace with actual domain when purchased - temporary Vercel URL
          url: 'https://ge-ez-calc.vercel.app/',
        },
      },
    })
  }, [])
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)

  // TODO: Replace with actual domain when purchased - temporary Vercel URL
  const currentUrl = 'https://ge-ez-calc.vercel.app/'
  const shareText = "Check out Ge'ez Calc - A practical tool for Ethiopian calendar, dates, and number conversion!"

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedText = encodeURIComponent(shareText)
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=${encodeURIComponent("Check out Ge'ez Calc")}&body=${encodedText}%20${encodedUrl}`,
    }

    if (shareUrls[platform]) {
      // Check if mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      
      if (isMobile) {
        // On mobile, open in same window
        window.location.href = shareUrls[platform]
      } else {
        // On desktop, open in new tab (without size parameters to avoid popup window)
        window.open(shareUrls[platform], '_blank')
      }
    }
    setShowShareMenu(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
      setShowShareMenu(false)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:py-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
  Support
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Help us keep this project free and accessible
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Advertising Section */}
            <div className="bg-white rounded border border-gray-200 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  className="w-8 h-8 text-primary-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" 
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">Advertise with Us</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Reach professionals, companies, and individuals who work with Ethiopian dates, numbers, and calendar systems.
                Our practical tools are used by both Ethiopian and international businesses and individuals. 
                <strong> Advertise on Ethiopian calendar website</strong> and reach your target audience. 
                <strong> Place your ad on Ethiopian calendar converter</strong> and get high visibility. 
                <strong> Publish your advertisement on Ethiopian number converter</strong> to reach businesses working with Ethiopia.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">High visibility on all main pages</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">Reach businesses and professionals working with Ethiopia</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">Flexible pricing and placement options</p>
                </div>
              </div>

              <div className="bg-primary-50 rounded p-4 border border-primary-200 mt-auto flex flex-col" style={{ height: '140px' }}>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-800 mb-2">Interested in advertising?</p>
                  <p className="text-sm text-primary-700 mb-3">
                    Contact us to discuss advertising opportunities and pricing.
                  </p>
                </div>
                <a
                  href="mailto:advertise@geezcalc.com?subject=Advertising Inquiry"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium transition-colors w-fit mt-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </a>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-white rounded border border-gray-200 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  className="w-8 h-8 text-primary-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">Support the Developer</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Love Ge'ez Calc? Help support the development and maintenance of this free project. Every contribution helps!
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">Help keep the project free and accessible</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">Support ongoing development and features</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">Any amount is appreciated</p>
                </div>
              </div>

              <div className="bg-primary-50 rounded p-4 border border-primary-200 mt-auto flex flex-col" style={{ height: '140px' }}>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-800 mb-2">Buy the developer a coffee ☕</p>
                  <p className="text-sm text-primary-700 mb-3">
                    Support the project with a one-time donation.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <a
                    href="https://buymeacoffee.com/geezcalc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-opacity hover:opacity-90"
                  >
                    <img 
                      src={bmcButton} 
                      alt="Buy Me a Coffee" 
                      className="h-10 w-auto"
                    />
                  </a>
                  <a
                    href="https://ko-fi.com/geezcalc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-opacity hover:opacity-90"
                  >
                    <img 
                      src={kofiButton} 
                      alt="Support me on Ko-fi" 
                      className="h-10 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white rounded border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Other Ways to Support</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Share with Others</p>
                <p className="text-xs text-gray-500 mb-3">
                  Tell your friends and family about Ge'ez Calc. Word of mouth helps us grow!
                </p>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  {showShareMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowShareMenu(false)}
                      />
                      <div className="absolute left-0 top-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-20 p-4">
                        <div className="flex flex-wrap gap-4 items-center justify-center mb-3">
                          <button
                            onClick={() => handleShare('facebook')}
                            className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded transition-colors"
                            title="Share on Facebook"
                          >
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-xs text-gray-700">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded transition-colors"
                            title="Share on X"
                          >
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span className="text-xs text-gray-700">X</span>
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded transition-colors"
                            title="Share on LinkedIn"
                          >
                            <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className="text-xs text-gray-700">LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded transition-colors"
                            title="Share on WhatsApp"
                          >
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            <span className="text-xs text-gray-700">WhatsApp</span>
                          </button>
                          <button
                            onClick={() => handleShare('telegram')}
                            className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded transition-colors"
                            title="Share on Telegram"
                          >
                            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                            </svg>
                            <span className="text-xs text-gray-700">Telegram</span>
                          </button>
                          <button
                            onClick={() => handleShare('email')}
                            className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded transition-colors"
                            title="Share via Email"
                          >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-gray-700">Email</span>
                          </button>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <button
                            onClick={handleCopyLink}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                          >
                            {copyFeedback ? (
                              <>
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm font-medium text-green-600">Link Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium">Copy Link</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Report Issues</p>
                <p className="text-xs text-gray-500 mb-3">
                  Found a bug or have a suggestion? Let us know so we can improve. You can also report an issue here.
                </p>
                <Link
                  to="/report"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Report Issue
                </Link>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default SupportPage
