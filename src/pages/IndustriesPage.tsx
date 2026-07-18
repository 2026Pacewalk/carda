import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import {
  Stethoscope, Home, Scissors, Scale, Calculator, UtensilsCrossed,
  Dumbbell, Shield, Briefcase, PartyPopper, MessageCircle,
  Check, Zap, Share2, Smartphone, CreditCard
} from 'lucide-react';

const industries = [
  { icon: Stethoscope, title: 'Doctors & Clinics', desc: 'Interactive cards with appointment booking, clinic timings, consultation fees, and patient contact. Perfect for physicians, dentists, specialists, and diagnostic centers.', link: '/doctor-pdf-business-card', color: 'from-red-500 to-red-600', benefits: ['One-tap appointment booking', 'Clinic location with Google Maps', 'WhatsApp for patient queries', 'Consultation fee QR payment'] },
  { icon: Home, title: 'Real Estate Agents', desc: 'Property listing cards with click-to-call, WhatsApp inquiry, location maps, and RERA details. Ideal for brokers, builders, and property consultants.', link: '/realtor-pdf-visiting-card', color: 'from-blue-500 to-blue-600', benefits: ['Instant property inquiries', 'Office navigation via Maps', 'Broker registration display', 'Site visit scheduling'] },
  { icon: Scissors, title: 'Salons & Spas', desc: 'Beauty cards with service menu, pricing, portfolio photos, and booking links. For hairstylists, beauticians, and wellness centers.', link: '/salon-pdf-digital-card', color: 'from-pink-500 to-pink-600', benefits: ['Service menu display', 'Appointment booking', 'Portfolio showcase', 'Package pricing'] },
  { icon: Scale, title: 'Lawyers & Advocates', desc: 'Professional cards with chamber address, court details, area of practice, and consultation booking. For attorneys and legal firms.', link: '/lawyer-pdf-visiting-card', color: 'from-amber-500 to-amber-600', benefits: ['Chamber location map', 'Area of practice listed', 'Consultation fee QR', 'WhatsApp legal queries'] },
  { icon: Calculator, title: 'CA & Tax Consultants', desc: 'Finance cards with service listing, ICAI details, and consultation booking. For chartered accountants, tax advisors, and auditors.', link: '/ca-pdf-business-card', color: 'from-emerald-500 to-emerald-600', benefits: ['Service catalog display', 'ICAI registration', 'Tax filing consultation', 'Payment collection QR'] },
  { icon: UtensilsCrossed, title: 'Restaurants & Cafes', desc: 'Menu cards with food photos, location, table booking, and online ordering links. For hotels, caterers, and cloud kitchens.', link: '/restaurant-pdf-digital-card', color: 'from-orange-500 to-orange-600', benefits: ['Menu highlights', 'Table reservation', 'Order via WhatsApp', 'Delivery location map'] },
  { icon: Dumbbell, title: 'Gyms & Fitness Trainers', desc: 'Fitness cards with membership plans, class schedules, transformation photos, and trial booking. For gyms, yoga studios, and personal trainers.', link: '/gym-pdf-business-card', color: 'from-cyan-500 to-cyan-600', benefits: ['Membership plans', 'Class schedules', 'Before/after photos', 'Free trial booking'] },
  { icon: Shield, title: 'Insurance Agents', desc: 'Policy cards with company details, policy types, and claim assistance contact. For LIC agents, health insurance, and motor insurance advisors.', link: '/insurance-agent-pdf-card', color: 'from-indigo-500 to-indigo-600', benefits: ['Policy types listed', 'Claim assistance number', 'Premium calculator link', 'Document collection'] },
  { icon: Briefcase, title: 'Freelancers', desc: 'Portfolio cards with skill showcase, work samples, rates, and client testimonials. For designers, developers, writers, and consultants.', link: '/freelancer-pdf-business-card', color: 'from-violet-500 to-violet-600', benefits: ['Portfolio links', 'Skill showcase', 'Hourly rates display', 'Client testimonials'] },
  { icon: PartyPopper, title: 'Wedding Vendors', desc: 'Wedding cards with portfolio gallery, package pricing, availability, and booking. For photographers, planners, DJs, and decorators.', link: '/wedding-vendor-pdf-card', color: 'from-rose-500 to-rose-600', benefits: ['Portfolio gallery', 'Package pricing', 'Availability calendar', 'Venue visit map'] },
];

