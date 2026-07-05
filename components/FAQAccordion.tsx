"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  { q: "Are you fully insured and bonded?", a: "Yes, GTA Scrub carries comprehensive commercial liability insurance and all our cleaners are fully bonded and background-checked for your security." },
  { q: "Do you provide your own cleaning supplies?", a: "We provide all professional-grade, eco-friendly cleaning supplies and specialized equipment required for clinic-grade disinfection." },
  { q: "What is your protocol for medical/dental facilities?", a: "We strictly follow health-safety protocols, utilizing color-coded microfiber systems to prevent cross-contamination and hospital-grade EPA-registered disinfectants." },
  { q: "Can we customize the cleaning scope?", a: "Absolutely. We tailor every checklist to your specific facility needs—from high-security areas to specialized equipment cleaning." }
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="max-w-3xl mx-auto py-16 px-6" aria-label="Frequently asked questions">
      <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">Common Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggleFaq(i)}
              aria-expanded={activeIndex === i}
              aria-controls={`faq-answer-${i}`}
              className="w-full flex justify-between items-center p-6 bg-white font-bold text-left hover:bg-gray-50 transition-colors"
            >
              {item.q}
              <span className="text-[#70cf36]" aria-hidden="true">{activeIndex === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  id={`faq-answer-${i}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 px-6 pb-6 text-gray-600 leading-relaxed"
                  role="region"
                  aria-label={item.q}
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
