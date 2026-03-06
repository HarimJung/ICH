import Link from "next/link";
import { Guideline } from "@/types";
import StepBadge from "./StepBadge";
import CategoryBadge from "./CategoryBadge";

export default function GuidelineCard({
  guideline,
}: {
  guideline: Guideline;
}) {
  return (
    <Link
      href={`/guidelines/${encodeURIComponent(guideline.id)}`}
      className="card block p-6 hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="guideline-id font-mono text-sm text-secondary font-medium">
          {guideline.id}
        </span>
        <div className="flex gap-2 shrink-0">
          <CategoryBadge category={guideline.category} />
          <StepBadge step={guideline.step} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-textPrimary leading-snug mb-2">
        {guideline.title}
      </h3>
      <p className="text-sm text-textSecondary leading-relaxed line-clamp-2">
        {guideline.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-textSecondary">
        <span>Version: {guideline.currentVersion}</span>
        <span>Updated: {guideline.lastUpdated}</span>
        {guideline.hasActiveConsultation && (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent font-semibold">
            Open Consultation
          </span>
        )}
      </div>
    </Link>
  );
}
