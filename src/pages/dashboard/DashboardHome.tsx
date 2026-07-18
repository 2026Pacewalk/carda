import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { CreditCard, Plus, Download, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

export default function DashboardHome() {
  const { data: cards } = trpc.card.listMyCards.useQuery();
  const { data: tickets } = trpc.card.listMyTickets.useQuery();

  const cardCount = cards?.length ?? 0;
  const publishedCount = cards?.filter((c) => c.status === "published").length ?? 0;
  const totalDownloads = cards?.reduce((sum, c) => sum + (c.downloadCount ?? 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Dashboard</h1>
        <p className="text-[#888] text-sm mt-1">Manage your PDF digital business cards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Cards", value: cardCount, icon: CreditCard, color: "from-[#0a2b4a] to-[#103558]" },
          { label: "Published", value: publishedCount, icon: Sparkles, color: "from-[#ff8309] to-[#e57400]" },
          { label: "Downloads", value: totalDownloads, icon: Download, color: "from-green-500 to-green-600" },
          { label: "Support Tickets", value: tickets?.length ?? 0, icon: HelpCircle, color: "from-purple-500 to-purple-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon size={14} className="text-white" />
            </div>
            <p className="text-2xl font-extrabold text-[#0a2b4a]">{stat.value}</p>
            <p className="text-[#888] text-[13px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Link to="/dashboard/builder" className="bg-gradient-to-r from-[#0a2b4a] to-[#103558] rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-full bg-[#ff8309] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Plus size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Create New Card</p>
            <p className="text-white/50 text-[13px]">Build a professional PDF card in minutes</p>
          </div>
          <ArrowRight size={18} className="text-white/40 ml-auto group-hover:text-[#ff8309] transition-colors" />
        </Link>

        <Link to="/dashboard/cards" className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-full bg-[#f8f7f7] flex items-center justify-center flex-shrink-0">
            <CreditCard size={22} className="text-[#0a2b4a]" />
          </div>
          <div>
            <p className="text-[#0a2b4a] font-bold text-sm">My Cards</p>
            <p className="text-[#888] text-[13px]">View, edit and download your cards</p>
          </div>
          <ArrowRight size={18} className="text-[#ccc] ml-auto group-hover:text-[#ff8309] transition-colors" />
        </Link>
      </div>

      {/* Recent Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#0a2b4a]">Recent Cards</h2>
          <Link to="/dashboard/cards" className="text-[13px] text-[#ff8309] font-medium hover:underline">View All</Link>
        </div>
        {cards && cards.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cards.slice(0, 6).map((card) => (
              <Link
                key={card.id}
                to={`/dashboard/cards/${card.id}`}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-[#ff8309]/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {(card.businessName ?? card.ownerName ?? "C").charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0a2b4a] font-bold text-xs truncate">{card.businessName ?? card.ownerName ?? "Untitled Card"}</p>
                    <p className="text-[#999] text-[12px] truncate">{card.designation ?? "No designation"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${
                    card.status === "published" ? "bg-green-50 text-green-600" :
                    card.status === "draft" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
                  }`}>{card.status}</span>
                  <span className="text-[12px] text-[#999]">{card.downloadCount ?? 0} downloads</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
            <CreditCard size={32} className="text-[#ddd] mx-auto mb-2" />
            <p className="text-[#888] text-sm mb-3">No cards yet</p>
            <Link to="/dashboard/builder" className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff8309] text-white rounded-full text-xs font-bold">
              <Plus size={14} /> Create Your First Card
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
