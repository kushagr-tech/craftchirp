import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, AlertCircle, CheckCircle2, Clock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '14-Day Collector Return Policy & Transit Guarantee | Craftchirp Gallery',
  description: 'Learn about our 14-day collector return policy, transit damage insurance protection, and museum-grade return procedures for 1-of-1 original artworks.',
};

const FAQ_ITEMS = [
  {
    question: 'What is the return window for original artworks?',
    answer:
      'We offer a 14-day approval window starting from the documented date and time of carrier delivery. If an artwork does not harmonize with your interior or collector expectations, you may initiate a return within this period.',
  },
  {
    question: 'What condition must the artwork be in for a full refund?',
    answer:
      'The artwork must be in its original, unaltered condition, free of scratches, surface abrasion, moisture damage, or unauthorized reframing. The original signed physical Certificate of Authenticity and all protective packaging materials must be returned intact.',
  },
  {
    question: 'Who covers return shipping fees and international insurance?',
    answer:
      'For returns based on personal preference or aesthetic reconsideration, the collector is responsible for the cost of insured express air return freight back to our Maharashtra studio. In the rare event an item arrives damaged in transit, Craftchirp covers 100% of return shipping or provides an immediate full refund under our transit insurance guarantee.',
  },
  {
    question: 'Are custom commissions or bespoke sizes eligible for return?',
    answer:
      'Bespoke commissions customized to personal dimensions or specific ceremonial themes are hand-crafted specifically for individual patrons and cannot be returned once approved and dispatched. Rachana provides detailed intermediate photo milestones during creation to ensure complete satisfaction prior to shipping.',
  },
  {
    question: 'What should I do if the parcel appears damaged upon arrival?',
    answer:
      'Inspect the outer crate immediately before signing. If you observe crushing, tears, or puncturing, photograph the outer packaging, open the crate in the presence of the courier if feasible, and contact us at support@craftchirp.com within 48 hours with high-resolution photos of the crate and artwork. All consignments are fully insured.',
  },
];

export default function ReturnsPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            Collector Assurance & Peace of Mind
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            14-Day Return Policy & Transit Guarantee
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Acquiring 1-of-1 original folk art across oceans requires complete trust. We guarantee authentic craftsmanship, safe transit, and a transparent return policy.
          </p>
        </header>

        {/* 3 Core Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <Clock size={24} className="text-brand-clay mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              14-Day Trial Period
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Experience the artwork on your wall in natural light for up to 14 days post-delivery.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <ShieldCheck size={24} className="text-brand-terracotta mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              100% Transit Insurance
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Full valuation coverage from our studio door to your living room. Zero financial risk from courier mishandling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <RotateCcw size={24} className="text-brand-olive mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              Prompt Reimbursement
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Refunds are initiated to your original payment method within 4 business days of studio verification.
            </p>
          </div>
        </div>

        {/* Step-by-Step Return Flow */}
        <section className="bg-white p-8 sm:p-10 rounded-xs border border-brand-sand mb-16 space-y-8 font-sans">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            How to Initiate an International Return
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <span className="w-6 h-6 rounded-full bg-brand-clay text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-[#2d2a26]">
                  Notify Our Curatorial Office
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Email <a href="mailto:support@craftchirp.com" className="text-brand-clay underline font-medium">support@craftchirp.com</a> with your Order ID, photograph of the artwork on your wall, and the reason for return within 14 calendar days of delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="w-6 h-6 rounded-full bg-brand-clay text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-[#2d2a26]">
                  Receive Return Merchandise Authorization (RMA) & Packing Protocol
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We issue a formal RMA number and provide explicit instructions for re-packing the artwork using the original acid-free glassine, corner guards, and 5-ply honeycomb carton to prevent damage during return air transit.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="w-6 h-6 rounded-full bg-brand-clay text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-[#2d2a26]">
                  Insured Courier Dispatch
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ship the consignment via a trackable express carrier (DHL, FedEx, or UPS) with full insurance coverage. Provide our studio with the tracking number within 7 days of RMA issuance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="w-6 h-6 rounded-full bg-brand-clay text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                4
              </span>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-[#2d2a26]">
                  Condition Inspection & Full Refund
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Upon arrival at our studio, Rachana Agarwal personally inspects the piece and Certificate of Authenticity. Once verified in original condition, your full payment (excluding original outbound express shipping) is immediately credited to your account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transit Damage Advisory */}
        <section className="bg-brand-sand/25 p-8 rounded-xs border border-brand-sand mb-16 space-y-4">
          <div className="flex items-center space-x-3 text-brand-clay">
            <AlertCircle size={22} />
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              Transit Damage Claims Protocol (Zero-Deductible Guarantee)
            </h3>
          </div>
          <p className="text-xs text-gray-600 font-sans leading-relaxed">
            All shipments travel under full commercial cargo insurance. If an artwork suffers physical damage during transit:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs text-gray-700 font-sans">
            <li>Take at least 4 clear photos of the damaged shipping box and the damaged area of the artwork immediately upon opening.</li>
            <li>Send the photos and your order number to <a href="mailto:claims@craftchirp.com" className="text-brand-clay underline font-medium">claims@craftchirp.com</a> within 48 hours.</li>
            <li>We file the carrier claim directly. You are not required to participate in bureaucratic carrier arbitration.</li>
            <li>You may elect either a 100% immediate full refund or a complimentary bespoke commission by Rachana of equivalent value.</li>
          </ul>
        </section>

        {/* FAQ Accordion */}
        <section className="mb-16 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            Returns & Exchanges FAQ
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white p-5 rounded-xs border border-brand-sand/60 open:border-brand-clay/50 transition-colors"
              >
                <summary className="font-serif font-bold text-sm sm:text-base text-[#2d2a26] cursor-pointer list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-brand-clay text-lg group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed border-t border-brand-sand/30 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

