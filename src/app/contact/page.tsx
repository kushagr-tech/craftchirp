import { Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact & Commissions",
  description: "Get in touch for custom handmade mud art commissions or inquiries.",
};

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

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-foreground">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div>
            <span className="text-brand-terracotta uppercase tracking-[0.2em] font-semibold text-sm mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#2d2a26]">
              Let's Create <span className="italic text-brand-clay">Together</span>
            </h1>
            <p className="text-gray-600 font-sans text-lg mb-12">
              Interested in a custom piece for your sanctuary? Have questions about our process? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand rounded-full flex items-center justify-center text-brand-clay flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#2d2a26] mb-1">Email Us</h4>
                  <a href="mailto:craftchirp@gmail.com" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                    craftchirp@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand rounded-full flex items-center justify-center text-brand-clay flex-shrink-0">
                  <InstagramIcon size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#2d2a26] mb-1">Instagram</h4>
                  <a href="https://www.instagram.com/craftchirp_creations/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                    @craftchirp_creations
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand rounded-full flex items-center justify-center text-brand-clay flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#2d2a26] mb-1">Studio</h4>
                  <p className="text-gray-600">
                    Worldwide Shipping<br />
                    Available globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
            <h3 className="font-serif text-3xl font-bold text-[#2d2a26] mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-sans">Name</label>
                  <input type="text" id="name" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-sans">Email</label>
                  <input type="email" id="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors" placeholder="jane@example.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-sans">Inquiry Type</label>
                <select id="subject" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors text-gray-600">
                  <option>Custom Commission</option>
                  <option>Available Artwork Inquiry</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-sans">Message</label>
                <textarea id="message" rows={4} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors resize-none" placeholder="Tell us about your space..."></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-clay text-white py-4 font-medium tracking-widest uppercase hover:bg-brand-terracotta transition-colors mt-4">
                Send Inquiry
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
