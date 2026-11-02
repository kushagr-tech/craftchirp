import Link from "next/link";
import { Metadata } from "next";
import { EXHIBITIONS_SEED, ARTWORKS_SEED } from "@/data/catalogue";
import { ArtImage } from "@/components/ui/ArtImage";
import { ArrowRight, Sparkles, Calendar, Volume2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Virtual Exhibitions | Craftchirp Gallery",
  description:
    "Step into curated virtual gallery exhibitions featuring authentic Warli and Madhubani folk art by Rachana Agarwal. Complete with audio guides and curatorial wall texts.",
};

export default function ExhibitionsIndexPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block">
            Craftchirp Virtual Gallery
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2d2a26] leading-tight">
            Curated Virtual <br />
            <span className="italic text-brand-clay font-medium">Exhibitions & Salons</span>
          </h1>
          <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
            Experience the tactile resonance of ancestral mud and cow-dung painting from anywhere in the world. Our virtual exhibitions recreate the slow curatorial contemplation of an art sanctuary.
          </p>
        </div>

        {/* Featured Exhibition Banner */}
        <div className="space-y-12">
          {EXHIBITIONS_SEED.map((exh) => {
            const count = exh.artworkIds.length;
            const featuredWork = ARTWORKS_SEED.find((a) => a.id === exh.artworkIds[0]);

            return (
              <article
                key={exh.id}
                className="bg-white border border-brand-sand rounded-xs overflow-hidden shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Visual Preview */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[350px]">
                    <ArtImage
                      src={exh.heroImage}
                      alt={exh.title}
                      aspectRatio="wide"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-clay text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-xs shadow-xs">
                      Active Virtual Salon
                    </div>
                  </div>

                  {/* Curatorial Details */}
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center space-x-3 text-xs uppercase tracking-wider text-gray-500 mb-2">
                        <span className="flex items-center space-x-1">
                          <Calendar size={13} className="text-brand-terracotta" />
                          <span>On View Now</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Volume2 size={13} className="text-brand-clay" />
                          <span>Audio Guide Included</span>
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2d2a26] mb-2">
                        {exh.title}
                      </h2>
                      <p className="font-serif italic text-brand-clay text-base mb-4">
                        {exh.theme}
                      </p>
                      <p className="text-xs text-gray-600 font-sans leading-relaxed">
                        {exh.curatorialNote}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-brand-sand/60 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-sans">
                        {count} Curated Original Works
                      </span>
                      <Link
                        href={`/exhibitions/${exh.slug}`}
                        className="px-6 py-3 bg-brand-clay text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-terracotta transition-colors flex items-center space-x-2 rounded-xs"
                      >
                        <span>Enter Exhibition</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
}

