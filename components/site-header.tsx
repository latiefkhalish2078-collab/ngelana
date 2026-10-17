
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-emerald-950"
        >
          ngelana<span className="text-emerald-600">.</span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="flex items-center gap-5 text-sm font-medium text-stone-600 sm:gap-8"
        >
          <Link href="/" className="hover:text-emerald-800">
            Beranda
          </Link>

          <Link
            href="/#destinations"
            className="hover:text-emerald-800"
          >
            Destinasi
          </Link>

          <Link
            href="/login"
            className="rounded-xl bg-emerald-900 px-4 py-2.5 text-white transition hover:bg-emerald-800"
          >
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  );
}
