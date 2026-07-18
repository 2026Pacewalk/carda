import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { setCustomerToken } from "@/hooks/useCustomerAuth";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.customerAuth.login.useMutation({
    onSuccess: (data) => {
      setCustomerToken(data.token);
      window.location.href = "/customer/dashboard";
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a2b4a] to-[#08223b] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/images/logo.png" alt="MyCarda" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-extrabold text-white">Customer Login</h1>
          <p className="text-white/50 text-sm mt-1">Access your PDF Business Card dashboard</p>
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
                  placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff8309]"
                  placeholder="Enter password" />
              </div>
            </div>

            <button type="submit" disabled={loginMutation.isPending}
              className="w-full py-2.5 bg-[#ff8309] text-white rounded-xl text-sm font-bold hover:bg-[#e57400] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              <LogIn size={14} /> {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-[#ff8309] text-xs hover:underline">Forgot Password?</Link>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs mb-2">Don't have an account?</p>
            <Link to="/register" className="inline-flex items-center gap-1.5 text-[#ff8309] text-xs font-bold hover:underline">
              <UserPlus size={14} /> Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
