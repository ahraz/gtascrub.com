"use client";
import React, { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/mvzjyrrw";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ type: "Contact Page Lead", name, email, phone, message }),
      });
      if (response.ok) setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-16 bg-white"><div className="container mx-auto px-6 max-w-xl">
        <div className="bg-[#e2f6d5] rounded-2xl p-10 text-center space-y-4">
          <div className="text-5xl" aria-hidden="true">✅</div>
          <h2 className="text-2xl font-black text-[#163300]">Quote Request Sent!</h2>
          <p className="text-[#163300]/70 max-w-md mx-auto">We&apos;ll get back to you within 2 hours. Most replies come within 30 minutes.</p>
        </div>
      </div></section>
    );
  }

  return (
    <section className="py-16 bg-white"><div className="container mx-auto px-6 max-w-xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="name">Full Name</label><input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="Your name" /></div>
        <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="email">Email</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="you@company.com" /></div>
        <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="phone">Phone</label><input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="(289) 277-0213" /></div>
        <div><label className="block text-sm font-bold text-brand-ink mb-2" htmlFor="message">Message</label><textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand/50" placeholder="Tell us about your space..."></textarea></div>
        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand hover:bg-brand-active disabled:bg-gray-200 disabled:text-gray-400 text-brand-ink text-base font-black rounded-2xl shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0">
          {isSubmitting ? "Sending…" : "Get Your Free Quote"}
        </button>
      </form>
    </div></section>
  );
}
