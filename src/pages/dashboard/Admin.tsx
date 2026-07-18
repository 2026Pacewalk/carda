import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, CreditCard, HelpCircle, TrendingUp, Download,
  MessageCircle, Shield, BarChart3, Ticket
} from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "cards" | "tickets">("overview");
  const [replyText, setReplyText] = useState<Record<number, string>>({});

  const { data: stats } = trpc.card.getStats.useQuery();
  const { data: allCards } = trpc.card.listAllCards.useQuery();
  const { data: allTickets } = trpc.card.listAllTickets.useQuery();
  const utils = trpc.useUtils();

  const updateTicket = trpc.card.updateTicketStatus.useMutation({
    onSuccess: () => {
      utils.card.listAllTickets.invalidate();
      utils.card.getStats.invalidate();
    },
  });

  if (!user) return <div className="flex items-center justify-center h-64 text-[#888]">Loading...</div>;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

  const statCards = [
    { label: "Total Cards", value: stats?.cards ?? 0, icon: CreditCard, color: "bg-[#ff8309]" },
    { label: "Total Tickets", value: stats?.tickets ?? 0, icon: HelpCircle, color: "bg-red-500" },
    { label: "Total Orders", value: stats?.orders ?? 0, icon: Users, color: "bg-blue-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2">
            <Shield size={22} className="text-[#ff8309]" /> Admin Panel
          </h1>
          <p className="text-xs text-[#888] mt-0.5">Manage cards, tickets, and view analytics</p>
        </div>
        <span className="px-3 py-1 bg-[#ff8309]/10 text-[#ff8309] rounded-full text-[13px] font-bold w-fit">
          Admin: {user.name}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {statCards.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={16} className="text-white" />
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-extrabold text-[#0a2b4a]">{stat.value}</p>
            <p className="text-[13px] text-[#888]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          {[
            { key: "overview" as const, label: "Overview", icon: BarChart3 },
            { key: "cards" as const, label: "All Cards", icon: CreditCard },
            { key: "tickets" as const, label: "Support Tickets", icon: Ticket },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
                activeTab === tab.key
                  ? "border-[#ff8309] text-[#ff8309] bg-[#ff8309]/5"
                  : "border-transparent text-[#888] hover:text-[#0a2b4a]"
              }`}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0a2b4a]">Recent Activity</h3>
              <div className="space-y-2">
                {(allCards || []).slice(0, 5).map((card: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#f8f7f7] rounded-lg">
                    <div className="w-8 h-8 bg-[#0a2b4a] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      {card.businessName?.charAt(0) ?? "C"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#0a2b4a] truncate">{card.businessName}</p>
                      <p className="text-[12px] text-[#888]">{card.ownerName} • {card.mobileNumber}</p>
                    </div>
                    <span className="text-[12px] text-[#888]">{new Date(card.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
                {(!allCards || allCards.length === 0) && (
                  <p className="text-xs text-[#888] text-center py-6">No cards created yet</p>
                )}
              </div>
            </div>
          )}

          {/* All Cards */}
          {activeTab === "cards" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-[12px] font-bold text-[#888] uppercase pb-2 pr-3">Business</th>
                    <th className="text-[12px] font-bold text-[#888] uppercase pb-2 pr-3">Owner</th>
                    <th className="text-[12px] font-bold text-[#888] uppercase pb-2 pr-3">Contact</th>
                    <th className="text-[12px] font-bold text-[#888] uppercase pb-2 pr-3">Downloads</th>
                    <th className="text-[12px] font-bold text-[#888] uppercase pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(allCards || []).map((card: any, i: number) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-[#f8f7f7] transition-colors">
                      <td className="py-2.5 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center text-white text-[12px] font-bold">
                            {card.businessName?.charAt(0) ?? "C"}
                          </div>
                          <span className="text-xs font-medium text-[#0a2b4a]">{card.businessName}</span>
                        </div>
                      </td>
                      <td className="text-xs text-[#555] pr-3">{card.ownerName}</td>
                      <td className="text-xs text-[#555] pr-3">{card.mobileNumber}</td>
                      <td className="text-xs text-[#555] pr-3">
                        <span className="flex items-center gap-1"><Download size={10} className="text-[#ff8309]" /> {card.downloadCount ?? 0}</span>
                      </td>
                      <td className="text-[12px] text-[#888]">{new Date(card.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!allCards || allCards.length === 0) && (
                <p className="text-xs text-[#888] text-center py-8">No cards found</p>
              )}
            </div>
          )}

          {/* Support Tickets */}
          {activeTab === "tickets" && (
            <div className="space-y-3">
              {(allTickets || []).length === 0 && (
                <p className="text-xs text-[#888] text-center py-8">No support tickets yet</p>
              )}
              {(allTickets || []).map((ticket: any, i: number) => (
                <div key={i} className="bg-[#f8f7f7] rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={14} className="text-[#ff8309]" />
                      <h4 className="text-xs font-bold text-[#0a2b4a]">{ticket.subject}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[12px] font-bold ${
                      ticket.status === "open" ? "bg-yellow-100 text-yellow-700" :
                      ticket.status === "resolved" ? "bg-green-100 text-green-700" :
                      ticket.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{ticket.status}</span>
                  </div>
                  <p className="text-xs text-[#555] mb-2 pl-5">{ticket.message}</p>
                  {ticket.adminReply && (
                    <div className="pl-5 mb-2 p-2 bg-white rounded-lg border border-gray-100">
                      <p className="text-[12px] font-bold text-[#0a2b4a] mb-0.5">Admin Reply:</p>
                      <p className="text-xs text-[#555]">{ticket.adminReply}</p>
                    </div>
                  )}
                  <div className="pl-5 flex gap-2">
                    <select
                      value={ticket.status}
                      onChange={(e) => updateTicket.mutate({ id: ticket.id, status: e.target.value as any })}
                      className="text-[12px] border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-[#ff8309]"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <input
                      type="text"
                      value={replyText[ticket.id] ?? ""}
                      onChange={(e) => setReplyText(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                      placeholder="Reply..."
                      className="text-[12px] border border-gray-200 rounded-lg px-2 py-1 flex-1 focus:outline-none focus:border-[#ff8309]"
                    />
                    <button
                      onClick={() => {
                        if (replyText[ticket.id]?.trim()) {
                          updateTicket.mutate({ id: ticket.id, status: ticket.status, adminReply: replyText[ticket.id] });
                          setReplyText(prev => ({ ...prev, [ticket.id]: "" }));
                        }
                      }}
                      className="text-[12px] px-3 py-1 bg-[#ff8309] text-white rounded-lg font-bold hover:bg-[#e57400] transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
