import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Header, Footer, RouteGuard, Providers, CustomCursor } from "@/components";
import { baseURL, home } from "@/resources";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <Providers>
          <CustomCursor />
          <Header />
          <main className="flex-1 w-full max-w-content mx-auto px-4 sm:px-6">
            <RouteGuard>{children}</RouteGuard>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
