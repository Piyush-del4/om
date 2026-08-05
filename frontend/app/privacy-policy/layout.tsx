import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Privacy Policy',
 description:
 'Read about how OM Astrology AMC collects, uses, and protects your personal data. We enforce strict encryption policies and support GDPR-compliant data rights.',
 openGraph: {
 title: 'Privacy Policy — OM Astrology AMC',
 description:
 'Our privacy policy covering data collection, usage, third-party integrations, and security measures.',
 url: '/privacy-policy',
 },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
 return children;
}
