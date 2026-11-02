"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CartStore, CartState } from "@/lib/commerce/cart-store";
import { AdminStore } from "@/lib/admin/admin-store";
import { LandedCostEngine } from "@/lib/commerce/landed-cost";
import { ARTWORKS_SEED } from "@/data/catalogue";
import { Lock, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, CreditCard, Clock } from "lucide-react";
import clsx from "clsx";

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [cart, setCart] = useState<CartState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (415) 555-0199", // Mandatory for international customs
    street1: "742 Evergreen Terrace",
    street2: "Suite 4B",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
    country: "US",
  });

  useEffect(() => {
    const current = CartStore.get();
    if (!current.item && ARTWORKS_SEED.length > 0) {
      const seeded = CartStore.setItem(ARTWORKS_SEED[0], "USD", 15);
      setCart(seeded);
    } else {
      setCart(current);
      if (current.destinationCountry) {
        setFormData((prev) => ({ ...prev, country: current.destinationCountry! }));
      }
    }
  }, []);

  if (!cart?.item) {
    return (
      <div className="pt-36 pb-24 text-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  const artwork = cart.item;
  const currency = cart.currency;
  const itemPrice = artwork.pricePerCurrency[currency] || artwork.pricePerCurrency.USD;

  // Real-time landed cost
  const landedCalculation = LandedCostEngine.calculate(
    formData.country,
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

  // If Russia selected, compliance lock
  const isRussiaSelected = formData.country.toUpperCase() === "RU";

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // In TEST MODE: simulate order confirmation
      const orderId = `ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      AdminStore.addOrder({
        id: `ord-${Date.now()}`,
        orderNumber: orderId,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.street1}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`,
        destinationCountry: formData.country,
        artworkId: artwork.id,
        artworkSlug: artwork.slug,
        artworkTitle: artwork.title,
        artworkImage: artwork.images[0]?.url,
        amount: landedCalculation.breakdown.total,
        currency: currency,
        paymentStatus: 'paid',
        shippingStatus: 'pending',
        certificateId: artwork.certificate?.certificateId || `CC-2026-WAR-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
      });
      CartStore.clear();
      router.push(`/order-confirmation?orderId=${orderId}&slug=${artwork.slug}`);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Navigation Breadcrumb / Step Indicator */}
        <div className="mb-10">
          <Link
            href="/cart"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-brand-clay hover:text-brand-terracotta mb-6"
          >
            <ArrowLeft size={13} />
            <span>Return to Bag</span>
          </Link>

          {/* Stepper Wizard (1 of 3) */}
          <div className="grid grid-cols-3 gap-2 border-b border-brand-sand pb-4 font-sans text-xs">
            <div className={clsx("flex items-center space-x-2", currentStep >= 1 ? "text-brand-clay font-bold" : "text-gray-400")}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span className="hidden sm:inline uppercase tracking-wider">Address</span>
            </div>
            <div className={clsx("flex items-center space-x-2", currentStep >= 2 ? "text-brand-clay font-bold" : "text-gray-400")}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span className="hidden sm:inline uppercase tracking-wider">Landed Cost</span>
            </div>
            <div className={clsx("flex items-center space-x-2", currentStep === 3 ? "text-brand-clay font-bold" : "text-gray-400")}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
              <span className="hidden sm:inline uppercase tracking-wider">Payment (Test)</span>
            </div>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Active Step Forms */}
          <div className="lg:col-span-7 bg-white border border-brand-sand/70 p-6 sm:p-8 rounded-xs space-y-6 shadow-xs">
            
            {/* Russian Compliance Lock Check */}
            {isRussiaSelected ? (
              <div className="space-y-4 p-6 bg-brand-terracotta/10 border border-brand-terracotta/30 rounded-xs text-xs">
                <div className="flex items-center space-x-2 text-brand-terracotta font-bold text-sm">
                  <AlertTriangle size={18} />
                  <span>Cross-Border Compliance Notice (Russia)</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Automated checkout to the Russian Federation is gated in accordance with international payment carrier compliance (Visa/Mastercard/Stripe suspensions).
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We welcome cultural collaborations and private collector inquiries directly through our Russian gallery desk.
                </p>
                <Link
                  href="/ru/inquiry"
                  className="inline-block px-6 py-3 bg-brand-clay text-white uppercase tracking-widest text-xs font-semibold rounded-xs mt-2"
                >
                  Go to Russian Inquiry Form →
                </Link>
              </div>
            ) : (
              <>
                {/* STEP 1: Address & Contact */}
                {currentStep === 1 && (
                  <div className="space-y-5 text-xs font-sans">
                    <h3 className="font-serif text-2xl font-bold text-[#2d2a26]">
                      1. Delivery Destination & Contact
                    </h3>
                    <p className="text-gray-500 text-[11px]">
                      International express couriers (DHL/FedEx) mandate phone contact for customs clearance.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Phone Number (Mandatory for Customs) *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Destination Country *</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay cursor-pointer"
                        >
                          <option value="US">United States (USD)</option>
                          <option value="DE">Germany (EUR - EU 2026 Compliant)</option>
                          <option value="FR">France (EUR)</option>
                          <option value="GB">United Kingdom (GBP)</option>
                          <option value="IN">India (Domestic - GST Included)</option>
                          <option value="RU">Russian Federation (Gated / Inquiry)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.street1}
                        onChange={(e) => setFormData({ ...formData, street1: e.target.value })}
                        className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">State / Region *</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Postal Code *</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-clay"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-4 bg-brand-clay text-white uppercase tracking-widest text-xs font-semibold rounded-xs hover:bg-brand-terracotta transition-colors flex items-center justify-center space-x-2 mt-4"
                    >
                      <span>Continue to Landed Cost & Shipping</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* STEP 2: Landed Cost & Transit Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#2d2a26]">
                        2. Landed Cost & Freight Review
                      </h3>
                      <button onClick={() => setCurrentStep(1)} className="text-brand-clay underline">
                        Edit Address
                      </button>
                    </div>

                    <div className="p-4 bg-brand-sand/20 border border-brand-sand rounded-xs space-y-2">
                      <div className="font-semibold text-[#2d2a26]">Shipping To:</div>
                      <p className="text-gray-600">
                        {formData.fullName} • {formData.street1}, {formData.city}, {formData.state} {formData.postalCode}, {formData.country}
                      </p>
                      <p className="text-gray-500">Contact: {formData.phone}</p>
                    </div>

                    {/* Freight & Crating Spec */}
                    <div className="p-4 bg-white border border-brand-sand rounded-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#2d2a26]">Carrier: {landedCalculation.shippingCarrier}</span>
                        <span className="text-brand-clay font-semibold">{landedCalculation.transitDaysString}</span>
                      </div>
                      <p className="text-gray-500 text-[11px]">
                        Billable Weight: {landedCalculation.billableWeightKg} kg (Calculated using dimensional crating formula L×W×H/5000). Fully insured against damage in transit.
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="w-full py-4 bg-brand-clay text-white uppercase tracking-widest text-xs font-semibold rounded-xs hover:bg-brand-terracotta transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Test Payment</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* STEP 3: Test Mode Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#2d2a26]">
                        3. Payment Authorization
                      </h3>
                      <button onClick={() => setCurrentStep(2)} className="text-brand-clay underline">
                        Review Cost
                      </button>
                    </div>

                    {/* TEST MODE BANNER */}
                    <div className="p-4 bg-amber-50 border border-amber-300 rounded-xs text-amber-900 space-y-1">
                      <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider">
                        <Lock size={14} className="text-amber-700" />
                        <span>TEST MODE ACTIVE — NO REAL CHARGES</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        This checkout is operating in safe sandbox mode. All cards are mock test cards and no funds will be deducted.
                      </p>
                    </div>

                    {/* Mock Payment Element */}
                    <div className="border border-brand-sand p-4 rounded-xs space-y-3 bg-brand-sand/10">
                      <div className="flex items-center justify-between text-gray-500 text-[11px]">
                        <span className="flex items-center space-x-1.5">
                          <CreditCard size={14} className="text-brand-clay" />
                          <span>Test Credit Card (Simulated 3DS)</span>
                        </span>
                        <span>Stripe / Razorpay PA-CB</span>
                      </div>
                      <input
                        type="text"
                        disabled
                        value="4242 •••• •••• 4242 (Test Card)"
                        className="w-full bg-white border border-brand-sand px-3 py-2 text-xs font-mono text-gray-700 rounded-xs"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          disabled
                          value="MM/YY: 12/28"
                          className="w-full bg-white border border-brand-sand px-3 py-2 text-xs font-mono text-gray-700 rounded-xs"
                        />
                        <input
                          type="text"
                          disabled
                          value="CVC: 123"
                          className="w-full bg-white border border-brand-sand px-3 py-2 text-xs font-mono text-gray-700 rounded-xs"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteOrder}
                      disabled={isProcessing}
                      className="w-full py-4 bg-brand-clay text-white uppercase tracking-[0.2em] text-xs font-semibold rounded-xs hover:bg-brand-terracotta transition-colors flex items-center justify-center space-x-2 shadow-md"
                    >
                      {isProcessing ? (
                        <span>Processing Test Acquisition...</span>
                      ) : (
                        <>
                          <Lock size={14} />
                          <span>Authorize ${landedCalculation.breakdown.total.toLocaleString()} {currency} (Test Mode)</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Right Column: Order Summary & Landed Cost Breakdown */}
          <div className="lg:col-span-5 bg-white border border-brand-sand/70 p-6 rounded-xs space-y-5 shadow-xs">
            <h4 className="font-serif text-lg font-bold text-[#2d2a26] pb-3 border-b border-brand-sand/50">
              Order Summary
            </h4>

            {/* Artwork Line Item */}
            <div className="flex items-start space-x-4">
              <div className="relative w-20 h-20 rounded-xs overflow-hidden bg-brand-sand flex-shrink-0 border border-brand-sand">
                <Image
                  src={artwork.images[0].url}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow text-xs">
                <h5 className="font-serif font-bold text-sm text-[#2d2a26]">{artwork.title}</h5>
                <p className="text-gray-500">{artwork.style} Original on MDF</p>
                <p className="text-gray-500">{artwork.dimensions.widthCm}×{artwork.dimensions.heightCm} cm</p>
                <span className="font-serif font-bold text-brand-clay block mt-1">
                  ${itemPrice.toLocaleString()} {currency}
                </span>
              </div>
            </div>

            {/* Landed Cost Itemization */}
            {!landedCalculation.checkoutDisabled && (
              <div className="pt-4 border-t border-brand-sand/50 space-y-2.5 text-xs text-gray-600 font-sans">
                <div className="flex justify-between">
                  <span>Artwork Subtotal</span>
                  <span className="font-medium text-[#2d2a26]">${landedCalculation.breakdown.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Cargo</span>
                  <span className="font-medium text-[#2d2a26]">${landedCalculation.breakdown.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customs Duty ({landedCalculation.breakdown.dutyModel})</span>
                  <span className="font-medium text-[#2d2a26]">${landedCalculation.breakdown.customsDuty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Import VAT / Sales Tax</span>
                  <span className="font-medium text-[#2d2a26]">${landedCalculation.breakdown.importVat.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-brand-sand flex justify-between items-baseline text-sm font-bold text-[#2d2a26]">
                  <span>Total Amount</span>
                  <span className="font-serif text-2xl text-brand-clay">
                    ${landedCalculation.breakdown.total.toLocaleString()} {currency}
                  </span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-brand-sand/40 text-[11px] text-gray-500 font-sans space-y-1">
              <p>✔ Includes signed Certificate of Authenticity</p>
              <p>✔ 14-day collector return guarantee</p>
              <p>✔ Zero surprise import fees upon courier delivery</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

