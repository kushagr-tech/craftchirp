import Link from "next/link";
import { Mail } from "lucide-react";

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
    <footer className="bg-[#2d2a26] text-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-3xl font-bold text-brand-offwhite mb-4">CraftChirp</h3>
          <p className="text-gray-300 font-sans max-w-sm">
            Handcrafted mud art rooted in traditional Indian techniques, elevated for the modern eco-luxury home.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-serif text-brand-sand mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link href="/gallery" className="hover:text-brand-terracotta transition-colors">
                Our Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-terracotta transition-colors">
                About the Artisan
              </Link>
            </li>
            <li>
              <Link href="/#process" className="hover:text-brand-terracotta transition-colors">
                The Process
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-serif text-brand-sand mb-4 uppercase tracking-wider">Connect</h4>
          <div className="flex space-x-4 mb-6">
            <a
              href="https://www.instagram.com/craftchirp_creations/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-brand-clay hover:border-brand-clay transition-all"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="mailto:craftchirp@gmail.com"
              className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-brand-clay hover:border-brand-clay transition-all"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-400 font-sans">
            Worldwide Shipping • Zero Chemicals • 100% Handcrafted
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-700 text-center text-sm text-gray-400 font-sans">
        © {new Date().getFullYear()} CraftChirp Creations. All rights reserved.
      </div>
    </footer>
  );
}
