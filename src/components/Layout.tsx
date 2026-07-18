import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, LayoutDashboard, LogIn, UserPlus,
  Info, Briefcase, CreditCard, Image, Factory, BookOpen, HelpCircle, Mail,
  ChevronRight, Zap, ArrowRight, PhoneCall,
  Facebook, Instagram, Linkedin, Youtube, MapPin, Star, Clock, Heart
} from "lucide-react";

const navLinks = [
  { label: "About", path: "/about-us", icon: Info },
  { label: "Services", path: "/pdf-digital-business-card", icon: Briefcase },
  { label: "Pricing", path: "/pricing", icon: CreditCard },
  { label: "Samples", path: "/pdf-card-samples", icon: Image },
  { label: "Industries", path: "/industries", icon: Factory },
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "FAQ", path: "/faq", icon: HelpCircle },
  { label: "Contact", path: "/contact-us", icon: Mail },
];

const footerCols = [
  { title: "Company", links: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Blog", path: "/blog" },
  ] },
  { title: "Product", links: [
    { label: "Pricing", path: "/pricing" },
    { label: "Samples", path: "/pdf-card-samples" },
    { label: "Industries", path: "/industries" },
    { label: "Services", path: "/pdf-digital-business-card" },
  ] },
  { title: "Legal", links: [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms", path: "/terms" },
    { label: "Refund Policy", path: "/refund-policy" },
    { label: "FAQ", path: "/faq" },
  ] },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
];

