import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CraftChirp Creations",
    default: "CraftChirp Creations | Premium Handcrafted Mud Art & Eco-Luxury Décor",
  },
  description: "Discover authentic, handmade mud, clay, and cow dung art. Chemical-free, odorless, and beautifully textured home decor blending Indian tradition with modern aesthetics.",
  keywords: ["eco-friendly wall art", "natural handmade paintings", "mud art India", "cow dung art décor", "sustainable home decoration", "premium mud paintings"],
  openGraph: {
    title: "CraftChirp Creations",
    description: "Eco-Luxury Handcrafted Mud Art for the Modern Home",
    url: "https://craftchirp-creations.com",
    siteName: "CraftChirp Creations",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-offwhite text-foreground selection:bg-brand-clay selection:text-white">
        <SmoothScroll>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
