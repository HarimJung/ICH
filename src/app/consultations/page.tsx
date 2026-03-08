"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  FileText,
  Clock,
  Calendar,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import consultations from "@/data/consultations.json";
import { Consultation, ConsultationStatus } from "@/types";

const typedConsultations = consultations as Consultation[];

type TabKey = "all" | ConsultationStatus;

const statusStyles: Record<ConsultationStatus, string> = {
  open: "bg-green-50 text-green-800",
  upcoming: "bg-amber-50 text-amber-700",
  closed: "bg-gray-100 text-gray-600",
};

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.max(
    0,
    Math.ceil((target.getTime() - now.getTime()) / 86400000)
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [expandedGuidance, setExpandedGuidance] = useState(false);

  const counts = useMemo(() => {
    return {
      all: typedConsultations.length,
      open: typedConsultations.filter((c) => c.status === "open").length,
      upcoming: typedConsultations.filter((c) => c.status === "upcoming")
        .length,
      closed: typedConsultations.filter((c) => c.status === "closed").length,
    };
  }, []);

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? typedConsultations
        : typedConsultations.filter((c) => c.status === activeTab),
    [activeTab]
  );

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "open", label: "Open", count: counts.open },
    { key: "upcoming", label: "Upcoming", count: counts.upcoming },
    { key: "closed", label: "Closed", count: counts.closed },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroSection
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultations" },
        ]}
        title="Public Consultations"
        subtitle="ICH invites stakeholders to review and comment on draft guidelines. Your input helps shape global pharmaceutical standards."
      />

      {/* Content */}
      <section className="bg-white">
        <div className="container-content py-10 lg:py-14">
          {/* Tabs */}
          <div className="border-b border-border mb-10">
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-3 text-[15px] font-medium border-b-[3px] transition-colors ${
                    activeTab === tab.key
                      ? "border-secondary text-textPrimary font-semibold"
                      : "border-transparent text-textMuted hover:text-textPrimary"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      activeTab === tab.key
                        ? "bg-secondary/10 text-secondary"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((c) => {
              const remaining = daysUntil(c.closeDate);

              return (
                <div
                  key={c.id}
                  className="bg-white border border-border p-6"
                >
                  {/* Header: Status badge + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                      <span className="text-xs font-medium text-textMuted uppercase tracking-wide">
                        {c.category}
                      </span>
                    </div>
                    <Link
                      href={`/guidelines/${encodeURIComponent(c.guidelineId)}`}
                      className="font-mono text-sm text-secondary font-medium hover:underline"
                    >
                      {c.guidelineId}
                    </Link>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-textPrimary mb-3 leading-snug">
                    {c.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-textMuted leading-relaxed mb-4">
                    {c.description}
                  </p>

                  {/* Dates */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-textMuted mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Opens: {formatDate(c.openDate)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Closes: {formatDate(c.closeDate)}
                    </span>
                  </div>

                  {/* Countdown for open consultations */}
                  {c.status === "open" && (
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 mb-4">
                      <Clock className="h-4 w-4 text-green-700" />
                      <span className="text-sm font-semibold text-green-800">
                        {remaining} {remaining === 1 ? "day" : "days"} remaining
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                    {c.status === "open" && (
                      <>
                        <button className="btn-primary text-sm px-4 py-2">
                          <MessageSquare className="h-4 w-4" />
                          Submit Comment
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-textPrimary hover:border-secondary hover:text-secondary transition-colors">
                          <FileText className="h-4 w-4" />
                          View Draft
                        </button>
                      </>
                    )}
                    {c.status === "closed" && (
                      <Link
                        href={`/guidelines/${encodeURIComponent(c.guidelineId)}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:underline"
                      >
                        View Final Document
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {c.status === "upcoming" && (
                      <span className="inline-flex items-center gap-2 text-sm text-textMuted italic">
                        <Clock className="h-4 w-4" />
                        Opens {formatDate(c.openDate)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-textMuted">
                No {activeTab === "all" ? "" : activeTab} consultations at this
                time.
              </p>
            </div>
          )}

          {/* How to Submit Comments — Expandable */}
          <div className="mt-14 bg-white border border-border overflow-hidden">
            <button
              onClick={() => setExpandedGuidance(!expandedGuidance)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-backgroundAlt transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 bg-backgroundAlt border border-border">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-textPrimary">
                    How to Submit Comments
                  </h3>
                  <p className="text-sm text-textMuted mt-0.5">
                    Step-by-step guidance for participating in public
                    consultations
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-textMuted transition-transform duration-200 ${
                  expandedGuidance ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedGuidance && (
              <div className="px-6 pb-6 border-t border-border pt-5">
                <div className="space-y-4 text-sm text-textMuted leading-relaxed">
                  <p>
                    ICH welcomes comments from all interested stakeholders
                    including regulatory authorities, pharmaceutical companies,
                    academia, and patient organizations.
                  </p>
                  <ol className="list-decimal list-inside space-y-3 ml-1">
                    <li>
                      <span className="font-medium text-textPrimary">
                        Download the Comment Form
                      </span>{" "}
                      — Use the official template provided below.
                    </li>
                    <li>
                      <span className="font-medium text-textPrimary">
                        Review the Draft Guideline
                      </span>{" "}
                      — Access the document from the relevant consultation page.
                    </li>
                    <li>
                      <span className="font-medium text-textPrimary">
                        Complete Your Feedback
                      </span>{" "}
                      — Reference specific line numbers and sections in your
                      comments.
                    </li>
                    <li>
                      <span className="font-medium text-textPrimary">
                        Submit Before the Deadline
                      </span>{" "}
                      — Email the completed form to the address provided before
                      the consultation closes.
                    </li>
                  </ol>
                  <p>
                    All comments received will be reviewed by the relevant ICH
                    Expert Working Group and considered during guideline
                    finalization. Commenters will not receive individual
                    responses, but a summary of comments may be published.
                  </p>
                </div>
                <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-textPrimary hover:border-secondary hover:text-secondary transition-colors">
                  <Download className="h-4 w-4" />
                  Download Comment Form
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
