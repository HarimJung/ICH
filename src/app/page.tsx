"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  MessageSquare,
  GraduationCap,
  Search,
  Stethoscope,
  ArrowUpCircle,
  FileEdit,
  Newspaper,
  Calendar,
} from "lucide-react";
import guidelines from "@/data/guidelines.json";
import training from "@/data/training.json";
import updates from "@/data/updates.json";
import consultations from "@/data/consultations.json";
import governance from "@/data/governance.json";
import { Guideline, Training, Update, Consultation, GovernanceData } from "@/types";
import StatsBar from "@/components/StatsBar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const typedGuidelines = guidelines as Guideline[];
const typedTraining = training as Training[];
const typedUpdates = updates as Update[];
const typedConsultations = consultations as Consultation[];
const gov = governance as GovernanceData;

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
  const journeyRef = useScrollAnimation<HTMLDivElement>();
  const updatesRef = useScrollAnimation<HTMLDivElement>();
  const quickRef = useScrollAnimation<HTMLDivElement>();

  const openConsultations = useMemo(
    () => typedConsultations.filter((c) => c.status === "open").length,
    []
  );

  const latestUpdates = useMemo(
    () =>
      [...typedUpdates]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 6),
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
        .slice(0, 5),
      training: typedTraining
        .filter((t) => t.title.toLowerCase().includes(q))
        .slice(0, 3),
      consultations: typedConsultations
        .filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.guidelineId.toLowerCase().includes(q)
        )
        .slice(0, 3),
    };
  }, [search]);

  const hasResults =
    searchResults.guidelines.length > 0 ||
    searchResults.training.length > 0 ||
    searchResults.consultations.length > 0;

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] rounded-full bg-[rgba(0,131,143,0.15)] blur-[120px] pointer-events-none" />

        <div className="container-content relative z-10 pt-20 pb-16 lg:pt-28 lg:pb-24 min-h-[520px] flex flex-col justify-center">
          <p className="overline text-secondary/80 mb-5">
            INTERNATIONAL COUNCIL FOR HARMONISATION
          </p>
          <h1 className="text-[36px] md:text-hero font-bold text-white leading-[1.15] tracking-[-0.03em] max-w-2xl">
            Global Standards for{"\n"}Pharmaceutical Quality
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl">
            Bringing together regulatory authorities and the pharmaceutical
            industry to ensure safe, effective and high-quality medicines.
          </p>

          {/* Search */}
          <div className="relative mt-10 max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guidelines, training, consultations..."
              className="w-full h-14 rounded-xl bg-white pl-14 pr-5 text-[16px] text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-secondary/30 shadow-elevated transition-shadow"
            />
            {hasResults && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white shadow-elevated z-20 text-left max-h-[400px] overflow-y-auto border border-border">
                {searchResults.guidelines.length > 0 && (
                  <div className="p-4 pb-2">
                    <div className="overline text-textMuted mb-2">Guidelines</div>
                    {searchResults.guidelines.map((g) => (
                      <Link
                        key={g.id}
                        href={`/guidelines/${encodeURIComponent(g.id)}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-backgroundAlt transition-colors"
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
                  <div className="p-4 pt-2 pb-2 border-t border-border">
                    <div className="overline text-textMuted mb-2">Training</div>
                    {searchResults.training.map((t) => (
                      <Link
                        key={t.id}
                        href="/training"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-backgroundAlt transition-colors"
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
                  <div className="p-4 pt-2 border-t border-border">
                    <div className="overline text-textMuted mb-2">Consultations</div>
                    {searchResults.consultations.map((c) => (
                      <Link
                        key={c.id}
                        href="/consultations"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-backgroundAlt transition-colors"
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
        </div>
      </section>

      {/* ============ USER JOURNEY ============ */}
      <section className="bg-white">
        <div ref={journeyRef} className="container-content section-gap fade-up">
          <div className="text-center mb-12">
            <p className="overline mb-3">FIND WHAT YOU NEED</p>
            <h2>How can we help you?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <Link
              href="/guidelines"
              className="card group p-10 hover:border-l-4 hover:border-l-secondary hover:pl-9 transition-all"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                <BookOpen className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                I&apos;m looking for ICH Guidelines
              </h3>
              <p className="text-sm text-textMuted leading-relaxed mb-6">
                Access the full library of ICH harmonised guidelines, track
                updates, find related training and check implementation status.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                Browse Guidelines <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Card 2 */}
            <Link
              href="/about"
              className="card group p-10 hover:border-l-4 hover:border-l-secondary hover:pl-9 transition-all"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                <Building2 className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                I want to learn about ICH
              </h3>
              <p className="text-sm text-textMuted leading-relaxed mb-6">
                Learn about ICH&apos;s structure, members, working groups,
                assembly meetings and the harmonisation process.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                View About ICH <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S NEW ============ */}
      <section className="bg-backgroundAlt">
        <div ref={updatesRef} className="container-content section-gap fade-up">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="overline mb-3">STAY INFORMED</p>
              <h2>Latest Updates</h2>
            </div>
            <Link
              href="/updates"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestUpdates.map((u) => {
              const config = updateTypeConfig[u.type];
              return (
                <div key={u.id} className="card p-0 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-textMuted">{u.date}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </div>
                    <h3 className="text-[17px] font-semibold leading-snug mb-2 text-textPrimary line-clamp-2">
                      {u.title}
                    </h3>
                    <p className="text-sm text-textMuted leading-relaxed line-clamp-2 mb-4">
                      {u.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {u.guidelineId && (
                        <span className="font-mono text-xs text-secondary font-medium">
                          {u.guidelineId}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-textMuted ml-auto" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary"
            >
              View all updates <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ QUICK ACCESS ============ */}
      <section className="bg-white">
        <div ref={quickRef} className="container-content section-gap fade-up">
          <div className="text-center mb-12">
            <p className="overline mb-3">EXPLORE</p>
            <h2>Quick Access</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Guidelines",
                desc: `${typedGuidelines.length}+ harmonised guidelines across Quality, Safety, Efficacy and Multidisciplinary.`,
                href: "/guidelines",
                borderColor: "border-t-primary",
              },
              {
                icon: GraduationCap,
                title: "Training",
                desc: `${typedTraining.length} training modules including videos, webinars and implementation guides.`,
                href: "/training",
                borderColor: "border-t-secondary",
              },
              {
                icon: MessageSquare,
                title: "Consultations",
                desc: `${openConsultations} open consultations. Review and comment on draft ICH guidelines.`,
                href: "/consultations",
                borderColor: "border-t-accent",
              },
              {
                icon: Stethoscope,
                title: "MedDRA",
                desc: "The global medical terminology standard for regulatory communication.",
                href: "/meddra",
                borderColor: "border-t-success",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`card group p-6 border-t-4 ${item.borderColor} hover:no-underline`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-backgroundAlt">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-textMuted leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <StatsBar
        stats={[
          { value: `${typedGuidelines.length}+`, label: "Guidelines" },
          { value: "20+", label: "Years" },
          { value: String(gov.members.length), label: "Members" },
          { value: String(gov.observers.length), label: "Observers" },
        ]}
      />
    </div>
  );
}
