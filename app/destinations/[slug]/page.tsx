
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { destinations } from "@/features/destinations/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function DestinationDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<DestinationDetailPageSkeleton />}>
      <DestinationDetailPageContent params={params} />
    </Suspense>
  );
}

async function DestinationDetailPageContent({ params }: Props) {
  const { slug } = await params;

  const destination = destinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/#destinations"
            className="text-sm text-emerald-200 hover:text-white"
          >
            ← Kembali ke eksplorasi
          </Link>

          <div className="mt-8">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
              {destination.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {destination.name}
            </h1>

            <p className="mt-3 text-emerald-100">
              {destination.region}
            </p>

            <p className="mt-6 max-w-2xl leading-7 text-emerald-50">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-10 sm:px-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-950">
            Status informasi destinasi
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900">
            {destination.dataStatus === "verified"
              ? "Informasi ditandai telah diverifikasi. Periksa sumber dan tanggal pembaruan sebelum digunakan untuk keputusan pendakian."
              : "Ini merupakan data simulasi untuk pengembangan aplikasi. Informasi jalur, akses, tingkat kesulitan, peraturan, dan status operasional belum diverifikasi."}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <article className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-semibold">
              Informasi dasar
            </h2>

            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-stone-500">Wilayah</dt>
                <dd className="mt-1 font-medium">
                  {destination.region}
                </dd>
              </div>

              <div>
                <dt className="text-stone-500">Kategori</dt>
                <dd className="mt-1 font-medium">
                  {destination.category}
                </dd>
              </div>

              <div>
                <dt className="text-stone-500">
                  Tingkat kesulitan
                </dt>
                <dd className="mt-1 font-medium">
                  {destination.difficulty}
                </dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-semibold">
              Informasi jalur
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Informasi mengenai jarak, estimasi waktu,
              titik awal pendakian, kuota, peraturan, dan
              kondisi jalur akan ditambahkan setelah data
              dari sumber yang berwenang tersedia.
            </p>

            <span className="mt-4 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
              Belum tersedia
            </span>
          </article>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold">
            Sebelum merencanakan pendakian
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-stone-600">
            <li>Pastikan jalur dan destinasi dapat dikunjungi.</li>
            <li>Periksa aturan resmi dan persyaratan registrasi.</li>
            <li>Periksa cuaca serta pengumuman dari pengelola.</li>
            <li>Jangan mengandalkan informasi simulasi untuk keselamatan.</li>
          </ul>
        </div>

        <Link
          href="/#destinations"
          className="inline-flex rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Jelajahi destinasi lainnya
        </Link>
      </section>
    </main>
  );
}

function DestinationDetailPageSkeleton() {
  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
          <div className="mt-8 h-8 w-48 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-6 h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-4 w-4/5 max-w-xl animate-pulse rounded bg-white/10" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-10 sm:px-8">
        <div className="h-24 animate-pulse rounded-2xl border border-stone-200 bg-stone-200" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-56 animate-pulse rounded-2xl border border-stone-200 bg-stone-200" />
          <div className="h-56 animate-pulse rounded-2xl border border-stone-200 bg-stone-200" />
        </div>
        <div className="h-36 animate-pulse rounded-2xl border border-stone-200 bg-stone-200" />
      </section>
    </main>
  );
}
