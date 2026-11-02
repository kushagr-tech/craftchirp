'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, RotateCcw, Lock, ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  const [currentPreference, setCurrentPreference] = useState<'all' | 'essential' | 'none'>('essential');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('craftchirp_cookie_consent');
    if (saved === 'all' || saved === 'essential') {
      setCurrentPreference(saved);
    }
  }, []);

  const handleUpdate = (choice: 'all' | 'essential') => {
    localStorage.setItem('craftchirp_cookie_consent', choice);
    setCurrentPreference(choice);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem('craftchirp_cookie_consent');
    setCurrentPreference('none');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-8 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Gallery Sanctuary</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-3">
            Privacy & Technical Settings
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26] leading-tight mb-4">
            Cookie Preferences & Storage Policy
          </h1>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Craftchirp operates on a privacy-first ethos. We collect only what is strictly necessary to hold your 1-of-1 artwork reservations, calculate landed customs duties, and deliver a museum-grade experience.
          </p>
        </header>

        {/* Current State Alert */}
        <div className="bg-white border border-brand-sand/80 p-6 rounded-xs mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">
              Current Setting on This Device
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <CheckCircle2 size={16} className="text-brand-clay" />
              <span className="font-serif text-lg font-bold text-[#2d2a26]">
                {currentPreference === 'all'
                  ? 'All Cookies & Anonymous Analytics Permitted'
                  : currentPreference === 'essential'
                  ? 'Essential Storage Only (Strictly Necessary)'
                  : 'No Preference Stored (Banner will display on visit)'}
              </span>
            </div>
          </div>
          {savedNotice && (
            <span className="text-xs font-semibold text-brand-clay bg-brand-sand/30 px-3 py-1.5 rounded-xs animate-in fade-in duration-200">
              Preferences Saved ✓
            </span>
          )}
        </div>

        {/* Interactive Controls */}
        <div className="bg-white border border-brand-sand/80 p-8 rounded-xs mb-16 space-y-6 shadow-xs font-sans">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            Adjust Your Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Essential Card */}
            <div className="p-6 border border-brand-sand rounded-xs bg-brand-sand/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-bold text-[#2d2a26]">1. Strictly Necessary</h3>
                  <span className="text-[10px] uppercase font-semibold text-brand-clay bg-brand-clay/10 px-2 py-0.5 rounded-xs">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Required for core gallery operations: maintains your 15-minute 1-of-1 artwork reservation during checkout, remembers your preferred currency (USD, EUR, GBP, INR), and keeps your shopping bag active.
                </p>
              </div>
              <button
                onClick={() => handleUpdate('essential')}
                className={`w-full py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors border ${
                  currentPreference === 'essential'
                    ? 'bg-[#2d2a26] text-white border-[#2d2a26]'
                    : 'bg-white text-gray-700 border-brand-sand hover:border-brand-clay'
                }`}
              >
                {currentPreference === 'essential' ? 'Selected (Active)' : 'Choose Essential Only'}
              </button>
            </div>

            {/* All Cookies Card */}
            <div className="p-6 border border-brand-sand rounded-xs bg-brand-sand/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-bold text-[#2d2a26]">2. Anonymous Analytics</h3>
                  <span className="text-[10px] uppercase font-semibold text-brand-terracotta bg-brand-terracotta/10 px-2 py-0.5 rounded-xs">
                    Optional
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Enables aggregated, non-personally identifiable traffic metrics to help Rachana understand which artworks and exhibitions resonate with collectors globally. No third-party ad retargeting.
                </p>
              </div>
              <button
                onClick={() => handleUpdate('all')}
                className={`w-full py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors border ${
                  currentPreference === 'all'
                    ? 'bg-brand-clay text-white border-brand-clay'
                    : 'bg-white text-gray-700 border-brand-sand hover:border-brand-clay'
                }`}
              >
                {currentPreference === 'all' ? 'Selected (Active)' : 'Accept All'}
              </button>
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-brand-clay transition-colors"
            >
              <RotateCcw size={13} />
              <span>Reset all cookie preferences and re-prompt banner</span>
            </button>
          </div>
        </div>

        {/* Detailed Storage Breakdown Table */}
        <section className="bg-white border border-brand-sand/80 p-8 rounded-xs mb-16 space-y-6 font-sans">
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/60">
            Technical Storage Ledger
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-sand/60 text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-semibold">Storage Key / Cookie</th>
                  <th className="py-2.5 font-semibold">Type</th>
                  <th className="py-2.5 font-semibold">Purpose</th>
                  <th className="py-2.5 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sand/30 text-gray-700">
                <tr>
                  <td className="py-3 font-mono font-medium text-brand-clay">craftchirp_cart</td>
                  <td className="py-3">LocalStorage</td>
                  <td className="py-3">Stores active artwork items in cart</td>
                  <td className="py-3">Session / 15 mins</td>
                </tr>
                <tr>
                  <td className="py-3 font-mono font-medium text-brand-clay">craftchirp_currency</td>
                  <td className="py-3">LocalStorage</td>
                  <td className="py-3">Remembers chosen collector currency (USD/EUR/GBP/INR)</td>
                  <td className="py-3">30 Days</td>
                </tr>
                <tr>
                  <td className="py-3 font-mono font-medium text-brand-clay">craftchirp_cookie_consent</td>
                  <td className="py-3">LocalStorage</td>
                  <td className="py-3">Records your consent choice to avoid recurring banners</td>
                  <td className="py-3">1 Year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Zero-Storage Wall Visualizer Guarantee */}
        <div className="bg-brand-sand/30 border border-brand-sand p-6 sm:p-8 rounded-xs space-y-3 font-sans">
          <div className="flex items-center space-x-2.5 text-brand-clay">
            <Lock size={18} />
            <h3 className="font-serif text-lg font-bold text-[#2d2a26]">
              Private Wall Visualizer Guarantee
            </h3>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Our interactive <strong>"See It On Your Wall"</strong> feature operates completely inside your device's browser memory using client-side HTML5 Canvas. Your home interior photographs are <strong>never stored in cookies, local storage, or uploaded to any server or AI model</strong>.
          </p>
          <p className="text-xs text-gray-700 leading-relaxed">
            For full legal disclosures, read our{' '}
            <Link href="/privacy" className="text-brand-clay underline hover:text-brand-terracotta">
              Complete Privacy Notice
            </Link>.
          </p>
        </div>

      </div>
    </div>
  );
}

