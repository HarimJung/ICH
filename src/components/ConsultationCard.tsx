import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Consultation } from "@/types";

const statusStyles: Record<Consultation["status"], string> = {
  open: "bg-green-50 text-green-800",
  closed: "bg-gray-100 text-gray-600",
  upcoming: "bg-amber-50 text-amber-700",
};

const statusLabels: Record<Consultation["status"], string> = {
  open: "Open",
  closed: "Closed",
  upcoming: "Upcoming",
};

export default function ConsultationCard({
  consultation,
}: {
  consultation: Consultation;
}) {
  return (
    <div className="card p-6 group">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[consultation.status]}`}
        >
          {statusLabels[consultation.status]}
        </span>
        <Link
          href={`/guidelines/${encodeURIComponent(consultation.guidelineId)}`}
          className="font-mono text-sm text-secondary font-medium hover:underline"
        >
          {consultation.guidelineId}
        </Link>
      </div>
      <h3 className="text-[17px] font-semibold text-textPrimary leading-snug mb-2 group-hover:text-primary transition-colors">
        {consultation.title}
      </h3>
      <p className="text-sm text-textMuted leading-relaxed line-clamp-2 mb-4">
        {consultation.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-textMuted">
          <span>Opens: {consultation.openDate}</span>
          <span>Closes: {consultation.closeDate}</span>
        </div>
        <ArrowRight className="h-4 w-4 text-textMuted group-hover:text-secondary transition-colors" />
      </div>
    </div>
  );
}
