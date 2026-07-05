import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GTA Scrub — #1 Brampton Commercial Cleaning Services | Photo-Verified',
  description: 'Brampton\'s top-rated commercial cleaning service. Photo-verified CleanCheck reports, insured & bonded. Free quotes within 2 hours. Serving offices, clinics, warehouses across the GTA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
