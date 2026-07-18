import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import { Check, MessageCircle, Palette, Eye, ArrowRight } from 'lucide-react';

const categories = ['All', 'Professional', 'Creative', 'Minimal', 'Bold', 'Elegant'];

const samples = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Theme ${i + 1}`,
  category: categories[(i % 5) + 1],
  img: `/images/themes/theme-${i + 1}.jpg`,
}));

const designFeatures = [
  { icon: Palette, title: '50+ Themes', desc: 'Professional designs across 6 categories' },
  { icon: Eye, title: 'Click Preview', desc: 'Hover to preview each design' },
  { icon: Check, title: 'All Customizable', desc: 'Colors, fonts, layout adjusted to your brand' },
  { icon: ArrowRight, title: 'Industry Matched', desc: 'Themes optimized for your profession' },
];

const industrySampleGuides = [
  { industry: 'Doctor', link: '/doctor-pdf-business-card', desc: 'Clean, trustworthy designs with medical-themed layouts' },
  { industry: 'Realtor', link: '/realtor-pdf-visiting-card', desc: 'Premium, professional layouts for property agents' },
  { industry: 'Lawyer', link: '/lawyer-pdf-visiting-card', desc: 'Authoritative, elegant designs for legal professionals' },
  { industry: 'Salon', link: '/salon-pdf-digital-card', desc: 'Stylish, modern themes for beauty professionals' },
  { industry: 'Restaurant', link: '/restaurant-pdf-digital-card', desc: 'Warm, appetizing designs for food businesses' },
  { industry: 'Freelancer', link: '/freelancer-pdf-business-card', desc: 'Creative, portfolio-focused layouts' },
];

const sampleFaqs = [
  { q: 'Can I see a preview of my card before ordering?', a: 'Yes, we always send a preview for your approval before final delivery. You can request changes until you are fully satisfied.' },
  { q: 'Can I use my own design?', a: 'Yes, with our Premium plan you can share your design reference and we will match it. Alternatively, choose from our 50+ professional themes.' },
  { q: 'Do all themes include clickable links?', a: 'Yes, every theme includes clickable call, WhatsApp, email, website, map, and social media links regardless of the design you choose.' },
  { q: 'Can I change my theme after ordering?', a: 'Yes, if we have not started the design yet, you can change your theme. Contact us on WhatsApp to request a change.' },
];

export default function SamplesPage() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const inView2 = useInView(ref2, { once: true, margin: '-60px' });
  const [activeCat, setActiveCat] = useState('All');
  const filtered = activeCat === 'All' ? samples : samples.filter(s => s.category === activeCat);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Samples</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Samples</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">PDF Card Design Samples</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Browse our collection of 50+ professional PDF digital business card design themes. Find the perfect look for your profession.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Features */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {designFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-[#f8f7f7] rounded-xl p-4 text-center">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center mx-auto mb-2">
                  <f.icon size={15} className="text-white" />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-xs mb-0.5">{f.title}</h3>
                <p className="text-[#888] text-[10px]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={ref} className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">Gallery</span>
            <h2 className="section-title mt-3">Browse Our <span>Design Themes</span></h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCat === cat ? 'bg-[#ff8309] text-white' : 'bg-white text-[#0a2b4a] border border-gray-200 hover:border-[#ff8309]'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map((theme, i) => (
              <motion.div key={theme.id} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={theme.img} alt={`PDF business card ${theme.name} - ${theme.category} design theme`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2b4a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div>
                    <p className="text-white font-bold text-xs">{theme.name}</p>
                    <p className="text-white/60 text-[10px]">{theme.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Recommendations */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">Recommendations</span>
            <h2 className="section-title mt-3">Designs by <span>Industry</span></h2>
            <p className="text-[#888] text-sm mt-2 max-w-lg mx-auto">We recommend specific design styles based on your profession.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {industrySampleGuides.map((ind, i) => (
              <motion.a key={i} href={ind.link} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-[#f8f7f7] rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#ff8309] group-hover:to-[#e57400] transition-all">
                  <span className="text-white font-bold text-xs">{ind.industry.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-[#0a2b4a] font-bold text-xs group-hover:text-[#ff8309] transition-colors">{ind.industry} Cards</h3>
                  <p className="text-[#999] text-[10px]">{ind.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Sample FAQs */}
      <section ref={ref2} className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">Sample & Design <span>Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {sampleFaqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-2">{f.q}</h3>
                <p className="text-[#555] text-xs leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-xl mb-1">Love a design you see?</h2>
              <p className="text-white/50 text-sm">Order now and we will create your card in that theme within 24 hours.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link to="/pricing" className="btn-orange">View Pricing</Link>
              <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-all">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "PDF Digital Business Card Design Samples",
        "description": "Browse 50+ professional PDF business card design themes across Professional, Creative, Minimal, Bold, and Elegant categories.",
        "url": "https://mycarda.com/pdf-card-samples"
      })}} />
    </div>
  );
}
