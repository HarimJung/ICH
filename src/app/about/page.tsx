import { Users, Globe, FileCheck, ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import governance from "@/data/governance.json";
import { GovernanceData } from "@/types";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";

const gov = governance as GovernanceData;

const processSteps = [
  { step: "Step 1", title: "Consensus Building", description: "Expert Working Group prepares a draft guideline through scientific consensus." },
  { step: "Step 2", title: "Regulatory Consultation", description: "The draft is reviewed by regulatory parties and released for public comment (Step 2a/2b)." },
  { step: "Step 3", title: "Regulatory Review", description: "Comments are reviewed and incorporated. The document is finalized for adoption." },
  { step: "Step 4", title: "Adoption", description: "The ICH Assembly endorses the final guideline for implementation in member regions." },
  { step: "Step 5", title: "Implementation", description: "Each regulatory authority implements the guideline in their jurisdiction according to local procedures." },
];

export default function AboutPage() {
  return (
    <div>
      <HeroSection
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About ICH" }]}
        overline="ABOUT"
        title="About ICH"
        subtitle="The International Council for Harmonisation brings together regulatory authorities and the pharmaceutical industry to discuss scientific and technical aspects of pharmaceutical product registration."
        size="large"
      />

      {/* Mission */}
      <section className="bg-white">
        <div className="container-content section-gap">
          <div className="text-center mb-12">
            <p className="overline mb-3">OUR MISSION</p>
            <h2>What drives ICH</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Global Harmonisation", description: "ICH develops harmonised guidelines to reduce duplication of clinical trials and create a more streamlined regulatory process for global pharmaceutical development." },
              { icon: Users, title: "Multi-Stakeholder", description: "ICH brings together regulatory authorities and industry associations from across the globe to create consensus-based technical guidelines." },
              { icon: FileCheck, title: "Science-Based Standards", description: "Guidelines are developed through rigorous scientific assessment, ensuring safe, effective, and high-quality medicines reach patients worldwide." },
            ].map((item) => (
              <div key={item.title} className="card p-8 border-t-4 border-t-secondary">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-sm text-textMuted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guideline Process */}
      <section className="bg-backgroundAlt">
        <div className="container-content section-gap">
          <div className="text-center mb-12">
            <p className="overline mb-3">THE PROCESS</p>
            <h2>The ICH Guideline Process</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {processSteps.map((s, i) => (
              <div key={s.step} className="card p-6 flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hero-gradient text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg">{s.title}</h3>
                    <span className="text-xs text-textMuted font-medium">{s.step}</span>
                  </div>
                  <p className="text-sm text-textMuted leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="bg-white">
        <div className="container-content section-gap">
          <div className="text-center mb-12">
            <p className="overline mb-3">MEMBERSHIP</p>
            <h2>Members</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gov.members.map((m) => (
              <div key={m.name} className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{m.flag}</span>
                  <span className="font-semibold text-primary">{m.name}</span>
                </div>
                <div className="text-sm text-textMuted mb-1">{m.fullName}</div>
                <div className="flex items-center justify-between text-xs text-textMuted">
                  <span>{m.region}</span>
                  <span className={`rounded-full px-2.5 py-0.5 font-medium ${m.type === "regulatory" ? "bg-blue-50 text-primary" : "bg-teal-50 text-secondary"}`}>
                    {m.type === "regulatory" ? "Regulatory" : "Industry"}
                  </span>
                </div>
                <div className="mt-2 text-xs text-textMuted">Member since {m.since}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Observers */}
      <section className="bg-backgroundAlt">
        <div className="container-content section-gap">
          <div className="text-center mb-12">
            <p className="overline mb-3">OBSERVERS</p>
            <h2>Observer Organisations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {gov.observers.map((o) => (
              <div key={o.name} className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{o.flag}</span>
                  <span className="font-semibold text-primary">{o.name}</span>
                </div>
                <div className="text-sm text-textMuted mb-1">{o.fullName}</div>
                <div className="text-xs text-textMuted">{o.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly Schedule */}
      <section className="bg-white">
        <div className="container-content section-gap">
          <div className="text-center mb-12">
            <p className="overline mb-3">EVENTS</p>
            <h2>Assembly Schedule</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {gov.assemblies.map((a) => (
              <div key={a.id} className="card p-6 flex items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg">{a.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${a.status === "upcoming" ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                      {a.status === "upcoming" ? "Upcoming" : "Past"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-textMuted">
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{a.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar stats={[
        { value: String(gov.members.length), label: "Members" },
        { value: String(gov.observers.length), label: "Observers" },
        { value: "30+", label: "Years" },
        { value: "5", label: "Steps" },
      ]} />

      {/* CTA */}
      <section className="bg-backgroundAlt">
        <div className="container-content section-gap text-center">
          <h2 className="mb-4">Explore ICH Guidelines</h2>
          <p className="text-textMuted mb-8 max-w-lg mx-auto">
            Browse the complete library of harmonised guidelines for pharmaceutical development.
          </p>
          <Link href="/guidelines" className="btn-primary">
            Browse Guidelines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
