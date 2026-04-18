import Image from "next/image";
import { Leaf, Flame, Heart } from "lucide-react";

export const metadata = {
  title: "About CraftChirp",
  description: "Learn about the passion, sustainability, and traditional roots behind CraftChirp Creations.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-foreground">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-terracotta uppercase tracking-[0.2em] font-semibold text-sm mb-4 block">
            Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-[#2d2a26]">
            Preserving <span className="italic text-brand-clay">Heritage</span>.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-sans leading-relaxed">
            What began as a deep appreciation for the earth has grown into a mission to bring sustainable, beautiful mud art into modern homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[60vh] rounded-sm overflow-hidden shadow-xl">
            <Image
              src="/assets/process_texture_1776498601479.png"
              alt="Artisan working on mud art"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2d2a26]">
              A Passion for <span className="text-brand-clay italic">Sustainability</span>
            </h2>
            <p className="text-gray-600 leading-relaxed font-sans text-lg">
              CraftChirp Creations was born from the desire to create art that doesn't harm the planet. We looked to ancient Indian traditions where homes were adorned with natural mud and cow dung—materials that are abundant, biodegradable, and inherently beautiful.
            </p>
            <p className="text-gray-600 leading-relaxed font-sans text-lg">
              By refining these traditional techniques, we've developed a rigorous process that eliminates odor, increases durability, and allows for intricate, contemporary designs. The result is eco-luxury décor that grounds your space.
            </p>
            
            <div className="pt-8 border-t border-brand-sand grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Leaf className="text-brand-olive mb-3" size={32} />
                <h4 className="font-serif font-bold text-[#2d2a26] mb-1">Eco-Friendly</h4>
                <p className="text-sm text-gray-500">100% natural, biodegradable earth materials.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Flame className="text-brand-terracotta mb-3" size={32} />
                <h4 className="font-serif font-bold text-[#2d2a26] mb-1">Sun-Baked</h4>
                <p className="text-sm text-gray-500">Naturally dried without artificial kilns.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Heart className="text-brand-clay mb-3" size={32} />
                <h4 className="font-serif font-bold text-[#2d2a26] mb-1">Handcrafted</h4>
                <p className="text-sm text-gray-500">Every piece touched by human hands.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
