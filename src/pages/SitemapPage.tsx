import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Globe, Building2, MapPin, Shield, PenTool, QrCode, FileText } from 'lucide-react';

// React SPA routes - use <Link> for client-side navigation
const mainPages = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/pdf-digital-business-card' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Samples', path: '/pdf-card-samples' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Industries', path: '/industries' },
  { label: 'Reseller Program', path: '/reseller-program' },
  { label: 'Blog', path: '/blog' },
  { label: 'Sitemap', path: '/sitemap' },
];

// Static HTML pages - use <a> for full page load
const staticMainPages = [
  { label: 'About Us', href: '/about-us.html' },
  { label: 'Contact Us', href: '/contact-us.html' },
];

const industryPages = [
  { label: 'Doctor PDF Business Card', href: '/doctor-pdf-business-card.html' },
  { label: 'Realtor PDF Visiting Card', href: '/realtor-pdf-visiting-card.html' },
  { label: 'Salon PDF Business Card', href: '/salon-pdf-digital-card.html' },
  { label: 'Lawyer PDF Visiting Card', href: '/lawyer-pdf-visiting-card.html' },
  { label: 'CA PDF Business Card', href: '/ca-pdf-business-card.html' },
  { label: 'Restaurant PDF Menu Card', href: '/restaurant-pdf-digital-card.html' },
  { label: 'Gym PDF Business Card', href: '/gym-pdf-business-card.html' },
  { label: 'Insurance Agent PDF Card', href: '/insurance-agent-pdf-card.html' },
  { label: 'Freelancer PDF Business Card', href: '/freelancer-pdf-business-card.html' },
  { label: 'Wedding Vendor PDF Card', href: '/wedding-vendor-pdf-card.html' },
];

const locationPages = [
  { label: 'PDF Business Card Chandigarh', href: '/pdf-digital-business-card-chandigarh.html' },
  { label: 'PDF Business Card Zirakpur', href: '/pdf-digital-business-card-zirakpur.html' },
  { label: 'PDF Business Card Mohali', href: '/pdf-digital-business-card-mohali.html' },
  { label: 'PDF Business Card Panchkula', href: '/pdf-digital-business-card-panchkula.html' },
  { label: 'PDF Business Card Delhi', href: '/pdf-digital-business-card-delhi.html' },
  { label: 'PDF Business Card Mumbai', href: '/pdf-digital-business-card-mumbai.html' },
  { label: 'PDF Business Card Bangalore', href: '/pdf-digital-business-card-bangalore.html' },
];

const blogPages = [
  { label: 'What is a PDF Digital Business Card?', path: '/blog/what-is-pdf-digital-business-card' },
  { label: 'Top 10 Benefits of PDF Visiting Cards', path: '/blog/benefits-pdf-visiting-cards-businesses' },
  { label: 'PDF Business Card vs Printed Card', path: '/blog/pdf-business-card-vs-printed-card' },
  { label: 'How to Share PDF Card on WhatsApp', path: '/blog/how-to-share-pdf-business-card-on-whatsapp' },
  { label: 'Why Small Businesses Need PDF Cards', path: '/blog/why-small-businesses-need-pdf-visiting-cards' },
  { label: 'Best PDF Business Card Designs 2026', path: '/blog/best-pdf-business-card-designs-2026' },
  { label: 'PDF Cards for Real Estate Agents', path: '/blog/how-realtors-use-pdf-business-cards' },
  { label: 'Digital Visiting Cards for Doctors', path: '/blog/best-digital-visiting-cards-doctors' },
  { label: 'PDF Cards for Business Branding', path: '/blog/how-pdf-cards-improve-business-branding' },
  { label: 'PDF Cards for Professional Networking', path: '/blog/why-pdf-visiting-cards-better-networking' },
  { label: 'Affordable PDF Business Card Solutions', path: '/blog/affordable-pdf-business-card-solutions' },
  { label: 'Digital Business Card Trends 2026', path: '/blog/business-card-trends-2026' },
  { label: 'Create Professional PDF Visiting Card', path: '/blog/how-to-create-professional-pdf-visiting-card' },
  { label: 'Interactive PDF Business Cards Guide', path: '/blog/interactive-pdf-business-cards-explained' },
  { label: 'Best Industries for PDF Cards', path: '/blog/best-industries-pdf-digital-business-cards' },
];

