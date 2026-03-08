"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X, Globe, ChevronDown } from "lucide-react";

const topLinks = [
  { href: "/about", label: "About" },
  { href: "/updates", label: "News" },
  { href: "#", label: "Events" },
  { href: "/training", label: "Programmes" },
  { href: "#", label: "Data & tools" },
];

const mainLinks = [
  { href: "/guidelines", label: "Guidelines" },
  { href: "/consultations", label: "Consultations" },
  { href: "/training", label: "Training" },
  { href: "/meddra", label: "MedDRA" },
  { href: "/about", label: "Process" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white font-sans transition-shadow duration-200 ${scrolled ? "shadow-nav" : "border-b border-border"
        }`}
    >
      {/* Top thin utility bar */}
      <div className="hidden lg:block border-b border-border/60 bg-background">
        <div className="mx-auto max-w-content flex justify-between items-center px-6 lg:px-12 py-1.5">
          <div className="flex items-center gap-1.5 text-[12px] text-textSecondary">
            <span className="font-semibold text-textPrimary">ICH</span>
            <span className="text-border mx-1">|</span>
            <span>International Council for Harmonisation</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] font-medium text-textSecondary">
            {topLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <Globe className="h-3.5 w-3.5" />
              <span>EN</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="bg-white">
        <div className="mx-auto max-w-content flex items-center justify-between px-6 lg:px-12 py-3 md:py-4 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm tracking-tight">IC</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-primary font-black text-2xl md:text-[26px] tracking-tight">
                  ICH
                </span>
                <span className="hidden md:block text-[10px] text-textSecondary font-medium tracking-wide leading-tight">
                  Harmonisation
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2.5 text-[15px] font-medium text-textPrimary hover:text-primary transition-colors rounded-md hover:bg-background group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full transition-all duration-200 group-hover:w-4/5" />
              </Link>
            ))}
          </nav>

          {/* Right side: Search */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-44 lg:w-52 h-9 bg-background rounded-full pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-textPrimary placeholder:text-textSecondary border border-transparent focus:border-primary/30"
              />
            </div>
            <Link
              href="/guidelines"
              className="btn-primary text-xs px-4 py-2 hidden lg:inline-flex"
            >
              Guidelines
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex xl:hidden items-center gap-2">
            <button className="md:hidden w-9 h-9 rounded-full bg-background flex items-center justify-center text-textPrimary hover:text-primary transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-textPrimary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-border absolute w-full shadow-elevated pb-6 z-40">
          {/* Mobile search */}
          <div className="px-6 pt-4 pb-2 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
              <input
                type="text"
                placeholder="Search guidelines, topics..."
                className="w-full h-11 bg-background rounded-full pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-textPrimary placeholder:text-textSecondary border border-transparent focus:border-primary/30"
              />
            </div>
          </div>

          <nav className="flex flex-col px-6 py-2">
            <div className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-3 mt-4">
              Navigation
            </div>
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-3 text-base font-semibold text-textPrimary border-b border-border/50 last:border-0 hover:text-primary transition-colors flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-3 mt-8">
              More
            </div>
            {topLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2.5 text-sm font-medium text-textSecondary hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
