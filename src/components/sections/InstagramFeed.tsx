"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

interface IGPost {
  id: string;
  image: string;
  link: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Import static fallbacks in case API isn't configured
  const imgGallery = require("../../../public/assets/gallery_placeholder_1776498616522.png");
  const imgProcess = require("../../../public/assets/process_texture_1776498601479.png");
  const imgHero = require("../../../public/assets/hero_mud_art_1776498586869.png");

  useEffect(() => {
    async function fetchInstagram() {
      // Allow user to supply either a direct Instagram Graph API token OR a proxy JSON URL (like Behold.so)
      const igToken = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
      const proxyUrl = process.env.NEXT_PUBLIC_BEHOLD_URL;

      try {
        if (igToken) {
          // Method 1: Official Instagram Graph API (Requires Token Refresh every 60 days)
          const res = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${igToken}`);
          const { data } = await res.json();
          if (data) {
            const formatted = data
              // Filter out videos unless thumbnail is present, to keep UI clean
              .filter((p: any) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
              .slice(0, 4)
              .map((p: any) => ({
                id: p.id,
                image: p.media_url,
                link: p.permalink
              }));
            setPosts(formatted);
          }
        } else if (proxyUrl) {
          // Method 2: Public JSON proxy service (e.g. Behold.so or Juicer API)
          const res = await fetch(proxyUrl);
          const data = await res.json();
          if (data && Array.isArray(data)) {
            const formatted = data.slice(0, 4).map((p: any) => ({
              id: p.id,
              image: p.mediaUrl || p.media_url || p.image,
              link: p.permalink || p.link
            }));
            setPosts(formatted);
          }
        } else {
          // Fallback to static if no URL/Token is configured in .env yet
          setPosts([
            { id: "fallback-1", image: imgGallery, link: "https://www.instagram.com/craftchirp_creations/" },
            { id: "fallback-2", image: imgProcess, link: "https://www.instagram.com/craftchirp_creations/" },
            { id: "fallback-3", image: imgHero, link: "https://www.instagram.com/craftchirp_creations/" },
            { id: "fallback-4", image: imgGallery, link: "https://www.instagram.com/craftchirp_creations/" },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch Instagram feed natively:", err);
        // Fallback array if fetch explicitly fails
        setPosts([
          { id: "fallback-1", image: imgGallery, link: "https://www.instagram.com/craftchirp_creations/" },
          { id: "fallback-2", image: imgProcess, link: "https://www.instagram.com/craftchirp_creations/" },
          { id: "fallback-3", image: imgHero, link: "https://www.instagram.com/craftchirp_creations/" },
          { id: "fallback-4", image: imgGallery, link: "https://www.instagram.com/craftchirp_creations/" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, [imgGallery, imgHero, imgProcess]);

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            // Skeleton Loader while API is fetching
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 md:h-80 w-full bg-black/10 animate-pulse rounded-sm" />
            ))
          ) : (
            posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-64 md:h-80 w-full block overflow-hidden rounded-sm bg-brand-clay/20"
              >
                <Image
                  src={post.image}
                  alt={`Instagram Post ${index + 1}`}
                  fill
                  unoptimized={typeof post.image === "string" && post.image.startsWith("http")} // Do not optimize external ig images as they are already CDN hosted
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <InstagramIcon size={32} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                </div>
              </motion.a>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
