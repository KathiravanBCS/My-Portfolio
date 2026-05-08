import "./globals.css";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Header, Footer, RouteGuard, Providers } from "@/components";
import OnekoCat from "@/components/common/OnekoCat";
import { CustomCursor } from "@/components/common/CustomCursor";
import KathiravanBot from "@/components/layout/KathiravanBot";
import BackToTop from "@/components/BackToTop";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { baseURL, home } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  keywords: [
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "NestJS",
    "web development",
    "AI integration",
    "software engineer",
    "portfolio",
    "Chennai",
    "Tamil Nadu",
  ],
  authors: [{ name: "Kathiravan V", url: baseURL }],
  creator: "Kathiravan V",
  publisher: "Kathiravan V",
  metadataBase: new URL(baseURL),
  alternates: {
    canonical: baseURL,
  },
  openGraph: {
    title: home.title,
    description: home.description,
    url: baseURL,
    images: [{
      url: `${baseURL}${home.image}`,
      width: 1200,
      height: 630,
      alt: "Kathiravan V - Full-Stack Developer",
    }],
    type: "website",
    locale: "en_IN",
    siteName: "Kathiravan V - Full-Stack Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: [`${baseURL}${home.image}`],
    creator: "@Kathiravan27117",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLdSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <Providers>
          <CustomCursor />
          <OnekoCat />
          <Header />
          <main className="flex-1 w-full max-w-content mx-auto px-4 sm:px-6">
            <RouteGuard>{children}</RouteGuard>
          </main>
          <Footer />
          <KathiravanBot />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
