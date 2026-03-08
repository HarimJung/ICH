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
    <div className="group bg-white border border-border hover:border-primary/30 p-5 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[consultation.status]}`}
        >
          {statusLabels[consultation.status]}
        </span>
        <Link
          href={`/guidelines/${encodeURIComponent(consultation.guidelineId)}`}
          className="font-mono text-[13px] text-secondary font-medium hover:underline"
        >
          {consultation.guidelineId}
        </Link>
      </div>
      <h3 className="text-[15px] font-semibold text-textPrimary leading-snug mb-2 group-hover:text-primary transition-colors">
        {consultation.title}
      </h3>
      <p className="text-[13px] text-textSecondary leading-relaxed line-clamp-2 mb-4">
        {consultation.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[12px] text-textSecondary">
          <span>Opens: {consultation.openDate}</span>
          <span>Closes: {consultation.closeDate}</span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-textSecondary group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
}
