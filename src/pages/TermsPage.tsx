import { Link } from 'react-router';

export default function TermsPage() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Terms & Conditions</h1>
          <p className="text-white/60 text-sm">Last updated: May 24, 2026</p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {[
            { title: 'Acceptance of Terms', content: 'By accessing and using MyCarda\'s PDF digital business card services, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.' },
            { title: 'Service Description', content: 'MyCarda provides digital business card creation services in PDF format. Our services include design and creation of interactive PDF visiting cards with clickable links for phone, WhatsApp, email, website, payment QR codes, Google Maps, and social media integration.' },
            { title: 'Order Process', content: 'All orders are placed through our booking forms or WhatsApp. To place an order: select your plan, provide your details, upload your logo/photo, and make payment. We reserve the right to refuse service to anyone for any reason.' },
            { title: 'Payment Terms', content: 'All payments must be made in advance before the design process begins. We accept UPI, bank transfer, and cash. All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless otherwise stated.' },
            { title: 'Delivery Policy', content: 'We aim to deliver all PDF digital business cards within 24 hours of receiving complete details and payment. Delivery times may vary based on design complexity, revision requests, and current order queue. The final PDF is delivered via WhatsApp or email.' },
            { title: 'Revisions', content: 'Started Plan (Rs 99): 1 round of minor text changes. Business Plan (Rs 499): 2 rounds of revisions. Premium Plan (Rs 999): Unlimited revisions. Additional revisions beyond included rounds may be charged.' },
            { title: 'Intellectual Property', content: 'Upon full payment, you receive full rights to use your PDF digital business card for personal and commercial purposes. We retain the right to showcase the design in our portfolio unless explicitly requested otherwise. You confirm that all content provided belongs to you.' },
            { title: 'Limitation of Liability', content: 'MyCarda shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the service. We do not guarantee uninterrupted, error-free service.' },
            { title: 'Contact Information', content: 'For questions about these terms, contact us via WhatsApp at +91 95177-22444 or email at mydigitalcarda@gmail.com.' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-[#0a2b4a] mb-2">{section.title}</h2>
              <p className="text-[#555] text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
