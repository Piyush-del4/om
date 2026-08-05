import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "../components/providers/ClientProviders";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "../components/seo/JsonLd";

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
 metadataBase: new URL('https://omastrologyamc.com'),
 title: {
 default: 'OM Astrology AMC — Best Astrologer, Numerologist & Tarot Reader Online',
 template: '%s | OM Astrology AMC',
 },
 description:
 'India\'s trusted astrology consultancy — expert Vedic Astrology readings, Numerology name correction, Tarot card guidance, Graphology & handwriting analysis. Book a 1-on-1 session with 25+ years experienced master consultants. Online video consultations available 7 days a week.',
 keywords: [
 'best astrologer', 'online astrology consultation', 'vedic astrology', 'numerology consultation',
 'best numerologist', 'tarot reading online', 'best tarot reader', 'graphology analysis',
 'handwriting analysis', 'name correction numerology', 'lucky mobile number', 'marriage matching',
 'kundli matching', 'career guidance astrology', 'birth chart analysis', 'horoscope reading',
 'rudraksha consultation', 'corporate numerology', 'brand numerology', 'spiritual consultation',
 'graphotherapy', 'occult science', 'vastu consultation',
 ],
 icons: {
 icon: '/icon.png',
 shortcut: '/favicon.ico',
 apple: '/apple-icon.png',
 },
 openGraph: {
 type: 'website',
 locale: 'en_IN',
 url: 'https://omastrologyamc.com',
 siteName: 'OM Astrology AMC',
 title: 'OM Astrology AMC — Best Astrologer, Numerologist & Tarot Reader Online',
 description:
 'India\'s trusted astrology consultancy — expert Vedic Astrology, Numerology, Tarot & Graphology consultations with 25+ years experienced master consultants.',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'OM Astrology AMC — Best Astrologer, Numerologist & Tarot Reader',
 description:
 'Book 1-on-1 sessions in Astrology, Numerology, Tarot & Graphology with master consultants.',
 },
 alternates: {
 canonical: 'https://omastrologyamc.com',
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 verification: {
 // Add your Google Search Console verification code here after deploying
 // google: 'your-verification-code',
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
 <head>
 <OrganizationSchema />
 <LocalBusinessSchema />
 <WebSiteSchema />
 </head>
 <body className="h-full bg-white text-gray-900">
 <ClientProviders>{children}</ClientProviders>
 </body>
 </html>
 );
}
