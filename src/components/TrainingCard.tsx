import Link from "next/link";
import { Training } from "@/types";
import { PlayCircle, BookOpen, FileText, Monitor, ArrowRight } from "lucide-react";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  video: PlayCircle,
  webinar: Monitor,
  document: FileText,
  "e-learning": BookOpen,
};

const typeBadgeColors: Record<string, string> = {
  video: "bg-blue-500",
  webinar: "bg-purple-500",
  document: "bg-red-500",
  "e-learning": "bg-green-500",
};

const thumbnailGradients: Record<string, string> = {
  video: "from-primary to-secondary",
  webinar: "from-purple-600 to-secondary",
  document: "from-red-600 to-primary",
  "e-learning": "from-green-600 to-primary",
};

export default function TrainingCard({ training }: { training: Training }) {
  const Icon = typeIcons[training.type] || FileText;
  const badgeColor = typeBadgeColors[training.type] || "bg-gray-500";
  const gradient = thumbnailGradients[training.type] || "from-primary to-secondary";

  return (
    <div className="card overflow-hidden">
      {/* Thumbnail */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <Icon className="h-12 w-12 text-white/80" />
        <span
          className={`absolute top-3 left-3 rounded-md px-2 py-0.5 text-xs font-semibold text-white ${badgeColor}`}
        >
          {training.type}
        </span>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-textPrimary leading-snug mb-2">
          {training.title}
        </h3>
        <div className="mb-3">
          <Link
            href={`/guidelines/${encodeURIComponent(training.relatedGuideline)}`}
            className="font-mono text-xs text-secondary font-medium rounded bg-secondary/10 px-1.5 py-0.5 hover:underline"
          >
            {training.relatedGuideline}
          </Link>
        </div>
        <div className="flex items-center gap-3 text-xs text-textSecondary mb-4">
          <span>{training.duration}</span>
          <span>·</span>
          <span>{training.language}</span>
          <span>·</span>
          <span>{training.datePublished}</span>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline">
          View Module <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
