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
  { icon: React.ComponentType<{ className?: string }>; label: string; color: string }
> = {
  step_change: { icon: ArrowUpCircle, label: "Step Change", color: "bg-blue-50 text-blue-800" },
  consultation: { icon: MessageSquare, label: "Consultation", color: "bg-green-50 text-green-800" },
  training: { icon: GraduationCap, label: "Training", color: "bg-purple-50 text-purple-700" },
  revision: { icon: FileEdit, label: "Revision", color: "bg-amber-50 text-amber-700" },
  news: { icon: Newspaper, label: "News", color: "bg-teal-50 text-teal-700" },
  event: { icon: Calendar, label: "Event", color: "bg-red-50 text-red-700" },
};

export default function UpdateCard({ update }: { update: Update }) {
  const config = typeConfig[update.type];

  return (
    <div className="group bg-white border border-border hover:border-primary/30 p-5 transition-colors">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${config.color}`}>
              {config.label}
            </span>
            <span className="text-[12px] text-textSecondary">{update.date}</span>
            {update.isNew && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                New
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-semibold text-textPrimary leading-snug mb-1 group-hover:text-primary transition-colors">
            {update.title}
          </h3>
          <p className="text-[13px] text-textSecondary leading-relaxed line-clamp-2">
            {update.description}
          </p>
          <div className="mt-3 flex items-center gap-4">
            {update.fromStep != null && update.toStep != null && (
              <span className="flex items-center gap-1 text-[12px] font-medium text-primary">
                Step {update.fromStep} <ArrowRight className="h-3 w-3" /> Step{" "}
                {update.toStep}
              </span>
            )}
            {update.guidelineId && (
              <Link
                href={`/guidelines/${encodeURIComponent(update.guidelineId)}`}
                className="font-mono text-[12px] text-secondary font-medium hover:underline"
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
