import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lowell Crafts",
  description: "Handmade goods crafted with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-800">
        <Nav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
