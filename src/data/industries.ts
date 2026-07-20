import type { LucideIcon } from "lucide-react";
import { Stethoscope, Home, Scissors, Scale, Calculator, UtensilsCrossed, Dumbbell, Shield, Briefcase, PartyPopper } from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  profession: string;
  icon: LucideIcon;
  color: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  tagline: string;
  answer: string;
  intro: string;
  features: { title: string; desc: string }[];
  whyPoints: string[];
  useCase: string;
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    "slug": "doctor-pdf-business-card",
    "name": "Doctors & Clinics",
    "profession": "Doctors",
    "icon": Stethoscope,
    "color": "from-red-500 to-red-600",
    "metaTitle": "PDF Business Card for Doctors | MyCarda",
    "metaDescription": "Get an interactive PDF digital business card for doctors with appointment booking, clinic timings & UPI. Delivered in 24 hours. Order from ₹99.",
    "keywords": "pdf business card for doctors, digital visiting card for clinic, doctor visiting card online, doctor digital business card india, clinic qr card, appointment booking card",
    "h1": "PDF Digital Business Card for Doctors & Clinics",
    "tagline": "Let patients call, book and reach your clinic in one tap from a single smart PDF card.",
    "answer": "A doctor's PDF digital business card gives patients one tap to call, book appointments, find the clinic on Google Maps and pay consultation fees via UPI QR. It displays timings, credentials, multiple clinic addresses and a WhatsApp button for queries. Works on every phone, no app needed, delivered within 24 hours.",
    "intro": "Patients rarely keep paper cards, but they always have their phone. A shareable PDF card puts your clinic details, booking and payments a single tap away.",
    "features": [
      {
        "title": "One-tap appointment booking",
        "desc": "Patients tap once to request a slot on WhatsApp or your booking link, cutting missed calls and no-shows."
      },
      {
        "title": "Clinic timings & location",
        "desc": "Show OPD hours and an instant Google Maps link so patients reach the right clinic on time."
      },
      {
        "title": "Consultation fee UPI QR",
        "desc": "Let patients pay fees or advance booking amounts instantly by scanning your UPI QR code."
      },
      {
        "title": "WhatsApp for patient queries",
        "desc": "A direct WhatsApp button lets patients ask questions, share reports and confirm visits quickly."
      },
      {
        "title": "Multiple clinic addresses",
        "desc": "List every clinic or hospital you visit with separate maps and timings on one card."
      },
      {
        "title": "Verified credentials display",
        "desc": "Showcase your MBBS, MD, registrations and specialities to build instant patient trust."
      }
    ],
    "whyPoints": [
      "Reduce phone queries with tap-to-book and WhatsApp",
      "Build trust by displaying verified qualifications",
      "Accept consultation fees instantly via UPI",
      "Share across WhatsApp with patients and referrals"
    ],
    "useCase": "Dr. Mehta runs OPD at two clinics in Chandigarh. She shares her MyCarda PDF card on WhatsApp after every visit, so patients tap to see timings, book their next appointment and pay the fee via UPI QR. Referring doctors forward the same card, bringing in new patients without printing a single card.",
    "faqs": [
      {
        "q": "Why does a doctor need a PDF digital business card?",
        "a": "A PDF card lets patients call, book, locate your clinic and pay fees in one tap. It replaces easily-lost paper cards and works on any phone without an app, making your practice more accessible."
      },
      {
        "q": "Can patients book appointments through the card?",
        "a": "Yes. The card includes a one-tap WhatsApp or booking-link button so patients can request slots directly. This reduces missed calls and helps your front desk manage the schedule better."
      },
      {
        "q": "Can I show multiple clinic locations on one card?",
        "a": "Absolutely. You can list several clinics or hospitals, each with its own Google Maps link and OPD timings, so patients always reach the correct location."
      },
      {
        "q": "Can patients pay consultation fees via the card?",
        "a": "Yes. Your UPI payment QR is built in, so patients scan and pay fees or advance booking amounts instantly. The money goes directly to your bank account."
      },
      {
        "q": "How fast can I get my doctor PDF card?",
        "a": "MyCarda delivers your interactive PDF card within 24 hours. Pricing starts at just ₹99 one-time with no subscription, and it works on every device."
      }
    ]
  },
  {
    "slug": "realtor-pdf-visiting-card",
    "name": "Real Estate Agents",
    "profession": "Real Estate Agents",
    "icon": Home,
    "color": "from-blue-500 to-blue-600",
    "metaTitle": "PDF Visiting Card for Real Estate Agents | MyCarda",
    "metaDescription": "Interactive PDF visiting card for realtors with property links, WhatsApp & maps. Share listings instantly. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf visiting card for real estate agents, digital business card for realtors, property dealer visiting card, real estate agent card online, realtor whatsapp card, property listing card",
    "h1": "PDF Digital Visiting Card for Real Estate Agents",
    "tagline": "Share properties, contact details and site locations with buyers in one tappable PDF card.",
    "answer": "A realtor's PDF visiting card lets buyers tap to call, WhatsApp, view live property listings, open site locations on Google Maps and connect on social media instantly. It doubles as a mini portfolio of your projects, works on every phone without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Property buyers decide fast and forget printed cards faster. A smart PDF card keeps your listings, contact and site maps one tap away when they are ready to visit.",
    "features": [
      {
        "title": "Live property listing links",
        "desc": "Attach a portfolio page of current flats, plots and commercial units buyers can browse instantly."
      },
      {
        "title": "Site location Google Maps",
        "desc": "Add direct map links to every project so buyers navigate to site visits without confusion."
      },
      {
        "title": "WhatsApp property enquiries",
        "desc": "Buyers tap once to WhatsApp you for prices, availability and site-visit bookings in real time."
      },
      {
        "title": "Photo & video walkthroughs",
        "desc": "Link virtual tours and property photos so buyers shortlist homes before stepping out."
      },
      {
        "title": "Token payment UPI QR",
        "desc": "Collect booking tokens or advance amounts securely with your built-in UPI payment QR code."
      },
      {
        "title": "Areas & specialities served",
        "desc": "Highlight the localities, budgets and property types you specialise in to attract the right leads."
      }
    ],
    "whyPoints": [
      "Send listings and site maps in one WhatsApp forward",
      "Show your portfolio to build buyer confidence",
      "Collect booking tokens instantly via UPI",
      "Stay top-of-mind long after the first meeting"
    ],
    "useCase": "Rahul, a property dealer in Zirakpur, meets buyers at site visits and shares his MyCarda card on WhatsApp. Buyers tap to browse his live listings, open the project location on Maps and message him for pricing. When ready, they scan his UPI QR to pay the booking token, closing deals faster.",
    "faqs": [
      {
        "q": "Why do real estate agents need a PDF visiting card?",
        "a": "A PDF card lets buyers view your listings, reach site locations and message you in one tap. It keeps your properties in front of buyers long after paper cards get lost, helping you close more deals."
      },
      {
        "q": "Can I show my property listings on the card?",
        "a": "Yes. Your card can link to a portfolio page with current flats, plots and commercial units, including photos and videos, so buyers browse and shortlist before contacting you."
      },
      {
        "q": "Can buyers navigate to site visits from the card?",
        "a": "Absolutely. Each project can carry a direct Google Maps link, so buyers get turn-by-turn directions to the exact site without repeated calls for the address."
      },
      {
        "q": "Can I collect booking tokens through the card?",
        "a": "Yes. Your UPI payment QR is built in, letting buyers pay booking tokens or advance amounts instantly, with funds credited straight to your bank account."
      },
      {
        "q": "How quickly will I receive my realtor PDF card?",
        "a": "MyCarda delivers your interactive PDF visiting card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
  {
    "slug": "salon-pdf-digital-card",
    "name": "Salons & Spas",
    "profession": "Salons",
    "icon": Scissors,
    "color": "from-pink-500 to-pink-600",
    "metaTitle": "PDF Digital Card for Salons & Spas | MyCarda",
    "metaDescription": "Interactive PDF digital card for salons with booking, service menu, offers & UPI. Fill your chairs faster. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf digital card for salons, salon visiting card online, spa digital business card, beauty parlour qr card, salon booking card, salon whatsapp card india",
    "h1": "PDF Digital Business Card for Salons & Spas",
    "tagline": "Let clients book slots, see your service menu and grab offers from one beautiful PDF card.",
    "answer": "A salon's PDF digital card lets clients tap to book appointments, view your service menu and prices, grab current offers, follow your Instagram and pay via UPI QR. It showcases your work gallery and location, works on any phone without an app, and reaches clients within 24 hours from ₹99.",
    "intro": "Salon clients book on impulse and rebook by convenience. A tappable PDF card turns a quick chat or Instagram DM into a confirmed slot and a repeat customer.",
    "features": [
      {
        "title": "One-tap slot booking",
        "desc": "Clients tap to book haircuts, facials or bridal packages on WhatsApp, keeping your chairs full."
      },
      {
        "title": "Service menu & price list",
        "desc": "Show every service with clear pricing so clients decide before they arrive, saving time at the desk."
      },
      {
        "title": "Instagram work gallery",
        "desc": "Link your Instagram and photo gallery so clients see your styling, nails and makeup portfolio."
      },
      {
        "title": "Festive offers & packages",
        "desc": "Highlight seasonal deals, membership packages and combo offers to boost bookings during peak days."
      },
      {
        "title": "Advance booking UPI QR",
        "desc": "Collect advance payments for bridal or group bookings instantly through your UPI QR code."
      },
      {
        "title": "Location & timings",
        "desc": "Add a Google Maps link and salon hours so new clients find you and walk in with confidence."
      }
    ],
    "whyPoints": [
      "Turn Instagram followers into booked appointments",
      "Cut no-shows with advance UPI booking",
      "Show your work gallery to win new clients",
      "Promote festive offers in one tap"
    ],
    "useCase": "Sneha's salon in Ludhiana posts before-after reels on Instagram and drops her MyCarda card in the bio and DMs. Followers tap to see the service menu, book a slot on WhatsApp and pay the bridal advance via UPI QR. The gallery and festive offers keep clients rebooking every season.",
    "faqs": [
      {
        "q": "Why does a salon need a PDF digital card?",
        "a": "A PDF card lets clients view your services, prices and gallery, then book in one tap. It converts Instagram interest into confirmed appointments and keeps your salon details handy for rebooking."
      },
      {
        "q": "Can clients book appointments from the card?",
        "a": "Yes. A one-tap WhatsApp booking button lets clients request slots for haircuts, facials or bridal packages, helping you manage your calendar and reduce empty chairs."
      },
      {
        "q": "Can I show my service menu and prices?",
        "a": "Absolutely. You can list every service with transparent pricing and package deals, so clients know exactly what to expect before they arrive at the salon."
      },
      {
        "q": "Can I take advance payments for bridal bookings?",
        "a": "Yes. The built-in UPI QR lets clients pay advances for bridal, group or membership bookings instantly, reducing no-shows and securing your peak-season slots."
      },
      {
        "q": "How soon can I get my salon PDF card?",
        "a": "MyCarda delivers your interactive PDF card within 24 hours. It is a one-time purchase from ₹99 with no monthly fees and works on every device."
      }
    ]
  },
  {
    "slug": "lawyer-pdf-visiting-card",
    "name": "Lawyers & Advocates",
    "profession": "Lawyers",
    "icon": Scale,
    "color": "from-amber-500 to-amber-600",
    "metaTitle": "PDF Visiting Card for Lawyers & Advocates | MyCarda",
    "metaDescription": "Professional PDF visiting card for lawyers with call, WhatsApp, chambers map & practice areas. Look trusted online. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf visiting card for lawyers, advocate digital business card, lawyer visiting card online, legal consultant card india, advocate whatsapp card, lawyer qr card",
    "h1": "PDF Digital Visiting Card for Lawyers & Advocates",
    "tagline": "Present your practice, credentials and chambers professionally in one secure, tappable PDF card.",
    "answer": "A lawyer's PDF visiting card lets clients tap to call, WhatsApp, view your practice areas, locate your chambers on Google Maps and read your credentials. It presents your bar registration, courts you practise in and consultation details professionally, works on any phone without an app, and arrives within 24 hours from ₹99.",
    "intro": "Clients choose lawyers on trust and credibility. A polished PDF card signals professionalism and makes it effortless for referrals to reach the right advocate.",
    "features": [
      {
        "title": "Practice areas showcase",
        "desc": "Clearly list civil, criminal, corporate or family law specialities so clients approach the right expert."
      },
      {
        "title": "Chambers location map",
        "desc": "Add a Google Maps link to your office or chambers so clients find you without repeated calls."
      },
      {
        "title": "Confidential WhatsApp line",
        "desc": "Clients tap to WhatsApp you for discreet initial queries and to schedule confidential consultations."
      },
      {
        "title": "Bar credentials & courts",
        "desc": "Display your enrolment, experience and the courts you practise in to build immediate credibility."
      },
      {
        "title": "Consultation fee UPI QR",
        "desc": "Collect consultation or retainer fees securely through your built-in UPI payment QR code."
      },
      {
        "title": "Document sharing link",
        "desc": "Share intake forms or case document links so clients prepare before the first meeting."
      }
    ],
    "whyPoints": [
      "Project professionalism and legal credibility",
      "Make referrals reach you in one tap",
      "Handle initial queries discreetly on WhatsApp",
      "Collect consultation fees via UPI"
    ],
    "useCase": "Advocate Kapoor practises at the Punjab & Haryana High Court and shares his MyCarda card with clients and fellow advocates. Referred clients tap to see his practice areas, message him discreetly on WhatsApp and navigate to his chambers via Maps. Consultation fees are settled instantly through his UPI QR.",
    "faqs": [
      {
        "q": "Why does a lawyer need a PDF visiting card?",
        "a": "A PDF card presents your practice areas, credentials and chambers professionally while letting clients call or message in one tap. It builds credibility and makes referrals easy without printing cards repeatedly."
      },
      {
        "q": "Can I display my practice areas and credentials?",
        "a": "Yes. You can list your specialities, bar enrolment, years of experience and the courts you practise in, helping clients trust your expertise before they even call."
      },
      {
        "q": "Is client communication through the card private?",
        "a": "The card links directly to your own WhatsApp and phone, so initial queries stay between you and the client. No third party sees your conversations or client details."
      },
      {
        "q": "Can clients pay consultation fees via the card?",
        "a": "Yes. Your UPI payment QR is built in, letting clients pay consultation or retainer fees instantly, with funds going straight to your bank account."
      },
      {
        "q": "How fast is my lawyer PDF card delivered?",
        "a": "MyCarda delivers your interactive PDF visiting card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
  {
    "slug": "ca-pdf-business-card",
    "name": "CA & Tax Consultants",
    "profession": "Chartered Accountants",
    "icon": Calculator,
    "color": "from-emerald-500 to-emerald-600",
    "metaTitle": "PDF Business Card for CA & Tax Consultants | MyCarda",
    "metaDescription": "Interactive PDF business card for CAs with services, WhatsApp, document links & UPI. Win more clients. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf business card for chartered accountants, ca digital visiting card, tax consultant business card, ca visiting card online, gst consultant card india, accountant whatsapp card",
    "h1": "PDF Digital Business Card for CA & Tax Consultants",
    "tagline": "Showcase your services, credentials and document channels in one professional, tappable PDF card.",
    "answer": "A CA's PDF business card lets clients tap to call, WhatsApp, view your services like GST, ITR and audit, share documents securely and pay fees via UPI QR. It displays your membership number, office location and specialities professionally, works on any phone without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Businesses pick accountants they trust with sensitive numbers. A clean PDF card conveys expertise and makes document sharing and fee collection effortless.",
    "features": [
      {
        "title": "Service list: GST, ITR, audit",
        "desc": "Outline every service you offer so clients quickly find the compliance or advisory help they need."
      },
      {
        "title": "Secure document sharing",
        "desc": "Link a portal or WhatsApp channel where clients securely send invoices, statements and returns."
      },
      {
        "title": "Membership & credentials",
        "desc": "Display your CA membership number and specialities to establish authority and professional trust."
      },
      {
        "title": "Fee payment UPI QR",
        "desc": "Collect retainer, filing or advisory fees instantly with your built-in UPI payment QR code."
      },
      {
        "title": "Deadline reminder links",
        "desc": "Share filing calendars and reminder links so clients never miss GST or income-tax due dates."
      },
      {
        "title": "Office location & hours",
        "desc": "Add a Google Maps link and working hours so clients visit your office without confusion."
      }
    ],
    "whyPoints": [
      "Present services and credentials professionally",
      "Simplify secure document collection",
      "Collect professional fees via UPI",
      "Stay reachable during filing season"
    ],
    "useCase": "CA Anita in Mohali handles GST and ITR filings for small businesses. She shares her MyCarda card on WhatsApp, where clients tap to see her services, send documents through her secure link and pay fees via UPI QR. Deadline reminder links keep her clients compliant and coming back every quarter.",
    "faqs": [
      {
        "q": "Why does a chartered accountant need a PDF business card?",
        "a": "A PDF card presents your services and credentials professionally while letting clients contact you, share documents and pay fees in one tap. It builds trust and streamlines your practice without printed cards."
      },
      {
        "q": "Can I list all my services on the card?",
        "a": "Yes. You can detail GST filing, income-tax returns, audits, bookkeeping and advisory services, so clients quickly understand how you can help their business."
      },
      {
        "q": "Can clients share documents through the card?",
        "a": "Absolutely. You can link a secure portal or WhatsApp channel where clients send invoices, statements and returns, keeping your document flow organised and safe."
      },
      {
        "q": "Can I collect professional fees via the card?",
        "a": "Yes. Your UPI payment QR is built in, so clients pay retainer, filing or advisory fees instantly, with money credited directly to your bank account."
      },
      {
        "q": "How quickly can I get my CA PDF card?",
        "a": "MyCarda delivers your interactive PDF business card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
  {
    "slug": "restaurant-pdf-digital-card",
    "name": "Restaurants & Cafes",
    "profession": "Restaurants",
    "icon": UtensilsCrossed,
    "color": "from-orange-500 to-orange-600",
    "metaTitle": "PDF Digital Card for Restaurants & Cafes | MyCarda",
    "metaDescription": "Interactive PDF digital card for restaurants with menu, table booking, delivery links & UPI. Get more orders. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf digital card for restaurants, restaurant qr menu card, cafe digital business card, restaurant visiting card online, food menu qr card india, restaurant whatsapp ordering",
    "h1": "PDF Digital Business Card for Restaurants & Cafes",
    "tagline": "Share your menu, table bookings, delivery links and location in one tappable PDF card.",
    "answer": "A restaurant's PDF digital card lets diners tap to view your menu, book a table, order via Swiggy or Zomato, find you on Google Maps and pay via UPI QR. It links your Instagram, offers and reviews, works on every phone without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Hungry customers scan first and decide fast. A single PDF card puts your menu, bookings and delivery links right in their hands.",
    "features": [
      {
        "title": "Digital menu link",
        "desc": "Share an always-updated menu with photos and prices so diners choose before they order or arrive."
      },
      {
        "title": "Table reservation button",
        "desc": "Guests tap to book a table on WhatsApp, helping you manage seating on busy weekends."
      },
      {
        "title": "Swiggy & Zomato links",
        "desc": "Add direct delivery-app links so customers order takeaway from your card in one tap."
      },
      {
        "title": "UPI QR for bill payment",
        "desc": "Let diners settle bills instantly by scanning your UPI QR right at the table."
      },
      {
        "title": "Offers & Instagram feed",
        "desc": "Promote daily specials and link your Instagram so followers see fresh dishes and deals."
      },
      {
        "title": "Location & Google reviews",
        "desc": "Add a Maps link and review link so new customers find you and leave feedback easily."
      }
    ],
    "whyPoints": [
      "Show an always-updated menu without reprints",
      "Take table bookings on WhatsApp",
      "Drive Swiggy and Zomato orders in one tap",
      "Collect bill payments and reviews via QR"
    ],
    "useCase": "Café Bloom in Chandigarh prints a small QR that opens their MyCarda card. Walk-in guests scan to browse the menu, order takeaway on Swiggy or pay the bill via UPI QR. Regulars book weekend tables on WhatsApp and follow the Instagram feed for daily specials, driving repeat footfall.",
    "faqs": [
      {
        "q": "Why does a restaurant need a PDF digital card?",
        "a": "A PDF card puts your menu, table booking, delivery links and payment in one tap. It replaces reprinted menus, drives more orders and keeps your restaurant details handy for every diner."
      },
      {
        "q": "Can customers view my menu from the card?",
        "a": "Yes. You can link an always-updated digital menu with photos and prices, so diners browse before ordering. Updating dishes or rates never requires a costly reprint."
      },
      {
        "q": "Can guests book a table through the card?",
        "a": "Absolutely. A one-tap WhatsApp button lets guests reserve tables, helping you manage seating during busy evenings and weekends without missed calls."
      },
      {
        "q": "Can diners pay the bill via the card?",
        "a": "Yes. Your UPI payment QR is built in, so guests scan and settle bills instantly at the table, with money credited straight to your account."
      },
      {
        "q": "How fast can I get my restaurant PDF card?",
        "a": "MyCarda delivers your interactive PDF card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
  {
    "slug": "gym-pdf-business-card",
    "name": "Gyms & Fitness Trainers",
    "profession": "Gyms & Trainers",
    "icon": Dumbbell,
    "color": "from-cyan-500 to-cyan-600",
    "metaTitle": "PDF Business Card for Gyms & Fitness Trainers | MyCarda",
    "metaDescription": "Interactive PDF card for gyms & trainers with membership plans, trial booking & UPI. Sign up more members. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf business card for gym, fitness trainer digital card, gym visiting card online, personal trainer whatsapp card, gym membership qr card, fitness studio card india",
    "h1": "PDF Digital Business Card for Gyms & Fitness Trainers",
    "tagline": "Share membership plans, trial bookings and transformations in one motivating, tappable PDF card.",
    "answer": "A gym's PDF business card lets prospects tap to book a free trial, view membership plans, message you on WhatsApp, see client transformations and pay fees via UPI QR. It links class schedules, location and Instagram, works on any phone without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Fitness decisions are emotional and quick. A tappable PDF card turns a walk-past or Instagram scroll into a booked trial and a paying member.",
    "features": [
      {
        "title": "Free trial booking",
        "desc": "Prospects tap to book a trial session on WhatsApp, turning curious leads into gym visitors fast."
      },
      {
        "title": "Membership plans & pricing",
        "desc": "Display monthly, quarterly and annual plans clearly so members compare and choose on the spot."
      },
      {
        "title": "Transformation gallery",
        "desc": "Show before-after results and testimonials to prove your training works and inspire sign-ups."
      },
      {
        "title": "Membership fee UPI QR",
        "desc": "Collect membership and personal-training fees instantly through your built-in UPI payment QR code."
      },
      {
        "title": "Class & timing schedule",
        "desc": "List Zumba, CrossFit or yoga timings so members plan sessions and attendance stays high."
      },
      {
        "title": "WhatsApp for diet & queries",
        "desc": "Members tap to reach you for diet tips, plan changes and renewals through a direct WhatsApp line."
      }
    ],
    "whyPoints": [
      "Convert curious leads into booked trials",
      "Show transformations to prove results",
      "Collect membership fees instantly via UPI",
      "Keep members engaged on WhatsApp"
    ],
    "useCase": "Coach Vikram runs a fitness studio and shares his MyCarda card on Instagram reels. Followers tap to book a free trial, view membership plans and see client transformations. After the trial, they pay the membership fee via UPI QR and stay in touch on WhatsApp for diet plans and renewals.",
    "faqs": [
      {
        "q": "Why does a gym or trainer need a PDF business card?",
        "a": "A PDF card lets prospects book trials, view plans and pay fees in one tap. It converts social-media interest into members and keeps your gym details ready to share anywhere."
      },
      {
        "q": "Can prospects book a free trial from the card?",
        "a": "Yes. A one-tap WhatsApp button lets prospects book trial sessions instantly, turning curious leads into gym visitors and improving your conversion rate."
      },
      {
        "q": "Can I show membership plans and transformations?",
        "a": "Absolutely. You can display all your plans with pricing plus a before-after transformation gallery and testimonials, giving prospects the proof they need to sign up."
      },
      {
        "q": "Can members pay fees through the card?",
        "a": "Yes. Your UPI payment QR is built in, so members pay membership or personal-training fees instantly, with money credited directly to your bank account."
      },
      {
        "q": "How soon can I get my gym PDF card?",
        "a": "MyCarda delivers your interactive PDF business card within 24 hours. It is a one-time purchase from ₹99 with no monthly fees and works on every device."
      }
    ]
  },
  {
    "slug": "insurance-agent-pdf-card",
    "name": "Insurance Agents",
    "profession": "Insurance Agents",
    "icon": Shield,
    "color": "from-indigo-500 to-indigo-600",
    "metaTitle": "PDF Business Card for Insurance Agents | MyCarda",
    "metaDescription": "Interactive PDF card for insurance agents with policy info, WhatsApp, premium UPI & maps. Win client trust. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf business card for insurance agents, insurance advisor digital card, lic agent visiting card online, insurance agent whatsapp card, policy qr card india, insurance consultant card",
    "h1": "PDF Digital Business Card for Insurance Agents",
    "tagline": "Share policy options, quotes and renewals with clients in one trustworthy, tappable PDF card.",
    "answer": "An insurance agent's PDF business card lets clients tap to call, WhatsApp for quotes, view policy types, request renewals and pay premiums via UPI QR. It displays your licence, insurers you represent and office location, works on any phone without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Insurance runs on trust and timely follow-ups. A tappable PDF card keeps you reachable for quotes, claims and renewals exactly when clients need you.",
    "features": [
      {
        "title": "Policy types showcase",
        "desc": "List life, health, motor and term plans so clients quickly find the cover that fits their needs."
      },
      {
        "title": "Instant quote on WhatsApp",
        "desc": "Clients tap to request premium quotes on WhatsApp, speeding up your lead-to-policy conversion."
      },
      {
        "title": "Renewal reminder links",
        "desc": "Share renewal links and reminders so clients never let their policies lapse and you retain business."
      },
      {
        "title": "Premium payment UPI QR",
        "desc": "Collect premium or advisory payments instantly through your built-in UPI payment QR code."
      },
      {
        "title": "Licence & insurers listed",
        "desc": "Display your IRDAI licence and the insurers you represent to build client confidence and trust."
      },
      {
        "title": "Claims support contact",
        "desc": "Give clients a direct line for claims help so they reach you fast during stressful moments."
      }
    ],
    "whyPoints": [
      "Build trust with licence and insurer details",
      "Send instant quotes over WhatsApp",
      "Cut policy lapses with renewal reminders",
      "Collect premiums securely via UPI"
    ],
    "useCase": "Suresh, an insurance advisor in Panchkula, shares his MyCarda card with prospects and existing clients. New leads tap to request a quote on WhatsApp and view policy options, while existing clients use renewal reminder links and pay premiums via UPI QR. His visible IRDAI licence reassures every new client.",
    "faqs": [
      {
        "q": "Why does an insurance agent need a PDF business card?",
        "a": "A PDF card lets clients request quotes, view policies, renew and pay premiums in one tap. It builds trust with your licence details and keeps you reachable for claims and renewals."
      },
      {
        "q": "Can clients request quotes through the card?",
        "a": "Yes. A one-tap WhatsApp button lets clients ask for premium quotes on life, health or motor plans, helping you respond fast and convert more leads into policies."
      },
      {
        "q": "Can I show my licence and the insurers I represent?",
        "a": "Absolutely. You can display your IRDAI licence number and the insurance companies you work with, giving clients the confidence to trust you with their cover."
      },
      {
        "q": "Can clients pay premiums via the card?",
        "a": "Yes. Your UPI payment QR is built in, so clients pay premiums or advisory fees instantly, with money credited directly to your bank account."
      },
      {
        "q": "How fast is my insurance agent PDF card delivered?",
        "a": "MyCarda delivers your interactive PDF business card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
  {
    "slug": "freelancer-pdf-business-card",
    "name": "Freelancers",
    "profession": "Freelancers",
    "icon": Briefcase,
    "color": "from-violet-500 to-violet-600",
    "metaTitle": "PDF Business Card for Freelancers | MyCarda",
    "metaDescription": "Interactive PDF business card for freelancers with portfolio, WhatsApp, links & UPI. Land more clients. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf business card for freelancers, freelancer digital visiting card, freelance portfolio card online, freelancer whatsapp card, designer developer qr card india, freelance business card",
    "h1": "PDF Digital Business Card for Freelancers",
    "tagline": "Share your portfolio, services and payment details with clients in one sleek, tappable PDF card.",
    "answer": "A freelancer's PDF business card lets clients tap to view your portfolio, message you on WhatsApp, explore your services, connect on social and pay via UPI QR. It links your website, Behance or GitHub and testimonials, works on any device without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Freelance work is won on portfolio and quick replies. A tappable PDF card lets you pitch, share work and get paid without chasing across a dozen links.",
    "features": [
      {
        "title": "Portfolio & work links",
        "desc": "Link your Behance, GitHub, Dribbble or website so clients see your best work in one tap."
      },
      {
        "title": "Services & packages",
        "desc": "List what you offer with clear pricing packages so clients understand your scope and rates upfront."
      },
      {
        "title": "WhatsApp for project chats",
        "desc": "Clients tap to discuss briefs, timelines and revisions on WhatsApp, speeding up project kickoffs."
      },
      {
        "title": "Invoice & payment UPI QR",
        "desc": "Collect advances and final payments instantly through your built-in UPI payment QR code."
      },
      {
        "title": "Client testimonials",
        "desc": "Showcase reviews and past-client logos to prove reliability and win trust with new prospects."
      },
      {
        "title": "All social & contact links",
        "desc": "Bundle LinkedIn, Instagram, email and website into one card so clients reach you their way."
      }
    ],
    "whyPoints": [
      "Pitch your portfolio instantly to any client",
      "Look professional without a costly website",
      "Collect advances and payments via UPI",
      "Bundle every link into one shareable card"
    ],
    "useCase": "Priya, a freelance designer, shares her MyCarda card whenever a prospect DMs on Instagram. They tap to view her Behance portfolio, read testimonials and discuss the brief on WhatsApp. Once scope is agreed, she collects the advance through her UPI QR, all from a single link she sends anywhere.",
    "faqs": [
      {
        "q": "Why does a freelancer need a PDF business card?",
        "a": "A PDF card lets clients see your portfolio, discuss projects and pay you in one tap. It makes you look professional, replaces scattered links and helps you win and start work faster."
      },
      {
        "q": "Can I show my portfolio on the card?",
        "a": "Yes. You can link your Behance, GitHub, Dribbble, website or a curated gallery, so clients view your best work instantly and judge your fit for their project."
      },
      {
        "q": "Can clients pay me through the card?",
        "a": "Absolutely. Your UPI payment QR is built in, so clients pay advances or final invoices instantly, with money credited directly to your bank account."
      },
      {
        "q": "Can I include all my social and contact links?",
        "a": "Yes. You can bundle LinkedIn, Instagram, email, website and WhatsApp into one card, so every client reaches you through their preferred channel without hunting for links."
      },
      {
        "q": "How quickly can I get my freelancer PDF card?",
        "a": "MyCarda delivers your interactive PDF business card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
  {
    "slug": "wedding-vendor-pdf-card",
    "name": "Wedding Vendors",
    "profession": "Wedding Vendors",
    "icon": PartyPopper,
    "color": "from-rose-500 to-rose-600",
    "metaTitle": "PDF Business Card for Wedding Vendors | MyCarda",
    "metaDescription": "Interactive PDF card for wedding vendors with portfolio, packages, WhatsApp & UPI. Book more weddings. Delivered in 24 hours. From ₹99.",
    "keywords": "pdf business card for wedding vendors, wedding photographer digital card, event planner visiting card online, wedding vendor whatsapp card, decorator qr card india, caterer portfolio card",
    "h1": "PDF Digital Business Card for Wedding Vendors",
    "tagline": "Share your portfolio, packages and availability with couples in one stunning, tappable PDF card.",
    "answer": "A wedding vendor's PDF business card lets couples tap to view your portfolio, check packages, message you on WhatsApp, see past events and pay advances via UPI QR. It links your Instagram reels, reviews and location, works on any phone without an app, and is delivered within 24 hours from ₹99.",
    "intro": "Weddings are booked on portfolio and trust, often months ahead. A tappable PDF card lets couples browse your best work and lock a date without endless back-and-forth.",
    "features": [
      {
        "title": "Portfolio & reels gallery",
        "desc": "Link your photo albums and Instagram reels so couples see real weddings you have created."
      },
      {
        "title": "Packages & pricing tiers",
        "desc": "Present décor, photography or catering packages clearly so couples compare and shortlist quickly."
      },
      {
        "title": "Availability check on WhatsApp",
        "desc": "Couples tap to WhatsApp you to check your date availability and hold their preferred slot fast."
      },
      {
        "title": "Booking advance UPI QR",
        "desc": "Collect booking advances and milestone payments instantly through your built-in UPI QR code."
      },
      {
        "title": "Past events & reviews",
        "desc": "Showcase testimonials and past celebrations to prove your reliability during big-day pressure."
      },
      {
        "title": "Multi-service linking",
        "desc": "Link partner vendors like makeup, décor and catering so couples plan more from one card."
      }
    ],
    "whyPoints": [
      "Show real weddings to win couples' trust",
      "Let couples check dates in one WhatsApp tap",
      "Collect booking advances via UPI",
      "Share your card at every expo and referral"
    ],
    "useCase": "Aarav runs a wedding photography studio and shares his MyCarda card at bridal expos and on Instagram. Couples tap to browse his reels and past albums, check his date availability on WhatsApp and read reviews. Once they decide, they pay the booking advance via UPI QR, securing the date on the spot.",
    "faqs": [
      {
        "q": "Why does a wedding vendor need a PDF business card?",
        "a": "A PDF card lets couples view your portfolio, check availability and pay advances in one tap. It showcases your work beautifully and helps you book more weddings from expos, referrals and Instagram."
      },
      {
        "q": "Can I show my portfolio and past events?",
        "a": "Yes. You can link photo albums, Instagram reels and testimonials from past weddings, giving couples the visual proof and confidence they need to book you."
      },
      {
        "q": "Can couples check my availability through the card?",
        "a": "Absolutely. A one-tap WhatsApp button lets couples ask about your dates and hold a slot quickly, so you never lose a booking to slow responses."
      },
      {
        "q": "Can I collect booking advances via the card?",
        "a": "Yes. Your UPI payment QR is built in, so couples pay booking advances or milestone amounts instantly, with money credited straight to your bank account."
      },
      {
        "q": "How soon can I get my wedding vendor PDF card?",
        "a": "MyCarda delivers your interactive PDF business card within 24 hours. It is a one-time purchase from ₹99 with no subscription and works on every device."
      }
    ]
  },
];

export const industrySlugs = new Set(industries.map((i) => "/" + i.slug));

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
