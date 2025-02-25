import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DogsProvider } from "@/context/dogs-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doggy Daycare",
  description: "Created by Christian Rönnholm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <DogsProvider>
          {children}
        </DogsProvider>
      </body>
    </html>
  );
}
