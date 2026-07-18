import { Link } from 'react-router';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Stethoscope, Home, Scissors, Scale, UtensilsCrossed, Dumbbell, Briefcase, Store,
  MapPin, Download, Share2, Smartphone, CreditCard, Shield, Zap, Star,
  QrCode, Palette, FileText, CheckCircle, Clock, Users, Phone
} from 'lucide-react';

const industries = [
  { icon: Stethoscope, title: 'Doctors', desc: 'Clinic cards with appointment booking', link: '/doctor-pdf-business-card' },
  { icon: Home, title: 'Real Estate', desc: 'Property cards with click-to-call', link: '/realtor-pdf-visiting-card' },
  { icon: Scissors, title: 'Salons', desc: 'Beauty cards with service menu', link: '/salon-pdf-business-card' },
  { icon: Scale, title: 'Lawyers', desc: 'Legal cards with chamber details', link: '/lawyer-pdf-visiting-card' },
  { icon: UtensilsCrossed, title: 'Restaurants', desc: 'Menu cards with table booking', link: '/restaurant-pdf-menu-card' },
  { icon: Dumbbell, title: 'Gyms', desc: 'Fitness cards with membership plans', link: '/gym-pdf-business-card' },
  { icon: Briefcase, title: 'Freelancers', desc: 'Portfolio cards with work samples', link: '/freelancer-pdf-business-card' },
  { icon: Store, title: 'CA & Tax', desc: 'Financial cards with payment QR', link: '/ca-pdf-business-card' },
];

const locations = [
  { name: 'Chandigarh', path: '/pdf-digital-business-card-chandigarh' },
  { name: 'Zirakpur', path: '/pdf-digital-business-card-zirakpur' },
  { name: 'Mohali', path: '/pdf-digital-business-card-mohali' },
  { name: 'Panchkula', path: '/pdf-digital-business-card-panchkula' },
  { name: 'Delhi', path: '/pdf-digital-business-card-delhi' },
  { name: 'Mumbai', path: '/pdf-digital-business-card-mumbai' },
  { name: 'Bangalore', path: '/pdf-digital-business-card-bangalore' },
];

const blogPreview = [
  { title: 'What is a PDF Digital Business Card?', excerpt: 'Learn how interactive PDF cards work and why they are the smartest choice for professionals in 2026.', slug: 'what-is-pdf-digital-business-card' },
  { title: 'Benefits of PDF Visiting Cards for Small Businesses', excerpt: 'Discover why small businesses across India are switching to PDF digital cards.', slug: 'benefits-pdf-visiting-cards-small-business' },
  { title: 'How to Share PDF Business Cards on WhatsApp', excerpt: 'A complete guide to sharing your PDF card on WhatsApp for maximum reach.', slug: 'how-to-share-pdf-business-card-whatsapp' },
];

const features = [
  { icon: Smartphone, title: 'Fully Mobile-Optimized', desc: 'Your PDF card looks perfect on every smartphone screen.' },
  { icon: QrCode, title: 'Built-in QR Code', desc: 'Every card includes a scannable QR for instant sharing.' },
  { icon: Share2, title: 'One-Tap Share', desc: 'Share via WhatsApp, email, or social media instantly.' },
  { icon: CreditCard, title: 'Payment QR (UPI)', desc: 'Include UPI QR code for instant client payments.' },
  { icon: Palette, title: 'Custom Design', desc: 'Professional designs matching your brand identity.' },
  { icon: FileText, title: 'PDF Format', desc: 'Universal compatibility - works on every device.' },
];

const pricingPlans = [
  { name: 'Started', price: '99', popular: false, features: ['Single page design', 'Contact info + photo', 'Click-to-call/email', 'WhatsApp share button', '1 revision included'] },
  { name: 'Business', price: '499', popular: true, features: ['Multi-page design', 'Everything in Started', 'Social media links', 'Google Maps integration', 'UPI payment QR', '3 revisions included'] },
  { name: 'Premium', price: '999', popular: false, features: ['Premium multi-page', 'Everything in Business', 'Service catalog page', 'Photo gallery (6 images)', 'Priority support', 'Unlimited revisions'] },
];

