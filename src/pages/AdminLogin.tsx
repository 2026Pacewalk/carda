import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { setAdminToken } from "@/hooks/useAdminAuth";
import { Mail, Lock, LogIn, Shield } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: (data) => {
      setAdminToken(data.token);
      window.location.href = "/admin/dashboard";
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill all fields"); return; }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08223b] to-[#051829] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/images/logo.png" alt="MyCarda" className="h-11" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff8309]/15 rounded-full mb-3">
            <Shield size={13} className="text-[#ff8309]" />
            <span className="text-[#ff8309] text-[11px] font-bold uppercase tracking-widest">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Admin Login</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to manage MyCarda</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="admin@mycarda.com" autoComplete="username" />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="Enter password" autoComplete="current-password" />
              </div>
            </div>

            <button type="submit" disabled={loginMutation.isPending}
              className="w-full py-2.5 bg-[#ff8309] text-white rounded-xl text-sm font-bold hover:bg-[#e57400] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              <LogIn size={14} /> {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <Link to="/" className="text-white/40 text-xs hover:text-white/70 transition-colors">← Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
