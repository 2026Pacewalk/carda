import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const contactMethods = [
  { icon: MessageCircle, title: 'WhatsApp', value: '+91 95177-22444', link: 'https://wa.me/919517722444', color: 'bg-green-500' },
  { icon: Phone, title: 'Phone', value: '+91 95177-22444', link: 'tel:+919517722444', color: 'bg-[#0a2b4a]' },
  { icon: Mail, title: 'Email', value: 'mydigitalcarda@gmail.com', link: 'mailto:mydigitalcarda@gmail.com', color: 'bg-red-500' },
];

const hours = [
  { day: 'Monday - Saturday', time: '9:00 AM - 8:00 PM' },
  { day: 'Sunday', time: 'Limited Support' },
];

const faqs = [
  { q: 'What is the fastest way to reach you?', a: 'WhatsApp is the fastest way to reach us. Message us at +91 95177-22444 and we typically respond within minutes during business hours.' },
  { q: 'How long does it take to get a response?', a: 'We respond to WhatsApp messages within minutes during business hours (9 AM - 8 PM). Email responses may take up to 24 hours.' },
  { q: 'Do you offer support on Sundays?', a: 'We offer limited support on Sundays. For urgent queries, WhatsApp us and we will respond as soon as possible.' },
];

export default function ContactUs() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Contact Us</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">Contact</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">Contact Us</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Have a question or ready to order? We are here to help you create the perfect PDF digital business card.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {contactMethods.map((m, i) => (
              <motion.a key={i} href={m.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center group">
                <div className={`w-12 h-12 ${m.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <m.icon className="text-white" size={22} />
                </div>
                <h3 className="text-[#0a2b4a] font-bold text-sm mb-1">{m.title}</h3>
                <p className="text-[#ff8309] text-xs font-medium">{m.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-[#0a2b4a] font-bold text-lg mb-4">Business Hours</h3>
              <div className="space-y-3">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-[#555]">{h.day}</span>
                    <span className="text-sm font-medium text-[#0a2b4a]">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-[#888]">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>Serving Chandigarh, Zirakpur, Mohali, Panchkula, Delhi, Mumbai, Bangalore, and all of India.</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Quick Order</h3>
              <p className="text-white/60 text-sm mb-4">The fastest way to get your PDF card:</p>
              <ol className="space-y-2 text-sm text-white/70 mb-5">
                <li className="flex items-start gap-2"><span className="text-[#ff8309] font-bold">1.</span> Message us on WhatsApp</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] font-bold">2.</span> Choose your plan</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] font-bold">3.</span> Share your details</li>
                <li className="flex items-start gap-2"><span className="text-[#ff8309] font-bold">4.</span> Get your card in 24 hours</li>
              </ol>
              <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-all">
                <MessageCircle size={18} /> Order on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="badge-orange mb-3">FAQ</span>
            <h2 className="section-title mt-3">Contact <span>Questions</span></h2>
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
    </div>
  );
}
