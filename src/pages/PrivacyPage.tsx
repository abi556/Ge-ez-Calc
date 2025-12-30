import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { updateSEO } from '../utils/seo'

export function PrivacyPage() {
  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'Privacy Policy - Ge\'ez Calc - Ethiopian Calendar Converter',
      description: 'Privacy Policy for Ge\'ez Calc. Learn how we protect your privacy with client-side processing, no data collection, and complete user control over your information.',
      keywords: 'geez calc privacy policy, ethiopian calendar privacy, privacy policy ethiopian converter, data protection geez calc',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/privacy',
      ogType: 'website',
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 lg:py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Ge'ez Calc. This Privacy Policy explains how we handle information when you use our Ethiopian calendar, date conversion, and Ge'ez numeral conversion tools. We are committed to protecting your privacy and have designed our platform to process your data entirely within your web browser, ensuring maximum privacy protection.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This policy applies to all users of Ge'ez Calc, regardless of location. By using our services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Privacy-First Approach</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ge'ez Calc operates on a client-side processing model. This means that when you use our tools to convert dates, view calendar information, or convert numbers, all processing occurs entirely within your web browser on your device. We do not receive, collect, store, or transmit your input data to our servers.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">What This Means for You:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Your date conversions, calendar selections, and number inputs remain private on your device</li>
                  <li>We cannot see, access, or store the specific dates or numbers you work with</li>
                  <li>Your data never travels over the internet to our servers</li>
                  <li>You maintain complete control over your information</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Do Not Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Because our tools process data client-side, we do not collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Date Information:</strong> We do not collect the dates you convert, view, or select in our calendar</li>
                <li><strong>Number Data:</strong> We do not collect the Ge'ez numerals or Arabic numbers you input or convert</li>
                <li><strong>Personal Identifiers:</strong> We do not require or collect names, email addresses, phone numbers, or other personal identifiers</li>
                <li><strong>Account Information:</strong> Our services do not require account creation, so we do not collect registration data</li>
                <li><strong>Usage Patterns:</strong> We do not track which specific dates you view, which conversions you perform, or how frequently you use particular features</li>
                <li><strong>Location Data:</strong> We do not collect precise geolocation information beyond what may be inferred from IP addresses for basic analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Information We May Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To operate our website and understand general usage patterns, we may collect limited technical information that does not identify you personally:
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Website Analytics</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  We may use analytics services to understand how our website is used in aggregate. This information may include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Number of visitors to our website</li>
                  <li>Which pages or tools are accessed most frequently</li>
                  <li>General geographic regions (country or city level, not precise location)</li>
                  <li>Browser type and device information</li>
                  <li>Referring websites or search terms</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">
                  This analytics data is aggregated and anonymized. It does not include any information about the specific dates, numbers, or content you work with in our tools.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Server Logs</h3>
                <p className="text-gray-700 leading-relaxed">
                  Like most websites, our servers automatically log certain technical information when you access our site, including IP addresses, timestamps, and browser information. These logs are used for security purposes, troubleshooting, and understanding general website traffic patterns. Logs are typically retained for a limited period and then deleted.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser Storage and Local Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Some of our tools may use your browser's local storage or session storage to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Preferences:</strong> We may store your display preferences, such as selected calendar months or recently viewed dates</li>
                <li><strong>Session Data:</strong> Temporary data may be stored during your browsing session to maintain tool state</li>
                <li><strong>Conversion History:</strong> Some tools may remember recent conversions for your convenience</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">
                All data stored locally remains on your device. We cannot access this information, and it is never transmitted to our servers. You can clear this data at any time through your browser's settings:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Chrome/Edge:</strong> Settings → Privacy and Security → Clear browsing data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Clear Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use cookies and similar technologies for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Essential Functionality:</strong> Cookies necessary for the website to function properly</li>
                <li><strong>Analytics:</strong> Anonymous cookies that help us understand website usage patterns</li>
                <li><strong>Preferences:</strong> Cookies that remember your display or language preferences</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not use cookies for advertising or to track you across other websites. You can control cookies through your browser settings, though disabling certain cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use third-party services to support our website operations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Hosting Services:</strong> Our website is hosted on third-party infrastructure that may collect technical information as part of normal operations</li>
                <li><strong>Content Delivery:</strong> We may use content delivery networks to serve website files efficiently</li>
                <li><strong>Analytics Providers:</strong> We may use analytics services that collect anonymized usage statistics</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These third-party services may have their own privacy policies. We encourage you to review their policies, though they do not have access to the specific data you input into our conversion tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement security measures to protect the technical information we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>HTTPS Encryption:</strong> All data transmission to our website is encrypted using industry-standard SSL/TLS protocols</li>
                <li><strong>Secure Infrastructure:</strong> Our hosting infrastructure follows security best practices</li>
                <li><strong>Limited Data Collection:</strong> By design, we minimize the amount of data we collect, reducing potential security risks</li>
                <li><strong>No User Databases:</strong> Since we don't collect user data, there are no user databases that could be compromised</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, because your input data is processed entirely on your device, the security of that data depends primarily on your device and browser security. We recommend keeping your browser and operating system updated.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have certain privacy rights under applicable laws:
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Access</h3>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to know what personal information we collect. Since we process your data client-side, we do not have access to your input data. For technical information we do collect, you can request details about what information we have.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Deletion</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can request deletion of any technical information we may have collected. Additionally, you can clear locally stored data through your browser settings at any time.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Right to Opt-Out</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can opt out of non-essential cookies through your browser settings. You can also disable JavaScript, though this will prevent our tools from functioning.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Exercising Your Rights</h3>
                <p className="text-gray-700 leading-relaxed">
                  To exercise any of these rights, please contact us through our <Link to="/report" className="text-primary-600 hover:text-primary-700 underline">Report Issues</Link> page. We will respond to your request within a reasonable timeframe as required by applicable law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are designed to be safe for users of all ages, including children. Because we do not collect personal information and do not require account registration, our services comply with children's privacy protection requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>We do not knowingly collect personal information from children under any age</li>
                <li>No registration or account creation is required, eliminating the need for parental consent</li>
                <li>All processing occurs locally on the user's device</li>
                <li>Our educational content can be safely used by students and learners of all ages</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. However, due to our client-side processing model, it is unlikely we would have received such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ge'ez Calc is accessible to users worldwide. This Privacy Policy is designed to comply with major privacy regulations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>GDPR (European Union):</strong> Our client-side processing model minimizes data collection, aligning with GDPR principles of data minimization</li>
                <li><strong>CCPA/CPRA (California):</strong> We do not sell personal information and provide transparency about any technical data we collect</li>
                <li><strong>Other Jurisdictions:</strong> We strive to comply with applicable privacy laws in all jurisdictions where our services are available</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other reasons. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Post a notice on our website if changes are material</li>
                <li>Provide a summary of significant changes when appropriate</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of our services after changes become effective constitutes acceptance of the updated policy. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us through our <Link to="/report" className="text-primary-600 hover:text-primary-700 underline">Report Issues</Link> page.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For privacy-specific inquiries, please include "Privacy Policy Inquiry" in your message so we can route it appropriately.
              </p>
            </section>

            <section className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
              <h3 className="font-semibold text-primary-900 mb-2">Privacy Summary</h3>
              <p className="text-primary-800 mb-2">
                <strong>Your privacy is our priority.</strong> Ge'ez Calc is designed to protect your privacy by processing all your data locally in your browser. We do not collect, store, or transmit your date conversions, number conversions, or calendar selections.
              </p>
              <p className="text-primary-800">
                The limited technical information we may collect is anonymized and used only to understand general website usage patterns. You maintain complete control over your data, and you can clear locally stored information at any time through your browser settings.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPage
