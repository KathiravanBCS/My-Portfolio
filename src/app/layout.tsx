import "./globals.css";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Header, Footer, RouteGuard, Providers } from "@/components";
import OnekoCat from "@/components/common/OnekoCat";
import { CustomCursor } from "@/components/common/CustomCursor";
import KathiravanBot from "@/components/layout/KathiravanBot";
import BackToTop from "@/components/BackToTop";
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
  metadataBase: new URL(baseURL),
  openGraph: {
    title: home.title,
    description: home.description,
    url: baseURL,
    images: [{ url: home.image }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
