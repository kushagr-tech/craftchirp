"use client";

import { useState } from "react";
import { ArtImage } from "@/types/models";
import { TextureZoom } from "@/components/ui/TextureZoom";
import Image from "next/image";
import clsx from "clsx";
import { Camera } from "lucide-react";

interface ArtworkGalleryProps {
  images: ArtImage[];
  title: string;
}

export function ArtworkGallery({ images, title }: ArtworkGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0];

  const viewTypeLabels = {
    front: "Front View",
    angle: "45° Rake Angle",
    texture: "Macro Texture",
    room: "Room Scale",
    packaging: "Packaging View",
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Primary Zoom View */}
      <div className="relative rounded-xs overflow-hidden border border-brand-sand/60 shadow-[0_4px_25px_rgba(45,42,38,0.06)] bg-brand-sand/20">
        <TextureZoom
          src={activeImage.url}
          alt={activeImage.alt}
          aspectRatio="square"
          zoomScale={2.6}
        />

        {/* Development Placeholder Notice */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#2d2a26]/90 backdrop-blur-sm text-brand-offwhite text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-xs flex items-center justify-between border border-white/10 z-20 pointer-events-none">
          <span className="flex items-center space-x-1.5 font-medium">
            <Camera size={12} className="text-brand-terracotta" />
            <span>Dev Placeholder Asset</span>
          </span>
          <span className="text-[9px] text-gray-300">Pending Studio Photography of Original</span>
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={clsx(
              "relative aspect-square rounded-xs overflow-hidden border-2 transition-all p-0.5 bg-brand-sand/30",
              selectedIndex === idx
                ? "border-brand-clay shadow-xs scale-102"
                : "border-transparent opacity-70 hover:opacity-100 hover:border-brand-sand"
            )}
            aria-label={`Switch to ${viewTypeLabels[img.viewType] || "view"}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[8px] uppercase tracking-wider text-center py-0.5 rounded-2xs backdrop-blur-2xs">
              {viewTypeLabels[img.viewType] || "Angle"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

