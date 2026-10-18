
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogout() {
    setLoading(true);
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage("Logout gagal. Silakan coba kembali.");
      setLoading(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
      >
        {loading ? "Keluar..." : "Logout"}
      </button>

      {errorMessage && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
