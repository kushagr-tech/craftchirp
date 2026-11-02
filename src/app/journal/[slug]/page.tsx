import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { JOURNAL_POSTS } from "@/data/journal";
import { RACHANA_AGARWAL, ARTWORKS_SEED } from "@/data/catalogue";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles } from "lucide-react";

interface JournalPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found | Craftchirp Journal" };
  }

  return {
    title: `${post.title} | Craftchirp Journal`,
    description: post.excerpt,
    authors: [{ name: post.author, url: `https://craftchirp.com/artists/${RACHANA_AGARWAL.slug}` }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.coverImage, alt: post.title }],
    },
  };
}

export default async function JournalArticlePage({ params }: JournalPageProps) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related artworks
  const relatedArtworks = ARTWORKS_SEED.slice(0, 3);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/journal"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-8 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Journal Index</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-10">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-wider text-brand-terracotta font-semibold">
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-gray-500 font-normal">
              <Clock size={12} />
              <span>{post.readingTimeMinutes} min read</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-gray-500 font-normal">
              <Calendar size={12} />
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d2a26] leading-tight">
            {post.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-gray-600 leading-relaxed pt-2">
            "{post.excerpt}"
          </p>

          {/* Author Byline */}
          <div className="flex items-center space-x-3 pt-4 border-t border-brand-sand/50">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-sand flex-shrink-0">
              <img
                src={RACHANA_AGARWAL.avatarUrl}
                alt={RACHANA_AGARWAL.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-sans">
              <span className="font-semibold text-[#2d2a26] block">
                <Link href={`/artists/${RACHANA_AGARWAL.slug}`} className="hover:text-brand-clay">
                  {post.author}
                </Link>
              </span>
              <span className="text-gray-500 text-[11px]">
                Folk Artist & Founder of Craftchirp • 15+ Years Practice
              </span>
            </div>
          </div>
        </header>

        {/* Featured Banner Image */}
        <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden bg-brand-sand shadow-lg mb-12 border border-brand-sand">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-stone max-w-none text-gray-800 font-sans leading-relaxed space-y-6 text-base sm:text-lg">
          <div className="whitespace-pre-line">
            {post.content}
          </div>
        </article>

        {/* Author Bio Callout */}
        <div className="mt-16 p-8 bg-white border border-brand-sand rounded-xs flex flex-col sm:flex-row items-center gap-6 shadow-xs">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-brand-sand flex-shrink-0">
            <img
              src={RACHANA_AGARWAL.avatarUrl}
              alt={RACHANA_AGARWAL.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left space-y-1 text-xs font-sans">
            <span className="text-[10px] uppercase tracking-wider text-brand-terracotta font-semibold">About the Author</span>
            <h4 className="font-serif text-xl font-bold text-[#2d2a26]">{RACHANA_AGARWAL.name}</h4>
            <p className="text-gray-600 leading-relaxed">
              Rachana has spent over 15 years mastering and modernizing Warli tribal and Madhubani ritual art. All writings are grounded in studio research, natural material foraging, and ancestral preservation.
            </p>
            <Link
              href={`/artists/${RACHANA_AGARWAL.slug}`}
              className="inline-block pt-1 font-semibold text-brand-clay hover:underline"
            >
              View Rachana's Artist Profile & Portfolio →
            </Link>
          </div>
        </div>

        {/* Explore Related Works */}
        <section className="mt-20 pt-16 border-t border-brand-sand">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-brand-terracotta font-semibold block mb-1">
                From the Studio
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2a26]">
                Featured Original Creations
              </h3>
            </div>
            <Link
              href="/gallery"
              className="text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta"
            >
              Full Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArtworks.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

