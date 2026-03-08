import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  breadcrumbs?: Breadcrumb[];
  overline?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  size?: "default" | "large";
}

export default function HeroSection({
  breadcrumbs,
  overline,
  title,
  subtitle,
  children,
  size = "default",
}: HeroSectionProps) {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/[0.08] blur-[120px] pointer-events-none" />

      <div
        className={`container-content relative z-10 ${
          size === "large" ? "pt-24 pb-20 lg:pt-32 lg:pb-24" : "pt-16 pb-14 lg:pt-20 lg:pb-16"
        }`}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white/80 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {overline && (
          <p className="text-overline uppercase tracking-[0.08em] text-secondary/80 mb-4 font-semibold">
            {overline}
          </p>
        )}

        <h1
          className={`text-white font-bold leading-[1.15] max-w-3xl ${
            size === "large"
              ? "text-[36px] md:text-hero tracking-[-0.03em]"
              : "text-[32px] md:text-h1 tracking-[-0.02em]"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
