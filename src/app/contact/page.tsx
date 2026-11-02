'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { RACHANA_AGARWAL } from '@/data/catalogue';
import { AdminStore } from '@/lib/admin/admin-store';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Custom Commission',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    AdminStore.addInquiry({
      source: 'contact_form',
      name: formData.name,
      email: formData.email,
      country: 'Global Contact Desk',
      subject: formData.subject,
      message: formData.message,
    });
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-foreground">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div>
            <span className="text-brand-terracotta uppercase tracking-[0.2em] font-semibold text-sm mb-4 block">
              Bespoke Inquiries & Commissions
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#2d2a26]">
              Let's Create <span className="italic text-brand-clay">Together</span>
            </h1>
            <p className="text-gray-600 font-sans text-base sm:text-lg mb-10 leading-relaxed">
              Interested in a custom Warli or Madhubani piece tailored to your home sanctuary? Have questions on our natural cow-dung curing process? Rachana Agarwal personally reviews all commissions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand/60 rounded-full flex items-center justify-center text-brand-clay flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2d2a26] mb-0.5">Email the Studio</h4>
                  <a href="mailto:craftchirp@gmail.com" className="text-sm text-gray-600 hover:text-brand-terracotta transition-colors">
                    craftchirp@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand/60 rounded-full flex items-center justify-center text-brand-clay flex-shrink-0">
                  <InstagramIcon size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2d2a26] mb-0.5">Instagram Archive</h4>
                  <a href="https://www.instagram.com/craftchirp_creations/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-brand-terracotta transition-colors">
                    @craftchirp_creations
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand/60 rounded-full flex items-center justify-center text-brand-clay flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2d2a26] mb-0.5">Artisan Studio & Shipping</h4>
                  <p className="text-sm text-gray-600">
                    Maharashtra, India<br />
                    Insured worldwide delivery via DHL Express & FedEx.
                  </p>
                </div>
              </div>
            </div>

            {/* Link to Artist Profile */}
            <div className="mt-10 p-5 bg-white border border-brand-sand/80 rounded-xs">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-clay block mb-1">
                The Founder
              </span>
              <p className="text-xs text-gray-600 font-sans leading-relaxed mb-3">
                Learn more about Rachana's 15+ years of folk art heritage, curatorial exhibitions, and mud alchemy.
              </p>
              <Link
                href={`/artists/${RACHANA_AGARWAL.slug}`}
                className="text-xs uppercase tracking-widest font-semibold text-brand-terracotta hover:text-brand-clay transition-colors"
              >
                Read Artist Profile →
              </Link>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-white p-8 md:p-12 shadow-sm rounded-xs border border-brand-sand/70">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-olive/15 text-brand-olive flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#2d2a26]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-gray-600 font-sans max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your message has been routed to Rachana Agarwal's studio desk. We will respond to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Custom Commission', message: '' });
                    }}
                    className="text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta font-semibold"
                  >
                    Send another message →
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-3xl font-bold text-[#2d2a26] mb-2">Send an Inquiry</h3>
                <p className="text-xs text-gray-500 mb-8 font-sans">
                  We welcome custom dimensions, room consultations, and institutional exhibition queries.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-wider font-medium text-gray-600 mb-1.5 font-sans">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors text-sm"
                        placeholder="Eleanor Vance"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-wider font-medium text-gray-600 mb-1.5 font-sans">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors text-sm"
                        placeholder="eleanor@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-xs uppercase tracking-wider font-medium text-gray-600 mb-1.5 font-sans">Inquiry Subject</label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors text-sm text-gray-700"
                    >
                      <option value="Custom Commission">Custom Commission (Bespoke Sizing)</option>
                      <option value="Available Artwork Inquiry">Available Original Painting Inquiry</option>
                      <option value="Handmade Jewellery">Handmade Terracotta Jewellery</option>
                      <option value="Press / Curatorial Loan">Press / Curatorial Exhibition Loan</option>
                      <option value="General Question">General Question / Care Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider font-medium text-gray-600 mb-1.5 font-sans">Your Message or Space Details</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-clay bg-transparent transition-colors resize-none text-sm"
                      placeholder="Tell us about your room sanctuary, desired dimensions, or ceremonial theme..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-clay text-white py-4 font-semibold tracking-widest uppercase text-xs hover:bg-brand-terracotta transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <span>{submitting ? 'Sending...' : 'Send Studio Inquiry'}</span>
                    <Send size={13} />
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
