import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — GTA Scrub Commercial Cleaning",
  description: "Expert insights on commercial cleaning, office hygiene, and facility management across the GTA.",
};

export default function BlogPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Blog</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Our Blog</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Expert insights on commercial cleaning, office hygiene, and facility management.</p></div></div></section>
      <section className="py-16 bg-white"><div className="container mx-auto px-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="/blog/commercial-cleaning-cost-per-square-foot" className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-lg font-bold text-brand-ink mb-3">Commercial Cleaning Cost Per Square Foot</h3><p className="text-gray-600 text-sm flex-1">A comprehensive guide to commercial cleaning pricing in the GTA.</p><span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4">Read More →</span></a>
        <a href="/blog/green-cleaning-what-it-means-guide" className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-lg font-bold text-brand-ink mb-3">Green Cleaning: What It Means</h3><p className="text-gray-600 text-sm flex-1">Understanding eco-friendly cleaning practices and their benefits.</p><span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4">Read More →</span></a>
        <a href="/blog/gtascrub-cleancheck-how-we-prove-every-clean" className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-lg font-bold text-brand-ink mb-3">CleanCheck: How We Prove Every Clean</h3><p className="text-gray-600 text-sm flex-1">How our photo-verified CleanCheck system ensures quality.</p><span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4">Read More →</span></a>
        <a href="/blog/how-often-should-office-be-cleaned" className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-lg font-bold text-brand-ink mb-3">How Often Should Office Be Cleaned?</h3><p className="text-gray-600 text-sm flex-1">Guidelines for office cleaning frequency.</p><span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4">Read More →</span></a>
        <a href="/blog/medical-office-cleaning-standards-ontario" className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-lg font-bold text-brand-ink mb-3">Medical Office Cleaning Standards Ontario</h3><p className="text-gray-600 text-sm flex-1">Understanding regulations for medical facility cleaning.</p><span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4">Read More →</span></a>
        <a href="/blog/office-cleaning-vs-janitorial-services" className="bg-gray-50 rounded-3xl p-8 flex flex-col hover:shadow-md transition-all hover:-translate-y-1"><h3 className="text-lg font-bold text-brand-ink mb-3">Office Cleaning vs Janitorial Services</h3><p className="text-gray-600 text-sm flex-1">The differences explained.</p><span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4">Read More →</span></a>
      </div></div></section>
    </>
  );
}
