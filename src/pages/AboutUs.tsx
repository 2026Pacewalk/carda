import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import { FileText, Users, Award, Clock, Shield, Heart } from 'lucide-react';

const stats = [
  { num: '10,000+', label: 'Cards Delivered' },
  { num: '2,500+', label: 'Happy Clients' },
  { num: '50+', label: 'Design Themes' },
  { num: '4.8/5', label: 'Client Rating' },
];

const values = [
  { icon: FileText, title: 'PDF-First Approach', desc: 'We believe PDF is the most universal, accessible format for digital business cards. No apps needed, no internet required.' },
  { icon: Users, title: 'Customer Obsessed', desc: 'Every card is handcrafted by our design team. We revise until you are 100% satisfied with the result.' },
  { icon: Award, title: 'Quality Design', desc: 'Premium designs at affordable prices. Starting at just Rs 99 with professional quality guaranteed.' },
  { icon: Clock, title: '24-Hour Delivery', desc: 'We understand urgency. All cards are delivered within 24 working hours of order confirmation.' },
  { icon: Shield, title: 'Data Privacy', desc: 'Your business information is safe with us. We never share or sell your data to third parties.' },
  { icon: Heart, title: 'Made in India', desc: 'Proudly serving Indian businesses since 2020. We understand the local market and communication needs.' },
];

export default function AboutUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0a2b4a]">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">About MyCarda</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">India's Trusted PDF Digital Business Card Provider</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Since 2020, MyCarda has been helping professionals and businesses across India create beautiful, interactive PDF visiting cards that work on every smartphone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section ref={ref} className="py-10 md:py-12 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ff8309] mb-1">{s.num}</div>
                <div className="text-xs text-[#888]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="badge-orange mb-3">Our Story</span>
              <h2 className="section-title mt-3 mb-4">Why We Started <span>MyCarda</span></h2>
              <p className="text-[#555] text-sm leading-relaxed mb-3">
                MyCarda was born from a simple observation: professionals in India needed a better way to share their contact information. Printed cards get lost, web-based cards need internet, and NFC cards require special hardware.
              </p>
              <p className="text-[#555] text-sm leading-relaxed mb-3">
                PDF digital business cards solve all these problems. They work on every phone, open without internet, include clickable links, and can be shared unlimited times on WhatsApp - the app India uses most.
              </p>
              <p className="text-[#555] text-sm leading-relaxed">
                Operated by <strong>Pacewalk Digital Solutions</strong>, MyCarda has delivered over 10,000 PDF cards to businesses across India since 2020.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-4">What Makes Us Different</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2"><span className="text-[#ff8309] mt-0.5">&#10003;</span> PDF works on all phones without any app</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] mt-0.5">&#10003;</span> Most affordable pricing starting at Rs 99</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] mt-0.5">&#10003;</span> Delivery within 24 hours</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] mt-0.5">&#10003;</span> 50+ professional design themes</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] mt-0.5">&#10003;</span> Clickable call, WhatsApp, payment & social links</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] mt-0.5">&#10003;</span> Pan-India service via WhatsApp</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">Our Values</span>
            <h2 className="section-title mt-3">What We <span>Stand For</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="icon-box mb-3 w-10 h-10 rounded-lg"><v.icon className="text-white" size={18} /></div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{v.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Create Your PDF Card?</h2>
          <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">Join 10,000+ professionals who trust MyCarda for their digital business cards.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/pricing" className="btn-orange">View Pricing Plans</Link>
            <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About MyCarda - PDF Digital Business Card Provider",
        "description": "Learn about MyCarda, India's trusted PDF digital business card provider since 2020. 10,000+ cards delivered.",
        "url": "https://mycarda.com/about-us",
        "mainEntity": {
          "@type": "Organization",
          "name": "MyCarda",
          "description": "PDF digital business card creation service",
          "foundingDate": "2020",
          "parentOrganization": { "@type": "Organization", "name": "Pacewalk" }
        }
      })}} />
    </div>
  );
}
