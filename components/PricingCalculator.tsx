"use client";
import React, { useState, useCallback, useMemo } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratesRecord = useMemo(() => rates, []);

  const total = useMemo(() => {
    const r = ratesRecord[propertyType] || ratesRecord.clinic;
    const monthlyTotal = r.baseFee + (sqFt * r.sqFtRate) + (rooms * r.roomRate);
    return Math.round(monthlyTotal * (frequency / 20));
  }, [propertyType, sqFt, rooms, frequency, ratesRecord]);

  const progressPercent = useMemo(() => (step / 3) * 100, [step]);

  const canProceedStep1 = !!propertyType;
  const canProceedStep2 = sqFt >= 100 && rooms >= 1 && frequency >= 4;
  const canProceedStep3 = email.includes("@");

  const setStepBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);
  const setStepForward = useCallback(() => setStep((s) => Math.min(3, s + 1)), []);
  const handleSetPropertyType = useCallback((id: string) => setPropertyType(id), []);
  const handleSetSqFt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSqFt(Number(e.target.value)), []);
  const handleSetRooms = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setRooms(Number(e.target.value)), []);
  const handleSetFrequency = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFrequency(Number(e.target.value)), []);
  const handleSetEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mvzjyrrw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          type: "Pricing Calculator Lead",
          propertyType,
          sqFt,
          frequency,
          estimatedCost: total,
          userEmail: email,
        }),
      });
      if (response.ok) setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [propertyType, sqFt, frequency, total, email]);

  /* ── Step 1: Facility ── */
  const renderStep1 = useCallback(() => (
    <div className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        Tell us about your space so we can tailor a rate for your facility type.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {facilities.map((f) => (
          <button
            key={f.id}
            onClick={() => handleSetPropertyType(f.id)}
            aria-label={`Select ${f.label}`}
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
              <span className="ml-auto text-xl" aria-hidden="true">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  ), [propertyType, handleSetPropertyType]);

  /* ── Step 2: Size & Frequency ── */
  const renderStep2 = useCallback(() => (
    <div className="space-y-8">
      <p className="text-gray-600 text-sm leading-relaxed">
        Rough numbers are fine — we&apos;ll confirm everything during your free walk-through.
      </p>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="sqft-slider" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Square Footage</label>
          <span className="text-lg font-black text-[#0e0f0c]">{sqFt.toLocaleString()} sq. ft.</span>
        </div>
        <input
          id="sqft-slider"
          type="range"
          min="250"
          max="50000"
          step="250"
          value={sqFt}
          onChange={handleSetSqFt}
          className="w-full accent-[#70cf36]"
          aria-label="Square footage"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>250</span>
          <span>50,000+</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="rooms-slider" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rooms / Areas to Clean</label>
          <span className="text-lg font-black text-[#0e0f0c]">{rooms}</span>
        </div>
        <input
          id="rooms-slider"
          type="range"
          min="1"
          max="100"
          value={rooms}
          onChange={handleSetRooms}
          className="w-full accent-[#70cf36]"
          aria-label="Number of rooms"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>100+</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="frequency-slider" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cleaning Visits per Month</label>
          <span className="text-lg font-black text-[#0e0f0c]">{frequency}× / mo</span>
        </div>
        <input
          id="frequency-slider"
          type="range"
          min="2"
          max="30"
          value={frequency}
          onChange={handleSetFrequency}
          className="w-full accent-[#70cf36]"
          aria-label="Cleaning frequency"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>2× (bi-weekly)</span>
          <span>30× (daily)</span>
        </div>
      </div>
    </div>
  ), [sqFt, rooms, frequency, handleSetSqFt, handleSetRooms, handleSetFrequency]);

  /* ── Step 3: Review & Lead Capture ── */
  const renderStep3 = useCallback(() => {
    const r = ratesRecord[propertyType] || ratesRecord.clinic;
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
              onChange={handleSetEmail}
              aria-label="Email address"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-[#0e0f0c] outline-none focus:ring-2 focus:ring-[#70cf36]/50 focus:border-[#70cf36] transition-all placeholder:text-gray-400"
            />
            <button
              onClick={handleSubmit}
              disabled={!canProceedStep3 || isSubmitting}
              aria-label="Send detailed breakdown to my email"
              className="w-full py-4 bg-[#70cf36] hover:bg-[#8deb52] disabled:bg-gray-200 disabled:text-gray-400 text-[#0e0f0c] text-base font-black rounded-2xl shadow-lg shadow-[#70cf36]/30 transition-all hover:-translate-y-0.5 disabled:shadow-none disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Sending…" : "Send Detailed Breakdown to My Email →"}
            </button>
          </div>
        ) : (
          <div className="bg-[#e2f6d5] rounded-2xl p-6 text-center space-y-2">
            <div className="text-2xl" aria-hidden="true">📬</div>
            <p className="font-bold text-[#163300]">Breakdown sent to {email}</p>
            <p className="text-sm text-[#163300]/70">
              We&apos;ll follow up within 2 hours to schedule your free walk-through.
            </p>
          </div>
        )}
      </div>
    );
  }, [propertyType, sqFt, rooms, frequency, total, email, submitted, isSubmitting, ratesRecord, handleSetEmail, handleSubmit, canProceedStep3]);

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
            onClick={setStepBack}
            aria-label="Previous step"
            className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-[#0e0f0c] bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <button
            onClick={setStepForward}
            disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
            aria-label="Continue to next step"
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
