"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import guidelines from "@/data/guidelines.json";
import { Guideline, Category } from "@/types";
import SearchBar from "@/components/SearchBar";
import GuidelineCard from "@/components/GuidelineCard";
import CategoryBadge from "@/components/CategoryBadge";
import StepBadge from "@/components/StepBadge";
import StepDistributionChart from "@/components/StepDistributionChart";

const typedGuidelines = guidelines as Guideline[];
const categories: Category[] = ["Quality", "Safety", "Efficacy", "Multidisciplinary"];
const steps = [1, 2, 3, 4, 5] as const;

function GuidelinesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    initialCategory
  );
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"id" | "date" | "title">("id");

  const stepChartData = useMemo(() => {
    const stepColors: Record<number, string> = {
      1: "#9CA3AF",
      2: "#F59E0B",
      3: "#0D9488",
      4: "#3B82F6",
      5: "#16A34A",
    };
    return [1, 2, 3, 4, 5].map((s) => ({
      step: s,
      label: `Step ${s}`,
      count: typedGuidelines.filter((g) => g.step === s).length,
      color: stepColors[s],
    }));
  }, []);

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

    if (selectedCategory) {
      result = result.filter((g) => g.category === selectedCategory);
    }

    if (selectedStep) {
      result = result.filter((g) => g.step === selectedStep);
    }

    switch (sortBy) {
      case "date":
        result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [search, selectedCategory, selectedStep, sortBy]);

  return (
    <div className="container-content section-gap">
      <div className="mb-8">
        <h1 className="mb-2">ICH Guidelines</h1>
        <p className="text-textSecondary">
          Browse all {typedGuidelines.length} harmonised guidelines across
          Quality, Safety, Efficacy, and Multidisciplinary topics.
        </p>
      </div>

      {/* Step Distribution Chart */}
      <div className="card p-6 mb-8">
        <h3 className="mb-4">Step Distribution</h3>
        <StepDistributionChart data={stepChartData} />
      </div>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search guidelines..."
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              !selectedCategory
                ? "bg-primary text-white border-primary"
                : "bg-surface text-textSecondary border-border hover:border-primary"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={selectedCategory === cat ? "opacity-100" : "opacity-60 hover:opacity-100"}
            >
              <CategoryBadge category={cat} />
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-border hidden sm:block" />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStep(null)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              !selectedStep
                ? "bg-primary text-white border-primary"
                : "bg-surface text-textSecondary border-border hover:border-primary"
            }`}
          >
            All Steps
          </button>
          {steps.map((s) => (
            <button
              key={s}
              onClick={() =>
                setSelectedStep(selectedStep === s ? null : s)
              }
              className={selectedStep === s ? "opacity-100" : "opacity-60 hover:opacity-100"}
            >
              <StepBadge step={s} />
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "id" | "date" | "title")}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-textPrimary"
          >
            <option value="id">Sort by ID</option>
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-textSecondary">
        Showing {filtered.length} of {typedGuidelines.length} guidelines
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((g) => (
          <GuidelineCard key={g.id} guideline={g} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-textSecondary">
            No guidelines match your filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory(null);
              setSelectedStep(null);
            }}
            className="mt-4 text-sm font-medium text-secondary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
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
