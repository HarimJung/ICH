"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import training from "@/data/training.json";
import { Training, Category, TrainingType } from "@/types";
import TrainingCard from "@/components/TrainingCard";

const typedTraining = training as Training[];
const categories: Category[] = [
  "Quality",
  "Safety",
  "Efficacy",
  "Multidisciplinary",
];
const trainingTypes: TrainingType[] = [
  "video",
  "webinar",
  "document",
  "e-learning",
];

const relatedGuidelineIds = Array.from(
  new Set(typedTraining.map((t) => t.relatedGuideline))
).sort();

export default function TrainingPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<TrainingType | null>(null);
  const [selectedGuideline, setSelectedGuideline] = useState<string>("");

  const filtered = useMemo(() => {
    let result = [...typedTraining];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.relatedGuideline.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (selectedType) {
      result = result.filter((t) => t.type === selectedType);
    }

    if (selectedGuideline) {
      result = result.filter((t) => t.relatedGuideline === selectedGuideline);
    }

    return result;
  }, [search, selectedCategory, selectedType, selectedGuideline]);

  const clearAll = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedType(null);
    setSelectedGuideline("");
  };

  const hasFilters =
    search.trim() !== "" ||
    selectedCategory !== null ||
    selectedType !== null ||
    selectedGuideline !== "";

  return (
    <div className="container-content section-gap">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-textSecondary">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-textPrimary font-medium">Training</span>
      </nav>

      <div className="mb-6">
        <h1 className="mb-2">Training Library</h1>
        <p className="text-textSecondary max-w-3xl">
          Access guideline-specific training materials to support implementation
          and consistent understanding of ICH guidelines worldwide.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search training modules..."
            className="w-full rounded-lg border border-border bg-white py-3 pl-12 pr-4 text-base text-textPrimary placeholder:text-textSecondary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category filter */}
          <select
            value={selectedCategory || ""}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value ? (e.target.value as Category) : null
              )
            }
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-textPrimary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={selectedType || ""}
            onChange={(e) =>
              setSelectedType(
                e.target.value ? (e.target.value as TrainingType) : null
              )
            }
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-textPrimary"
          >
            <option value="">All Types</option>
            {trainingTypes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          {/* Guideline filter */}
          <select
            value={selectedGuideline}
            onChange={(e) => setSelectedGuideline(e.target.value)}
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-textPrimary"
          >
            <option value="">All Guidelines</option>
            {relatedGuidelineIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-sm text-textSecondary underline hover:text-secondary"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-textSecondary">
        Showing {filtered.length} of {typedTraining.length} training modules
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <TrainingCard key={t.id} training={t} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-textSecondary">
            No training modules match your filters.
          </p>
          <button
            onClick={clearAll}
            className="mt-4 text-sm font-medium text-secondary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
