import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { EXHIBITIONS_SEED, ARTWORKS_SEED, RACHANA_AGARWAL } from "@/data/catalogue";
import { ExhibitionWall } from "@/components/exhibition/ExhibitionWall";
import { AudioGuidePlayer } from "@/components/exhibition/AudioGuidePlayer";
import { ArrowLeft, Sparkles, Volume2, Award, Calendar } from "lucide-react";

interface ExhibitionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXHIBITIONS_SEED.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}

export async function generateMetadata({ params }: ExhibitionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = EXHIBITIONS_SEED.find((e) => e.slug === slug);

  if (!exhibition) {
    return { title: "Exhibition Not Found | Craftchirp" };
  }

  return {
    title: `${exhibition.title} — Virtual Folk Art Exhibition`,
    description: exhibition.curatorialNote,
  };
}

export default async function ExhibitionPage({ params }: ExhibitionPageProps) {
  const { slug } = await params;
  const exhibition = EXHIBITIONS_SEED.find((e) => e.slug === slug);

  if (!exhibition) {
    notFound();
  }

  // Curated exhibition artworks
  const wall1Artwork = ARTWORKS_SEED.find((a) => a.id === "art-001") || ARTWORKS_SEED[0];
  const wall2Artwork = ARTWORKS_SEED.find((a) => a.id === "art-002") || ARTWORKS_SEED[1];
  const wall3Artwork = ARTWORKS_SEED.find((a) => a.id === "art-004") || ARTWORKS_SEED[2];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      
      {/* Curatorial Entrance Foyer */}
      <div className="container mx-auto px-6 max-w-4xl pt-8 pb-16 text-center">
        <Link
          href="/exhibitions"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-8 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Exit to Exhibitions Salon</span>
        </Link>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
          Virtual Salon • Craftchirp Curations
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#2d2a26] leading-tight mb-4">
          {exhibition.title}
        </h1>

        <p className="font-serif text-xl sm:text-2xl italic text-brand-clay font-medium mb-6">
          {exhibition.theme}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-wider text-gray-500 mb-8 font-sans">
          <span>Solo Artist: Rachana Agarwal</span>
          <span>•</span>
          <span>On View Globally</span>
          <span>•</span>
          <span>Curator: Craftchirp Studio</span>
        </div>

        <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed max-w-2xl mx-auto">
          {exhibition.curatorialNote}
        </p>

        {/* Audio Guide Player */}
        <AudioGuidePlayer
          title="Curator & Artist Introduction: Soil, Memory & Sacred Geometry"
          artistName="Rachana Agarwal"
          durationString="3:40"
          transcript="Welcome to Stories of the Soil. For over 15 years, my hands have returned to cow-dung, alluvial clay, and ground rice paste. In Warli thought, everything is connected. When you observe these walls, notice that there are no sharp industrial angles. The spiral of the Tarpa mirrors the sun, our breath, and our return to earth."
        />
      </div>

      {/* Exhibition Wall I: The Cosmic Spiral */}
      <ExhibitionWall
        wallNumber="I"
        themeTitle="The Cosmic Spiral: Tarpa & Seasonal Rhythms"
        wallStatement="The spiral is not simply a decorative geometry; it is the tribal universe unfolding. Men and women dance hand-in-hand without beginning or end, celebrating the winter paddy harvest."
        artwork={wall1Artwork}
      />

      {/* Exhibition Wall II: The Ancestral Canopy */}
      <ExhibitionWall
        wallNumber="II"
        themeTitle="The Ancestral Canopy: Trees as Spiritual Anchors"
        wallStatement="In folk consciousness, trees are sanctuaries that bridge the mortal soil with celestial birds. Painted using single-reed bamboo tools over sun-cured mud surfaces."
        artwork={wall2Artwork}
        reversed
      />

      {/* Exhibition Wall III: The Community Rhythms */}
      <ExhibitionWall
        wallNumber="III"
        themeTitle="Community Harmony: Daily Ceremonies & Harvest"
        wallStatement="A panoramic monument to agricultural labor. Grain winnowing, village pathways, and bullock carts rendered in disciplined monochrome rice flour pigment."
        artwork={wall3Artwork}
      />

      {/* Colophon & Concluding Curatorial Statement */}
      <div className="container mx-auto px-6 max-w-3xl pt-24 text-center space-y-6">
        <Sparkles size={28} className="mx-auto text-brand-clay" />
        <h3 className="font-serif text-3xl font-bold text-[#2d2a26]">
          Exhibition Colophon
        </h3>
        <p className="text-xs text-gray-600 font-sans leading-relaxed max-w-xl mx-auto">
          All featured works are singular 1-of-1 originals executed on moisture-resistant high-density MDF boards. Prepared with triple-purified cow-dung and mineral earth slip. Each original includes a registered Certificate of Authenticity signed by Rachana Agarwal.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/gallery"
            className="px-8 py-3.5 bg-brand-clay text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-terracotta transition-colors"
          >
            Browse Full Permanent Gallery
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-brand-clay text-brand-clay text-xs uppercase tracking-widest font-semibold hover:bg-brand-sand/30 transition-colors"
          >
            Inquire About Private Acquisitions
          </Link>
        </div>
      </div>

    </div>
  );
}

