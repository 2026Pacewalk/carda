import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  LayoutDashboard, CreditCard, Plus, Settings, HelpCircle,
  LogOut, Menu, X, ChevronRight, Shield
} from "lucide-react";

const baseNavItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Cards", path: "/dashboard/cards", icon: CreditCard },
  { label: "Create Card", path: "/dashboard/builder", icon: Plus },
  { label: "Support", path: "/dashboard/support", icon: HelpCircle },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const navItems = isAdmin
    ? [...baseNavItems, { label: "Admin", path: "/dashboard/admin", icon: Shield }]
    : baseNavItems;

  return (
    <div className="min-h-screen bg-[#f8f7f7] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0a2b4a] to-[#08223b] flex flex-col transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="MyCarda" className="h-8 w-auto" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isActive ? "bg-[#ff8309]/15 text-[#ff8309]" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                <Icon size={16} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#ff8309] flex items-center justify-center text-white text-xs font-bold">{user?.name?.charAt(0) ?? "U"}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.name ?? "User"}</p>
              <p className="text-white/40 text-[10px] truncate">{user?.email ?? ""}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-white/40 hover:text-white text-[11px] transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-[#0a2b4a]"><Menu size={22} /></button>
          <span className="text-[#0a2b4a] font-bold text-sm">MyCarda Dashboard</span>
          <div className="w-8 h-8 rounded-full bg-[#ff8309] flex items-center justify-center text-white text-xs font-bold">{user?.name?.charAt(0) ?? "U"}</div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30 flex justify-around py-2">
          {navItems.slice(0, isAdmin ? 5 : 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${isActive ? "text-[#ff8309]" : "text-[#888]"}`}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="lg:hidden h-14"></div>
      </div>
    </div>
  );
}
