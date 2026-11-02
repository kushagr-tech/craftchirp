"use client";

import { useState, useEffect } from "react";
import { Artwork, ArtworkStyle, ProductType, ArtworkOrientation, ArtworkEdition, CurrencyPrices } from "@/types/models";
import { X, Sparkles, Check, Image as ImageIcon, DollarSign, Layers } from "lucide-react";
import clsx from "clsx";

interface ArtworkModalProps {
  artwork: Artwork | null; // null if creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (saved: Artwork) => void;
}

const PRESET_IMAGES = [
  { label: "Warli Dance in Circle", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200" },
  { label: "Tree of Ancestral Life", url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200" },
  { label: "Sacred Mithila Mandala", url: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&q=80&w=1200" },
  { label: "Harvest Celebration Monochrome", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200" },
  { label: "Terracotta Folk Sun Necklace", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200" },
  { label: "Warli Miniature Bird Earrings", url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1200" },
];

export function ArtworkModal({ artwork, isOpen, onClose, onSave }: ArtworkModalProps) {
  const isEditing = !!artwork;

  // Form State
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState<ArtworkStyle>("Warli");
  const [type, setType] = useState<ProductType>("painting");
  const [edition, setEdition] = useState<ArtworkEdition>("original");
  const [orientation, setOrientation] = useState<ArtworkOrientation>("square");
  const [story, setStory] = useState("");
  const [medium, setMedium] = useState(
    "Purified sun-dried cow-dung base & natural earth pigments on 12mm moisture-resistant MDF"
  );
  const [materials, setMaterials] = useState("Sun-dried cow dung, rice flour paste, red ochre (geru), charcoal black, neem binder, MDF");
  const [widthCm, setWidthCm] = useState(60);
  const [heightCm, setHeightCm] = useState(60);
  const [depthCm, setDepthCm] = useState(2.5);
  const [weightGrams, setWeightGrams] = useState(2400);
  const [hsCode, setHsCode] = useState("9701.21.00");
  const [usdPrice, setUsdPrice] = useState(480);
  const [eurPrice, setEurPrice] = useState(440);
  const [gbpPrice, setGbpPrice] = useState(380);
  const [inrPrice, setInrPrice] = useState(38000);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [roomTags, setRoomTags] = useState("Living Room, Sanctuary, Meditation Alcove");
  const [dominantColors, setDominantColors] = useState("Clay Brown, Terracotta, Natural Sand, Off-White");
  const [status, setStatus] = useState<Artwork["status"]>("available");
  const [customCertId, setCustomCertId] = useState("");

  useEffect(() => {
    if (artwork) {
      setTitle(artwork.title);
      setStyle(artwork.style);
      setType(artwork.type);
      setEdition(artwork.edition);
      setOrientation(artwork.orientation);
      setStory(artwork.story);
      setMedium(artwork.medium);
      setMaterials(artwork.materials.join(", "));
      setWidthCm(artwork.dimensions.widthCm);
      setHeightCm(artwork.dimensions.heightCm);
      setDepthCm(artwork.dimensions.depthCm || 2.5);
      setWeightGrams(artwork.weightGrams);
      setHsCode(artwork.hsCode);
      setUsdPrice(artwork.pricePerCurrency.USD);
      setEurPrice(artwork.pricePerCurrency.EUR);
      setGbpPrice(artwork.pricePerCurrency.GBP);
      setInrPrice(artwork.pricePerCurrency.INR);
      setImageUrl(artwork.images[0]?.url || PRESET_IMAGES[0].url);
      setRoomTags(artwork.roomTags.join(", "));
      setDominantColors(artwork.dominantColors.join(", "));
      setStatus(artwork.status);
      setCustomCertId(artwork.certificate.certificateId);
    } else {
      // Defaults for brand new artwork
      setTitle("");
      setStyle("Warli");
      setType("painting");
      setEdition("original");
      setOrientation("square");
      setStory("");
      setMedium("Purified sun-dried cow-dung base & natural earth pigments on 12mm moisture-resistant MDF");
      setMaterials("Sun-dried cow dung, rice flour paste, red ochre (geru), charcoal black, neem binder, MDF");
      setWidthCm(60);
      setHeightCm(60);
      setDepthCm(2.5);
      setWeightGrams(2400);
      setHsCode("9701.21.00");
      setUsdPrice(480);
      setEurPrice(440);
      setGbpPrice(380);
      setInrPrice(38000);
      setImageUrl(PRESET_IMAGES[0].url);
      setRoomTags("Living Room, Sanctuary, Meditation Alcove");
      setDominantColors("Clay Brown, Terracotta, Natural Sand, Off-White");
      setStatus("available");
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      setCustomCertId(`CC-2026-WAR-${randomSuffix}`);
    }
  }, [artwork, isOpen]);

  if (!isOpen) return null;

  // Auto-fill currency conversions from USD
  const handleAutoConvertPrices = () => {
    const usd = Number(usdPrice) || 0;
    setEurPrice(Math.round(usd * 0.92));
    setGbpPrice(Math.round(usd * 0.79));
    setInrPrice(Math.round(usd * 86.5));
  };

  // Auto-switch HS code when type changes
  const handleTypeChange = (newType: ProductType) => {
    setType(newType);
    if (newType === "jewellery") {
      setHsCode("7117.90.00"); // Imitation jewelry of other materials (clay/terracotta)
      setWeightGrams(120);
      setWidthCm(12);
      setHeightCm(12);
      setDepthCm(3);
      setMedium("Hand-molded terracotta clay with surgical stainless steel findings");
    } else {
      setHsCode("9701.21.00"); // Original paintings, executed entirely by hand
      setWeightGrams(2400);
      setWidthCm(60);
      setHeightCm(60);
      setDepthCm(2.5);
      setMedium("Purified sun-dried cow-dung base & natural earth pigments on 12mm moisture-resistant MDF");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title for the artwork.");
      return;
    }

    const slug =
      artwork?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const id = artwork?.id || `art-${Date.now()}`;
    const certId = customCertId.trim() || `CC-2026-${style.substring(0, 3).toUpperCase()}-${id.substring(4, 10).toUpperCase()}`;

    const savedArtwork: Artwork = {
      id,
      slug,
      title: title.trim(),
      style,
      type,
      edition,
      orientation,
      story: story.trim() || `A singular handcrafted 1-of-1 original by Rachana Agarwal celebrating ancient tribal traditions.`,
      medium: medium.trim(),
      materials: materials.split(",").map((m) => m.trim()).filter(Boolean),
      dimensions: {
        widthCm: Number(widthCm),
        heightCm: Number(heightCm),
        depthCm: Number(depthCm),
        widthInches: Number((Number(widthCm) * 0.3937).toFixed(1)),
        heightInches: Number((Number(heightCm) * 0.3937).toFixed(1)),
        depthInches: Number((Number(depthCm) * 0.3937).toFixed(1)),
      },
      weightGrams: Number(weightGrams),
      packagedWeightGrams: Math.round(Number(weightGrams) * 1.35),
      packagedDimensions: {
        lengthCm: Math.round(Number(widthCm) + 12),
        widthCm: Math.round(Number(heightCm) + 12),
        heightCm: Math.round(Number(depthCm) + 10),
      },
      year: artwork?.year || new Date().getFullYear(),
      framed: false,
      hangingHardwareIncluded: true,
      hsCode: hsCode.trim() || "9701.21.00",
      dominantColors: dominantColors.split(",").map((c) => c.trim()).filter(Boolean),
      roomTags: roomTags.split(",").map((r) => r.trim()).filter(Boolean),
      pricePerCurrency: {
        USD: Number(usdPrice),
        EUR: Number(eurPrice),
        GBP: Number(gbpPrice),
        INR: Number(inrPrice),
      },
      status,
      artistId: "artist-rachana-agarwal",
      images: [
        {
          url: imageUrl.trim() || PRESET_IMAGES[0].url,
          alt: `${title} - Hand-painted ${style} Folk Art by Rachana Agarwal`,
          width: 1200,
          height: 1200,
          viewType: "front",
          isPrimary: true,
        },
      ],
      certificate: {
        certificateId: certId,
        signedBy: "Rachana Agarwal",
        artistTitle: "Founder & Master Artisan, Craftchirp",
        issuanceDate: artwork?.certificate?.issuanceDate || new Date().toISOString().split("T")[0],
      },
      createdAt: artwork?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(savedArtwork);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-brand-offwhite border-2 border-brand-sand shadow-2xl rounded-xs p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto font-sans text-xs text-[#2d2a26]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#2d2a26] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-brand-sand">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-terracotta block mb-1">
            Studio Artwork Desk
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2a26]">
            {isEditing ? `Edit Artwork: ${artwork.title}` : "Catalog a New Original Folk Piece"}
          </h2>
          <p className="text-gray-500 text-[11px] mt-1">
            Changes save immediately to your studio inventory and synchronize across the gallery and marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Essentials */}
          <div className="bg-white border border-brand-sand/70 p-5 rounded-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2d2a26] flex items-center space-x-1.5">
              <span>1. Artwork Essentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Artwork Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sacred Mithila Peacock Mandala"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Art Style *
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as ArtworkStyle)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs cursor-pointer"
                >
                  <option value="Warli">Warli (Ancestral Maharashtra Ritual Art)</option>
                  <option value="Madhubani">Madhubani (Mithila Sacred Geometry)</option>
                  <option value="Folk-Contemporary">Folk-Contemporary Fusion</option>
                  <option value="Other">Traditional Folk Jewellery</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Product Category
                </label>
                <select
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value as ProductType)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs cursor-pointer"
                >
                  <option value="painting">Painting on MDF</option>
                  <option value="jewellery">Wearable Jewellery</option>
                  <option value="home-decor">Home Decor / Artifact</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as ArtworkOrientation)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs cursor-pointer"
                >
                  <option value="square">Square</option>
                  <option value="portrait">Portrait (Vertical)</option>
                  <option value="landscape">Landscape (Horizontal)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Inventory Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs cursor-pointer font-bold text-brand-clay"
                >
                  <option value="available">🟢 Available for Acquisition</option>
                  <option value="reserved">🟡 In Checkout Hold (15m)</option>
                  <option value="sold">⚪ Collected / Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Technique, Medium & Certificate */}
          <div className="bg-white border border-brand-sand/70 p-5 rounded-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2d2a26]">
              2. Technique, Natural Pigments & Provenance
            </h3>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                Curatorial Medium Description
              </label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Pigments & Raw Materials (comma-separated)
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Certificate of Authenticity ID
                </label>
                <input
                  type="text"
                  value={customCertId}
                  onChange={(e) => setCustomCertId(e.target.value)}
                  placeholder="e.g. CC-2026-WAR-894120"
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs font-mono font-bold text-brand-clay"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Physical Dimensions & Landed Customs (HS Code) */}
          <div className="bg-white border border-brand-sand/70 p-5 rounded-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-base font-bold text-[#2d2a26]">
                3. Dimensions, Weight & Customs Classification
              </h3>
              <span className="text-[11px] text-gray-500 font-mono">
                {widthCm}×{heightCm} cm = {(widthCm * 0.3937).toFixed(1)}×{(heightCm * 0.3937).toFixed(1)} in
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Width (cm) *</label>
                <input
                  type="number"
                  required
                  value={widthCm}
                  onChange={(e) => setWidthCm(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Height (cm) *</label>
                <input
                  type="number"
                  required
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Thickness (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={depthCm}
                  onChange={(e) => setDepthCm(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Weight (g) *</label>
                <input
                  type="number"
                  required
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                Harmonized System (HS) Tariff Code (Mandatory for DDP Export)
              </label>
              <input
                type="text"
                required
                value={hsCode}
                onChange={(e) => setHsCode(e.target.value)}
                className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none focus:border-brand-clay text-xs font-mono font-medium text-brand-clay"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Default: <strong>9701.21.00</strong> (Original hand-paintings, 0% US duty) • <strong>7117.90.00</strong> (Handmade jewellery)
              </p>
            </div>
          </div>

          {/* Section 4: Multi-Currency Pricing */}
          <div className="bg-white border border-brand-sand/70 p-5 rounded-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-base font-bold text-[#2d2a26]">
                4. International Landed Pricing
              </h3>
              <button
                type="button"
                onClick={handleAutoConvertPrices}
                className="px-2.5 py-1 bg-brand-sand/40 hover:bg-brand-sand/70 border border-brand-sand text-[10px] uppercase tracking-wider font-semibold text-brand-clay rounded-xs flex items-center space-x-1"
              >
                <Sparkles size={11} />
                <span>Auto-Calculate from USD</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Price (USD $)</label>
                <input
                  type="number"
                  required
                  value={usdPrice}
                  onChange={(e) => setUsdPrice(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs text-xs font-bold text-brand-clay"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Price (EUR €)</label>
                <input
                  type="number"
                  required
                  value={eurPrice}
                  onChange={(e) => setEurPrice(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs text-xs font-bold text-brand-clay"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Price (GBP £)</label>
                <input
                  type="number"
                  required
                  value={gbpPrice}
                  onChange={(e) => setGbpPrice(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs text-xs font-bold text-brand-clay"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Price (INR ₹)</label>
                <input
                  type="number"
                  required
                  value={inrPrice}
                  onChange={(e) => setInrPrice(Number(e.target.value))}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs text-xs font-bold text-brand-clay"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Imagery & Cultural Narrative */}
          <div className="bg-white border border-brand-sand/70 p-5 rounded-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2d2a26]">
              5. Imagery & Cultural Narrative
            </h3>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                Artwork Photography URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-grow bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs focus:outline-none text-xs font-mono"
                  placeholder="https://..."
                />
              </div>

              {/* Preset Image Chooser */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] text-gray-400 mr-1 flex items-center">Presets:</span>
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="text-[10px] bg-brand-sand/25 hover:bg-brand-sand/60 px-2 py-0.5 rounded-2xs text-gray-600"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
                The Cultural Story & Motifs
              </label>
              <textarea
                rows={3}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Narrate the ancestral meaning behind the painting, tribal deities, agrarian rites, or ceremonial dance depicted..."
                className="w-full bg-brand-sand/15 border border-brand-sand p-3 rounded-xs focus:outline-none focus:border-brand-clay text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Room Placement Tags</label>
                <input
                  type="text"
                  value={roomTags}
                  onChange={(e) => setRoomTags(e.target.value)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-600 mb-1">Dominant Natural Colors</label>
                <input
                  type="text"
                  value={dominantColors}
                  onChange={(e) => setDominantColors(e.target.value)}
                  className="w-full bg-brand-sand/15 border border-brand-sand px-3 py-2 rounded-xs text-xs"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-brand-sand">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-brand-sand text-gray-600 text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-brand-sand/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-brand-clay hover:bg-brand-terracotta text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors"
            >
              {isEditing ? "Save Artwork Changes" : "Publish to Gallery Catalog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

