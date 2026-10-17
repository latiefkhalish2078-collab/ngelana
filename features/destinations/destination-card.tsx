
import Link from "next/link";
import type { Destination } from "@/types/destination";

type Props = {
  destination: Destination;
};

export default function DestinationCard({ destination }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-40 items-end bg-gradient-to-br from-emerald-900 via-emerald-700 to-stone-500 p-5">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {destination.category}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-sm text-stone-500">
            {destination.region}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-stone-900">
            {destination.name}
          </h3>
        </div>

        <p className="min-h-12 text-sm leading-6 text-stone-600">
          {destination.description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800">
            {destination.difficulty}
          </span>

          {destination.dataStatus === "demo" && (
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
              Data simulasi
            </span>
          )}
        </div>

        <Link
          href={`/destinations/${destination.slug}`}
          className="inline-flex pt-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600"
        >
          Lihat destinasi
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
