import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog — GTA Scrub Commercial Cleaning",
  description: "Expert insights on commercial cleaning, office hygiene, and facility management across the GTA.",
};

export default function BlogPage() {
  return (
    <>
      <section className="py-24 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Blog</span><h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">Our Blog</h1><p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Expert insights on commercial cleaning, office hygiene, and facility management.</p></div></div></section>
      <section className="py-16 bg-white"><div className="container mx-auto px-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="h-44 overflow-hidden">
              <img src={post.heroImage} alt={post.heroH1} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-400 mb-2">{post.publishDate} &middot; {post.readTime}</p>
              <h3 className="text-lg font-bold text-brand-ink mb-2 line-clamp-2">{post.heroH1}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{post.seoDescription}</p>
              <span className="inline-flex items-center gap-1 font-semibold text-brand-ink mt-4 group-hover:text-[#70cf36] transition-colors">Read More →</span>
            </div>
          </Link>
        ))}
      </div></div></section>
    </>
  );
}
