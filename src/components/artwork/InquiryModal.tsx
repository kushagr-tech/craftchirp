"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { Artwork } from "@/types/models";

interface InquiryModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ artwork, isOpen, onClose }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "United States",
    questionType: "acquisition",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In dev / Phase 2, mock successful dispatch
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-brand-offwhite border border-brand-sand shadow-2xl rounded-xs p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#2d2a26]"
          aria-label="Close inquiry modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 size={44} className="mx-auto text-brand-olive" />
            <h3 className="font-serif text-2xl font-bold text-[#2d2a26]">Inquiry Received</h3>
            <p className="text-sm text-gray-600 font-sans leading-relaxed">
              Thank you for your interest in <span className="font-semibold text-brand-clay">"{artwork.title}"</span>. Rachana Agarwal and our studio will personally reply to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-brand-clay text-white text-xs uppercase tracking-widest font-semibold"
            >
              Return to Artwork
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-terracotta">
                Private Gallery Inquiry
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2d2a26] mt-1">
                Inquire About "{artwork.title}"
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-sans">
                1-of-1 Original • By Rachana Agarwal • Signed Certificate Included
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-[#2d2a26]"
                    placeholder="Eleanor Vance"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-[#2d2a26]"
                    placeholder="eleanor@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Destination Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-[#2d2a26]"
                    placeholder="United States, Germany, UK..."
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Topic</label>
                  <select
                    value={formData.questionType}
                    onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
                    className="w-full bg-white border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-[#2d2a26]"
                  >
                    <option value="acquisition">Direct Acquisition / Hold</option>
                    <option value="custom_framing">Custom Framing Options</option>
                    <option value="shipping_inquiry">Customs & Shipping Question</option>
                    <option value="commission">Similar Custom Commission</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gray-600 mb-1 font-medium">Message / Questions</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-brand-sand p-3 rounded-xs focus:outline-none focus:border-brand-clay text-[#2d2a26] resize-none"
                  placeholder="Inquire about delivery timeline to your city, framing specifications, or custom requests..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-clay text-white uppercase tracking-widest text-xs font-semibold hover:bg-brand-terracotta transition-colors flex items-center justify-center space-x-2 mt-4"
              >
                <Send size={13} />
                <span>Submit Inquiry to Studio</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

