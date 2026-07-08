"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import CircularTestimonials from "@/components/CircularTestimonials";
import PricingCalculator from "@/components/PricingCalculator";
import CleaningChecklist from "@/components/CleaningChecklist";
import FAQAccordion from "@/components/FAQAccordion";
import SocialCards from "@/components/SocialCards";
import { ServiceGrid } from "@/components/ui/service-grid";
import AnimatedStats from "@/components/AnimatedStats";
import ScrollGallery from "@/components/ScrollGallery";

const testimonialsData = [
  { quote: "GTA Scrub has been cleaning our Mississauga office for 8 months.", name: "Sarah Kamal", designation: "Office Manager, Mississauga", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { quote: "We run a dental clinic in North York and need hospital-grade cleanliness. GTA Scrub delivers every single time.", name: "Dr. Raj Patel", designation: "Dental Clinic, North York", src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" },
  { quote: "After a major renovation, GTA Scrub post-construction team was incredible.", name: "Mike Liu", designation: "Retail Manager, Brampton", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
  { quote: "We switched to GTA Scrub for our Etobicoke warehouse and saved 30%.", name: "Jennifer Thompson", designation: "Operations Director, Etobicoke", src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { quote: "Reliable, thorough, and always on time. The CleanCheck system gives us confidence.", name: "Mark Chen", designation: "Office Manager, Toronto", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
];

export default function HomePageClient() {
  useEffect(() => {
    const ct = document.getElementById("chatToggle");
    const cp = document.getElementById("chatPopup");
    const cc = document.getElementById("chatClose");
    if (ct && cp) {
      const toggleChat = (e: MouseEvent) => { e.stopPropagation(); cp.classList.toggle("open"); };
      ct.addEventListener("click", toggleChat);
      if (cc) {
        const closeChat = () => cp.classList.remove("open");
        cc.addEventListener("click", closeChat);
        const docClick = (e: MouseEvent) => { if (!cp.contains(e.target as Node) && e.target !== ct) cp.classList.remove("open"); };
        document.addEventListener("click", docClick);
        return () => {
          ct.removeEventListener("click", toggleChat);
          cc.removeEventListener("click", closeChat);
          document.removeEventListener("click", docClick);
        };
      }
      return () => ct.removeEventListener("click", toggleChat);
    }
  }, []);

  const baseCards = [
    { imgUrl: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80", alt: "Corporate Office" },
    { imgUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80", alt: "Dental Clinic" },
    { imgUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", alt: "Lobby & Reception" },
    { imgUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", alt: "Industrial Warehouse" },
    { imgUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80", alt: "Janitorial Team" },
    { imgUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80", alt: "Post-Construction" },
    { imgUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", alt: "Retail Space" },
  ];

  // Duplicate the array to create an off-screen buffer for the GSAP infinite loop
  const portfolioCards = [...baseCards, ...baseCards];

  const servicesData = [
    { name: "Office Cleaning", href: "/services/office-cleaning-gta", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop&q=80" },
    { name: "Medical Clinics", href: "/services/medical-office-cleaning-gta", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop&q=80" },
    { name: "Post-Construction", href: "/services/post-construction-cleaning-gta", imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop&q=80" },
    { name: "Warehouses", href: "/services/warehouse-cleaning-gta", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop&q=80" },
    { name: "Window Cleaning", href: "/services/window-cleaning-gta", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop&q=80" },
    { name: "Floor Care", href: "/services/floor-care-stripping-gta", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&q=80" },
    { name: "Carpet Cleaning", href: "/services/carpet-cleaning-gta", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop&q=80" },
    { name: "Janitorial Services", href: "/services/janitorial-services-gta", imageUrl: "https://images.unsplash.com/photo-1584824486516-0555a07fc511?w=400&h=400&fit=crop&q=80" },
  ];

  return (
    <>
      <section className="relative min-h-[520px] lg:min-h-[700px] flex items-center py-20 overflow-hidden bg-gray-50 bg-[url('/images/hero-janitor.png')] bg-cover bg-center bg-no-repeat">
        <div id="spline-hero-widget" className="absolute inset-0 z-0 opacity-90 pointer-events-auto"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent w-full lg:w-3/4"></div>
        <div className="container mx-auto px-6 relative z-10 pointer-events-none">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pale rounded-full text-brand-ink text-xs sm:text-sm font-bold mb-8 shadow-sm border border-brand/20 pointer-events-auto">
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              4.9 Stars from 87 GTA Businesses
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-ink leading-[0.9] tracking-tighter mb-6">
              Commercial Cleaning<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-green-600">That Proves Itself</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">Photo-verified CleanCheck reports. Free demo clean. No long-term contracts.</p>
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <Link href="/contact" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-brand hover:bg-brand-active rounded-2xl shadow-lg shadow-brand/30 transition-all hover:-translate-y-1">Get a Free Quote</Link>
              <Link href="/services" className="inline-flex justify-center items-center px-8 py-4 font-bold text-brand-ink bg-white border-2 border-gray-200 hover:border-brand-ink rounded-2xl transition-all">See Our Services</Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-gray-500 pointer-events-auto">
              <Link href="/service-areas" className="hover:text-brand-ink underline underline-offset-2 transition-colors">14 GTA Cities Covered →</Link>
              <Link href="/about" className="hover:text-brand-ink underline underline-offset-2 transition-colors">About Our Team →</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 bg-white border-b border-gray-200"><div className="flex flex-wrap justify-center gap-6 md:gap-12 px-6">
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Photo-Verified Reports</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg> Fully Insured &amp; Bonded</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> 500+ Happy Clients</span>
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="#70cf36"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Same-Day Availability</span>
      </div></div>

      <section className="py-20 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="inline-block bg-[#e2f6d5] text-[#163300] font-bold px-4 py-2 rounded-full text-sm tracking-wider uppercase mb-6">Verified Quality</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0e0f0c] tracking-tight mb-4">See Our Standards in Action.</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Swipe through our recent commercial cleaning projects across Brampton and the GTA.</p>
        </div>
        <SocialCards cards={portfolioCards} />
      </section>

      <AnimatedStats />

      <div className="bg-gray-50 border-y border-gray-100">
        <ServiceGrid
          title="Full-Service Commercial Cleaning"
          subtitle="Specialized cleaning protocols tailored to your industry's exact standards."
          services={servicesData}
        />
      </div>

      <section className="py-24 bg-brand-pale overflow-hidden relative"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-white px-5 py-2 rounded-full mb-5 shadow-sm border border-brand/20">Real Reviews</span><h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Trusted by 500+ GTA Businesses</h2><p className="text-gray-500 mt-4"><Link href="/review" className="font-semibold underline underline-offset-2 hover:text-brand-ink transition-colors">Leave us a review →</Link></p></div>
        <CircularTestimonials testimonials={testimonialsData} colors={{ arrowHoverBackground: '#70cf36' }} />
      </div></section>

      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Transparent Pricing</span><h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Get an Instant Estimate</h2></div>
        <PricingCalculator />
      </div></section>

      <CleaningChecklist />
      <FAQAccordion />

      <ScrollGallery />

      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6"><h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Ready for a Spotless Space?</h2><p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Get your free quote within 2 hours.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/contact" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Book Online</Link><a href="tel:+12892770213" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold inline-block hover:bg-white/20 transition-colors">Call Us Now</a></div><div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400"><Link href="/blog" className="hover:text-white underline underline-offset-2 transition-colors">Cleaning Tips & Guides →</Link><Link href="/referrals" className="hover:text-white underline underline-offset-2 transition-colors">Refer a Business & Earn →</Link></div></div></section>

      <div className="chat-bubble">
        <button className="chat-btn" id="chatToggle" aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </button>
        <div className="chat-popup" id="chatPopup">
          <div className="chat-popup-header">
            <div className="chat-avatar">GS</div>
            <div><div className="chat-name">GTA Scrub</div><div className="chat-status">Usually replies in minutes</div></div>
            <button className="chat-close" id="chatClose" aria-label="Close chat">X</button>
          </div>
          <div className="chat-popup-body">
            <p>Hey! Need a quote or have a quick question?</p>
            <a href="tel:+12892770213" className="chat-action">Call Us Now</a>
            <Link href="/contact" className="chat-action chat-action--outline">Request a Quote</Link>
          </div>
        </div>
      </div>
    </>
  );
}
