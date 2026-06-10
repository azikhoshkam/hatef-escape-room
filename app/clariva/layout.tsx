import type { Metadata } from "next";
import {
  Anton,
  Archivo_Black,
  DM_Sans,
  Fraunces,
  Space_Mono,
} from "next/font/google";
import "./clariva.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  weight: ["400", "500", "600"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clariva — Your business, finally clear.",
  description:
    "We handle the tech. You stay you. Clariva helps small businesses get found, sound like themselves online, and stay visible — without the jargon.",
};

export default function ClarivaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      lang="en"
      dir="ltr"
      className={`clariva-page ${anton.variable} ${archivoBlack.variable} ${dmSans.variable} ${fraunces.variable} ${spaceMono.variable}`}
    >
      {children}
    </div>
  );
}
