import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { updateSEO } from '../utils/seo'

export function TermsPage() {
  // SEO Optimization
  useEffect(() => {
    updateSEO({
      title: 'Terms of Service - Ge\'ez Calc - Ethiopian Calendar Converter',
      description: 'Terms of Service for Ge\'ez Calc. Read our terms and conditions for using Ethiopian calendar, date converter, and number converter tools.',
      keywords: 'geez calc terms of service, ethiopian calendar terms, terms of service ethiopian converter',
      // TODO: Replace with actual domain when purchased - temporary Vercel URL
      canonicalUrl: 'https://ge-ez-calc.vercel.app/terms',
      ogType: 'website',
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 lg:py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Ge'ez Calc regarding your access to and use of our website, tools, and services (collectively, the "Services"). By accessing, browsing, or using any part of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree to these Terms, you must not access or use our Services. Your use of our Services following any changes to these Terms constitutes your acceptance of those changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ge'ez Calc provides free, web-based tools for working with the Ethiopian calendar system and Ge'ez numerals. Our Services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Ethiopian Calendar:</strong> An interactive calendar displaying Ethiopian dates with corresponding Gregorian dates, including holiday and observance indicators</li>
                <li><strong>Date Converter:</strong> Tools for converting dates between the Ethiopian calendar (Ge'ez calendar) and the Gregorian calendar</li>
                <li><strong>Number Converter:</strong> Tools for converting between Ge'ez numerals and Arabic numerals, including support for the complete Ge'ez numeral system</li>
                <li><strong>Educational Resources:</strong> Learning materials and information about the Ethiopian calendar system, Ge'ez numerals, and related cultural topics</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All tools operate entirely within your web browser using client-side processing. No registration, account creation, or payment is required to use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility and Use Restrictions</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Eligibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our Services are available to users worldwide. You must be at least 13 years old to use our Services, or have parental consent if you are under 13. By using our Services, you represent and warrant that you meet these eligibility requirements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Permitted Uses</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You may use our Services for lawful purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Personal date management and calendar planning</li>
                  <li>Educational and academic research</li>
                  <li>Business and professional activities requiring Ethiopian calendar conversions</li>
                  <li>Cultural and linguistic preservation efforts</li>
                  <li>Software development and integration (subject to our intellectual property rights)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Activities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Use our Services for any illegal purpose or in violation of any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our Services, servers, or computer systems</li>
                <li>Interfere with or disrupt the operation of our Services or servers, including through denial-of-service attacks, automated scripts, or excessive requests</li>
                <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of our Services</li>
                <li>Copy, modify, distribute, sell, or lease any part of our Services without our express written permission</li>
                <li>Use automated systems, bots, or scripts to access our Services in a manner that could harm, disable, or overburden our infrastructure</li>
                <li>Remove, obscure, or alter any copyright, trademark, or other proprietary notices on our Services</li>
                <li>Use our Services to create competing products or services</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Collect or harvest information about other users of our Services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Intellectual Property</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  All content, features, functionality, and materials available through our Services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2 ml-4">
                  <li>Website design, layout, user interface, and visual elements</li>
                  <li>Conversion algorithms, formulas, and computational methods</li>
                  <li>Educational content, articles, and learning materials</li>
                  <li>Software code, scripts, and technical implementations</li>
                  <li>Logos, trademarks, service marks, and branding elements</li>
                  <li>Documentation and help materials</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  are owned by Ge'ez Calc or our licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws. You receive no ownership rights in any of these materials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Limited License</h3>
                <p className="text-gray-700 leading-relaxed">
                  We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your personal or internal business purposes in accordance with these Terms. This license does not include the right to reproduce, distribute, modify, create derivative works, publicly display, or commercially exploit our Services or any content therein.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content and Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services process data entirely within your web browser. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Any dates, numbers, or other data you input into our tools remain on your device</li>
                <li>We do not collect, store, or have access to your input data</li>
                <li>You retain all ownership and control over your data</li>
                <li>We do not claim any rights to your data</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You are solely responsible for backing up any data you work with in our Services. We are not responsible for any loss of data that may occur on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability and Modifications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to provide reliable access to our Services, but we do not guarantee that our Services will be available at all times or free from errors. We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Modify, update, or discontinue any aspect of our Services at any time</li>
                <li>Perform maintenance that may temporarily interrupt access to our Services</li>
                <li>Implement usage limits or restrictions to ensure fair access for all users</li>
                <li>Block or restrict access to users who violate these Terms or engage in abusive behavior</li>
                <li>Change, suspend, or discontinue features or functionality without prior notice</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We will not be liable to you or any third party for any modification, suspension, or discontinuation of our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accuracy and Reliability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to provide accurate conversions and information, we cannot guarantee that our Services are error-free or suitable for all purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Date Conversions:</strong> Our date conversion tools use standard algorithms for converting between Ethiopian and Gregorian calendars. For critical dates, especially those with legal, financial, or historical significance, you should verify conversions using multiple sources or consult with experts</li>
                <li><strong>Number Conversions:</strong> Our Ge'ez numeral conversions follow established rules and conventions. For important calculations or official purposes, independent verification is recommended</li>
                <li><strong>Calendar Information:</strong> Holiday and observance information is provided for general reference. Official dates may vary by region or religious authority, and you should consult authoritative sources for official purposes</li>
                <li><strong>Educational Content:</strong> Our educational materials are provided for informational purposes and may not be comprehensive or suitable for all academic or professional contexts</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for verifying the accuracy and suitability of any information obtained through our Services for your specific needs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                <li>Warranties regarding the accuracy, reliability, completeness, or timeliness of information provided through our Services</li>
                <li>Warranties that our Services will be uninterrupted, secure, error-free, or free from viruses or other harmful components</li>
                <li>Warranties that defects will be corrected or that our Services will meet your requirements</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Some jurisdictions do not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GEEZ CALC, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Loss or corruption of data</li>
                <li>Business interruption or loss of goodwill</li>
                <li>Costs of substitute services</li>
                <li>Damages resulting from errors, inaccuracies, or omissions in our Services</li>
                <li>Damages resulting from decisions made based on information from our Services</li>
                <li>Damages resulting from inability to access or use our Services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR IF YOU PAID NOTHING (AS OUR SERVICES ARE FREE), OUR TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Ge'ez Calc, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use of our Services; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) your violation of any applicable laws or regulations. We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, in which case you agree to cooperate with us in asserting any available defenses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Your right to use our Services will immediately cease</li>
                <li>We may delete or disable access to any data stored locally in your browser related to our Services</li>
                <li>All provisions of these Terms that by their nature should survive termination will survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You may stop using our Services at any time. Since our Services do not require account creation, there are no accounts to cancel or delete.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law and Dispute Resolution</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Governing Law</h3>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Ge'ez Calc operates, without regard to its conflict of law provisions. If you are located in a jurisdiction that provides different consumer protection laws, those laws may apply to you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Dispute Resolution</h3>
                <p className="text-gray-700 leading-relaxed">
                  Any disputes arising out of or relating to these Terms or our Services shall be resolved through good faith negotiations. If we cannot resolve a dispute through negotiation, you agree that any legal action or proceeding shall be brought exclusively in the courts of competent jurisdiction. You waive any objection to the venue of such courts.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Update the "Last updated" date at the top of these Terms</li>
                <li>Post a notice on our website if changes are material</li>
                <li>Provide a summary of significant changes when appropriate</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of our Services after changes become effective constitutes your acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable, or if such modification is not possible, severed from these Terms. The validity, legality, and enforceability of the remaining provisions shall not be affected.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Ge'ez Calc regarding your use of our Services and supersede all prior or contemporaneous communications, proposals, and agreements, whether oral or written, between you and Ge'ez Calc.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about these Terms of Service, please contact us through our <Link to="/report" className="text-primary-600 hover:text-primary-700 underline">Report Issues</Link> page. For legal inquiries, please include "Terms of Service Inquiry" in your message.
              </p>
            </section>

            <section className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
              <h3 className="font-semibold text-primary-900 mb-2">Terms Summary</h3>
              <p className="text-primary-800 mb-2">
                <strong>In Summary:</strong> Ge'ez Calc provides free tools for Ethiopian calendar and number conversions. By using our Services, you agree to use them lawfully and understand that we provide them "as is" without warranties. We process your data entirely in your browser, so you maintain control over your information.
              </p>
              <p className="text-primary-800">
                We reserve the right to modify our Services and these Terms. For critical conversions, verify results independently. If you have questions, please contact us through our Report Issues page.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default TermsPage
