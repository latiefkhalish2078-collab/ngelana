
export type DestinationCategory = "Gunung" | "Bukit";

export type Destination = {
  id: string;
  slug: string;
  name: string;
  region: string;
  category: DestinationCategory;
  difficulty: "Mudah" | "Menengah" | "Sulit" | "Belum diverifikasi";
  description: string;
  imageUrl?: string;
  dataStatus: "demo" | "verified";
};
