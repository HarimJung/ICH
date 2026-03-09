"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import training from "@/data/training.json";
import { Training, Category, TrainingType } from "@/types";
import TrainingCard from "@/components/TrainingCard";
import CategoryBadge from "@/components/CategoryBadge";
import HeroSection from "@/components/HeroSection";

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

export default function TrainingPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<TrainingType | null>(null);

  const filtered = useMemo(() => {
    let result = [...typedTraining];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (selectedType) {
      result = result.filter((t) => t.type === selectedType);
    }

    return result;
  }, [search, selectedCategory, selectedType]);

  const clearAll = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedType(null);
  };

  const hasFilters =
    search.trim() !== "" ||
    selectedCategory !== null ||
    selectedType !== null;

  return (
    <>
      <HeroSection
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Training" },
        ]}
        title="Training Materials"
        subtitle="Access guideline-specific training resources to support implementation and consistent understanding of ICH guidelines worldwide."
      />

      <section className="bg-white">
        <div className="container-content py-10 lg:py-14">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search training modules..."
              className="w-full rounded-xl border border-border bg-white py-3.5 pl-14 pr-5 text-base text-textPrimary placeholder:text-textMuted shadow-card focus:shadow-search focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Category filter row */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-textMuted mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
                className={`transition-all duration-200 ${
                  selectedCategory === cat
                    ? "ring-2 ring-gray-400 ring-offset-1 rounded-full"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <CategoryBadge category={cat} />
              </button>
            ))}
          </div>

          {/* Type filter row */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-textMuted mr-1">Type:</span>
            {trainingTypes.map((t) => (
              <button
                key={t}
                onClick={() =>
                  setSelectedType(selectedType === t ? null : t)
                }
                className={`rounded-full px-3.5 py-1 text-xs font-semibold border transition-all duration-200 ${
                  selectedType === t
                    ? "bg-primary text-white border-primary"
                    : "bg-backgroundAlt text-textMuted border-border hover:border-primary hover:text-primary"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Results count + clear */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-textMuted !text-textMuted">
              {filtered.length} of {typedTraining.length} modules
            </p>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-sm font-medium text-secondary hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <TrainingCard key={t.id} training={t} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-textMuted">
                No training modules match your current filters.
              </p>
              <button
                onClick={clearAll}
                className="mt-4 text-sm font-semibold text-secondary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
