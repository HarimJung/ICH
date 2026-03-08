import Link from "next/link";
import { Globe, CheckCircle2, ArrowRight } from "lucide-react";
import meddra from "@/data/meddra.json";
import guidelines from "@/data/guidelines.json";
import { Guideline } from "@/types";
import GuidelineCard from "@/components/GuidelineCard";

const typedGuidelines = guidelines as Guideline[];

const relatedGuidelines = typedGuidelines.filter((g) =>
  meddra.relatedGuidelines.includes(g.id)
);

export default function MedDRAPage() {
  return (
    <div className="container-content section-gap">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-textSecondary">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-textPrimary font-medium">MedDRA</span>
      </nav>

      <h1 className="mb-8">
        MedDRA — Medical Dictionary for Regulatory Activities
      </h1>

      {/* Hero-like section */}
      <div className="rounded-lg bg-primary/5 border-l-4 border-secondary p-6 md:p-8 mb-12">
        <p className="text-textPrimary leading-relaxed text-base mb-6">
          {meddra.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-white">
            Version {meddra.currentVersion}
          </span>
          <span className="text-sm text-textSecondary">
            Updated twice annually (March and September)
          </span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wide mb-3">
            Available Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {meddra.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-white border border-border px-3 py-1 text-sm text-textPrimary font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <section className="mb-12">
        <h2 className="mb-6">Key Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meddra.keyFacts.map((fact) => (
            <div key={fact} className="card flex items-start gap-4 p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-textPrimary leading-relaxed">
                {fact}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More Card */}
      <section className="mb-12">
        <div className="card p-8 bg-primary/5 border-2 border-secondary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-6 w-6 text-secondary" />
                <h3 className="text-xl font-semibold">
                  Learn More at MedDRA.org
                </h3>
              </div>
              <p className="text-sm text-textSecondary leading-relaxed max-w-xl">
                MedDRA is maintained on a dedicated platform. Visit meddra.org
                for full access, documentation and support.
              </p>
            </div>
            <a
              href={meddra.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 shrink-0"
            >
              Visit meddra.org
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Guidelines */}
      {relatedGuidelines.length > 0 && (
        <section>
          <h2 className="mb-6">Related ICH Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedGuidelines.map((g) => (
              <GuidelineCard key={g.id} guideline={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
