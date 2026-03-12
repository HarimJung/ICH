"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";

const utilityLinks = [
  { href: "/about", label: "About" },
  { href: "/updates", label: "News" },
  { href: "/about#events", label: "Events" },
  { href: "/governance", label: "Governance" },
  { href: "/about#help", label: "Help" },
];

const navLinks = [
  { href: "/guidelines", label: "Guidelines", hasDropdown: true },
  { href: "/consultations", label: "Consultations", hasDropdown: false },
  { href: "/training", label: "Training", hasDropdown: false },
  { href: "/implementation", label: "Implementation", hasDropdown: true },
  { href: "/about", label: "About ICH", hasDropdown: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white font-sans ${scrolled ? "shadow-sm" : ""}`}>
      {/* Utility bar */}
      <div className="border-b border-border/50 hidden md:block">
        <div className="container-content flex items-center justify-end h-9 gap-5">
          {utilityLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-textSecondary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="container-content flex items-center gap-6 h-[60px]">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Logo.png"
            alt="ICH Logo"
            className="h-[40px] w-auto object-contain"
          />
        </Link>

        {/* Search bar — center */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary pointer-events-none" />
          <input
            type="text"
            placeholder="Search everything"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full h-9 bg-[#F2F3F5] rounded-sm pl-9 pr-4 text-[14px] text-textPrimary placeholder:text-textSecondary transition-all outline-none ${searchFocused ? "ring-1 ring-primary/40 bg-white" : ""
              }`}
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-0.5 px-3 py-1.5 text-[14px] font-medium text-textSecondary hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-50 mt-0.5" />}
            </Link>
          ))}
        </nav>

        {/* User icon */}
        <button className="hidden md:flex items-center justify-center w-8 h-8 text-textSecondary hover:text-primary transition-colors flex-shrink-0">
          <User className="h-5 w-5" />
        </button>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center text-textSecondary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="container-content flex flex-col py-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-3 text-[15px] font-medium text-textSecondary hover:text-primary border-b border-border/50 last:border-0 transition-colors"
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
