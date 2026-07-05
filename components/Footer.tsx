import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 bg-brand-ink text-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-white mb-4">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#70cf36"/><path d="M16 6l2.2 4.8L23 13l-4.8 2.2L16 20l-2.2-4.8L9 13l4.8-2.2L16 6z" fill="#0e0f0c"/></svg>
            GTA Scrub
          </Link>
          <p className="text-sm leading-relaxed">Photo-verified commercial cleaning across the GTA. Insured, bonded, and trusted by 500+ businesses.</p>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
          <Link href="/" className="block mb-3 hover:text-white transition-colors">Home</Link>
          <Link href="/services" className="block mb-3 hover:text-white transition-colors">Services</Link>
          <Link href="/about" className="block mb-3 hover:text-white transition-colors">About Us</Link>
          <Link href="/blog" className="block mb-3 hover:text-white transition-colors">Blog</Link>
          <Link href="/faq" className="block mb-3 hover:text-white transition-colors">FAQ</Link>
          <Link href="/contact" className="block mb-3 hover:text-white transition-colors">Contact</Link>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Services</h4>
          <Link href="/office-cleaning-gta" className="block mb-3 hover:text-white transition-colors">Office Cleaning</Link>
          <Link href="/medical-office-cleaning-gta" className="block mb-3 hover:text-white transition-colors">Medical Cleaning</Link>
          <Link href="/post-construction-cleaning-gta" className="block mb-3 hover:text-white transition-colors">Post-Construction</Link>
          <Link href="/warehouse-cleaning-gta" className="block mb-3 hover:text-white transition-colors">Warehouse Cleaning</Link>
          <Link href="/window-cleaning-gta" className="block mb-3 hover:text-white transition-colors">Window Cleaning</Link>
          <Link href="/carpet-cleaning-gta" className="block mb-3 hover:text-white transition-colors">Carpet Cleaning</Link>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Contact Us</h4>
          <a href="tel:+12892770213" className="block mb-3 hover:text-white transition-colors">+1 (289) 277-0213</a>
          <a href="mailto:info@gtascrub.com" className="block mb-3 hover:text-white transition-colors">info@gtascrub.com</a>
          <span className="block mb-3 text-gray-400">20 Glenfield Cres<br/>Brampton, ON L6S1W2</span>
          <Link href="/service-areas" className="block mb-3 hover:text-white transition-colors">Serving all 14 GTA cities</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} GTA Scrub. All rights reserved.</p>
        <p className="text-sm">Licensed &amp; Insured in Ontario</p>
      </div>
    </footer>
  );
}
