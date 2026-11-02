"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { ARTWORKS_SEED } from "@/data/catalogue";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ARTWORKS_SEED.filter((artwork) => {
      return (
        artwork.title.toLowerCase().includes(q) ||
        artwork.style.toLowerCase().includes(q) ||
        artwork.medium.toLowerCase().includes(q) ||
        artwork.materials.some((m) => m.toLowerCase().includes(q)) ||
        artwork.dominantColors.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-brand-offwhite rounded-xs shadow-2xl border border-brand-sand overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-sand bg-white">
          <Search size={18} className="text-brand-clay mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by folk tradition (Warli, Madhubani), materials (cow dung, clay), or motif..."
            className="w-full bg-transparent text-sm text-[#2d2a26] placeholder-gray-400 focus:outline-none font-sans"
          />
          {query ? (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 mr-2">
              <X size={16} />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] bg-brand-sand/40 border border-brand-sand text-gray-500 px-1.5 py-0.5 rounded-xs">
              ESC
            </kbd>
          )}
          <button onClick={onClose} className="ml-2 text-gray-500 hover:text-[#2d2a26] sm:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Results / Suggestion Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === "" ? (
            /* Suggested Queries */
            <div className="py-6 px-2 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-terracotta block">
                Popular Discoveries
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Warli Tarpa Dance",
                  "Madhubani Mandala",
                  "Cow-dung mud art",
                  "Terracotta jewellery",
                  "MDF wall art",
                  "Monochrome folk",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-white border border-brand-sand px-3 py-1.5 rounded-xs hover:border-brand-clay text-[#2d2a26] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            /* Matching Artworks */
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500 block px-2 mb-2">
                Found {filteredResults.length} Artwork{filteredResults.length > 1 ? "s" : ""}
              </span>
              {filteredResults.map((artwork) => (
                <Link
                  key={artwork.id}
                  href={`/art/${artwork.slug}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-2.5 rounded-xs hover:bg-brand-sand/30 transition-colors group"
                >
                  <div className="relative w-14 h-14 rounded-xs overflow-hidden bg-brand-sand/40 flex-shrink-0">
                    <Image
                      src={artwork.images[0].url}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase tracking-wider text-brand-clay font-medium">
                        {artwork.style} • {artwork.edition === "original" ? "1-of-1" : "Jewellery"}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#2d2a26] group-hover:text-brand-clay transition-colors">
                      {artwork.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-sans">
                      {artwork.dimensions.widthCm}×{artwork.dimensions.heightCm} cm • ${artwork.pricePerCurrency.USD.toLocaleString()} USD
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-clay opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            /* Zero matches */
            <div className="py-12 text-center space-y-2">
              <Sparkles size={28} className="mx-auto text-brand-clay" />
              <p className="font-serif text-base text-[#2d2a26]">No artworks found matching "{query}"</p>
              <p className="text-xs text-gray-500">Try searching for "Warli", "Mithila", or "Jewellery"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

