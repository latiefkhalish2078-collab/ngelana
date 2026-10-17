
import type { Destination } from "@/types/destination";

export const destinations: Destination[] = [
  {
    id: "demo-001",
    slug: "bukit-tunggul",
    name: "Bukit Tunggul",
    region: "Jawa Barat",
    category: "Bukit",
    difficulty: "Belum diverifikasi",
    description:
      "Kandidat destinasi awal Ngelana. Informasi jalur dan akses masih perlu diverifikasi.",
    dataStatus: "demo",
  },
  {
    id: "demo-002",
    slug: "gunung-papandayan",
    name: "Gunung Papandayan",
    region: "Jawa Barat",
    category: "Gunung",
    difficulty: "Belum diverifikasi",
    description:
      "Contoh destinasi untuk pengembangan katalog pendakian.",
    dataStatus: "demo",
  },
  {
    id: "demo-003",
    slug: "gunung-gede-pangrango",
    name: "Gunung Gede Pangrango",
    region: "Jawa Barat",
    category: "Gunung",
    difficulty: "Belum diverifikasi",
    description:
      "Contoh destinasi untuk menguji pencarian dan filter.",
    dataStatus: "demo",
  },
];
