"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartStore, CartState } from "@/lib/commerce/cart-store";
import { LandedCostEngine } from "@/lib/commerce/landed-cost";
import { ARTWORKS_SEED } from "@/data/catalogue";
import { Clock, ShieldCheck, ArrowRight, Trash2, Globe, AlertTriangle } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<CartState | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    const currentCart = CartStore.get();
    // If empty in dev, default to first artwork so user can test the flow immediately
    if (!currentCart.item && ARTWORKS_SEED.length > 0) {
      const seeded = CartStore.setItem(ARTWORKS_SEED[0], "USD", 15);
      setCart(seeded);
    } else {
      setCart(currentCart);
      if (currentCart.destinationCountry) {
        setSelectedCountry(currentCart.destinationCountry);
      }
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!cart?.expiresAt) return;

    const interval = setInterval(() => {
      const remaining = CartStore.getRemainingSeconds(cart.expiresAt);
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cart]);

  if (!cart?.item) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] bg-brand-offwhite text-[#2d2a26] flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white border border-brand-sand rounded-xs">
          <h2 className="font-serif text-3xl font-bold mb-3">Your Bag is Empty</h2>
          <p className="text-sm text-gray-600 font-sans mb-6">
            Explore our curated 1-of-1 original folk paintings and handmade clay jewellery.
          </p>
          <Link
            href="/gallery"
            className="px-6 py-3 bg-brand-clay text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-terracotta transition-colors inline-block"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    );
  }

  const artwork = cart.item;
  const currency = cart.currency;
  const itemPrice = artwork.pricePerCurrency[currency] || artwork.pricePerCurrency.USD;

  // Landed cost calculation
  const landedCalculation = LandedCostEngine.calculate(
    selectedCountry,
    [
      {
        id: artwork.id,
        title: artwork.title,
        price: itemPrice,
        currency,
        hsCode: artwork.hsCode,
        packagedWeightGrams: artwork.packagedWeightGrams,
        packagedDimensions: artwork.packagedDimensions,
      },
    ],
    currency
  );

  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header & Timed Hold Notification */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-sand/60">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-1">
                Art Acquisition Bag
              </span>
              <h1 className="font-serif text-4xl font-bold text-[#2d2a26]">
                Review Your Reservation
              </h1>
            </div>

            {/* Active Hold Pill */}
            <div className="flex items-center space-x-2 bg-brand-sand/30 border border-brand-clay/30 px-3.5 py-2 rounded-xs text-xs font-sans">
              <Clock size={15} className="text-brand-terracotta animate-pulse" />
              <span className="font-semibold text-brand-clay">Timed Hold:</span>
              <span className="font-mono font-bold text-[#2d2a26]">
                {secondsRemaining > 0 ? formatMinSec(secondsRemaining) : "Hold Expired"}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Reserved Artwork Card */}
          <div className="lg:col-span-7 bg-white border border-brand-sand/70 p-6 sm:p-8 rounded-xs space-y-6 shadow-xs">
            <div className="flex items-start space-x-5">
              <div className="relative w-28 h-28 rounded-xs overflow-hidden bg-brand-sand flex-shrink-0 border border-brand-sand">
                <Image
                  src={artwork.images[0].url}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-clay font-medium block">
                      {artwork.style} • {artwork.edition === "original" ? "1-of-1 Original" : "Limited Edition"}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#2d2a26]">
                      {artwork.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      CartStore.clear();
                      setCart(CartStore.get());
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-xs text-gray-500 font-sans">
                  {artwork.dimensions.widthCm}×{artwork.dimensions.heightCm} cm ({artwork.dimensions.widthInches}×{artwork.dimensions.heightInches} in)
                </p>
                <p className="text-xs text-gray-500 font-sans">
                  By Rachana Agarwal • Signed Certificate Included
                </p>

                <div className="pt-2 font-serif text-xl font-bold text-brand-clay">
                  {currency === "USD" && `$${itemPrice.toLocaleString()}`}
                  {currency === "EUR" && `€${itemPrice.toLocaleString()}`}
                  {currency === "GBP" && `£${itemPrice.toLocaleString()}`}
                  {currency === "INR" && `₹${itemPrice.toLocaleString()}`}
                </div>
              </div>
            </div>

            {/* Packaging and provenance note */}
            <div className="p-4 bg-brand-sand/20 rounded-xs text-xs text-gray-600 font-sans space-y-1 border border-brand-sand/50">
              <span className="font-semibold text-[#2d2a26] block">Protective Art Packaging:</span>
              <p>
                Custom high-density edge guards, moisture-barrier wrap, and rigid wood-frame skeletal crating designed for MDF folk art.
              </p>
            </div>
          </div>

          {/* Right Column: Landed-Cost Breakdown & Destination */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Country Selector */}
            <div className="bg-white border border-brand-sand/70 p-6 rounded-xs space-y-4 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-clay">
                <Globe size={14} />
                <span>Shipping Destination Country</span>
              </div>

              <select
                value={selectedCountry}
                onChange={(e) => {
                  const c = e.target.value;
                  setSelectedCountry(c);
                  CartStore.setDestinationCountry(c);
                }}
                className="w-full bg-brand-sand/20 border border-brand-sand px-3 py-2.5 rounded-xs text-xs font-medium text-[#2d2a26] focus:outline-none focus:border-brand-clay cursor-pointer"
              >
                <option value="US">United States (USD - Insured Air Cargo)</option>
                <option value="DE">Germany (EUR - EU 2026 Duty Compliant)</option>
                <option value="FR">France (EUR - EU 2026 Duty Compliant)</option>
                <option value="GB">United Kingdom (GBP)</option>
                <option value="IN">India (Domestic - GST Included)</option>
                <option value="RU">Russian Federation (Inquiry Only)</option>
              </select>

              {/* Russian Compliance Warning */}
              {landedCalculation.checkoutDisabled && (
                <div className="p-3.5 bg-brand-terracotta/10 border border-brand-terracotta/40 rounded-xs text-xs text-[#2d2a26] space-y-2">
                  <div className="flex items-center space-x-1.5 font-bold text-brand-terracotta">
                    <AlertTriangle size={15} />
                    <span>Inquiry-Only Market</span>
                  </div>
                  <p className="leading-relaxed">
                    {landedCalculation.complianceReason}
                  </p>
                  <Link
                    href="/ru/inquiry"
                    className="inline-block mt-1 font-semibold text-brand-clay underline underline-offset-2"
                  >
                    Open Russian Collector Inquiry Portal →
                  </Link>
                </div>
              )}

              {/* Landed Cost Breakdown */}
              {!landedCalculation.checkoutDisabled && (
                <div className="space-y-3 pt-3 border-t border-brand-sand/50 font-sans text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Artwork Subtotal</span>
                    <span className="font-semibold text-[#2d2a26]">
                      ${landedCalculation.breakdown.subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <div>
                      <span>Insured Express Shipping</span>
                      <span className="text-[10px] text-gray-400 block font-normal">
                        {landedCalculation.shippingCarrier} ({landedCalculation.transitDaysString})
                      </span>
                    </div>
                    <span className="font-semibold text-[#2d2a26]">
                      ${landedCalculation.breakdown.shipping.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <div>
                      <span>Customs Entry & Duty ({landedCalculation.breakdown.dutyModel})</span>
                      {landedCalculation.breakdown.dutyNotes && (
                        <span className="text-[10px] text-gray-400 block font-normal max-w-[200px]">
                          {landedCalculation.breakdown.dutyNotes}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-[#2d2a26]">
                      ${landedCalculation.breakdown.customsDuty.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Import VAT / Sales Tax</span>
                    <span className="font-semibold text-[#2d2a26]">
                      ${landedCalculation.breakdown.importVat.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-brand-sand flex justify-between items-baseline text-sm font-bold text-[#2d2a26]">
                    <span>Total Landed Cost</span>
                    <span className="font-serif text-2xl text-brand-clay">
                      ${landedCalculation.breakdown.total.toLocaleString()} {currency}
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout Trigger */}
              {!landedCalculation.checkoutDisabled && (
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-brand-clay text-white uppercase tracking-[0.2em] text-xs font-semibold rounded-xs hover:bg-brand-terracotta transition-colors flex items-center justify-center space-x-2 shadow-xs mt-4 block text-center"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

            {/* Assurance Badges */}
            <div className="p-4 bg-brand-sand/20 rounded-xs border border-brand-sand/60 space-y-2 text-xs text-gray-600 font-sans">
              <div className="flex items-center space-x-2 font-medium text-[#2d2a26]">
                <ShieldCheck size={16} className="text-brand-clay" />
                <span>Zero Hidden Fees at Delivery (DDP Model)</span>
              </div>
              <p className="text-[11px] text-gray-500">
                All duties, customs clearance, and import taxes are calculated and collected directly at checkout. No surprise invoices from the carrier.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

