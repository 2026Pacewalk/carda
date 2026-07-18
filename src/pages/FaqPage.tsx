import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { ChevronDown, MessageCircle, Search, X } from 'lucide-react';

const faqsAll = [
  // General (12)
  { q: 'What is a PDF digital business card?', a: 'A PDF digital business card is an interactive electronic visiting card saved in PDF format. It contains clickable buttons for calling, WhatsApp messaging, email, website visits, payment QR codes, Google Maps navigation, and social media links. Recipients tap these buttons on their smartphone to connect instantly. It works on all phones without any app installation.', cat: 'General' },
  { q: 'How is a PDF card different from a printed card?', a: 'PDF cards never run out, can be shared unlimited times, include clickable interactive links, work on all phones, can be updated anytime, and cost nothing to re-share. Printed cards are static, limited in quantity, expensive to reprint, and lack any digital functionality.', cat: 'General' },
  { q: 'Who should use a PDF digital business card?', a: 'PDF cards are ideal for doctors, real estate agents, lawyers, CA/tax consultants, salon owners, gym trainers, insurance agents, restaurant owners, freelancers, wedding vendors, shop owners, coaches, and any professional who wants to share contact details digitally on WhatsApp.', cat: 'General' },
  { q: 'Do I need to be tech-savvy to use a PDF card?', a: 'Not at all. We create the PDF card for you. All you need to do is share the PDF file on WhatsApp just like sharing a photo. No technical knowledge required.', cat: 'General' },
  { q: 'Why should I choose a PDF card over a web-based digital card?', a: 'PDF cards work offline, require no internet to view, need no app installation, and look exactly the same on every device. Web cards need internet, load slowly, and may break. PDF is the most reliable format for sharing contact information.', cat: 'General' },
  { q: 'Can I print my PDF business card?', a: 'Yes, you can print your PDF card at any print shop. It will look professional on paper too. However, the interactive clickable links only work in the digital version.', cat: 'General' },
  { q: 'Is a PDF business card professional enough for corporate use?', a: 'Absolutely. Our designs are professional and modern. Many corporate professionals, CEOs, doctors, and lawyers use our PDF cards. The interactive features actually make a stronger impression than paper cards.', cat: 'General' },
  { q: 'How do recipients save my PDF card?', a: 'When you share your PDF card on WhatsApp, recipients can download it to their phone. It stays in their files and WhatsApp chat. They can access it anytime without internet.', cat: 'General' },
  { q: 'Will my PDF card work on iPhone?', a: 'Yes, PDF cards work perfectly on iPhones, Android phones, tablets, and computers. PDF is a universal format supported by every device.', cat: 'General' },
  { q: 'Can I include my company logo on the card?', a: 'Yes, all our plans support logo upload. We place your logo prominently on the card design. You can also include your professional photo.', cat: 'General' },
  { q: 'What makes MyCarda different from other digital card services?', a: 'MyCarda specializes in PDF cards that work offline, start at just Rs 99, deliver within 24 hours, and include clickable WhatsApp, call, payment QR, and map links. We are India-focused with local understanding.', cat: 'General' },
  { q: 'How long has MyCarda been in business?', a: 'MyCarda has been serving Indian professionals since 2020. We have delivered over 10,000 PDF cards across India.', cat: 'General' },

  // Pricing (10)
  { q: 'How much does a PDF digital business card cost?', a: 'We offer three plans: Started PDF Card at Rs 99 (single-page with basic links), Business PDF Card at Rs 499 (multi-page with social links and payment QR), and Premium PDF Card at Rs 999 (fully customized with unlimited updates and all features).', cat: 'Pricing' },
  { q: 'Are there any hidden charges?', a: 'No hidden charges, no monthly fees, no subscriptions. You pay a one-time price and own your PDF card forever with unlimited sharing.', cat: 'Pricing' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI (Google Pay, PhonePe, Paytm), bank transfer, and all major payment methods through our secure Instamojo payment gateway.', cat: 'Pricing' },
  { q: 'Can I get a refund?', a: 'Yes. If we have not started designing your card, you get a full refund. After design begins, partial refunds may apply. See our full Refund Policy for details.', cat: 'Pricing' },
  { q: 'What is the difference between the three pricing plans?', a: 'Started (Rs 99): Single-page card with call, WhatsApp, email, and website links. Business (Rs 499): Multi-page card with all social media links, payment QR code, Google Maps, and priority design. Premium (Rs 999): Fully customized design, unlimited content updates, all features, and commercial license.', cat: 'Pricing' },
  { q: 'Is there a discount for bulk orders?', a: 'Yes, we offer discounts for teams and companies ordering 5+ cards. Contact us on WhatsApp for bulk pricing.', cat: 'Pricing' },
  { q: 'Do I need to pay again if I want to update my card?', a: 'With the Premium plan, updates are free. For Started and Business plans, minor updates cost Rs 49-99 depending on the changes needed.', cat: 'Pricing' },
  { q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade from Started to Business or Premium anytime by paying the difference. Contact us to upgrade.', cat: 'Pricing' },
  { q: 'Is GST included in the price?', a: 'Our prices are inclusive of all taxes. You pay exactly what you see on the pricing page.', cat: 'Pricing' },
  { q: 'Do you offer reseller or affiliate programs?', a: 'Yes, we have a reseller program where you can earn commission by selling our PDF cards. Visit our Reseller Program page for details.', cat: 'Pricing' },

  // Features (10)
  { q: 'What information can I include on my PDF card?', a: 'You can include your name, photo, designation, company name, logo, phone, WhatsApp, email, website, Google Maps, social media links, payment QR code, business hours, services, and testimonials.', cat: 'Features' },
  { q: 'What are clickable links in a PDF card?', a: 'Clickable links are interactive buttons that perform actions when tapped: phone numbers open the dialer, WhatsApp opens a chat, email opens compose, websites open in browser, Maps opens navigation, and social links open respective apps.', cat: 'Features' },
  { q: 'Can I add a payment QR code?', a: 'Yes. Our Business and Premium plans include UPI QR code integration for instant payments via Google Pay, PhonePe, or Paytm.', cat: 'Features' },
  { q: 'Can I update my card later?', a: 'Yes. The Premium plan includes unlimited content updates. For other plans, updates are available at a nominal charge.', cat: 'Features' },
  { q: 'What social media links can I add?', a: 'You can add links to Facebook, Instagram, LinkedIn, Twitter, YouTube, Pinterest, and any other social platform. All links are clickable from the PDF.', cat: 'Features' },
  { q: 'Can I add multiple phone numbers?', a: 'Yes, you can add multiple phone numbers, WhatsApp numbers, and email addresses on your card. Each will be clickable.', cat: 'Features' },
  { q: 'Does the card include my business address?', a: 'Yes, you can include your full address which links to Google Maps for easy navigation.', cat: 'Features' },
  { q: 'Can I choose my card design?', a: 'Yes, we have 50+ design themes across categories like Professional, Creative, Minimal, Bold, and Elegant. You can choose any theme.', cat: 'Features' },
  { q: 'Can I add my photo to the card?', a: 'Yes, all plans support adding your professional photo or company logo to the card design.', cat: 'Features' },
  { q: 'Is the QR code on my card scannable?', a: 'Yes, the UPI payment QR code is fully scannable with any UPI app including Google Pay, PhonePe, Paytm, and BHIM.', cat: 'Features' },

  // Ordering (8)
  { q: 'How do I order a PDF card?', a: 'Choose your plan, click Book Now, fill the form with your details, upload your logo/photo, and complete payment. We deliver your card within 24 hours.', cat: 'Ordering' },
  { q: 'How long does delivery take?', a: 'We deliver all PDF cards within 24 working hours of receiving your complete details and payment confirmation.', cat: 'Ordering' },
  { q: 'Can I see a preview before delivery?', a: 'Yes, we always share a preview for your approval before delivering the final PDF. You can request changes until you are satisfied.', cat: 'Ordering' },
  { q: 'What details do I need to provide?', a: 'You need to provide: name, designation, company name, phone number, WhatsApp number, email, website, address, social media links, and upload your logo/photo.', cat: 'Ordering' },
  { q: 'How do I send my logo and photo?', a: 'You can upload your logo and photo directly on the order form. We accept JPG, PNG, and PDF formats.', cat: 'Ordering' },
  { q: 'What if I do not have a logo?', a: 'No problem. We can create a text-based card with your name and company name styled professionally. You can add a logo later.', cat: 'Ordering' },
  { q: 'Can I order for my entire team?', a: 'Yes, we handle bulk orders for teams and companies. Contact us on WhatsApp for team pricing and bulk discounts.', cat: 'Ordering' },
  { q: 'What happens after I place my order?', a: 'After payment, our design team creates your card within 24 hours. We send a preview for approval, make any changes you request, and deliver the final PDF.', cat: 'Ordering' },

  // Sharing (8)
  { q: 'How do I share my PDF card on WhatsApp?', a: 'Open WhatsApp, select any chat, tap the attachment icon, select Document, choose your PDF card, and send. Recipients can view and interact with it instantly.', cat: 'Sharing' },
  { q: 'Will my PDF card work on iPhone and Android?', a: 'Yes, PDF cards work perfectly on iPhones, Android phones, tablets, and computers. PDF is a universal format supported by every device.', cat: 'Sharing' },
  { q: 'How many times can I share my card?', a: 'Unlimited times. There is no limit on sharing. Share it with thousands of contacts, in WhatsApp groups, on social media, or via email at no extra cost.', cat: 'Sharing' },
  { q: 'Can I share my card in WhatsApp groups?', a: 'Yes, you can share your PDF card in any WhatsApp group. Group members can download and forward it to their contacts.', cat: 'Sharing' },
  { q: 'Can I email my PDF card?', a: 'Yes, you can attach your PDF card to emails just like any other document. Recipients can download and view it.', cat: 'Sharing' },
  { q: 'Can I post my PDF card on social media?', a: 'Yes, you can share your PDF card on Facebook, Instagram, LinkedIn, and other platforms. However, for social media, a screenshot of your card often works better visually.', cat: 'Sharing' },
  { q: 'Do recipients need a special app to view my card?', a: 'No. Every smartphone has a built-in PDF viewer. Recipients just tap the file and it opens instantly with all clickable links working.', cat: 'Sharing' },
  { q: 'Can my clients forward my card to others?', a: 'Yes, that is one of the biggest advantages. Your clients can forward your PDF card to their contacts, giving you free referrals.', cat: 'Sharing' },

  // Industries (8)
  { q: 'Do you make cards for doctors?', a: 'Yes, we create specialized PDF cards for doctors with clinic details, appointment booking links, consultation timings, and clinic location maps.', cat: 'Industries' },
  { q: 'Can real estate agents use PDF cards?', a: 'Absolutely. Realtor cards include property inquiry buttons, WhatsApp chat, office location, and broker registration details.', cat: 'Industries' },
  { q: 'Do you make cards for lawyers?', a: 'Yes, lawyer cards include chamber address, court details, area of practice, consultation booking, and professional credentials.', cat: 'Industries' },
  { q: 'Can CA and tax consultants get PDF cards?', a: 'Yes, we create cards for CAs, tax consultants, and financial advisors with service listings, ICAI details, and consultation booking.', cat: 'Industries' },
  { q: 'Do you make cards for salons and spas?', a: 'Yes, salon cards include service menus, pricing, portfolio photos, booking links, and location details.', cat: 'Industries' },
  { q: 'Can restaurant owners use PDF cards?', a: 'Yes, restaurant cards include menu highlights, table booking, location map, online ordering links, and food photos.', cat: 'Industries' },
  { q: 'Do you make cards for freelancers?', a: 'Yes, freelancer cards showcase your skills, portfolio, rates, testimonials, and contact details in a professional format.', cat: 'Industries' },
  { q: 'Can gym trainers get PDF cards?', a: 'Yes, gym and fitness trainer cards include membership plans, class schedules, transformation photos, and trial booking links.', cat: 'Industries' },
];

const categories = ['All', 'General', 'Pricing', 'Features', 'Ordering', 'Sharing', 'Industries'];

export default function FaqPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [openQ, setOpenQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqsAll.filter(f => {
    const matchesCat = activeCat === 'All' || f.cat === activeCat;
    const matchesSearch = !searchQuery || f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-4">FAQ Hub</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4">Frequently Asked Questions</h1>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-8">
              {faqsAll.length}+ questions answered about PDF digital business cards. Search or browse by category.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309] focus:bg-white/15 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-14 md:py-16 bg-[#f8f7f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCat(cat); setOpenQ(null); }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCat === cat ? 'bg-[#ff8309] text-white' : 'bg-white text-[#0a2b4a] border border-gray-200 hover:border-[#ff8309]'}`}>
                {cat} {cat !== 'All' && <span className="opacity-60">({faqsAll.filter(f => f.cat === cat).length})</span>}
              </button>
            ))}
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-center text-xs text-[#888] mb-4">
              {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
            </p>
          )}

          {/* FAQ Accordion */}
          <div className="space-y-2">
            {filteredFaqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: i * 0.01 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenQ(openQ === f.q ? null : f.q)}
                  className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-sm font-bold text-[#0a2b4a] pr-4">{f.q}</span>
                  <ChevronDown size={18} className={`text-[#ff8309] flex-shrink-0 transition-transform ${openQ === f.q ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openQ === f.q && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="px-4 pb-4 text-[#555] text-xs leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#888] text-sm">No questions found. Try a different search.</p>
            </div>
          )}

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-gradient-to-r from-[#0a2b4a] to-[#103558] rounded-xl p-6 text-center"
          >
            <h3 className="text-white font-bold text-lg mb-2">Still Have Questions?</h3>
            <p className="text-white/60 text-sm mb-4">Our team is ready to help you on WhatsApp.</p>
            <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition-all">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqsAll.slice(0, 15).map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </div>
  );
}
