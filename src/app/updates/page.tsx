"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpCircle, MessageSquare, GraduationCap, FileEdit, Newspaper, Calendar, ArrowRight,
} from "lucide-react";
import updates from "@/data/updates.json";
import { Update, UpdateType } from "@/types";
import HeroSection from "@/components/HeroSection";

const typedUpdates = updates as Update[];

const typeConfig: Record<UpdateType, { icon: React.ComponentType<{ className?: string }>; label: string; color: string; dotColor: string }> = {
  step_change: { icon: ArrowUpCircle, label: "Guidelines", color: "bg-blue-50 text-blue-800", dotColor: "bg-blue-500" },
  consultation: { icon: MessageSquare, label: "Consultations", color: "bg-green-50 text-green-800", dotColor: "bg-green-500" },
  training: { icon: GraduationCap, label: "Training", color: "bg-purple-50 text-purple-700", dotColor: "bg-purple-500" },
  revision: { icon: FileEdit, label: "Guidelines", color: "bg-amber-50 text-amber-700", dotColor: "bg-amber-500" },
  news: { icon: Newspaper, label: "News", color: "bg-blue-50 text-blue-700", dotColor: "bg-blue-500" },
  event: { icon: Calendar, label: "Events", color: "bg-red-50 text-red-700", dotColor: "bg-red-500" },
};

type FilterType = "all" | "guidelines" | "consultations" | "training" | "events" | "news";

const filters: { value: FilterType; label: string; types: UpdateType[] }[] = [
  { value: "all", label: "All", types: [] },
  { value: "guidelines", label: "Guidelines", types: ["step_change", "revision"] },
  { value: "consultations", label: "Consultations", types: ["consultation"] },
  { value: "training", label: "Training", types: ["training"] },
  { value: "events", label: "Events", types: ["event"] },
  { value: "news", label: "News", types: ["news"] },
];

function getMonthLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleString("en", { month: "long", year: "numeric" });
}

export default function UpdatesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    const sorted = [...typedUpdates].sort((a, b) => b.date.localeCompare(a.date));
    if (activeFilter === "all") return sorted;
    const filter = filters.find((f) => f.value === activeFilter);
    if (!filter) return sorted;
    return sorted.filter((u) => filter.types.includes(u.type));
  }, [activeFilter]);

  const counts = useMemo(() => {
    const c: Record<FilterType, number> = { all: typedUpdates.length, guidelines: 0, consultations: 0, training: 0, events: 0, news: 0 };
    for (const u of typedUpdates) {
      for (const f of filters) {
        if (f.value !== "all" && f.types.includes(u.type)) c[f.value]++;
      }
    }
    return c;
  }, []);

  const grouped = useMemo(() => {
    const groups: { month: string; items: Update[] }[] = [];
    let currentMonth = "";
    for (const u of filtered) {
      const month = getMonthLabel(u.date);
      if (month !== currentMonth) {
        currentMonth = month;
        groups.push({ month, items: [] });
      }
      groups[groups.length - 1].items.push(u);
    }
    return groups;
  }, [filtered]);

  return (
    <div>
      <HeroSection
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "What's New" }]}
        title="What's New"
        subtitle="Stay informed about the latest developments across ICH guidelines, consultations, training and events."
      />

      <div className="bg-white">
        <div className="container-content py-10 lg:py-14">
          {/* Filter tabs */}
          <div className="border-b border-border mb-8 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-3 text-[15px] font-medium whitespace-nowrap border-b-[3px] transition-colors ${
                    activeFilter === f.value
                      ? "border-primary text-textPrimary font-semibold"
                      : "border-transparent text-textMuted hover:text-textPrimary"
                  }`}
                >
                  {f.label}
                  <span className={`ml-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    activeFilter === f.value ? "bg-secondary/10 text-secondary" : "bg-gray-100 text-gray-500"
                  }`}>
                    {counts[f.value]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl">
            {grouped.map((group) => (
              <div key={group.month} className="mb-10">
                <h3 className="overline text-textMuted mb-4">{group.month}</h3>
                <div className="relative pl-8">
                  <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-border" />
                  {group.items.map((u) => {
                    const config = typeConfig[u.type];
                    return (
                      <div key={u.id} className="relative mb-6 last:mb-0">
                        <div className={`absolute -left-8 top-2 h-3 w-3 rounded-full ${config.dotColor} ring-2 ring-white`} />
                        <div className="bg-white border border-border p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
                              {config.label}
                            </span>
                            {u.fromStep != null && u.toStep != null && (
                              <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                                Step {u.fromStep} <ArrowRight className="h-3 w-3" /> Step {u.toStep}
                              </span>
                            )}
                            <span className="text-xs text-textMuted ml-auto">{u.date}</span>
                          </div>
                          <Link
                            href={u.guidelineId ? `/guidelines/${encodeURIComponent(u.guidelineId)}` : "/updates"}
                            className="font-semibold text-textPrimary hover:text-secondary transition-colors leading-snug"
                          >
                            {u.title}
                          </Link>
                          <p className="text-sm text-textMuted mt-1 line-clamp-2">{u.description}</p>
                          {u.guidelineId && (
                            <div className="mt-3">
                              <Link
                                href={`/guidelines/${encodeURIComponent(u.guidelineId)}`}
                                className="font-mono text-xs text-secondary font-medium rounded bg-secondary/10 px-2 py-0.5 hover:underline"
                              >
                                {u.guidelineId}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-textMuted">No updates match your filter.</p>
              <button onClick={() => setActiveFilter("all")} className="mt-4 text-sm font-medium text-secondary hover:underline">
                View all updates
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
