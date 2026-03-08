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
    <section className="bg-white border-b border-border">
      <div
        className={`container-content ${
          size === "large" ? "pt-12 pb-10 lg:pt-14 lg:pb-12" : "pt-8 pb-8 lg:pt-10 lg:pb-10"
        }`}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-1.5 text-[13px] text-textSecondary">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="opacity-40">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-textPrimary font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {overline && (
          <p className="text-[12px] uppercase tracking-[0.08em] text-textSecondary font-semibold mb-3">
            {overline}
          </p>
        )}

        <h1
          className={`text-textPrimary font-bold leading-[1.15] max-w-3xl ${
            size === "large"
              ? "text-[32px] md:text-[40px] tracking-[-0.02em]"
              : "text-[26px] md:text-[32px] tracking-[-0.02em]"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-[16px] text-textSecondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
