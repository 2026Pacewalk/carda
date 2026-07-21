import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, MessageCircle, ArrowRight, Compass, FileQuestion } from "lucide-react";

const popular = [
  { label: "Pricing", to: "/pricing" },
  { label: "Card Samples", to: "/pdf-card-samples" },
  { label: "Industries", to: "/industries" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact-us" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a2b4a] via-[#0a2b4a] to-[#061a2e] flex flex-col">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#ff8309]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[#ff8309]/5 blur-3xl" />

      {/* Logo */}
      <header className="relative z-10 p-5 sm:p-6">
        <Link to="/" className="inline-flex active:scale-95 transition-transform">
          <img src="/images/logo.png" alt="MyCarda" className="h-10 w-auto" />
        </Link>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pb-16">
        {/* Big 404 with a floating card as the "0" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 sm:gap-4 mb-3"
        >
          <span className="text-[110px] sm:text-[168px] font-extrabold leading-none bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">4</span>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[92px] h-[92px] sm:w-[140px] sm:h-[140px] rounded-[28px] bg-gradient-to-br from-[#ff8309] to-[#e57400] flex items-center justify-center shadow-2xl shadow-[#ff8309]/30 rotate-6"
          >
            <FileQuestion className="text-white w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>
          <span className="text-[110px] sm:text-[168px] font-extrabold leading-none bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">4</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff8309] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Compass size={13} /> Error 404
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">Looks Like This Card Got Lost</h1>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has moved. But your perfect interactive PDF business card is just a tap away.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link to="/" className="btn-orange flex items-center gap-2"><Home size={16} /> Back to Home</Link>
            <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer" className="btn-outline-white flex items-center gap-2">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>

          {/* Popular pages */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/40 text-[11px] uppercase tracking-widest font-semibold">Popular pages</span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
              {popular.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="group inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-[13px] font-semibold hover:bg-[#ff8309] hover:border-[#ff8309] hover:text-white active:scale-95 transition-all"
                >
                  {p.label}
                  <ArrowRight size={13} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
