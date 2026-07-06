import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceAreas, getServiceAreaBySlug } from "@/lib/data/serviceAreas";

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

type Props = { params: { city: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getServiceAreaBySlug(params.city);
  if (!area) return {};
  return {
    title: area.title,
    description: area.description,
  };
}

const services = [
  { name: "Office Cleaning", desc: "Daily, weekly, or bi-weekly office cleaning with CleanCheck photo-verified reports. Dedicated teams who know your space.", href: "/office-cleaning-gta" },
  { name: "Medical Cleaning", desc: "Infection control and PHO-compliant cleaning for medical and dental offices. Biohazard disposal included.", href: "/medical-office-cleaning-gta" },
  { name: "Post-Construction", desc: "Heavy construction dust and debris removal for new builds and renovations. Full site prep for occupancy.", href: "/post-construction-cleaning-gta" },
  { name: "Warehouse Cleaning", desc: "Large-space cleaning for warehouses and industrial facilities. Ride-on scrubbers, dust control, and waste removal.", href: "/warehouse-cleaning-gta" },
  { name: "Window Cleaning", desc: "Interior and exterior commercial window cleaning. Streak-free results with pure-water systems.", href: "/window-cleaning-gta" },
  { name: "Floor Care & Stripping", desc: "Professional floor stripping, waxing, and buffing for all hard floor surfaces.", href: "/floor-care-stripping-gta" },
  { name: "Carpet Cleaning", desc: "Deep carpet extraction and steam cleaning for commercial spaces.", href: "/carpet-cleaning-gta" },
  { name: "Janitorial Services", desc: "Comprehensive janitorial services for offices, retail, and commercial properties.", href: "/janitorial-services-gta" },
];

export default function CityServiceAreaPage({ params }: Props) {
  const area = getServiceAreaBySlug(params.city);
  if (!area) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-28 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Serving {area.name}</span>
          <h1 className="text-4xl lg:text-6xl font-black text-brand-ink tracking-tight mb-6 max-w-3xl mx-auto leading-[1.1]">
            Commercial Cleaning in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-green-600">{area.name}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">{area.heroSub}</p>
          <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-brand hover:bg-brand-active rounded-2xl shadow-lg shadow-brand/30 transition-all hover:-translate-y-1">
            Free Quote in {area.name} →
          </Link>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-20 bg-white"><div className="container mx-auto px-6 max-w-4xl">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <h2 className="text-3xl font-black text-brand-ink mb-6">Reliable Commercial Cleaning in <span className="text-[#70cf36]">{area.name}</span></h2>
            <p className="text-gray-600 leading-relaxed mb-6">{area.introCopy}</p>
            <p className="text-gray-600 leading-relaxed">We serve all major business districts including <strong>{area.landmarks}</strong>. Every clean comes with a photo-verified CleanCheck report so you see the proof before you pay.</p>
          </div>
          <div className="md:col-span-2 bg-gray-50 rounded-3xl p-8 shadow-sm">
            <h3 className="font-bold text-brand-ink mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div><div className="text-2xl font-black text-brand-ink">5,000+</div><div className="text-sm text-gray-500">Spaces Cleaned</div></div>
              <div><div className="text-2xl font-black text-brand-ink">14</div><div className="text-sm text-gray-500">GTA Cities Covered</div></div>
              <div><div className="text-2xl font-black text-brand-ink">4.9/5</div><div className="text-sm text-gray-500">Average Rating</div></div>
              <Link href="/contact" className="mt-4 inline-block w-full text-center py-3 bg-brand text-brand-ink font-bold rounded-xl hover:bg-brand-active transition-colors">Get Your {area.name} Quote →</Link>
            </div>
          </div>
        </div>
      </div></section>

      {/* ── Services ── */}
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Services</span>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Our Services in {area.name}</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Full range of commercial cleaning services available in {area.name}.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <Link key={svc.name} href={svc.href} className="bg-white rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1 group">
              <h3 className="text-lg font-bold text-brand-ink mb-3 group-hover:text-[#70cf36] transition-colors">{svc.name}</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">{svc.desc}</p>
              <span className="inline-flex items-center gap-1 font-semibold text-brand-ink">Learn More →</span>
            </Link>
          ))}
        </div>
      </div></section>

      {/* ── Other Areas ── */}
      <section className="py-20 bg-white"><div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-brand-ink">Other Cities We Serve</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
          {serviceAreas.filter((a) => a.slug !== area.slug).map((a) => (
            <Link key={a.slug} href={`/service-areas/${a.slug}`} className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-brand-ink hover:border-brand hover:bg-brand-pale transition-all">
              {a.name}
            </Link>
          ))}
        </div>
      </div></section>

      {/* ── CTA ── */}
      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Get Your Free {area.name} Quote</h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Most replies within 30 minutes. Call us or book online.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Book Online</Link>
          <a href={`tel:${area.phone}`} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold inline-block hover:bg-white/20 transition-colors">Call {area.phone}</a>
        </div>
      </div></section>
    </>
  );
}
