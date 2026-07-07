import Link from "next/link";
import type { Metadata } from "next";
import { serviceAreas } from "@/lib/data/serviceAreas";

export const metadata: Metadata = {
  title: "Service Areas — GTA Scrub Commercial Cleaning",
  description: "GTA Scrub provides commercial cleaning services across all 14 GTA cities. Brampton, Mississauga, Toronto, and more.",
    alternates: { canonical: "https://gtascrub.com/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Coverage</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Service Areas</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">We provide commercial cleaning services across all major GTA cities.</p></div></div></section>
      <section className="py-16 bg-white"><div className="container mx-auto px-6"><div className="flex flex-wrap gap-3 justify-center">
        {serviceAreas.map((area) => (
          <Link key={area.slug} href={`/service-areas/${area.slug}`} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-brand-ink hover:border-brand hover:bg-brand-pale transition-all">{area.name}</Link>
        ))}
      </div></div></section>
    </>
  );
}
