import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const baseUrl = 'https://gtascrub.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'GTA Scrub — #1 Brampton Commercial Cleaning Services | Photo-Verified',
    template: '%s | GTA Scrub',
  },
  description: 'Brampton\'s top-rated commercial cleaning service. Photo-verified CleanCheck reports, insured & bonded. Free quotes within 2 hours. Serving offices, clinics, warehouses across the GTA.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: { icon: '/images/gtascrub.png', apple: '/images/gtascrub.png' },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: baseUrl,
    siteName: 'GTA Scrub',
    title: 'GTA Scrub — #1 Brampton Commercial Cleaning Services | Photo-Verified',
    description: 'Brampton\'s top-rated commercial cleaning service. Photo-verified CleanCheck reports, insured & bonded. Free quotes within 2 hours.',
    images: [{ url: '/images/gtascrub.png', width: 512, height: 512, alt: 'GTA Scrub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTA Scrub — #1 Brampton Commercial Cleaning Services',
    description: 'Brampton\'s top-rated commercial cleaning service. Photo-verified CleanCheck reports, insured & bonded.',
    images: ['/images/gtascrub.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics gaId="G-BGTZW5RE50" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* LocalBusiness Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CleaningService",
              "name": "GTA Scrub",
              "image": "https://gtascrub.com/images/hero-janitor.png",
              "description": "Premium commercial cleaning, janitorial, and post-construction cleaning services for businesses, clinics, and offices across Brampton and the GTA.",
              "url": "https://gtascrub.com",
              "telephone": "+1-289-277-0213",
              "areaServed": [
                { "@type": "City", "name": "Brampton" },
                { "@type": "City", "name": "Mississauga" },
                { "@type": "City", "name": "Toronto" },
                { "@type": "City", "name": "Vaughan" }
              ],
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Brampton",
                "addressRegion": "ON",
                "addressCountry": "CA"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
