"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import governance from "@/data/governance.json";
import { GovernanceData } from "@/types";

const gov = governance as GovernanceData;

const tabs = [
  "Members & Observers",
  "Assembly Meetings",
  "Process of Harmonisation",
] as const;

type TabName = (typeof tabs)[number];

const stepData = [
  {
    num: 1,
    label: "Step 1",
    sublabel: "",
    title: "Consensus Building",
    description:
      "Expert Working Group prepares a draft guideline through scientific consensus among regulatory and industry experts.",
    color: "bg-gray-100 text-gray-600 border-gray-300",
    dotColor: "bg-gray-400",
  },
  {
    num: 2,
    label: "Step 2a",
    sublabel: "Sign-off",
    title: "Regulatory Sign-off",
    description:
      "The ICH Assembly confirms the draft is ready for public consultation by the regulatory members.",
    color: "bg-amber-50 text-amber-700 border-amber-300",
    dotColor: "bg-amber-400",
  },
  {
    num: 2,
    label: "Step 2b",
    sublabel: "Consultation",
    title: "Public Consultation",
    description:
      "The draft guideline is released for public comment, typically for a 90-day consultation period across all ICH regions.",
    color: "bg-amber-100 text-amber-800 border-amber-400",
    dotColor: "bg-amber-500",
  },
  {
    num: 3,
    label: "Step 3",
    sublabel: "",
    title: "Regulatory Review",
    description:
      "Comments are reviewed and incorporated. The Expert Working Group finalizes the document for adoption.",
    color: "bg-teal-50 text-teal-700 border-teal-300",
    dotColor: "bg-teal-500",
  },
  {
    num: 4,
    label: "Step 4",
    sublabel: "",
    title: "Adoption",
    description:
      "The ICH Assembly endorses the final guideline. It is now an official ICH harmonised guideline.",
    color: "bg-blue-50 text-blue-800 border-blue-300",
    dotColor: "bg-blue-500",
  },
  {
    num: 5,
    label: "Step 5",
    sublabel: "",
    title: "Implementation",
    description:
      "Each regulatory authority implements the guideline in their jurisdiction according to local procedures and timelines.",
    color: "bg-green-50 text-green-800 border-green-300",
    dotColor: "bg-green-500",
  },
];

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<TabName>("Members & Observers");

  const foundingMembers = useMemo(
    () => gov.members.filter((m) => m.since === 1990),
    []
  );
  const regulatoryMembers = useMemo(
    () =>
      gov.members.filter(
        (m) => m.type === "regulatory" && m.since !== 1990
      ),
    []
  );
  const industryMembers = useMemo(
    () =>
      gov.members.filter((m) => m.type === "industry" && m.since !== 1990),
    []
  );

  const upcomingAssemblies = gov.assemblies.filter(
    (a) => a.status === "upcoming"
  );
  const pastAssemblies = gov.assemblies.filter((a) => a.status === "past");

  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    gov.members.forEach((m) => regions.add(m.region));
    gov.observers.forEach((o) => regions.add(o.region));
    return regions.size;
  }, []);

  return (
    <div className="container-content section-gap">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-textSecondary">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-textPrimary font-medium">Governance</span>
      </nav>

      <div className="mb-8">
        <h1 className="mb-2">Organisation &amp; Governance</h1>
        <p className="text-textSecondary max-w-3xl">
          ICH brings together regulatory authorities and pharmaceutical industry
          to discuss scientific and technical aspects of medicines regulation.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-border mb-8 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-[3px] transition-colors ${
                activeTab === tab
                  ? "border-secondary text-textPrimary font-semibold"
                  : "border-transparent text-textSecondary hover:text-textPrimary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Members & Observers */}
      {activeTab === "Members & Observers" && (
        <div>
          <p className="text-sm text-textSecondary mb-8">
            {gov.members.length} Members + {gov.observers.length} Observers from{" "}
            {uniqueRegions} regions
          </p>

          {/* Founding Members */}
          <h2 className="mb-4">Founding Members</h2>
          <p className="text-sm text-textSecondary mb-4">
            The original regulatory authorities and industry associations that
            established ICH in 1990.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {foundingMembers.map((m) => (
              <div key={m.name} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{m.flag}</span>
                  <div>
                    <span className="font-semibold text-primary">
                      {m.name}
                    </span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        m.type === "regulatory"
                          ? "bg-blue-50 text-primary"
                          : "bg-teal-50 text-secondary"
                      }`}
                    >
                      {m.type === "regulatory" ? "Regulatory" : "Industry"}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-textSecondary mb-1">
                  {m.fullName}
                </div>
                <div className="text-xs text-textSecondary">
                  {m.region} · Member since {m.since}
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory Members */}
          {regulatoryMembers.length > 0 && (
            <>
              <h2 className="mb-4">Regulatory Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {regulatoryMembers.map((m) => (
                  <div key={m.name} className="card p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{m.flag}</span>
                      <div>
                        <span className="font-semibold text-primary">
                          {m.name}
                        </span>
                        <span className="ml-2 rounded-full bg-blue-50 text-primary px-2 py-0.5 text-xs font-medium">
                          Regulatory
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-textSecondary mb-1">
                      {m.fullName}
                    </div>
                    <div className="text-xs text-textSecondary">
                      {m.region} · Member since {m.since}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Industry Members */}
          {industryMembers.length > 0 && (
            <>
              <h2 className="mb-4">Industry Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {industryMembers.map((m) => (
                  <div key={m.name} className="card p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{m.flag}</span>
                      <div>
                        <span className="font-semibold text-primary">
                          {m.name}
                        </span>
                        <span className="ml-2 rounded-full bg-teal-50 text-secondary px-2 py-0.5 text-xs font-medium">
                          Industry
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-textSecondary mb-1">
                      {m.fullName}
                    </div>
                    <div className="text-xs text-textSecondary">
                      {m.region} · Member since {m.since}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Observers */}
          <h2 className="mb-4">Observers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gov.observers.map((o) => (
              <div key={o.name} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{o.flag}</span>
                  <span className="font-semibold text-primary">{o.name}</span>
                </div>
                <div className="text-sm text-textSecondary mb-1">
                  {o.fullName}
                </div>
                <div className="text-xs text-textSecondary">{o.region}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Assembly Meetings */}
      {activeTab === "Assembly Meetings" && (
        <div>
          {upcomingAssemblies.length > 0 && (
            <>
              <h2 className="mb-4">Upcoming</h2>
              <div className="space-y-4 mb-10">
                {upcomingAssemblies.map((a) => (
                  <div
                    key={a.id}
                    className="card flex items-center gap-6 p-6"
                  >
                    <div className="shrink-0 text-center">
                      <div className="rounded-lg bg-primary px-4 py-2">
                        <div className="text-xl font-bold text-white">
                          {new Date(a.date).getDate()}
                        </div>
                        <div className="text-xs text-white/70 uppercase">
                          {new Date(a.date).toLocaleString("en", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold">{a.title}</h3>
                        <span className="rounded-full bg-green-50 text-green-800 px-3 py-1 text-xs font-semibold">
                          Upcoming
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-textSecondary">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {a.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {pastAssemblies.length > 0 && (
            <>
              <h2 className="mb-4">Past</h2>
              <div className="space-y-4">
                {pastAssemblies.map((a) => (
                  <div
                    key={a.id}
                    className="card flex items-center gap-6 p-6"
                  >
                    <div className="shrink-0 text-center">
                      <div className="rounded-lg bg-gray-100 px-4 py-2">
                        <div className="text-xl font-bold text-textSecondary">
                          {new Date(a.date).getDate()}
                        </div>
                        <div className="text-xs text-textSecondary uppercase">
                          {new Date(a.date).toLocaleString("en", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold">{a.title}</h3>
                        <span className="rounded-full bg-gray-100 text-gray-600 px-3 py-1 text-xs font-semibold">
                          Past
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-textSecondary">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {a.location}
                      </div>
                    </div>
                    <button className="shrink-0 flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
                      View Meeting Materials <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab 3: Process of Harmonisation */}
      {activeTab === "Process of Harmonisation" && (
        <div>
          {/* Horizontal step diagram on desktop, vertical on mobile */}
          <div className="hidden md:flex items-start justify-between mb-12 relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-[40px] right-[40px] h-0.5 bg-border z-0" />
            {stepData.map((step) => (
              <div
                key={step.label}
                className="relative z-10 flex flex-col items-center text-center w-[140px]"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step.color} bg-white mb-3`}
                >
                  <span className="text-sm font-bold">{step.num}</span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold mb-2 ${step.color}`}
                >
                  {step.label}
                </span>
                <span className="text-xs font-semibold text-textPrimary mb-1">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Vertical view on mobile */}
          <div className="md:hidden relative pl-8 mb-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />
            {stepData.map((step) => (
              <div key={step.label} className="relative mb-6 last:mb-0">
                <div
                  className={`absolute -left-8 top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center ${step.color} bg-white`}
                >
                  <span className="text-xs font-bold">{step.num}</span>
                </div>
                <div>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold mb-1 ${step.color}`}
                  >
                    {step.label}
                  </span>
                  <h4 className="font-semibold text-textPrimary mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed descriptions */}
          <div className="space-y-4">
            {stepData.map((step) => (
              <div
                key={step.label}
                className="card flex items-start gap-5 p-6"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${step.color} bg-white`}
                >
                  <span className="text-sm font-bold">{step.num}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${step.color}`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-textSecondary leading-relaxed">
            The ICH harmonisation process typically takes 3–5 years from
            initiation to Step 5 implementation. This multi-step approach
            ensures thorough scientific review, stakeholder input, and
            consensus across all ICH member regions before guidelines are
            adopted into local regulatory frameworks.
          </p>
        </div>
      )}
    </div>
  );
}
