'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('craftchirp_cookie_consent');
    if (!consent) {
      // Short delay before showing banner for graceful entry
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (preference: 'all' | 'essential') => {
    localStorage.setItem('craftchirp_cookie_consent', preference);
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-[#2d2a26] text-brand-offwhite p-5 rounded-xs shadow-2xl border border-brand-sand/30 font-sans text-xs">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-brand-terracotta flex-shrink-0" />
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Privacy & Provenance
            </h4>
          </div>
          <button
            onClick={() => handleChoice('essential')}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss banner with essential cookies only"
          >
            <X size={15} />
          </button>
        </div>

        <p className="text-gray-300 leading-relaxed mb-4">
          We use strictly necessary cookies to power your cart reservation and preferred currency. 
          Wall visualizer photos remain 100% private in your browser memory and are never uploaded.
          Read our{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-2 text-brand-sand hover:text-white transition-colors"
          >
            Privacy Notice
          </Link>.
        </p>

        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => handleChoice('essential')}
            className="px-3 py-1.5 border border-brand-sand/40 text-gray-300 hover:text-white hover:border-white text-[11px] uppercase tracking-wider rounded-xs transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={() => handleChoice('all')}
            className="px-4 py-1.5 bg-brand-clay hover:bg-brand-terracotta text-white font-medium text-[11px] uppercase tracking-wider rounded-xs transition-colors shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}

