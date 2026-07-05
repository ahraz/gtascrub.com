import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — GTA Scrub Commercial Cleaning",
  description: "Get a free commercial cleaning quote within 2 hours. Most replies within 30 minutes. Serving all GTA cities.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Contact</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Get Your Free Quote</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Fill out the form below and we&apos;ll get back to you within 2 hours.</p></div></div></section>
      <section className="py-16 bg-white"><div className="container mx-auto px-6 max-w-xl">
        <form className="space-y-6">
          <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="name">Full Name</label><input id="name" type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="Your name" /></div>
          <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="email">Email</label><input id="email" type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="you@company.com" /></div>
          <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="phone">Phone</label><input id="phone" type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="(289) 277-0213" /></div>
          <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="message">Message</label><textarea id="message" rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="Tell us about your space..."></textarea></div>
          <button type="submit" className="w-full py-4 bg-brand hover:bg-brand-active text-brand-ink text-base font-black rounded-2xl shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5">Get Your Free Quote</button>
        </form>
      </div></section>
    </>
  );
}
