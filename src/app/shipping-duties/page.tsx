import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, ShieldCheck, Globe, CheckCircle2, AlertCircle, Box, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Global Shipping, Customs & Duties Policy | Craftchirp Gallery',
  description: 'Complete guide to international express shipping, custom protective crating for MDF art, and transparent Delivered Duty Paid (DDP) calculations for US, EU & UK collectors.',
};

const FAQ_ITEMS = [
  {
    question: 'How do you calculate duties, taxes, and import VAT?',
    answer:
      'We use a transparent Landed-Cost Engine configured for US, European Union, and UK customs jurisdictions. Where DDP (Delivered Duty Paid) is supported, all destination customs duties and statutory VAT are collected during checkout, meaning your package clears customs seamlessly with zero unexpected door charges.',
  },
  {
    question: 'What is the EU 2026 Customs Reform (€3 interim duty)?',
    answer:
      'Under Council Regulation (EU) 2026/382 effective 1 July 2026, the European Union has abolished the €150 duty-free exemption for e-commerce consignments entering from third countries. For qualifying art and handmade shipments valued under €150, a simplified flat interim customs duty of €3.00 per item is assessed alongside standard member-state import VAT collected via the Import One-Stop Shop (IOSS). For items over €150, standard commercial customs entry procedures apply.',
  },
  {
    question: 'How are shipments to the United States processed after the Section 321 changes?',
    answer:
      'With the suspension of informal Section 321 de minimis clearances for commercial goods from several overseas trade lanes, all commercial packages entering the US require formal or informal electronic customs entry declaration. Original hand-painted works of art are classified under HTS code 9701.21.00 and enter the US at 0% baseline customs duty, subject only to mandatory carrier electronic entry clearance fees.',
  },
  {
    question: 'How is delicate mud and cow-dung art protected during international air transit?',
    answer:
      'Every Craftchirp painting on MDF is packaged according to international museum conservation standards: first wrapped in moisture-barrier acid-free glassine paper, surrounded by 35mm high-density impact-absorbing corner guards, sealed in shock-dampening polyethylene cushioning, and encased within a rigid 5-ply honeycomb carton or reinforced timber crate.',
  },
  {
    question: 'Which carriers handle international delivery?',
    answer:
      'We partner exclusively with premier air freight couriers—DHL Express, FedEx International Priority, and Aramex. Every consignment is insured for 100% of purchase value and includes end-to-end tracked delivery with signature confirmation upon receipt.',
  },
  {
    question: 'What is the standard delivery timeframe?',
    answer:
      'Once an order is confirmed, Rachana Agarwal inspects, authenticates, and prepares custom crating within 2 to 3 business days. Air transit typically takes 5 to 8 business days for North America, 4 to 7 business days for Western Europe and the UK, and 7 to 10 business days for the Asia-Pacific region.',
  },
];

