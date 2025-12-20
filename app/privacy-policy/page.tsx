import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AEA Technology, Inc. privacy policy and how we handle personal data.",
}

export const revalidate = 3600 // Revalidate every hour

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            AEA Technology, Inc. respects your privacy and is committed to protecting it, along with your personal data,
            in every way possible. This privacy notice informs you on how we look after your personally identifiable
            information when you visit our website (regardless of from where you are browsing it) and tells you about your
            privacy rights and how the law will protect you.
          </p>
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-100">Last Updated:</strong> This policy is effective as of the date you access this website.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 sm:space-y-16">
          {/* Section 1 */}
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 border-b-2 border-primary/20">
              1. Important Information and Who We Are
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-6">Purpose of This Privacy Notice</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  This privacy policy aims to provide you with information on how AEA Technology, Inc. collects and processes
                  your personally identifiable information through your use of this website, including data you may provide
                  through this website when you sign up to our newsletter, avail offers on this website, purchase a product or
                  service or partake in a competition.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  This website is not intended for children, and we do not knowingly collect data concerning children.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  It is vital that you read this privacy policy along with any other privacy notice or processing notice we may
                  provide on some occasions when we may be collecting or processing personal information about you so that you
                  are well aware of how and why we may use your information. This privacy notice also supplements the other
                  notices and is not made to override them.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-6">Controller</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  This privacy notice is issued on behalf of AEA Technology, Inc. so when we mention &quot;AEA Technology,
                  Inc.,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; in this policy, we are referring to AEA
                  Technology, Inc.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  We also have a Data Privacy Department accountable for overseeing questions regarding this privacy notice. If
                  you have any questions about this privacy policy, including requests to exercise your legal rights, please
                  contact us through our <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link> or email us at <a href="mailto:SALES@AEATECHNOLOGY.COM" className="text-primary hover:underline font-medium">SALES@AEATECHNOLOGY.COM</a>.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  It is crucial that the personal information we collect about you is accurate and updated so that we continue
                  to provide you with better products and services. Please inform us if your personally identifiable
                  information changes during your business with us.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-6">Third-Party Links</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  This website may contain links to third-party websites, applications, and plug-ins. Clicking on those links
                  or allowing those connections may enable third parties to collect and/or share your data. AEA Technology, Inc.
                  does not control any third-party website and is not responsible for their privacy policies. When you leave our
                  website, we recommend you reading the privacy notice of every website you visit.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 border-b-2 border-primary/20">
              2. The Data We Collect About You
            </h2>
            
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Personal data or personally identifiable information means any information about an individual from which
                they can be identified. We may gather, store, use, and transfer different kinds of personal information, which
                we have grouped together as follows:
              </p>
              
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Identity Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to first name, middle name, last name, username,
                      marital status, title, date of birth, and gender.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Contact Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to delivery address, email address, billing
                      address, and telephone numbers.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Financial Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to bank account and card details.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Transaction Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to details regarding payments to and from you
                      and other details of products and services that you have purchased from us.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Technical Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to internet protocol (IP) address, login data,
                      browser type and version, browser plug-in types and versions, time zone setting and location, operating
                      system and platform and other technology on the devices you use to browse this website.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Profile Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to your username and password, purchases or orders
                      initiated by you, your interests, preferences, reviews, feedback and survey responses.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Usage Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to information about how you use our website,
                      products, and services.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground text-base sm:text-lg font-semibold block mb-1">Marketing and Communications Data</strong>
                    <span className="text-muted-foreground text-sm sm:text-base">includes but is not limited to your email address,
                      interests, and subscription preferences.</span>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 p-4 sm:p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-2">
                  We may also collect, use, and share Aggregated Data, such as statistical or demographic data, for any purpose.
                  However, we do not collect any Special Categories of Personal Data about the visitors of this website. This
                  includes details about your race or ethnicity, sex life, religious or philosophical beliefs, sexual
                  orientation, political opinions, information about your health and genetic and biometric data, and trade union
                  membership. Nor do we collect any data about criminal convictions and offences.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-6">If You Fail to Provide Personal Data</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Where we are required to collect personally identifiable information by law or under the terms of a contract
                  we share with you and you fail to give that data when requested, we may not be able to fulfill the contract we
                  have with you or are trying to enter into with you.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 border-b-2 border-primary/20">
              3. How Is Your Personal Data Collected?
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              We use different ways to collect data from and about the visitors of this website including through:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground text-base sm:text-lg font-semibold">Direct interactions.</strong>
                  <span className="text-muted-foreground text-sm sm:text-base block mt-1"> You may provide us with your Identity, Contact and Financial Data by
                    filling out the forms provided to you through this website or by corresponding with us by post, phone, email
                    or otherwise.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground text-base sm:text-lg font-semibold">Automated technologies or interactions.</strong>
                  <span className="text-muted-foreground text-sm sm:text-base block mt-1"> As you interact with this website, we may
                    automatically gather Technical Data about your device, browsing actions, and patterns through cookies,
                    server logs and other similar technologies.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground text-base sm:text-lg font-semibold">Third parties or publicly available sources.</strong>
                  <span className="text-muted-foreground text-sm sm:text-base block mt-1"> We may get personal data related to you from
                    various third parties and public sources.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 border-b-2 border-primary/20">
              4. How We Use Your Personal Data
            </h2>
            
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We only use your personal information when the law allows us. Most commonly, we use it in the following circumstances:
              </p>
              
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">Where we need to fulfill the contract we are about to enter into or have already entered into with you.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">Where it is required for our legitimate interests (or those of a third party) and your interests and when
                    fundamental rights and freedoms do not override those interests.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground text-sm sm:text-base">Where we need to comply with a regulatory or legal obligation.</span>
                </li>
              </ul>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-6">Purposes for Which We Will Use Your Personal Data</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Provide, maintain and improve our products and services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Deliver the products and services you request through this website, process transactions and payment and
                      send you related information, including confirmations and invoices.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Resolve technical issues and send technical notices, updates, alerts and support messages.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Respond to your comments, reviews, questions and requests, and offer customer service.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Communicate with you about new products, services, offers, marketing material, surveys, contests, rewards
                      and events.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Monitor and analyze trends and activities in connection with our products and services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Personalize and improve our products and services, and promote content or features that match interests.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm sm:text-base">Perform any other purpose for which the information was collected.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 border-b-2 border-primary/20">
              5. Disclosures of Your Personal Data
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We may have to share your personal data with our business partners or third parties for the purposes mentioned
              above. We require all third parties to respect the privacy of your personal data and to treat it in accordance
              with the law.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 pb-3 border-b-2 border-primary/20">
              6. Your Legal Rights
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Under certain circumstances, you hold rights under data protection laws concerning your personal data. You have the right to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm sm:text-base">Request access to your personal information.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm sm:text-base">Request correction of the personal data that we have of you.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm sm:text-base">Request erasure of your personal information, in certain circumstances.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm sm:text-base">Object to processing of your personal information, in certain circumstances.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm sm:text-base">Withdraw consent at any time where we are depending on consent to process your personal information.</span>
              </li>
            </ul>
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Questions About Your Privacy?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about this privacy policy or wish to exercise your rights, please don't hesitate to contact us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-base sm:text-lg"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}


