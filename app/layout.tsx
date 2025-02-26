import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DogsProvider } from "@/context/dogs-context";
import { fetchDogs } from "./actions";
import { APIDog, Dog } from "@/interfaces/dogs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doggy Daycare",
  description: "Created by Christian Rönnholm",
};

//TODO: Move to Util
export function mapAPIDogsToDogs(apiDogs: APIDog[]): Dog[] {
  return apiDogs.map(mapAPIDogToDog);
}

//TODO: Move to Util
export function mapAPIDogToDog(apiDog: APIDog): Dog {
  return {
    id: apiDog.chipNumber, // Using chipNumber as a unique identifier
    name: apiDog.name,
    breed: apiDog.breed, // Since APIDog doesn't have breed info, set a default value
    owner: `${apiDog.owner.name} ${apiDog.owner.lastName}`,
    age: apiDog.age,
    present: apiDog.present,
  };
}

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
