import { Training } from "@/types";
import CategoryBadge from "./CategoryBadge";
import { PlayCircle, BookOpen, FileText, Monitor } from "lucide-react";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  video: PlayCircle,
  webinar: Monitor,
  document: FileText,
  "e-learning": BookOpen,
};

export default function TrainingCard({ training }: { training: Training }) {
  const Icon = typeIcons[training.type] || FileText;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
          <Icon className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-textSecondary">
            {training.type}
          </span>
          <span className="mx-2 text-textSecondary">·</span>
          <span className="text-xs text-textSecondary">{training.duration}</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-textPrimary leading-snug mb-2">
        {training.title}
      </h3>
      <div className="mt-3 flex items-center justify-between">
        <CategoryBadge category={training.category} />
        <span className="text-xs text-textSecondary">{training.datePublished}</span>
      </div>
    </div>
  );
}
