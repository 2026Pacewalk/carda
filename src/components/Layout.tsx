import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, LayoutDashboard, LogIn, UserPlus,
  Info, Briefcase, CreditCard, Image, Factory, BookOpen, HelpCircle, Mail,
  ChevronRight, Zap, ArrowRight, PhoneCall
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

  const isActive = (path: string) => location.pathname === path;

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close the drawer whenever the route changes
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f7]">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0a2b4a] to-[#08223b] backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="MyCarda" className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  isActive(link.path) ? "text-[#ff8309] bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#ff8309] text-white rounded-full text-xs font-bold hover:bg-[#e57400] transition-all">
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            ) : customer ? (
              <Link to="/customer/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#ff8309] text-white rounded-full text-xs font-bold hover:bg-[#e57400] transition-all">
                <LayoutDashboard size={14} /> My Dashboard
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 bg-white/10 text-white rounded-full text-xs font-bold hover:bg-white/20 transition-all">
                  <LogIn size={13} /> Sign In
                </Link>
                <Link to="/register" className="flex items-center gap-1.5 px-4 py-2 bg-[#ff8309] text-white rounded-full text-xs font-bold hover:bg-[#e57400] transition-all">
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

      <footer className="bg-[#0a2b4a] text-white/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Pages</h4>
              <div className="space-y-1.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about-us" },
                  { label: "Pricing", path: "/pricing" },
                  { label: "Samples", path: "/pdf-card-samples" },
                ].map((p) => (
                  <Link key={p.label} to={p.path} className="block text-[13px] hover:text-[#ff8309] transition-colors">{p.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Services</h4>
              <div className="space-y-1.5">
                {["PDF Card", "QR Code", "NFC Card", "Web Card"].map((s) => (
                  <Link key={s} to="/pdf-digital-business-card" className="block text-[13px] hover:text-[#ff8309] transition-colors">{s}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Legal</h4>
              <div className="space-y-1.5">
                <Link to="/privacy-policy" className="block text-[13px] hover:text-[#ff8309] transition-colors">Privacy</Link>
                <Link to="/terms" className="block text-[13px] hover:text-[#ff8309] transition-colors">Terms</Link>
                <Link to="/refund-policy" className="block text-[13px] hover:text-[#ff8309] transition-colors">Refund</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Contact</h4>
              <a href="tel:+919517722444" className="flex items-center gap-1.5 text-[13px] hover:text-[#ff8309] transition-colors mb-1"><Phone size={10} /> +91 95177-22444</a>
              <a href="https://wa.me/919517722444" target="_blank" className="flex items-center gap-1.5 text-[13px] hover:text-green-400 transition-colors"><MessageCircle size={10} /> WhatsApp</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 text-center text-[12px]">
            &copy; 2020-2026 MyCarda. All rights reserved.
          </div>
        </div>
      </footer>

      <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
}
