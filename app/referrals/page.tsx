import { Metadata } from "next";
import ReferralForm from "@/components/ReferralForm";

export const metadata: Metadata = {
  title: "Partner Referral Program | GTA Scrub",
  description: "Refer a business in the GTA to GTA Scrub and earn up to a $250 account credit or $150 gift card when they sign a commercial cleaning contract.",
};

export default function ReferralsPage() {
  return (
    <main className="min-h-screen pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Copy */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8 lg:sticky lg:top-32">
          <span className="inline-block bg-[#e2f6d5] text-[#163300] font-bold px-4 py-2 rounded-full text-sm tracking-wider uppercase">Partner Program</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0e0f0c] tracking-tight leading-tight">
            Great Businesses <br className="hidden sm:block"/>Know Great Businesses.
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Help your network elevate their workspace standards. Refer a clinic, office, or facility to GTA Scrub, and we&apos;ll reward both of you when they sign a recurring contract.
          </p>
          
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 text-[#70cf36] font-black text-xl">1</div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Submit a Warm Intro</h4>
                <p className="text-gray-500 mt-1">Enter your colleague&apos;s details. We&apos;ll send them a polite email offering $250 off their first month.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 text-[#70cf36] font-black text-xl">2</div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">They Get Premium Cleaning</h4>
                <p className="text-gray-500 mt-1">We walk their facility, provide a customized quote, and execute our CleanCheck protocol.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 text-[#70cf36] font-black text-xl">3</div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">You Get Rewarded</h4>
                <p className="text-gray-500 mt-1">Once they complete 30 days of service, your $250 Account Credit or $150 Gift Card is instantly unlocked.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <ReferralForm />
        </div>
      </div>
    </main>
  );
}
