import { trpc } from "@/providers/trpc";
import { motion } from "framer-motion";
import { Users, CreditCard, ShoppingBag, HelpCircle, Ticket, IndianRupee } from "lucide-react";
import { Link } from "react-router";

export default function AdminDashboard() {
  const { data: stats } = trpc.admin.getStats.useQuery();
  const { data: recentCustomers } = trpc.admin.listCustomers.useQuery();
  const { data: recentOrders } = trpc.admin.listAllOrders.useQuery();

  const statCards = [
    { label: "Customers", value: stats?.customers ?? 0, icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "PDF Cards", value: stats?.cards ?? 0, icon: CreditCard, color: "from-[#ff8309] to-[#e57400]" },
    { label: "Orders", value: stats?.orders ?? 0, icon: ShoppingBag, color: "from-green-500 to-green-600" },
    { label: "Tickets", value: stats?.tickets ?? 0, icon: HelpCircle, color: "from-red-500 to-red-600" },
    { label: "Payments", value: stats?.payments ?? 0, icon: Ticket, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Admin Dashboard</h1>
        <p className="text-xs text-[#888] mt-0.5">Overview of your PDF card business</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${s.color} rounded-xl p-4 text-white`}>
            <s.icon size={18} className="mb-2 opacity-70" />
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-[10px] opacity-70">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Customers", path: "/admin/customers", icon: Users, desc: "Manage users" },
          { label: "PDF Cards", path: "/admin/pdf-cards", icon: CreditCard, desc: "All cards" },
          { label: "Orders", path: "/admin/orders", icon: ShoppingBag, desc: "Track orders" },
          { label: "Payments", path: "/admin/payments", icon: IndianRupee, desc: "Verify payments" },
        ].map((item, i) => (
          <Link key={i} to={item.path} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-[#ff8309]/20 transition-all">
            <item.icon size={18} className="text-[#ff8309] mb-2" />
            <p className="text-xs font-bold text-[#0a2b4a]">{item.label}</p>
            <p className="text-[10px] text-[#888]">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Customers */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">Recent Customers</h3>
        {recentCustomers && recentCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-[10px] font-bold text-[#888] uppercase pb-2">Name</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase pb-2">Email</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase pb-2">Mobile</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.slice(0, 5).map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50">
                    <td className="py-2 text-xs font-medium text-[#0a2b4a]">{c.name}</td>
                    <td className="py-2 text-xs text-[#555]">{c.email}</td>
                    <td className="py-2 text-xs text-[#555]">{c.mobile}</td>
                    <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-[#888] text-center py-4">No customers yet</p>
        )}
      </div>
    </div>
  );
}
