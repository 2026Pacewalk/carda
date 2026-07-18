import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FileText, Share2, Palette, Download, MessageCircle } from 'lucide-react';

const steps = [
  { icon: FileText, num: '01', title: 'Choose Your Plan', desc: 'Select from our three plans: Started (Rs 99), Business (Rs 499), or Premium (Rs 999). Each plan is designed to match different business needs and budgets.', color: 'from-blue-500 to-blue-600' },
  { icon: Share2, num: '02', title: 'Share Your Details', desc: 'Fill out our simple order form with your name, designation, company, phone, WhatsApp, email, social links, and upload your logo or photo. It takes less than 2 minutes.', color: 'from-[#ff8309] to-[#e57400]' },
  { icon: Palette, num: '03', title: 'We Design Your Card', desc: 'Our professional designers create your interactive PDF card within 24 hours. We choose the best theme for your industry and customize it with your brand colors.', color: 'from-purple-500 to-purple-600' },
  { icon: Download, num: '04', title: 'Review & Approve', desc: 'We send you a preview of your card for approval. You can request changes - we revise until you are 100% satisfied with the design.', color: 'from-green-500 to-green-600' },
  { icon: MessageCircle, num: '05', title: 'Receive & Start Sharing', desc: 'Get your final PDF card via WhatsApp or email. Start sharing it with clients, on social media, in WhatsApp groups, and watch your network grow.', color: 'from-pink-500 to-pink-600' },
];

const faqs = [
  { q: 'How long does the entire process take?', a: 'From order to delivery, the entire process takes 24 working hours or less. If you request revisions, each round takes an additional 6-12 hours.' },
  { q: 'What information do I need to provide?', a: 'Basic details include: name, designation, company name, phone number, WhatsApp number, and logo/photo. Business and Premium plans require additional details like email, website, social links, and Google Maps location.' },
  { q: 'Can I see a preview before final delivery?', a: 'Yes, we always send a preview for your approval before delivering the final PDF. You can request changes to colors, layout, text, or any element.' },
  { q: 'How do I receive my PDF card?', a: 'Your completed PDF card is delivered via WhatsApp message and email. You can immediately save it and start sharing with your contacts.' },
];

export default function HowItWorksPage() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">How It Works</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Process</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">How It Works</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Get your interactive PDF digital business card in 5 simple steps. No technical knowledge required.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-5 items-start">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <step.icon className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#ff8309] font-extrabold text-xs">Step {step.num}</span>
                  </div>
                  <h3 className="text-[#0a2b4a] font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-14 bg-gradient-to-br from-[#0a2b4a] to-[#08223b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-white/60 text-sm mb-6">Your PDF digital business card is just 5 steps away.</p>
          <Link to="/pricing" className="btn-orange">Choose Your Plan</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Create a PDF Digital Business Card",
        "description": "5-step process to get your interactive PDF digital business card from MyCarda",
        "step": steps.map((s, i) => ({
          "@type": "HowToStep",
          "position": i + 1,
          "name": s.title,
          "text": s.desc
        }))
      })}} />
    </div>
  );
}
