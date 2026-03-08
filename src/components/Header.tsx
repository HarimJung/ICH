"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/guidelines", label: "Guidelines" },
  { href: "/consultations", label: "Consultations" },
  { href: "/training", label: "Training" },
  { href: "/implementation", label: "Implementation" },
  { href: "/about", label: "About ICH" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white font-sans transition-shadow duration-300 ${
        scrolled ? "shadow-nav" : ""
      }`}
    >
      <div className="container-content flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-tight">
              ICH
            </span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-primary font-bold text-xl tracking-tight">
              ICH
            </span>
            <span className="text-[11px] text-textMuted font-medium tracking-wide">
              Harmonisation
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-[15px] font-medium text-textSecondary hover:text-primary transition-colors rounded-lg hover:bg-backgroundAlt"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/guidelines"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg text-textMuted hover:text-primary hover:bg-backgroundAlt transition-colors"
            aria-label="Search guidelines"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/guidelines"
            className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5"
          >
            Browse Guidelines
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-textSecondary hover:text-primary hover:bg-backgroundAlt transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-elevated">
          <nav className="container-content flex flex-col py-4">
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
            <Link
              href="/guidelines"
              className="btn-primary mt-4 text-sm justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Guidelines
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