export default function HomePage() {
  const indRef = useRef(null);
  const indInView = useInView(indRef, { once: true, margin: '-60px' });
  const blogRef = useRef(null);
  const blogInView = useInView(blogRef, { once: true, margin: '-60px' });
  const locRef = useRef(null);
  const locInView = useInView(locRef, { once: true, margin: '-60px' });
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: '-60px' });
  const howRef = useRef(null);
  const howInView = useInView(howRef, { once: true, margin: '-60px' });
  const priceRef = useRef(null);
  const priceInView = useInView(priceRef, { once: true, margin: '-60px' });

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-br from-[#0a2b4a] via-[#0a2b4a] to-[#103558] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff8309]/15 rounded-full text-[#ff8309] text-xs font-bold mb-5">
                <Zap size={12} /> India's #1 PDF Business Card Provider
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Interactive PDF<br />Business Cards<br /><span className="text-[#ff8309]">Starting at Rs 99</span>
              </h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                Professional, shareable PDF digital visiting cards with click-to-call, WhatsApp, UPI payment QR, and social links. Delivered in 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link to="/pricing" className="btn-orange text-center text-sm">Get Your PDF Card</Link>
                <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-center text-sm flex items-center justify-center gap-2">
                  <Phone size={14} /> Order on WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-400" /> No subscription</span>
                <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-400" /> One-time payment</span>
                <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-400" /> Instant delivery</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="w-72 mx-auto bg-gradient-to-br from-gray-50 to-gray-200 rounded-[32px] p-3 shadow-2xl">
                  <div className="bg-white rounded-[24px] overflow-hidden">
                    <div className="bg-gradient-to-br from-[#0a2b4a] to-[#103558] p-6 text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <UserIcon />
                      </div>
                      <h3 className="text-white font-bold text-sm">Dr. Rajesh Sharma</h3>
                      <p className="text-white/60 text-[10px]">Senior Cardiologist</p>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#555]"><Phone size={10} className="text-[#ff8309]" /> +91 98765 43210</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]"><MapPin size={10} className="text-[#ff8309]" /> Chandigarh, India</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]"><CreditCard size={10} className="text-[#ff8309]" /> Pay via UPI</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button className="bg-[#ff8309] text-white text-[10px] font-bold py-1.5 rounded-lg">Call Now</button>
                        <button className="bg-green-500 text-white text-[10px] font-bold py-1.5 rounded-lg">WhatsApp</button>
                      </div>
                    </div>
                  </div>
                </div>
                <FloatingBadge icon={Download} text="10K+ Downloads" className="-left-4 top-8" delay={0.5} />
                <FloatingBadge icon={Share2} text="Easy Share" className="-right-4 top-16" delay={0.7} />
                <FloatingBadge icon={Shield} text="Secure PDF" className="-left-8 bottom-24" delay={0.9} />
                <FloatingBadge icon={Star} text="4.9 Rating" className="-right-8 bottom-16" delay={1.1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: '12,500+', label: 'Happy Customers' },
              { icon: Download, value: '50,000+', label: 'Cards Downloaded' },
              { icon: Star, value: '4.9/5', label: 'Customer Rating' },
              { icon: Clock, value: '24 Hrs', label: 'Delivery Time' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center">
                <stat.icon size={20} className="text-[#ff8309] mb-2" />
                <p className="text-xl md:text-2xl font-extrabold text-[#0a2b4a]">{stat.value}</p>
                <p className="text-[11px] text-[#888]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section ref={featRef} className="py-14 md:py-20 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
            <span className="badge-orange mb-3">Features</span>
            <h2 className="section-title mt-3">Everything Your PDF Card <span>Needs</span></h2>
            <p className="text-[#888] text-sm mt-2 max-w-lg mx-auto">Interactive features that make your PDF business card stand out.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.08 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#ff8309]/20 transition-all group">
                <div className="w-11 h-11 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-xl flex items-center justify-center mb-3 group-hover:from-[#ff8309] group-hover:to-[#e57400] transition-all">
                  <f.icon size={18} className="text-white" />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section ref={howRef} className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={howInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
            <span className="badge-orange mb-3">How It Works</span>
            <h2 className="section-title mt-3">Get Your Card in <span>3 Simple Steps</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Choose Your Plan', desc: 'Select from Started (Rs 99), Business (Rs 499), or Premium (Rs 999) based on your needs.' },
              { step: '02', title: 'Share Your Details', desc: 'Send us your business info, logo, photo, and any specific design preferences via WhatsApp.' },
              { step: '03', title: 'Receive Your Card', desc: 'Get your interactive PDF business card delivered within 24 hours, ready to share.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={howInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.12 }}
                className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff8309] to-[#e57400] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-extrabold text-lg">{item.step}</span>
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-base mb-2">{item.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#ff8309]/30 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section ref={priceRef} className="py-14 md:py-20 bg-[#f8f7f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={priceInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
            <span className="badge-orange mb-3">Pricing</span>
            <h2 className="section-title mt-3">Choose Your <span>Plan</span></h2>
            <p className="text-[#888] text-sm mt-2">One-time payment. No hidden fees. No subscription.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={priceInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.1 }}
                className={`rounded-2xl p-6 relative ${plan.popular ? 'bg-gradient-to-br from-[#0a2b4a] to-[#103558] text-white shadow-xl scale-105 z-10' : 'bg-white border border-gray-200'}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#ff8309] rounded-full text-white text-[10px] font-bold">Most Popular</span>}
                <h3 className={`font-bold text-lg mb-1 ${plan.popular ? 'text-white' : 'text-[#0a2b4a]'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-3xl font-extrabold ${plan.popular ? 'text-[#ff8309]' : 'text-[#0a2b4a]'}`}>Rs {plan.price}</span>
                  <span className={`text-xs ${plan.popular ? 'text-white/50' : 'text-[#888]'}`}>one-time</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs">
                      <CheckCircle size={13} className={plan.popular ? 'text-[#ff8309] flex-shrink-0 mt-0.5' : 'text-green-500 flex-shrink-0 mt-0.5'} />
                      <span className={plan.popular ? 'text-white/80' : 'text-[#555]'}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className={`block text-center text-xs font-bold py-2.5 rounded-xl transition-all ${plan.popular ? 'bg-[#ff8309] text-white hover:bg-[#e57400]' : 'bg-[#0a2b4a] text-white hover:bg-[#103558]'}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section ref={indRef} className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={indInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">Industries</span>
            <h2 className="section-title mt-3">PDF Cards for <span>Every Profession</span></h2>
            <p className="text-[#888] text-sm mt-2 max-w-lg mx-auto">Custom-designed PDF digital business cards tailored for your specific industry.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {industries.map((ind, i) => (
              <motion.a key={i} href={ind.link} initial={{ opacity: 0, y: 12 }} animate={indInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-[#f8f7f7] rounded-xl p-4 hover:shadow-md hover:border-[#ff8309]/20 transition-all group text-center border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:from-[#ff8309] group-hover:to-[#e57400] transition-all">
                  <ind.icon className="text-white" size={18} />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-xs mb-0.5 group-hover:text-[#ff8309] transition-colors">{ind.title}</h3>
                <p className="text-[#999] text-[10px]">{ind.desc}</p>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/industries" className="btn-orange text-sm">View All Industries</Link>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section ref={blogRef} className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={blogInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">Blog</span>
            <h2 className="section-title mt-3">Latest from Our <span>Blog</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {blogPreview.map((post, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={blogInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl p-5 hover:shadow-md transition-all border border-gray-100">
                <span className="px-2 py-0.5 bg-[#ff8309]/10 text-[#ff8309] rounded-full text-[10px] font-bold uppercase">Guide</span>
                <h3 className="text-[#0a2b4a] font-bold text-sm mt-2 mb-2">{post.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed mb-3">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-[#ff8309] text-xs font-bold">Read More &rarr;</Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/blog" className="btn-dark text-sm">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section ref={locRef} className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={locInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <span className="badge-orange mb-3">Service Areas</span>
            <h2 className="section-title mt-3">PDF Cards Available in <span>Your City</span></h2>
            <p className="text-[#888] text-sm mt-2 max-w-lg mx-auto">We create and deliver PDF digital business cards for professionals across India.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.map((loc, i) => (
              <motion.a key={i} href={loc.path} initial={{ opacity: 0, y: 12 }} animate={locInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.04 }}
                className="bg-[#f8f7f7] rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-[#ff8309]/20 transition-all group flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-[#ff8309] group-hover:to-[#e57400] transition-all">
                  <MapPin size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[#0a2b4a] font-bold text-xs group-hover:text-[#ff8309] transition-colors">{loc.name}</h3>
                  <span className="text-[#999] text-[10px]">PDF Business Card</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="badge-orange mb-3">Testimonials</span>
            <h2 className="section-title mt-3">What Our <span>Clients Say</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Dr. Priya Sharma', role: 'Dentist, Chandigarh', text: 'The PDF business card is fantastic! My patients can now save my contact details with just one tap. Highly recommend!' },
              { name: 'Rahul Verma', role: 'Real Estate Agent, Zirakpur', text: 'Best investment for my business. The click-to-call and WhatsApp buttons make it so easy for clients to reach me.' },
              { name: 'Neha Gupta', role: 'Salon Owner, Mohali', text: 'Got my salon menu card in PDF format. Looks premium and professional. My clients love the easy booking feature.' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-[#ff8309] fill-[#ff8309]" />)}
                </div>
                <p className="text-[#555] text-xs leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center text-white text-xs font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <p className="text-xs font-bold text-[#0a2b4a]">{t.name}</p>
                    <p className="text-[10px] text-[#888]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Ready to Go Digital?</h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-6">
              Join 12,500+ professionals who trust MyCarda for their PDF digital business cards. Starting at just Rs 99.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing" className="btn-orange text-sm">View Pricing Plans</Link>
              <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-sm flex items-center justify-center gap-2">
                <Phone size={14} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function UserIcon() {
  return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>;
}

function FloatingBadge({ icon: Icon, text, className, delay }: { icon: typeof Download; text: string; className: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.4 }}
      className={`absolute ${className} bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2 z-10`}>
      <div className="w-7 h-7 bg-[#ff8309]/10 rounded-lg flex items-center justify-center">
        <Icon size={13} className="text-[#ff8309]" />
      </div>
      <span className="text-[10px] font-bold text-[#0a2b4a]">{text}</span>
    </motion.div>
  );
}
