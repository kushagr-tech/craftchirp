"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramFeed() {
  // IMPORTANT: Instagram blocks direct frontend scraping without a server token.
  // The global industry standard for static sites (like this one) is a free Widget provider like Elfsight.
  // Go to https://elfsight.com/instagram-feed-instashow/
  // Create a free feed connected to your account, and paste your Widget ID here:
  const ELFSIGHT_WIDGET_ID = ""; // e.g. "a1b2c3d4-e5f6-7890-1234-567890abcdef"

  useEffect(() => {
    if (ELFSIGHT_WIDGET_ID) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [ELFSIGHT_WIDGET_ID]);

  const posts = [
    { id: 1, image: "/assets/gallery_placeholder_1776498616522.png", link: "https://www.instagram.com/craftchirp_creations/" },
    { id: 2, image: "/assets/process_texture_1776498601479.png", link: "https://www.instagram.com/craftchirp_creations/" },
    { id: 3, image: "/assets/hero_mud_art_1776498586869.png", link: "https://www.instagram.com/craftchirp_creations/" },
    { id: 4, image: "/assets/gallery_placeholder_1776498616522.png", link: "https://www.instagram.com/craftchirp_creations/" },
  ];

  return (
    <section className="py-24 bg-brand-sand text-[#2d2a26] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <InstagramIcon size={40} className="text-brand-clay mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Follow our <span className="italic text-brand-clay">Journey</span>
          </h2>
          <a 
            href="https://www.instagram.com/craftchirp_creations/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg text-[#2d2a26] hover:text-brand-terracotta border-b-2 border-brand-clay hover:border-brand-terracotta transition-all pb-1 font-sans font-medium"
          >
            @craftchirp_creations
          </a>
        </div>

        {ELFSIGHT_WIDGET_ID ? (
          <div className="w-full">
            <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`}></div>
          </div>
        ) : (
          <div>
            <div className="mb-8 text-center text-brand-clay bg-brand-offwhite p-4 rounded-sm border border-brand-clay/30 max-w-2xl mx-auto block font-sans">
              <strong>Notice for Admin:</strong> To auto-sync live Instagram posts on a static website, you must provide an Elfsight Widget ID in <code>src/components/sections/InstagramFeed.tsx</code>. Showing placeholders below.
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {posts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-64 md:h-80 w-full block overflow-hidden rounded-sm"
                >
                  <Image
                    src={post.image}
                    alt="Instagram post placeholder"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <InstagramIcon size={32} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
