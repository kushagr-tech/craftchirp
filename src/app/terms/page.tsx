import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Collector Agreement | Craftchirp Gallery',
  description: 'Terms governing the acquisition of 1-of-1 original artworks, timed checkout holds, intellectual property rights, and international commerce with Craftchirp.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            Legal Framework
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Terms of Service & Collector Agreement
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Effective Date: November 1, 2026 • Governs sales of original folk paintings, handmade jewellery, and collector services on Craftchirp.
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white p-8 sm:p-10 rounded-xs border border-brand-sand space-y-10 font-sans text-xs sm:text-sm leading-relaxed text-gray-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              1. 1-of-1 Originality and Inventory Finality
            </h3>
            <p>
              Unless explicitly specified as a limited edition or handmade jewellery, each painting exhibited on Craftchirp is a <strong>one-of-a-kind, unique original work</strong> created by Rachana Agarwal. Because each piece is physically singular:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Atomic Reservation Engine:</strong> Initiating checkout places an exclusive temporary hold of 15 minutes on the artwork. If payment is not completed within this window, the lock automatically expires and the artwork returns to general availability.</li>
              <li><strong>Zero Overselling Guarantee:</strong> Once a transaction successfully clears payment authorization, the item is marked as <em>SOLD</em> in real-time, preventing concurrent acquisitions.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              2. Fixed Multi-Currency Pricing
            </h3>
            <p>
              To provide collectors with predictability, prices in USD ($), EUR (€), GBP (£), and INR (₹) are fixed directly by the artist rather than subjected to volatile real-time foreign exchange algorithms. The price displayed in your chosen currency during checkout is the final product amount charged.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              3. Customs, Duties & Landed Costs
            </h3>
            <p>
              International cross-border shipments of artwork are subject to customs clearance regulations of the destination country:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Delivered Duty Paid (DDP):</strong> For supported destinations (including US, European Union, UK), estimated duties, statutory import VAT (including EU 2026/382 €3 interim duty & IOSS), and courier clearance fees are pre-calculated and charged at checkout. Craftchirp disburses these sums directly to the carrier/customs broker.</li>
              <li><strong>Delivered At Place (DAP):</strong> In destinations where pre-clearance is not legally supported, the buyer remains responsible for any local import assessments levied by the destination customs authority.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              4. Intellectual Property & Copyright
            </h3>
            <p>
              Acquiring a Craftchirp painting conveys ownership of the physical object and physical Certificate of Authenticity. 
            </p>
            <p className="bg-brand-sand/20 p-4 border border-brand-sand/50 rounded-xs">
              <strong>All underlying copyrights, moral rights, and reproduction rights</strong>—including the right to photograph, license, print, or reproduce the artwork for promotional, digital, or commercial purposes—remain strictly with Rachana Agarwal and Craftchirp. The collector may not create unauthorized photographic reproductions or commercial derivative works without prior written consent.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              5. Shipping, Packaging & Transit Risk
            </h3>
            <p>
              Craftchirp assumes full transit insurance until delivery confirmation at the address provided by the collector. In the event of catastrophic transit loss or structural physical damage verified within 48 hours of receipt, Craftchirp will provide either a full refund or an equivalent commissioned replacement piece.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              6. Governing Law & Dispute Resolution
            </h3>
            <p>
              These terms are governed by the laws of India, under the jurisdiction of the courts of Maharashtra, India, without prejudice to mandatory consumer protection laws applicable in the collector’s country of habitual residence. In the event of any disagreement, parties agree to first seek amicable resolution through good-faith mediation.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

