import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rich Young Nation",
  description: "Build wealth. Track progress. Grow together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#050505] text-white font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
