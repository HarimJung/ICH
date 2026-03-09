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
      <section className="bg-white border-b border-border">
        <div className="container-content py-12">
          <p className="text-[12px] uppercase tracking-[0.08em] text-textSecondary font-semibold mb-2">Our mission</p>
          <h2 className="text-[22px] font-bold text-textPrimary mb-8">What drives ICH</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Globe, title: "Global Harmonisation", description: "ICH develops harmonised guidelines to reduce duplication of clinical trials and create a more streamlined regulatory process for global pharmaceutical development." },
              { icon: Users, title: "Multi-Stakeholder", description: "ICH brings together regulatory authorities and industry associations from across the globe to create consensus-based technical guidelines." },
              { icon: FileCheck, title: "Science-Based Standards", description: "Guidelines are developed through rigorous scientific assessment, ensuring safe, effective, and high-quality medicines reach patients worldwide." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-border p-6 shadow-card">
                <div className="mb-4 w-10 h-10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold text-textPrimary mb-2">{item.title}</h3>
                <p className="text-[13px] text-textSecondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guideline Process */}
      <section className="bg-backgroundAlt border-b border-border">
        <div className="container-content py-12">
          <p className="text-[12px] uppercase tracking-[0.08em] text-textSecondary font-semibold mb-2">The process</p>
          <h2 className="text-[22px] font-bold text-textPrimary mb-8">The ICH Guideline Process</h2>
          <div className="space-y-0 max-w-3xl border border-border">
            {processSteps.map((s, i) => (
              <div key={s.step} className="bg-white border-b border-border last:border-b-0 p-6 flex items-start gap-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[15px] font-semibold text-textPrimary">{s.title}</span>
                    <span className="text-[12px] text-textSecondary font-medium">{s.step}</span>
                  </div>
                  <p className="text-[13px] text-textSecondary leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="bg-white border-b border-border">
        <div className="container-content py-12">
          <p className="text-[12px] uppercase tracking-[0.08em] text-textSecondary font-semibold mb-2">Membership</p>
          <h2 className="text-[22px] font-bold text-textPrimary mb-8">Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {gov.members.map((m) => (
              <div key={m.name} className="bg-white border border-border p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{m.flag}</span>
                  <span className="text-[14px] font-semibold text-primary">{m.name}</span>
                </div>
                <div className="text-[13px] text-textSecondary mb-1">{m.fullName}</div>
                <div className="flex items-center justify-between text-[12px] text-textSecondary">
                  <span>{m.region}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${m.type === "regulatory" ? "bg-blue-50 text-primary" : "bg-blue-50 text-secondary"}`}>
                    {m.type === "regulatory" ? "Regulatory" : "Industry"}
                  </span>
                </div>
                <div className="mt-2 text-[12px] text-textSecondary">Since {m.since}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Observers */}
      <section className="bg-backgroundAlt border-b border-border">
        <div className="container-content py-12">
          <p className="text-[12px] uppercase tracking-[0.08em] text-textSecondary font-semibold mb-2">Observers</p>
          <h2 className="text-[22px] font-bold text-textPrimary mb-8">Observer Organisations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gov.observers.map((o) => (
              <div key={o.name} className="bg-white border border-border p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{o.flag}</span>
                  <span className="text-[14px] font-semibold text-primary">{o.name}</span>
                </div>
                <div className="text-[13px] text-textSecondary mb-1">{o.fullName}</div>
                <div className="text-[12px] text-textSecondary">{o.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly Schedule */}
      <section className="bg-white border-b border-border">
        <div className="container-content py-12">
          <p className="text-[12px] uppercase tracking-[0.08em] text-textSecondary font-semibold mb-2">Events</p>
          <h2 className="text-[22px] font-bold text-textPrimary mb-8">Assembly Schedule</h2>
          <div className="space-y-0 max-w-3xl border border-border">
            {gov.assemblies.map((a) => (
              <div key={a.id} className="bg-white border-b border-border last:border-b-0 p-5 flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-backgroundAlt border border-border">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[15px] font-semibold text-textPrimary">{a.title}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${a.status === "upcoming" ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                      {a.status === "upcoming" ? "Upcoming" : "Past"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] text-textSecondary">
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.location}</span>
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
      <section className="bg-backgroundAlt border-t border-border">
        <div className="container-content py-14 text-center">
          <h2 className="text-[22px] font-bold text-textPrimary mb-3">Explore ICH Guidelines</h2>
          <p className="text-[15px] text-textSecondary mb-8 max-w-lg mx-auto">
            Browse the complete library of harmonised guidelines for pharmaceutical development.
          </p>
          <Link href="/guidelines" className="inline-flex items-center gap-2 bg-primary text-white text-[14px] font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity">
            Browse Guidelines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
