
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function DatabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("id, name, province")
    .limit(5);

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">
          Koneksi database gagal
        </h1>
        <p className="mt-3 text-sm text-red-700">
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">
        Koneksi database berhasil
      </h1>
      <p className="mt-2 text-stone-600">
        Data yang dapat dibaca: {data.length}
      </p>
      <pre className="mt-4 overflow-auto rounded-xl bg-stone-100 p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
