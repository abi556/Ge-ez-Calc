import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { updateSEO } from '../utils/seo'

export function AboutPage() {
  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'About Ge\'ez Calc - Ethiopian Calendar, Date & Number Converter',
      description: 'Learn about Ge\'ez Calc - a comprehensive platform for Ethiopian calendar conversion, date conversion, and Ge\'ez number conversion. Our mission, vision, values, and services for Ethiopian and international users.',
      keywords: 'about geez calc, ethiopian calendar about, ethiopian date converter about, geez number converter about, ethiopian calendar mission, ethiopian calendar services',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/about',
      ogType: 'website',
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 lg:py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">About Ge'ez Calc</h1>
          <p className="text-gray-600 mb-8">Your trusted platform for Ethiopian calendar, date, and number conversions</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ge'ez Calc is a comprehensive digital platform designed to bridge the gap between the Ethiopian calendar system and the Gregorian calendar, while providing essential tools for working with Ge'ez numerals. We serve as a practical resource for individuals, businesses, and organizations that need accurate and reliable Ethiopian calendar conversions, date translations, and number system conversions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our platform is built with precision and cultural respect, ensuring that users can seamlessly navigate between different calendar systems and number formats while maintaining accuracy and authenticity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ethiopian Calendar</h3>
                <p className="text-gray-700 leading-relaxed">
                  A fully interactive Ethiopian calendar with holiday and observance indicators. View dates in both Ethiopian and Gregorian formats, navigate through months and years, and access comprehensive information about Ethiopian holidays and cultural observances.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Date Converter</h3>
                <p className="text-gray-700 leading-relaxed">
                  Convert dates seamlessly between the Ethiopian calendar and the Gregorian calendar. Our converter handles all date ranges with precision, making it ideal for business planning, academic research, and personal use.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Number Converter</h3>
                <p className="text-gray-700 leading-relaxed">
                  Convert between Ge'ez numerals and Arabic numerals with ease. Our converter supports the complete Ge'ez numeral system, including prefix multipliers, making it essential for working with traditional Ethiopian numbering.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Educational Resources</h3>
                <p className="text-gray-700 leading-relaxed">
                  Access comprehensive learning materials about the Ethiopian calendar system, Ge'ez numerals, and Ethiopian cultural practices. Our educational content helps users understand the historical and cultural significance of these systems.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To provide accurate, reliable, and accessible tools for Ethiopian calendar and number system conversions, empowering individuals and organizations worldwide to work seamlessly with Ethiopian dates and numerals.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We aim to preserve and promote the rich cultural heritage of the Ethiopian calendar system while making it practical and accessible for modern use in business, education, and daily life.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To become the leading global platform for Ethiopian calendar and number system conversions, recognized for accuracy, cultural authenticity, and user-friendly design.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where working with Ethiopian dates and numerals is as straightforward as working with any other calendar system, breaking down barriers for international collaboration and cultural exchange.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Accuracy</h3>
                <p className="text-gray-700 leading-relaxed">
                  We prioritize precision in all conversions and calculations, ensuring users can trust our tools for critical applications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Cultural Respect</h3>
                <p className="text-gray-700 leading-relaxed">
                  We honor the cultural and historical significance of the Ethiopian calendar and Ge'ez numeral systems, presenting them with authenticity and respect.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Accessibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe these tools should be available to everyone, regardless of technical expertise or location, free of charge.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Privacy</h3>
                <p className="text-gray-700 leading-relaxed">
                  We respect user privacy by operating entirely client-side, ensuring that all conversions and calculations happen locally without data collection or transmission.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  We continuously improve our platform, incorporating user feedback and advancing technology to provide the best possible experience.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who Uses Ge'ez Calc</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Businesses</h3>
                <p className="text-gray-700 text-sm">
                  Ethiopian and international companies working with Ethiopian dates for planning, scheduling, and documentation.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Individuals</h3>
                <p className="text-gray-700 text-sm">
                  People managing personal events, birthdays, and important dates in the Ethiopian calendar system.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Academics & Researchers</h3>
                <p className="text-gray-700 text-sm">
                  Scholars and students studying Ethiopian history, culture, and calendar systems.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Developers</h3>
                <p className="text-gray-700 text-sm">
                  Software developers building applications that require Ethiopian calendar and number conversions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage

