import Link from "next/link";
import { Mail, ShieldCheck, Award, Truck, Sparkles } from "lucide-react";

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#2d2a26] text-white pt-20 pb-12 border-t border-brand-sand/20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b border-white/10 text-brand-sand">
          <div className="flex items-center space-x-3">
            <Award size={24} className="text-brand-clay flex-shrink-0" />
            <div>
              <h5 className="font-serif text-sm font-bold text-brand-offwhite">1-of-1 Originals</h5>
              <p className="text-[11px] text-gray-400">Signed Certificate of Authenticity</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Sparkles size={24} className="text-brand-terracotta flex-shrink-0" />
            <div>
              <h5 className="font-serif text-sm font-bold text-brand-offwhite">Purified Cow-Dung Base</h5>
              <p className="text-[11px] text-gray-400">100% Odorless & Sun-Cured</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Truck size={24} className="text-brand-sand flex-shrink-0" />
            <div>
              <h5 className="font-serif text-sm font-bold text-brand-offwhite">Insured Global Air Freight</h5>
              <p className="text-[11px] text-gray-400">Custom rigid crating for MDF</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck size={24} className="text-brand-olive flex-shrink-0" />
            <div>
              <h5 className="font-serif text-sm font-bold text-brand-offwhite">Clear Landed Costs</h5>
              <p className="text-[11px] text-gray-400">Transparent duties & tax handling</p>
            </div>
          </div>
        </div>

        {/* 4-Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          
          {/* Brand Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold text-brand-offwhite tracking-wide">
                Craftchirp
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Founded by solo artisan Rachana Agarwal. Preserving 15+ years of Indian folk art tradition through hand-painted Warli and Madhubani originals on MDF with authentic natural cow-dung base and earth pigments.
            </p>
            <div className="pt-2 flex space-x-3">
              <a
                href="https://www.instagram.com/craftchirp_creations/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-brand-sand hover:text-brand-offwhite hover:bg-brand-clay hover:border-brand-clay transition-all"
                aria-label="Instagram profile"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:craftchirp@gmail.com"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-brand-sand hover:text-brand-offwhite hover:bg-brand-clay hover:border-brand-clay transition-all"
                aria-label="Email inquiry"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-brand-sand font-semibold mb-5">
              The Gallery
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-300">
              <li><Link href="/gallery" className="hover:text-brand-terracotta transition-colors">Original Paintings</Link></li>
              <li><Link href="/collections" className="hover:text-brand-terracotta transition-colors">Curated Collections</Link></li>
              <li><Link href="/exhibitions" className="hover:text-brand-terracotta transition-colors">Virtual Exhibitions</Link></li>
              <li><Link href="/jewellery" className="hover:text-brand-terracotta transition-colors">Handmade Jewellery</Link></li>
              <li><Link href="/journal" className="hover:text-brand-terracotta transition-colors">The Journal</Link></li>
            </ul>
          </div>

          {/* Collector Services */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-brand-sand font-semibold mb-5">
              Collector Care
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-300">
              <li><Link href="/about" className="hover:text-brand-terracotta transition-colors">About Rachana Agarwal</Link></li>
              <li><Link href="/shipping-duties" className="hover:text-brand-terracotta transition-colors">Shipping & Customs</Link></li>
              <li><Link href="/authenticity" className="hover:text-brand-terracotta transition-colors">Authenticity Guarantee</Link></li>
              <li><Link href="/care-guide" className="hover:text-brand-terracotta transition-colors">Care & Installation</Link></li>
              <li><Link href="/returns" className="hover:text-brand-terracotta transition-colors">14-Day Returns</Link></li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-brand-sand font-semibold mb-5">
              Legal & Region
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-300">
              <li><Link href="/privacy" className="hover:text-brand-terracotta transition-colors">Privacy Policy (GDPR)</Link></li>
              <li><Link href="/terms" className="hover:text-brand-terracotta transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-terracotta transition-colors">Cookie Preferences</Link></li>
              <li><Link href="/contact" className="hover:text-brand-terracotta transition-colors">Bespoke Commissions</Link></li>
              <li><Link href="/ru/inquiry" className="hover:text-brand-terracotta transition-colors text-gray-400">Запросы из России (Inquiries)</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Craftchirp Creations by Rachana Agarwal. All rights reserved.</p>
          <p className="text-[11px] tracking-wide text-gray-400">
            Natural Earth Pigments • Traditional Cow-Dung Preparation • Insured Worldwide Delivery
          </p>
        </div>

      </div>
    </footer>
  );
}
