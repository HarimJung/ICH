import Link from "next/link";
import { Training } from "@/types";
import { ArrowRight, FileText } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

export default function TrainingCard({ training }: { training: Training }) {
  return (
    <div className="group bg-white border border-border shadow-card hover:shadow-cardHover overflow-hidden transition-shadow duration-200">
      {/* Thumbnail — IEA flat style */}
      <div className="relative h-28 bg-backgroundAlt flex items-center justify-center border-b border-border">
        <FileText className="h-8 w-8 text-primary/30" />
        <span className="absolute top-3 left-3 rounded-full border border-border bg-white px-2.5 py-0.5 text-[11px] font-semibold text-textSecondary capitalize">
          {training.type}
        </span>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-textPrimary leading-snug mb-3 group-hover:text-primary transition-colors">
          {training.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={training.category} />
          <Link
            href={`/guidelines/${encodeURIComponent(training.relatedGuideline)}`}
            className="font-mono text-[12px] text-secondary font-medium hover:underline"
          >
            {training.relatedGuideline}
          </Link>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-textSecondary mb-4">
          <span>{training.duration}</span>
          <span className="opacity-30">|</span>
          <span>{training.language}</span>
          <span className="opacity-30">|</span>
          <span>{training.datePublished}</span>
        </div>
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-secondary">
          View Module <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
