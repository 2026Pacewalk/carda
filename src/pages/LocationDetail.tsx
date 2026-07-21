import { useLocation, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Check, MessageCircle, Phone, Zap, ArrowRight, Star, Clock,
  ChevronRight, Share2, Smartphone, MapPin, Sparkles, Navigation, Building2
} from "lucide-react";
import Seo from "@/components/Seo";
import { getLocationBySlug, locations } from "@/data/locations";
import { industries } from "@/data/industries";

const trust = [
  { icon: Clock, label: "24-Hour Delivery" },
  { icon: Star, label: "4.9/5 Rated" },
  { icon: Share2, label: "Unlimited Sharing" },
  { icon: Smartphone, label: "Works on All Phones" },
];

// Best-effort map a profession label to an industry landing page for internal linking.
function industryFor(profession: string): string {
  const p = profession.toLowerCase();
  const hit = industries.find((ind) => {
    const key = ind.profession.toLowerCase().split(/\s|&/)[0];
    return p.includes(key) || key.includes(p.split(/\s|&/)[0]);
  });
  return hit ? `/${hit.slug}` : "/industries";
}

export default function LocationDetail() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, "");
  const loc = getLocationBySlug(slug);

  if (!loc) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Seo noindex title="Location Not Found" description="This location page could not be found." path={pathname} />
        <h1 className="text-2xl font-bold text-[#0a2b4a] mb-2">Location Not Found</h1>
        <Link to="/" className="text-[#ff8309] font-semibold">Back to Home</Link>
      </div>
    );
  }

  // Rotate through the list so every city links to (and is linked from) others — no orphans.
  const idx = locations.findIndex((l) => l.slug === loc.slug);
  const related = [...locations.slice(idx + 1), ...locations.slice(0, idx)].slice(0, 3);

  return (
    <div>
      <Seo
        title={loc.metaTitle}
        description={loc.metaDescription}
        keywords={loc.keywords}
        path={`/${loc.slug}`}
      />

      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888] flex items-center flex-wrap gap-1">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span>/</span>
            <span className="text-[#0a2b4a]">{loc.city}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#ff8309]/10 blur-2xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 relative">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff8309]/15 mb-4">
                <MapPin size={14} className="text-[#ff8309]" />
                <span className="text-[#ff8309] text-[11px] font-bold uppercase tracking-widest">{loc.city} · {loc.region}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">{loc.h1}</h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-xl">{loc.tagline}</p>
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

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#ff8309]" />
                <span className="text-white font-bold text-sm">Quick answer</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{loc.answer}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro + Features */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 max-w-2xl mx-auto">
            <span className="badge-orange mb-3">Features</span>
            <h2 className="section-title mt-3">PDF Business Cards for <span>{loc.city}</span> Professionals</h2>
            <p className="text-[#888] text-sm mt-3 leading-relaxed">{loc.intro}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loc.features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[#f8f7f7] rounded-2xl p-5 border border-transparent hover:border-[#ff8309]/20 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center mb-3">
                  <Check size={18} className="text-white" />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-[#888] text-[13px] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served + why */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-3">
              <Navigation size={18} className="text-[#ff8309]" />
              <h2 className="text-xl font-extrabold text-[#0a2b4a]">Areas We Serve in {loc.city}</h2>
            </div>
            <p className="text-[#888] text-sm mb-4">Digital delivery means we serve professionals across all of {loc.city}, including:</p>
            <div className="flex flex-wrap gap-2">
              {loc.areas.map((a) => (
                <span key={a} className="px-3 py-1.5 bg-white rounded-full text-[13px] text-[#0a2b4a] border border-gray-100 shadow-sm">{a}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={18} className="text-[#ff8309]" />
              <h2 className="text-xl font-extrabold text-[#0a2b4a]">Popular With {loc.city} Professionals</h2>
            </div>
            <p className="text-[#888] text-sm mb-4">Tap your profession to see an industry-specific card:</p>
            <div className="flex flex-wrap gap-2">
              {loc.professions.map((p) => (
                <Link key={p} to={industryFor(p)} className="px-3 py-1.5 bg-white rounded-full text-[13px] text-[#0a2b4a] border border-gray-100 shadow-sm hover:border-[#ff8309]/40 hover:text-[#ff8309] transition-all">{p}</Link>
              ))}
            </div>
            <ul className="mt-6 space-y-2.5">
              {loc.whyPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ff8309]/15 flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={13} className="text-[#ff8309]" /></span>
                  <span className="text-[#444] text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Use case */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#555] text-sm md:text-base leading-relaxed italic border-l-4 border-[#ff8309] bg-[#f8f7f7] rounded-r-xl p-5 text-left">{loc.useCase}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">{loc.city} <span>Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {loc.faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1.5">{f.q}</h3>
                <p className="text-[#555] text-[13px] leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related cities */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-bold text-[#0a2b4a] text-center mb-6">PDF Business Cards in Other Cities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/${r.slug}`} className="group bg-[#f8f7f7] rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-all">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </span>
                <span className="text-[#0a2b4a] font-bold text-[13px] group-hover:text-[#ff8309] transition-colors flex-1">{r.city}</span>
                <ChevronRight size={16} className="text-[#ccc] group-hover:text-[#ff8309] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <MapPin size={32} className="text-[#ff8309] mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Get Your PDF Card in {loc.city} Today</h2>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">One-time payment from ₹99. Delivered within 24 hours, anywhere in {loc.city}. Join 12,500+ professionals on MyCarda.</p>
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

      {/* Schema: Service (areaServed) + FAQPage + BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": loc.metaTitle,
        "description": loc.metaDescription,
        "provider": { "@type": "Organization", "name": "MyCarda", "url": "https://mycarda.com" },
        "areaServed": { "@type": "City", "name": loc.city },
        "serviceType": "PDF digital business card",
        "url": `https://mycarda.com/${loc.slug}`,
        "offers": { "@type": "Offer", "price": "99", "priceCurrency": "INR" },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": loc.faqs.map((f) => ({
          "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mycarda.com/" },
          { "@type": "ListItem", "position": 2, "name": loc.city, "item": `https://mycarda.com/${loc.slug}` },
        ],
      })}} />
    </div>
  );
}
