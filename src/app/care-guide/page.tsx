import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sun, Droplets, Wind, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Care & Conservation Guide | Craftchirp Gallery',
  description: 'Detailed conservation and display guidelines for natural cow-dung mud art on MDF and handmade terracotta jewellery. Protect natural earth pigments for generations.',
};

export default function CareGuidePage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            Conservation & Longevity
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Care & Conservation Guide for Organic Mud Art
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Craftchirp artworks are crafted from living, natural materials—purified cow dung, river clay, and mineral pigments. With sensible architectural placement, they remain vibrant for generations.
          </p>
        </header>

        {/* Environmental Guidelines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <Sun size={24} className="text-brand-clay mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              Sunlight & UV Exposure
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Display indoors in gentle, ambient illumination. Avoid uninterrupted direct exposure to harsh tropical midday sun to safeguard natural rice paste and soot pigments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <Droplets size={24} className="text-brand-terracotta mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              Humidity & Moisture
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Ideal room relative humidity is 40% to 60%. Do not mount artwork directly inside humid unventilated bathrooms, above indoor pools, or beside active humidifiers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-brand-sand/70 shadow-xs">
            <Wind size={24} className="text-brand-olive mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">
              HVAC & Heating Vents
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Keep artwork at least 1.5 meters away from forced-air radiator vents or direct cold air drafts to prevent rapid cyclical expansion and contraction of the MDF ground.
            </p>
          </div>
        </div>

        {/* Maintenance Protocol: Do's and Don'ts */}
        <section className="bg-white p-8 sm:p-10 rounded-xs border border-brand-sand mb-16 space-y-8 font-sans">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            Cleaning & Conservation Protocol
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-brand-clay uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Recommended Cleaning Routine</span>
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-brand-clay font-bold">•</span>
                  <span>Dust lightly every 2 to 3 months using a dry, extra-soft natural bristle artist brush (such as goat hair or fan blender brush).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-clay font-bold">•</span>
                  <span>Sweep the brush horizontally in gentle, featherlight motions across the textured relief lines.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-clay font-bold">•</span>
                  <span>For the frame or outer wood edges, use a dry, clean microfibre cloth.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-brand-terracotta uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert size={16} />
                <span>Actions to Strictly Avoid</span>
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-brand-terracotta font-bold">✕</span>
                  <span><strong>Never use water, wet sponges, or damp wipes.</strong> Moisture can soften the natural acacia gum and rice paste relief.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-terracotta font-bold">✕</span>
                  <span><strong>Never spray glass cleaners or household aerosols</strong> anywhere near the painting. Chemical propellants will stain the organic mud base.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-terracotta font-bold">✕</span>
                  <span>Avoid scrubbing or pressing down on the relief figures.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation & Hanging Advice */}
        <section className="bg-brand-sand/25 p-8 rounded-xs border border-brand-sand mb-16 space-y-4 font-sans text-xs text-gray-700">
          <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
            Architectural Installation & Hanging Guidelines
          </h3>
          <p className="leading-relaxed">
            All Craftchirp paintings on MDF are delivered with pre-installed, heavy-duty brass D-rings on the rear, leveled and tension-tested for the artwork's specific weight.
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>For masonry, plaster, or drywall, use high-grade wall anchors rated for at least 5 kg (11 lbs) to ensure firm support.</li>
            <li>Maintain a slight 2mm air gap between the MDF backing and the wall surface by using small silicone bumper pads (included in your delivery pack), ensuring optimal air circulation behind the board.</li>
            <li>If framing behind glass, we recommend choosing <strong>museum non-reflective UV-filtering glass</strong> with a spacer frame of at least 10mm so the glass never touches the textured relief surface.</li>
          </ul>
        </section>

        {/* Jewellery Care Section */}
        <section className="bg-white p-8 rounded-xs border border-brand-sand mb-16 space-y-4 font-sans text-xs text-gray-700">
          <div className="flex items-center space-x-2 text-brand-terracotta">
            <Sparkles size={18} />
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              Handmade Terracotta Jewellery Care
            </h3>
          </div>
          <p className="leading-relaxed">
            Craftchirp jewellery pieces feature kiln-fired terracotta beads and pendants mounted on hypoallergenic 316L medical-grade surgical stainless steel:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc list-inside">
            <li>Store separately in the provided velvet pouch to prevent scratches against metal chains.</li>
            <li>Apply perfumes, body oils, and hair lacquers before putting on your jewellery.</li>
            <li>Remove before swimming in chlorinated water, showering, or vigorous sports.</li>
            <li>Wipe steel findings with a soft dry lint-free cloth after wearing.</li>
          </ul>
        </section>

        {/* Questions & Studio Support */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 font-sans mb-3">
            Have questions regarding restoration, framing, or specific climate considerations?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors"
          >
            <span>Consult Our Conservation Studio</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  );
}

