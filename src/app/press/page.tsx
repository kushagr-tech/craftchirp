import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Newspaper, ExternalLink, Download, Calendar, ArrowRight } from 'lucide-react';
import { RACHANA_AGARWAL } from '@/data/catalogue';

export const metadata: Metadata = {
  title: 'Press & Media Mentions | Craftchirp Gallery',
  description: 'Exhibition history, critical press coverage, and curatorial features on Rachana Agarwal and Craftchirp’s mud and cow-dung folk art revival.',
};

const PRESS_FEATURES = [
  {
    publication: 'Architectural Digest India (Cultural Craft Edition)',
    date: 'Autumn 2025',
    title: 'Soil, Spirit & Sacred Geometry: How Rachana Agarwal Modernizes Warli Art',
    excerpt:
      'In an era dominated by synthetic wall prints and fast decor, Craftchirp’s tactile mud-and-cow-dung canvases evoke the ancient earthen architecture of Western India. Each stroke of rice paste is unhurried, spiritual, and thoroughly timeless.',
    author: 'Suniti Sharma, Contemporary Craft Editor',
    badge: 'Curatorial Feature',
  },
  {
    publication: 'The Indian Express (Arts & Living)',
    date: 'Spring 2024',
    title: 'The Alchemist of Alluvial Clay: 15 Years of Folk Art on MDF',
    excerpt:
      'Agarwal’s studio in Maharashtra feels less like an art factory and more like an herbal apothecary. Trays of sun-cured cow-dung paste, acacia gum crystals, and raw terracotta pigment fill the space where tribal mythology finds disciplined form.',
    author: 'Vikram Joshi, Senior Cultural Correspondent',
    badge: 'Artist Spotlight',
  },
  {
    publication: 'Deccan Herald Heritage Review',
    date: 'Winter 2023',
    title: 'Preserving Warli Outside the Village Wall: An Eco-Luxury Transition',
    excerpt:
      'Craftchirp bridges the delicate boundary between tribal ritual art and international gallery standards. By perfecting a multi-stage curing process, Agarwal ensures these organic mud foundations travel safely to collectors worldwide.',
    author: 'Ananya Sen, Folk Lore Scholar',
    badge: 'Critical Review',
  },
  {
    publication: 'Global Indigenous Crafts Symposium (Geneva)',
    date: 'June 2023',
    title: 'Natural Pigment Longevity in Contemporary Indian Sacred Traditions',
    excerpt:
      'Keynote exhibition catalog inclusion documenting the carbon-negative attributes and ceremonial significance of natural cow-dung mud preparation in Mithila and Warli communities.',
    author: 'Curatorial Monograph',
    badge: 'International Exhibition',
  },
];

const EXHIBITION_MILESTONES = [
  {
    year: '2025',
    event: 'Stories of the Soil: Modern Warli Expressions',
    venue: 'Craftchirp Virtual Gallery & Mumbai Craft Center',
    role: 'Solo Retrospective',
  },
  {
    year: '2024',
    event: 'Mithila & Beyond: Sacred Women’s Lineage',
    venue: 'Pune Heritage Guild Invitational',
    role: 'Featured Artist',
  },
  {
    year: '2022',
    event: 'Earth, Water, Wood: Sustainable Indian Art Summit',
    venue: 'Bangalore Sustainable Arts Pavilion',
    role: 'Invited Master Artisan',
  },
  {
    year: '2019',
    event: 'Traditions in Transition: Western Tribal Guilds',
    venue: 'New Delhi Craft Council Exhibition',
    role: 'Group Exhibition',
  },
];

export default function PressPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            Press, Critiques & Exhibitions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Critical Reception & Curatorial Milestones
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Exploring 15+ years of folk art innovation, natural pigment chemistry, and international gallery appreciation for artist Rachana Agarwal.
          </p>
        </header>

        {/* Media Kit Banner */}
        <div className="bg-brand-sand/30 border border-brand-sand/80 p-6 sm:p-8 rounded-xs mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
              Press Kit & Curatorial High-Resolution Assets
            </h3>
            <p className="text-xs text-gray-600 font-sans max-w-xl">
              Includes high-resolution photographic documentation (300 DPI), artist biography, technical specifications on cow-dung preparation, and curatorial essays.
            </p>
          </div>
          <a
            href="mailto:press@craftchirp.com?subject=Press%20Kit%20Request%20-%20Craftchirp"
            className="flex-shrink-0 inline-flex items-center space-x-2 px-5 py-3 bg-[#2d2a26] text-white hover:bg-brand-clay transition-colors text-xs uppercase tracking-wider font-semibold rounded-xs"
          >
            <Download size={14} />
            <span>Request Media Kit</span>
          </a>
        </div>

        {/* Selected Press Articles */}
        <section className="space-y-8 mb-20">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/70">
            Selected Critical Reviews & Features
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {PRESS_FEATURES.map((item, idx) => (
              <article
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-xs border border-brand-sand/60 hover:border-brand-clay/50 transition-all shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-clay bg-brand-sand/25 px-2.5 py-1 rounded-xs">
                    {item.badge}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d2a26] mb-3">
                  {item.title}
                </h3>

                <p className="font-serif text-xs uppercase tracking-widest text-brand-terracotta mb-4">
                  {item.publication} — {item.author}
                </p>

                <blockquote className="border-l-2 border-brand-terracotta/40 pl-4 my-4 font-serif italic text-gray-700 text-sm leading-relaxed">
                  "{item.excerpt}"
                </blockquote>
              </article>
            ))}
          </div>
        </section>

        {/* Exhibition Milestones Timeline */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/70 mb-8">
            Exhibition History & Permanent Curations
          </h2>

          <div className="border-l-2 border-brand-sand/80 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {EXHIBITION_MILESTONES.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-brand-clay border-2 border-white ring-2 ring-brand-sand/60" />
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-terracotta">
                  {item.year} • {item.role}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#2d2a26] mt-0.5">
                  {item.event}
                </h4>
                <p className="text-xs text-gray-600 font-sans mt-1">
                  {item.venue}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Press Inquiries Contact */}
        <section className="bg-white border border-brand-sand p-8 rounded-xs text-center max-w-xl mx-auto">
          <Newspaper className="mx-auto text-brand-clay mb-3" size={28} />
          <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-2">
            Media & Curatorial Inquiries
          </h3>
          <p className="text-xs text-gray-600 font-sans leading-relaxed mb-6">
            For interview requests with Rachana Agarwal, high-resolution photography licensing, or loan inquiries for public museum exhibitions, please contact our curatorial office directly.
          </p>
          <a
            href="mailto:curator@craftchirp.com"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors"
          >
            <span>curator@craftchirp.com</span>
            <ArrowRight size={13} />
          </a>
        </section>

      </div>
    </div>
  );
}

