import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { JOURNAL_POSTS } from "@/data/journal";
import { RACHANA_AGARWAL } from "@/data/catalogue";
import { Clock, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "The Journal • Folk Art Traditions & Living Heritage | Craftchirp",
  description:
    "In-depth curatorial guides on Warli tribal history, Madhubani ritual geometry, mud art conservation, and contemporary styling by artist Rachana Agarwal.",
};

export default function JournalIndexPage() {
  const featuredPost = JOURNAL_POSTS[0];
  const otherPosts = JOURNAL_POSTS.slice(1);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block">
            Craftchirp Journal • Karigari & Heritage
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#2d2a26] leading-tight">
            Stories of the Earth, <br />
            <span className="italic text-brand-clay font-medium">Symbols & Conservation</span>
          </h1>
          <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
            Written directly by artist-founder Rachana Agarwal. Exploring 15+ years of folk art research, ancestral tribal philosophy, and practical advice for art collectors.
          </p>
        </div>

        {/* Featured Editorial Story */}
        <article className="bg-white border border-brand-sand rounded-xs overflow-hidden shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px]">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-brand-clay text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-xs">
                Featured Story
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-xs uppercase tracking-wider text-gray-400 mb-2 font-sans">
                  <span className="text-brand-terracotta font-semibold">{featuredPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{featuredPost.readingTimeMinutes} min read</span>
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2a26] leading-snug">
                  <Link href={`/journal/${featuredPost.slug}`} className="hover:text-brand-clay transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-xs text-gray-600 font-sans leading-relaxed pt-2 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-sand/60 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-sans">
                  By {featuredPost.author}
                </span>
                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-brand-clay hover:text-brand-terracotta transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-brand-sand/70 rounded-xs overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-sand">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-gray-400 font-sans">
                    <span className="text-brand-clay font-bold">{post.category}</span>
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2d2a26] leading-snug">
                    <Link href={`/journal/${post.slug}`} className="hover:text-brand-clay transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-gray-600 font-sans line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-sand/30 flex justify-between items-center text-xs">
                <span className="text-[11px] text-gray-400 font-sans">Rachana Agarwal</span>
                <Link
                  href={`/journal/${post.slug}`}
                  className="text-brand-clay hover:text-brand-terracotta font-semibold uppercase tracking-wider text-[11px]"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

