import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Eye, Lock, Server, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy (GDPR & CCPA Compliant) | Craftchirp Gallery',
  description: 'Our privacy commitment: zero storage of wall visualizer photos, PCI-DSS compliant checkout, and transparent personal data handling under GDPR, UK GDPR & CCPA.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            Trust & Data Stewardship
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Privacy Policy & Data Rights
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Last Updated: November 1, 2026 • Compliant with EU GDPR (Reg. 2016/679), UK Data Protection Act, and California Consumer Privacy Act (CCPA).
          </p>
        </header>

        {/* Highlight Box: Wall Visualizer Zero-Storage Guarantee */}
        <div className="bg-brand-sand/30 border-2 border-brand-clay/30 p-6 sm:p-8 rounded-xs mb-16 space-y-3 font-sans">
          <div className="flex items-center space-x-3 text-brand-clay">
            <Lock size={22} />
            <h2 className="font-serif text-xl font-bold text-[#2d2a26]">
              Our Zero-Storage Wall Visualizer Guarantee
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            When you use our interactive <strong>"See It On Your Wall"</strong> visualizer feature, all images of your living room or sanctuary are processed <strong>strictly within your local device's browser memory</strong> via client-side HTML5 Canvas APIs. 
          </p>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong>Your interior photos are never transmitted, uploaded, analyzed, or stored on Craftchirp servers or third-party cloud infrastructure.</strong> As soon as you close the modal or refresh your browser tab, the session data is permanently cleared from your device's memory.
          </p>
        </div>

        {/* Main Policy Content */}
        <div className="bg-white p-8 sm:p-10 rounded-xs border border-brand-sand space-y-10 font-sans text-xs sm:text-sm leading-relaxed text-gray-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              1. Data Controller Identification
            </h3>
            <p>
              Craftchirp ("we", "our", or "us") operates the virtual gallery and marketplace located at craftchirp.com. The data controller responsible for your personal information under the General Data Protection Regulation (GDPR) is:
            </p>
            <div className="bg-brand-sand/20 p-4 rounded-xs border border-brand-sand/40 space-y-1 text-xs">
              <p><strong>Entity:</strong> Craftchirp Creations (Solo Founder: Rachana Agarwal)</p>
              <p><strong>Studio Location:</strong> Maharashtra, India</p>
              <p><strong>Data Protection Contact:</strong> <a href="mailto:privacy@craftchirp.com" className="text-brand-clay underline">privacy@craftchirp.com</a></p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              2. Information We Collect and Lawful Basis
            </h3>
            <p>
              We process personal data only where necessary to fulfill our contract with you (GDPR Art. 6(1)(b)), comply with international export customs laws (Art. 6(1)(c)), or where you have provided explicit consent (Art. 6(1)(a)):
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Order & Fulfillment Data:</strong> Full name, delivery address, phone number (required by international air carriers such as DHL and FedEx for customs clearance notifications), and email address for order receipts and Certificate of Authenticity delivery.</li>
              <li><strong>Payment Information:</strong> All credit card and electronic transactions are processed directly by PCI-DSS Level 1 certified payment providers (e.g., Stripe, PayPal, Razorpay). Craftchirp never stores or views raw card numbers, CVC codes, or banking credentials.</li>
              <li><strong>Inquiry Data:</strong> Name, contact details, and bespoke requests submitted through our contact forms or gated Russian inquiry portal.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              3. International Customs and Logistics Disclosures
            </h3>
            <p>
              To transport physical artworks across international borders, customs authorities (e.g., US Customs and Border Protection, EU Member State Customs, UK HMRC) require consignee name, destination address, and contact numbers on commercial export manifests and air waybills. We share this information solely with:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Designated international express air carriers (DHL Express, FedEx, Aramex).</li>
              <li>Authorized licensed customs brokers handling import duty and VAT payment reconciliation.</li>
            </ul>
            <p>
              We never sell, rent, monetize, or trade collector contact details to commercial advertising networks or data brokers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              4. Cookies and Local Storage
            </h3>
            <p>
              We use minimal, privacy-preserving client storage:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>Essential Session Storage:</strong> Maintains your cart reservation timer (15-minute checkout hold) and preferred display currency (USD, EUR, GBP, INR).</li>
              <li><strong>Privacy Preference Cookie:</strong> Remembers your consent choice so you are not repeatedly prompted.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              5. Your Statutory Rights (GDPR & CCPA)
            </h3>
            <p>
              Regardless of your geographical location, Craftchirp extends full data subject rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-brand-sand/15 border border-brand-sand/50 rounded-xs">
                <strong className="block text-[#2d2a26] mb-1">Right to Access & Portability</strong>
                Request a complete digital copy of your order and provenance ledger history.
              </div>
              <div className="p-3 bg-brand-sand/15 border border-brand-sand/50 rounded-xs">
                <strong className="block text-[#2d2a26] mb-1">Right to Erasure ("To Be Forgotten")</strong>
                Request deletion of your account or contact data, subject to statutory tax record retention laws.
              </div>
              <div className="p-3 bg-brand-sand/15 border border-brand-sand/50 rounded-xs">
                <strong className="block text-[#2d2a26] mb-1">Right to Rectification</strong>
                Update delivery details or correct typographical errors prior to carrier dispatch.
              </div>
              <div className="p-3 bg-brand-sand/15 border border-brand-sand/50 rounded-xs">
                <strong className="block text-[#2d2a26] mb-1">Right to Opt-Out (CCPA)</strong>
                We do not sell personal information. California consumers have complete protection under CCPA/CPRA.
              </div>
            </div>
            <p className="pt-2">
              To exercise any of these rights, email us at <a href="mailto:privacy@craftchirp.com" className="text-brand-clay underline font-medium">privacy@craftchirp.com</a>. We respond to all verified requests within 30 days without fee.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              6. Data Security and Retention
            </h3>
            <p>
              All traffic between your browser and Craftchirp is encrypted via modern Transport Layer Security (TLS 1.3). Order records and Certificates of Authenticity are maintained securely for tax compliance and secondary-market provenance verification for a period of 7 years, following which non-provenance personal identifiers are permanently scrubbed.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

