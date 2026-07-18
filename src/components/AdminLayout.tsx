import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard, Users, CreditCard, Palette, ShoppingBag,
  HelpCircle, Settings, LogOut, Menu, X, ChevronRight, Shield,
  Ticket, IndianRupee
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Customers", path: "/admin/customers", icon: Users },
  { label: "PDF Cards", path: "/admin/pdf-cards", icon: CreditCard },
  { label: "Templates", path: "/admin/templates", icon: Palette },
  { label: "Packages", path: "/admin/packages", icon: IndianRupee },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Payments", path: "/admin/payments", icon: Ticket },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7f7] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#08223b] to-[#051829] flex flex-col transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Shield size={20} className="text-[#ff8309]" />
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60"><X size={20} /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isActive ? "bg-[#ff8309]/15 text-[#ff8309]" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                <Icon size={16} /> {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white text-[11px] transition-colors mb-2">
            <LogOut size={14} /> Back to Website
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-[#0a2b4a]"><Menu size={22} /></button>
          <span className="text-[#0a2b4a] font-bold text-sm">Admin Panel</span>
          <Shield size={18} className="text-[#ff8309]" />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-16 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}
