import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceDetails, getServiceDetailBySlug } from "@/lib/data/services";
import { serviceAreas } from "@/lib/data/serviceAreas";
import PricingCalculator from "@/components/PricingCalculator";
import CleaningChecklist from "@/components/CleaningChecklist";
import FAQAccordion from "@/components/FAQAccordion";

export async function generateStaticParams() {
  return serviceDetails.map((svc) => ({ slug: svc.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = getServiceDetailBySlug(params.slug);
  if (!svc) return {};
  return {
    title: svc.title,
    description: svc.description,
    alternates: { canonical: `https://gtascrub.com/services/${svc.slug}` },
  };
}

const otherServices = serviceDetails;

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = getServiceDetailBySlug(params.slug);
  if (!svc) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-28 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <img src={svc.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/70" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">{svc.shortName} Cleaning</span>
          <h1 className="text-4xl lg:text-6xl font-black text-brand-ink tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">{svc.heroH1}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">{svc.heroSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-brand hover:bg-brand-active rounded-2xl shadow-lg shadow-brand/30 transition-all hover:-translate-y-1">Get a Free Quote →</Link>
            <a href="tel:+12892770213" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-white border-2 border-gray-200 hover:border-brand-ink rounded-2xl transition-all">Call +1 (289) 277-0213</a>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-20 bg-white"><div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-black text-brand-ink mb-6">Professional <span className="text-[#70cf36]">{svc.name}</span> in the GTA</h2>
            {svc.introParas.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
            ))}
            {/* ── Internal Link: Post-Construction → Floor Care ── */}
            {svc.slug === "post-construction-cleaning-gta" && (
              <p className="text-gray-600 leading-relaxed mb-4">
                For ongoing floor maintenance after construction, explore our{" "}
                <Link href="/services/floor-care-stripping-gta" className="text-[#70cf36] font-semibold underline underline-offset-2 hover:text-brand-ink transition-colors">
                  deep commercial floor scrubbing
                </Link>{" "}
                services to keep your floors in pristine condition.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {svc.whyChoose.slice(0, 4).map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-sm font-medium text-brand-ink bg-brand-pale px-3 py-1.5 rounded-full border border-brand/20">
                  <svg className="w-4 h-4 text-[#70cf36] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src={svc.image} alt={svc.name} className="w-full h-72 object-cover" />
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-brand-ink mb-4 text-center">CleanCheck Score</h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-brand-ink">90</div>
                <div className="text-sm text-gray-500">/ 100 Quality Score</div>
              </div>
              <div className="space-y-3">
                <div><div className="text-2xl font-black text-brand-ink">5,000+</div><div className="text-sm text-gray-500">Spaces Cleaned</div></div>
                <div><div className="text-2xl font-black text-brand-ink">14</div><div className="text-sm text-gray-500">GTA Cities Covered</div></div>
                <div><div className="text-2xl font-black text-brand-ink">4.9/5</div><div className="text-sm text-gray-500">Average Rating</div></div>
              </div>
              <Link href="/contact" className="mt-6 inline-block w-full text-center py-3 bg-brand text-brand-ink font-bold rounded-xl hover:bg-brand-active transition-colors">Get Your Quote →</Link>
            </div>
          </div>
        </div>
      </div></section>

      {/* ── Features: Standard + Deep ── */}
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">What&apos;s Included</span>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Everything You Need</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Standard and deep cleaning options tailored to your {svc.shortName.toLowerCase()} space.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-brand-ink mb-4 flex items-center gap-2"><svg className="w-5 h-5 text-[#70cf36]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Standard Cleaning</h3>
            <ul className="space-y-3">
              {svc.dailyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700"><span className="text-[#70cf36] font-bold mt-0.5">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-brand-ink mb-4 flex items-center gap-2"><svg className="w-5 h-5 text-brand-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg> Deep Cleaning Add-Ons</h3>
            <ul className="space-y-3">
              {svc.deepFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700"><span className="text-brand-ink font-bold mt-0.5">✦</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div></section>

      {/* ── Gallery ── */}
      <section className="py-24 bg-white"><div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Our Work</span>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">{svc.name} in Action</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">See the quality and attention to detail we bring to every {svc.shortName.toLowerCase()} space.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {svc.galleryImages.map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3]">
              <img src={img} alt={`${svc.name} - photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div></section>

      {/* ── Process ── */}
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Our Process</span>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">How It Works</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">A proven process from first call to sparkling clean.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {svc.processSteps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-brand-pale rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-brand/20">
                <span className="text-2xl font-black text-brand-ink">{i + 1}</span>
              </div>
              <h3 className="font-bold text-brand-ink mb-2 text-sm">{step.label}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* ── Pricing Calculator ── */}
      <PricingCalculator />

      {/* ── Cleaning Checklist ── */}
      <CleaningChecklist />

      {/* ── FAQ ── */}
      <section className="py-24 bg-white"><div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">FAQ</span>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">{svc.shortName} Cleaning FAQ</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {svc.faqs.map((faq, i) => (
            <details key={i} className="bg-gray-50 rounded-2xl overflow-hidden group">
              <summary className="p-6 font-bold text-brand-ink cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-[#70cf36] group-open:rotate-180 transition-transform text-lg">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
            </details>
          ))}
        </div>
      </div></section>

      {/* ── FAQAccordion ── */}
      <FAQAccordion />

      {/* ── Why Choose ── */}
      <section className="py-20 bg-gray-50"><div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-brand-ink tracking-tight">Why Choose GTA Scrub for <span className="text-[#70cf36]">{svc.shortName}</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {svc.whyChoose.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-5 shadow-sm">
              <svg className="w-5 h-5 text-[#70cf36] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span className="text-gray-700 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div></section>

      {/* ── Other Services ── */}
      <section className="py-20 bg-white"><div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-brand-ink">Other Services</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {otherServices.filter((s) => s.slug !== svc.slug).map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-brand-ink hover:border-brand hover:bg-brand-pale transition-all">{s.name}</Link>
          ))}
        </div>
      </div></section>

      {/* ── Hub & Spoke: Cities We Serve ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Providing {svc.name} Across the GTA</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-[#70cf36] hover:text-[#70cf36] transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Get Your Free {svc.shortName} Cleaning Quote</h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Most replies within 30 minutes. Call us or book online.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Book Online</Link>
          <a href="tel:+12892770213" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold inline-block hover:bg-white/20 transition-colors">Call +1 (289) 277-0213</a>
        </div>
        <div className="mt-8 text-sm text-gray-400">
          <Link href="/service-areas" className="hover:text-white underline underline-offset-2 transition-colors">See all 14 GTA cities we serve →</Link>
        </div>
      </div></section>
    </>
  );
}
