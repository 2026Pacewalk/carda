import { useParams, Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPostBySlug, blogPosts, getRecentPosts } from '../data/blogPosts';
import type { BlogPost as BlogPostType } from '../data/blogPosts';
import { Share2, Copy, Check, ChevronRight, Clock, Calendar, User, MessageCircle } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const post = getPostBySlug(slug || '');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#0a2b4a] mb-2">Blog Post Not Found</h1>
        <Link to="/blog" className="text-[#ff8309] font-medium">Back to Blog</Link>
      </div>
    );
  }

  const recentPosts = getRecentPosts(post.slug, 5);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts: BlogPostType[] = (post.relatedSlugs || [])
    .map((s: string) => blogPosts.find((p: BlogPostType) => p.slug === s))
    .filter((p): p is BlogPostType => p !== undefined)
    .slice(0, 3);

  const tocItems = post.tableOfContents || [];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888] flex items-center flex-wrap gap-1">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="text-[#ff8309] hover:underline">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-[#0a2b4a] truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#ff8309] rounded-full text-white text-[13px] font-bold">{post.category}</span>
              <span className="flex items-center gap-1 text-white/50 text-[13px]"><Clock size={12} /> {post.readTime}</span>
              <span className="flex items-center gap-1 text-white/50 text-[13px]"><Calendar size={12} /> {post.date}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff8309] flex items-center justify-center text-white font-bold">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.author}</p>
                <p className="text-[13px] text-white/50">PDF Business Card Expert</p>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-white text-xs hover:bg-white/20 transition-all">
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy Link'}
                </button>
                <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 rounded-lg text-green-400 text-xs hover:bg-green-500/30 transition-all">
                  <Share2 size={13} /> Share
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8">
            <div>
              {/* Article */}
              <article className="prose-blog">
                <div className="text-sm text-[#555] leading-relaxed whitespace-pre-line mb-8">{post.content}</div>
                {tocItems.length > 0 && (
                  <div className="space-y-6">
                    {tocItems.map((section, i: number) => (
                      <div key={i} className="mb-6">
                        <h2 id={`section-${i}`} className="text-xl font-bold text-[#0a2b4a] mb-3 scroll-mt-24">{section.title}</h2>
                        {section.h3s?.map((h3: string, j: number) => (
                          <div key={j} className="mt-4">
                            <h3 className="text-base font-bold text-[#0a2b4a] mb-2">{h3}</h3>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </article>

              {/* Author */}
              <div className="mt-10 flex items-center gap-4 bg-[#f8f7f7] rounded-xl p-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0a2b4a]">{post.author}</p>
                  <p className="text-[13px] text-[#888]">Expert in digital business cards and professional networking solutions for Indian businesses.</p>
                </div>
              </div>

              {/* FAQ */}
              {(post.faqs || []).length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-xl font-bold text-[#0a2b4a] mb-5">Frequently Asked Questions</h2>
                  <div className="space-y-2">
                    {(post.faqs || []).map((faq: { q: string; a: string }, i: number) => (
                      <div key={i} className="bg-[#f8f7f7] rounded-xl p-4">
                        <h3 className="text-sm font-bold text-[#0a2b4a] mb-1.5">Q: {faq.q}</h3>
                        <p className="text-xs text-[#555] leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 bg-gradient-to-r from-[#0a2b4a] to-[#103558] rounded-xl p-5 md:p-6">
                <h3 className="text-white font-bold text-lg mb-2">Ready to Create Your PDF Business Card?</h3>
                <p className="text-white/60 text-sm mb-4">Professional, interactive, and shareable. Starting at just Rs 99.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link to="/pricing" className="btn-orange text-center">View Pricing</Link>
                  <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-center flex items-center justify-center gap-2">
                    <MessageCircle size={14} /> Order on WhatsApp
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-lg font-bold text-[#0a2b4a] mb-4">Related Articles</h2>
                  <div className="space-y-3">
                    {relatedPosts.map((rp: BlogPostType, i: number) => (
                      <Link key={i} to={`/blog/${rp.slug}`} className="flex gap-3 p-3 bg-[#f8f7f7] rounded-xl hover:bg-gray-100 transition-all group">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">{i + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0a2b4a] group-hover:text-[#ff8309] transition-colors line-clamp-2">{rp.title}</h4>
                          <span className="text-[12px] text-[#aaa]">{rp.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="bg-[#f8f7f7] rounded-xl p-5 lg:sticky lg:top-24">
                <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">Table of Contents</h3>
                <ul className="space-y-1.5">
                  <li>
                    <button onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs text-[#555] hover:text-[#ff8309] transition-colors text-left">FAQ</button>
                  </li>
                  {tocItems.map((section, i: number) => (
                    <li key={i}>
                      <button onClick={() => document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs text-[#555] hover:text-[#ff8309] transition-colors text-left leading-relaxed">{section.title}</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">Recent Posts</h3>
                <div className="space-y-3">
                  {recentPosts.map((rp: BlogPostType, i: number) => (
                    <Link key={i} to={`/blog/${rp.slug}`} className="flex gap-2 group">
                      <ChevronRight size={14} className="text-[#ff8309] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#555] group-hover:text-[#ff8309] transition-colors line-clamp-2">{rp.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">Industries</h3>
                <div className="space-y-1.5">
                  {[
                    { label: 'Doctor PDF Card', path: '/doctor-pdf-business-card' },
                    { label: 'Realtor PDF Card', path: '/realtor-pdf-visiting-card' },
                    { label: 'Lawyer PDF Card', path: '/lawyer-pdf-visiting-card' },
                    { label: 'Salon PDF Card', path: '/salon-pdf-business-card' },
                    { label: 'CA PDF Card', path: '/ca-pdf-business-card' },
                    { label: 'Restaurant PDF Card', path: '/restaurant-pdf-menu-card' },
                    { label: 'Freelancer PDF Card', path: '/freelancer-pdf-business-card' },
                    { label: 'View All Industries', path: '/industries' },
                  ].map((item, i) => (
                    <a key={i} href={item.path} className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#ff8309] transition-colors">
                      <ChevronRight size={10} className="text-[#ff8309] flex-shrink-0" /> {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <Link to="/pricing" className="block bg-gradient-to-r from-[#0a2b4a] to-[#103558] rounded-xl p-4 text-center hover:shadow-lg transition-all group">
                <p className="font-bold text-sm text-white mb-1">Get Your PDF Card</p>
                <p className="text-xs text-white/60 mb-3">Starting at just Rs 99</p>
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#ff8309] group-hover:gap-2 transition-all">View Pricing <ChevronRight size={10} /></span>
              </Link>

              <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-center text-white hover:shadow-lg transition-all">
                <MessageCircle size={24} className="mx-auto mb-2" />
                <p className="font-bold text-sm">Need Help?</p>
                <p className="text-xs text-white/70">Chat with us on WhatsApp</p>
              </a>
            </aside>
          </div>
        </div>
      </section>

      <div id="faq-section" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://mycarda.com${post.image}`,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Organization", "name": post.author },
        "publisher": { "@type": "Organization", "name": "MyCarda", "logo": { "@type": "ImageObject", "url": "https://mycarda.com/images/logo.png" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://mycarda.com/blog/${post.slug}` },
      })}} />
    </div>
  );
}
