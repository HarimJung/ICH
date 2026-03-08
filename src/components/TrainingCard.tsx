import Link from "next/link";
import { Training } from "@/types";
import { PlayCircle, BookOpen, FileText, Monitor, ArrowRight } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  video: PlayCircle,
  webinar: Monitor,
  document: FileText,
  "e-learning": BookOpen,
};

const thumbnailGradients: Record<string, string> = {
  video: "from-primary to-[#004D73]",
  webinar: "from-[#004D73] to-secondary",
  document: "from-dark to-primary",
  "e-learning": "from-secondary to-primary",
};

export default function TrainingCard({ training }: { training: Training }) {
  const Icon = typeIcons[training.type] || FileText;
  const gradient = thumbnailGradients[training.type] || "from-primary to-[#004D73]";

  return (
    <div className="card overflow-hidden">
      {/* Thumbnail */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <Icon className="h-12 w-12 text-white/60" />
        <span className="absolute top-3 left-3 rounded-full bg-white/20 backdrop-blur-sm px-3 py-0.5 text-xs font-semibold text-white">
          {training.type}
        </span>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-[16px] font-semibold text-textPrimary leading-snug mb-3">
          {training.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={training.category} />
          <Link
            href={`/guidelines/${encodeURIComponent(training.relatedGuideline)}`}
            className="font-mono text-xs text-secondary font-medium hover:underline"
          >
            {training.relatedGuideline}
          </Link>
        </div>
        <div className="flex items-center gap-3 text-xs text-textMuted mb-4">
          <span>{training.duration}</span>
          <span className="text-border">|</span>
          <span>{training.language}</span>
          <span className="text-border">|</span>
          <span>{training.datePublished}</span>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
          View Module <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
