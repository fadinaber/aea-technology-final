import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AEA Technology, Inc. privacy policy and how we handle personal data.",
}

export const revalidate = 3600 // Revalidate every hour

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
          AEA Technology, Inc. respects your privacy and is committed to protecting it, along with your personal data,
          in every way possible. This privacy notice informs you on how we look after your personally identifiable
          information when you visit our website (regardless of from where you are browsing it) and tells you about your
          privacy rights and how the law will protect you.
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Important Information and Who We Are</h2>
          
          <h3>Purpose of This Privacy Notice</h3>
          <p>
            This privacy policy aims to provide you with information on how AEA Technology, Inc. collects and processes
            your personally identifiable information through your use of this website, including data you may provide
            through this website when you sign up to our newsletter, avail offers on this website, purchase a product or
            service or partake in a competition.
          </p>
          <p>This website is not intended for children, and we do not knowingly collect data concerning children.</p>
          <p>
            It is vital that you read this privacy policy along with any other privacy notice or processing notice we may
            provide on some occasions when we may be collecting or processing personal information about you so that you
            are well aware of how and why we may use your information. This privacy notice also supplements the other
            notices and is not made to override them.
          </p>

          <h3>Controller</h3>
          <p>
            This privacy notice is issued on behalf of AEA Technology, Inc. so when we mention &quot;AEA Technology,
            Inc.,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; in this policy, we are referring to AEA
            Technology, Inc.
          </p>
          <p>
            We also have a Data Privacy Department accountable for overseeing questions regarding this privacy notice. If
            you have any questions about this privacy policy, including requests to exercise your legal rights, please
            contact us through our <Link href="/contact">Contact page</Link> or email us at <a href="mailto:SALES@AEATECHNOLOGY.COM">SALES@AEATECHNOLOGY.COM</a>.
          </p>
          <p>
            It is crucial that the personal information we collect about you is accurate and updated so that we continue
            to provide you with better products and services. Please inform us if your personally identifiable
            information changes during your business with us.
          </p>

          <h3>Third-Party Links</h3>
          <p>
            This website may contain links to third-party websites, applications, and plug-ins. Clicking on those links
            or allowing those connections may enable third parties to collect and/or share your data. AEA Technology, Inc.
            does not control any third-party website and is not responsible for their privacy policies. When you leave our
            website, we recommend you reading the privacy notice of every website you visit.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            Personal data or personally identifiable information means any information about an individual from which
            they can be identified. We may gather, store, use, and transfer different kinds of personal information, which
            we have grouped together as follows:
          </p>
          <ul>
            <li>
              <strong>Identity Data</strong> includes but is not limited to first name, middle name, last name, username,
              marital status, title, date of birth, and gender.
            </li>
            <li>
              <strong>Contact Data</strong> includes but is not limited to delivery address, email address, billing
              address, and telephone numbers.
            </li>
            <li>
              <strong>Financial Data</strong> includes but is not limited to bank account and card details.
            </li>
            <li>
              <strong>Transaction Data</strong> includes but is not limited to details regarding payments to and from you
              and other details of products and services that you have purchased from us.
            </li>
            <li>
              <strong>Technical Data</strong> includes but is not limited to internet protocol (IP) address, login data,
              browser type and version, browser plug-in types and versions, time zone setting and location, operating
              system and platform and other technology on the devices you use to browse this website.
            </li>
            <li>
              <strong>Profile Data</strong> includes but is not limited to your username and password, purchases or orders
              initiated by you, your interests, preferences, reviews, feedback and survey responses.
            </li>
            <li>
              <strong>Usage Data</strong> includes but is not limited to information about how you use our website,
              products, and services.
            </li>
            <li>
              <strong>Marketing and Communications Data</strong> includes but is not limited to your email address,
              interests, and subscription preferences.
            </li>
          </ul>
          <p>
            We may also collect, use, and share Aggregated Data, such as statistical or demographic data, for any purpose.
            However, we do not collect any Special Categories of Personal Data about the visitors of this website. This
            includes details about your race or ethnicity, sex life, religious or philosophical beliefs, sexual
            orientation, political opinions, information about your health and genetic and biometric data, and trade union
            membership. Nor do we collect any data about criminal convictions and offences.
          </p>

          <h3>If You Fail to Provide Personal Data</h3>
          <p>
            Where we are required to collect personally identifiable information by law or under the terms of a contract
            we share with you and you fail to give that data when requested, we may not be able to fulfill the contract we
            have with you or are trying to enter into with you.
          </p>

          <h2>3. How Is Your Personal Data Collected?</h2>
          <p>We use different ways to collect data from and about the visitors of this website including through:</p>
          <ul>
            <li>
              <strong>Direct interactions.</strong> You may provide us with your Identity, Contact and Financial Data by
              filling out the forms provided to you through this website or by corresponding with us by post, phone, email
              or otherwise.
            </li>
            <li>
              <strong>Automated technologies or interactions.</strong> As you interact with this website, we may
              automatically gather Technical Data about your device, browsing actions, and patterns through cookies,
              server logs and other similar technologies.
            </li>
            <li>
              <strong>Third parties or publicly available sources.</strong> We may get personal data related to you from
              various third parties and public sources.
            </li>
          </ul>

          <h2>4. How We Use Your Personal Data</h2>
          <p>We only use your personal information when the law allows us. Most commonly, we use it in the following circumstances:</p>
          <ul>
            <li>Where we need to fulfill the contract we are about to enter into or have already entered into with you.</li>
            <li>
              Where it is required for our legitimate interests (or those of a third party) and your interests and when
              fundamental rights and freedoms do not override those interests.
            </li>
            <li>Where we need to comply with a regulatory or legal obligation.</li>
          </ul>

          <h3>Purposes for Which We Will Use Your Personal Data</h3>
          <ul>
            <li>Provide, maintain and improve our products and services.</li>
            <li>
              Deliver the products and services you request through this website, process transactions and payment and
              send you related information, including confirmations and invoices.
            </li>
            <li>Resolve technical issues and send technical notices, updates, alerts and support messages.</li>
            <li>Respond to your comments, reviews, questions and requests, and offer customer service.</li>
            <li>
              Communicate with you about new products, services, offers, marketing material, surveys, contests, rewards
              and events.
            </li>
            <li>Monitor and analyze trends and activities in connection with our products and services.</li>
            <li>Personalize and improve our products and services, and promote content or features that match interests.</li>
            <li>Perform any other purpose for which the information was collected.</li>
          </ul>

          <h2>5. Disclosures of Your Personal Data</h2>
          <p>
            We may have to share your personal data with our business partners or third parties for the purposes mentioned
            above. We require all third parties to respect the privacy of your personal data and to treat it in accordance
            with the law.
          </p>

          <h2>6. Your Legal Rights</h2>
          <p>Under certain circumstances, you hold rights under data protection laws concerning your personal data. You have the right to:</p>
          <ul>
            <li>Request access to your personal information.</li>
            <li>Request correction of the personal data that we have of you.</li>
            <li>Request erasure of your personal information, in certain circumstances.</li>
            <li>Object to processing of your personal information, in certain circumstances.</li>
            <li>Withdraw consent at any time where we are depending on consent to process your personal information.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}


