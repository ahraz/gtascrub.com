import Link from "next/link";
import type { Metadata } from "next";
import { serviceDetails } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Our Services — GTA Scrub Commercial Cleaning",
  description: "Full commercial cleaning services across the GTA. Office, medical, post-construction, warehouse, window cleaning.",
    alternates: { canonical: "https://gtascrub.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/commercial-cleaning-services-gta-scrub-toronto.png)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/95 via-gray-50/80 to-gray-50/60" />
        <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">What We Clean</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Our Services</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Professional commercial cleaning for every type of business across the GTA.</p></div>
      </div></section>

      <section className="py-24 bg-white"><div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceDetails.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="group relative flex flex-col rounded-3xl overflow-hidden bg-gray-50 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <h3 className="absolute bottom-4 left-5 text-xl font-black text-white tracking-tight">{svc.name}</h3>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{svc.introParas[0].slice(0, 100)}...</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-ink group-hover:gap-2 transition-all">
                  Explore {svc.shortName} Cleaning →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div></section>

      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6"><h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Ready to Get Started?</h2><p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Get your free quote within 2 hours. Most replies within 30 minutes.</p><Link href="/contact" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Get Your Free Quote</Link></div></section>
    </>
  );
}
