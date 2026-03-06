"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/guidelines", label: "Guidelines" },
  { href: "/training", label: "Training" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 font-bold text-lg">
            ICH
          </div>
          <div className="hidden sm:block">
            <div className="text-[15px] font-semibold leading-tight">
              International Council for Harmonisation
            </div>
            <div className="text-[11px] text-white/60 leading-tight">
              Technical Requirements for Pharmaceuticals
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/guidelines"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
        </nav>

        <button
          className="md:hidden text-white p-2"
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

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-4 py-3 text-[15px] font-medium text-white/80 hover:bg-white/10 hover:text-white"
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
