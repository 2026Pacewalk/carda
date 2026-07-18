export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  faqs?: { q: string; a: string }[];
  relatedSlugs?: string[];
  tableOfContents?: { id: string; title: string; h3s?: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-pdf-digital-business-card',
    title: 'What is a PDF Digital Business Card? Complete Guide 2026',
    excerpt: 'Learn how interactive PDF cards work and why they are the smartest choice for professionals in 2026.',
    date: '2026-01-15',
    author: 'MyCarda Team',
    category: 'Guide',
    readTime: '6 min read',
    image: '/images/b1.jpg',
    tags: ['PDF Card', 'Digital Business Card', 'Guide'],
    content: `A PDF Digital Business Card is an interactive, professionally designed PDF document that contains all your business and contact information in a visually appealing format. Unlike traditional paper cards, PDF cards can be shared instantly via WhatsApp, email, or social media, and they never run out.`,
    relatedSlugs: ['benefits-pdf-visiting-cards-small-business', 'how-to-share-pdf-business-card-whatsapp'],
    faqs: [
      { q: 'What is a PDF digital business card?', a: 'A PDF digital business card is an interactive PDF document containing your contact information, business details, and clickable links.' },
      { q: 'How is a PDF card different from a paper card?', a: 'PDF cards are digital, shareable via WhatsApp/email, never run out, and contain clickable links.' },
    ],
  },
  {
    slug: 'benefits-pdf-visiting-cards-small-business',
    title: 'Benefits of PDF Visiting Cards for Small Businesses',
    excerpt: 'Discover why small businesses across India are switching to PDF digital cards.',
    date: '2026-01-20',
    author: 'MyCarda Team',
    category: 'Business',
    readTime: '5 min read',
    image: '/images/b2.jpg',
    tags: ['Small Business', 'PDF Card', 'Benefits'],
    content: `Small businesses in India are rapidly adopting PDF digital business cards because they are cost-effective, eco-friendly, and incredibly easy to share.`,
    relatedSlugs: ['what-is-pdf-digital-business-card', 'pdf-card-vs-traditional-card'],
    faqs: [
      { q: 'Why should small businesses use PDF cards?', a: 'PDF cards are affordable, easy to share, and help small businesses look professional.' },
    ],
  },
  {
    slug: 'how-to-share-pdf-business-card-whatsapp',
    title: 'How to Share PDF Business Cards on WhatsApp',
    excerpt: 'A complete guide to sharing your PDF card on WhatsApp for maximum reach.',
    date: '2026-02-01',
    author: 'MyCarda Team',
    category: 'Tutorial',
    readTime: '4 min read',
    image: '/images/b3.jpg',
    tags: ['WhatsApp', 'PDF Card', 'Tutorial'],
    content: `Sharing your PDF digital business card on WhatsApp is one of the most effective ways to network in India.`,
    relatedSlugs: ['what-is-pdf-digital-business-card', 'pdf-business-card-design-tips'],
  },
  {
    slug: 'pdf-card-vs-traditional-card',
    title: 'PDF Digital Card vs Traditional Paper Card: Which is Better?',
    excerpt: 'Compare PDF digital cards with traditional paper cards to make the right choice.',
    date: '2026-02-10',
    author: 'MyCarda Team',
    category: 'Comparison',
    readTime: '5 min read',
    image: '/images/b4.jpg',
    tags: ['Comparison', 'PDF Card', 'Traditional Card'],
    content: `In 2026, professionals face a choice: stick with traditional paper cards or switch to modern PDF digital cards.`,
  },
  {
    slug: 'pdf-business-card-design-tips',
    title: '10 PDF Business Card Design Tips for Professionals',
    excerpt: 'Learn how to design a stunning PDF business card that leaves a lasting impression.',
    date: '2026-02-18',
    author: 'MyCarda Team',
    category: 'Design',
    readTime: '7 min read',
    image: '/images/b5.jpg',
    tags: ['Design', 'PDF Card', 'Tips'],
    content: `Designing a professional PDF business card requires attention to layout, typography, color, and branding.`,
  },
  {
    slug: 'best-pdf-card-for-doctors-india',
    title: 'Best PDF Digital Business Card for Doctors in India',
    excerpt: 'Why doctors need specialized PDF cards with appointment links and clinic details.',
    date: '2026-02-25',
    author: 'MyCarda Team',
    category: 'Industry',
    readTime: '5 min read',
    image: '/images/b6.jpg',
    tags: ['Doctors', 'Healthcare', 'PDF Card'],
    content: `Doctors in India can benefit greatly from PDF digital business cards that include clinic timings.`,
  },
  {
    slug: 'pdf-business-card-for-real-estate',
    title: 'PDF Business Card for Real Estate Agents: Complete Solution',
    excerpt: 'How real estate professionals use PDF cards with property links and maps.',
    date: '2026-03-05',
    author: 'MyCarda Team',
    category: 'Industry',
    readTime: '5 min read',
    image: '/images/b7.jpg',
    tags: ['Real Estate', 'Property', 'PDF Card'],
    content: `Real estate agents need business cards that showcase property listings and enable instant contact.`,
  },
  {
    slug: 'pdf-digital-card-for-restaurants',
    title: 'PDF Digital Menu Card for Restaurants & Cafes',
    excerpt: 'Create interactive PDF menu cards with table booking and online ordering links.',
    date: '2026-03-12',
    author: 'MyCarda Team',
    category: 'Industry',
    readTime: '4 min read',
    image: '/images/b8.jpg',
    tags: ['Restaurant', 'Menu Card', 'PDF'],
    content: `Restaurants and cafes can use PDF digital cards as interactive menus with ordering links.`,
  },
  {
    slug: 'why-pdf-cards-best-for-freelancers',
    title: 'Why PDF Business Cards Are Best for Freelancers',
    excerpt: 'Freelancers love PDF cards because they are easy to customize and share with clients.',
    date: '2026-03-18',
    author: 'MyCarda Team',
    category: 'Freelancing',
    readTime: '4 min read',
    image: '/images/b9.jpg',
    tags: ['Freelancers', 'Portfolio', 'PDF Card'],
    content: `Freelancers need business cards that can be updated frequently and shared across platforms.`,
  },
  {
    slug: 'pdf-card-payment-qr-code-upi',
    title: 'Add Payment QR Code & UPI to Your PDF Business Card',
    excerpt: 'Enable instant payments by adding UPI QR codes to your PDF digital business card.',
    date: '2026-03-25',
    author: 'MyCarda Team',
    category: 'Tutorial',
    readTime: '4 min read',
    image: '/images/b10.jpg',
    tags: ['UPI', 'QR Code', 'Payments'],
    content: `Adding a payment QR code to your PDF business card makes it easy for clients to pay you instantly.`,
  },
  {
    slug: 'nfc-vs-pdf-digital-business-card',
    title: 'NFC Card vs PDF Digital Business Card: What to Choose?',
    excerpt: 'Compare NFC business cards with PDF digital cards and find the best option.',
    date: '2026-04-01',
    author: 'MyCarda Team',
    category: 'Comparison',
    readTime: '6 min read',
    image: '/images/b11.jpg',
    tags: ['NFC', 'Comparison', 'PDF Card'],
    content: `NFC cards and PDF cards serve similar purposes but have different use cases and audiences.`,
  },
  {
    slug: 'how-to-make-free-qr-code-business',
    title: 'How to Create a Free QR Code for Your Business',
    excerpt: 'Generate free QR codes for your business using our QR code generator tool.',
    date: '2026-04-08',
    author: 'MyCarda Team',
    category: 'Tutorial',
    readTime: '3 min read',
    image: '/images/b12.jpg',
    tags: ['QR Code', 'Free Tool', 'Tutorial'],
    content: `QR codes are essential for modern businesses. Learn how to create them for free.`,
  },
  {
    slug: 'pdf-business-card-chandigarh-zirakpur',
    title: 'PDF Digital Business Card in Chandigarh, Zirakpur & Mohali',
    excerpt: 'Get your professional PDF business card designed in Chandigarh Tricity area.',
    date: '2026-04-15',
    author: 'MyCarda Team',
    category: 'Local',
    readTime: '4 min read',
    image: '/images/b13.jpg',
    tags: ['Chandigarh', 'Zirakpur', 'Mohali'],
    content: `We provide PDF digital business card design services in Chandigarh, Zirakpur, and Mohali.`,
  },
  {
    slug: 'digital-visiting-card-price-india',
    title: 'Digital Visiting Card Price in India: Complete Pricing Guide',
    excerpt: 'Compare prices of digital business cards across different providers in India.',
    date: '2026-04-22',
    author: 'MyCarda Team',
    category: 'Pricing',
    readTime: '5 min read',
    image: '/images/b14.jpg',
    tags: ['Pricing', 'India', 'Comparison'],
    content: `Understanding digital visiting card pricing in India helps you make informed decisions.`,
  },
  {
    slug: 'eco-friendly-paperless-business-card',
    title: 'Go Green with Eco-Friendly Paperless Business Cards',
    excerpt: 'Switch to eco-friendly PDF digital cards and reduce your carbon footprint.',
    date: '2026-04-30',
    author: 'MyCarda Team',
    category: 'Sustainability',
    readTime: '4 min read',
    image: '/images/b15.jpg',
    tags: ['Eco-Friendly', 'Green', 'Sustainable'],
    content: `Paperless business cards are the sustainable choice for environmentally conscious professionals.`,
  },
];

export const blogCategories = ['All', 'Guide', 'Business', 'Tutorial', 'Comparison', 'Design', 'Industry', 'Freelancing', 'Local', 'Pricing', 'Sustainability'];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getRecentPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return blogPosts.filter(p => p.slug !== currentSlug).slice(0, count);
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return blogPosts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
}
