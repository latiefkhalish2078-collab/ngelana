
import Link from "next/link";
import { Suspense } from "react";
import { PublishedDestinations } from "@/features/destinations/published-destinations";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Explore Indonesia, Responsibly
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Temukan Jalur,
            <br />
            Mulai Petualanganmu.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-100 sm:text-lg">
            Ngelana membantu kamu menemukan destinasi pendakian,
            mengenali informasi jalur, dan mempersiapkan perjalanan
            dengan lebih terencana.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#destinations"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-50"
            >
              Jelajahi Destinasi
            </Link>

            <Link
              href="#tentang"
              className="inline-flex items-center rounded-xl border border-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
            >
              Tentang Ngelana
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-700/20 blur-3xl"
        />
      </section>

      {/* Nilai utama */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:grid-cols-3 sm:px-8">
        <article className="rounded-2xl border border-stone-200 bg-white p-6">
          <span className="text-2xl" aria-hidden="true">
            ◈
          </span>
          <h2 className="mt-4 text-lg font-semibold text-stone-900">
            Eksplorasi Destinasi
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Temukan pilihan gunung dan bukit dengan informasi destinasi
            yang disiapkan secara terstruktur.
          </p>
        </article>

        <article className="rounded-2xl border border-stone-200 bg-white p-6">
          <span className="text-2xl" aria-hidden="true">
            ◎
          </span>
          <h2 className="mt-4 text-lg font-semibold text-stone-900">
            Informasi Jalur
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Informasi jalur dan status operasional akan ditampilkan
            sesuai data yang tersedia dan telah diverifikasi.
          </p>
        </article>

        <article className="rounded-2xl border border-stone-200 bg-white p-6">
          <span className="text-2xl" aria-hidden="true">
            ↗
          </span>
          <h2 className="mt-4 text-lg font-semibold text-stone-900">
            Perjalanan Terencana
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Persiapkan perjalanan dengan lebih baik melalui informasi
            yang relevan sebelum berangkat.
          </p>
        </article>
      </section>

      {/* Katalog dari Supabase */}
      <section id="destinations" className="scroll-mt-8">
        <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
            Explore West Java
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
            Destinasi Pilihan
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-stone-600">
            Jelajahi destinasi yang informasinya telah diverifikasi
            sebelum merencanakan perjalanan.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
              <output className="text-sm text-stone-500">
                Memuat destinasi pendakian...
              </output>
            </div>
          }
        >
          <PublishedDestinations />
        </Suspense>
      </section>

      {/* Tentang Ngelana */}
      <section id="tentang" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl bg-emerald-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
            Tentang Ngelana
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight">
            Petualangan yang lebih terencana dimulai dari informasi yang tepat.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-emerald-100">
            Ngelana dikembangkan sebagai platform untuk membantu pendaki
            mengenal destinasi dan mempersiapkan perjalanan. Fitur seperti
            reservasi, verifikasi tiket, dan pembaruan kondisi jalur akan
            dikembangkan secara bertahap.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Ngelana</p>
          <p>Explore responsibly. Leave no trace.</p>
        </div>
      </footer>
    </main>
  );
}
