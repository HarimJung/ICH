"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Download, CheckCircle2, Minus } from "lucide-react";
import guidelines from "@/data/guidelines.json";
import { Guideline, Category } from "@/types";
import StepBadge from "@/components/StepBadge";
import CategoryBadge from "@/components/CategoryBadge";
import HeroSection from "@/components/HeroSection";

const typedGuidelines = guidelines as Guideline[];
const categories: Category[] = [
  "Quality",
  "Safety",
  "Efficacy",
  "Multidisciplinary",
];

const members = [
  { key: "FDA" as const, label: "FDA", region: "US" },
  { key: "EMA" as const, label: "EMA", region: "EU" },
  { key: "PMDA" as const, label: "PMDA", region: "Japan" },
  { key: "HC" as const, label: "HC", region: "Canada" },
  { key: "ANVISA" as const, label: "ANVISA", region: "Brazil" },
];

function exportMatrixCSV(data: Guideline[]) {
  const header = [
    "ID",
    "Title",
    "Category",
    "Step",
    ...members.map((m) => m.label),
  ].join(",");
  const rows = data.map((g) =>
    [
      `"${g.id}"`,
      `"${g.title}"`,
      `"${g.category}"`,
      g.step,
      ...members.map((m) =>
        g.implementationStatus[m.key] ? "Yes" : "No"
      ),
    ].join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ich-implementation-matrix.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ImplementationPage() {
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">(
    "all"
  );
  const [memberFilter, setMemberFilter] = useState<string>("all");
  const [showFullOnly, setShowFullOnly] = useState(false);
  const [showPartialOnly, setShowPartialOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...typedGuidelines].sort((a, b) =>
      a.id.localeCompare(b.id)
    );

    if (categoryFilter !== "all") {
      result = result.filter((g) => g.category === categoryFilter);
    }

    if (showFullOnly) {
      result = result.filter((g) =>
        members.every((m) => g.implementationStatus[m.key])
      );
    }

    if (showPartialOnly) {
      result = result.filter((g) => {
        const count = members.filter(
          (m) => g.implementationStatus[m.key]
        ).length;
        return count > 0 && count < members.length;
      });
    }

    return result;
  }, [categoryFilter, showFullOnly, showPartialOnly]);

  const avgRate = useMemo(() => {
    if (typedGuidelines.length === 0) return 0;
    const totalCells = typedGuidelines.length * members.length;
    const implemented = typedGuidelines.reduce(
      (sum, g) =>
        sum + members.filter((m) => g.implementationStatus[m.key]).length,
      0
    );
    return Math.round((implemented / totalCells) * 100);
  }, []);

  return (
    <div>
      <HeroSection
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Implementation Status" }]}
        title="Guideline Implementation Status"
        subtitle="Track which ICH members have adopted each guideline into their regulatory framework."
      />

      <div className="bg-white">
        <div className="container-content py-10 lg:py-14">
          {/* Summary Stats */}
          <div className="bg-white border border-border p-6 mb-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {typedGuidelines.length}
                </div>
                <div className="mt-1 text-sm text-textMuted">Guidelines</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {members.length}
                </div>
                <div className="mt-1 text-sm text-textMuted">Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{avgRate}%</div>
                <div className="mt-1 text-sm text-textMuted">
                  Avg Implementation Rate
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as Category | "all")
              }
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-secondary transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-secondary transition-colors"
            >
              <option value="all">All Members</option>
              {members.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label} ({m.region})
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFullOnly}
                onChange={() => {
                  setShowFullOnly(!showFullOnly);
                  if (!showFullOnly) setShowPartialOnly(false);
                }}
                className="h-4 w-4 rounded border-border text-secondary focus:ring-secondary"
              />
              <span className="text-sm text-textPrimary">Fully implemented</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPartialOnly}
                onChange={() => {
                  setShowPartialOnly(!showPartialOnly);
                  if (!showPartialOnly) setShowFullOnly(false);
                }}
                className="h-4 w-4 rounded border-border text-secondary focus:ring-secondary"
              />
              <span className="text-sm text-textPrimary">
                Partially implemented
              </span>
            </label>

            <button
              onClick={() => exportMatrixCSV(filtered)}
              className="ml-auto flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-textPrimary hover:border-secondary hover:text-secondary transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          <p className="mb-4 text-sm text-textMuted">
            Showing {filtered.length} of {typedGuidelines.length} guidelines
          </p>

          {/* Table */}
          <div className="bg-white border border-border overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-backgroundAlt">
                  <th className="sticky left-0 z-20 bg-backgroundAlt px-4 py-3 text-left font-medium text-textMuted border-b border-r border-border min-w-[100px]">
                    ID
                  </th>
                  <th className="sticky left-[100px] z-20 bg-backgroundAlt px-4 py-3 text-left font-medium text-textMuted border-b border-r border-border min-w-[260px]">
                    Title
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-textMuted border-b border-border min-w-[120px]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-textMuted border-b border-border min-w-[80px]">
                    Step
                  </th>
                  {members
                    .filter(
                      (m) => memberFilter === "all" || memberFilter === m.key
                    )
                    .map((m) => (
                      <th
                        key={m.key}
                        className="px-4 py-3 text-center font-medium text-textMuted border-b border-border min-w-[80px]"
                      >
                        <div>{m.label}</div>
                        <div className="text-xs font-normal">{m.region}</div>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => {
                  const visibleMembers = members.filter(
                    (m) => memberFilter === "all" || memberFilter === m.key
                  );
                  return (
                    <tr
                      key={g.id}
                      className="border-b border-border last:border-0 hover:bg-backgroundAlt/50"
                    >
                      <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r border-border">
                        <Link
                          href={`/guidelines/${encodeURIComponent(g.id)}`}
                          className="font-mono text-sm text-secondary font-medium hover:underline"
                        >
                          {g.id}
                        </Link>
                      </td>
                      <td className="sticky left-[100px] z-10 bg-white px-4 py-3 border-r border-border">
                        <Link
                          href={`/guidelines/${encodeURIComponent(g.id)}`}
                          className="text-textPrimary font-medium hover:text-secondary transition-colors line-clamp-1"
                        >
                          {g.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CategoryBadge category={g.category} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StepBadge step={g.step} />
                      </td>
                      {visibleMembers.map((m) => (
                        <td key={m.key} className="px-4 py-3 text-center">
                          {g.implementationStatus[m.key] ? (
                            <CheckCircle2 className="inline h-5 w-5 text-success" />
                          ) : (
                            <Minus className="inline h-5 w-5 text-textMuted/30" />
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-textMuted">
                No guidelines match your filters.
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setMemberFilter("all");
                  setShowFullOnly(false);
                  setShowPartialOnly(false);
                }}
                className="mt-4 text-sm font-medium text-secondary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
