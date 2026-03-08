import { Users, Globe, FileCheck, ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import governance from "@/data/governance.json";
import { GovernanceData } from "@/types";

const gov = governance as GovernanceData;

const steps = [
  {
    step: "Step 1",
    title: "Consensus Building",
    description: "Expert Working Group prepares a draft guideline through scientific consensus.",
  },
  {
    step: "Step 2",
    title: "Regulatory Consultation",
    description: "The draft is reviewed by regulatory parties and released for public comment (Step 2a/2b).",
  },
  {
    step: "Step 3",
    title: "Regulatory Review",
    description: "Comments are reviewed and incorporated. The document is finalized for adoption.",
  },
  {
    step: "Step 4",
    title: "Adoption",
    description: "The ICH Assembly endorses the final guideline for implementation in member regions.",
  },
  {
    step: "Step 5",
    title: "Implementation",
    description: "Each regulatory authority implements the guideline in their jurisdiction according to local procedures.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight text-white mb-4">
            About ICH
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            The International Council for Harmonisation of Technical
            Requirements for Pharmaceuticals for Human Use (ICH) brings together
            regulatory authorities and the pharmaceutical industry to discuss
            scientific and technical aspects of pharmaceutical product
            registration.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-gap">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Harmonisation",
                description:
                  "ICH develops harmonised guidelines to reduce duplication of clinical trials and create a more streamlined regulatory process for global pharmaceutical development.",
              },
              {
                icon: Users,
                title: "Multi-Stakeholder",
                description:
                  "ICH brings together regulatory authorities and industry associations from across the globe to create consensus-based technical guidelines.",
              },
              {
                icon: FileCheck,
                title: "Science-Based Standards",
                description:
                  "Guidelines are developed through rigorous scientific assessment, ensuring safe, effective, and high-quality medicines reach patients worldwide.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <item.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guideline Process */}
      <section className="section-gap bg-surface">
        <div className="container-content">
          <h2 className="mb-8">The ICH Guideline Process</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="card flex items-start gap-6 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg">{s.title}</h3>
                    <span className="text-xs text-textSecondary font-medium">
                      {s.step}
                    </span>
                  </div>
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="section-gap">
        <div className="container-content">
          <h2 className="mb-8">Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gov.members.map((m) => (
              <div key={m.name} className="card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{m.flag}</span>
                  <span className="font-semibold text-primary">{m.name}</span>
                </div>
                <div className="text-sm text-textSecondary mb-1">
                  {m.fullName}
                </div>
                <div className="flex items-center justify-between text-xs text-textSecondary">
                  <span>{m.region}</span>
                  <span className={`rounded-full px-2 py-0.5 font-medium ${
                    m.type === "regulatory"
                      ? "bg-blue-50 text-primary"
                      : "bg-teal-50 text-secondary"
                  }`}>
                    {m.type === "regulatory" ? "Regulatory" : "Industry"}
                  </span>
                </div>
                <div className="mt-2 text-xs text-textSecondary">
                  Member since {m.since}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Observers */}
      <section className="section-gap bg-surface">
        <div className="container-content">
          <h2 className="mb-8">Observers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gov.observers.map((o) => (
              <div key={o.name} className="card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{o.flag}</span>
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
      </section>

      {/* Assembly Schedule */}
      <section className="section-gap">
        <div className="container-content">
          <h2 className="mb-8">Assembly Schedule</h2>
          <div className="space-y-4">
            {gov.assemblies.map((a) => (
              <div key={a.id} className="card flex items-center gap-6 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg">{a.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      a.status === "upcoming"
                        ? "bg-green-50 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {a.status === "upcoming" ? "Upcoming" : "Past"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-textSecondary">
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {a.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary text-white">
        <div className="container-content text-center">
          <h2 className="text-white mb-4">Explore ICH Guidelines</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Browse the complete library of harmonised guidelines for pharmaceutical development.
          </p>
          <Link
            href="/guidelines"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Browse Guidelines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
