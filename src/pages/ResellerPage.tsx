import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { DollarSign, Users, Zap, Award, TrendingUp, Gift } from 'lucide-react';

const benefits = [
  { icon: DollarSign, title: 'Earn Commission', desc: 'Get attractive commission on every PDF card order you refer. Earn up to 30% per sale.' },
  { icon: Users, title: 'Easy Onboarding', desc: 'No investment needed. Simply register as a reseller and start referring customers immediately.' },
  { icon: Zap, title: 'Quick Payouts', desc: 'Weekly commission payouts directly to your bank account or UPI. Transparent tracking system.' },
  { icon: Award, title: 'Marketing Support', desc: 'We provide promotional banners, sample cards, and marketing content to help you sell.' },
  { icon: TrendingUp, title: 'Growing Market', desc: 'Digital business cards are in high demand. Be part of the fastest-growing B2B service in India.' },
  { icon: Gift, title: 'Bonus Rewards', desc: 'Top performers get bonus rewards, higher commission rates, and exclusive perks every month.' },
];

const faqs = [
  { q: 'How do I become a reseller?', a: 'Simply fill the form below or WhatsApp us at +91 95177-22444 with "Reseller Program". We will set up your reseller account within 24 hours.' },
  { q: 'What is the commission structure?', a: 'You earn 20-30% commission on every order. Started Card (Rs 99) = Rs 20-30, Business Card (Rs 499) = Rs 100-150, Premium Card (Rs 999) = Rs 200-300.' },
  { q: 'When and how do I get paid?', a: 'Commissions are paid weekly via UPI or bank transfer. You get a dashboard to track all your referrals and earnings in real-time.' },
  { q: 'Do I need any investment?', a: 'No investment required at all. This is a zero-investment business opportunity. You just refer customers and earn commissions.' },
];

export default function ResellerPage() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Reseller Program</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Business Opportunity</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">Reseller Program</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Start your own digital business card business with zero investment. Earn 20-30% commission on every sale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">Why Join</span>
            <h2 className="section-title mt-3">Benefits of Becoming <span>a Reseller</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-[#f8f7f7] rounded-xl p-5">
                <div className="icon-box mb-3 w-10 h-10 rounded-lg"><b.icon className="text-white" size={18} /></div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{b.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">Reseller <span>Questions</span></h2>
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

      <section className="py-14 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Start Earning Today</h2>
          <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">Zero investment. High commissions. Weekly payouts. Join 500+ resellers across India.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/919517722444?text=Hi%2C%20I%20want%20to%20join%20the%20Reseller%20Program" target="_blank" rel="noopener noreferrer" className="btn-orange">Join on WhatsApp</a>
            <Link to="/contact-us" className="btn-outline-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
