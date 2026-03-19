// app/layout.tsx — Root layout with Google Fonts + global metadata
import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// Display font — elegant serif for headings
const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body font — clean grotesque
const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Mono font
const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devendra Panta — AI/ML Enthusiast & Software Engineer",
  description:
    "Portfolio of Devendra Panta — full-stack engineer specialising in React, Node.js, and cloud-native systems. Open to new opportunities.",
  keywords: ["ai", "ml", "full-stack", "developer", "React", "Node.js", "Next.js"],
  authors: [{ name: "Devendra Panta" }],
  openGraph: {
    title: "Devendra Panta — AI/ML Enthusiast & Software Engineer",
    description: "Building fast, elegant, and scalable web applications.",
    type: "website",
    locale: "np_NP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devendra Panta — AI/ML Enthusiast & Software Engineer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-slate-950 text-paper font-body antialiased">
        {children}
      </body>
    </html>
  );
}
