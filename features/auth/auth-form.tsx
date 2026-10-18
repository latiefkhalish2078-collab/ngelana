
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: Readonly<AuthFormProps>) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const supabase = createClient();

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        if (data.session) {
          router.replace("/profile");
          router.refresh();
          return;
        }

        setMessage(
          "Pendaftaran berhasil dikirim. Periksa email untuk mengonfirmasi akun sebelum login."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        router.replace("/profile");
        router.refresh();
        return;
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-700"
        >
          ← Kembali ke Ngelana
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Ngelana Account
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          {isRegister ? "Buat akun" : "Selamat datang kembali"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-600">
          {isRegister
            ? "Daftar untuk mempersiapkan perjalanan pendakianmu."
            : "Login untuk melanjutkan perjalananmu bersama Ngelana."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {isRegister && (
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Nama lengkap
              </label>
              <input
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                maxLength={100}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Kata sandi
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              placeholder="Minimal 8 karakter"
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {message && (
            <output className="block rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-900">
              {message}
            </output>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Memproses..."
              : isRegister
                ? "Daftar sekarang"
                : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <Link
            href={isRegister ? "/login" : "/register"}
            className="font-semibold text-emerald-800 hover:underline"
          >
            {isRegister ? "Login" : "Daftar"}
          </Link>
        </p>
      </section>
    </main>
  );
}
