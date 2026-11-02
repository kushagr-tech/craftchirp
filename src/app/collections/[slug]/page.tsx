import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { COLLECTIONS_SEED, ARTWORKS_SEED } from "@/data/catalogue";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { ArrowLeft, Sparkles } from "lucide-react";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS_SEED.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS_SEED.find((c) => c.slug === slug);

  if (!collection) {
    return { title: "Collection Not Found | Craftchirp" };
  }

  return {
    title: `${collection.title} | Curated Folk Art Collection`,
    description: collection.curatorialStatement,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS_SEED.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const collectionArtworks = ARTWORKS_SEED.filter((a) =>
    collection.artworkIds.includes(a.id)
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back navigation */}
        <Link
          href="/collections"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-8 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to All Collections</span>
        </Link>

        {/* Curatorial Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-terracotta">
            <Sparkles size={13} />
            <span>Curated Thematic Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d2a26] leading-tight">
            {collection.title}
          </h1>

          <p className="font-serif text-xl italic text-brand-clay font-medium leading-relaxed">
            {collection.subtitle}
          </p>

          <p className="text-sm text-gray-600 font-sans leading-relaxed pt-2">
            {collection.curatorialStatement}
          </p>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {/* Explore other collections */}
        <div className="mt-24 pt-16 border-t border-brand-sand flex justify-between items-center">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#2d2a26]">Explore Other Themes</h4>
            <p className="text-xs text-gray-500 font-sans">Discover more original works from our studio</p>
          </div>
          <Link
            href="/gallery"
            className="text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors"
          >
            All Works & Themes →
          </Link>
        </div>

      </div>
    </div>
  );
}

