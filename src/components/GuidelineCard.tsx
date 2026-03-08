import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      className="card group block p-6 hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-sm text-secondary font-semibold bg-secondary/10 px-2.5 py-1 rounded-md">
          {guideline.id}
        </span>
        <div className="flex gap-2 shrink-0">
          <StepBadge step={guideline.step} />
        </div>
      </div>
      <h3 className="text-[17px] font-semibold text-textPrimary leading-snug mb-2 group-hover:text-primary transition-colors">
        {guideline.title}
      </h3>
      <p className="text-sm text-textMuted leading-relaxed line-clamp-2 mb-4">
        {guideline.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CategoryBadge category={guideline.category} />
          <span className="text-xs text-textMuted">{guideline.lastUpdated}</span>
        </div>
        <ArrowRight className="h-4 w-4 text-textMuted group-hover:text-secondary transition-colors" />
      </div>
    </Link>
  );
}
