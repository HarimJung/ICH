import Link from "next/link";
import Image from "next/image";

const footerColumns = [
  {
    title: "Guidelines",
    links: [
      { label: "Quality (Q)", href: "/guidelines?category=Quality" },
      { label: "Safety (S)", href: "/guidelines?category=Safety" },
      { label: "Efficacy (E)", href: "/guidelines?category=Efficacy" },
      { label: "Multidisciplinary (M)", href: "/guidelines?category=Multidisciplinary" },
      { label: "All Guidelines", href: "/guidelines" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Training Materials", href: "/training" },
      { label: "Public Consultations", href: "/consultations" },
      { label: "Implementation Status", href: "/implementation" },
      { label: "Latest Updates", href: "/updates" },
      { label: "MedDRA", href: "/meddra" },
    ],
  },
  {
    title: "About ICH",
    links: [
      { label: "Our Mission", href: "/about" },
      { label: "Members & Observers", href: "/governance" },
      { label: "Governance", href: "/governance" },
      { label: "Assembly Meetings", href: "/governance" },
      { label: "Process", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="container-content pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Logo column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5 inline-block">
              <Image
                src="/Logo.png"
                alt="ICH Logo"
                width={140}
                height={51}
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[240px]">
              International Council for Harmonisation of Technical Requirements
              for Pharmaceuticals for Human Use.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-white/40 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} International Council for
            Harmonisation. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white/60 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
