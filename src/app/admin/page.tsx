"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminStore, AdminOrder, AdminInquiry } from "@/lib/admin/admin-store";
import { Artwork, InventoryStatus } from "@/types/models";
import { ArtworkModal } from "@/components/admin/ArtworkModal";
import { ShipmentModal } from "@/components/admin/ShipmentModal";
import { InquiryModalView } from "@/components/admin/InquiryModalView";
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
  Lock,
  Unlock,
  MessageSquare,
  Download,
  RotateCcw,
  Edit2,
  Trash2,
  FileText,
  AlertTriangle,
  Globe,
  Mail,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

export default function OwnerAdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<"inventory" | "orders" | "inquiries" | "backup">("inventory");

  // Domain data
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStyle, setFilterStyle] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");

  // Modals
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);

  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [shippingOrder, setShippingOrder] = useState<AdminOrder | null>(null);

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [viewingInquiry, setViewingInquiry] = useState<AdminInquiry | null>(null);

  // Toast / notification
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => setActionNotification(null), 3000);
  };

  // Check auth and load data on mount
  useEffect(() => {
    const authed = AdminStore.checkAuth();
    setIsAuthenticated(authed);
    setArtworks(AdminStore.getArtworks());
    setOrders(AdminStore.getOrders());
    setInquiries(AdminStore.getInquiries());
  }, []);

  // Handle Login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const success = AdminStore.login(pinInput);
    if (success) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput("");
      showNotification("Studio desk unlocked. Welcome, Rachana!");
    } else {
      setPinError(true);
    }
  };

  const handleQuickUnlock = () => {
    AdminStore.login("2026");
    setIsAuthenticated(true);
    setPinError(false);
    showNotification("Studio desk unlocked with master PIN (2026).");
  };

  const handleLogout = () => {
    AdminStore.logout();
    setIsAuthenticated(false);
  };

  // Artwork Handlers
  const handleSaveArtwork = (savedArtwork: Artwork) => {
    const updated = AdminStore.saveArtwork(savedArtwork);
    setArtworks(updated);
    showNotification(`Artwork "${savedArtwork.title}" saved successfully.`);
  };

  const handleDeleteArtwork = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the studio inventory?`)) {
      const updated = AdminStore.deleteArtwork(id);
      setArtworks(updated);
      showNotification(`Artwork "${title}" deleted.`);
    }
  };

  const handleToggleStatus = (id: string, title: string) => {
    const nextStatus = AdminStore.toggleArtworkStatus(id);
    setArtworks(AdminStore.getArtworks());
    showNotification(`"${title}" status updated to ${nextStatus.toUpperCase()}`);
  };

  // Order Handlers
  const handleSaveTracking = (
    orderId: string,
    carrier: string,
    trackingNumber: string,
    status: "shipped" | "delivered"
  ) => {
    const updated = AdminStore.updateOrderTracking(orderId, carrier, trackingNumber, status);
    setOrders(updated);
    showNotification(`Order tracking saved (${carrier} - ${trackingNumber}).`);
  };

  // Inquiry Handlers
  const handleUpdateInquiryStatus = (id: string, status: "new" | "replied" | "archived") => {
    const updated = AdminStore.updateInquiryStatus(id, status);
    setInquiries(updated);
    showNotification(`Inquiry marked as ${status.toUpperCase()}.`);
  };

  // Export Handlers
  const handleDownloadCatalogueJson = () => {
    const jsonStr = AdminStore.exportCatalogJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `craftchirp-catalogue-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification("catalogue.json downloaded for repository commit.");
  };

  const handleDownloadOrdersCsv = () => {
    const csvStr = AdminStore.exportOrdersCsv();
    const blob = new Blob([csvStr], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `craftchirp-orders-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification("Orders CSV downloaded for export filings.");
  };

  const handleResetToSeed = () => {
    if (
      confirm(
        "Reset all studio data to initial seeds? This will restore original artworks, sample orders, and inquiries."
      )
    ) {
      AdminStore.resetToDefaults();
      setArtworks(AdminStore.getArtworks());
      setOrders(AdminStore.getOrders());
      setInquiries(AdminStore.getInquiries());
      showNotification("Studio data reset to factory seed.");
    }
  };

  // Computed metrics
  const totalArtworks = artworks.length;
  const availableCount = artworks.filter((a) => a.status === "available").length;
  const reservedCount = artworks.filter((a) => a.status === "reserved").length;
  const soldCount = artworks.filter((a) => a.status === "sold").length;
  const pendingShipments = orders.filter((o) => o.shippingStatus === "pending").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  // Filtered Artworks
  const filteredArtworks = artworks.filter((art) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchStyle = art.style.toLowerCase().includes(q);
      const matchMedium = art.medium.toLowerCase().includes(q);
      const matchCert = art.certificate.certificateId.toLowerCase().includes(q);
      if (!matchTitle && !matchStyle && !matchMedium && !matchCert) return false;
    }
    if (filterStyle !== "all" && art.style.toLowerCase() !== filterStyle.toLowerCase()) return false;
    if (filterStatus !== "all" && art.status !== filterStatus) return false;
    return true;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    if (orderStatusFilter === "all") return true;
    return ord.shippingStatus === orderStatusFilter;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryStatusFilter === "all") return true;
    return inq.status === inquiryStatusFilter;
  });

  // ==========================================
  // VIEW: PIN AUTHENTICATION GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26] flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 bg-white border-2 border-brand-sand shadow-xl rounded-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-sand/30 border border-brand-sand flex items-center justify-center mx-auto text-brand-clay">
            <Lock size={28} />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-1">
              Studio Operations Desk
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#2d2a26]">
              Rachana Agarwal
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-1">
              Enter your 4-digit studio PIN to manage artwork inventory, orders, and collector inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                placeholder="Enter Studio PIN (Default: 2026)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={clsx(
                  "w-full text-center text-lg tracking-[0.3em] font-mono py-3 px-4 border rounded-xs focus:outline-none",
                  pinError ? "border-red-400 bg-red-50 text-red-700" : "border-brand-sand bg-brand-sand/10 focus:border-brand-clay"
                )}
                autoFocus
              />
              {pinError && (
                <span className="text-[11px] text-red-600 block mt-1.5 font-sans">
                  Invalid PIN. Use default PIN: <strong>2026</strong>
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-clay hover:bg-brand-terracotta text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Unlock size={14} />
              <span>Unlock Studio Desk</span>
            </button>
          </form>

          <div className="pt-4 border-t border-brand-sand/50 flex flex-col items-center space-y-2 text-[11px] text-gray-400">
            <button
              onClick={handleQuickUnlock}
              className="text-brand-clay hover:underline font-semibold"
            >
              Quick Unlock (Dev / Default PIN: 2026) →
            </button>
            <Link href="/" className="hover:text-gray-600">
              ← Return to Public Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED STUDIO PORTAL
  // ==========================================
  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26] font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Floating Notification Banner */}
        {actionNotification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#2d2a26] text-white px-5 py-3 rounded-xs shadow-xl border border-brand-sand text-xs flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{actionNotification}</span>
          </div>
        )}

        {/* Top Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-sand mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta">
                Studio Operations Desk
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-emerald-800 font-mono font-medium">Live Session</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2d2a26]">
              Rachana Agarwal • Studio Master Desk
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => {
                setEditingArtwork(null);
                setIsArtworkModalOpen(true);
              }}
              className="px-4 py-2.5 bg-brand-clay hover:bg-brand-terracotta text-white uppercase tracking-wider text-xs font-semibold rounded-xs shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <PlusCircle size={15} />
              <span>Add New Artwork</span>
            </button>

            <Link
              href="/gallery"
              target="_blank"
              className="px-3.5 py-2.5 bg-white border border-brand-sand rounded-xs text-gray-700 hover:text-brand-clay flex items-center space-x-1.5 transition-colors"
            >
              <span>Live Gallery</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2.5 border border-brand-sand hover:bg-brand-sand/30 text-gray-600 rounded-xs"
              title="Lock Studio Desk"
            >
              <Lock size={15} />
            </button>
          </div>
        </div>

        {/* Studio Summary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="bg-white border border-brand-sand/80 p-3.5 rounded-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Total Catalog</span>
            <div className="font-serif text-2xl font-bold text-[#2d2a26]">{totalArtworks}</div>
            <span className="text-[10px] text-gray-400">1-of-1 Original Pieces</span>
          </div>

          <div className="bg-white border border-brand-sand/80 p-3.5 rounded-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">Available</span>
            <div className="font-serif text-2xl font-bold text-emerald-700">{availableCount}</div>
            <span className="text-[10px] text-gray-400">Active in Gallery</span>
          </div>

          <div className="bg-white border border-brand-sand/80 p-3.5 rounded-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold block">In Hold (15m)</span>
            <div className="font-serif text-2xl font-bold text-amber-700">{reservedCount}</div>
            <span className="text-[10px] text-gray-400">Checkout Timed Locks</span>
          </div>

          <div className="bg-white border border-brand-sand/80 p-3.5 rounded-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Collected / Sold</span>
            <div className="font-serif text-2xl font-bold text-brand-clay">{soldCount}</div>
            <span className="text-[10px] text-gray-400">Archived Originals</span>
          </div>

          <div className="bg-white border border-brand-sand/80 p-3.5 rounded-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-brand-terracotta font-semibold block">Pending Ship</span>
            <div className="font-serif text-2xl font-bold text-brand-terracotta">{pendingShipments}</div>
            <span className="text-[10px] text-gray-400">Need DHL/FedEx Crating</span>
          </div>

          <div className="bg-white border border-brand-sand/80 p-3.5 rounded-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-blue-700 font-semibold block">Inquiries</span>
            <div className="font-serif text-2xl font-bold text-blue-700">{inquiries.length}</div>
            <span className="text-[10px] text-gray-400">{newInquiries} Awaiting Reply</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-brand-sand/70 pb-4 mb-8 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("inventory")}
            className={clsx(
              "px-4 py-2.5 uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-2 whitespace-nowrap",
              activeTab === "inventory" ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:bg-brand-sand/30"
            )}
          >
            <Package size={14} />
            <span>Artworks & Inventory ({artworks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={clsx(
              "px-4 py-2.5 uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-2 whitespace-nowrap relative",
              activeTab === "orders" ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:bg-brand-sand/30"
            )}
          >
            <ShoppingBag size={14} />
            <span>Orders & Dispatch ({orders.length})</span>
            {pendingShipments > 0 && (
              <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={clsx(
              "px-4 py-2.5 uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-2 whitespace-nowrap relative",
              activeTab === "inquiries" ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:bg-brand-sand/30"
            )}
          >
            <MessageSquare size={14} />
            <span>Collector Inquiries ({inquiries.length})</span>
            {newInquiries > 0 && (
              <span className="px-1.5 py-0.2 bg-brand-terracotta text-white rounded-full text-[9px] font-bold">
                {newInquiries}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={clsx(
              "px-4 py-2.5 uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-2 whitespace-nowrap",
              activeTab === "backup" ? "bg-brand-clay text-white shadow-xs" : "text-gray-600 hover:bg-brand-sand/30"
            )}
          >
            <Download size={14} />
            <span>Data Sync & Backup</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ARTWORKS & INVENTORY                                              */}
        {/* ========================================================================= */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-white border border-brand-sand p-4 rounded-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between text-xs">
              <div className="relative flex-grow max-w-md">
                <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, motif, medium, or certificate ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-brand-sand/15 border border-brand-sand rounded-xs focus:outline-none focus:border-brand-clay text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterStyle}
                  onChange={(e) => setFilterStyle(e.target.value)}
                  className="bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">All Styles</option>
                  <option value="Warli">Warli</option>
                  <option value="Madhubani">Madhubani</option>
                  <option value="Folk-Contemporary">Folk-Contemporary</option>
                  <option value="Other">Jewellery & Other</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available (🟢)</option>
                  <option value="reserved">In Hold (🟡)</option>
                  <option value="sold">Sold / Archived (⚪)</option>
                </select>
              </div>
            </div>

            {/* Artworks Table */}
            <div className="bg-white border border-brand-sand rounded-xs overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-brand-sand/30 border-b border-brand-sand text-gray-600 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Artwork</th>
                      <th className="p-4">Style & Technique</th>
                      <th className="p-4">Dimensions</th>
                      <th className="p-4">Prices (USD / EUR / INR)</th>
                      <th className="p-4">Status (Click to toggle)</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-sand/40">
                    {filteredArtworks.map((art) => (
                      <tr key={art.id} className="hover:bg-brand-sand/10 transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-xs overflow-hidden bg-brand-sand flex-shrink-0 border border-brand-sand">
                            <Image
                              src={art.images[0]?.url || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675"}
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
                          <span className="text-[11px] text-gray-500 line-clamp-1 max-w-[200px]">{art.medium}</span>
                        </td>

                        <td className="p-4 text-gray-600 whitespace-nowrap">
                          <div>{art.dimensions.widthCm}×{art.dimensions.heightCm} cm</div>
                          <div className="text-[10px] text-gray-400">({art.dimensions.widthInches}×{art.dimensions.heightInches} in)</div>
                        </td>

                        <td className="p-4 whitespace-nowrap font-medium text-[#2d2a26]">
                          ${art.pricePerCurrency.USD.toLocaleString()} / €{art.pricePerCurrency.EUR.toLocaleString()} / ₹{art.pricePerCurrency.INR.toLocaleString()}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(art.id, art.title)}
                            title="Click to cycle status: Available -> Sold -> Available"
                            className={clsx(
                              "px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer shadow-2xs hover:opacity-80",
                              art.status === "available"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : art.status === "reserved"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-gray-200 text-gray-800 border border-gray-300"
                            )}
                          >
                            {art.status === "available" && "🟢 Available"}
                            {art.status === "reserved" && "🟡 In Hold (15m)"}
                            {art.status === "sold" && "⚪ Collected (Sold)"}
                          </button>
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => {
                              setEditingArtwork(art);
                              setIsArtworkModalOpen(true);
                            }}
                            className="p-1 text-gray-600 hover:text-brand-clay transition-colors"
                            title="Edit Artwork Details"
                          >
                            <Edit2 size={15} />
                          </button>

                          <Link
                            href={`/art/${art.slug}`}
                            target="_blank"
                            className="p-1 text-gray-600 hover:text-brand-clay inline-block transition-colors"
                            title="View Public Artwork Page"
                          >
                            <ExternalLink size={15} />
                          </Link>

                          <button
                            onClick={() => handleDeleteArtwork(art.id, art.title)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Artwork"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredArtworks.length === 0 && (
                <div className="py-12 text-center text-gray-400 text-xs">
                  No artworks matched your search or filters.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ORDERS & INTERNATIONAL FREIGHT                                     */}
        {/* ========================================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white border border-brand-sand p-4 rounded-xs flex items-center justify-between text-xs">
              <span className="text-gray-600">
                Orders placed in Test Mode are simulated end-to-end with Certificate of Authenticity generation.
              </span>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-brand-sand/15 border border-brand-sand px-3 py-1.5 rounded-xs focus:outline-none cursor-pointer"
              >
                <option value="all">All Orders</option>
                <option value="pending">Awaiting Dispatch (Pending)</option>
                <option value="shipped">Shipped & In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Orders Table */}
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
                      <th className="p-4">Fulfillment & Tracking</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-sand/40">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-brand-sand/10 transition-colors">
                        <td className="p-4 font-mono font-bold text-brand-clay whitespace-nowrap">
                          {ord.orderNumber}
                          <span className="text-[10px] text-gray-400 block font-normal">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="p-4 text-gray-700">
                          <span className="font-semibold block text-[#2d2a26]">{ord.customerName}</span>
                          <span className="text-[11px] text-gray-500 block">{ord.customerEmail}</span>
                          <span className="text-[10px] font-bold text-brand-terracotta uppercase">Dest: {ord.destinationCountry}</span>
                        </td>

                        <td className="p-4 font-serif font-bold text-[#2d2a26]">
                          {ord.artworkTitle}
                          {ord.certificateId && (
                            <span className="text-[10px] text-gray-400 block font-mono font-normal">
                              COA: {ord.certificateId}
                            </span>
                          )}
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
                          {ord.shippingStatus === "shipped" || ord.shippingStatus === "delivered" ? (
                            <div className="text-emerald-700 space-y-0.5">
                              <span className="flex items-center space-x-1 font-bold text-[11px]">
                                <CheckCircle2 size={12} />
                                <span>{ord.shippingStatus === "delivered" ? "Delivered" : "Shipped via Air"}</span>
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono block">
                                {ord.trackingCarrier}
                              </span>
                              <span className="text-[10px] text-brand-clay font-mono block font-semibold">
                                {ord.trackingNumber}
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setShippingOrder(ord);
                                setIsShipmentModalOpen(true);
                              }}
                              className="px-2.5 py-1.5 bg-brand-clay text-white rounded-xs text-[10px] uppercase tracking-wider font-semibold hover:bg-brand-terracotta flex items-center space-x-1"
                            >
                              <Truck size={12} />
                              <span>Add Tracking & Ship</span>
                            </button>
                          )}
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          <Link
                            href={`/order-confirmation?orderId=${ord.orderNumber}&slug=${ord.artworkSlug || "rhythm-of-the-tarpa"}`}
                            target="_blank"
                            className="px-2.5 py-1 bg-brand-sand/30 hover:bg-brand-sand border border-brand-sand text-brand-clay rounded-xs text-[10px] uppercase tracking-wider font-semibold inline-flex items-center space-x-1"
                          >
                            <FileText size={11} />
                            <span>View COA</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="py-12 text-center text-gray-400 text-xs">
                  No orders found.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COLLECTOR INQUIRIES & COMMISSIONS                                  */}
        {/* ========================================================================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white border border-brand-sand p-4 rounded-xs flex items-center justify-between text-xs">
              <span className="text-gray-600">
                Collector inquiries from artwork pages, custom commission briefs, and the Russian inquiry desk.
              </span>

              <select
                value={inquiryStatusFilter}
                onChange={(e) => setInquiryStatusFilter(e.target.value)}
                className="bg-brand-sand/15 border border-brand-sand px-3 py-1.5 rounded-xs focus:outline-none cursor-pointer"
              >
                <option value="all">All Inquiries</option>
                <option value="new">New (Awaiting Reply)</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Inquiries Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white border border-brand-sand p-5 rounded-xs space-y-3 shadow-xs hover:border-brand-clay transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif font-bold text-base text-[#2d2a26]">{inq.name}</span>
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded-2xs text-[9px] uppercase font-bold",
                            inq.status === "new"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : inq.status === "replied"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-gray-200 text-gray-700"
                          )}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-sans block">{inq.email} • {inq.country}</span>
                    </div>

                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="p-3 bg-brand-sand/15 rounded-xs border border-brand-sand/50 text-xs">
                    <span className="font-semibold text-brand-clay block mb-1">
                      {inq.artworkTitle || inq.subject || "General Inquiry"}
                    </span>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {inq.message}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => {
                        setViewingInquiry(inq);
                        setIsInquiryModalOpen(true);
                      }}
                      className="text-xs uppercase tracking-wider font-semibold text-brand-clay hover:text-brand-terracotta underline"
                    >
                      Read Full Message & Reply →
                    </button>

                    <div className="flex space-x-1 text-[10px]">
                      {inq.status !== "replied" && (
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, "replied")}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-2xs"
                        >
                          Mark Replied
                        </button>
                      )}
                      {inq.status !== "archived" && (
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, "archived")}
                          className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-2xs"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredInquiries.length === 0 && (
              <div className="py-12 bg-white border border-brand-sand rounded-xs text-center text-gray-400 text-xs">
                No inquiries matching filter.
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DATA SYNC & STUDIO BACKUP                                          */}
        {/* ========================================================================= */}
        {activeTab === "backup" && (
          <div className="space-y-6">
            <div className="bg-white border border-brand-sand p-6 rounded-xs space-y-6 shadow-xs max-w-3xl">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-1">
                  Catalog Synchronization
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2d2a26]">
                  Studio Data Persistence & Repository Sync
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mt-2">
                  Changes made in this Studio Desk are saved to browser local storage for immediate preview across the gallery, PDPs, and bag. Use the tools below to export your updated catalog to Git or download accounting records.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-brand-sand/20 border border-brand-sand rounded-xs space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-[#2d2a26] text-xs">
                    <Download size={15} className="text-brand-clay" />
                    <span>Download catalogue.json</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Export your active artworks list in clean JSON format. You or your developer can place this file in <code>src/data/catalogue.ts</code> to permanently commit changes.
                  </p>
                  <button
                    onClick={handleDownloadCatalogueJson}
                    className="w-full mt-2 py-2.5 bg-brand-clay hover:bg-brand-terracotta text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs shadow-xs"
                  >
                    Download catalogue.json
                  </button>
                </div>

                <div className="p-4 bg-brand-sand/20 border border-brand-sand rounded-xs space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-[#2d2a26] text-xs">
                    <FileText size={15} className="text-brand-terracotta" />
                    <span>Export Orders Manifest (CSV)</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Download complete order manifests, customer addresses, DDP landed totals, and carrier AWB numbers for tax filing and customs record-keeping.
                  </p>
                  <button
                    onClick={handleDownloadOrdersCsv}
                    className="w-full mt-2 py-2.5 bg-[#2d2a26] hover:bg-black text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs shadow-xs"
                  >
                    Download Orders CSV
                  </button>
                </div>
              </div>

              {/* Reset to Factory Seed */}
              <div className="pt-6 border-t border-brand-sand/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-red-900">
                      Reset Studio to Factory Seed
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Clear browser local modifications and restore the original 6 artworks and demo orders.
                    </p>
                  </div>
                  <button
                    onClick={handleResetToSeed}
                    className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center space-x-1.5"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Data</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}

      {/* 1. Artwork Add/Edit Modal */}
      <ArtworkModal
        artwork={editingArtwork}
        isOpen={isArtworkModalOpen}
        onClose={() => {
          setIsArtworkModalOpen(false);
          setEditingArtwork(null);
        }}
        onSave={handleSaveArtwork}
      />

      {/* 2. Shipment Tracking Modal */}
      <ShipmentModal
        order={shippingOrder}
        isOpen={isShipmentModalOpen}
        onClose={() => {
          setIsShipmentModalOpen(false);
          setShippingOrder(null);
        }}
        onSaveTracking={handleSaveTracking}
      />

      {/* 3. Inquiry Details Modal */}
      <InquiryModalView
        inquiry={viewingInquiry}
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setViewingInquiry(null);
        }}
        onUpdateStatus={handleUpdateInquiryStatus}
      />

    </div>
  );
}
