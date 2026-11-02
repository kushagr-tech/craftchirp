import Link from "next/link";
import { Metadata } from "next";
import { COLLECTIONS_SEED, ARTWORKS_SEED } from "@/data/catalogue";
import { ArtImage } from "@/components/ui/ArtImage";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Thematic Collections | Craftchirp",
  description:
    "Explore curated folk art exhibitions and thematic series by Rachana Agarwal, bridging ancestral Warli storytelling and Madhubani ritual geometry.",
};

export default function CollectionsIndexPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block">
            Thematic Curations
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2d2a26] leading-tight">
            Curated Collections <br />
            <span className="italic text-brand-clay font-medium">& Heritage Series</span>
          </h1>
          <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
            Our artworks are conceived in thematic bodies of work, honoring specific tribal ceremonies, agricultural cycles, and organic mineral alchemies.
          </p>
        </div>

        <div className="space-y-16">
          {COLLECTIONS_SEED.map((col, index) => {
            const count = col.artworkIds.length;
            const previewWorks = ARTWORKS_SEED.filter((a) => col.artworkIds.includes(a.id)).slice(0, 3);

            return (
              <article
                key={col.id}
                className="bg-white border border-brand-sand rounded-xs overflow-hidden p-8 sm:p-12 shadow-[0_4px_25px_rgba(45,42,38,0.04)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-clay">
                      Series 0{index + 1} • {count} Original Work{count > 1 ? "s" : ""}
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#2d2a26]">
                      <Link href={`/collections/${col.slug}`} className="hover:text-brand-clay transition-colors">
                        {col.title}
                      </Link>
                    </h2>
                    <p className="font-serif italic text-brand-terracotta text-sm">
                      {col.subtitle}
                    </p>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {col.curatorialStatement}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/collections/${col.slug}`}
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors border-b border-brand-clay/30 pb-1"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Thumbnail Previews */}
                  <div className="lg:col-span-7 grid grid-cols-3 gap-3">
                    {previewWorks.map((work) => (
                      <Link
                        key={work.id}
                        href={`/art/${work.slug}`}
                        className="group block relative overflow-hidden rounded-xs border border-brand-sand/50"
                      >
                        <ArtImage
                          src={work.images[0].url}
                          alt={work.title}
                          aspectRatio="square"
                          className="transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="p-2 bg-white">
                          <h4 className="font-serif text-[11px] font-bold text-[#2d2a26] truncate">{work.title}</h4>
                          <span className="text-[10px] text-gray-500 font-sans">${work.pricePerCurrency.USD.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
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

