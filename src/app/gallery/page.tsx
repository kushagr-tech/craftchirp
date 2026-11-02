import { Suspense } from "react";
import { Metadata } from "next";
import { GalleryCatalogView, GallerySkeleton } from "@/components/gallery/GalleryCatalogView";
import { ShieldCheck, Sparkles, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Original Folk Art Gallery & Collections | Craftchirp",
  description:
    "Explore authentic 1-of-1 Warli and Madhubani folk art paintings on MDF with natural cow-dung base, alongside handmade terracotta jewellery by Rachana Agarwal.",
  keywords: [
    "original Warli painting",
    "authentic Madhubani art",
    "cow dung mud art",
    "handmade terracotta jewelry",
    "Indian folk art gallery",
    "Rachana Agarwal art",
  ],
};

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6">
        
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-brand-terracotta uppercase tracking-[0.25em] font-semibold text-xs mb-3 block">
            Craftchirp Permanent Collection
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[#2d2a26]">
            Original Art <br />
            <span className="italic text-brand-clay font-medium">& Tactile Artifacts</span>
          </h1>
          <p className="text-gray-600 font-sans text-base md:text-lg leading-relaxed max-w-2xl">
            Each piece is a singular 1-of-1 original created by Rachana Agarwal using ancestral techniques: purified sun-dried cow-dung base, natural mineral pigments, and bamboo-reed brushwork on moisture-resistant MDF.
          </p>
        </div>

        {/* Filter Navigation & Interactive Catalog Grid */}
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryCatalogView />
        </Suspense>

        {/* Gallery Guarantees Strip */}
        <div className="mt-24 pt-16 border-t border-brand-sand/60 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <Award className="text-brand-clay flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-base font-bold text-[#2d2a26] mb-1">Authenticity Guaranteed</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Every original comes with a serialized Certificate of Authenticity signed directly by Rachana Agarwal.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <ShieldCheck className="text-brand-terracotta flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-base font-bold text-[#2d2a26] mb-1">Insured Art Transit</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Reinforced custom crating designed for rigid MDF boards, shipped via insured air couriers (DHL / FedEx).
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Sparkles className="text-brand-olive flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-serif text-base font-bold text-[#2d2a26] mb-1">Pure Earth & Odorless</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Traditional multi-stage purification and sun-curing ensures zero chemical additives and completely odorless durability.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
