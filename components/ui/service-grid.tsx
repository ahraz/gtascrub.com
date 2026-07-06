"use client";

import { motion } from "framer-motion";

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

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {services.map((service, index) => (
              <motion.a
                key={index}
                href={service.href}
                className="group flex flex-col items-center justify-start gap-4 text-center cursor-pointer outline-none"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Image Container - Strictly constrained to make a perfect circle */}
                <div className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md overflow-visible">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} service icon`}
                    className="w-full h-full object-cover rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  />
                </div>
                
                {/* Text Label */}
                <span className="text-sm sm:text-base font-bold text-gray-800 transition-colors duration-300 group-hover:text-[#70cf36]">
                  {service.name}
                </span>
              </motion.a>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
