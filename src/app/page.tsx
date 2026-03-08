"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  MessageSquare,
  GraduationCap,
  Globe,
  Stethoscope,
  MapPin,
  Calendar,
  ArrowUpCircle,
  FileEdit,
  Newspaper,
  Search,
} from "lucide-react";
import guidelines from "@/data/guidelines.json";
import training from "@/data/training.json";
import updates from "@/data/updates.json";
import consultations from "@/data/consultations.json";
import governance from "@/data/governance.json";
import meddra from "@/data/meddra.json";
import { Guideline, Training, Update, Consultation, GovernanceData } from "@/types";

const typedGuidelines = guidelines as Guideline[];
const typedTraining = training as Training[];
const typedUpdates = updates as Update[];
const typedConsultations = consultations as Consultation[];
const gov = governance as GovernanceData;

const categories = ["Quality", "Safety", "Efficacy", "Multidisciplinary"] as const;

const updateTypeConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; label: string; color: string }
> = {
  step_change: { icon: ArrowUpCircle, label: "Step Change", color: "bg-blue-50 text-blue-800" },
  consultation: { icon: MessageSquare, label: "Consultation", color: "bg-green-50 text-green-800" },
  training: { icon: GraduationCap, label: "Training", color: "bg-purple-50 text-purple-700" },
  revision: { icon: FileEdit, label: "Revision", color: "bg-amber-50 text-amber-700" },
  news: { icon: Newspaper, label: "News", color: "bg-teal-50 text-teal-700" },
  event: { icon: Calendar, label: "Event", color: "bg-red-50 text-red-700" },
};