const whyChoose = [
  { icon: Zap, title: '24-Hour Delivery', desc: 'Get your industry-specific card delivered within 24 hours.' },
  { icon: Share2, title: 'Unlimited Sharing', desc: 'Share your card on WhatsApp, email, and social media unlimited times.' },
  { icon: Smartphone, title: 'Works on All Phones', desc: 'iPhone, Android, tablets - PDF works on every device.' },
  { icon: CreditCard, title: 'Payment QR Included', desc: 'Collect payments instantly with integrated UPI QR code.' },
];

const industryFaqs = [
  { q: 'Can I get a card customized for my specific industry?', a: 'Yes, we have specialized designs for 10+ industries including healthcare, real estate, legal, finance, beauty, fitness, food, and more. Each industry card includes relevant features and layouts.' },
  { q: 'Do industry-specific cards cost extra?', a: 'No, all industry designs are included in our standard pricing. You get industry-specific layouts at the same price - Started (Rs 99), Business (Rs 499), or Premium (Rs 999).' },
  { q: 'Can I request a design for an industry not listed?', a: 'Absolutely. Contact us on WhatsApp with your requirements and our design team will create a custom card for your profession.' },
  { q: 'What industries benefit most from PDF cards?', a: 'Service-based industries benefit the most - doctors, real estate agents, lawyers, consultants, salons, gyms, and restaurants. Any profession that shares contact details regularly will see great results.' },
];

export default function IndustriesPage() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const inView1 = useInView(ref1, { once: true, margin: '-60px' });
  const inView2 = useInView(ref2, { once: true, margin: '-60px' });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Industries</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Industries</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">PDF Cards for Every Industry</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Custom-designed PDF digital business cards tailored for your specific profession. Trusted by 10,000+ professionals across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Industry Cards */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">Benefits</span>
            <h2 className="section-title mt-3">Why Every Professional Needs <span>a PDF Card</span></h2>
            <p className="text-[#888] text-sm mt-2 max-w-lg mx-auto">Industry-specific features that help you connect with clients faster.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChoose.map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-[#f8f7f7] rounded-xl p-5 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <w.icon size={18} className="text-white" />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-xs mb-1">{w.title}</h3>
                <p className="text-[#888] text-[11px] leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section ref={ref1} className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">Industries We Serve</span>
            <h2 className="section-title mt-3">Choose Your <span>Profession</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.a key={i} href={ind.link} initial={{ opacity: 0, y: 16 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff8309]/20 transition-all group block">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <ind.icon className="text-white" size={22} />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1 group-hover:text-[#ff8309] transition-colors">{ind.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed mb-3">{ind.desc}</p>
                <ul className="space-y-1">
                  {ind.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-1.5 text-[10px] text-[#555]">
                      <Check size={10} className="text-green-500 flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">Process</span>
            <h2 className="section-title mt-3">How It <span>Works</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Choose Your Industry', desc: 'Select from 10+ industry-specific designs tailored for your profession.' },
              { step: '02', title: 'Submit Your Details', desc: 'Fill in your contact info, upload your logo, and choose your plan.' },
              { step: '03', title: 'Receive in 24 Hours', desc: 'Get your interactive PDF card with all clickable links ready to share.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#f8f7f7] rounded-xl p-5 text-center">
                <span className="text-3xl font-extrabold text-[#ff8309]/20">{s.step}</span>
                <h3 className="text-[#0a2b4a] font-bold text-sm mt-2 mb-1">{s.title}</h3>
                <p className="text-[#888] text-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry FAQ */}
      <section ref={ref2} className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">Industry <span>Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {industryFaqs.map((f, i) => (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Do not See Your Industry?</h2>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">We create PDF cards for all professions. Contact us and we will design a card perfect for your business.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/pricing" className="btn-orange">View Pricing</Link>
              <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Industries - PDF Digital Business Cards",
        "description": "Industry-specific PDF digital business cards for doctors, realtors, lawyers, salons, restaurants, gyms, and more.",
        "url": "https://mycarda.com/industries",
        "mainEntity": industries.map(ind => ({
          "@type": "ListItem",
          "name": ind.title,
          "url": `https://mycarda.com${ind.link}`
        }))
      })}} />
    </div>
  );
}
