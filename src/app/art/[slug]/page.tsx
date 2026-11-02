import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ARTWORKS_SEED, RACHANA_AGARWAL } from "@/data/catalogue";
import { ArtworkGallery } from "@/components/artwork/ArtworkGallery";
import { ArtworkCommerceActions } from "@/components/artwork/ArtworkCommerceActions";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { ArtworkJsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft, Sparkles, Feather, ShieldCheck, SunMedium, FileText, CheckCircle2 } from "lucide-react";

interface ArtworkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTWORKS_SEED.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = ARTWORKS_SEED.find((a) => a.slug === slug);

  if (!artwork) {
    return { title: "Artwork Not Found | Craftchirp" };
  }

  const primaryImage = artwork.images.find((img) => img.isPrimary) || artwork.images[0];

  return {
    title: `${artwork.title} — Original ${artwork.style} Folk Art by Rachana Agarwal`,
    description: `${artwork.title}: 1-of-1 original ${artwork.style} folk art handcrafted on MDF using natural cow-dung base and earth pigments. Includes signed Certificate of Authenticity.`,
    keywords: [
      `${artwork.title}`,
      `original ${artwork.style} art`,
      "Rachana Agarwal original painting",
      "cow dung mud art",
      "natural earth pigment painting",
      "sustainable Indian folk art",
    ],
    openGraph: {
      title: `${artwork.title} | Craftchirp Original Folk Art`,
      description: `${artwork.dimensions.widthCm}x${artwork.dimensions.heightCm} cm original ${artwork.style} painting by Rachana Agarwal.`,
      images: [
        {
          url: primaryImage.url,
          width: primaryImage.width,
          height: primaryImage.height,
          alt: primaryImage.alt,
        },
      ],
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = ARTWORKS_SEED.find((a) => a.slug === slug);

  if (!artwork) {
    notFound();
  }

  // Related artworks
  const relatedArtworks = ARTWORKS_SEED.filter(
    (a) => a.id !== artwork.id && (a.style === artwork.style || a.type === artwork.type)
  ).slice(0, 3);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <ArtworkJsonLd artwork={artwork} artist={RACHANA_AGARWAL} />
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500">
          <Link href="/gallery" className="hover:text-brand-clay transition-colors flex items-center space-x-1">
            <ArrowLeft size={13} />
            <span>Gallery</span>
          </Link>
          <span>/</span>
          <span className="text-gray-400">{artwork.style}</span>
          <span>/</span>
          <span className="text-[#2d2a26] font-medium truncate max-w-xs">{artwork.title}</span>
        </nav>

        {/* 2-Column Primary Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Gallery & Texture Magnifier */}
          <div className="lg:col-span-7">
            <ArtworkGallery images={artwork.images} title={artwork.title} />
          </div>

          {/* Right Column: Museum Label & Collector Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Museum Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-terracotta">
                  {artwork.style} Folk Tradition
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  {artwork.year}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2a26] leading-tight mb-3">
                {artwork.title}
              </h1>

              <p className="text-sm text-gray-600 font-sans">
                By{" "}
                <Link
                  href={`/artists/${RACHANA_AGARWAL.slug}`}
                  className="font-medium text-brand-clay hover:text-brand-terracotta underline underline-offset-2 transition-colors"
                >
                  Rachana Agarwal
                </Link>
                <span className="text-xs text-gray-400 ml-2">(15+ Years Folk Practice)</span>
              </p>
            </div>

            {/* Museum Label Technical Specifications Block */}
            <div className="bg-brand-sand/25 border border-brand-sand/70 p-5 rounded-xs space-y-3 font-sans text-xs">
              <div className="flex justify-between pb-2 border-b border-brand-sand/50">
                <span className="text-gray-500 uppercase tracking-wider">Classification</span>
                <span className="font-semibold text-[#2d2a26]">
                  {artwork.edition === "original" ? "1-of-1 Unique Original" : "Limited Edition"}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-brand-sand/50">
                <span className="text-gray-500 uppercase tracking-wider">Surface & Base</span>
                <span className="font-medium text-[#2d2a26] text-right max-w-[65%]">
                  Purified cow-dung & alluvial clay ground on MDF
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-brand-sand/50">
                <span className="text-gray-500 uppercase tracking-wider">Pigments</span>
                <span className="font-medium text-[#2d2a26] text-right max-w-[65%]">
                  Natural white rice paste, soot charcoal, red earth
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-brand-sand/50">
                <span className="text-gray-500 uppercase tracking-wider">Dimensions</span>
                <span className="font-medium text-[#2d2a26]">
                  {artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} cm
                  {" · "}
                  {artwork.dimensions.widthInches} × {artwork.dimensions.heightInches} in
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-brand-sand/50">
                <span className="text-gray-500 uppercase tracking-wider">Weight</span>
                <span className="font-medium text-[#2d2a26]">
                  {artwork.weightGrams} g (Packaged: {artwork.packagedWeightGrams} g)
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-wider">Framing & Display</span>
                <span className="font-medium text-[#2d2a26]">
                  {artwork.framed ? "Custom framed" : "Unframed; pre-installed brass hanging hardware"}
                </span>
              </div>
            </div>

            {/* Commerce & Reservation Actions */}
            <ArtworkCommerceActions artwork={artwork} />

          </div>

        </div>

        {/* Deep Storytelling Section: Karigari Ki Kahani */}
        <section className="mt-28 pt-20 border-t border-brand-sand/80 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
              Karigari Ki Kahani • The Provenance Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d2a26]">
              Symbolism, Soil & Human Touch
            </h2>
          </div>

          <div className="prose prose-stone max-w-none text-gray-700 font-sans leading-relaxed space-y-6 text-base md:text-lg">
            <p className="first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-brand-clay first-letter:font-bold">
              {artwork.story}
            </p>
            <p>
              Unlike mass manufactured wall décor or modern chemical acrylics on canvas, this artwork begins with the organic alchemy of the soil. In the ancestral villages of Western India, mud and cow-dung plastering is not considered humble; it is sacred. The surface acts as a natural purifier and spiritual canvas that connects daily existence with the cosmic cycle.
            </p>
          </div>

          {/* 4-Step Crafting Journey */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-12 border-t border-brand-sand/50">
            <div className="bg-white p-6 rounded-xs border border-brand-sand/50">
              <SunMedium className="text-brand-clay mb-3" size={24} />
              <h4 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">1. Purification & Curing</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Raw cow dung and clay are triple-strained and sun-cured over 7 days, eliminating all moisture and organic scent, leaving a clean, odorless earthy surface.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xs border border-brand-sand/50">
              <Feather className="text-brand-terracotta mb-3" size={24} />
              <h4 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">2. Single-Reed Brushwork</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Using carved bamboo reeds, Rachana applies microscopic strokes of rice flour paste mixed with acacia gum, creating textured geometric rhythms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xs border border-brand-sand/50">
              <Sparkles className="text-brand-olive mb-3" size={24} />
              <h4 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">3. Matte Natural Seal</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                A breathable organic beeswax and plant-gum sealant is hand-buffed to lock in the pigment without creating an artificial plastic sheen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xs border border-brand-sand/50">
              <ShieldCheck className="text-brand-clay mb-3" size={24} />
              <h4 className="font-serif text-lg font-bold text-[#2d2a26] mb-1">4. Custom Wood Crating</h4>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Each rigid MDF board is packed with corner shock-guards, moisture barrier wrap, and custom crating for safe international transit.
              </p>
            </div>
          </div>

          {/* Care & Display Guide */}
          <div className="mt-16 bg-brand-sand/30 p-8 rounded-xs border border-brand-sand/80">
            <h3 className="font-serif text-xl font-bold text-[#2d2a26] mb-3">Care & Conservation in Modern Sanctuaries</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-sans mb-4">
              Your Craftchirp piece is cured for longevity. To preserve the vibrant mineral pigments and organic mud texture for generations:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 font-sans list-disc list-inside">
              <li>Display indoors away from direct continuous harsh sunlight.</li>
              <li>Avoid humid environments like enclosed steamy bathrooms.</li>
              <li>Dust gently using a dry, soft-bristle goat-hair brush or microfibre cloth.</li>
              <li>Never use chemical aerosol cleaners or wet wiping.</li>
            </ul>
          </div>

          {/* Structured Facts Block for Collectors & AI Assistants */}
          <div className="mt-16 bg-white p-8 rounded-xs border border-brand-sand/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-brand-sand/60 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-clay block">
                  Catalog Specifications & Entity Facts
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2d2a26]">
                  Verified Artwork Data Sheet
                </h3>
              </div>
              <Link
                href={`/art/${artwork.slug}.md`}
                target="_blank"
                className="inline-flex items-center space-x-1.5 text-xs text-brand-clay hover:text-brand-terracotta transition-colors font-medium border border-brand-sand px-3 py-1.5 rounded-xs"
              >
                <FileText size={13} />
                <span>Raw Markdown for LLMs & AI Agents</span>
              </Link>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs font-sans">
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Artist / Creator</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">Rachana Agarwal (Craftchirp Founder, 15+ years experience)</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Indigenous Folk Style</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">{artwork.style} Folk Art (Indian Heritage Tradition)</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Primary Base Medium</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">Purified cow-dung & riverbed mud ground on moisture-sealed MDF</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Pigments & Binder</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">Sun-cured rice flour paste, soot charcoal, red earth, acacia gum</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Metric Dimensions</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">{artwork.dimensions.widthCm} cm (W) × {artwork.dimensions.heightCm} cm (H){artwork.dimensions.depthCm ? ` × ${artwork.dimensions.depthCm} cm (D)` : ''}</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Imperial Dimensions</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">{artwork.dimensions.widthInches} in (W) × {artwork.dimensions.heightInches} in (H)</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Item Weight / Packaged</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">{artwork.weightGrams} g net / {artwork.packagedWeightGrams} g securely boxed</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">International HS Tariff Code</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">{artwork.hsCode} (Original Paintings, Drawings executed entirely by hand)</dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Authenticity Guarantee</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5 flex items-center space-x-1">
                  <CheckCircle2 size={13} className="text-brand-clay flex-shrink-0" />
                  <span>Physical Certificate of Authenticity signed by Rachana Agarwal</span>
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 uppercase tracking-wider text-[10px]">Global Freight Logistics</dt>
                <dd className="font-medium text-[#2d2a26] mt-0.5">Tracked Express Courier (DHL / FedEx) • Delivered Duty Paid (DDP)</dd>
              </div>
            </dl>
          </div>

          {/* Artist Vignette */}
          <div className="mt-16 p-8 bg-white border border-brand-sand rounded-xs flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-brand-sand flex-shrink-0 relative">
              <img
                src={RACHANA_AGARWAL.avatarUrl}
                alt={RACHANA_AGARWAL.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-clay">
                About the Maker
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2d2a26] mb-1">
                {RACHANA_AGARWAL.name}
              </h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed mb-3">
                {RACHANA_AGARWAL.bio}
              </p>
              <Link
                href={`/artists/${RACHANA_AGARWAL.slug}`}
                className="text-xs uppercase tracking-widest font-semibold text-brand-terracotta hover:text-brand-clay transition-colors"
              >
                Read Artist Profile & Heritage Statement →
              </Link>
            </div>
          </div>
        </section>

        {/* Related Works Grid */}
        {relatedArtworks.length > 0 && (
          <section className="mt-28 pt-20 border-t border-brand-sand/80">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-terracotta block mb-1">
                  Discover More
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#2d2a26]">
                  Related Original Works
                </h3>
              </div>
              <Link
                href="/gallery"
                className="text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors"
              >
                View Full Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArtworks.map((related) => (
                <ArtworkCard key={related.id} artwork={related} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

