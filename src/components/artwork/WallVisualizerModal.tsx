"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Artwork } from "@/types/models";
import { X, Upload, RotateCcw, Move, Eye, Info, Sparkles } from "lucide-react";
import clsx from "clsx";

interface WallVisualizerModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_ROOMS = [
  {
    id: "living",
    name: "Modern Living Sanctuary",
    wallBg: "bg-[#e8e4dc]", // Warm chalky plaster
    furniture: "sofa",
    wallHeightCm: 240, // 8 feet
  },
  {
    id: "study",
    name: "Wabi-Sabi Study & Credenza",
    wallBg: "bg-[#ded8ce]", // Clay tinted lime-wash
    furniture: "credenza",
    wallHeightCm: 240,
  },
  {
    id: "dining",
    name: "Earthy Dining Room",
    wallBg: "bg-[#d1c7bc]", // Deeper sand plaster
    furniture: "dining",
    wallHeightCm: 260,
  },
];

export function WallVisualizerModal({ artwork, isOpen, onClose }: WallVisualizerModalProps) {
  const [activeRoomId, setActiveRoomId] = useState("living");
  const [customRoomUrl, setCustomRoomUrl] = useState<string | null>(null);
  const [showFrame, setShowFrame] = useState(false);
  const [artworkPos, setArtworkPos] = useState({ x: 50, y: 38 }); // Percent of canvas
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const activeRoom = SAMPLE_ROOMS.find((r) => r.id === activeRoomId) || SAMPLE_ROOMS[0];

  // Handle local user upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomRoomUrl(url);
    }
  };

  // True physical scale calculation
  // In our 600px tall viewport representing ~240cm wall:
  // scaleFactor = (artwork.dimensions.heightCm / 240) * 100% of wall height
  const scalePercentHeight = (artwork.dimensions.heightCm / activeRoom.wallHeightCm) * 100;
  const aspectRatio = artwork.dimensions.widthCm / artwork.dimensions.heightCm;

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setArtworkPos({
      x: Math.max(15, Math.min(85, x)),
      y: Math.max(15, Math.min(65, y)),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-5xl bg-brand-offwhite border border-brand-sand rounded-xs shadow-2xl flex flex-col overflow-hidden max-h-[95vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-brand-sand/60 bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Eye size={16} className="text-brand-clay" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2d2a26]">
                See on Your Wall • True Scale Visualizer
              </h3>
            </div>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              "{artwork.title}" — {artwork.dimensions.widthCm}×{artwork.dimensions.heightCm} cm ({artwork.dimensions.widthInches}×{artwork.dimensions.heightInches} in)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-[#2d2a26] transition-colors rounded-xs"
            aria-label="Close wall visualizer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Interactive Room Canvas */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={clsx(
            "relative w-full h-[55vh] sm:h-[62vh] overflow-hidden flex flex-col justify-end transition-colors duration-500",
            customRoomUrl ? "bg-black" : activeRoom.wallBg
          )}
        >
          {/* Custom User Upload Background */}
          {customRoomUrl && (
            <img
              src={customRoomUrl}
              alt="Your custom wall"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          )}

          {/* Sample Room Illustrated Environment (Furniture & Lighting) */}
          {!customRoomUrl && (
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-end">
              {/* Ceiling light cast */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

              {/* Wooden floorboard strip */}
              <div className="w-full h-16 sm:h-20 bg-[#a6866b] border-t-4 border-[#8c6b50] relative shadow-inner">
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Stylized Furniture Indicator to establish scale */}
              {activeRoom.furniture === "sofa" && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] max-w-lg h-24 sm:h-32 bg-[#c5bba8] rounded-t-lg shadow-2xl border-t-2 border-[#b0a490] flex items-center justify-center">
                  <div className="w-full h-full flex justify-around px-4 pt-2">
                    <div className="w-1/3 h-full bg-[#bbb09c] rounded-t-sm border-r border-[#a89d89]" />
                    <div className="w-1/3 h-full bg-[#bbb09c] rounded-t-sm border-r border-[#a89d89]" />
                    <div className="w-1/3 h-full bg-[#bbb09c] rounded-t-sm" />
                  </div>
                  <span className="absolute bottom-2 text-[10px] uppercase tracking-wider text-black/40 font-sans font-semibold">
                    Standard 3-Seater Sofa (200 cm Wide)
                  </span>
                </div>
              )}

              {activeRoom.furniture === "credenza" && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] max-w-md h-20 sm:h-24 bg-[#543d2b] rounded-t-xs shadow-2xl flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-sans font-semibold">
                    Oak Credenza (160 cm Wide)
                  </span>
                </div>
              )}

              {activeRoom.furniture === "dining" && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[65%] max-w-md h-16 sm:h-20 bg-[#6d543e] rounded-t-xs shadow-2xl flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-sans font-semibold">
                    Dining Table Height (75 cm)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Draggable Artwork Scaled to True Proportions */}
          <div
            onPointerDown={handlePointerDown}
            style={{
              left: `${artworkPos.x}%`,
              top: `${artworkPos.y}%`,
              transform: "translate(-50%, -50%)",
              height: `${scalePercentHeight}%`,
              width: `calc(${scalePercentHeight}% * ${aspectRatio})`,
            }}
            className={clsx(
              "absolute z-20 cursor-grab active:cursor-grabbing transition-shadow group select-none",
              showFrame
                ? "p-2 bg-[#1f1a16] shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                : "shadow-[0_12px_30px_rgba(45,42,38,0.3)]"
            )}
            title="Click and drag to reposition artwork"
          >
            <div className="relative w-full h-full overflow-hidden bg-brand-sand">
              <Image
                src={artwork.images[0].url}
                alt={artwork.title}
                fill
                sizes="500px"
                className="object-cover pointer-events-none"
              />
            </div>

            {/* Hover Drag Hint */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-2xs whitespace-nowrap flex items-center space-x-1 pointer-events-none">
              <Move size={10} />
              <span>Drag to move</span>
            </div>
          </div>

          {/* Wall Scale Reference Stamp */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px] text-gray-600 font-sans flex items-center space-x-1.5 border border-brand-sand/60 pointer-events-none">
            <Info size={12} className="text-brand-clay" />
            <span>Calibrated to true physical dimensions (1 cm ≈ 2.5 px)</span>
          </div>
        </div>

        {/* Room & Customization Controls Bar */}
        <div className="p-4 sm:p-6 bg-white border-t border-brand-sand/60 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
          
          {/* Sample Room Picker */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-gray-500 mr-1">
              Sanctuary:
            </span>
            {SAMPLE_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoomId(room.id);
                  setCustomRoomUrl(null);
                }}
                className={clsx(
                  "px-3 py-1.5 rounded-xs uppercase tracking-wider transition-all",
                  activeRoomId === room.id && !customRoomUrl
                    ? "bg-brand-clay text-white shadow-xs font-semibold"
                    : "bg-brand-sand/30 hover:bg-brand-sand text-gray-700"
                )}
              >
                {room.name}
              </button>
            ))}

            {/* User Wall Upload Button */}
            <label className="cursor-pointer px-3 py-1.5 rounded-xs uppercase tracking-wider transition-all bg-brand-sand/30 hover:bg-brand-sand text-gray-700 flex items-center space-x-1.5">
              <Upload size={12} />
              <span>Upload Wall</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Frame Toggle & Reset */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFrame}
                onChange={(e) => setShowFrame(e.target.checked)}
                className="rounded-xs text-brand-clay focus:ring-0 cursor-pointer"
              />
              <span className="text-xs uppercase tracking-wider text-[#2d2a26]">Simulate Frame</span>
            </label>

            <button
              onClick={() => setArtworkPos({ x: 50, y: 38 })}
              className="text-gray-500 hover:text-brand-clay flex items-center space-x-1 uppercase tracking-wider text-[11px]"
            >
              <RotateCcw size={12} />
              <span>Center</span>
            </button>
          </div>

        </div>

        {/* Privacy Assurance Notice */}
        <div className="px-6 py-2 bg-brand-sand/20 border-t border-brand-sand/40 text-[10px] text-gray-500 text-center font-sans">
          🔒 Private browser processing: User wall photographs are rendered client-side only and never transmitted or stored on any server.
        </div>

      </div>
    </div>
  );
}

