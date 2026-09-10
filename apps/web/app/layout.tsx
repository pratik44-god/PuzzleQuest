import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { GlobalProviders } from "~/providers/global";
import Background from "~/components/layout/background";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PuzzleQuest",
  description: "Create and Play Interactive Treasure Hunts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#09090B] text-white antialiased`}
      >
        <GlobalProviders>
          <Background />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}