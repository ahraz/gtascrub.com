"use client";
import React, { useState } from "react";

interface FacilityOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const facilities: FacilityOption[] = [
  {
    id: "clinic",
    label: "Medical / Dental Clinic",
    description: "Exam rooms, labs, reception",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#e2f6d5" />
        <path d="M20 12v16m-8-8h16" stroke="#0e0f0c" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "office",
    label: "Office / Law Firm",
    description: "Desks, meeting rooms, breakroom",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#e2f6d5" />
        <path d="M12 28V14l8-4 8 4v14h-6v-8h-4v8h-6z" stroke="#0e0f0c" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "warehouse",
    label: "Warehouse / Industrial",
    description: "Open floor, high-traffic zones",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#e2f6d5" />
        <path d="M10 30V16l10-5 10 5v14H22v-8h-4v8H10z" stroke="#0e0f0c" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 16l10 5 10-5" stroke="#0e0f0c" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const rates: Record<string, { baseFee: number; sqFtRate: number; roomRate: number }> = {
  clinic:    { baseFee: 400, sqFtRate: 0.30, roomRate: 50 },
  office:    { baseFee: 200, sqFtRate: 0.15, roomRate: 35 },
  warehouse: { baseFee: 300, sqFtRate: 0.12, roomRate: 40 },
};

export default function PricingCalculator() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState("clinic");
  const [sqFt, setSqFt] = useState(1500);
  const [rooms, setRooms] = useState(10);
  const [frequency, setFrequency] = useState(24);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const calculateTotal = () => {
    const r = rates[propertyType] || rates.clinic;
    const monthlyTotal = r.baseFee + (sqFt * r.sqFtRate) + (rooms * r.roomRate);
    return Math.round(monthlyTotal * (frequency / 20));
  };

  const total = calculateTotal();
  const progressPercent = (step / 3) * 100;

  const canProceedStep1 = propertyType;
  const canProceedStep2 = sqFt >= 100 && rooms >= 1 && frequency >= 4;
  const canProceedStep3 = email.includes("@");

  const handleSubmit = () => {
    setSubmitted(true);
  };

  /* ── Step 1: Facility ── */
  const renderStep1 = () => (
    <div className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        Tell us about your space so we can tailor a rate for your facility type.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {facilities.map((f) => (
          <button
            key={f.id}
            onClick={() => setPropertyType(f.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
              propertyType === f.id
                ? "border-[#70cf36] bg-[#e2f6d5] shadow-md"
                : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            {f.icon}
            <div>
              <div className="font-bold text-[#0e0f0c]">{f.label}</div>
              <div className="text-sm text-gray-500">{f.description}</div>
            </div>
            {propertyType === f.id && (
              <span className="ml-auto text-xl">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  /* ── Step 2: Size & Frequency ── */
  const renderStep2 = () => (
    <div className="space-y-8">
      <p className="text-gray-600 text-sm leading-relaxed">
        Rough numbers are fine — we&apos;ll confirm everything during your free walk-through.
      </p>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Square Footage</label>
          <span className="text-lg font-black text-[#0e0f0c]">{sqFt.toLocaleString()} sq. ft.</span>
        </div>
        <input
          type="range"
          min="250"
          max="50000"
          step="250"
          value={sqFt}
          onChange={(e) => setSqFt(Number(e.target.value))}
          className="w-full accent-[#70cf36]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>250</span>
          <span>50,000+</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rooms / Areas to Clean</label>
          <span className="text-lg font-black text-[#0e0f0c]">{rooms}</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          className="w-full accent-[#70cf36]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>100+</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cleaning Visits per Month</label>
          <span className="text-lg font-black text-[#0e0f0c]">{frequency}× / mo</span>
        </div>
        <input
          type="range"
          min="2"
          max="30"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full accent-[#70cf36]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>2× (bi-weekly)</span>
          <span>30× (daily)</span>
        </div>
      </div>
    </div>
  );

  /* ── Step 3: Review & Lead Capture ── */
  const renderStep3 = () => {
    const r = rates[propertyType] || rates.clinic;
    const breakdown = [
      { label: "Base service fee", value: `$${r.baseFee}` },
      { label: `sq. ft. cleaning (${sqFt} × $${r.sqFtRate})`, value: `$${Math.round(sqFt * r.sqFtRate)}` },
      { label: `Room/area cleaning (${rooms} × $${r.roomRate})`, value: `$${Math.round(rooms * r.roomRate)}` },
      { label: "Frequency multiplier", value: `× ${(frequency / 20).toFixed(1)}` },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
          {breakdown.map((b, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">{b.label}</span>
              <span className="font-bold text-[#0e0f0c]">{b.value}</span>
            </div>
          ))}
          <hr className="border-gray-200" />
          <div className="flex justify-between text-base">
            <span className="font-bold text-[#0e0f0c]">Estimated Monthly Total</span>
            <span className="font-black text-lg text-[#0e0f0c]">${total}</span>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter your email and we&apos;ll send a detailed breakdown plus a
              confirmation of your free walk-through quote.
            </p>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-[#0e0f0c] outline-none focus:ring-2 focus:ring-[#70cf36]/50 focus:border-[#70cf36] transition-all placeholder:text-gray-400"
            />
            <button
              onClick={handleSubmit}
              disabled={!canProceedStep3}
              className="w-full py-4 bg-[#70cf36] hover:bg-[#8deb52] disabled:bg-gray-200 disabled:text-gray-400 text-[#0e0f0c] text-base font-black rounded-2xl shadow-lg shadow-[#70cf36]/30 transition-all hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
            >
              Send Detailed Breakdown to My Email →
            </button>
          </div>
        ) : (
          <div className="bg-[#e2f6d5] rounded-2xl p-6 text-center space-y-2">
            <div className="text-2xl">📬</div>
            <p className="font-bold text-[#163300]">Breakdown sent to {email}</p>
            <p className="text-sm text-[#163300]/70">
              We&apos;ll follow up within 2 hours to schedule your free walk-through.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 max-w-xl mx-auto">
      {/* ── Progress Bar ── */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Step {step} of 3
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {step === 1
              ? "Facility Type"
              : step === 2
              ? "Size & Frequency"
              : "Review & Quote"}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#70cf36] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Header ── */}
      <div className="text-center mb-8">
        {step === 3 && (
          <div className="text-5xl md:text-6xl font-black text-[#0e0f0c] tracking-tight mb-2">
            ${total}
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-black text-[#0e0f0c] tracking-tight">
          {step === 1
            ? "What type of facility?"
            : step === 2
            ? "How big and how often?"
            : "Your instant estimate"}
        </h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
          {step === 1
            ? "Select your facility type for a tailored rate."
            : step === 2
            ? "Slide to match your space — we'll calculate as you go."
            : "Get a transparent, Brampton-specific cleaning estimate in 30 seconds."}
        </p>
      </div>

      {/* ── Steps ── */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* ── Navigation ── */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-[#0e0f0c] bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
            className="px-8 py-3 bg-[#70cf36] hover:bg-[#8deb52] disabled:bg-gray-200 disabled:text-gray-400 text-[#0e0f0c] text-sm font-black rounded-xl shadow-lg shadow-[#70cf36]/20 transition-all hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
          >
            Continue →
          </button>
        ) : submitted ? (
          <div />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
