"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Share2, CheckCircle2, Minus, Clock } from "lucide-react";
import guidelines from "@/data/guidelines.json";
import training from "@/data/training.json";
import consultations from "@/data/consultations.json";
import governance from "@/data/governance.json";
import { Guideline, Training, Consultation, GovernanceData } from "@/types";
import StepBadge from "@/components/StepBadge";
import CategoryBadge from "@/components/CategoryBadge";
import GuidelineCard from "@/components/GuidelineCard";
import HeroSection from "@/components/HeroSection";

const typedGuidelines = guidelines as Guideline[];
const typedTraining = training as Training[];
const typedConsultations = consultations as Consultation[];
const gov = governance as GovernanceData;

const tabs = ["Overview", "Document History", "Related Guidelines", "Training", "Implementation", "Consultations"] as const;
type TabName = (typeof tabs)[number];

const agencies = [
  { key: "FDA", label: "FDA", region: "United States" },
  { key: "EMA", label: "EMA", region: "European Union" },
  { key: "PMDA", label: "PMDA", region: "Japan" },
  { key: "HC", label: "Health Canada", region: "Canada" },
  { key: "ANVISA", label: "ANVISA", region: "Brazil" },
] as const;

function daysUntil(dateStr: string) {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

function exportImplementationCSV(guideline: Guideline) {
  const header = "Agency,Region,Status";
  const rows = agencies.map(
    (a) => `"${a.label}","${a.region}","${guideline.implementationStatus[a.key] ? "Implemented" : "Not implemented"}"`
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${guideline.id}-implementation.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function GuidelineDetailPage({ params }: { params: { id: string } }) {
  const decodedId = decodeURIComponent(params.id);
  const guideline = typedGuidelines.find((g) => g.id === decodedId);
  if (!guideline) notFound();

  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  const relatedGuidelines = useMemo(() => typedGuidelines.filter((g) => guideline.relatedGuidelines.includes(g.id)), [guideline]);
  const relatedTraining = useMemo(() => typedTraining.filter((t) => guideline.relatedTraining.includes(t.id)), [guideline]);
  const linkedConsultations = useMemo(() => typedConsultations.filter((c) => c.guidelineId === guideline.id), [guideline]);
  const implementedCount = useMemo(() => agencies.filter((a) => guideline.implementationStatus[a.key]).length, [guideline]);
  const activeConsultation = linkedConsultations.find((c) => c.status === "open");

  const documentHistory = useMemo(() => {
    const history = [];
    if (guideline.currentVersion && guideline.currentVersion !== "") {
      history.push({ version: guideline.currentVersion, date: guideline.lastUpdated, step: guideline.step, type: "Revision" as const });
    }
    history.push({ version: "Original", date: guideline.dateReached, step: guideline.step, type: "Original" as const });
    return history;
  }, [guideline]);

  return (
    <div>
      {/* Hero */}
      <HeroSection
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guidelines", href: "/guidelines" },
          { label: guideline.category, href: `/guidelines?category=${guideline.category}` },
          { label: guideline.id },
        ]}
        title={guideline.title}
      >
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="font-mono text-[15px] text-secondary font-semibold">{guideline.id}</span>
          <StepBadge step={guideline.step} />
          <CategoryBadge category={guideline.category} />
          {guideline.hasActiveConsultation && (
            <span className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-800">Open Consultation</span>
          )}
        </div>
        <div className="flex flex-wrap gap-6 mt-3 text-[13px] text-textSecondary">
          <span>Version: <strong className="text-textPrimary">{guideline.currentVersion || "—"}</strong></span>
          <span>Step {guideline.step} reached: <strong className="text-textPrimary">{guideline.dateReached}</strong></span>
          <span>Last updated: <strong className="text-textPrimary">{guideline.lastUpdated}</strong></span>
        </div>
        <div className="flex gap-3 mt-5">
          <a href={guideline.pdfUrl} className="inline-flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-5 py-2 hover:opacity-90 transition-opacity">
            <Download className="h-4 w-4" /> Download PDF
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="inline-flex items-center gap-2 border border-border text-textPrimary text-[13px] font-medium px-5 py-2 hover:border-primary transition-colors"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </HeroSection>

      {/* Main content */}
      <div className="bg-white">
        <div className="container-content py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content with tabs */}
            <div className="flex-1 min-w-0">
              {/* Tab bar */}
              <div className="border-b border-border mb-8 overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                  {tabs.map((tab) => {
                    let badge: React.ReactNode = null;
                    if (tab === "Training" && relatedTraining.length > 0) badge = <span className="ml-1.5 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">{relatedTraining.length}</span>;
                    if (tab === "Implementation") badge = <span className="ml-1.5 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">{implementedCount}/{agencies.length}</span>;
                    if (tab === "Consultations" && guideline.hasActiveConsultation) badge = <span className="ml-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-800">Open</span>;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-[15px] font-medium whitespace-nowrap border-b-[3px] transition-colors ${activeTab === tab ? "border-secondary text-textPrimary font-semibold" : "border-transparent text-textMuted hover:text-textPrimary"}`}
                      >
                        {tab}{badge}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "Overview" && (
                <div>
                  <p className="text-textSecondary leading-[1.7] mb-8 max-w-prose">{guideline.description}</p>
                  <div className="mb-8">
                    <h3 className="mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {guideline.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-backgroundAlt px-3 py-1 text-xs text-textMuted border border-border">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Document History" && (
                <div className="relative pl-8">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
                  {documentHistory.map((entry, i) => (
                    <div key={i} className="relative mb-8 last:mb-0">
                      <div className={`absolute -left-8 top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center ${i === 0 ? "border-secondary bg-secondary/10" : "border-border bg-white"}`}>
                        <div className={`h-2 w-2 rounded-full ${i === 0 ? "bg-secondary" : "bg-border"}`} />
                      </div>
                      <div className="bg-white border border-border p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-textPrimary">{entry.version}</span>
                          <span className="text-sm text-textMuted">{entry.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <StepBadge step={entry.step as 1 | 2 | 3 | 4 | 5} />
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${entry.type === "Revision" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-800"}`}>{entry.type}</span>
                          <a href={guideline.pdfUrl} className="ml-auto text-sm text-secondary hover:underline flex items-center gap-1">
                            <Download className="h-3.5 w-3.5" /> Download
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Related Guidelines" && (
                <div>
                  {relatedGuidelines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{relatedGuidelines.map((g) => <GuidelineCard key={g.id} guideline={g} />)}</div>
                  ) : (
                    <p className="py-12 text-center text-textMuted">No related guidelines linked to this document.</p>
                  )}
                </div>
              )}

              {activeTab === "Training" && (
                <div>
                  {relatedTraining.length > 0 ? (
                    <div className="space-y-4">
                      {relatedTraining.map((t) => (
                        <div key={t.id} className="bg-white border border-border flex items-center gap-4 p-5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                            <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="overline text-textMuted">{t.type}</span>
                              <span className="text-xs text-textMuted">{t.duration}</span>
                            </div>
                            <h4 className="font-semibold text-textPrimary leading-snug">{t.title}</h4>
                          </div>
                          <div className="shrink-0 text-xs text-textMuted">{t.datePublished}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-12 text-center text-textMuted">No training modules available for this guideline.</p>
                  )}
                </div>
              )}

              {activeTab === "Implementation" && (
                <div>
                  <div className="bg-white border border-border overflow-hidden mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-backgroundAlt">
                          <th className="px-4 py-3 text-left font-medium text-textMuted">Member</th>
                          <th className="px-4 py-3 text-left font-medium text-textMuted">Region</th>
                          <th className="px-4 py-3 text-center font-medium text-textMuted">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agencies.map((agency) => {
                          const implemented = guideline.implementationStatus[agency.key];
                          const member = gov.members.find((m) => m.name === agency.label);
                          return (
                            <tr key={agency.key} className="border-b border-border last:border-0 hover:bg-backgroundAlt/50 transition-colors">
                              <td className="px-4 py-3 font-medium">{member && <span className="mr-2">{member.flag}</span>}{agency.label}</td>
                              <td className="px-4 py-3 text-textMuted">{agency.region}</td>
                              <td className="px-4 py-3 text-center">{implemented ? <CheckCircle2 className="inline h-5 w-5 text-success" /> : <Minus className="inline h-5 w-5 text-textMuted/40" />}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-textMuted">Implementation status reflects adoption into local regulatory frameworks.</p>
                    <button onClick={() => exportImplementationCSV(guideline)} className="shrink-0 flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-textPrimary hover:border-secondary hover:text-secondary transition-colors">
                      <Download className="h-4 w-4" /> Export CSV
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Consultations" && (
                <div>
                  {linkedConsultations.length > 0 ? (
                    <div className="space-y-4">
                      {linkedConsultations.map((c) => (
                        <div key={c.id} className="bg-white border border-border p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.status === "open" ? "bg-green-50 text-green-800" : c.status === "upcoming" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                            </span>
                            {c.status === "open" && <span className="text-xs text-textMuted">{daysUntil(c.closeDate)} days remaining</span>}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                          <p className="text-sm text-textMuted leading-relaxed mb-4">{c.description}</p>
                          <div className="flex items-center gap-4 text-xs text-textMuted">
                            <span>Opens: {c.openDate}</span>
                            <span>Closes: {c.closeDate}</span>
                          </div>
                          {c.status === "open" && <button className="mt-4 btn-primary text-sm">Submit Comment</button>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-textMuted mb-4">No public consultations currently open for this guideline.</p>
                      <Link href="/consultations" className="text-sm font-medium text-secondary hover:underline">View all consultations</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-[88px] space-y-6">
                <div className="bg-white border border-border p-6">
                  <h3 className="mb-4 text-lg font-semibold">Quick Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between"><dt className="text-textMuted">Category</dt><dd><CategoryBadge category={guideline.category} /></dd></div>
                    <div className="flex justify-between"><dt className="text-textMuted">Current Step</dt><dd><StepBadge step={guideline.step} /></dd></div>
                    <div className="flex justify-between"><dt className="text-textMuted">Date Reached</dt><dd className="font-medium">{guideline.dateReached}</dd></div>
                    <div className="flex justify-between"><dt className="text-textMuted">Version</dt><dd className="font-medium">{guideline.currentVersion || "—"}</dd></div>
                  </dl>
                  <a href={guideline.pdfUrl} className="mt-4 btn-primary text-sm w-full justify-center">
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </div>

                {relatedTraining.length > 0 && (
                  <div className="bg-white border border-border p-6">
                    <h3 className="mb-4 text-lg font-semibold">Related Training</h3>
                    <ul className="space-y-3">
                      {relatedTraining.slice(0, 3).map((t) => (
                        <li key={t.id} className="text-sm">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="overline text-textMuted">{t.type}</span>
                            <span className="text-xs text-textMuted">{t.duration}</span>
                          </div>
                          <p className="text-textPrimary leading-snug font-medium">{t.title}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeConsultation && (
                  <div className="bg-white border-2 border-accent/30 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">Open</span>
                      <span className="text-xs font-medium text-accent flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{daysUntil(activeConsultation.closeDate)} days left</span>
                    </div>
                    <h4 className="text-sm font-semibold mb-2">Public Consultation</h4>
                    <p className="text-xs text-textMuted mb-4 leading-relaxed">Deadline: {activeConsultation.closeDate}</p>
                    <button className="btn-primary text-sm w-full justify-center">Submit Comment</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
