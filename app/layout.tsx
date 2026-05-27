import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/organisms/Nav";
import Footer from "@/components/organisms/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lowell Crafts",
  description: "Handmade crochet goods crafted with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} h-full antialiased`} data-theme="light">
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-page text-body transition-colors duration-200">
        <ThemeProvider>
          <Nav />
          <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
