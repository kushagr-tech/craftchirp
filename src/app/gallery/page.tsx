import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import imgGallery from "../../../public/assets/gallery_placeholder_1776498616522.png";
import imgHero from "../../../public/assets/hero_mud_art_1776498586869.png";
import imgProcess from "../../../public/assets/process_texture_1776498601479.png";
import InstagramFeed from "@/components/sections/InstagramFeed";

export const metadata = {
  title: "Gallery & Collections",
  description: "Browse our exclusive collections of premium handmade mud art.",
};

const galleryItems: {id: number, title: string, category: string, size: string, image: StaticImageData}[] = [
  { id: 1, title: "Earthy Abstract I", category: "Modern Designs", size: "24x36 inches", image: imgGallery },
  { id: 2, title: "Terracotta Mandala", category: "Traditional Motifs", size: "30x30 inches", image: imgHero },
  { id: 3, title: "Rustic Geometrics", category: "Modern Designs", size: "24x24 inches", image: imgGallery },
  { id: 4, title: "Organic Flow", category: "Wall Art", size: "36x48 inches", image: imgProcess },
  { id: 5, title: "Sacred Clay", category: "Traditional Motifs", size: "18x24 inches", image: imgGallery },
  { id: 6, title: "Desert Sun", category: "Custom Pieces", size: "40x40 inches", image: imgHero },
];

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-foreground">
      <div className="container mx-auto px-6">
        
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center space-x-2 text-brand-clay hover:text-brand-terracotta transition-colors mb-8 uppercase tracking-widest text-xs font-semibold">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-[#2d2a26]">
            Our <span className="italic text-brand-clay">Collections</span>
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg font-sans">
            Every piece is uniquely handcrafted using natural mud, pure cow dung, and earth pigments. 
            Designed to bring grounded luxury to your space.
          </p>
        </div>

        {/* Filters Placeholder */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 pb-6">
          {["All", "Wall Art", "Traditional Motifs", "Modern Designs", "Custom Pieces"].map((filter, i) => (
            <button key={i} className={`px-4 py-2 uppercase tracking-wider text-sm font-medium transition-colors ${i === 0 ? "bg-brand-clay text-white" : "text-gray-500 hover:text-brand-clay"}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item) => (
            <div key={item.id} className="break-inside-avoid group cursor-pointer">
              <div className="relative overflow-hidden bg-brand-sand rounded-sm mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif text-xl font-bold text-[#2d2a26]">{item.title}</h3>
                  <span className="text-xs uppercase tracking-wider text-gray-500 border border-gray-300 px-2 py-1 rounded-sm">{item.category}</span>
                </div>
                <span className="text-sm text-gray-500 font-sans">{item.size} • Handcrafted Mud Art</span>
              </div>
            </div>
          ))}
        </div>

      </div>
      <InstagramFeed />
    </div>
  );
}
