"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  List,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import guidelines from "@/data/guidelines.json";
import { Guideline, Category, Step } from "@/types";
import GuidelineCard from "@/components/GuidelineCard";
import StepBadge from "@/components/StepBadge";
import CategoryBadge from "@/components/CategoryBadge";

const typedGuidelines = guidelines as Guideline[];
const categories: Category[] = [
  "Quality",
  "Safety",
  "Efficacy",
  "Multidisciplinary",
];
const steps: Step[] = [1, 2, 3, 4, 5];
const PAGE_SIZE = 12;

type SortBy = "az" | "za" | "recent" | "step_asc" | "step_desc";
type ViewMode = "grid" | "list";

function categoryCounts() {
  const counts: Record<string, number> = {};
  for (const cat of categories) {
    counts[cat] = typedGuidelines.filter((g) => g.category === cat).length;
  }
  return counts;
}

function stepCounts() {
  const counts: Record<number, number> = {};
  for (const s of steps) {
    counts[s] = typedGuidelines.filter((g) => g.step === s).length;
  }
  return counts;
}

function exportCSV(data: Guideline[]) {
  const header = "ID,Title,Category,Step,Current Version,Date Reached,Last Updated,Has Active Consultation";
  const rows = data.map(
    (g) =>
      `"${g.id}","${g.title}","${g.category}",${g.step},"${g.currentVersion}","${g.dateReached}","${g.lastUpdated}",${g.hasActiveConsultation}`
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ich-guidelines.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function GuidelinesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial state from URL
  const initialCategories = searchParams.get("category")
    ? (searchParams.get("category")!.split(",") as Category[])
    : [];
  const initialSteps = searchParams.get("step")
    ? searchParams
        .get("step")!
        .split(",")
        .map(Number) as Step[]
    : [];
  const initialSearch = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(initialCategories);
  const [selectedSteps, setSelectedSteps] = useState<Step[]>(initialSteps);
  const [consultationOnly, setConsultationOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("az");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  const catCounts = useMemo(() => categoryCounts(), []);
  const sCounts = useMemo(() => stepCounts(), []);

  // Sync URL
  const syncURL = useCallback(
    (cats: Category[], stps: Step[], q: string) => {
      const params = new URLSearchParams();
      if (cats.length) params.set("category", cats.join(","));
      if (stps.length) params.set("step", stps.join(","));
      if (q.trim()) params.set("q", q.trim());
      const qs = params.toString();
      router.replace(`/guidelines${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  const toggleCategory = (cat: Category) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(next);
    setPage(1);
    syncURL(next, selectedSteps, search);
  };

  const toggleStep = (s: Step) => {
    const next = selectedSteps.includes(s)
      ? selectedSteps.filter((x) => x !== s)
      : [...selectedSteps, s];
    setSelectedSteps(next);
    setPage(1);
    syncURL(selectedCategories, next, search);
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedSteps([]);
    setConsultationOnly(false);
    setPage(1);
    router.replace("/guidelines", { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    syncURL(selectedCategories, selectedSteps, value);
  };

  const filtered = useMemo(() => {
    let result = [...typedGuidelines];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.id.toLowerCase().includes(q) ||
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((g) => selectedCategories.includes(g.category));
    }

    if (selectedSteps.length > 0) {
      result = result.filter((g) => selectedSteps.includes(g.step));
    }

    if (consultationOnly) {
      result = result.filter((g) => g.hasActiveConsultation);
    }

    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "recent":
        result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
        break;
      case "step_asc":
        result.sort((a, b) => a.step - b.step || a.id.localeCompare(b.id));
        break;
      case "step_desc":
        result.sort((a, b) => b.step - a.step || a.id.localeCompare(b.id));
        break;
    }

    return result;
  }, [search, selectedCategories, selectedSteps, consultationOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasFilters =
    search.trim() !== "" ||
    selectedCategories.length > 0 ||
    selectedSteps.length > 0 ||
    consultationOnly;

  return (
    <div className="container-content section-gap">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-textSecondary">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-textPrimary font-medium">Guidelines</span>
      </nav>

      <div className="mb-6">
        <h1 className="mb-2">ICH Guidelines</h1>
        <p className="text-textSecondary max-w-3xl">
          Browse the complete collection of ICH harmonised guidelines. Use
          filters and search to find specific guidelines by category, step, or
          keyword.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search guidelines by ID, title, or keyword..."
          className="w-full rounded-lg border border-border bg-white py-3 pl-12 pr-4 text-base text-textPrimary placeholder:text-textSecondary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
        />
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <div className="sticky top-24 space-y-6">
            <h3 className="text-lg font-semibold">Filters</h3>

            {/* Category */}
            <div>
              <h4 className="text-sm font-semibold text-textSecondary uppercase tracking-wide mb-3">
                Category
              </h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-4 w-4 rounded border-border text-secondary focus:ring-secondary"
                    />
                    <span className="text-sm text-textPrimary group-hover:text-secondary flex-1">
                      {cat}
                    </span>
                    <span className="text-xs text-textSecondary">
                      ({catCounts[cat]})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step */}
            <div>
              <h4 className="text-sm font-semibold text-textSecondary uppercase tracking-wide mb-3">
                Step
              </h4>
              <div className="space-y-2">
                {steps.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSteps.includes(s)}
                      onChange={() => toggleStep(s)}
                      className="h-4 w-4 rounded border-border text-secondary focus:ring-secondary"
                    />
                    <span className="text-sm text-textPrimary group-hover:text-secondary flex-1">
                      Step {s}
                    </span>
                    <span className="text-xs text-textSecondary">
                      ({sCounts[s]})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Active Consultation toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  role="switch"
                  aria-checked={consultationOnly}
                  onClick={() => {
                    setConsultationOnly(!consultationOnly);
                    setPage(1);
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                    consultationOnly ? "bg-secondary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${
                      consultationOnly ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-sm text-textPrimary">
                  Open consultations only
                </span>
              </label>
            </div>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-sm text-textSecondary underline hover:text-secondary"
              >
                Clear all filters
              </button>
            )}

            <div className="border-t border-border pt-4">
              <button
                onClick={() => exportCSV(filtered)}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-textPrimary hover:border-secondary hover:text-secondary transition-colors w-full justify-center"
              >
                <Download className="h-4 w-4" />
                Export Results
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <p className="text-sm text-textSecondary">
              Showing {filtered.length} of {typedGuidelines.length} guidelines
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-textPrimary"
              >
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
                <option value="recent">Most Recent</option>
                <option value="step_asc">Step ↑</option>
                <option value="step_desc">Step ↓</option>
              </select>
              <div className="flex rounded-md border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "bg-surface text-textSecondary hover:text-textPrimary"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 border-l border-border ${
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "bg-surface text-textSecondary hover:text-textPrimary"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          <div className="lg:hidden mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={
                  selectedCategories.includes(cat)
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }
              >
                <CategoryBadge category={cat} />
              </button>
            ))}
            <div className="w-full" />
            {steps.map((s) => (
              <button
                key={s}
                onClick={() => toggleStep(s)}
                className={
                  selectedSteps.includes(s)
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }
              >
                <StepBadge step={s} />
              </button>
            ))}
          </div>

          {/* Results */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paged.map((g) => (
                <GuidelineCard key={g.id} guideline={g} />
              ))}
            </div>
          ) : (
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="px-4 py-3 text-left font-medium text-textSecondary">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-textSecondary">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-textSecondary hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-textSecondary hidden sm:table-cell">
                      Step
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-textSecondary hidden md:table-cell">
                      Last Updated
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-textSecondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((g) => (
                    <tr
                      key={g.id}
                      className="border-b border-border last:border-0 hover:bg-background/50"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/guidelines/${encodeURIComponent(g.id)}`}
                          className="font-mono text-sm text-secondary font-medium hover:underline"
                        >
                          {g.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/guidelines/${encodeURIComponent(g.id)}`}
                          className="text-textPrimary font-medium hover:text-secondary"
                        >
                          {g.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <CategoryBadge category={g.category} />
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <StepBadge step={g.step} />
                      </td>
                      <td className="px-4 py-3 text-textSecondary hidden md:table-cell">
                        {g.lastUpdated}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="h-4 w-4 text-textSecondary/60" />
                          {g.relatedTraining.length > 0 && (
                            <GraduationCap className="h-4 w-4 text-secondary" />
                          )}
                          {g.hasActiveConsultation && (
                            <MessageSquare className="h-4 w-4 text-accent" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-textSecondary">
                No guidelines match your filters.
              </p>
              <button
                onClick={clearAll}
                className="mt-4 text-sm font-medium text-secondary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-textSecondary hover:border-secondary hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Show first, last, current, and neighbors
                if (
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - page) <= 1
                ) {
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 rounded-md text-sm font-medium ${
                        p === page
                          ? "bg-primary text-white"
                          : "text-textSecondary hover:bg-background"
                      }`}
                    >
                      {p}
                    </button>
                  );
                }
                // Show ellipsis
                if (p === 2 && page > 3) {
                  return (
                    <span key="start-ellipsis" className="text-textSecondary px-1">
                      ...
                    </span>
                  );
                }
                if (p === totalPages - 1 && page < totalPages - 2) {
                  return (
                    <span key="end-ellipsis" className="text-textSecondary px-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-textSecondary hover:border-secondary hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GuidelinesPage() {
  return (
    <Suspense
      fallback={
        <div className="container-content section-gap">
          <h1 className="mb-2">ICH Guidelines</h1>
          <p className="text-textSecondary">Loading...</p>
        </div>
      }
    >
      <GuidelinesContent />
    </Suspense>
  );
}
