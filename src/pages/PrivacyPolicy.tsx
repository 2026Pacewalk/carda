import { Link } from 'react-router';

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60 text-sm">Last updated: May 24, 2026</p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {[
            { title: 'Information We Collect', content: 'We collect information you provide when ordering a PDF digital business card, including your name, designation, company name, contact details (phone, WhatsApp, email), social media links, and any images or logos you upload. We also collect payment information processed through our secure payment gateway.' },
            { title: 'How We Use Your Information', content: 'We use your information solely to create and deliver your PDF digital business card. Your contact details and business information are used only for the purpose of designing your card and communicating with you about your order. We do not use your data for marketing without your consent.' },
            { title: 'Data Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.' },
            { title: 'Data Security', content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmission is encrypted using industry-standard SSL/TLS protocols.' },
            { title: 'Your Rights', content: 'You have the right to request access to your personal data, request corrections, request deletion, and opt out of communications. Contact us via WhatsApp at +91 95177-22444 for any data-related requests.' },
            { title: 'Cookies', content: 'We use minimal cookies to improve your browsing experience. These cookies do not collect personally identifiable information. You can disable cookies in your browser settings.' },
            { title: 'Third-Party Links', content: 'Our website may contain links to third-party websites (such as payment gateways). We are not responsible for the privacy practices of these external sites.' },
            { title: 'Changes to This Policy', content: 'We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the updated policy.' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-[#0a2b4a] mb-2">{section.title}</h2>
              <p className="text-[#555] text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-100">
            <p className="text-[#888] text-xs">For any privacy-related questions, contact us at <a href="mailto:mydigitalcarda@gmail.com" className="text-[#ff8309]">mydigitalcarda@gmail.com</a> or WhatsApp <a href="https://wa.me/919517722444" className="text-[#ff8309]">+91 95177-22444</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