const itemSpring = { type: "spring" as const, damping: 24, stiffness: 260 };
const menuItemAnim = (i: number) => ({
  initial: { opacity: 0, x: 26 },
  animate: { opacity: 1, x: 0 },
  transition: { ...itemSpring, delay: 0.12 + i * 0.045 },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { customer } = useCustomerAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Scroll-aware header (glass + shadow, collapse utility bar)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close the drawer whenever the route changes
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f7]">
      <header className="sticky top-0 z-50">
        {/* Utility bar (collapses on scroll) */}
        <div className={`hidden md:block bg-[#061a2e] border-b border-white/5 overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
          <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-5 text-white/55">
              <a href="tel:+919517722444" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone size={12} className="text-[#ff8309]" /> +91 95177-22444</a>
              <a href="mailto:mydigitalcarda@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail size={12} className="text-[#ff8309]" /> mydigitalcarda@gmail.com</a>
            </div>
            <div className="flex items-center gap-4 text-white/55">
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#ff8309]" /> Delivered in 24 hours</span>
              <span className="flex items-center gap-1.5"><Star size={12} className="text-[#ff8309] fill-[#ff8309]" /> 4.9/5 Rated</span>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className={`border-b transition-all duration-300 ${scrolled ? "bg-[#0a2b4a]/85 backdrop-blur-md border-white/10 shadow-lg shadow-black/25" : "bg-gradient-to-r from-[#0a2b4a] to-[#08223b] border-white/5"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center shrink-0 active:scale-95 transition-transform">
              <img src="/images/logo.png" alt="MyCarda" className="h-10 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link key={link.path} to={link.path}
                    className={`relative px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors ${active ? "text-white" : "text-white/65 hover:text-white"}`}>
                    {link.label}
                    {active && (
                      <motion.span layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-[3px] h-[3px] rounded-full bg-gradient-to-r from-[#ff8309] to-[#ffb057]"
                        transition={{ type: "spring", damping: 22, stiffness: 260 }} />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              {(user || customer) ? (
                <Link to={customer ? "/customer/dashboard" : "/dashboard"} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#ff8309] text-white rounded-full text-xs font-bold hover:bg-[#e57400] shadow-lg shadow-[#ff8309]/25 active:scale-95 transition-all">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <Link to="/login" className="px-4 py-2 text-white/80 rounded-full text-xs font-bold hover:text-white hover:bg-white/10 transition-all">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#ff8309] to-[#e57400] text-white rounded-full text-xs font-bold shadow-lg shadow-[#ff8309]/30 hover:shadow-[#ff8309]/50 active:scale-95 transition-all">
                    <UserPlus size={13} /> Sign Up
                  </Link>
                </div>
              )}
              <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="lg:hidden fixed top-0 right-0 z-[70] h-[100dvh] w-[86%] max-w-sm flex flex-col bg-gradient-to-b from-[#0a2b4a] to-[#061a2e] border-l border-white/10 shadow-2xl"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
                <img src="/images/logo.png" alt="MyCarda" className="h-9 w-auto" />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-1.5">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.path);
                    return (
                      <motion.div key={link.path} {...menuItemAnim(i)}>
                        <Link to={link.path} onClick={() => setMobileOpen(false)}
                          className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${active ? "bg-white/10" : "hover:bg-white/5"}`}>
                          <span className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${active ? "bg-gradient-to-br from-[#ff8309] to-[#e57400] text-white shadow-lg shadow-[#ff8309]/30" : "bg-white/5 text-white/60 group-hover:text-white"}`}>
                            <link.icon size={17} />
                          </span>
                          <span className={`flex-1 text-[15px] font-semibold ${active ? "text-white" : "text-white/70 group-hover:text-white"}`}>{link.label}</span>
                          <ChevronRight size={16} className={active ? "text-[#ff8309]" : "text-white/20 group-hover:text-white/50"} />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Primary CTA */}
                  <motion.div {...menuItemAnim(navLinks.length)} className="pt-3">
                    <Link to="/pricing" onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff8309] to-[#e57400] text-white text-sm font-bold shadow-lg shadow-[#ff8309]/30 active:scale-[0.98] transition-transform">
                      <Zap size={16} /> Get Your PDF Card <ArrowRight size={16} />
                    </Link>
                  </motion.div>

                  {/* Auth */}
                  <motion.div {...menuItemAnim(navLinks.length + 1)} className="pt-1">
                    {(customer || user) ? (
                      <Link to={customer ? "/customer/dashboard" : "/dashboard"} onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white/15 transition-all">
                        <LayoutDashboard size={16} /> My Dashboard
                      </Link>
                    ) : (
                      <div className="flex gap-2.5">
                        <Link to="/login" onClick={() => setMobileOpen(false)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all">
                          <LogIn size={15} /> Sign In
                        </Link>
                        <Link to="/register" onClick={() => setMobileOpen(false)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-white text-[#0a2b4a] text-sm font-bold hover:bg-white/90 transition-all">
                          <UserPlus size={15} /> Sign Up
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Sticky contact footer */}
              <div className="shrink-0 px-4 py-4 border-t border-white/10 bg-black/20">
                <div className="grid grid-cols-2 gap-2.5">
                  <a href="tel:+919517722444"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-[13px] font-semibold hover:bg-white/10 transition-all">
                    <PhoneCall size={15} className="text-[#ff8309]" /> Call Us
                  </a>
                  <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500/90 text-white text-[13px] font-semibold hover:bg-green-500 transition-all">
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
                <p className="text-center text-white/30 text-[11px] mt-3">India's #1 PDF Business Card Provider</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <footer className="bg-gradient-to-b from-[#0a2b4a] to-[#061a2e] text-white/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
          {/* CTA banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff8309] to-[#e57400] px-6 py-8 md:px-10 md:py-9 mb-12 shadow-xl shadow-[#ff8309]/20">
            <div className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -right-16 top-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
              <div>
                <h3 className="text-white text-xl md:text-2xl font-extrabold">Ready to get your PDF Business Card?</h3>
                <p className="text-white/85 text-sm mt-1.5">One-time payment · No subscription · Delivered in 24 hours · Starting at Rs 99</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link to="/pricing" className="px-5 py-3 bg-white text-[#0a2b4a] rounded-full text-sm font-bold hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap">View Pricing</Link>
                <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#0a2b4a] text-white rounded-full text-sm font-bold hover:bg-[#08223b] active:scale-95 transition-all whitespace-nowrap"><MessageCircle size={16} /> WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4">
              <img src="/images/logo.png" alt="MyCarda" className="h-11 w-auto mb-4" />
              <p className="text-sm leading-relaxed max-w-xs text-white/50">
                India's #1 provider of interactive PDF digital business cards — with click-to-call, WhatsApp, UPI QR &amp; social links, delivered in 24 hours.
              </p>
              <div className="flex items-center gap-2.5 mt-5">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-[#ff8309] hover:border-[#ff8309] active:scale-95 transition-all">
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerCols.map((col) => (
              <div key={col.title} className="md:col-span-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">{col.title}</h4>
                <div className="space-y-2.5">
                  {col.links.map((l) => (
                    <Link key={l.label} to={l.path} className="group flex items-center gap-1.5 text-[13px] text-white/55 hover:text-[#ff8309] transition-colors">
                      <ChevronRight size={13} className="text-white/20 group-hover:text-[#ff8309] group-hover:translate-x-0.5 transition-all" /> {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact */}
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Get in touch</h4>
              <div className="space-y-2.5 text-[13px]">
                <a href="tel:+919517722444" className="flex items-center gap-2 text-white/55 hover:text-white transition-colors"><Phone size={14} className="text-[#ff8309] shrink-0" /> +91 95177-22444</a>
                <a href="mailto:mydigitalcarda@gmail.com" className="flex items-center gap-2 text-white/55 hover:text-white transition-colors break-all"><Mail size={14} className="text-[#ff8309] shrink-0" /> mydigitalcarda@gmail.com</a>
                <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/55 hover:text-green-400 transition-colors"><MessageCircle size={14} className="text-green-400 shrink-0" /> Chat on WhatsApp</a>
                <p className="flex items-center gap-2 text-white/55"><MapPin size={14} className="text-[#ff8309] shrink-0" /> Chandigarh, India</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-white/40">&copy; 2020–2026 MyCarda. All rights reserved.</p>
            <p className="text-[12px] text-white/40 flex items-center gap-1.5">
              Made with <Heart size={12} className="text-red-400 fill-red-400" /> in India
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="group fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 hover:scale-110 transition-transform">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
        <MessageCircle size={28} className="relative text-white" />
      </a>
    </div>
  );
}
