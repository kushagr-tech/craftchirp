"use client";

import { AdminInquiry } from "@/lib/admin/admin-store";
import { X, Mail, Globe, Clock, CheckCircle2, Archive, MessageSquare } from "lucide-react";

interface InquiryModalViewProps {
  inquiry: AdminInquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: "new" | "replied" | "archived") => void;
}

export function InquiryModalView({ inquiry, isOpen, onClose, onUpdateStatus }: InquiryModalViewProps) {
  if (!isOpen || !inquiry) return null;

  const mailtoSubject = encodeURIComponent(
    inquiry.subject || `Inquiry regarding Craftchirp Art — ${inquiry.artworkTitle || "Bespoke Request"}`
  );
  const mailtoBody = encodeURIComponent(
    `Dear ${inquiry.name},\n\nThank you for reaching out to Craftchirp Studio regarding "${inquiry.artworkTitle || "your artwork inquiry"}".\n\nWarm regards,\nRachana Agarwal\nCraftchirp Original Folk Art`
  );

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
            Inbound Collector Desk
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#2d2a26]">
            Collector Message: {inquiry.name}
          </h2>
          <div className="flex items-center space-x-3 text-gray-500 text-[11px] mt-1 font-mono">
            <span>Source: {inquiry.source}</span>
            <span>•</span>
            <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 p-3 bg-brand-sand/20 border border-brand-sand/60 rounded-xs text-[11px]">
            <div>
              <span className="text-gray-400 uppercase text-[9px] block">Collector Name</span>
              <span className="font-bold text-[#2d2a26]">{inquiry.name}</span>
            </div>
            <div>
              <span className="text-gray-400 uppercase text-[9px] block">Email</span>
              <a href={`mailto:${inquiry.email}`} className="text-brand-clay font-medium hover:underline">
                {inquiry.email}
              </a>
            </div>
            <div>
              <span className="text-gray-400 uppercase text-[9px] block">Country / Region</span>
              <span className="font-medium text-[#2d2a26]">{inquiry.country}</span>
            </div>
            <div>
              <span className="text-gray-400 uppercase text-[9px] block">Artwork / Topic</span>
              <span className="font-bold text-brand-clay">{inquiry.artworkTitle || inquiry.subject || "General Inquiry"}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-gray-500 block mb-1.5">
              Collector's Inquiry Note:
            </span>
            <div className="p-4 bg-white border border-brand-sand rounded-xs text-xs text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-500 text-[11px]">Status:</span>
            <div className="flex space-x-1.5">
              <button
                onClick={() => onUpdateStatus(inquiry.id, "new")}
                className={`px-2.5 py-1 rounded-2xs text-[10px] uppercase font-bold ${
                  inquiry.status === "new" ? "bg-amber-200 text-amber-900 border border-amber-400" : "bg-gray-100 text-gray-600"
                }`}
              >
                New
              </button>
              <button
                onClick={() => onUpdateStatus(inquiry.id, "replied")}
                className={`px-2.5 py-1 rounded-2xs text-[10px] uppercase font-bold ${
                  inquiry.status === "replied" ? "bg-emerald-200 text-emerald-900 border border-emerald-400" : "bg-gray-100 text-gray-600"
                }`}
              >
                Replied
              </button>
              <button
                onClick={() => onUpdateStatus(inquiry.id, "archived")}
                className={`px-2.5 py-1 rounded-2xs text-[10px] uppercase font-bold ${
                  inquiry.status === "archived" ? "bg-gray-300 text-gray-800" : "bg-gray-100 text-gray-600"
                }`}
              >
                Archived
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-brand-sand">
            <a
              href={`mailto:${inquiry.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onUpdateStatus(inquiry.id, "replied")}
              className="px-4 py-2 bg-brand-clay hover:bg-brand-terracotta text-white text-xs uppercase tracking-wider font-semibold rounded-xs shadow-xs flex items-center space-x-1.5"
            >
              <Mail size={13} />
              <span>Draft Email Reply</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-brand-sand text-gray-600 text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-brand-sand/20"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

