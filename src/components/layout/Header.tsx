"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ShoppingBag, Globe, Search } from "lucide-react";
import { SearchModal } from "@/components/ui/SearchModal";
import { CartStore } from "@/lib/commerce/cart-store";
import clsx from "clsx";

const navLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "Collections", href: "/collections" },
  { name: "Exhibitions", href: "/exhibitions" },
  { name: "Jewellery", href: "/jewellery" },
  { name: "Journal", href: "/journal" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR'>('USD');
  const [hasCartItem, setHasCartItem] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateCartCount = () => {
      const c = CartStore.get();
      setHasCartItem(!!c.item);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  // Handle ESC key to close mobile navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-brand-offwhite/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(45,42,38,0.06)] py-4 border-b border-brand-sand/40"
          : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand Monogram & Name */}
        <Link href="/" className="group flex flex-col z-50">
          <span className="font-serif text-2xl tracking-wide text-brand-clay font-bold group-hover:text-brand-terracotta transition-colors">
            Craftchirp
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#2d2a26]/60 -mt-0.5">
            Original Folk Art
          </span>
        </Link>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#2d2a26]/80 hover:text-brand-clay transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-clay hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Utility Actions: Currency Selector, Search & Cart Trigger */}
        <div className="hidden lg:flex items-center space-x-5 z-50">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center space-x-1.5 text-xs text-[#2d2a26]/70 hover:text-brand-clay px-2 py-1 rounded-sm transition-colors"
            aria-label="Search artworks"
          >
            <Search size={16} />
            <span className="text-[11px] uppercase tracking-wider hidden xl:inline">Search</span>
          </button>

          {/* Subtle Currency Toggle */}
          <div className="flex items-center space-x-1.5 text-xs text-[#2d2a26]/70 border border-brand-sand/60 px-2.5 py-1 rounded-sm bg-brand-offwhite/50">
            <Globe size={13} className="text-brand-clay" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-transparent text-xs font-medium uppercase tracking-wider text-[#2d2a26] focus:outline-none cursor-pointer"
              aria-label="Select currency"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="group relative flex items-center p-1.5 text-[#2d2a26] hover:text-brand-clay transition-colors"
            aria-label="View shopping bag"
          >
            <ShoppingBag size={20} className="stroke-[1.75]" />
            {hasCartItem && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-terracotta" />
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center space-x-3 lg:hidden z-50">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-[#2d2a26]"
            aria-label="Search artworks"
          >
            <Search size={20} />
          </button>
          <Link
            href="/cart"
            className="relative p-1.5 text-[#2d2a26]"
            aria-label="View shopping bag"
          >
            <ShoppingBag size={21} className="stroke-[1.75]" />
            {hasCartItem && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-terracotta" />
            )}
          </Link>
          <button
            className="text-foreground p-1 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open navigation menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu Drawer */}
        <motion.div
          className={clsx(
            "fixed inset-0 bg-brand-offwhite flex flex-col justify-between p-8 pt-28 h-screen z-40 lg:hidden overflow-y-auto"
          )}
          initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
          animate={{
            opacity: isOpen ? 1 : 0,
            clipPath: isOpen ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)",
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div className="flex flex-col space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-terracotta font-semibold">
              Explore Craftchirp
            </span>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ y: 20, opacity: 0 }}
                animate={isOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: isOpen ? i * 0.06 : 0 }}
              >
                <Link
                  href={link.href}
                  className="font-serif text-3xl text-[#2d2a26] hover:text-brand-clay transition-colors block py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-brand-sand flex flex-col space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-sm font-semibold uppercase tracking-wider text-brand-clay focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 font-sans">
              Handcrafted by Rachana Agarwal • Insured Global Express Shipping
            </p>
          </div>
        </motion.div>
      </div>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
}
