import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FileText, Smartphone, Share2, Printer, Zap, Shield, QrCode, CreditCard, Globe, Image } from 'lucide-react';

const features = [
  { icon: Smartphone, title: 'Universal Compatibility', desc: 'PDF cards open on every smartphone - iPhone, Android, and tablets. No app installation needed.' },
  { icon: FileText, title: 'Lightweight PDF Format', desc: 'Small file size for instant sharing on WhatsApp, email, and social media. Loads in seconds.' },
  { icon: Share2, title: 'Click-to-Share Links', desc: 'One-tap buttons for calling, WhatsApp messaging, email, website visits, and social media profiles.' },
  { icon: CreditCard, title: 'Payment QR Code', desc: 'Integrated UPI QR code for instant payments via Google Pay, PhonePe, or Paytm.' },
  { icon: QrCode, title: 'Google Maps Navigation', desc: 'Tap to open your business location in Google Maps for easy client navigation.' },
  { icon: Globe, title: 'Social Media Integration', desc: 'Link all your social profiles - Facebook, Instagram, LinkedIn, YouTube, Twitter, Pinterest.' },
  { icon: Image, title: 'Photo & Logo Support', desc: 'Include your professional photo, company logo, product images, and portfolio gallery.' },
  { icon: Printer, title: 'Print Ready', desc: 'Same PDF works for digital sharing and high-quality printing. Dual-purpose design.' },
  { icon: Zap, title: '24-Hour Delivery', desc: 'Get your professional PDF card delivered within 24 working hours of order confirmation.' },
  { icon: Shield, title: 'Lifetime Access', desc: 'Your PDF card is yours forever. Share it unlimited times with no recurring fees.' },
];

const faqs = [
  { q: 'What is a PDF digital business card?', a: 'A PDF digital business card is an interactive electronic visiting card in PDF format with clickable buttons for call, WhatsApp, email, website, payment QR, and social media links.' },
  { q: 'How does a PDF card differ from a printed card?', a: 'PDF cards never run out, can be shared unlimited times, include clickable interactive links, work on all phones, and can be updated. Printed cards are static, limited, and costly to reprint.' },
  { q: 'Do I need an app to view a PDF business card?', a: 'No app needed. Every smartphone has a built-in PDF viewer. The card opens instantly when tapped.' },
  { q: 'Can I share my PDF card on WhatsApp?', a: 'Yes, simply send the PDF file in any WhatsApp chat. Recipients can view it and tap the interactive buttons immediately.' },
];

export default function Services() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Services</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Our Services</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">PDF Digital Business Card Services</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              We create professional, interactive PDF digital business cards with clickable links for call, WhatsApp, payment, and social media. Starting at just Rs 99.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is PDF Card */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="badge-orange mb-3">What We Do</span>
              <h2 className="section-title mt-3 mb-4">What is a <span>PDF Digital Business Card?</span></h2>
              <p className="text-[#555] text-sm leading-relaxed mb-3">
                A <strong>PDF digital business card</strong> is a modern electronic visiting card designed in PDF format. Unlike traditional printed cards, it contains interactive clickable buttons that allow recipients to call you, message on WhatsApp, visit your website, navigate to your location, or make payments - all with a single tap.
              </p>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                It is lightweight, works on every smartphone without any app, and can be shared unlimited times via WhatsApp, email, or social media. Your PDF card stays on your phone forever and never runs out.
              </p>
              <Link to="/pricing" className="btn-orange">View Pricing Plans</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-[#f8f7f7] rounded-2xl p-6">
              <img src="/images/slides/header-slide-1.png" alt="PDF Digital Business Card Sample" className="w-full rounded-xl shadow-lg" loading="lazy" />
              <p className="text-center text-xs text-[#888] mt-3">Sample PDF Digital Business Card</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">Features</span>
            <h2 className="section-title mt-3">Everything Your PDF Card <span>Can Do</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="icon-box mb-3 w-10 h-10 rounded-lg"><f.icon className="text-white" size={18} /></div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Choose Your Plan', desc: 'Select from Started (Rs 99), Business (Rs 499), or Premium (Rs 999) plan.' },
              { step: '02', title: 'Share Details', desc: 'Fill the form with your name, contact, social links, and upload your logo.' },
              { step: '03', title: 'We Design', desc: 'Our expert designers create your interactive PDF card within 24 hours.' },
              { step: '04', title: 'Receive & Share', desc: 'Get your PDF card via WhatsApp and start sharing instantly.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-5">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff8309] to-[#e57400] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-extrabold text-sm">{s.step}</span>
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-[#888] text-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/how-it-works" className="btn-orange">See Detailed Process</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">Common <span>Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
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
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Get Your PDF Card Today</h2>
          <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">Professional, interactive, and shareable PDF digital business cards starting at just Rs 99.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/pricing" className="btn-orange">View Pricing</Link>
            <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white">Order on WhatsApp</a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "PDF Digital Business Card Creation",
        "provider": { "@type": "Organization", "name": "MyCarda" },
        "description": "Professional PDF digital business cards with clickable call, WhatsApp, payment QR, and social media links. Starting at Rs 99.",
        "areaServed": { "@type": "Country", "name": "India" },
        "offers": [
          { "@type": "Offer", "name": "Started PDF Card", "price": "99", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "Business PDF Card", "price": "499", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "Premium PDF Card", "price": "999", "priceCurrency": "INR" }
        ]
      })}} />
    </div>
  );
}
