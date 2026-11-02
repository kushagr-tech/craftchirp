"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ARTWORKS_SEED } from "@/data/catalogue";
import { CertificateGenerator } from "@/lib/commerce/certificate-generator";
import { CheckCircle2, Award, Truck, Printer, ShieldCheck } from "lucide-react";

export function OrderConfirmationDetails({ orderId: propOrderId }: { orderId?: string }) {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId");
  const orderId = queryOrderId || propOrderId || "CC-2026-TEST";
  const slug = searchParams.get("slug") || "rhythm-of-the-tarpa";

  const artwork = useMemo(() => {
    return ARTWORKS_SEED.find((a) => a.slug === slug) || ARTWORKS_SEED[0];
  }, [slug]);

  const certificate = useMemo(() => {
    return CertificateGenerator.generate(artwork, orderId);
  }, [artwork, orderId]);

  return (
    <>
      {/* Order Reference Pill */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center space-x-2 bg-brand-sand/30 border border-brand-sand px-4 py-2 rounded-xs text-xs font-mono text-[#2d2a26]">
          <span className="text-gray-500 uppercase tracking-wider text-[10px]">Order Reference:</span>
          <span className="font-bold text-brand-clay">{orderId}</span>
        </div>
      </div>

      {/* 2-Column Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Packaging & Shipping Card */}
        <div className="bg-white border border-brand-sand p-6 rounded-xs space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-brand-clay font-bold text-sm">
            <Truck size={18} />
            <span>Insured Transit & Crating</span>
          </div>
          <p className="text-xs text-gray-600 font-sans leading-relaxed">
            Your 1-of-1 original on moisture-resistant MDF is being placed into custom shock-absorbing corner guards, sealed in a moisture barrier, and secured in a rigid wooden skeletal crate.
          </p>
          <div className="p-3 bg-brand-sand/20 rounded-xs text-xs font-sans space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span className="font-bold text-[#2d2a26]">5–8 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Carrier:</span>
              <span className="font-medium text-[#2d2a26]">DHL Express Priority Air</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customs Clearance:</span>
              <span className="font-medium text-brand-olive">DDP (Pre-Cleared, 0 Fees at Door)</span>
            </div>
          </div>
        </div>

        {/* Provenance Card */}
        <div className="bg-white border border-brand-sand p-6 rounded-xs space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-brand-clay font-bold text-sm">
            <Award size={18} />
            <span>Official Certificate Registration</span>
          </div>
          <p className="text-xs text-gray-600 font-sans leading-relaxed">
            This original is officially logged in the Craftchirp Archive. A physical countersigned Certificate of Authenticity is packed alongside your piece.
          </p>
          <div className="p-3 bg-brand-sand/20 rounded-xs text-xs font-sans space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Certificate ID:</span>
              <span className="font-mono font-bold text-brand-clay">{certificate.certificateId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Artist Seal:</span>
              <span className="font-medium text-[#2d2a26]">Rachana Agarwal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Integrity Hash:</span>
              <span className="font-mono text-[10px] text-gray-500 truncate max-w-[140px]">
                {certificate.verificationHash}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Archival Certificate Section */}
      <div className="bg-white border-2 border-brand-sand/80 p-8 sm:p-12 rounded-xs shadow-md mb-16 relative">
        <div className="border border-brand-sand/60 p-8 sm:p-10 bg-brand-offwhite/20">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-clay block">
                Craftchirp Provenance Ledger
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2a26] mt-1">
                Certificate of Authenticity
              </h3>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-gray-500 block">ID: {certificate.certificateId}</span>
              <span className="text-[11px] text-gray-400">Date: {certificate.issuanceDate}</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-sans text-gray-700 pb-8 border-b border-brand-sand/50">
            <p>
              This document certifies that the artwork entitled <strong>"{certificate.artworkTitle}"</strong> is an original, 1-of-1 authentic work executed entirely by hand by artist <strong>{certificate.artistName}</strong>.
            </p>
            <div className="grid grid-cols-2 gap-4 py-3 bg-brand-sand/20 p-4 rounded-xs">
              <div>
                <span className="text-gray-400 uppercase text-[10px] block">Medium</span>
                <span className="font-medium text-[#2d2a26]">{certificate.medium}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase text-[10px] block">Dimensions</span>
                <span className="font-medium text-[#2d2a26]">{certificate.dimensionsString}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-end gap-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-gray-400 tracking-wider block">Cryptographic Verification Hash</span>
              <code className="text-[11px] font-mono text-brand-clay bg-brand-sand/25 px-2 py-0.5 rounded-xs">
                {certificate.verificationHash}
              </code>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-lg text-brand-clay font-bold">Rachana Agarwal</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Artist & Founder Signature</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          href="/gallery"
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-clay text-white uppercase tracking-widest text-xs font-semibold rounded-xs hover:bg-brand-terracotta transition-colors text-center shadow-sm"
        >
          Return to Gallery
        </Link>
        <Link
          href="/admin"
          className="w-full sm:w-auto px-8 py-3.5 border border-brand-sand text-[#2d2a26] uppercase tracking-widest text-xs font-semibold rounded-xs hover:bg-brand-sand/20 transition-colors text-center"
        >
          View in Studio Admin
        </Link>
      </div>
    </>
  );
}

