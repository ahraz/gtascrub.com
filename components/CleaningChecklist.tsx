"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const checklistData = {
  standard: [
    "Surface Dusting & Sanitization",
    "Empty Waste & Recycling Bins",
    "Floor Vacuuming & Mopping",
    "High-Touch Point Disinfection",
    "Washroom Deep Sanitization"
  ],
  deep: [
    "Everything in Standard",
    "Baseboard & Trim Detailing",
    "Upholstery & Furniture Dusting",
    "Interior Glass & Partition Cleaning",
    "Kitchen/Breakroom Appliance Deep Clean",
    "Ceiling Vents & Light Fixtures"
  ]
};

export default function CleaningChecklist() {
  const [activeTab, setActiveTab] = useState<'standard' | 'deep'>('standard');

  const setStandard = useCallback(() => setActiveTab('standard'), []);
  const setDeep = useCallback(() => setActiveTab('deep'), []);

  return (
    <section className="max-w-4xl mx-auto py-16 px-6" aria-label="Cleaning services checklist">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Our Cleaning Scope</h2>
        <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl" role="tablist" aria-label="Cleaning scope tabs">
          <button
            role="tab"
            aria-selected={activeTab === 'standard'}
            aria-controls="checklist-standard"
            onClick={setStandard}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'standard' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            Standard
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'deep'}
            aria-controls="checklist-deep"
            onClick={setDeep}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'deep' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            Deep Clean
          </button>
        </div>
      </div>

      <motion.ul
        layout
        id={`checklist-${activeTab}`}
        className="grid md:grid-cols-2 gap-4"
        role="tabpanel"
        aria-label={`${activeTab === 'standard' ? 'Standard' : 'Deep Clean'} checklist`}
      >
        <AnimatePresence mode="wait">
          {checklistData[activeTab].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
            >
              <span className="text-[#70cf36]" aria-hidden="true">✓</span> {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
