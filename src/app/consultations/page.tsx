"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Download, FileText } from "lucide-react";
import consultations from "@/data/consultations.json";
import { Consultation, ConsultationStatus } from "@/types";

const typedConsultations = consultations as Consultation[];

const statusStyles: Record<ConsultationStatus, string> = {
  open: "bg-green-50 text-green-800",
  closed: "bg-gray-100 text-gray-600",
  upcoming: "bg-amber-50 text-amber-800",
};

function getDeadlineProgress(openDate: string, closeDate: string): number {
  const open = new Date(openDate).getTime();
  const close = new Date(closeDate).getTime();
  const now = Date.now();
  if (now <= open) return 0;
  if (now >= close) return 100;
  return Math.round(((now - open) / (close - open)) * 100);
}

function getProgressColor(pct: number): string {
  if (pct < 50) return "bg-green-500";
  if (pct < 80) return "bg-amber-500";
  return "bg-red-500";
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

export default function ConsultationsPage() {
  const [activeStatus, setActiveStatus] = useState<ConsultationStatus>("open");
  const [expandedGuidance, setExpandedGuidance] = useState(false);

  const counts = useMemo(() => {
    return {
      open: typedConsultations.filter((c) => c.status === "open").length,
      upcoming: typedConsultations.filter((c) => c.status === "upcoming")
        .length,
      closed: typedConsultations.filter((c) => c.status === "closed").length,
    };
  }, []);

  const filtered = useMemo(
    () => typedConsultations.filter((c) => c.status === activeStatus),
    [activeStatus]
  );

  const tabs: { status: ConsultationStatus; label: string; count: number }[] = [
    { status: "open", label: "Open", count: counts.open },
    { status: "upcoming", label: "Upcoming", count: counts.upcoming },
    { status: "closed", label: "Closed", count: counts.closed },
  ];

  return (
    <div className="container-content section-gap">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-textSecondary">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-textPrimary font-medium">Consultations</span>
      </nav>

      <div className="mb-8">
        <h1 className="mb-2">Public Consultations</h1>
        <p className="text-textSecondary max-w-3xl">
          ICH invites stakeholders to review and comment on draft guidelines.
          Your input helps shape global pharmaceutical standards.
        </p>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-border mb-8">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setActiveStatus(tab.status)}
              className={`px-5 py-3 text-sm font-medium border-b-[3px] transition-colors ${
                activeStatus === tab.status
                  ? "border-secondary text-textPrimary font-semibold"
                  : "border-transparent text-textSecondary hover:text-textPrimary"
              }`}
            >
              {tab.label}{" "}
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  activeStatus === tab.status
                    ? statusStyles[tab.status]
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {filtered.map((c) => {
          const progress = getDeadlineProgress(c.openDate, c.closeDate);
          const progressColor = getProgressColor(progress);

          return (
            <div key={c.id} className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[c.status]}`}
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                  <Link
                    href={`/guidelines/${encodeURIComponent(c.guidelineId)}`}
                    className="font-mono text-sm text-secondary font-medium rounded bg-secondary/10 px-2 py-0.5 hover:underline"
                  >
                    {c.guidelineId}
                  </Link>
                </div>
                {c.status === "open" && (
                  <span className="text-sm font-medium text-textSecondary">
                    {daysUntil(c.closeDate)} days remaining
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold text-textPrimary mb-2">
                {c.title}
              </h3>

              <div className="flex items-center gap-6 text-sm text-textSecondary mb-3">
                <span>Open: {c.openDate}</span>
                <span>Close: {c.closeDate}</span>
              </div>

              {/* Deadline progress bar */}
              {c.status === "open" && (
                <div className="mb-4">
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${progressColor}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-textSecondary">
                    <span>Opened</span>
                    <span>{progress}% elapsed</span>
                    <span>Closes</span>
                  </div>
                </div>
              )}

              <p className="text-sm text-textSecondary leading-relaxed mb-4">
                {c.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {c.status === "open" && (
                  <>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
                      Submit Comment
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-textPrimary hover:border-secondary hover:text-secondary transition-colors">
                      <FileText className="h-4 w-4" />
                      View Draft Document
                    </button>
                  </>
                )}
                {c.status === "closed" && (
                  <button className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-textPrimary hover:border-secondary hover:text-secondary transition-colors">
                    <FileText className="h-4 w-4" />
                    View Document
                  </button>
                )}
                {c.status === "upcoming" && (
                  <span className="text-sm text-textSecondary italic">
                    Consultation opens {c.openDate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-textSecondary">
            No {activeStatus} consultations at this time.
          </p>
        </div>
      )}

      {/* Submission Guidance */}
      <div className="mt-12 card overflow-hidden">
        <button
          onClick={() => setExpandedGuidance(!expandedGuidance)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <h3 className="text-lg font-semibold">How to Submit Comments</h3>
          <ChevronDown
            className={`h-5 w-5 text-textSecondary transition-transform ${
              expandedGuidance ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedGuidance && (
          <div className="px-6 pb-6 border-t border-border pt-4">
            <div className="prose prose-sm text-textSecondary space-y-3">
              <p>
                ICH welcomes comments from all interested stakeholders including
                regulatory authorities, pharmaceutical companies, academia, and
                patient organizations.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Download the official Comment Form using the button below.
                </li>
                <li>
                  Review the draft guideline document available on the
                  consultation page.
                </li>
                <li>
                  Complete the comment form with your feedback, referencing
                  specific line numbers and sections.
                </li>
                <li>
                  Submit your completed form by email to the address provided in
                  the comment form before the consultation deadline.
                </li>
              </ol>
              <p>
                All comments received will be reviewed by the relevant ICH
                Expert Working Group and considered during guideline
                finalization. Commenters will not receive individual responses,
                but a summary of comments may be published.
              </p>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-textPrimary hover:border-secondary hover:text-secondary transition-colors">
              <Download className="h-4 w-4" />
              Download Comment Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
