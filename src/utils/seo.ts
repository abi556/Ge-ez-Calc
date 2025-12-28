/**
 * SEO Utility Functions
 * Handles dynamic meta tags, structured data, and SEO optimization
 */

export interface SEOData {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  structuredData?: object
}

/**
 * Update page meta tags for SEO
 */
export function updateSEO(data: SEOData) {
  const { title, description, keywords, canonicalUrl, ogImage, ogType = 'website', structuredData } = data

  // Default preview image if not provided
  // TODO: Replace with actual domain when purchased - temporary Vercel URL
  const defaultPreviewImage = 'https://ge-ez-calc.vercel.app/Ge-ezcalc-preview.png'
  const previewImage = ogImage || defaultPreviewImage

  // Update document title
  document.title = title

  // Update or create meta description
  updateMetaTag('name', 'description', description)
  
  // Update keywords if provided
  if (keywords) {
    updateMetaTag('name', 'keywords', keywords)
  }

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', title)
  updateMetaTag('property', 'og:description', description)
  updateMetaTag('property', 'og:type', ogType)
  updateMetaTag('property', 'og:image', previewImage)
  updateMetaTag('property', 'og:image:alt', 'Ge\'ez Calc - Ethiopian Calendar Converter')

  // Update Twitter Card tags
  updateMetaTag('property', 'twitter:title', title)
  updateMetaTag('property', 'twitter:description', description)
  updateMetaTag('property', 'twitter:image', previewImage)
  updateMetaTag('property', 'twitter:image:alt', 'Ge\'ez Calc - Ethiopian Calendar Converter')

  // Update canonical URL
  if (canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }

  // Add structured data (JSON-LD)
  if (structuredData) {
    addStructuredData(structuredData)
  }
}

/**
 * Helper to update or create meta tags
 */
function updateMetaTag(attribute: 'name' | 'property', name: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

/**
 * Add JSON-LD structured data
 */
function addStructuredData(data: object) {
  // Remove existing structured data script
  const existing = document.querySelector('script[type="application/ld+json"]')
  if (existing) {
    existing.remove()
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * Generate structured data for WebSite
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Ge'ez Calc",
    // TODO: Replace with actual domain when purchased - temporary Vercel URL
    url: 'https://ge-ez-calc.vercel.app/',
    description: 'Free Ethiopian calendar converter, Ge\'ez numeral converter, and date converter. Learn about Ethiopian calendar, numbers, and timekeeping system.',
    potentialAction: {
      '@type': 'SearchAction',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      target: 'https://ge-ez-calc.vercel.app/learn?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate structured data for SoftwareApplication
 */
export function generateSoftwareApplicationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: "Ge'ez Calc",
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online tools for Ethiopian calendar conversion, Ge\'ez numeral conversion, and date conversion. Learn about Ethiopian calendar, numbers, holidays, and timekeeping system.',
    featureList: [
      'Ethiopian Calendar Converter',
      'Ge\'ez Numeral Converter',
      'Date Converter (Ethiopian to Gregorian)',
      'Number Converter (Arabic to Ge\'ez)',
      'Ethiopian Holidays Calendar',
      'Learn Hub - Educational Content',
    ],
  }
}

/**
 * Generate structured data for Organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Ge'ez Calc",
    // TODO: Replace with actual domain when purchased - temporary Vercel URL
    url: 'https://ge-ez-calc.vercel.app/',
    // TODO: Replace with actual domain when purchased - temporary Vercel URL
    logo: 'https://ge-ez-calc.vercel.app/ge-ez.png',
    description: 'Free Ethiopian calendar and numeral conversion tools',
    sameAs: [],
  }
}

