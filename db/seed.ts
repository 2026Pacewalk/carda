import { getDb } from "../api/queries/connection";
import { packages, cardTemplates } from "./schema";

async function seed() {
  const db = getDb();

  await db.insert(packages).values([
    {
      name: "Started",
      slug: "started",
      price: "99.00",
      description: "Perfect for individuals. 1 basic PDF card with essential contact links.",
      features: ["1 PDF card", "Basic templates", "Click-to-call", "WhatsApp link", "Email link"],
      maxCards: 1,
      maxTemplates: 5,
      allowSocialLinks: false,
      allowPaymentQr: false,
      allowBusinessImages: false,
      allowServicesList: false,
      prioritySupport: false,
    },
    {
      name: "Business",
      slug: "business",
      price: "499.00",
      description: "Best for professionals. Social media links and payment QR code.",
      features: ["3 PDF cards", "Premium templates", "Social media links", "Payment QR code", "Google Maps"],
      maxCards: 3,
      maxTemplates: 15,
      allowSocialLinks: true,
      allowPaymentQr: true,
      allowBusinessImages: false,
      allowServicesList: true,
      prioritySupport: false,
    },
    {
      name: "Premium",
      slug: "premium",
      price: "999.00",
      description: "Complete solution. All features including business images and priority support.",
      features: ["10 PDF cards", "All templates", "Business images", "Service showcase", "Priority support"],
      maxCards: 10,
      maxTemplates: 50,
      allowSocialLinks: true,
      allowPaymentQr: true,
      allowBusinessImages: true,
      allowServicesList: true,
      prioritySupport: true,
    },
  ]);

  await db.insert(cardTemplates).values([
    { name: "Classic Navy", category: "professional", thumbnailUrl: "/images/themes/theme-1.jpg", minPackage: "started" },
    { name: "Modern Orange", category: "creative", thumbnailUrl: "/images/themes/theme-2.jpg", minPackage: "started" },
    { name: "Minimal White", category: "minimal", thumbnailUrl: "/images/themes/theme-3.jpg", minPackage: "started" },
    { name: "Bold Dark", category: "bold", thumbnailUrl: "/images/themes/theme-4.jpg", minPackage: "business" },
    { name: "Elegant Gold", category: "elegant", thumbnailUrl: "/images/themes/theme-5.jpg", minPackage: "business" },
    { name: "Tech Gradient", category: "creative", thumbnailUrl: "/images/themes/theme-6.jpg", minPackage: "premium" },
  ]);

  console.log("Seed complete!");
}

seed().catch((err) => { console.error(err); process.exit(1); });
