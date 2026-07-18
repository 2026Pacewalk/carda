import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { motion } from "framer-motion";
import { CreditCard, Plus, ShoppingBag, HelpCircle, Download, Eye, Edit, FileText } from "lucide-react";

export default function CustomerDashboard() {
  const { data: stats } = trpc.customer.getDashboardStats.useQuery();

  const statCards = [
    { label: "My Cards", value: stats?.totalCards ?? 0, icon: CreditCard, color: "from-[#0a2b4a] to-[#103558]" },
    { label: "Orders", value: stats?.totalOrders ?? 0, icon: ShoppingBag, color: "from-[#ff8309] to-[#e57400]" },
    { label: "Tickets", value: stats?.totalTickets ?? 0, icon: HelpCircle, color: "from-green-500 to-green-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Dashboard</h1>
        <p className="text-xs text-[#888] mt-0.5">Manage your PDF Business Cards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${s.color} rounded-xl p-4 text-white`}>
            <s.icon size={18} className="mb-2 opacity-70" />
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-[10px] opacity-70">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Link to="/customer/create-card" className="flex flex-col items-center gap-1.5 p-3 bg-[#f8f7f7] rounded-xl hover:bg-[#ff8309]/10 transition-all group">
            <div className="w-9 h-9 bg-[#ff8309]/10 rounded-lg flex items-center justify-center group-hover:bg-[#ff8309]">
              <Plus size={16} className="text-[#ff8309] group-hover:text-white" />
            </div>
            <span className="text-[10px] font-bold text-[#0a2b4a]">Create Card</span>
          </Link>
          <Link to="/customer/my-cards" className="flex flex-col items-center gap-1.5 p-3 bg-[#f8f7f7] rounded-xl hover:bg-[#ff8309]/10 transition-all group">
            <div className="w-9 h-9 bg-[#0a2b4a]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0a2b4a]">
              <FileText size={16} className="text-[#0a2b4a] group-hover:text-white" />
            </div>
            <span className="text-[10px] font-bold text-[#0a2b4a]">My Cards</span>
          </Link>
          <Link to="/customer/orders" className="flex flex-col items-center gap-1.5 p-3 bg-[#f8f7f7] rounded-xl hover:bg-[#ff8309]/10 transition-all group">
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500">
              <ShoppingBag size={16} className="text-green-600 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-bold text-[#0a2b4a]">Orders</span>
          </Link>
          <Link to="/customer/support" className="flex flex-col items-center gap-1.5 p-3 bg-[#f8f7f7] rounded-xl hover:bg-[#ff8309]/10 transition-all group">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500">
              <HelpCircle size={16} className="text-blue-600 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-bold text-[#0a2b4a]">Support</span>
          </Link>
        </div>
      </div>

      {/* Recent Cards */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0a2b4a]">Recent Cards</h3>
          <Link to="/customer/my-cards" className="text-[10px] text-[#ff8309] font-bold">View All</Link>
        </div>
        {stats?.recentCards && stats.recentCards.length > 0 ? (
          <div className="space-y-2">
            {stats.recentCards.map((card: any) => (
              <div key={card.id} className="flex items-center gap-3 p-3 bg-[#f8f7f7] rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {card.businessName?.charAt(0) ?? "C"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0a2b4a] truncate">{card.businessName || "Untitled Card"}</p>
                  <p className="text-[10px] text-[#888]">{card.ownerName} • {card.status}</p>
                </div>
                <div className="flex gap-1">
                  <Link to={`/customer/my-cards/${card.id}`} className="p-1.5 bg-white rounded-lg hover:bg-[#ff8309]/10">
                    <Eye size={12} className="text-[#0a2b4a]" />
                  </Link>
                  <Link to={`/customer/my-cards/${card.id}/edit`} className="p-1.5 bg-white rounded-lg hover:bg-[#ff8309]/10">
                    <Edit size={12} className="text-[#0a2b4a]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-xs text-[#888] mb-2">No cards yet. Create your first PDF card!</p>
            <Link to="/customer/create-card" className="btn-orange text-xs">Create Card</Link>
          </div>
        )}
      </div>
    </div>
  );
}
