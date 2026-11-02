"use client";

import Link from "next/link";
import { Artwork } from "@/types/models";
import { ArtImage } from "@/components/ui/ArtImage";
import { Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

interface ArtworkCardProps {
  artwork: Artwork;
  currency?: "USD" | "EUR" | "GBP" | "INR";
}

export function ArtworkCard({ artwork, currency = "USD" }: ArtworkCardProps) {
  const primaryImage =
    artwork.images.find((img) => img.isPrimary) || artwork.images[0];

  const priceFormatted = {
    USD: `$${artwork.pricePerCurrency.USD.toLocaleString()}`,
    EUR: `€${artwork.pricePerCurrency.EUR.toLocaleString()}`,
    GBP: `£${artwork.pricePerCurrency.GBP.toLocaleString()}`,
    INR: `₹${artwork.pricePerCurrency.INR.toLocaleString()}`,
  }[currency];

  const statusConfig = {
    available: {
      label: artwork.edition === "original" ? "1-of-1 Original" : "Limited Edition",
      badgeClass: "bg-brand-clay text-brand-offwhite",
    },
    reserved: {
      label: "In Checkout Hold",
      badgeClass: "bg-brand-terracotta text-white flex items-center space-x-1",
    },
    sold: {
      label: "Collected (Archive)",
      badgeClass: "bg-[#2d2a26] text-gray-300",
    },
    archived: {
      label: "Archived",
      badgeClass: "bg-gray-600 text-white",
    },
  }[artwork.status];

  return (
    <article className="group flex flex-col bg-brand-offwhite border border-brand-sand/50 rounded-xs overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(140,90,69,0.08)] hover:border-brand-clay/30">
      <Link href={`/art/${artwork.slug}`} className="block relative overflow-hidden">
        {/* Aspect-ratio guarded image container */}
        <ArtImage
          src={primaryImage.url}
          alt={primaryImage.alt}
          aspectRatio={artwork.orientation === "landscape" ? "landscape" : artwork.orientation === "square" ? "square" : "portrait"}
          className="transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />

        {/* Status Badge in Top Corner */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={clsx(
              "text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs shadow-xs",
              statusConfig.badgeClass
            )}
          >
            {artwork.status === "reserved" && <Clock size={10} className="mr-1 inline animate-pulse" />}
            {statusConfig.label}
          </span>
        </div>
      </Link>

      {/* Museum Label Content Block */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Eyebrow: Style & Type */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-brand-clay font-medium mb-1.5">
            <span>{artwork.style} • {artwork.type}</span>
            <span>{artwork.year}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-[#2d2a26] group-hover:text-brand-clay transition-colors leading-snug mb-2">
            <Link href={`/art/${artwork.slug}`} className="flex items-start justify-between">
              <span>{artwork.title}</span>
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-brand-terracotta flex-shrink-0 mt-1 ml-1"
              />
            </Link>
          </h3>

          {/* Medium and Physical Dimensions */}
          <p className="text-xs text-gray-600 line-clamp-1 mb-1 font-sans">
            {artwork.medium}
          </p>
          <p className="text-[11px] text-gray-500 font-sans tracking-wide">
            {artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} cm
            {" · "}
            {artwork.dimensions.widthInches} × {artwork.dimensions.heightInches} in
          </p>
        </div>

        {/* Commercial Price & Action Strip */}
        <div className="pt-4 mt-4 border-t border-brand-sand/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Landed Price</span>
            <span className="font-serif text-lg font-bold text-[#2d2a26]">
              {priceFormatted}
            </span>
          </div>

          <Link
            href={`/art/${artwork.slug}`}
            className="text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors py-1 border-b border-brand-clay/30 hover:border-brand-terracotta"
          >
            {artwork.status === "available" ? "Inspect & Acquire" : "View Story"}
          </Link>
        </div>
      </div>
    </article>
  );
}

