import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — GTA Scrub Commercial Cleaning",
  description: "Frequently asked questions about GTA Scrub commercial cleaning services.",
    alternates: { canonical: "https://gtascrub.com/faq" },
};

export default function FaqPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">FAQ</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Frequently Asked Questions</h1></div></div></section>
      <section className="py-16 bg-white"><div className="container mx-auto px-6 max-w-3xl"><div className="space-y-4">
        <details className="bg-gray-50 rounded-2xl overflow-hidden group"><summary className="p-6 font-bold text-brand-ink cursor-pointer list-none flex justify-between items-center">How much does commercial cleaning cost?<span className="text-[#70cf36] group-open:rotate-180 transition-transform">+</span></summary><div className="px-6 pb-6 text-gray-600">Most offices start at $150 per visit. Free quotes with transparent flat-rate pricing.</div></details>
        <details className="bg-gray-50 rounded-2xl overflow-hidden group"><summary className="p-6 font-bold text-brand-ink cursor-pointer list-none flex justify-between items-center">Are you insured and bonded?<span className="text-[#70cf36] group-open:rotate-180 transition-transform">+</span></summary><div className="px-6 pb-6 text-gray-600">Yes. Fully insured and bonded. $2M liability coverage and WSIB. Proof available.</div></details>
        <details className="bg-gray-50 rounded-2xl overflow-hidden group"><summary className="p-6 font-bold text-brand-ink cursor-pointer list-none flex justify-between items-center">What cleaning products do you use?<span className="text-[#70cf36] group-open:rotate-180 transition-transform">+</span></summary><div className="px-6 pb-6 text-gray-600">Eco-friendly and hospital-grade disinfectants. Green options available at no extra cost.</div></details>
        <details className="bg-gray-50 rounded-2xl overflow-hidden group"><summary className="p-6 font-bold text-brand-ink cursor-pointer list-none flex justify-between items-center">What if I need to cancel?<span className="text-[#70cf36] group-open:rotate-180 transition-transform">+</span></summary><div className="px-6 pb-6 text-gray-600">No long-term contracts. Cancel with 24 hours notice.</div></details>
      </div></div></section>
    </>
  );
}
