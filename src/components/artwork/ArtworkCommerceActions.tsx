"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Artwork, CurrencyCode } from "@/types/models";
import { CartStore } from "@/lib/commerce/cart-store";
import { AdminStore } from "@/lib/admin/admin-store";
import { InquiryModal } from "./InquiryModal";
import { WallVisualizerModal } from "./WallVisualizerModal";
import { ShieldCheck, Award, Truck, Lock, Clock, HelpCircle, Eye, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface ArtworkCommerceActionsProps {
  artwork: Artwork;
}

export function ArtworkCommerceActions({ artwork }: ArtworkCommerceActionsProps) {
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isInCurrentBag, setIsInCurrentBag] = useState(false);
  const [liveStatus, setLiveStatus] = useState<Artwork["status"]>(artwork.status);
  const [isReservedState, setIsReservedState] = useState(artwork.status === "reserved");

  useEffect(() => {
    const liveArt = AdminStore.getArtworks().find((a) => a.id === artwork.id);
    if (liveArt) {
      setLiveStatus(liveArt.status);
      if (liveArt.status === "reserved") setIsReservedState(true);
    }

    const cart = CartStore.get();
    if (cart.item && cart.item.id === artwork.id) {
      setIsInCurrentBag(true);
      setIsReservedState(true);
      if (cart.currency) {
        setCurrency(cart.currency);
      }
    }
  }, [artwork.id]);

  const priceFormatted = {
    USD: `$${artwork.pricePerCurrency.USD.toLocaleString()}`,
    EUR: `€${artwork.pricePerCurrency.EUR.toLocaleString()}`,
    GBP: `£${artwork.pricePerCurrency.GBP.toLocaleString()}`,
    INR: `₹${artwork.pricePerCurrency.INR.toLocaleString()}`,
  }[currency];

  const handleAcquire = () => {
    // Lock hold in CartStore and navigate to acquisition bag & checkout review
    CartStore.setItem(artwork, currency, 15);
    setIsInCurrentBag(true);
    setIsReservedState(true);
    router.push("/cart");
  };

  const handleProceedToBag = () => {
    router.push("/cart");
  };

  return (
    <div className="space-y-6 pt-6 border-t border-brand-sand">
      {/* Price & Currency Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-1">
            Original Artwork Landed Price
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#2d2a26]">
              {priceFormatted}
            </span>
            <span className="text-xs uppercase font-medium text-gray-500">
              {currency}
            </span>
          </div>
        </div>

        {/* Currency Switcher Pill */}
        <div className="flex items-center space-x-1 bg-brand-sand/30 border border-brand-sand p-1 rounded-xs text-xs font-medium">
          {(["USD", "EUR", "GBP", "INR"] as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={clsx(
                "px-2 py-0.5 rounded-2xs text-[10px] uppercase tracking-wider transition-all",
                currency === c ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:text-brand-clay"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Reservation State Alert */}
      {isReservedState && (
        <div className="bg-brand-sand/40 border border-brand-clay/30 p-3 rounded-xs flex items-center space-x-2.5 text-xs text-[#2d2a26]">
          <Clock size={16} className="text-brand-terracotta flex-shrink-0 animate-pulse" />
          <span>
            {isInCurrentBag
              ? "This 1-of-1 piece is currently reserved in your bag with active 15-minute hold."
              : "This 1-of-1 original is temporarily in another collector's checkout hold."}
          </span>
        </div>
      )}

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {liveStatus === "sold" ? (
          <div className="w-full py-4 bg-[#2d2a26] text-gray-300 text-center uppercase tracking-widest text-xs font-semibold rounded-xs">
            Artwork Collected (Permanent Archive)
          </div>
        ) : isInCurrentBag ? (
          <button
            onClick={handleProceedToBag}
            className="w-full sm:w-2/3 py-4 bg-brand-clay text-white hover:bg-brand-terracotta uppercase tracking-[0.2em] text-xs font-semibold rounded-xs transition-all flex items-center justify-center space-x-2 shadow-xs"
          >
            <Lock size={14} />
            <span>Review Bag & Checkout →</span>
          </button>
        ) : isReservedState ? (
          <button
            disabled
            className="w-full sm:w-2/3 py-4 bg-gray-300 text-gray-500 uppercase tracking-[0.2em] text-xs font-semibold rounded-xs cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Clock size={14} />
            <span>Currently on Timed Hold</span>
          </button>
        ) : (
          <button
            onClick={handleAcquire}
            className="w-full sm:w-2/3 py-4 bg-brand-clay text-white hover:bg-brand-terracotta uppercase tracking-[0.2em] text-xs font-semibold rounded-xs transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <Lock size={14} />
            <span>Acquire Original (1-of-1)</span>
          </button>
        )}

        <button
          onClick={() => setIsInquiryOpen(true)}
          className="w-full sm:w-1/3 py-4 border border-brand-clay text-brand-clay hover:bg-brand-sand/20 uppercase tracking-[0.16em] text-xs font-semibold rounded-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <HelpCircle size={14} />
          <span>Inquire</span>
        </button>
      </div>

      {/* See It On Your Wall Scale Visualizer Trigger */}
      {artwork.type !== "jewellery" && (
        <button
          onClick={() => setIsVisualizerOpen(true)}
          className="w-full py-3 bg-brand-sand/30 hover:bg-brand-sand/50 text-[#2d2a26] border border-brand-sand/80 uppercase tracking-widest text-xs font-semibold rounded-xs transition-colors flex items-center justify-center space-x-2"
        >
          <Eye size={15} className="text-brand-clay" />
          <span>See It On Your Wall (1:1 True Scale)</span>
        </button>
      )}

      {/* Trust & Provenance Accordion Strip */}
      <div className="pt-6 border-t border-brand-sand/50 space-y-3.5 text-xs text-gray-600 font-sans">
        <div className="flex items-start space-x-3">
          <Award size={18} className="text-brand-clay flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#2d2a26]">Certificate of Authenticity: </span>
            <span>Signed by Rachana Agarwal with unique registration ({artwork.certificate.certificateId}).</span>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Truck size={18} className="text-brand-terracotta flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#2d2a26]">Insured Global Transit: </span>
            <span>Custom shock-resistant wood-casing for MDF. Delivered in 5–9 business days via express courier.</span>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <ShieldCheck size={18} className="text-brand-olive flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#2d2a26]">14-Day Collector Guarantee: </span>
            <span>If the original does not fit your sanctuary, return in original crating with full transit insurance.</span>
          </div>
        </div>
      </div>

      {/* Inquiry Modal Dialog */}
      <InquiryModal
        artwork={artwork}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Wall Visualizer Modal Dialog */}
      <WallVisualizerModal
        artwork={artwork}
        isOpen={isVisualizerOpen}
        onClose={() => setIsVisualizerOpen(false)}
      />
    </div>
  );
}

