import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'GTA Scrub — #1 Brampton Commercial Cleaning Services | Photo-Verified',
  description: 'Brampton\'s top-rated commercial cleaning service. Photo-verified CleanCheck reports, insured & bonded. Free quotes within 2 hours. Serving offices, clinics, warehouses across the GTA.',
  icons: { icon: '/images/gtascrub.png', apple: '/images/gtascrub.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
