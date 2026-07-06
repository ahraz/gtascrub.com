"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
}

const stats: Stat[] = [
  { label: "Cleans Completed", value: 5000, suffix: "+" },
  { label: "Customer Satisfaction", value: 99, suffix: "%" },
  { label: "Average Rating", value: 4.9, suffix: "", decimals: 1 },
  { label: "Years in Business", value: 7, suffix: "+" },
];

const AnimatedNumber = ({ value, suffix, decimals = 0 }: { value: number, suffix: string, decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const duration = 2500; // 2.5 seconds counting duration

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutExpo for a premium deceleration effect
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplayValue(easeProgress * value);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums font-black text-[#0e0f0c]">
      {displayValue.toFixed(decimals)}<span className="text-[#70cf36]">{suffix}</span>
    </span>
  );
};

export default function AnimatedStats() {
  return (
    <section className="py-16 md:py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-3 flex items-center justify-center">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </h3>
              <p className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
