"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTWORKS_SEED } from "@/data/catalogue";
import { Artwork, InventoryStatus } from "@/types/models";
import {
  Package,
  ShoppingBag,
  PlusCircle,
  Truck,
  CheckCircle2,
  Clock,
  Award,
  DollarSign,
  Search,
  ExternalLink,
} from "lucide-react";
import clsx from "clsx";

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  destinationCountry: string;
  artworkTitle: string;
  amount: number;
  currency: string;
  paymentStatus: "paid" | "hold" | "unpaid";
  shippingStatus: "pending" | "shipped" | "delivered";
  trackingCarrier?: string;
  trackingNumber?: string;
  createdAt: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "ORD-2026-894211",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@example.com",
    destinationCountry: "US",
    artworkTitle: "Rhythm of the Tarpa",
    amount: 512.22,
    currency: "USD",
    paymentStatus: "paid",
    shippingStatus: "pending",
    createdAt: "2026-10-31",
  },
  {
    id: "ord-2",
    orderNumber: "ORD-2026-773412",
    customerName: "Julian Weber",
    customerEmail: "j.weber@example.de",
    destinationCountry: "DE",
    artworkTitle: "Sacred Mithila Mandala",
    amount: 672.4,
    currency: "EUR",
    paymentStatus: "paid",
    shippingStatus: "shipped",
    trackingCarrier: "DHL Express",
    trackingNumber: "DHL-9842109844",
    createdAt: "2026-10-28",
  },
];

export default function OwnerAdminPortal() {
  const [activeTab, setActiveTab] = useState<"inventory" | "orders" | "new_artwork">("inventory");
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS_SEED);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [selectedArtworkForEdit, setSelectedArtworkForEdit] = useState<Artwork | null>(null);

  // Quick toggle status for 1-of-1 pieces
  const toggleArtworkStatus = (id: string) => {
    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextStatus: InventoryStatus = art.status === "available" ? "sold" : "available";
          return { ...art, status: nextStatus };
        }
        return art;
      })
    );
  };

  // Mark order as shipped with tracking
  const markOrderShipped = (orderId: string) => {
    const tracking = prompt("Enter Carrier Tracking Number (e.g. DHL Express 9842109844):", "DHL-8472910492");
    if (!tracking) return;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            shippingStatus: "shipped",
            trackingCarrier: "DHL Express Priority Air",
            trackingNumber: tracking,
          };
        }
        return ord;
      })
    );
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-sand mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-1">
              Studio Management Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2d2a26]">
              Rachana Agarwal • Studio Desk
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs font-sans">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-xs font-medium">
              Payments: Safe Test Mode
            </span>
            <Link
              href="/gallery"
              target="_blank"
              className="px-3 py-1 bg-white border border-brand-sand rounded-xs text-gray-700 hover:text-brand-clay flex items-center space-x-1"
            >
              <span>View Live Gallery</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-brand-sand/60 pb-4 mb-8 font-sans text-xs">
          <button
            onClick={() => setActiveTab("inventory")}
            className={clsx(
              "px-4 py-2 uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-2",
              activeTab === "inventory" ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:bg-brand-sand/30"
            )}
          >
            <Package size={14} />
            <span>Artworks & Inventory ({artworks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={clsx(
              "px-4 py-2 uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-2",
              activeTab === "orders" ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:bg-brand-sand/30"
            )}
          >
            <ShoppingBag size={14} />
            <span>Orders & Shipments ({orders.length})</span>
          </button>
        </div>

        {/* TAB 1: Inventory & Artwork Catalog */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs">
              <p className="text-gray-600 font-sans">
                Manage your original folk paintings and jewellery. Click status to quickly mark items as Available or Sold.
              </p>
            </div>

            <div className="bg-white border border-brand-sand rounded-xs overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-brand-sand/30 border-b border-brand-sand text-gray-600 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Artwork</th>
                      <th className="p-4">Style & Medium</th>
                      <th className="p-4">Dimensions</th>
                      <th className="p-4">Prices (USD / EUR / INR)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-sand/40">
                    {artworks.map((art) => (
                      <tr key={art.id} className="hover:bg-brand-sand/10 transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-xs overflow-hidden bg-brand-sand flex-shrink-0 border border-brand-sand">
                            <Image
                              src={art.images[0].url}
                              alt={art.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif font-bold text-sm text-[#2d2a26] block">{art.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{art.certificate.certificateId}</span>
                          </div>
                        </td>

                        <td className="p-4 text-gray-600">
                          <span className="font-semibold text-brand-clay block">{art.style}</span>
                          <span className="text-[11px] text-gray-500 line-clamp-1">{art.medium}</span>
                        </td>

                        <td className="p-4 text-gray-600 whitespace-nowrap">
                          {art.dimensions.widthCm}×{art.dimensions.heightCm} cm
                        </td>

                        <td className="p-4 whitespace-nowrap font-medium text-[#2d2a26]">
                          ${art.pricePerCurrency.USD.toLocaleString()} / €{art.pricePerCurrency.EUR.toLocaleString()} / ₹{art.pricePerCurrency.INR.toLocaleString()}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleArtworkStatus(art.id)}
                            className={clsx(
                              "px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold transition-all",
                              art.status === "available"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : art.status === "reserved"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-gray-200 text-gray-800 border border-gray-300"
                            )}
                          >
                            {art.status}
                          </button>
                        </td>

                        <td className="p-4 text-right whitespace-nowrap">
                          <Link
                            href={`/art/${art.slug}`}
                            target="_blank"
                            className="text-brand-clay hover:text-brand-terracotta underline font-medium"
                          >
                            View PDP
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Orders & International Freight */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white border border-brand-sand rounded-xs overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-brand-sand/30 border-b border-brand-sand text-gray-600 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Order #</th>
                      <th className="p-4">Customer & Country</th>
                      <th className="p-4">Artwork Acquired</th>
                      <th className="p-4">Landed Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Fulfillment</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-sand/40">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-brand-sand/10 transition-colors">
                        <td className="p-4 font-mono font-bold text-brand-clay">
                          {ord.orderNumber}
                        </td>

                        <td className="p-4 text-gray-700">
                          <span className="font-semibold block text-[#2d2a26]">{ord.customerName}</span>
                          <span className="text-[11px] text-gray-500 block">{ord.customerEmail}</span>
                          <span className="text-[10px] font-bold text-brand-terracotta uppercase">Dest: {ord.destinationCountry}</span>
                        </td>

                        <td className="p-4 font-serif font-bold text-[#2d2a26]">
                          {ord.artworkTitle}
                        </td>

                        <td className="p-4 font-bold text-[#2d2a26] whitespace-nowrap">
                          ${ord.amount.toLocaleString()} {ord.currency}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-2xs text-[10px] uppercase font-bold">
                            {ord.paymentStatus}
                          </span>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {ord.shippingStatus === "shipped" ? (
                            <div className="text-emerald-700">
                              <span className="flex items-center space-x-1 font-bold text-[11px]">
                                <CheckCircle2 size={12} />
                                <span>Shipped</span>
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono block">
                                {ord.trackingNumber}
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => markOrderShipped(ord.id)}
                              className="px-2.5 py-1 bg-brand-clay text-white rounded-xs text-[10px] uppercase tracking-wider font-semibold hover:bg-brand-terracotta"
                            >
                              Add Tracking & Ship
                            </button>
                          )}
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          <Link
                            href={`/order-confirmation/${ord.orderNumber}`}
                            target="_blank"
                            className="text-brand-clay hover:underline"
                          >
                            Print Certificate
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

