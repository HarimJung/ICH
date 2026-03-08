import Link from "next/link";
import { FileText, GraduationCap, MessageSquare } from "lucide-react";
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
        <span className="font-mono text-sm text-secondary font-medium rounded-md bg-secondary/10 px-2 py-1">
          {guideline.id}
        </span>
        <div className="flex gap-2 shrink-0">
          <StepBadge step={guideline.step} />
          <CategoryBadge category={guideline.category} />
        </div>
      </div>
      <h3 className="text-[18px] font-semibold text-textPrimary leading-snug mb-2">
        {guideline.title}
      </h3>
      <p className="text-sm text-textSecondary leading-relaxed line-clamp-2">
        {guideline.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-[13px] text-textSecondary">
        <span>Last updated: {guideline.lastUpdated}</span>
        <div className="flex items-center gap-2 ml-auto">
          <FileText className="h-4 w-4 text-textSecondary/60" />
          {guideline.relatedTraining.length > 0 && (
            <GraduationCap className="h-4 w-4 text-secondary" />
          )}
          {guideline.hasActiveConsultation && (
            <MessageSquare className="h-4 w-4 text-accent" />
          )}
        </div>
      </div>
    </Link>
  );
}
