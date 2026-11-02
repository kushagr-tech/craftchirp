import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { RACHANA_AGARWAL, ARTWORKS_SEED } from "@/data/catalogue";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { Award, Heart, Sparkles, MapPin, Calendar, ArrowLeft } from "lucide-react";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: RACHANA_AGARWAL.slug }];
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== RACHANA_AGARWAL.slug) {
    return { title: "Artist Not Found | Craftchirp" };
  }

  return {
    title: `${RACHANA_AGARWAL.name} — Folk Artist & Founder of Craftchirp`,
    description: `Discover the 15+ year artistic journey of ${RACHANA_AGARWAL.name}. Preserving ancient Warli and Madhubani traditions using purified cow-dung surfaces and natural earth pigments.`,
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  if (slug !== RACHANA_AGARWAL.slug) {
    notFound();
  }

  const artistWorks = ARTWORKS_SEED.filter((a) => a.artistId === RACHANA_AGARWAL.id);
  const availableWorks = artistWorks.filter((a) => a.status === "available");
  const collectedWorks = artistWorks.filter((a) => a.status === "sold");

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Link */}
        <Link
          href="/gallery"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-10 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Gallery</span>
        </Link>

        {/* Hero Bio Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center pb-20 border-b border-brand-sand">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-sm overflow-hidden border-2 border-brand-sand/80 shadow-xl bg-brand-sand/30">
              <img
                src={RACHANA_AGARWAL.avatarUrl}
                alt={RACHANA_AGARWAL.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-brand-terracotta font-semibold">
              <span className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>{RACHANA_AGARWAL.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{RACHANA_AGARWAL.yearsOfExperience}+ Years of Folk Art Practice</span>
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d2a26]">
              {RACHANA_AGARWAL.name}
            </h1>

            <p className="font-serif text-xl italic text-brand-clay font-medium leading-relaxed">
              "{RACHANA_AGARWAL.statement}"
            </p>

            <p className="text-sm text-gray-600 font-sans leading-relaxed pt-2">
              {RACHANA_AGARWAL.bio}
            </p>

            {/* Quick Stats Badges */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-brand-sand/50 text-center">
              <div className="p-3 bg-brand-sand/20 rounded-xs">
                <span className="font-serif text-2xl font-bold text-[#2d2a26] block">15+</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500">Years Perfecting</span>
              </div>
              <div className="p-3 bg-brand-sand/20 rounded-xs">
                <span className="font-serif text-2xl font-bold text-[#2d2a26] block">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500">Natural Earth Base</span>
              </div>
              <div className="p-3 bg-brand-sand/20 rounded-xs">
                <span className="font-serif text-2xl font-bold text-[#2d2a26] block">1-of-1</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500">Unique Originals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage & Cultural Lineage Section */}
        <section className="py-20 border-b border-brand-sand space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-terracotta block mb-2">
              Artistic Lineage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2d2a26] mb-4">
              Preserving Living Tribal Heritage
            </h2>
            <p className="text-sm text-gray-600 font-sans leading-relaxed">
              {RACHANA_AGARWAL.heritage}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 bg-white border border-brand-sand/60 rounded-xs">
              <Sparkles size={20} className="text-brand-clay mb-3" />
              <h4 className="font-serif text-base font-bold text-[#2d2a26] mb-1">Warli Tribal Roots</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Originating from the North Sahyadri range of Maharashtra. Uses fundamental circles (sun/moon), triangles (mountains/trees), and squares (sacred enclosures).
              </p>
            </div>

            <div className="p-6 bg-white border border-brand-sand/60 rounded-xs">
              <Heart size={20} className="text-brand-terracotta mb-3" />
              <h4 className="font-serif text-base font-bold text-[#2d2a26] mb-1">Madhubani Ritual Geometry</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Practiced by women in the Mithila region of Bihar for thousands of years. Known for double-line hatching (Kachni) and vivid natural mineral fills (Bharni).
              </p>
            </div>

            <div className="p-6 bg-white border border-brand-sand/60 rounded-xs">
              <Award size={20} className="text-brand-olive mb-3" />
              <h4 className="font-serif text-base font-bold text-[#2d2a26] mb-1">Modernized Permanence</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Rachana transitions these temporary village wall ceremonies onto enduring moisture-resistant MDF, rendering them permanent heirlooms for global collectors.
              </p>
            </div>
          </div>
        </section>

        {/* Available Works by Rachana */}
        <section className="py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-terracotta block mb-1">
                Studio Inventory
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#2d2a26]">
                Available Original Works ({availableWorks.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableWorks.map((work) => (
              <ArtworkCard key={work.id} artwork={work} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

