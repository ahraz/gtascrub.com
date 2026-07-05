"use client";
import React, { useState } from "react";

export default function PricingCalculator() {
  const [propertyType, setPropertyType] = useState("clinic");
  const [sqFt, setSqFt] = useState(1500);
  const [rooms, setRooms] = useState(10); // Combines washrooms, patient rooms, reception
  const [frequency, setFrequency] = useState(24); // 6 days/week * 4 weeks

  const calculateTotal = () => {
    // Clinic Base: Base fee + sq ft rate + room complexity
    const baseFee = propertyType === "clinic" ? 400 : 200;
    const sqFtRate = propertyType === "clinic" ? 0.30 : 0.15;
    const roomRate = 50; 
    
    const monthlyTotal = baseFee + (sqFt * sqFtRate) + (rooms * roomRate);
    
    // Frequency impact (adjusting for high-frequency daily cleans)
    return Math.round(monthlyTotal * (frequency / 20));
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl font-black text-[#0e0f0c] mb-2">${calculateTotal()}</div>
        <p className="text-sm text-gray-500">Estimated Monthly Commercial Rate</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Facility Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-4 bg-gray-50 rounded-xl font-bold">
            <option value="clinic">Medical/Dental Clinic</option>
            <option value="office">General Office/Law Firm</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Sq. Ft.</label>
            <input type="number" value={sqFt} onChange={(e) => setSqFt(Number(e.target.value))} className="w-full p-4 bg-gray-50 rounded-xl font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Total Rooms/Areas</label>
            <input type="number" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="w-full p-4 bg-gray-50 rounded-xl font-bold" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Working Days per Month</label>
          <input type="range" min="4" max="30" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full" />
          <div className="text-center font-bold mt-2">{frequency} days/month</div>
        </div>

        <button className="w-full py-4 bg-[#70cf36] rounded-xl font-black text-[#0e0f0c] hover:bg-[#8deb52] transition-all">
          Get Final Quote
        </button>
      </div>
    </div>
  );
}
