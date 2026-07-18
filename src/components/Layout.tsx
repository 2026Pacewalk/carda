import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useState } from "react";
import {
  Menu, X, Phone, MessageCircle, LayoutDashboard, LogIn, UserPlus,
  Info, Briefcase, CreditCard, Image, Factory, BookOpen, HelpCircle, Mail
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { customer } = useCustomerAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

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
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white/70 hover:text-white">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#0a2b4a] overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path) ? "text-[#ff8309] bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}>
                <link.icon size={16} /> {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10 mt-4">
            {customer ? (
              <Link to="/customer/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#ff8309] text-white rounded-xl text-sm font-bold">
                <LayoutDashboard size={16} /> My Dashboard
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-white/10 text-white rounded-xl text-sm font-bold">
                  <LogIn size={14} /> Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#ff8309] text-white rounded-xl text-sm font-bold">
                  <UserPlus size={14} /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

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