export default function ShippingDutiesPage() {
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
            Collector Logistics & Transparency
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Global Shipping & Landed Customs Policy
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Delivering 1-of-1 original Indian folk paintings and handmade jewellery from our Maharashtra studio to private collections in 40+ countries.
          </p>
        </header>

        {/* 3 Pillars of Global Fulfillment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <Truck size={24} className="text-brand-clay mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              Fully Insured Express
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Dispatched via DHL Express and FedEx International Priority with signature verification and real-time waypoint tracking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <ShieldCheck size={24} className="text-brand-terracotta mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              Delivered Duty Paid (DDP)
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              No surprise customs fees at your doorstep. We pre-calculate and settle duties, VAT, and entry fees where statutory regimes permit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <Box size={24} className="text-brand-olive mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              Rigid MDF Armor Crating
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Custom-built 5-ply honeycomb armor with acid-free glassine moisture wrap and edge shock dampers engineered for delicate mud surfaces.
            </p>
          </div>
        </div>

        {/* Region by Region Customs Rules */}
        <section className="bg-white p-8 sm:p-10 rounded-xs border border-brand-sand mb-16 space-y-8 font-sans">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            Destination Customs & Tax Regimes
          </h2>

          <div className="space-y-6">
            {/* United States */}
            <div className="border-l-2 border-brand-clay pl-5 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-[#2d2a26]">United States (US CBP)</span>
                <span className="text-[10px] uppercase font-semibold text-brand-clay bg-brand-sand/30 px-2 py-0.5 rounded-xs">DDP Available</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>HTS Code 9701.21.00:</strong> Original paintings executed entirely by hand enter the United States at <strong>0% baseline customs duty</strong> under international UNESCO Florence Agreement provisions. Following administrative updates to Section 321 de minimis processing, all commercial cargo carries formal/informal electronic manifest filing. Where applicable, our checkout provides complete DDP clearance covering courier customs processing fees.
              </p>
            </div>

            {/* European Union */}
            <div className="border-l-2 border-brand-terracotta pl-5 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-[#2d2a26]">European Union (EU 27)</span>
                <span className="text-[10px] uppercase font-semibold text-brand-terracotta bg-brand-sand/30 px-2 py-0.5 rounded-xs">IOSS / 2026 Reform Ready</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Under Council Regulation (EU) 2026/382, low-value e-commerce consignments are subject to a simplified €3.00 flat interim duty per item line for parcels up to €150, alongside standard Member State import VAT handled through the Import One-Stop Shop (IOSS). For original artworks above €150, standard commercial customs clearance applies. Craftchirp provides full commercial invoice documentation (HS 9701.21.00) ensuring smooth clearance through European border inspection posts.
              </p>
            </div>

            {/* United Kingdom */}
            <div className="border-l-2 border-brand-olive pl-5 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-[#2d2a26]">United Kingdom (HMRC)</span>
                <span className="text-[10px] uppercase font-semibold text-brand-olive bg-brand-sand/30 px-2 py-0.5 rounded-xs">DDP / VAT Compliant</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                For shipments under £135, UK import VAT (20%) is accounted for at checkout. Original works of art over £135 benefit from the UK reduced effective import VAT rate on original works of art (5%) upon formal HMRC entry declaration.
              </p>
            </div>

            {/* Russia Gated Notice */}
            <div className="border-l-2 border-gray-400 pl-5 space-y-2 bg-gray-50/50 p-3 rounded-r-xs">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-gray-700">Russian Federation (Россия)</span>
                <span className="text-[10px] uppercase font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-xs">Inquiry Only</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct automated e-commerce checkout is currently disabled for delivery addresses in the Russian Federation due to international cross-border payment restrictions and express carrier air-corridor suspensions. Russian collectors are warmly invited to submit private inquiries via our dedicated Russian portal at <Link href="/ru/inquiry" className="text-brand-clay hover:underline">/ru/inquiry</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Packaging Specs Diagram */}
        <section className="bg-brand-sand/25 p-8 rounded-xs border border-brand-sand mb-16 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26]">
            Museum-Grade Packaging Architecture
          </h2>
          <p className="text-xs text-gray-600 font-sans leading-relaxed">
            Our artworks are created on solid, moisture-sealed MDF with fragile, organic mineral reliefs. We have engineered a 4-layer protective barrier designed to withstand atmospheric pressure shifts and humidity changes in cargo holds:
          </p>

          <ol className="space-y-4 text-xs font-sans text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-brand-clay text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong>Non-Abrasive Acid-Free Glassine:</strong> Directly covers the painted cow-dung surface to prevent pigment abrasion without sticking or trapping condensation.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-brand-clay text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong>35mm High-Density Edge & Corner Armor:</strong> Dense polyethylene profiles cushion the rigid corners of the MDF substrate against drop impacts.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-brand-clay text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong>Moisture Barrier Seal:</strong> Vacuum-sealed waterproof outer sleeve protects against monsoonal or transatlantic humidity fluctuations.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-brand-clay text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">4</span>
              <div>
                <strong>5-Ply Heavy-Duty Honeycomb Armor Carton:</strong> Double-walled crush-resistant structural cardboard container tested to withstand 80 kg top-load weight.
              </div>
            </li>
          </ol>
        </section>

        {/* Interactive FAQ Section */}
        <section className="mb-16 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            Frequently Asked Logistics Questions
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