export default function HomePage() {
  const [search, setSearch] = useState("");

  const openConsultations = useMemo(
    () => typedConsultations.filter((c) => c.status === "open").length,
    []
  );

  const latestUpdates = useMemo(
    () =>
      [...typedUpdates]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5),
    []
  );

  const upcomingEvents = useMemo(
    () => gov.assemblies.filter((a) => a.status === "upcoming"),
    []
  );

  const searchResults = useMemo(() => {
    if (!search.trim()) return { guidelines: [], training: [], consultations: [] };
    const q = search.toLowerCase();
    return {
      guidelines: typedGuidelines
        .filter(
          (g) =>
            g.id.toLowerCase().includes(q) ||
            g.title.toLowerCase().includes(q) ||
            g.tags.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 4),
      training: typedTraining
        .filter((t) => t.title.toLowerCase().includes(q))
        .slice(0, 2),
      consultations: typedConsultations
        .filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.guidelineId.toLowerCase().includes(q)
        )
        .slice(0, 2),
    };
  }, [search]);

  const hasResults =
    searchResults.guidelines.length > 0 ||
    searchResults.training.length > 0 ||
    searchResults.consultations.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-content px-6 pt-24 pb-16 text-center">
          <h1 className="text-3xl md:text-[40px] font-bold leading-tight text-white mb-4">
            Harmonisation for better health
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
            The global platform bringing together regulatory authorities and
            pharmaceutical industry to ensure safe, effective and high-quality
            medicines worldwide.
          </p>
          <div className="relative max-w-[720px] mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guidelines, training, consultations..."
              className="w-full h-14 rounded-xl border-0 bg-white py-3 pl-14 pr-4 text-base text-textPrimary placeholder:text-textSecondary focus:outline-none focus:ring-2 focus:ring-secondary/30 shadow-lg"
            />
            {hasResults && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white p-4 shadow-xl z-10 text-left max-h-80 overflow-y-auto">
                {searchResults.guidelines.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-textSecondary mb-2 px-2">
                      Guidelines
                    </div>
                    {searchResults.guidelines.map((g) => (
                      <Link
                        key={g.id}
                        href={`/guidelines/${encodeURIComponent(g.id)}`}
                        className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-background transition-colors"
                      >
                        <span className="font-mono text-sm text-secondary font-medium shrink-0">
                          {g.id}
                        </span>
                        <span className="text-sm text-textPrimary truncate">
                          {g.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.training.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-textSecondary mb-2 px-2">
                      Training
                    </div>
                    {searchResults.training.map((t) => (
                      <Link
                        key={t.id}
                        href="/training"
                        className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-background transition-colors"
                      >
                        <GraduationCap className="h-4 w-4 text-secondary shrink-0" />
                        <span className="text-sm text-textPrimary truncate">
                          {t.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.consultations.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-textSecondary mb-2 px-2">
                      Consultations
                    </div>
                    {searchResults.consultations.map((c) => (
                      <Link
                        key={c.id}
                        href="/consultations"
                        className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-background transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 text-secondary shrink-0" />
                        <span className="text-sm text-textPrimary truncate">
                          {c.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Quick filter pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/guidelines?category=${cat}`}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/20"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User Journey Selector */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-12">
          <h2 className="text-center mb-8">How can we help you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A: Guidelines */}
            <div className="card p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                <BookOpen className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl mb-2">Find &amp; Use ICH Guidelines</h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-6">
                Access the full library of ICH harmonised guidelines, track
                updates, find related training and check implementation status.
              </p>
              <Link
                href="/guidelines"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Browse Guidelines <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                <Link
                  href="/updates"
                  className="text-sm text-secondary hover:underline"
                >
                  What&apos;s New
                </Link>
                <Link
                  href="/consultations"
                  className="text-sm text-secondary hover:underline"
                >
                  Public Consultations
                </Link>
                <Link
                  href="/training"
                  className="text-sm text-secondary hover:underline"
                >
                  Training Library
                </Link>
              </div>
            </div>

            {/* Card B: Governance */}
            <div className="card p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                <Building2 className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl mb-2">
                ICH Governance &amp; Process
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-6">
                Learn about ICH&apos;s structure, members, working groups,
                assembly meetings and the harmonisation process.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                View Governance <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                <Link
                  href="/about#members"
                  className="text-sm text-secondary hover:underline"
                >
                  Members &amp; Observers
                </Link>
                <Link
                  href="/about#assemblies"
                  className="text-sm text-secondary hover:underline"
                >
                  Assembly Meetings
                </Link>
                <Link
                  href="/about#process"
                  className="text-sm text-secondary hover:underline"
                >
                  Process of Harmonisation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="bg-surface">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2>What&apos;s New</h2>
            <Link
              href="/updates"
              className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestUpdates.map((u) => {
              const config = updateTypeConfig[u.type];
              return (
                <div
                  key={u.id}
                  className="card flex items-start gap-0 overflow-hidden"
                >
                  {/* Gold left bar */}
                  <div className="w-1 shrink-0 self-stretch bg-accent" />
                  <div className="flex-1 p-5 flex items-start gap-4">
                    <div className="shrink-0 text-xs text-textSecondary w-20 pt-0.5">
                      {u.date}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}
                        >
                          {config.label}
                        </span>
                        {u.fromStep != null && u.toStep != null && (
                          <span className="text-xs font-medium text-primary">
                            Step {u.fromStep} → Step {u.toStep}
                          </span>
                        )}
                      </div>
                      <Link
                        href="/updates"
                        className="font-semibold text-textPrimary hover:text-secondary transition-colors leading-snug"
                      >
                        {u.title}
                      </Link>
                      <p className="text-sm text-textSecondary mt-1 line-clamp-1">
                        {u.description}
                      </p>
                    </div>
                    {u.guidelineId && (
                      <Link
                        href={`/guidelines/${encodeURIComponent(u.guidelineId)}`}
                        className="shrink-0 font-mono text-xs text-secondary font-medium hover:underline mt-0.5"
                      >
                        {u.guidelineId}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/guidelines" className="card p-6 hover:no-underline group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {typedGuidelines.length}+ Guidelines
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                Browse the complete collection of ICH harmonised guidelines
                across Quality, Safety, Efficacy and Multidisciplinary topics.
              </p>
            </Link>

            <Link href="/consultations" className="card p-6 hover:no-underline group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {openConsultations} Open
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                Review and comment on draft ICH guidelines currently open for
                public consultation.
              </p>
            </Link>

            <Link href="/training" className="card p-6 hover:no-underline group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {typedTraining.length} Modules
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                Access guideline-specific training materials including videos,
                webinars and implementation guides.
              </p>
            </Link>

            <Link href="/about" className="card p-6 hover:no-underline group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <Globe className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {gov.members.length} Members
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                Track which ICH members have implemented each guideline in their
                regulatory framework.
              </p>
            </Link>

            <Link href="/meddra" className="card p-6 hover:no-underline group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <Stethoscope className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {meddra.languages.length} Languages
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                The global medical terminology standard for regulatory
                communication — maintained by ICH.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-content px-6 py-12">
            <h2 className="mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="card p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-textSecondary">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {event.location}
                  </div>
                  <Link
                    href="/about#assemblies"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Bar */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-content px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { value: `${typedGuidelines.length}+`, label: "Guidelines" },
              { value: String(gov.members.length), label: "Members" },
              { value: "30+", label: "Years" },
              { value: String(typedTraining.length), label: "Training Modules" },
              {
                value: `${meddra.languages.length}`,
                label: "Languages (MedDRA)",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
