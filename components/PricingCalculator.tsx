"use client";
import React, { useState } from "react";

export default function PricingCalculator() {
  const [propertyType, setPropertyType] = useState("office");
  const [sqFt, setSqFt] = useState(2000);
  const [frequency, setFrequency] = useState(4);
  const [addons, setAddons] = useState({ disinfection: false, carpet: false, windows: false });

  const rates: Record<string, number> = { office: 0.12, medical: 0.25, warehouse: 0.15 };

  const calculateTotal = () => {
    let basePerVisit = sqFt * rates[propertyType];
    if (addons.disinfection) basePerVisit += (sqFt * 0.10);
    
    let monthlyTotal = basePerVisit * frequency;
    if (addons.carpet) monthlyTotal += (sqFt * 0.20);
    if (addons.windows) monthlyTotal += 50;
    
    return Math.round(monthlyTotal);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="text-6xl md:text-7xl font-black text-[#0e0f0c] tracking-tight mb-2">
          ${calculateTotal()}
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Estimated Monthly Cost (Confirmed after walk-through)
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col items-center">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Facility Type</label>
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl flex-wrap justify-center gap-1">
            {[
              { id: "office", label: "Office / Law Firm" },
              { id: "medical", label: "Clinic / Dental" },
              { id: "warehouse", label: "Warehouse" },
            ].map((type) => (
              <button key={type.id} onClick={() => setPropertyType(type.id)} className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${propertyType === type.id ? "bg-white text-[#0e0f0c] shadow-sm" : "text-gray-500 hover:text-[#0e0f0c]"}`}>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Square Footage</label>
            <div className="inline-flex items-center bg-gray-100 p-1.5 rounded-2xl">
              <button onClick={() => setSqFt(Math.max(500, sqFt - 500))} className="w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-500 hover:text-[#0e0f0c] hover:bg-white rounded-xl transition-all">−</button>
              <span className="w-20 text-center font-bold text-lg text-[#0e0f0c]">{sqFt}</span>
              <button onClick={() => setSqFt(sqFt + 500)} className="w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-500 hover:text-[#0e0f0c] hover:bg-white rounded-xl transition-all">+</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Cleaning Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="bg-gray-100 text-[#0e0f0c] font-bold text-sm px-6 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#70cf36]/50 appearance-none text-center cursor-pointer min-w-[200px]">
              <option value={2}>Bi-Weekly (2x / mo)</option>
              <option value={4}>Weekly (4x / mo)</option>
              <option value={20}>Daily (20x / mo)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center pt-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Monthly Add-ons</label>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: "disinfection", label: "Electrostatic Disinfection" },
              { id: "carpet", label: "Deep Carpet Extraction" },
              { id: "windows", label: "Interior Windows" },
            ].map((addon) => (
              <label key={addon.id} className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all border-2 ${addons[addon.id as keyof typeof addons] ? "bg-[#e2f6d5] border-[#70cf36] text-[#163300]" : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"}`}>
                <input type="checkbox" className="hidden" checked={addons[addon.id as keyof typeof addons]} onChange={(e) => setAddons({ ...addons, [addon.id]: e.target.checked })} />
                {addons[addon.id as keyof typeof addons] ? "✓" : "+"} {addon.label}
              </label>
            ))}
          </div>
        </div>

        <button className="block w-full py-5 mt-4 bg-[#70cf36] hover:bg-[#8deb52] text-[#0e0f0c] text-lg font-black rounded-2xl shadow-lg shadow-[#70cf36]/30 transition-transform hover:-translate-y-1 text-center">
          Book This Estimate →
        </button>
      </div>
    </div>
  );
}
