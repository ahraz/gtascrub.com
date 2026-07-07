"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Refer & Earn", href: "/referrals" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Review Us", href: "/review" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          <img src="/images/gtascrub.png" alt="GTA Scrub" className="w-8 h-8 rounded-lg object-contain" />
          GTA Scrub
        </Link>
        <button onClick={toggle} className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5" aria-expanded={open} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-brand-ink rounded-full transition-all duration-300" style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}></span>
          <span className="block w-6 h-0.5 bg-brand-ink rounded-full transition-all duration-300" style={{ opacity: open ? 0 : 1 }}></span>
          <span className="block w-6 h-0.5 bg-brand-ink rounded-full transition-all duration-300" style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}></span>
        </button>
        <ul className={`${open ? "flex" : "hidden"} md:flex absolute md:relative top-20 md:top-auto left-0 right-0 md:flex-row flex-col bg-white md:bg-transparent border-b md:border-none border-gray-200 p-4 md:p-0 gap-2 md:items-center shadow-md md:shadow-none`} id="nav-links">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={close}
                  className={`block px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive
                      ? "bg-gray-100 text-black font-bold"
                      : "text-gray-600 hover:text-black hover:bg-gray-50 font-semibold"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li><Link href="/contact" onClick={close} className="block ml-0 md:ml-2 px-6 py-2.5 bg-brand hover:bg-brand-active text-brand-ink text-sm font-bold rounded-full shadow-sm transition-transform hover:-translate-y-0.5 text-center">Book Now →</Link></li>
        </ul>
      </div>
    </nav>
  );
}
