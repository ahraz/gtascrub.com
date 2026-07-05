"use client";
import React, { useEffect } from "react";
import CircularTestimonials from "@/components/CircularTestimonials";
import PricingCalculator from "@/components/PricingCalculator";
import CleaningChecklist from "@/components/CleaningChecklist";
import FAQAccordion from "@/components/FAQAccordion";

const testimonialsData = [
  { quote: "GTA Scrub has been cleaning our Mississauga office for 8 months. Their CleanCheck reports give us real proof of quality.", name: "Sarah Kamal", designation: "Office Manager, Mississauga", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { quote: "We run a dental clinic in North York and need hospital-grade cleanliness. GTA Scrub delivers every single time.", name: "Dr. Raj Patel", designation: "Dental Clinic, North York", src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" },
  { quote: "After a major renovation, GTA Scrub's post-construction team was incredible. The place looked better than new.", name: "Mike Liu", designation: "Retail Manager, Brampton", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
  { quote: "We switched to GTA Scrub for our Etobicoke warehouse and saved 30%. The quality is even better than our previous cleaner.", name: "Jennifer Thompson", designation: "Operations Director, Etobicoke", src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { quote: "Reliable, thorough, and always on time. The CleanCheck system gives us confidence we're getting what we pay for.", name: "Mark Chen", designation: "Office Manager, Toronto", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
];

export default function Home() {
  useEffect(() => {
    /* ── Nav Toggle ── */
    const toggle = document.querySelector('[data-toggle="nav-links"]');
    if (toggle) {
      const handler = () => {
        const nav = document.getElementById('nav-links');
        if (nav) {
          nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
        }
      };
      toggle.addEventListener('click', handler);
      return () => toggle.removeEventListener('click', handler);
    }
  }, []);

  useEffect(() => {
    /* ── Chat Toggle ── */
    const ct = document.getElementById('chatToggle');
    const cp = document.getElementById('chatPopup');
    const cc = document.getElementById('chatClose');
    if (ct && cp) {
      const toggleChat = (e: MouseEvent) => { e.stopPropagation(); cp.classList.toggle('open'); };
      ct.addEventListener('click', toggleChat);
      if (cc) {
        const closeChat = () => cp.classList.remove('open');
        cc.addEventListener('click', closeChat);
        const docClick = (e: MouseEvent) => { if (!cp.contains(e.target as Node) && e.target !== ct) cp.classList.remove('open'); };
        document.addEventListener('click', docClick);
        return () => {
          ct.removeEventListener('click', toggleChat);
          cc.removeEventListener('click', closeChat);
          document.removeEventListener('click', docClick);
        };
      }
      return () => ct.removeEventListener('click', toggleChat);
    }
  }, []);

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200" aria-label="Main navigation">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand-ink tracking-tight">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#70cf36"/><path d="M16 6l2.2 4.8L23 13l-4.8 2.2L16 20l-2.2-4.8L9 13l4.8-2.2L16 6z" fill="#0e0f0c"/></svg>
            GTA Scrub
          </a>
          <button data-toggle="nav-links" className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5" aria-expanded="false" aria-label="Toggle menu">
            <span className="block w-6 h-0.5 bg-brand-ink rounded-full"></span>
            <span className="block w-6 h-0.5 bg-brand-ink rounded-full"></span>
            <span className="block w-6 h-0.5 bg-brand-ink rounded-full"></span>
          </button>
          <ul className="hidden md:flex items-center gap-2" id="nav-links">
            <li><a href="/" className="px-4 py-2 text-sm font-bold text-brand-ink bg-gray-100 rounded-full transition-colors">Home</a></li>
            <li><a href="/services.html" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-ink hover:bg-gray-50 rounded-full transition-colors">Services</a></li>
            <li><a href="/about.html" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-ink hover:bg-gray-50 rounded-full transition-colors">About</a></li>
            <li><a href="/blog.html" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-ink hover:bg-gray-50 rounded-full transition-colors">Blog</a></li>
            <li><a href="/contact.html" className="ml-2 px-6 py-2.5 bg-brand hover:bg-brand-active text-brand-ink text-sm font-bold rounded-full shadow-sm transition-transform hover:-translate-y-0.5">Book Now →</a></li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[520px] lg:min-h-[700px] flex items-center py-20 overflow-hidden bg-gray-50 bg-[url('/images/hero-janitor.png')] bg-cover bg-center bg-no-repeat">
        <div id="spline-hero-widget" className="absolute inset-0 z-0 opacity-90 pointer-events-auto"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent w-full lg:w-3/4"></div>
        <div className="container mx-auto px-6 relative z-10 pointer-events-none">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pale rounded-full text-brand-ink text-xs sm:text-sm font-bold mb-8 shadow-sm border border-brand/20 pointer-events-auto">
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              4.9 Stars from 87 GTA Businesses
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-ink leading-[0.9] tracking-tighter mb-6">
              Commercial Cleaning<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-green-600">That Proves Itself</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
              Photo-verified CleanCheck reports. Free demo clean. No long-term contracts. Serving Brampton, Mississauga, Toronto and the entire GTA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <a href="/contact.html" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-brand hover:bg-brand-active rounded-2xl shadow-lg shadow-brand/30 transition-all hover:-translate-y-1">
                Get a Free Quote
              </a>
              <a href="/services.html" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-white border-2 border-gray-200 hover:border-brand-ink hover:text-white rounded-2xl transition-all">
                See Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="py-6 bg-white border-b border-gray-200"><div className="flex flex-wrap justify-center gap-6 md:gap-12 px-6">
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Photo-Verified Reports</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg> Fully Insured &amp; Bonded</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> 500+ Happy Clients</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Same-Day Availability</span>
      </div></div>

      {/* ── Stats ── */}
      <section className="py-20 bg-white"><div className="container mx-auto px-6"><div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-8 bg-gray-50 rounded-3xl"><div className="text-4xl md:text-5xl font-black text-brand-ink mb-2">5,000+</div><div className="text-sm font-bold text-gray-500">Cleans Completed</div></div>
        <div className="text-center p-8 bg-gray-50 rounded-3xl"><div className="text-4xl md:text-5xl font-black text-brand-ink mb-2">99%</div><div className="text-sm font-bold text-gray-500">Customer Satisfaction</div></div>
        <div className="text-center p-8 bg-gray-50 rounded-3xl"><div className="text-4xl md:text-5xl font-black text-brand-ink mb-2">4.9</div><div className="text-sm font-bold text-gray-500">Average Rating</div></div>
        <div className="text-center p-8 bg-gray-50 rounded-3xl"><div className="text-4xl md:text-5xl font-black text-brand-ink mb-2">7+</div><div className="text-sm font-bold text-gray-500">Years in Business</div></div>
      </div></div></section>

      {/* ── Services (Bento Box) ── */}
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">What We Clean</span><h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Full-Service Commercial Cleaning</h2><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">From offices to warehouses, we handle every type of commercial space across the GTA.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-[#e2f6d5] rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20 group cursor-pointer"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f0c"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg></div><h3 className="text-xl font-bold text-brand-ink mb-3">Office Cleaning</h3><p className="text-gray-700 mb-6 flex-1">Daily, weekly, or custom schedules for offices of any size.</p><a href="/office-cleaning-gta/" className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-ink/70 transition-colors">Learn More <span aria-hidden="true">→</span></a></div>
          <div className="lg:col-span-2 bg-[#e2f6d5] rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20 group cursor-pointer"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f0c"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg></div><h3 className="text-xl font-bold text-brand-ink mb-3">Medical Office Cleaning</h3><p className="text-gray-700 mb-6 flex-1">Hospital-grade disinfection for dental clinics and healthcare facilities.</p><a href="/medical-office-cleaning-gta/" className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-ink/70 transition-colors">Learn More <span aria-hidden="true">→</span></a></div>
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20 group cursor-pointer"><div className="w-12 h-12 bg-[#e2f6d5] rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f0c"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8a2 2 0 01-2 2h-2v2h4v2H9v-4a2 2 0 012-2h2V9H9V7h4a2 2 0 012 2v2z"/></svg></div><h3 className="text-xl font-bold text-brand-ink mb-3">Post-Construction</h3><p className="text-gray-700 mb-6 flex-1">Deep clean after renovations. Remove dust, debris, and construction residue.</p><a href="/post-construction-cleaning-gta/" className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-ink/70 transition-colors">Learn More <span aria-hidden="true">→</span></a></div>
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20 group cursor-pointer"><div className="w-12 h-12 bg-[#e2f6d5] rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f0c"><path d="M22 21V7L12 2 2 7v14h5v-9h10v9h5zm-11-2H9v-2h2v2zm4 0h-2v-2h2v2z"/></svg></div><h3 className="text-xl font-bold text-brand-ink mb-3">Warehouse Cleaning</h3><p className="text-gray-700 mb-6 flex-1">Large-scale industrial cleaning for warehouses, factories, and distribution centres.</p><a href="/warehouse-cleaning-gta/" className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-ink/70 transition-colors">Learn More <span aria-hidden="true">→</span></a></div>
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20 group cursor-pointer"><div className="w-12 h-12 bg-[#e2f6d5] rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f0c"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm4 12h-2v-4h-2v4H8v-2l4-4 4 4v2z"/></svg></div><h3 className="text-xl font-bold text-brand-ink mb-3">Window Cleaning</h3><p className="text-gray-700 mb-6 flex-1">Interior and exterior commercial window cleaning. Streak-free results.</p><a href="/window-cleaning-gta/" className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-ink/70 transition-colors">Learn More <span aria-hidden="true">→</span></a></div>
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20 group cursor-pointer"><div className="w-12 h-12 bg-[#e2f6d5] rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f0c"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg></div><h3 className="text-xl font-bold text-brand-ink mb-3">Recurring Maintenance</h3><p className="text-gray-700 mb-6 flex-1">Custom recurring plans. Weekly, bi-weekly, or monthly schedules.</p><a href="/services.html" className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-ink/70 transition-colors">Learn More <span aria-hidden="true">→</span></a></div>
        </div></div></section>

      {/* ── Testimonials (React Component) ── */}
      <section className="py-24 bg-brand-pale overflow-hidden relative"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-white px-5 py-2 rounded-full mb-5 shadow-sm border border-brand/20">Real Reviews</span><h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Trusted by 500+ GTA Businesses</h2><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Don&apos;t take our word for it — here&apos;s what our clients say.</p></div>
        <CircularTestimonials testimonials={testimonialsData} colors={{ arrowHoverBackground: '#70cf36' }} />
      </div></section>

      {/* ── Pricing Calculator ── */}
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Transparent Pricing</span><h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Get an Instant Estimate</h2><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">No surprises. Your price is calculated instantly.</p></div>
        <PricingCalculator />
      </div></section>

      {/* ── Checklist ── */}
      <CleaningChecklist />

      {/* ── FAQ ── */}
      <FAQAccordion />

      {/* ── CTA Banner ── */}
      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6"><h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Ready for a Spotless Space?</h2><p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Get your free quote within 2 hours. Most replies within 30 minutes.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="/contact.html" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Book Online</a><a href="tel:+12892770213" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold inline-block hover:bg-white/20 transition-colors">Call Us Now</a></div></div></section>

      {/* ── Footer ── */}
      <footer className="py-16 bg-brand-ink text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">
          <div>
            <a href="/" className="flex items-center gap-2 text-lg font-extrabold text-white mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#70cf36"/><path d="M16 6l2.2 4.8L23 13l-4.8 2.2L16 20l-2.2-4.8L9 13l4.8-2.2L16 6z" fill="#0e0f0c"/></svg>
              GTA Scrub
            </a>
            <p className="text-sm leading-relaxed">Photo-verified commercial cleaning across the GTA. Insured, bonded, and trusted by 500+ businesses.</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
            <a href="/" className="block mb-3 hover:text-white transition-colors">Home</a>
            <a href="/services.html" className="block mb-3 hover:text-white transition-colors">Services</a>
            <a href="/about.html" className="block mb-3 hover:text-white transition-colors">About Us</a>
            <a href="/blog.html" className="block mb-3 hover:text-white transition-colors">Blog</a>
            <a href="/faq.html" className="block mb-3 hover:text-white transition-colors">FAQ</a>
            <a href="/contact.html" className="block mb-3 hover:text-white transition-colors">Contact</a>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Services</h4>
            <a href="/office-cleaning-gta/" className="block mb-3 hover:text-white transition-colors">Office Cleaning</a>
            <a href="/medical-office-cleaning-gta/" className="block mb-3 hover:text-white transition-colors">Medical Cleaning</a>
            <a href="/post-construction-cleaning-gta/" className="block mb-3 hover:text-white transition-colors">Post-Construction</a>
            <a href="/warehouse-cleaning-gta/" className="block mb-3 hover:text-white transition-colors">Warehouse Cleaning</a>
            <a href="/window-cleaning-gta/" className="block mb-3 hover:text-white transition-colors">Window Cleaning</a>
            <a href="/carpet-cleaning-gta/" className="block mb-3 hover:text-white transition-colors">Carpet Cleaning</a>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Contact Us</h4>
            <a href="tel:+12892770213" className="block mb-3 hover:text-white transition-colors">+1 (289) 277-0213</a>
            <a href="mailto:info@gtascrub.com" className="block mb-3 hover:text-white transition-colors">info@gtascrub.com</a>
            <a href="#" className="block mb-3 hover:text-white transition-colors">20 Glenfield Cres<br/>Brampton, ON L6S1W2</a>
            <a href="/service-areas.html" className="block mb-3 hover:text-white transition-colors">Serving all 14 GTA cities</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; 2025 GTA Scrub. All rights reserved.</p>
          <p className="text-sm">Licensed &amp; Insured in Ontario</p>
        </div>
      </footer>

      {/* ── Chat Bubble ── */}
      <div className="chat-bubble">
        <button className="chat-btn" id="chatToggle" aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </button>
        <div className="chat-popup" id="chatPopup">
          <div className="chat-popup-header">
            <div className="chat-avatar">GS</div>
            <div><div className="chat-name">GTA Scrub</div><div className="chat-status">Usually replies in minutes</div></div>
            <button className="chat-close" id="chatClose" aria-label="Close chat">✕</button>
          </div>
          <div className="chat-popup-body">
            <p>👋 Hey! Need a quote or have a quick question?</p>
            <a href="tel:+12892770213" className="chat-action">📞 Call Us Now</a>
            <a href="/contact.html" className="chat-action chat-action--outline">✉️ Request a Quote</a>
          </div>
        </div>
      </div>
    </>
  );
}
