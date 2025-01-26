import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import React from "react";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Better Auth",
  description: "A better way to handle authentication in Next.js with Better Auth.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
      <main className={"container mx-auto min-h-screen flex flex-col"}>
        <Header />
        <section className={"flex-1"}>{children}</section>
        <Toaster closeButton richColors />
      </main>
      </body>
    </html>
  );
}
