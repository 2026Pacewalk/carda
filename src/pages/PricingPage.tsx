import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import { Check, X, Star, MessageCircle } from 'lucide-react';

const plans = [
  {
    name: 'Started PDF Card', price: '99', oldPrice: '199', popular: false,
    desc: 'Perfect for individuals starting with digital cards',
    features: [
      { t: 'Single-page PDF card', inc: true },
      { t: 'Fixed design theme', inc: true },
      { t: 'Logo / photo upload', inc: true },
      { t: 'Click-to-call button', inc: true },
      { t: 'Click-to-WhatsApp button', inc: true },
      { t: 'Website link', inc: false },
      { t: 'Google Maps link', inc: false },
      { t: 'Social media links', inc: false },
      { t: 'Payment QR code', inc: false },
      { t: 'Content updates', inc: false },
      { t: 'Unlimited sharing', inc: true },
      { t: 'Lifetime access', inc: true },
    ],
    link: '/started-card.html',
  },
  {
    name: 'Business PDF Card', price: '499', oldPrice: '799', popular: true,
    desc: 'Most popular for professionals and small businesses',
    features: [
      { t: 'Multi-page PDF card', inc: true },
      { t: 'Premium design theme', inc: true },
      { t: 'Logo / photo upload', inc: true },
      { t: 'Click-to-call button', inc: true },
      { t: 'Click-to-WhatsApp button', inc: true },
      { t: 'Website link', inc: true },
      { t: 'Google Maps link', inc: true },
      { t: '2 social media links', inc: true },
      { t: 'Payment QR code', inc: true },
      { t: 'Content updates', inc: true },
      { t: 'Unlimited sharing', inc: true },
      { t: 'Lifetime access', inc: true },
    ],
    link: '/basic-card.html',
  },
  {
    name: 'Premium PDF Card', price: '999', oldPrice: '1499', popular: false,
    desc: 'Full-featured with unlimited updates and priority support',
    features: [
      { t: 'Multi-page PDF card', inc: true },
      { t: 'Custom design theme', inc: true },
      { t: 'Logo / photo upload', inc: true },
      { t: 'Click-to-call button', inc: true },
      { t: 'Click-to-WhatsApp button', inc: true },
      { t: 'Website link', inc: true },
      { t: 'Google Maps link', inc: true },
      { t: 'Unlimited social links', inc: true },
      { t: 'Payment QR code', inc: true },
      { t: 'Unlimited content updates', inc: true },
      { t: 'Unlimited sharing', inc: true },
      { t: 'Priority support', inc: true },
    ],
    link: '/pro-card.html',
  },
];

const faqs = [
  { q: 'What is included in the Started PDF Card plan?', a: 'The Started plan (Rs 99) includes a single-page PDF card with your name, designation, company, phone, WhatsApp, location, logo/photo, and click-to-call and click-to-WhatsApp buttons. Social media links are not included in this plan.' },
  { q: 'How many social media links can I add?', a: 'The Business plan allows 2 social media links. The Premium plan allows unlimited social media links including Facebook, Instagram, LinkedIn, YouTube, Twitter, Pinterest, and more.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade from Started to Business or Premium anytime by paying the difference. Contact us on WhatsApp for upgrade assistance.' },
  { q: 'Are there any hidden charges?', a: 'No hidden charges at all. You pay a one-time fee and get lifetime access to your PDF card. There are no monthly or annual subscription fees.' },
];

export default function PricingPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Pricing</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Pricing</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include lifetime access and unlimited sharing.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'bg-gradient-to-b from-[#0a2b4a] to-[#071c2c] ring-2 ring-[#ff8309]/30 shadow-2xl' : 'bg-white border border-gray-100 shadow-lg'}`}>
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#ff8309] to-[#e57400] text-white text-center py-1.5 text-[13px] font-extrabold uppercase tracking-[0.2em]">
                    <Star size={10} className="inline mr-1" fill="white" /> Most Popular
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className={`text-lg font-bold mb-1 ${plan.popular ? 'text-white' : 'text-[#0a2b4a]'}`}>{plan.name}</h3>
                    <p className={`text-xs ${plan.popular ? 'text-white/50' : 'text-[#888]'}`}>{plan.desc}</p>
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className={`text-sm line-through ${plan.popular ? 'text-white/30' : 'text-gray-300'}`}>Rs {plan.oldPrice}</span>
                      <span className={`text-4xl font-extrabold ${plan.popular ? 'text-[#ff8309]' : 'text-[#0a2b4a]'}`}>Rs {plan.price}</span>
                      <span className={`text-xs ${plan.popular ? 'text-white/40' : 'text-[#aaa]'}`}>one-time</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        {f.inc ? <Check size={14} className="text-green-500 flex-shrink-0" /> : <X size={14} className="text-red-300/60 flex-shrink-0" />}
                        <span className={`text-xs ${f.inc ? (plan.popular ? 'text-white/70' : 'text-[#555]') : (plan.popular ? 'text-white/25' : 'text-gray-300')}`}>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={plan.link} className={`w-full py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all ${plan.popular ? 'bg-gradient-to-r from-[#ff8309] to-[#e57400] text-white hover:shadow-lg' : 'bg-[#0a2b4a] text-white hover:bg-[#103558]'}`}>
                    <MessageCircle size={14} /> Book Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">Pricing <span>Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-[#f8f7f7] rounded-xl p-5">
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-2">{f.q}</h3>
                <p className="text-[#555] text-xs leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "MyCarda PDF Digital Business Card Plans",
        "description": "PDF digital business card plans starting at Rs 99",
        "brand": { "@type": "Brand", "name": "MyCarda" },
        "offers": [
          { "@type": "Offer", "name": "Started PDF Card", "price": "99", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
          { "@type": "Offer", "name": "Business PDF Card", "price": "499", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
          { "@type": "Offer", "name": "Premium PDF Card", "price": "999", "priceCurrency": "INR", "availability": "https://schema.org/InStock" }
        ]
      })}} />
    </div>
  );
}
