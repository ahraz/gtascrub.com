import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — GTA Scrub Commercial Cleaning",
  description: "Get a free commercial cleaning quote within 2 hours. Most replies within 30 minutes. Serving all GTA cities.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Contact</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Get Your Free Quote</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Fill out the form below and we&apos;ll get back to you within 2 hours.</p></div></div></section>
      <ContactForm />
    </>
  );
}
