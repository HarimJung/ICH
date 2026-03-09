"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  MessageSquare,
  GraduationCap,
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
  step_change: { icon: ArrowUpCircle, label: "Step Change", color: "bg-gray-100 text-gray-700" },
  consultation: { icon: MessageSquare, label: "Consultation", color: "bg-gray-100 text-gray-700" },
  training: { icon: GraduationCap, label: "Training", color: "bg-gray-100 text-gray-700" },
  revision: { icon: FileEdit, label: "Revision", color: "bg-gray-100 text-gray-700" },
  news: { icon: Newspaper, label: "News", color: "bg-gray-100 text-gray-700" },
  event: { icon: Calendar, label: "Event", color: "bg-gray-100 text-gray-700" },
};

export default function HomePage() {
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



  return (
    <div>
      {/* ============ HERO — editorial news grid ============ */}
      <section className="bg-white border-b border-border">
        <div className="container-content pt-8 pb-10">
          <p className="text-[13px] font-medium text-textSecondary mb-5">
            Latest news, guidelines and updates
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main feature — left 2 cols */}
            <div className="lg:col-span-2">
              <Link href="/updates" className="group block">
                <div className="w-full aspect-[16/9] bg-[#0044FF] rounded-sm mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <span className="self-start inline-block bg-white/15 text-white text-[11px] font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
                      Step change
                    </span>
                    <div>
                      <p className="text-white/60 text-[13px] mb-1">{latestUpdates[0]?.date}</p>
                      <h2 className="text-white text-[20px] font-bold leading-snug max-w-lg">
                        {latestUpdates[0]?.title}
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="text-[15px] text-textSecondary leading-relaxed mt-3">
                  {latestUpdates[0]?.description}
                </p>
              </Link>
            </div>

            {/* Events sidebar — right 1 col */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-textPrimary">Events</h3>
                <Link href="/about#events" className="text-[13px] text-secondary hover:underline">
                  View all
                </Link>
              </div>
              <div className="flex flex-col gap-0">
                {[
                  { date: "Mar 2026", title: "ICH Assembly Meeting — Spring 2026", tag: "Assembly" },
                  { date: "12 Mar 2026", title: "Q3D(R2) Implementation Workshop", tag: "Workshop" },
                  { date: "23 May 2026", title: "E20 Public Consultation Webinar", tag: "Webinar" },
                ].map((ev, i) => (
                  <div key={i} className="py-4 border-b border-border last:border-0">
                    <p className="text-[13px] font-semibold text-secondary mb-1">{ev.date}</p>
                    <p className="text-[14px] text-textPrimary leading-snug">{ev.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary news row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
            {latestUpdates.slice(1, 5).map((u) => {
              const config = updateTypeConfig[u.type];
              return (
                <Link key={u.id} href="/updates" className="group block">
                  <div className="w-full aspect-[4/3] bg-[#F4F7FA] border border-border rounded-sm mb-3 overflow-hidden relative flex flex-col justify-between p-4">
                    <span className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-sm ${config.color}`}>
                      {config.label}
                    </span>
                    <p className="absolute right-4 top-1/2 -translate-y-1/2 text-[72px] font-black text-primary/5 leading-none tabular-nums select-none">
                      {u.date.slice(0, 4)}
                    </p>
                    <p className="text-[12px] text-textSecondary relative z-10">{u.date}</p>
                  </div>
                  <h4 className="text-[14px] font-semibold text-textPrimary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {u.title}
                  </h4>
                  {u.guidelineId && (
                    <p className="text-[12px] font-mono text-secondary mt-1">{u.guidelineId}</p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MISSION — 3 columns ============ */}
      <section className="bg-[#F2F3F5] border-b border-border">
        <div className="container-content py-14">
          <p className="text-[15px] font-medium text-textSecondary mb-8 max-w-2xl">
            We provide authoritative harmonised guidelines and regulatory standards
            to ensure safe, effective and high-quality medicines worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-sm overflow-hidden">
            {[
              {
                action: "Understand",
                desc: "the global pharmaceutical regulatory framework",
                href: "/about",
                cta: "About ICH",
                icon: Building2,
              },
              {
                action: "Explore",
                desc: "authoritative guidelines and implementation resources",
                href: "/guidelines",
                cta: "Guidelines and resources",
                icon: BookOpen,
              },
              {
                action: "Keep up",
                desc: "with active consultations and the harmonisation process",
                href: "/consultations",
                cta: "News and consultations",
                icon: MessageSquare,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 flex flex-col border-r border-border last:border-r-0 md:border-b-0 border-b"
              >
                <div className="mb-4 w-10 h-10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-[17px] font-medium text-textPrimary leading-snug mb-2">
                  <span className="text-secondary font-semibold">{item.action}</span>{" "}
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-secondary hover:gap-2.5 transition-all"
                >
                  {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUICK ACCESS — IEA "Global data" style ============ */}
      <section className="bg-white border-b border-border">
        <div ref={quickRef} className="container-content py-14">
          <h2 className="text-[20px] font-bold text-textPrimary mb-8">
            ICH harmonisation resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Guidelines library",
                desc: "Access all harmonised guidelines across Quality, Safety, Efficacy and Multidisciplinary.",
                href: "/guidelines",
                cta: "Browse",
              },
              {
                icon: GraduationCap,
                title: "Training modules",
                desc: `${typedTraining.length} modules including videos, webinars and implementation guides.`,
                href: "/training",
                cta: "Explore",
              },
              {
                icon: MessageSquare,
                title: "Consultations",
                desc: `${openConsultations} open consultations. Comment on draft ICH guidelines.`,
                href: "/consultations",
                cta: "Search",
              },
              {
                icon: Stethoscope,
                title: "MedDRA",
                desc: "The global medical terminology standard for regulatory communication.",
                href: "/meddra",
                cta: "Discover",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-sm p-6 flex flex-col shadow-card hover:shadow-cardHover transition-shadow duration-200"
              >
                <div className="mb-4 w-10 h-10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold text-textPrimary mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-textSecondary leading-relaxed mb-5 flex-1">
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  className="self-start inline-flex items-center justify-center border border-textPrimary text-textPrimary text-[13px] font-medium px-4 py-1.5 rounded-sm hover:bg-textPrimary hover:text-white transition-colors"
                >
                  {item.cta}
                </Link>
              </div>
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
