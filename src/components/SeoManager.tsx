import { useLocation } from "react-router";
import Seo from "./Seo";
import { industrySlugs } from "@/data/industries";
import { locationSlugs } from "@/data/locations";

type Meta = { title: string; description: string; keywords?: string };

// Per-route SEO metadata for all static public routes.
const META: Record<string, Meta> = {
  "/": {
    title: "MyCarda — Interactive PDF Business Cards Starting at Rs 99",
    description:
      "Get a professional interactive PDF digital business card with click-to-call, WhatsApp, UPI payment QR & social links. One-time payment, delivered in 24 hours. India's #1 PDF visiting card provider.",
    keywords:
      "pdf business card, digital visiting card, pdf visiting card, digital business card india, interactive pdf card, mycarda",
  },
  "/about-us": {
    title: "About Us — India's Trusted PDF Business Card Provider",
    description:
      "Since 2020, MyCarda has helped 12,500+ professionals across India create beautiful, interactive PDF business cards. Learn about our mission and why customers trust us.",
  },
  "/pdf-digital-business-card": {
    title: "PDF Digital Business Card Services & Features",
    description:
      "Explore MyCarda's interactive PDF business card services — click-to-call, WhatsApp share, UPI payment QR, Google Maps, social links and custom branded designs. Delivered in 24 hours.",
  },
  "/pricing": {
    title: "Pricing — PDF Business Cards from Rs 99",
    description:
      "Simple one-time pricing for PDF digital business cards: Started (Rs 99), Business (Rs 499) and Premium (Rs 999). No subscription, no hidden fees. Choose your plan today.",
  },
  "/pdf-card-samples": {
    title: "PDF Card Design Samples — 50+ Professional Themes",
    description:
      "Browse 50+ professional PDF digital business card design themes across Professional, Creative, Minimal, Bold and Elegant styles. Find the perfect look for your profession.",
  },
  "/how-it-works": {
    title: "How It Works — Get Your PDF Card in 3 Simple Steps",
    description:
      "See how MyCarda works: choose your plan, share your details on WhatsApp, and receive your interactive PDF business card within 24 hours. Simple, fast and hassle-free.",
  },
  "/industries": {
    title: "PDF Business Cards by Industry — Doctors, Realtors & More",
    description:
      "Industry-specific PDF digital business cards for doctors, real estate agents, lawyers, salons, restaurants, gyms, freelancers, CAs and more. Designs tailored to your profession.",
  },
  "/contact-us": {
    title: "Contact MyCarda — PDF Business Card Support",
    description:
      "Get in touch with MyCarda for PDF digital business cards. Call or WhatsApp +91 95177-22444, or email mydigitalcarda@gmail.com. We reply fast and deliver in 24 hours.",
  },
  "/blog": {
    title: "Blog — PDF Business Card Tips, Guides & Ideas",
    description:
      "Expert tips, guides and ideas on PDF digital business cards — how they work, benefits for your business, WhatsApp sharing, design inspiration and more from MyCarda.",
  },
  "/faq": {
    title: "FAQ — PDF Digital Business Card Questions Answered",
    description:
      "Answers to common questions about MyCarda PDF business cards: how they work, delivery time, customization, payments, revisions, sharing and device compatibility.",
  },
  "/sitemap": {
    title: "Sitemap — Explore MyCarda",
    description:
      "Browse all pages of MyCarda — services, pricing, samples, industries, blog and more. Find everything about our interactive PDF digital business cards.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "Read MyCarda's privacy policy to understand how we collect, use and protect your personal information when you use our PDF digital business card services.",
  },
  "/terms": {
    title: "Terms & Conditions",
    description:
      "Read the terms and conditions for using MyCarda's PDF digital business card services, including orders, payments, revisions and delivery.",
  },
  "/refund-policy": {
    title: "Refund Policy",
    description:
      "Understand MyCarda's refund policy for PDF digital business card orders — eligibility, process and timelines.",
  },
  // Auth pages — indexed off
  "/login": {
    title: "Customer Login",
    description: "Log in to your MyCarda account to manage your PDF business cards and orders.",
  },
  "/register": {
    title: "Create Account",
    description: "Create a free MyCarda account to order and manage your interactive PDF digital business cards.",
  },
  "/admin/login": {
    title: "Admin Login",
    description: "MyCarda admin panel login.",
  },
};

const NOINDEX_PATHS = new Set(["/login", "/register", "/admin/login"]);
const NOINDEX_PREFIXES = ["/customer", "/dashboard", "/admin"];

export default function SeoManager() {
  const { pathname } = useLocation();

  const meta = META[pathname];
  if (meta) {
    return <Seo path={pathname} title={meta.title} description={meta.description} keywords={meta.keywords} noindex={NOINDEX_PATHS.has(pathname)} />;
  }

  // Blog posts and industry pages render their own <Seo>.
  if (pathname.startsWith("/blog/")) return null;
  if (industrySlugs.has(pathname)) return null;
  if (locationSlugs.has(pathname)) return null;

  // Authenticated app areas — never index.
  if (NOINDEX_PREFIXES.some((p) => pathname.startsWith(p))) {
    return <Seo path={pathname} noindex title="MyCarda Dashboard" description="Manage your MyCarda PDF business cards and account." />;
  }

  // Fallback (404 / unknown) — never index.
  return <Seo path={pathname} noindex title="Page Not Found" description="The page you are looking for could not be found." />;
}
