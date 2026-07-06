"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReferralForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerCompany: "",
    rewardChoice: "account-credit",
    refereeName: "",
    refereeEmail: "",
    refereeCompany: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("https://formspree.io/f/mvzjyrrw", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        type: "NEW B2B REFERRAL",
        ...formData
      }),
    });

    if (response.ok) {
      setIsSuccess(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit} 
            className="space-y-6 md:space-y-8 relative z-10"
          >
            {/* Referrer Section */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#e2f6d5] text-[#70cf36] text-xs md:text-sm font-black shrink-0">1</span>
                Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input required type="text" name="referrerName" placeholder="Your Full Name" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all text-sm md:text-base" />
                <input required type="email" name="referrerEmail" placeholder="Your Work Email" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all text-sm md:text-base" />
                <input required type="text" name="referrerCompany" placeholder="Your Company Name" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all text-sm md:text-base md:col-span-2" />
                
                <div className="md:col-span-2 mt-1 md:mt-2">
                  <label htmlFor="rewardChoice" className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Choose Your Reward (Upon successful contract)</label>
                  <div className="relative">
                    <select id="rewardChoice" name="rewardChoice" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all appearance-none font-medium text-gray-700 text-sm md:text-base pr-10">
                      <option value="account-credit">$250 Account Credit (Applied to next invoice)</option>
                      <option value="gift-card">$150 Visa/Amazon Gift Card (For you)</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-100" />

            {/* Referee Section */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#e2f6d5] text-[#70cf36] text-xs md:text-sm font-black shrink-0">2</span>
                Who are you referring?
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">They will receive an email offering $250 off their first month of service, mentioning you as the referrer.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input required type="text" name="refereeName" placeholder="Colleague's Name" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all text-sm md:text-base" />
                <input required type="email" name="refereeEmail" placeholder="Colleague's Work Email" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all text-sm md:text-base" />
                <input required type="text" name="refereeCompany" placeholder="Colleague's Company Name" onChange={handleChange} className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] focus:ring-2 focus:ring-[#70cf36]/20 transition-all text-sm md:text-base md:col-span-2" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 md:py-5 px-6 md:px-8 bg-[#70cf36] hover:bg-[#5eb52a] text-white rounded-xl font-black text-base md:text-lg tracking-wide transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#70cf36]/30"
            >
              {isSubmitting ? "Processing Referral..." : "Submit Referral & Lock In Reward →"}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 md:py-16 text-center relative z-10"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#e2f6d5] text-[#70cf36] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4">Referral Sent Successfully!</h3>
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto px-4">We&apos;ll reach out to your colleague shortly. Once they complete their first month of service, your reward will be instantly unlocked.</p>
            <button onClick={() => setIsSuccess(false)} className="mt-6 md:mt-8 text-[#70cf36] font-bold hover:underline text-sm md:text-base">Submit another referral</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
