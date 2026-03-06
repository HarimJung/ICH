import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import guidelines from "@/data/guidelines.json";
import training from "@/data/training.json";
import { Guideline, Training } from "@/types";
import StepBadge from "@/components/StepBadge";
import CategoryBadge from "@/components/CategoryBadge";
import TrainingCard from "@/components/TrainingCard";

const typedGuidelines = guidelines as Guideline[];
const typedTraining = training as Training[];

export function generateStaticParams() {
  return typedGuidelines.map((g) => ({
    id: encodeURIComponent(g.id),
  }));
}

export default function GuidelineDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const decodedId = decodeURIComponent(params.id);
  const guideline = typedGuidelines.find((g) => g.id === decodedId);

  if (!guideline) {
    notFound();
  }

  const relatedGuidelines = typedGuidelines.filter((g) =>
    guideline.relatedGuidelines.includes(g.id)
  );

  const relatedTraining = typedTraining.filter((t) =>
    guideline.relatedTraining.includes(t.id)
  );

  const agencies = [
    { key: "FDA", label: "FDA (US)" },
    { key: "EMA", label: "EMA (EU)" },
    { key: "PMDA", label: "PMDA (Japan)" },
    { key: "HC", label: "Health Canada" },
    { key: "ANVISA", label: "ANVISA (Brazil)" },
  ] as const;

  return (
    <div className="container-content section-gap">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/guidelines"
          className="flex items-center gap-2 text-sm text-secondary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Guidelines
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-lg text-secondary font-medium">
              {guideline.id}
            </span>
            <CategoryBadge category={guideline.category} />
            <StepBadge step={guideline.step} />
            {guideline.hasActiveConsultation && (
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Open Consultation
              </span>
            )}
          </div>

          <h1 className="mb-4">{guideline.title}</h1>

          <p className="text-textSecondary leading-relaxed mb-8">
            {guideline.description}
          </p>

          {/* Meta */}
          <div className="card p-6 mb-8">
            <h3 className="mb-4">Guideline Details</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-textSecondary">Current Version</dt>
                <dd className="font-medium">{guideline.currentVersion}</dd>
              </div>
              <div>
                <dt className="text-textSecondary">Step Reached</dt>
                <dd className="font-medium">Step {guideline.step}</dd>
              </div>
              <div>
                <dt className="text-textSecondary">Date Reached</dt>
                <dd className="font-medium">{guideline.dateReached}</dd>
              </div>
              <div>
                <dt className="text-textSecondary">Last Updated</dt>
                <dd className="font-medium">{guideline.lastUpdated}</dd>
              </div>
            </dl>
          </div>

          {/* Implementation Status */}
          <div className="card p-6 mb-8">
            <h3 className="mb-4">Implementation Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-medium text-textSecondary">
                      Agency
                    </th>
                    <th className="pb-3 text-center font-medium text-textSecondary">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((agency) => {
                    const implemented =
                      guideline.implementationStatus[agency.key];
                    return (
                      <tr key={agency.key} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium">{agency.label}</td>
                        <td className="py-3 text-center">
                          {implemented ? (
                            <CheckCircle2 className="inline h-5 w-5 text-success" />
                          ) : (
                            <XCircle className="inline h-5 w-5 text-textSecondary/40" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {guideline.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background px-3 py-1 text-xs text-textSecondary border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Download */}
          <div className="card p-6 mb-6">
            <a
              href={guideline.pdfUrl}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 w-full"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>

          {/* Related Guidelines */}
          {relatedGuidelines.length > 0 && (
            <div className="card p-6 mb-6">
              <h3 className="mb-4 text-lg">Related Guidelines</h3>
              <ul className="space-y-3">
                {relatedGuidelines.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={`/guidelines/${encodeURIComponent(g.id)}`}
                      className="flex items-start gap-2 rounded-md p-2 -mx-2 hover:bg-background transition-colors"
                    >
                      <span className="font-mono text-sm text-secondary shrink-0 font-medium">
                        {g.id}
                      </span>
                      <span className="text-sm text-textPrimary leading-snug">
                        {g.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Training */}
          {relatedTraining.length > 0 && (
            <div className="card p-6">
              <h3 className="mb-4 text-lg">Related Training</h3>
              <div className="space-y-4">
                {relatedTraining.map((t) => (
                  <TrainingCard key={t.id} training={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
