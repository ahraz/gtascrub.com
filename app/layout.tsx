import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GTA Scrub — Commercial Cleaning, Photo-Verified',
  description: 'Commercial cleaning across the GTA with photo-verified CleanCheck reports. Free quotes, insured and bonded.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
