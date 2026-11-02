"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import clsx from "clsx";

export function GalleryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Read current query params
  const currentType = searchParams.get("type") || "all";
  const currentStyle = searchParams.get("style") || "all";
  const currentOrientation = searchParams.get("orientation") || "all";
  const currentAvailability = searchParams.get("availability") || "all";
  const currentSort = searchParams.get("sort") || "featured";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all" || value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    const query = createQueryString(name, value);
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
    setMobileOpen(false);
  };

  const hasActiveFilters =
    currentType !== "all" ||
    currentStyle !== "all" ||
    currentOrientation !== "all" ||
    currentAvailability !== "all";

  return (
    <div className="w-full mb-12">
      {/* Mobile Filter Toggle */}
      <div className="flex md:hidden items-center justify-between pb-4 border-b border-brand-sand">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-brand-clay bg-brand-sand/40 px-4 py-2.5 rounded-xs"
        >
          <SlidersHorizontal size={14} />
          <span>Filter & Sort {hasActiveFilters && "•"}</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs uppercase tracking-wider text-gray-500 hover:text-brand-clay flex items-center space-x-1"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Desktop Facet Bar */}
      <div className="hidden md:flex flex-col space-y-6">
        {/* Primary Type Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-sand/60 pb-6">
          <div className="flex items-center space-x-2">
            {[
              { id: "all", label: "All Works" },
              { id: "painting", label: "Original Paintings" },
              { id: "jewellery", label: "Handmade Jewellery" },
              { id: "home-decor", label: "Home Objects" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange("type", tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium rounded-xs transition-all",
                  currentType === tab.id
                    ? "bg-brand-clay text-white shadow-xs"
                    : "text-[#2d2a26]/70 hover:text-brand-clay bg-brand-sand/20 hover:bg-brand-sand/40"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-xs text-gray-600 font-sans">
            <span className="uppercase tracking-wider text-[11px] text-gray-500">Sort By:</span>
            <select
              value={currentSort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="bg-brand-sand/30 border border-brand-sand/80 px-3 py-1.5 rounded-xs text-xs font-medium text-[#2d2a26] focus:outline-none cursor-pointer"
            >
              <option value="featured">Curator's Pick</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Latest Creations</option>
            </select>
          </div>
        </div>

        {/* Secondary Sub-Filters (Style, Orientation, Availability) */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
          {/* Style */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-clay">Folk Style:</span>
            {["all", "Warli", "Madhubani", "Folk-Contemporary"].map((style) => (
              <button
                key={style}
                onClick={() => handleFilterChange("style", style)}
                className={clsx(
                  "px-2.5 py-1 rounded-xs tracking-wider transition-colors",
                  currentStyle === style
                    ? "text-brand-terracotta font-bold underline underline-offset-4"
                    : "text-gray-600 hover:text-brand-clay"
                )}
              >
                {style === "all" ? "All Traditions" : style}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-brand-sand" />

          {/* Orientation */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-clay">Format:</span>
            {["all", "square", "portrait", "landscape"].map((orient) => (
              <button
                key={orient}
                onClick={() => handleFilterChange("orientation", orient)}
                className={clsx(
                  "px-2 py-1 rounded-xs tracking-wider capitalize transition-colors",
                  currentOrientation === orient
                    ? "text-brand-terracotta font-bold underline underline-offset-4"
                    : "text-gray-600 hover:text-brand-clay"
                )}
              >
                {orient}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-brand-sand" />

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-clay">Status:</span>
            {[
              { id: "all", label: "All Items" },
              { id: "available", label: "Available Now" },
              { id: "sold", label: "Collected Archive" },
            ].map((avail) => (
              <button
                key={avail.id}
                onClick={() => handleFilterChange("availability", avail.id)}
                className={clsx(
                  "px-2 py-1 rounded-xs tracking-wider transition-colors",
                  currentAvailability === avail.id
                    ? "text-brand-terracotta font-bold underline underline-offset-4"
                    : "text-gray-600 hover:text-brand-clay"
                )}
              >
                {avail.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="ml-auto text-[11px] uppercase tracking-wider text-brand-clay hover:text-brand-terracotta flex items-center space-x-1"
            >
              <RotateCcw size={11} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-brand-offwhite h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-sand mb-6">
                <h3 className="font-serif text-lg font-bold text-[#2d2a26]">Filter Artworks</h3>
                <button onClick={() => setMobileOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Filter Sections */}
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-clay mb-3">Category</h4>
                  <div className="flex flex-col space-y-2">
                    {[
                      { id: "all", label: "All Works" },
                      { id: "painting", label: "Original Paintings" },
                      { id: "jewellery", label: "Handmade Jewellery" },
                      { id: "home-decor", label: "Home Objects" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleFilterChange("type", t.id)}
                        className={clsx(
                          "text-left py-1 text-xs uppercase tracking-wider",
                          currentType === t.id ? "text-brand-terracotta font-bold" : "text-gray-600"
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-clay mb-3">Folk Style</h4>
                  <div className="flex flex-col space-y-2">
                    {["all", "Warli", "Madhubani", "Folk-Contemporary"].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleFilterChange("style", s)}
                        className={clsx(
                          "text-left py-1 text-xs uppercase tracking-wider",
                          currentStyle === s ? "text-brand-terracotta font-bold" : "text-gray-600"
                        )}
                      >
                        {s === "all" ? "All Traditions" : s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-sand flex space-x-3">
              <button
                onClick={handleReset}
                className="w-1/2 py-2.5 border border-brand-sand text-xs uppercase tracking-wider text-gray-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-1/2 py-2.5 bg-brand-clay text-white text-xs uppercase tracking-wider"
              >
                View Works
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

