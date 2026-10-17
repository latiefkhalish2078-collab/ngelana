
import ExploreSection from "@/features/destinations/explore-section";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Your next journey starts here
            </p>

            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Pendakian lebih terencana, perjalanan lebih bermakna.
            </h1>

            <p className="mt-6 max-w-xl leading-7 text-emerald-100">
              Ngelana membantu pendaki menemukan destinasi dan
              mempersiapkan perjalanan. Ke depannya, registrasi,
              tiket digital, dan verifikasi pendakian akan
              terintegrasi dalam satu platform.
            </p>

            <a
              href="#destinations"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-50"
            >
              Jelajahi destinasi
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <div className="flex min-h-64 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-800 via-emerald-700 to-stone-700 p-8 sm:min-h-80">
            <div className="max-w-sm text-center">
              <div className="text-6xl" aria-hidden="true">
                ⛰
              </div>
              <p className="mt-5 text-xl font-semibold">
                Mulai perjalananmu
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-100">
                Temukan destinasi, siapkan rencana, dan ikuti
                informasi resmi sebelum berangkat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ExploreSection />

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Ngelana</p>
          <p>Prototype pengembangan — data destinasi belum diverifikasi.</p>
        </div>
      </footer>
    </main>
  );
}
