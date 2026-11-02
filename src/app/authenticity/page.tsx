import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, Feather, Sparkles, FileText, Lock } from 'lucide-react';
import { RACHANA_AGARWAL } from '@/data/catalogue';

export const metadata: Metadata = {
  title: 'Certificate & Authenticity Guarantee | Craftchirp Gallery',
  description: 'How Craftchirp verifies and guarantees the 1-of-1 originality of every folk painting by Rachana Agarwal. Physical Certificate of Authenticity with cryptographic serial numbers.',
};

export default function AuthenticityPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            1-of-1 Provenance Standard
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Authenticity Guarantee & Certificate of Provenance
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Every artwork originating from Craftchirp is a singular, irreversible act of creation by solo artist Rachana Agarwal. No factory reproductions, no synthetic canvas prints.
          </p>
        </header>

        {/* The 4 Authenticity Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-xs border border-brand-sand/70 shadow-xs">
            <Award size={26} className="text-brand-clay mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-2">
              Physical Signed Certificate (COA)
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Every acquisition is accompanied by an archival cotton parchment Certificate of Authenticity hand-signed by Rachana Agarwal, bearing a serialized registration code and cryptographic SHA-256 verification hash.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xs border border-brand-sand/70 shadow-xs">
            <Sparkles size={26} className="text-brand-terracotta mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-2">
              Natural Cow-Dung & Mud Base
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              We never use artificial chemical acrylic primers or pre-printed vinyl wraps. Our grounds are compounded from triple-purified cow-dung slurry and riverbed mud, sun-cured over 7 days until completely odorless and bacteria-free.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xs border border-brand-sand/70 shadow-xs">
            <Feather size={26} className="text-brand-olive mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-2">
              Single-Reed Hand Brushwork
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Drawn using sharpened bamboo twigs and reed styluses using rice flour paste, lampblack soot, and mineral iron oxide slip. Every minute relief stroke bears the natural organic micro-variations of human touch.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xs border border-brand-sand/70 shadow-xs">
            <Lock size={26} className="text-brand-clay mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-2">
              Permanent Studio Registry
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              All sold artworks are permanently recorded in the Craftchirp master ledger with collector provenance, preventing secondary market counterfeit proliferation and safeguarding collector equity over time.
            </p>
          </div>
        </div>

        {/* Certificate Anatomy Breakdown */}
        <section className="bg-brand-sand/25 p-8 sm:p-10 rounded-xs border border-brand-sand mb-16 space-y-8 font-sans">
          <div className="flex items-center space-x-3 text-brand-clay pb-3 border-b border-brand-sand/60">
            <FileText size={22} />
            <h2 className="font-serif text-2xl font-bold text-[#2d2a26]">
              Anatomy of a Craftchirp Certificate of Authenticity
            </h2>
          </div>

          <p className="text-xs text-gray-700 leading-relaxed">
            Included inside the protective waterproof envelope of every shipment, your physical Certificate includes the following verifiable attributes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle2 size={15} className="text-brand-clay flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Unique Serial Identification:</strong> Formatted as <code className="bg-white px-1.5 py-0.5 rounded-xs border border-brand-sand font-mono text-[11px]">COA-CC-YYYY-XXXXX</code> matching the underside of the MDF board.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 size={15} className="text-brand-clay flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Original Wet Signature:</strong> Hand-signed in archival ink by Rachana Agarwal alongside her personal artist seal.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 size={15} className="text-brand-clay flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Exact Dimensional Ledger:</strong> Caliper measurements in both metric (cm) and imperial (inches), plus net weight in grams.
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle2 size={15} className="text-brand-clay flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Pigment & Binder Audit:</strong> Explicit disclosure of all natural compounds utilized (e.g. rice flour paste, acacia gum, riverbed clay, organic beeswax).
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 size={15} className="text-brand-clay flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cryptographic Integrity Hash:</strong> SHA-256 digest linking artwork specifications, date of creation, and first acquisition record.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 size={15} className="text-brand-clay flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Legal Provenance Clause:</strong> Formal attestation that the piece was executed exclusively by the artist and will never be mechanically duplicated.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Link to Collector Discovery */}
        <div className="text-center pt-8">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3.5 bg-brand-clay text-white hover:bg-brand-terracotta transition-colors text-xs uppercase tracking-widest font-semibold rounded-xs shadow-sm"
          >
            Explore Authenticated Original Works
          </Link>
        </div>

      </div>
    </div>
  );
}

