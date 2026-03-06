"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Shield, FlaskConical, Layers } from "lucide-react";
import guidelines from "@/data/guidelines.json";
import training from "@/data/training.json";
import { Guideline, Training } from "@/types";
import SearchBar from "@/components/SearchBar";
import GuidelineCard from "@/components/GuidelineCard";
import TrainingCard from "@/components/TrainingCard";
import CategoryDonutChart from "@/components/CategoryDonutChart";

const typedGuidelines = guidelines as Guideline[];
const typedTraining = training as Training[];

const categoryIcons = {
  Quality: FlaskConical,
  Safety: Shield,
  Efficacy: BookOpen,
  Multidisciplinary: Layers,
};

const categoryColors = {
  Quality: "bg-blue-50 text-primary border-blue-200 hover:bg-blue-100",
  Safety: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  Efficacy: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  Multidisciplinary: "bg-teal-50 text-secondary border-teal-200 hover:bg-teal-100",
};

export default function HomePage() {
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
    const step5 = typedGuidelines.filter((g) => g.step === 5).length;
    const consultations = typedGuidelines.filter((g) => g.hasActiveConsultation).length;
    return {
      total: typedGuidelines.length,
      step5,
      consultations,
      training: typedTraining.length,
    };
  }, []);

  const latestGuidelines = useMemo(
    () =>
      [...typedGuidelines]
        .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
        .slice(0, 4),
    []
  );

  const categoryStats = useMemo(() => {
    const cats = ["Quality", "Safety", "Efficacy", "Multidisciplinary"] as const;
    return cats.map((cat) => ({
      name: cat,
      count: typedGuidelines.filter((g) => g.category === cat).length,
      prefix: cat[0],
    }));
  }, []);

  const donutData = useMemo(() => {
    const colorMap: Record<string, string> = {
      Quality: "#003B5C",
      Safety: "#DC3545",
      Efficacy: "#7C3AED",
      Multidisciplinary: "#00838F",
    };
    return categoryStats.map((cat) => ({
      name: cat.name,
      count: cat.count,
      color: colorMap[cat.name] || "#003B5C",
    }));
  }, [categoryStats]);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return typedGuidelines
      .filter(
        (g) =>
          g.id.toLowerCase().includes(q) ||
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [search]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-content px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight text-white mb-4">
            ICH Guidelines &amp; Standards
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            Access harmonised technical guidelines for pharmaceutical
            development, registration, and post-approval. Ensuring safe,
            effective, and high-quality medicines worldwide.
          </p>
          <div className="max-w-2xl">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search guidelines by ID, title, or keyword..."
            />
          </div>
          {searchResults.length > 0 && (
            <div className="mt-4 max-w-2xl rounded-lg bg-white p-4 shadow-lg">
              <div className="space-y-2">
                {searchResults.map((g) => (
                  <Link
                    key={g.id}
                    href={`/guidelines/${encodeURIComponent(g.id)}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-background transition-colors"
                  >
                    <span className="font-mono text-sm text-secondary font-medium shrink-0">
                      {g.id}
                    </span>
                    <span className="text-sm text-textPrimary truncate">
                      {g.title}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href={`/guidelines?search=${encodeURIComponent(search)}`}
                className="mt-2 flex items-center gap-1 text-sm text-secondary font-medium pt-2 border-t border-border"
              >
                View all results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-content px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Guidelines", value: stats.total },
              { label: "Adopted (Step 5)", value: stats.step5 },
              { label: "Open Consultations", value: stats.consultations },
              { label: "Training Modules", value: stats.training },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-textSecondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="section-gap">
        <div className="container-content">
          <div className="flex items-center justify-between mb-8">
            <h2>Browse by Category</h2>
            <Link
              href="/guidelines"
              className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryStats.map((cat) => {
                const Icon = categoryIcons[cat.name];
                return (
                  <Link
                    key={cat.name}
                    href={`/guidelines?category=${cat.name}`}
                    className={`flex items-center gap-4 rounded-lg border p-5 transition-colors ${categoryColors[cat.name]}`}
                  >
                    <Icon className="h-8 w-8 shrink-0" />
                    <div>
                      <div className="font-semibold">{cat.name}</div>
                      <div className="text-sm opacity-70">
                        {cat.count} guideline{cat.count !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="card p-6">
              <h3 className="mb-4 text-center text-lg">Distribution</h3>
              <CategoryDonutChart data={donutData} />
            </div>
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="section-gap bg-surface">
        <div className="container-content">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2>Latest Updates</h2>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                What&apos;s New
              </span>
            </div>
            <Link
              href="/guidelines"
              className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestGuidelines.map((g) => (
              <GuidelineCard key={g.id} guideline={g} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Training */}
      <section className="section-gap">
        <div className="container-content">
          <div className="flex items-center justify-between mb-8">
            <h2>Training Materials</h2>
            <Link
              href="/training"
              className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {typedTraining.slice(0, 3).map((t) => (
              <TrainingCard key={t.id} training={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
