import Link from "next/link";
import { Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="font-sans">
      {/* Dark CTA Banner */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-content px-6 lg:px-12 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="section-label text-blue-300 mb-4">About ICH</p>
            <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-5">
              ICH is at the heart of the global dialogue on pharmaceutical
              harmonisation
            </h2>
            <p className="text-white/65 text-base leading-relaxed max-w-xl mb-8">
              We bring together regulatory authorities and the pharmaceutical
              industry to ensure safe, effective and high-quality medicines
              worldwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary bg-secondary hover:opacity-90">
                Learn more
              </Link>
              <Link
                href="/guidelines"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 text-white px-5 py-2.5 text-sm font-semibold transition-all hover:border-white hover:bg-white/10"
              >
                Browse Guidelines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer links */}
      <div className="bg-background border-t border-border">
        <div className="mx-auto max-w-content px-6 lg:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-border/80">
            {/* Logo & Info */}
            <div className="md:w-1/4">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shadow-sm">
                  <span className="text-white font-black text-xs">IC</span>
                </div>
                <span className="text-primary font-black text-2xl tracking-tight">
                  ICH
                </span>
              </div>
              <p className="text-[13px] text-textSecondary leading-relaxed mb-6">
                The International Council for Harmonisation of Technical
                Requirements for Pharmaceuticals for Human Use.
              </p>
              <div className="flex gap-2.5">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-textSecondary hover:text-primary hover:border-primary hover:shadow-card transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:w-3/4 flex flex-wrap lg:flex-nowrap justify-between gap-8">
              <div className="w-1/2 lg:w-1/4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-textPrimary mb-4">
                  Guidelines
                </h4>
                <ul className="space-y-3">
                  {["Quality", "Safety", "Efficacy", "Multidisciplinary"].map(
                    (cat) => (
                      <li key={cat}>
                        <Link
                          href={`/guidelines?category=${cat}`}
                          className="text-[13px] text-textSecondary hover:text-primary transition-colors"
                        >
                          {cat}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="w-1/2 lg:w-1/4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-textPrimary mb-4">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: "Training Materials", href: "/training" },
                    { label: "Public Consultations", href: "/consultations" },
                    { label: "Latest Updates", href: "/updates" },
                    { label: "MedDRA", href: "/meddra" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] text-textSecondary hover:text-primary transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2 lg:w-1/4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-textPrimary mb-4">
                  About
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: "Process", href: "/about" },
                    { label: "Events", href: "/about#assemblies" },
                    { label: "Members", href: "/about#members" },
                    { label: "Governance", href: "/governance" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] text-textSecondary hover:text-primary transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2 lg:w-1/4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-textPrimary mb-4">
                  Stay Updated
                </h4>
                <p className="text-[13px] text-textSecondary mb-4 leading-relaxed">
                  Sign up for the latest ICH news and announcements.
                </p>
                <div className="flex rounded-lg overflow-hidden border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 bg-white px-3 py-2.5 text-[13px] focus:outline-none text-textPrimary placeholder:text-textSecondary"
                  />
                  <button className="bg-primary text-white px-4 py-2.5 text-[13px] font-black hover:opacity-90 transition-colors shrink-0">
                    GO
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
            <div className="flex flex-wrap items-center gap-5 text-[12px] text-textSecondary">
              {["Terms of use", "Privacy Statement", "Careers", "Contact"].map(
                (label) => (
                  <Link
                    key={label}
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                )
              )}
              <span className="text-border">|</span>
              <span>&copy; {new Date().getFullYear()} ICH. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
