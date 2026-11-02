"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ARTWORKS_SEED } from "@/data/catalogue";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { Sparkles } from "lucide-react";

export function GalleryCatalogView() {
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type") || "all";
  const styleParam = searchParams.get("style") || "all";
  const orientationParam = searchParams.get("orientation") || "all";
  const availabilityParam = searchParams.get("availability") || "all";
  const sortParam = searchParams.get("sort") || "featured";

  // Filter artworks
  const filtered = useMemo(() => {
    let result = ARTWORKS_SEED.filter((item) => {
      if (typeParam !== "all" && item.type !== typeParam) return false;
      if (styleParam !== "all" && item.style.toLowerCase() !== styleParam.toLowerCase()) return false;
      if (orientationParam !== "all" && item.orientation !== orientationParam) return false;
      if (availabilityParam === "available" && item.status !== "available") return false;
      if (availabilityParam === "sold" && item.status !== "sold") return false;
      return true;
    });

    // Sort artworks
    if (sortParam === "price-asc") {
      result.sort((a, b) => a.pricePerCurrency.USD - b.pricePerCurrency.USD);
    } else if (sortParam === "price-desc") {
      result.sort((a, b) => b.pricePerCurrency.USD - a.pricePerCurrency.USD);
    } else if (sortParam === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [typeParam, styleParam, orientationParam, availabilityParam, sortParam]);

  return (
    <>
      {/* Filter Navigation Bar */}
      <GalleryFilters />

      {/* Results Counter */}
      <div className="flex justify-between items-center mb-8 text-xs uppercase tracking-wider text-gray-500">
        <span>Showing {filtered.length} of {ARTWORKS_SEED.length} Original Works</span>
        <span className="hidden sm:inline">Insured Worldwide Delivery • Signed Certificate Included</span>
      </div>

      {/* Artwork Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-24 text-center max-w-lg mx-auto bg-brand-sand/20 border border-brand-sand/60 p-12 rounded-xs">
          <Sparkles size={36} className="mx-auto text-brand-clay mb-4" />
          <h3 className="font-serif text-2xl font-bold text-[#2d2a26] mb-3">No Artworks Match Your Filter</h3>
          <p className="text-gray-600 text-sm mb-8 font-sans">
            We create singular, one-of-a-kind originals that sell quickly. You can reset your filters to explore our archive, or request a bespoke commission.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/gallery"
              className="px-6 py-3 bg-brand-clay text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-terracotta transition-colors"
            >
              Reset All Filters
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-brand-clay text-brand-clay text-xs uppercase tracking-widest font-semibold hover:bg-brand-clay hover:text-white transition-colors"
            >
              Request Commission
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export function GallerySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-14 bg-brand-sand/30 rounded-xs" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-brand-sand/20 rounded-xs" />
        ))}
      </div>
    </div>
  );
}

