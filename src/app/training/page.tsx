"use client";

import { useState, useMemo } from "react";
import training from "@/data/training.json";
import { Training, Category } from "@/types";
import TrainingCard from "@/components/TrainingCard";
import CategoryBadge from "@/components/CategoryBadge";

const typedTraining = training as Training[];
const categories: Category[] = ["Quality", "Safety", "Efficacy", "Multidisciplinary"];

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCategory) return typedTraining;
    return typedTraining.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="container-content section-gap">
      <div className="mb-8">
        <h1 className="mb-2">Training Materials</h1>
        <p className="text-textSecondary">
          Access {typedTraining.length} training modules including videos,
          webinars, e-learning courses, and reference documents.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
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
            className={
              selectedCategory === cat
                ? "opacity-100"
                : "opacity-60 hover:opacity-100"
            }
          >
            <CategoryBadge category={cat} />
          </button>
        ))}
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
            No training modules match your filter.
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-4 text-sm font-medium text-secondary hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
