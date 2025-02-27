import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DogsProvider } from "@/context/dogs-context";
import { fetchDogs } from "./actions";
import { Dog } from "@/interfaces/dogs";
import { mapAPIDogsToDogs } from "@/interfaces/mappings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doggy Daycare",
  description: "Dog presence system",
  authors: {
    url: new URL('https://www.linkedin.com/in/christian-ronnholm'),
    name: 'Christian Rönnholm'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialDogs: Dog[] = mapAPIDogsToDogs(await fetchDogs());
  
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <DogsProvider initialDogs={Array.isArray(initialDogs) ? initialDogs : []}>
          {children}
        </DogsProvider>
      </body>
    </html>
  );
}
