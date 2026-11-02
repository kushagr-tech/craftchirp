"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { StaticImageData } from "next/image";

import imgGallery from "../../../public/assets/gallery_placeholder_1776498616522.png";
import imgHero from "../../../public/assets/hero_mud_art_1776498586869.png";

type PreviewItem = {
  id: number;
  title: string;
  slug: string;
  style: string;
  image: StaticImageData;
};

const previewItems: PreviewItem[] = [
  { id: 1, title: "Rhythm of the Tarpa", slug: "rhythm-of-the-tarpa", style: "Warli Tradition", image: imgGallery },
  { id: 2, title: "Tree of Ancestral Life", slug: "tree-of-ancestral-life", style: "Warli Tradition", image: imgHero },
  { id: 3, title: "Sacred Mithila Mandala", slug: "sacred-mithila-mandala", style: "Madhubani Tradition", image: imgGallery },
];

export default function GalleryPreview() {
  return (
    <section className="py-24 md:py-32 bg-brand-offwhite text-foreground">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <span className="text-brand-terracotta uppercase tracking-[0.2em] font-semibold text-sm mb-4 block">
              Curated Collections
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2d2a26]">
              Bring <span className="italic text-brand-clay font-medium">Nature</span> Indoors.
            </h2>
          </div>
          
          <Link 
            href="/gallery"
            className="group flex items-center space-x-2 text-brand-clay font-semibold hover:text-brand-terracotta transition-colors mt-8 md:mt-0"
          >
            <span className="uppercase tracking-widest text-sm text-[#2d2a26] group-hover:text-brand-terracotta transition-colors">View All Works</span>
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={`/art/${item.slug}`} className="group block relative cursor-pointer">
                <div className="relative h-[450px] w-full overflow-hidden bg-brand-sand rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xs">
                      {item.style}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-[#2d2a26] group-hover:text-brand-clay transition-colors">{item.title}</h3>
                  <span className="text-brand-clay text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    View Piece →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
