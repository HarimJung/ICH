import Link from "next/link";
import {
  ArrowUpCircle,
  MessageSquare,
  GraduationCap,
  FileEdit,
  Newspaper,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Update } from "@/types";

const typeConfig: Record<
  Update["type"],
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  step_change: { icon: ArrowUpCircle, label: "Step Change" },
  consultation: { icon: MessageSquare, label: "Consultation" },
  training: { icon: GraduationCap, label: "Training" },
  revision: { icon: FileEdit, label: "Revision" },
  news: { icon: Newspaper, label: "News" },
  event: { icon: Calendar, label: "Event" },
};

export default function UpdateCard({ update }: { update: Update }) {
  const config = typeConfig[update.type];
  const Icon = config.icon;

  return (
    <div className="card p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
          <Icon className="h-5 w-5 text-secondary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium uppercase tracking-wide text-textSecondary">
              {config.label}
            </span>
            <span className="text-xs text-textSecondary">{update.date}</span>
            {update.isNew && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                New
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-textPrimary leading-snug mb-1">
            {update.title}
          </h3>
          <p className="text-sm text-textSecondary leading-relaxed line-clamp-2">
            {update.description}
          </p>
          <div className="mt-3 flex items-center gap-4">
            {update.fromStep != null && update.toStep != null && (
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                Step {update.fromStep} <ArrowRight className="h-3 w-3" /> Step{" "}
                {update.toStep}
              </span>
            )}
            {update.guidelineId && (
              <Link
                href={`/guidelines/${encodeURIComponent(update.guidelineId)}`}
                className="font-mono text-xs text-secondary font-medium hover:underline"
              >
                {update.guidelineId}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
