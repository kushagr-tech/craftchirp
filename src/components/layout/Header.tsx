"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/gallery" },
  { name: "Our Process", href: "/#process" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-brand-offwhite/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group flex items-center space-x-2 z-50">
          <span className="font-serif text-2xl tracking-wide text-brand-clay font-bold group-hover:text-brand-terracotta transition-colors">
            CraftChirp
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-[#2d2a26] hover:text-brand-clay transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          className={clsx(
            "fixed inset-0 bg-brand-sand flex flex-col justify-center items-center h-screen space-y-8 z-40"
          )}
          initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
          animate={{
            opacity: isOpen ? 1 : 0,
            clipPath: isOpen ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ y: 20, opacity: 0 }}
              animate={isOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: isOpen ? i * 0.1 : 0 }}
            >
              <Link
                href={link.href}
                className="font-serif text-4xl text-brand-clay hover:opacity-70 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
}
