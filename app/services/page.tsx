import Link from "next/link";
import type { Metadata } from "next";
import { serviceDetails } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Our Services — GTA Scrub Commercial Cleaning",
  description: "Full commercial cleaning services across the GTA. Office, medical, post-construction, warehouse, window cleaning.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6">
        <div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">What We Clean</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Our Services</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Professional commercial cleaning for every type of business across the GTA.</p></div>
      </div></section>

      <section className="py-24 bg-white"><div className="container mx-auto px-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceDetails.map((svc) => (
          <div key={svc.slug} className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-xl font-bold text-brand-ink mb-3">{svc.name}</h3><p className="text-gray-700 mb-6 flex-1">{svc.introParas[0].slice(0, 80)}...</p><Link href={`/services/${svc.slug}`} className="inline-flex items-center gap-1 font-semibold text-brand-ink">Learn More →</Link></div>
        ))}
      </div></div></section>

      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6"><h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Ready to Get Started?</h2><p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Get your free quote within 2 hours. Most replies within 30 minutes.</p><Link href="/contact" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Get Your Free Quote</Link></div></section>
    </>
  );
}
