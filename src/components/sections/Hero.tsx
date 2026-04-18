"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Sparkles, ShieldCheck, Droplet } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-brand-clay flex items-center justify-center font-sans"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <Image
          src="/assets/hero_mud_art_1776498586869.png"
          alt="Premium handcrafted mud art on wall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-offwhite/10" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center mt-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="pb-4"
        >
          <span className="text-brand-sand tracking-[0.25em] uppercase text-sm font-semibold mb-6 block">
            CraftChirp Creations
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold leading-tight mb-8 drop-shadow-lg">
            Art Born from <br />
            <span className="text-brand-sand italic">Earth</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-md">
            Premium eco-friendly handcrafted mud art. 
            Zero chemicals, odorless, and beautifully textured for the modern sanctuary.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 mb-24 flex flex-wrap justify-center gap-6"
        >
          <button className="bg-brand-sand text-foreground px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors">
            Explore Gallery
          </button>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-0 right-0"
        >
          <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-white/80">
            <div className="flex items-center space-x-2">
              <Leaf size={18} />
              <span className="text-xs uppercase tracking-wider font-medium">100% Natural</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck size={18} />
              <span className="text-xs uppercase tracking-wider font-medium">Sustainable</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles size={18} />
              <span className="text-xs uppercase tracking-wider font-medium">Handmade</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplet size={18} />
              <span className="text-xs uppercase tracking-wider font-medium">Odor-Free</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
