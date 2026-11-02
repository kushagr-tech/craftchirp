import Link from "next/link";
import { Metadata } from "next";
import { ARTWORKS_SEED } from "@/data/catalogue";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { ShieldCheck, Sparkles, Feather, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Handmade Clay & Terracotta Jewellery | Craftchirp",
  description:
    "Artisan folk jewellery hand-sculpted by Rachana Agarwal from riverbed clay and terracotta with verified hypoallergenic surgical steel findings.",
};

export default function JewelleryPage() {
  const jewelleryItems = ARTWORKS_SEED.filter((item) => item.type === "jewellery");

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block">
            Wearable Earth Series
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2d2a26] leading-tight">
            Handcrafted Clay <br />
            <span className="italic text-brand-clay font-medium">& Terracotta Jewellery</span>
          </h1>
          <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
            Feather-light, tactile artifacts designed for daily connection to the soil. Hand-molded by Rachana Agarwal, wood smoke-cured, and assembled with verified skin-safe findings.
          </p>
        </div>

        {/* Material & Safety Standards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 mb-16 bg-white border border-brand-sand rounded-xs">
          <div className="flex items-start space-x-3">
            <ShieldCheck size={20} className="text-brand-clay flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-bold text-[#2d2a26]">Verified Hypoallergenic</h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                All earring ear-wires and posts use medical-grade 316L surgical stainless steel. Zero nickel, zero lead.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Feather size={20} className="text-brand-terracotta flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-bold text-[#2d2a26]">Feather-Light Comfort</h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                Hand-kneaded clay is hollowed and sculpted to weigh under 15g per earring pair for effortless all-day wear.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Sparkles size={20} className="text-brand-olive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-bold text-[#2d2a26]">Natural Wax Seal</h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                Protected with natural beeswax and organic plant oils instead of harsh industrial varnishes.
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelleryItems.map((item) => (
            <ArtworkCard key={item.id} artwork={item} />
          ))}
        </div>

        {/* Jewellery Care Guide */}
        <div className="mt-20 p-8 bg-brand-sand/30 border border-brand-sand/80 rounded-xs max-w-3xl mx-auto text-center space-y-3">
          <Heart size={24} className="mx-auto text-brand-clay" />
          <h3 className="font-serif text-xl font-bold text-[#2d2a26]">Care Guide for Terracotta Jewellery</h3>
          <p className="text-xs text-gray-600 font-sans leading-relaxed max-w-xl mx-auto">
            Clay is durable when cared for with affection. Avoid submerging in water or spraying perfumes directly onto the beads. Store in the complimentary organic cotton pouch provided with every order.
          </p>
        </div>

      </div>
    </div>
  );
}

