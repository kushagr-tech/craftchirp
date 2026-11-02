"use client";

import { useState, useRef, MouseEvent, TouchEvent } from "react";
import Image, { StaticImageData } from "next/image";
import { ZoomIn } from "lucide-react";
import clsx from "clsx";

interface TextureZoomProps {
  src: string | StaticImageData;
  alt: string;
  zoomScale?: number;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function TextureZoom({
  src,
  alt,
  zoomScale = 2.4,
  className,
  aspectRatio = "square",
}: TextureZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[4/3]",
  }[aspectRatio];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsZoomed(true)}
      onTouchEnd={() => setIsZoomed(false)}
      onTouchMove={handleTouchMove}
      className={clsx(
        "relative w-full overflow-hidden bg-brand-sand/30 rounded-sm cursor-crosshair select-none group",
        aspectClasses,
        className
      )}
      aria-label="Interactive texture magnifier: hover or drag to inspect organic mud relief"
    >
      {/* Base Artwork Image */}
      <div
        className={clsx(
          "w-full h-full relative transition-transform duration-200 ease-out",
          isZoomed ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Magnified Texture Canvas */}
      {isZoomed && (
        <div
          className="absolute inset-0 bg-no-repeat transition-all duration-75 ease-out pointer-events-none"
          style={{
            backgroundImage: `url(${typeof src === "string" ? src : (src as StaticImageData).src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: `${zoomScale * 100}%`,
          }}
        />
      )}

      {/* Floating Indicator */}
      <div
        className={clsx(
          "absolute top-3 right-3 bg-[#2d2a26]/80 text-brand-offwhite text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-xs flex items-center space-x-1.5 backdrop-blur-xs transition-opacity duration-300 pointer-events-none z-10",
          isZoomed ? "opacity-0" : "opacity-90 group-hover:opacity-100"
        )}
      >
        <ZoomIn size={13} className="text-brand-terracotta" />
        <span>Hover to Inspect Texture</span>
      </div>
    </div>
  );
}

