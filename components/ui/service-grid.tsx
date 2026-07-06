"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ServiceItem {
  name: string;
  href: string;
  imageUrl: string;
}

interface ServiceGridProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 20, stiffness: 260 },
  },
};

export function ServiceGrid({ title, subtitle, services }: ServiceGridProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">
            What We Clean
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.name} variants={cardVariants}>
              <Link
                href={service.href}
                className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 mb-4 ring-2 ring-gray-100 group-hover:ring-brand/40 transition-all duration-300">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="object-cover rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm md:text-base font-bold text-brand-ink group-hover:text-brand transition-colors">
                  {service.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
