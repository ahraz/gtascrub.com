"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200" aria-label="Main navigation">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand-ink tracking-tight">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#70cf36"/><path d="M16 6l2.2 4.8L23 13l-4.8 2.2L16 20l-2.2-4.8L9 13l4.8-2.2L16 6z" fill="#0e0f0c"/></svg>
          GTA Scrub
        </Link>
        <button onClick={toggle} className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5" aria-expanded={open} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-brand-ink rounded-full transition-all duration-300" style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}></span>
          <span className="block w-6 h-0.5 bg-brand-ink rounded-full transition-all duration-300" style={{ opacity: open ? 0 : 1 }}></span>
          <span className="block w-6 h-0.5 bg-brand-ink rounded-full transition-all duration-300" style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}></span>
        </button>
        <ul className={`${open ? "flex" : "hidden"} md:flex absolute md:relative top-20 md:top-auto left-0 right-0 md:flex-row flex-col bg-white md:bg-transparent border-b md:border-none border-gray-200 p-4 md:p-0 gap-2 md:items-center shadow-md md:shadow-none`} id="nav-links">
          <li><Link href="/" onClick={close} className="block px-4 py-2 text-sm font-bold text-brand-ink bg-gray-100 rounded-full transition-colors">Home</Link></li>
          <li><Link href="/services" onClick={close} className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-ink hover:bg-gray-50 rounded-full transition-colors">Services</Link></li>
          <li><Link href="/about" onClick={close} className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-ink hover:bg-gray-50 rounded-full transition-colors">About</Link></li>
          <li><Link href="/blog" onClick={close} className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-ink hover:bg-gray-50 rounded-full transition-colors">Blog</Link></li>
          <li><Link href="/contact" onClick={close} className="block ml-0 md:ml-2 px-6 py-2.5 bg-brand hover:bg-brand-active text-brand-ink text-sm font-bold rounded-full shadow-sm transition-transform hover:-translate-y-0.5 text-center">Book Now →</Link></li>
        </ul>
      </div>
    </nav>
  );
}
