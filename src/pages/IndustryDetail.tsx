import { useLocation, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Check, MessageCircle, Phone, Zap, ArrowRight, Star, Clock,
  ChevronRight, Share2, Smartphone, QrCode, ShieldCheck, Sparkles
} from "lucide-react";
import Seo from "@/components/Seo";
import { getIndustryBySlug, industries } from "@/data/industries";

const trust = [
  { icon: Clock, label: "24-Hour Delivery" },
  { icon: Star, label: "4.9/5 Rated" },
  { icon: Share2, label: "Unlimited Sharing" },
  { icon: Smartphone, label: "Works on All Phones" },
];

export default function IndustryDetail() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, "");
  const ind = getIndustryBySlug(slug);

  if (!ind) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Seo noindex title="Industry Not Found" description="This industry page could not be found." path={pathname} />
        <h1 className="text-2xl font-bold text-[#0a2b4a] mb-2">Industry Not Found</h1>
        <Link to="/industries" className="text-[#ff8309] font-semibold">Browse all industries</Link>
      </div>
    );
  }

  const Icon = ind.icon;
  const idx = industries.findIndex((i) => i.slug === ind.slug);
  const related = [...industries.slice(idx + 1), ...industries.slice(0, idx)].slice(0, 3);

  return (
    <div>
      <Seo
        title={ind.metaTitle}
        description={ind.metaDescription}
        keywords={ind.keywords}
        path={`/${ind.slug}`}
      />

      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888] flex items-center flex-wrap gap-1">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span>/</span>
            <Link to="/industries" className="text-[#ff8309] hover:underline">Industries</Link><span>/</span>
            <span className="text-[#0a2b4a]">{ind.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#ff8309]/10 blur-2xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 relative">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${ind.color} mb-4`}>
                <Icon size={15} className="text-white" />
                <span className="text-white text-[11px] font-bold uppercase tracking-widest">{ind.name}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">{ind.h1}</h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-xl">{ind.tagline}</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link to="/pricing" className="btn-orange text-center text-sm">Get Your Card — from ₹99</Link>
                <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-center text-sm flex items-center justify-center gap-2">
                  <MessageCircle size={16} /> Order on WhatsApp
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/50 text-xs">
                {trust.map((t) => (
                  <span key={t.label} className="flex items-center gap-1.5"><t.icon size={13} className="text-[#ff8309]" /> {t.label}</span>
                ))}
              </div>
            </motion.div>

            {/* Answer block card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#ff8309]" />
                <span className="text-white font-bold text-sm">Quick answer</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{ind.answer}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro + Features */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 max-w-2xl mx-auto">
            <span className="badge-orange mb-3">Features</span>
            <h2 className="section-title mt-3">What Your <span>{ind.profession}</span> Card Includes</h2>
            <p className="text-[#888] text-sm mt-3 leading-relaxed">{ind.intro}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ind.features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[#f8f7f7] rounded-2xl p-5 border border-transparent hover:border-[#ff8309]/20 hover:shadow-md transition-all">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ind.color} flex items-center justify-center mb-3`}>
                  <Check size={18} className="text-white" />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-[#888] text-[13px] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why + use case */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-orange mb-3">Why It Works</span>
            <h2 className="section-title mt-3 mb-5">Why {ind.profession} <span>Choose MyCarda</span></h2>
            <ul className="space-y-3">
              {ind.whyPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ff8309]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={13} className="text-[#ff8309]" />
                  </span>
                  <span className="text-[#444] text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <QrCode size={18} className="text-[#ff8309]" />
              <h3 className="text-[#0a2b4a] font-bold text-sm">Real-world example</h3>
            </div>
            <p className="text-[#555] text-sm leading-relaxed mb-5">{ind.useCase}</p>
            <div className="flex flex-wrap gap-2">
              <Link to="/pdf-card-samples" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0a2b4a] text-white text-xs font-bold hover:bg-[#103558] transition-all">
                View Design Samples <ArrowRight size={14} />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f8f7f7] text-[#0a2b4a] text-xs font-bold hover:bg-gray-100 transition-all">
                How It Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">{ind.profession} Card <span>Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {ind.faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[#f8f7f7] rounded-xl p-5">
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1.5">{f.q}</h3>
                <p className="text-[#555] text-[13px] leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related industries */}
      <section className="py-12 bg-[#f8f7f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-bold text-[#0a2b4a] text-center mb-6">PDF Cards for Other Professions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <Link key={r.slug} to={`/${r.slug}`} className="group bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:border-[#ff8309]/30 hover:shadow-md transition-all">
                  <span className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                    <RIcon size={18} className="text-white" />
                  </span>
                  <span className="text-[#0a2b4a] font-bold text-[13px] group-hover:text-[#ff8309] transition-colors flex-1">{r.name}</span>
                  <ChevronRight size={16} className="text-[#ccc] group-hover:text-[#ff8309] transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ShieldCheck size={32} className="text-[#ff8309] mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Get Your {ind.profession} Card?</h2>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">One-time payment from ₹99. Delivered in 24 hours. Join 12,500+ professionals already using MyCarda.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/pricing" className="btn-orange flex items-center gap-2"><Zap size={16} /> View Pricing</Link>
              <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a href="tel:+919517722444" className="hidden sm:inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors">
                <Phone size={15} /> +91 95177-22444
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema: Service + FAQPage + BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": ind.metaTitle,
        "description": ind.metaDescription,
        "provider": { "@type": "Organization", "name": "MyCarda", "url": "https://mycarda.com" },
        "areaServed": "IN",
        "serviceType": `PDF digital business card for ${ind.profession}`,
        "url": `https://mycarda.com/${ind.slug}`,
        "offers": { "@type": "Offer", "price": "99", "priceCurrency": "INR" },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": ind.faqs.map((f) => ({
          "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mycarda.com/" },
          { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://mycarda.com/industries" },
          { "@type": "ListItem", "position": 3, "name": ind.name, "item": `https://mycarda.com/${ind.slug}` },
        ],
      })}} />
    </div>
  );
}
