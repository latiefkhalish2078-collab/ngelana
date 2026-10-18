
"use client";

import { useMemo, useState } from "react";
import DestinationCard from "./destination-card";
import { destinations } from "./data";
import type { DestinationCategory } from "@/types/destinations";

type CategoryFilter = "Semua" | DestinationCategory;

export default function ExploreSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("Semua");

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesQuery = [
        destination.name,
        destination.region,
        destination.category,
      ].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

      const matchesCategory =
        category === "Semua" ||
        destination.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const filters: CategoryFilter[] = [
    "Semua",
    "Gunung",
    "Bukit",
  ];

  return (
    <section id="destinations" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
            Eksplorasi
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Temukan tujuan pendakianmu
          </h2>

          <p className="mt-4 leading-7 text-stone-600">
            Cari destinasi dan jelajahi informasi awal sebelum
            merencanakan pendakian.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Cari destinasi</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama destinasi atau wilayah..."
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  category === filter
                    ? "bg-emerald-900 text-white"
                    : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 mt-8 text-sm text-stone-500">
          Menampilkan {filteredDestinations.length} dari{" "}
          {destinations.length} destinasi contoh
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 p-10 text-center">
            <h3 className="font-semibold text-stone-900">
              Destinasi tidak ditemukan
            </h3>
            <p className="mt-2 text-sm text-stone-600">
              Coba kata kunci lain atau pilih kategori Semua.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("Semua");
              }}
              className="mt-4 font-semibold text-emerald-800 hover:underline"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
