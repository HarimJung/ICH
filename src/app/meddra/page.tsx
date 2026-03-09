import { Globe, CheckCircle2, ArrowRight } from "lucide-react";
import meddra from "@/data/meddra.json";
import guidelines from "@/data/guidelines.json";
import { Guideline } from "@/types";
import GuidelineCard from "@/components/GuidelineCard";
import HeroSection from "@/components/HeroSection";

const typedGuidelines = guidelines as Guideline[];

const relatedGuidelines = typedGuidelines.filter((g) =>
  meddra.relatedGuidelines.includes(g.id)
);

export default function MedDRAPage() {
  return (
    <div>
      <HeroSection
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "MedDRA" }]}
        title="MedDRA — Medical Dictionary for Regulatory Activities"
        subtitle="The international medical terminology used by regulatory authorities and the pharmaceutical industry."
      />

      <section className="bg-white">
        <div className="container-content py-10 lg:py-14">
          {/* Description + Version */}
          <div className="bg-backgroundAlt border border-border p-6 md:p-8 mb-12 shadow-card">
            <p className="text-textPrimary leading-relaxed text-base mb-6">
              {meddra.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-white">
                Version {meddra.currentVersion}
              </span>
              <span className="text-sm text-textMuted">
                Updated twice annually (March and September)
              </span>
            </div>
            <div>
              <h3 className="overline mb-3">Available Languages</h3>
              <div className="flex flex-wrap gap-2">
                {meddra.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-backgroundAlt border border-border px-3 py-1 text-sm text-textPrimary font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Facts */}
          <div className="mb-12">
            <h2 className="text-h3 mb-6">Key Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meddra.keyFacts.map((fact) => (
                <div key={fact} className="bg-white border border-border p-5 flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-gray-100">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-sm text-textPrimary leading-relaxed">
                    {fact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Learn More Card */}
          <div className="mb-12">
            <div className="bg-backgroundAlt border border-border p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-[17px] font-semibold text-textPrimary">
                      Learn More at MedDRA.org
                    </h3>
                  </div>
                  <p className="text-[13px] text-textSecondary leading-relaxed max-w-xl ml-12">
                    MedDRA is maintained on a dedicated platform. Visit meddra.org
                    for full access, documentation and support.
                  </p>
                </div>
                <a
                  href={meddra.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-5 py-2.5 shrink-0 hover:opacity-90 transition-opacity"
                >
                  Visit meddra.org
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Related Guidelines */}
          {relatedGuidelines.length > 0 && (
            <div>
              <h2 className="text-h3 mb-6">Related ICH Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedGuidelines.map((g) => (
                  <GuidelineCard key={g.id} guideline={g} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
