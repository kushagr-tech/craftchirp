"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Camera } from "lucide-react";

interface ArtImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  isDevPlaceholder?: boolean;
  priority?: boolean;
  className?: string;
}

export function ArtImage({
  src,
  alt,
  aspectRatio = "square",
  isDevPlaceholder = false,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: ArtImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Auto-detect AI placeholder files in dev assets to ensure strict compliance
  const isPlaceholderDetected =
    isDevPlaceholder ||
    (typeof src === "string" && (src.includes("placeholder") || src.includes("hero_mud_art") || src.includes("process_texture"))) ||
    (typeof src === "object" && src !== null && "src" in src && (src as StaticImageData).src.includes("placeholder"));

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[16/9]",
  }[aspectRatio];

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-brand-sand/30 rounded-sm",
        aspectClasses,
        className
      )}
    >
      {/* Strict zero-CLS skeleton placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-brand-sand/40 animate-pulse z-0" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        className={clsx(
          "object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        {...props}
      />

      {/* Mandatory Dev Placeholder Badge (Never present AI placeholders as real items) */}
      {isPlaceholderDetected && (
        <div className="absolute bottom-2 left-2 right-2 bg-[#2d2a26]/90 backdrop-blur-sm text-brand-offwhite text-[10px] uppercase tracking-wider py-1.5 px-2.5 rounded-xs flex items-center justify-between border border-white/10 z-10 pointer-events-none">
          <span className="flex items-center space-x-1 font-medium">
            <Camera size={11} className="text-brand-terracotta" />
            <span>Dev Placeholder</span>
          </span>
          <span className="text-[9px] text-gray-300">Pending Studio Photography</span>
        </div>
      )}
    </div>
  );
}

