"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Raw Earth & Natural Pigments",
    desc: "We start by sourcing pure cow dung and fine earth clays. Using exclusively natural pigments, we prepare a chemical-free base that is sustainable and biodegradable.",
  },
  {
    num: "02",
    title: "Purification & Preparation",
    desc: "The raw materials undergo a meticulous process to remove any impurities. This stage is crucial in ensuring that the final artwork will be entirely odorless and safe for indoor environments.",
  },
  {
    num: "03",
    title: "Handcrafted Shaping",
    desc: "Using techniques passed down through generations, each pattern is shaped entirely by hand. The warmth of human touch creates unique, intricate textures on every piece.",
  },
  {
    num: "04",
    title: "Eco-Friendly Curing",
    desc: "Our art is sun-dried naturally over several days. This slow curing process ensures durability and locks in the earthly essence without any artificial setting agents.",
  },
];

export default function TheProcess() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="relative bg-[#2d2a26] text-brand-offwhite"
    >
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-terracotta uppercase tracking-[0.2em] font-semibold text-sm mb-4 block">
            Our Craftsmanship
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            The Making of <span className="italic text-brand-sand">Eco-Luxury</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
          
          {/* Sticky Image Container */}
          <div className="w-full md:w-1/2 md:sticky md:top-32 h-[50vh] md:h-[70vh] rounded-lg overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/assets/process_texture_1776498601479.png"
                alt="Hands shaping mud art"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Parallax overlay to simulate progression */}
              <motion.div 
                className="absolute inset-0 bg-black/40 mix-blend-overlay"
                style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.1, 0.7]) }}
              />
            </div>
          </div>

          {/* Scrolling Text Content */}
          <div className="w-full md:w-1/2 flex flex-col pt-12 md:pb-64 space-y-32">
            {steps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} scrollYProgress={scrollYProgress} total={steps.length} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, scrollYProgress, total }: any) {
  // Calculate when this specific step should be highlighted
  const stepLength = 1 / total;
  const start = index * stepLength;
  const end = start + stepLength;
  
  // Use specific exact clamp logic handling the first and last step bounds
  const oStart1 = index === 0 ? 0 : start - 0.05;
  const oStart2 = index === 0 ? 0 : start + 0.05;
  const oEnd1 = index === total - 1 ? 1 : end - 0.05;
  const oEnd2 = index === total - 1 ? 1 : end + 0.05;

  const opacityStart = index === 0 ? 1 : 0.3;
  const opacityEnd = index === total - 1 ? 1 : 0.3;

  const opacity = useTransform(
    scrollYProgress,
    [oStart1, oStart2, oEnd1, oEnd2],
    [opacityStart, 1, 1, opacityEnd]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [Math.max(0, start - 0.2), start + 0.1], 
    [50, 0]
  );

  return (
    <motion.div 
      style={{ opacity, y }}
      className="flex flex-col max-w-lg"
    >
      <span className="font-serif text-5xl md:text-7xl text-brand-sand/30 font-bold mb-4">
        {step.num}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
        {step.title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-lg font-sans">
        {step.desc}
      </p>
    </motion.div>
  );
}
