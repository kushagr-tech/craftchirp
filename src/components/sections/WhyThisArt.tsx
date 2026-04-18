"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import imgGallery from "../../../public/assets/gallery_placeholder_1776498616522.png";

export default function WhyThisArt() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Eco-Friendly & Biodegradable",
      desc: "Made completely from earth and cow dung, returning beautifully to nature without leaving a carbon footprint.",
    },
    {
      title: "Non-Toxic & Safe",
      desc: "Zero chemical paints or artificial binding agents. 100% safe for homes with children and pets.",
    },
    {
      title: "Completely Odorless",
      desc: "Our rigorous natural sun-drying and processing techniques ensure every piece is completely odorless.",
    },
    {
      title: "Unique Textures",
      desc: "The warmth of mud and natural pigments provide a rustic, calming texture that synthetic materials cannot replicate.",
    },
  ];

  return (
    <section id="why-this-art" className="py-32 bg-brand-offwhite text-foreground relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative h-[600px]" ref={ref}>
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={imgGallery}
                alt="Beautiful modern handmade mud painting details"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-sm shadow-2xl"
              />
            </motion.div>
            
            {/* Decorative background element */}
            <motion.div
              className="absolute -inset-6 border border-brand-sand z-0"
              initial={{ x: -20, y: 20, opacity: 0 }}
              animate={isInView ? { x: -24, y: 24, opacity: 1 } : { x: -20, y: 20, opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.span 
              className="text-brand-terracotta uppercase tracking-[0.2em] font-semibold text-sm mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The CraftChirp Difference
            </motion.span>
            
            <motion.h2 
              className="font-serif text-4xl md:text-5xl font-bold text-[#2d2a26] mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Rooted in Tradition,<br />
              <span className="italic text-brand-clay font-medium">Refined for Luxury.</span>
            </motion.h2>

            <motion.div className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col border-l-2 border-brand-sand pl-6 py-1">
                  <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-sans">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
