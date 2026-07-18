import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories, searchPosts } from '../data/blogPosts';
import { Search, Clock, Calendar, TrendingUp, ChevronRight, MessageCircle, X } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const featured = sortedPosts[0];
  const trending = sortedPosts.slice(1, 4);
  const rest = sortedPosts.slice(1);

  const filteredPosts = useMemo(() => {
    let posts = rest;
    if (activeCategory !== 'All') {
      posts = posts.filter((p: typeof blogPosts[0]) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery).filter(p => p.slug !== featured.slug);
    }
    return posts;
  }, [activeCategory, searchQuery, rest, featured.slug]);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Blog</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">PDF Digital Business Card Blog</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-8">
              Tips, guides, and insights about PDF digital business cards for Indian professionals.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309] focus:bg-white/15 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === 'All' ? 'bg-[#ff8309] text-white' : 'bg-white text-[#0a2b4a] border border-gray-200 hover:border-[#ff8309]'}`}>
              All
            </button>
            {blogCategories.map((cat: string) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? 'bg-[#ff8309] text-white' : 'bg-white text-[#0a2b4a] border border-gray-200 hover:border-[#ff8309]'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured + Trending */}
          {!searchQuery && activeCategory === 'All' && (
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5 mb-10">
              {/* Featured */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Link to={`/blog/${featured.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all h-full">
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center relative overflow-hidden">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#ff8309] text-white rounded-full text-[10px] font-bold uppercase">Featured</span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <span className="text-[11px] text-[#ff8309] font-bold uppercase">{featured.category}</span>
                    <h2 className="text-lg md:text-xl font-bold text-[#0a2b4a] mt-1 mb-2 group-hover:text-[#ff8309] transition-colors">{featured.title}</h2>
                    <p className="text-sm text-[#555] leading-relaxed mb-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#aaa]">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {featured.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {featured.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Trending */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-[#ff8309]" />
                  <h3 className="text-sm font-bold text-[#0a2b4a]">Trending Now</h3>
                </div>
                {trending.map((post, i) => (
                  <motion.div key={post.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <Link to={`/blog/${post.slug}`} className="flex gap-3 group">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-70" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#ff8309] font-bold uppercase">{post.category}</span>
                        <h4 className="text-sm font-bold text-[#0a2b4a] group-hover:text-[#ff8309] transition-colors line-clamp-2 leading-snug">{post.title}</h4>
                        <span className="text-[10px] text-[#aaa] flex items-center gap-1 mt-1"><Clock size={10} /> {post.readTime}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* WhatsApp CTA */}
                <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-green-500 rounded-xl text-white hover:bg-green-600 transition-all mt-2">
                  <MessageCircle size={18} />
                  <div>
                    <p className="text-xs font-bold">Need a PDF Card?</p>
                    <p className="text-[10px] text-white/70">Chat with us on WhatsApp</p>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Post Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
                    <div className="aspect-[16/9] bg-gradient-to-br from-[#0a2b4a] to-[#103558] overflow-hidden relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-white/90 text-[#0a2b4a] rounded-full text-[9px] font-bold uppercase">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-[#0a2b4a] group-hover:text-[#ff8309] transition-colors mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-[#888] line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[10px] text-[#aaa]">
                        <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                        <span className="flex items-center gap-1 text-[#ff8309] font-medium">Read <ChevronRight size={10} /></span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#888] text-sm">No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "MyCarda Blog - PDF Digital Business Cards",
        "description": "Tips and guides about PDF digital business cards for Indian professionals",
        "url": "https://mycarda.com/blog",
        "blogPost": sortedPosts.slice(0, 6).map(p => ({
          "@type": "BlogPosting",
          "headline": p.title,
          "description": p.excerpt,
          "datePublished": p.date,
          "url": `https://mycarda.com/blog/${p.slug}`
        }))
      })}} />
    </div>
  );
}
