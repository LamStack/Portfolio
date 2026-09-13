import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://lameesadel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lamees Adel, Computer Engineer & AI Builder",
  description:
    "Portfolio of Lamees Adel: Computer Engineering student, Azure AI Engineer Associate, and builder of AI products like Auctor, Wafid, and BlinkTalk. Explore it as an interactive desktop, complete with a working terminal and a mini arcade.",
  keywords: [
    "Lamees Adel",
    "Computer Engineer",
    "AI Engineer",
    "Bahrain",
    "Portfolio",
    "Auctor",
    "University of Bahrain",
  ],
  openGraph: {
    title: "Lamees Adel, Computer Engineer & AI Builder",
    description: "Projects, experience, certifications, and a mini arcade, as an interactive desktop.",
    url: SITE_URL,
    siteName: "Lamees Adel",
    images: ["/images/profile.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamees Adel, Computer Engineer & AI Builder",
    description: "Projects, experience, certifications, and a mini arcade, as an interactive desktop.",
    images: ["/images/profile.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-bg text-text">{children}</body>
    </html>
  );
}
