
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/features/auth/logout-button";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-12">
      <section className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-7 sm:p-10">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← Kembali ke beranda
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Ngelana Account
        </p>

        <h1 className="mt-3 text-3xl font-bold text-stone-900">
          Profil Saya
        </h1>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-sm text-stone-500">Nama lengkap</p>
            <p className="mt-1 font-medium text-stone-900">
              {profile?.full_name || "Nama belum diatur"}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Email</p>
            <p className="mt-1 break-all font-medium text-stone-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Peran akun</p>
            <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900">
              {profile?.role === "admin"
                ? "Admin"
                : profile?.role === "operator"
                  ? "Operator"
                  : "Pendaki"}
            </span>
          </div>
        </div>

        <div className="mt-9 border-t border-stone-200 pt-6">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
