
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Ngelana — Eksplorasi Pendakian",
  description:
    "Platform eksplorasi dan perencanaan pendakian Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
