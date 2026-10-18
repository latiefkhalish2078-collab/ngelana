
import { createClient } from "@/lib/supabase/server";
import type { Destination } from "@/types/destinations";
import { unstable_cache } from "next/cache";

export async function getPublishedDestinations(): Promise<{
  destinations: Destination[];
  error: string | null;
}> {
  const supabase = await createClient();

  const getCachedDestinations = unstable_cache(
    async () =>
      await supabase
        .from("destinations")
        .select(
          "id, slug, name, province, regency, category, description, image_url"
        )
        .eq("is_published", true)
        .eq("verification_status", "verified")
        .order("name", { ascending: true }),
    ["published-destinations"],
    { revalidate: 300 }
  );

  const { data, error } = await getCachedDestinations();

  if (error) {
    console.error("Gagal mengambil destinasi:", error.message);

    return {
      destinations: [],
      error: "Data destinasi gagal dimuat. Silakan coba lagi nanti.",
    };
  }

  const destinations: Destination[] = (data ?? []).map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    region: item.regency
      ? `${item.regency}, ${item.province}`
      : item.province,
    category: item.category === "mountain" ? "Gunung" : "Bukit",
    difficulty: "Belum diverifikasi",
    description:
      item.description ?? "Informasi destinasi belum tersedia.",
    imageUrl: item.image_url ?? undefined,
    dataStatus: "verified",
  }));

  return { destinations, error: null };
}
