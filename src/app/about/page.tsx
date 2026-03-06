import { Users, Globe, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const members = [
  { name: "FDA", fullName: "U.S. Food and Drug Administration", region: "United States" },
  { name: "EMA", fullName: "European Medicines Agency", region: "European Union" },
  { name: "PMDA", fullName: "Pharmaceuticals and Medical Devices Agency", region: "Japan" },
  { name: "Health Canada", fullName: "Health Canada", region: "Canada" },
  { name: "Swissmedic", fullName: "Swiss Agency for Therapeutic Products", region: "Switzerland" },
  { name: "ANVISA", fullName: "Agência Nacional de Vigilância Sanitária", region: "Brazil" },
  { name: "NMPA", fullName: "National Medical Products Administration", region: "China" },
  { name: "MFDS", fullName: "Ministry of Food and Drug Safety", region: "Republic of Korea" },
];

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
          <h2 className="mb-8">Regulatory Members &amp; Observers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((m) => (
              <div key={m.name} className="card p-5">
                <div className="font-semibold text-primary mb-1">{m.name}</div>
                <div className="text-sm text-textSecondary mb-1">
                  {m.fullName}
                </div>
                <div className="text-xs text-textSecondary">{m.region}</div>
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
