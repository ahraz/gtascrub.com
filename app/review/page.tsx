"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const GOOGLE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=0xfdd53a0790dc6b22";

export default function ReviewFunnel() {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating >= 4) {
      setTimeout(() => {
        window.open(GOOGLE_REVIEW_LINK, "_blank");
      }, 800);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("https://formspree.io/f/mvzjyrrw", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        type: "INTERNAL COMPLAINT (1-3 Stars)",
        rating: rating,
        feedback: feedback,
      }),
    });

    if (response.ok) {
      setIsSuccess(true);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20 absolute inset-0 z-[100]">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 text-center">
        <Link href="/" className="inline-block mb-8 text-2xl font-black text-gray-900 tracking-tighter">
          GTA <span className="text-[#70cf36]">Scrub</span>
        </Link>

        <AnimatePresence mode="wait">
          {!rating && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-black text-gray-900 mb-4">How did we do?</h1>
              <p className="text-gray-500 mb-8 text-lg">
                Please rate your recent commercial cleaning experience with our team.
              </p>

              <div className="flex justify-center gap-2 md:gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <FaStar
                      className={`w-12 h-12 md:w-16 md:h-16 transition-colors duration-200 ${
                        (hoveredRating || rating || 0) >= star
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {rating !== null && rating >= 4 && (
            <motion.div
              key="step-google"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8"
            >
              <div className="w-20 h-20 bg-green-50 text-[#70cf36] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Thank you for the {rating} stars!</h2>
              <p className="text-gray-600 mb-8">
                As a local Brampton business, Google reviews mean the world to us. We are redirecting you to Google to share your experience...
              </p>
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-4 px-8 bg-[#70cf36] hover:bg-[#5eb52a] text-white rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-[#70cf36]/30"
              >
                Click here if not redirected
              </a>
            </motion.div>
          )}

          {rating !== null && rating <= 3 && !isSuccess && (
            <motion.div
              key="step-feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-2">We want to make it right.</h2>
              <p className="text-gray-500 mb-6">
                You selected {rating} {rating === 1 ? "star" : "stars"}. Please let us know what went wrong so our management team can fix it immediately.
              </p>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#70cf36] transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Feedback directly to Management"}
                </button>
              </form>
            </motion.div>
          )}

          {isSuccess && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <div className="w-20 h-20 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Feedback Received.</h3>
              <p className="text-gray-600">
                Thank you for your honesty. Our management team has been notified and we will review this immediately to ensure it does not happen again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
