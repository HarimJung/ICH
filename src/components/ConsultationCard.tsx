import Link from "next/link";
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
    <div className="card p-6">
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
      <h3 className="text-lg font-semibold text-textPrimary leading-snug mb-2">
        {consultation.title}
      </h3>
      <p className="text-sm text-textSecondary leading-relaxed line-clamp-2 mb-4">
        {consultation.description}
      </p>
      <div className="flex items-center gap-4 text-xs text-textSecondary">
        <span>Opens: {consultation.openDate}</span>
        <span>Closes: {consultation.closeDate}</span>
      </div>
    </div>
  );
}
