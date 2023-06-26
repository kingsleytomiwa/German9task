"use client";

import "./globals.css";
import { Outfit } from "next/font/google";
import { AuthContextProvider } from "@/firebase/context/AuthContext";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-white`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
