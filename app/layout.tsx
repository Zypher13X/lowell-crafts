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
  title: {
    default: "Lowell Crafts",
    template: "%s — Lowell Crafts",
  },
  description: "Handmade crochet goods crafted with care — wearables, home goods, amigurumi, and more.",
  metadataBase: new URL("https://zypher13x.github.io/lowell-crafts"),
  openGraph: {
    siteName: "Lowell Crafts",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} h-full antialiased`} data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-page text-body transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Nav />
          <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