const toolPages = [
  { label: 'QR Code Generator', href: '/qr-code-generator.html' },
  { label: 'FAQ Hub', href: '/faq.html' },
  { label: 'Started Card (Rs 99)', href: '/started-card.html' },
  { label: 'Business Card (Rs 499)', href: '/basic-card.html' },
  { label: 'Premium Card (Rs 999)', href: '/pro-card.html' },
];

const trustPages = [
  { label: 'Privacy Policy', href: '/privacy-policy.html' },
  { label: 'Terms & Conditions', href: '/terms.html' },
  { label: 'Refund Policy', href: '/refund-policy.html' },
];

// Section card for React route links (uses <Link>)
const RouteCard = ({ icon: Icon, title, items, delay }: { icon: any, title: string, items: {label: string, path: string}[], delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center">
        <Icon size={14} className="text-white" />
      </div>
      <h2 className="text-sm font-bold text-[#0a2b4a]">{title}</h2>
    </div>
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.path}>
          <Link to={item.path} className="text-xs text-[#555] hover:text-[#ff8309] transition-colors flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#ff8309] flex-shrink-0" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </motion.div>
);

// Section card for static HTML links (uses <a>)
const StaticCard = ({ icon: Icon, title, items, delay }: { icon: any, title: string, items: {label: string, href: string}[], delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center">
        <Icon size={14} className="text-white" />
      </div>
      <h2 className="text-sm font-bold text-[#0a2b4a]">{title}</h2>
    </div>
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="text-xs text-[#555] hover:text-[#ff8309] transition-colors flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#ff8309] flex-shrink-0" />
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
);

// Mixed card with both React routes and static links
const MixedCard = ({ icon: Icon, title, routes, statics, delay }: { icon: any, title: string, routes?: {label: string, path: string}[], statics?: {label: string, href: string}[], delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center">
        <Icon size={14} className="text-white" />
      </div>
      <h2 className="text-sm font-bold text-[#0a2b4a]">{title}</h2>
    </div>
    <ul className="space-y-1.5">
      {routes?.map((item) => (
        <li key={item.path}>
          <Link to={item.path} className="text-xs text-[#555] hover:text-[#ff8309] transition-colors flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#ff8309] flex-shrink-0" />
            {item.label}
          </Link>
        </li>
      ))}
      {statics?.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="text-xs text-[#555] hover:text-[#ff8309] transition-colors flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#ff8309] flex-shrink-0" />
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function SitemapPage() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0a2b4a]">Sitemap</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-orange mb-3">Navigation</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 mb-3">Complete Website Sitemap</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto mb-4">
              Browse all pages on MyCarda including industries, locations, blog articles, tools, and trust pages.
            </p>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold hover:bg-white/20 transition-all">
              <FileText size={14} className="text-[#ff8309]" /> View sitemap.xml
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-10 md:py-14 bg-[#f8f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <MixedCard
              icon={Globe}
              title="Main Pages"
              routes={mainPages}
              statics={staticMainPages}
              delay={0}
            />
            <StaticCard icon={Building2} title="Industry Pages" items={industryPages} delay={0.05} />
            <StaticCard icon={MapPin} title="Location Pages" items={locationPages} delay={0.1} />
            <RouteCard icon={PenTool} title="Blog Articles" items={blogPages} delay={0.15} />
            <StaticCard icon={QrCode} title="Tools & Booking" items={toolPages} delay={0.2} />
            <StaticCard icon={Shield} title="Trust & Legal" items={trustPages} delay={0.25} />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 bg-gradient-to-r from-[#0a2b4a] to-[#103558] rounded-xl p-6 text-center"
          >
            <h3 className="text-white font-bold text-lg mb-2">Need a PDF Digital Business Card?</h3>
            <p className="text-white/60 text-sm mb-4">Professional, interactive, and shareable. Starting at just Rs 99.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/pricing" className="btn-orange">View Pricing</Link>
              <a href="/contact-us.html" className="btn-outline-white">Contact Us</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
