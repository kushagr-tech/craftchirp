"use client";

import { useState } from "react";
import { AdminOrder } from "@/lib/admin/admin-store";
import { X, Truck, CheckCircle2, ShieldCheck } from "lucide-react";

interface ShipmentModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveTracking: (orderId: string, carrier: string, trackingNumber: string, status: "shipped" | "delivered") => void;
}

const CARRIERS = [
  "DHL Express Priority Air (DDP Pre-Cleared)",
  "FedEx International Priority",
  "UPS Worldwide Express",
  "India Post Speed Post EMS (Customs Declaration)",
];

export function ShipmentModal({ order, isOpen, onClose, onSaveTracking }: ShipmentModalProps) {
  const [carrier, setCarrier] = useState(CARRIERS[0]);
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || "");
  const [status, setStatus] = useState<"shipped" | "delivered">(order?.shippingStatus === "delivered" ? "delivered" : "shipped");

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      alert("Please enter the carrier AWB or tracking number.");
      return;
    }
    onSaveTracking(order.id, carrier, trackingNumber.trim(), status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-brand-offwhite border-2 border-brand-sand shadow-2xl rounded-xs p-6 sm:p-8 font-sans text-xs text-[#2d2a26]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#2d2a26] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pb-4 border-b border-brand-sand">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-1">
            Fulfillment & Crating
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26]">
            Dispatch Order {order.orderNumber}
          </h2>
          <p className="text-gray-500 text-[11px] mt-1">
            Destination: <strong>{order.destinationCountry}</strong> • Artwork: <strong>"{order.artworkTitle}"</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-brand-sand/20 border border-brand-sand/60 rounded-xs space-y-1 text-[11px]">
            <div className="font-semibold text-[#2d2a26]">Ship To:</div>
            <div className="text-gray-700">{order.customerName} ({order.customerEmail})</div>
            {order.shippingAddress && (
              <div className="text-gray-500 font-mono text-[10px]">{order.shippingAddress}</div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
              International Cargo Carrier *
            </label>
            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs cursor-pointer"
            >
              {CARRIERS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Air Waybill / Tracking Number (AWB) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. DHL-9842109844 or 784910294821"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs font-mono font-bold text-brand-clay"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Fulfillment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs cursor-pointer font-bold text-emerald-800"
            >
              <option value="shipped">Dispatched & In Transit (Express Air)</option>
              <option value="delivered">Delivered to Collector Sanctuary</option>
            </select>
          </div>

          <div className="p-3 bg-white border border-brand-sand rounded-xs space-y-1.5 text-[11px] text-gray-500">
            <div className="flex items-center space-x-1.5 text-brand-clay font-semibold">
              <ShieldCheck size={14} />
              <span>Export Compliance Reminders:</span>
            </div>
            <p>• Include signed Certificate of Authenticity inside the waterproof inner packaging.</p>
            <p>• Affix 3 copies of commercial invoice (HTS 9701.21.00) in outer shipping pouch.</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-brand-sand">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-brand-sand text-gray-600 text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-brand-sand/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-brand-clay hover:bg-brand-terracotta text-white text-xs uppercase tracking-wider font-semibold rounded-xs shadow-xs"
            >
              Confirm Tracking & Ship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

