"use client";

import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/types/models";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import clsx from "clsx";

interface ExhibitionWallProps {
  wallNumber: string;
  themeTitle: string;
  wallStatement: string;
  artwork: Artwork;
  reversed?: boolean;
}

export function ExhibitionWall({
  wallNumber,
  themeTitle,
  wallStatement,
  artwork,
  reversed = false,
}: ExhibitionWallProps) {
  const primaryImage = artwork.images[0];

  return (
    <section className="py-24 sm:py-32 border-b border-brand-sand/50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Wall Theme Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-terracotta block mb-2">
            Gallery Wall {wallNumber}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2d2a26]">
            {themeTitle}
          </h3>
          <p className="text-sm text-gray-600 font-sans leading-relaxed mt-3">
            {wallStatement}
          </p>
        </div>

        {/* Gallery Wall Installation View */}
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center",
            reversed && "lg:flex-row-reverse"
          )}
        >
          {/* Framed Artwork Display on Gallery Plaster */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 bg-[#e4ded5] border-2 border-[#d5ccbf] shadow-[0_20px_50px_rgba(45,42,38,0.12)] rounded-xs">
              {/* Subtle top gallery spotlight beam */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-white/40 blur-2xl pointer-events-none" />

              <div className="relative aspect-square w-full overflow-hidden bg-brand-sand shadow-2xl border border-black/10">
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              {/* Dev placeholder notice */}
              <div className="mt-3 text-[9px] uppercase tracking-wider text-gray-500 text-center font-sans">
                Curatorial Installation Preview • Original Folk Art on MDF
              </div>
            </div>
          </div>

          {/* Authentic Museum Wall Placard (Label) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-brand-sand/80 p-6 sm:p-8 rounded-xs shadow-xs space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-clay block mb-1">
                  Placard {wallNumber}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#2d2a26]">
                  {artwork.title}
                </h4>
                <p className="text-xs text-gray-500 font-sans mt-0.5">
                  Rachana Agarwal, {artwork.year}
                </p>
              </div>

              <div className="text-xs text-gray-600 font-sans space-y-1.5 pt-2 border-t border-brand-sand/50">
                <p>
                  <strong className="text-[#2d2a26]">Medium:</strong> {artwork.medium}
                </p>
                <p>
                  <strong className="text-[#2d2a26]">Dimensions:</strong> {artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} cm ({artwork.dimensions.widthInches} × {artwork.dimensions.heightInches} in)
                </p>
                <p>
                  <strong className="text-[#2d2a26]">Edition:</strong> 1-of-1 Unique Original
                </p>
              </div>

              <p className="text-xs text-gray-700 font-sans leading-relaxed pt-2 border-t border-brand-sand/50">
                {artwork.story}
              </p>

              <div className="pt-4 border-t border-brand-sand/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Acquisition</span>
                  <span className="font-serif text-xl font-bold text-[#2d2a26]">
                    ${artwork.pricePerCurrency.USD.toLocaleString()} USD
                  </span>
                </div>

                <Link
                  href={`/art/${artwork.slug}`}
                  className="w-full sm:w-auto px-5 py-2.5 bg-brand-clay hover:bg-brand-terracotta text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center space-x-1.5 rounded-xs"
                >
                  <span>Inspect & Acquire</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

