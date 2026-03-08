import Link from "next/link";

const footerLinks = {
  Guidelines: [
    { href: "/guidelines?category=Quality", label: "Quality" },
    { href: "/guidelines?category=Safety", label: "Safety" },
    { href: "/guidelines?category=Efficacy", label: "Efficacy" },
    { href: "/guidelines?category=Multidisciplinary", label: "Multidisciplinary" },
  ],
  Resources: [
    { href: "/training", label: "Training Materials" },
    { href: "/consultations", label: "Public Consultations" },
    { href: "/implementation", label: "Implementation Status" },
    { href: "/updates", label: "Latest Updates" },
    { href: "/meddra", label: "MedDRA" },
    { href: "/about", label: "About ICH" },
  ],
  Members: [
    { href: "#", label: "FDA (US)" },
    { href: "#", label: "EMA (EU)" },
    { href: "#", label: "PMDA (Japan)" },
    { href: "#", label: "Health Canada" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-content px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 font-bold text-lg">
                ICH
              </div>
              <span className="font-semibold">ICH</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              The International Council for Harmonisation of Technical
              Requirements for Pharmaceuticals for Human Use.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} International Council for
            Harmonisation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-white/60">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/60">
              Terms of Use
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/60">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
