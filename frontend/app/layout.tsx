import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "../components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'OM Astrology AMC — Astrology, Numerology, Tarot & Graphology',
    template: '%s | OM Astrology AMC',
  },
  description:
    'Expert occult science consultations: Vedic Astrology, Numerology name correction, Tarot card readings, and Graphotherapy. Book a 1-on-1 session with master consultants.',
  keywords: ['astrology', 'numerology', 'tarot', 'graphology', 'vedic astrology', 'occult science', 'horoscope', 'graphotherapy'],
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png', sizes: '48x48' }
    ],
    apple: [
      { url: '/icon.png', sizes: '48x48', type: 'image/png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'OM Astrology AMC',
  },
};

export default function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="h-full bg-white text-black dark:bg-black dark:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
