import { Link } from 'react-router';

export default function RefundPolicy() {
  return (
    <div>
      <div className="bg-[#f8f7f7] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-xs text-[#888]">
            <Link to="/" className="text-[#ff8309] hover:underline">Home</Link><span className="mx-2">/</span><span className="text-[#0a2b4a]">Refund Policy</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Refund Policy</h1>
          <p className="text-white/60 text-sm">Last updated: May 24, 2026</p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {[
            { title: 'Our Promise', content: 'We stand behind the quality of our PDF digital business cards. If you are not satisfied, we offer refunds within 7 days of delivery under the conditions outlined below.' },
            { title: 'When Refunds Are Applicable', content: 'You are eligible for a refund if: the PDF card was not delivered within 24 hours and you no longer wish to proceed; the delivered card contains broken or non-functional links that we cannot fix; the design significantly deviates from the approved preview; you cancel before design work has begun; or a duplicate payment was made.' },
            { title: 'When Refunds Are NOT Applicable', content: 'Refunds will not be issued if: you change your mind after approving the final design; incorrect information was provided by you; you have already used the PDF card for business purposes; more than 7 days have passed since delivery; or you request a refund due to personal preference after multiple revisions.' },
            { title: 'How to Request a Refund', content: 'Contact us via WhatsApp at +91 95177-22444 within 7 days of delivery. Provide your order details and reason for refund. Our team will review your request within 48 hours. If approved, the refund will be processed to your original payment method within 5-7 business days.' },
            { title: 'Partial Refunds', content: 'In certain cases, we may offer partial refunds: 30-50% if some links are non-functional but the card is otherwise usable; difference amount if you downgrade before work begins; rush fee refund if standard delivery was provided instead.' },
            { title: 'Replacement Policy', content: 'In most cases, we prefer to fix issues rather than issue refunds. We offer free correction of broken links, one complimentary re-design if the original does not match the approved preview, and file format conversion at no charge.' },
            { title: 'Order Cancellation', content: 'Before design begins: full refund. Before preview is shared: 80% refund. After preview but before approval: 50% refund. After final approval: no refund (replacement policy applies).' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-[#0a2b4a] mb-2">{section.title}</h2>
              <p className="text-[#555] text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}

          <div className="bg-[#fff8f0] border border-[#ff8309]/20 rounded-xl p-5">
            <p className="text-[#8b5e1a] text-sm"><strong>Contact for Refunds:</strong> WhatsApp <a href="https://wa.me/919517722444" className="text-[#ff8309] font-medium">+91 95177-22444</a> | Email: mydigitalcarda@gmail.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
