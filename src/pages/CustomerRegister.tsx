import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { setCustomerToken } from "@/hooks/useCustomerAuth";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";

export default function CustomerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerMutation = trpc.customerAuth.register.useMutation({
    onSuccess: (data) => {
      setCustomerToken(data.token);
      window.location.href = "/customer/dashboard";
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !mobile || !password) { setError("Please fill all fields"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    registerMutation.mutate({ name, email, mobile, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2b4a] to-[#08223b] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/">
            <img src="/images/logo.png" alt="MyCarda" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-extrabold text-white">Create Account</h1>
          <p className="text-white/50 text-sm mt-1">Start creating your PDF Business Card</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-white/60 text-xs mb-1">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="Your full name" />
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Mobile</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="+91 98765 43210" />
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="Min 6 characters" />
              </div>
            </div>

            <button type="submit" disabled={registerMutation.isPending}
              className="w-full py-2.5 bg-[#ff8309] text-white rounded-xl text-sm font-bold hover:bg-[#e57400] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              <UserPlus size={14} /> {registerMutation.isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">Already have an account? <Link to="/login" className="text-[#ff8309] font-bold hover:underline">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
