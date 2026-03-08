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
      className="group block bg-white border border-border hover:border-primary/30 p-5 transition-colors hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-[13px] text-secondary font-semibold">
          {guideline.id}
        </span>
        <StepBadge step={guideline.step} />
      </div>
      <h3 className="text-[15px] font-semibold text-textPrimary leading-snug mb-2 group-hover:text-primary transition-colors">
        {guideline.title}
      </h3>
      <p className="text-[13px] text-textSecondary leading-relaxed line-clamp-2 mb-4">
        {guideline.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CategoryBadge category={guideline.category} />
          <span className="text-[12px] text-textSecondary">{guideline.lastUpdated}</span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-textSecondary group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
}
