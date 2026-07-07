import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blogPosts";
import PricingCalculator from "@/components/PricingCalculator";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.seoDescription,
    alternates: { canonical: `https://gtascrub.com/blog/${post.slug}` },
  };
}

const relatedPosts = blogPosts;

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-28 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="inline-block text-sm font-bold text-brand-ink bg-brand-pale px-5 py-2 rounded-full mb-5 border border-brand/20">Blog</span>
          <h1 className="text-4xl lg:text-5xl font-black text-brand-ink tracking-tight max-w-3xl mx-auto leading-[1.1] mb-6">{post.heroH1}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
            <span>{post.publishDate}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>{post.readTime}</span>
          </div>
          <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-lg">
            <img src={post.heroImage} alt={post.heroH1} className="w-full h-72 sm:h-96 object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="py-16 bg-white"><div className="container mx-auto px-6 max-w-3xl">
        {post.sections.map((section, i) => (
          <div key={i} className="mb-12">
            {section.heading && (
              <h2 className="text-2xl lg:text-3xl font-black text-brand-ink mb-6 leading-tight">{section.heading}</h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-gray-700 leading-relaxed mb-5 text-lg">{p}</p>
            ))}
          </div>
        ))}
      </div></article>

      {/* ── Pricing Calculator CTA ── */}
      <PricingCalculator />

      {/* ── Related Articles ── */}
      <section className="py-20 bg-gray-50"><div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-brand-ink tracking-tight">More Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {relatedPosts.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-44 overflow-hidden">
                <img src={p.heroImage} alt={p.heroH1} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">{p.publishDate} &middot; {p.readTime}</p>
                <h3 className="font-bold text-brand-ink mb-2 line-clamp-2">{p.heroH1}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{p.seoDescription}</p>
                <span className="inline-flex items-center gap-1 font-semibold text-brand-ink text-sm mt-4 group-hover:text-[#70cf36] transition-colors">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div></section>

      {/* ── CTA ── */}
      <section className="py-24 bg-brand-ink text-center"><div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-brand mb-6">Ready to Transform Your Space?</h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Get your free quote within 2 hours. Most replies within 30 minutes.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="bg-brand text-brand-ink px-8 py-4 rounded-2xl font-bold inline-block hover:bg-brand-active transition-colors shadow-lg shadow-brand/30">Book Online</Link>
          <a href="tel:+12892770213" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold inline-block hover:bg-white/20 transition-colors">Call +1 (289) 277-0213</a>
        </div>
      </div></section>
    </>
  );
}
