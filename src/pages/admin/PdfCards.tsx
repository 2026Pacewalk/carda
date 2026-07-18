import { trpc } from "@/providers/trpc";
import { CreditCard, Eye, Download } from "lucide-react";

export default function AdminPdfCards() {
  const { data: cards, isLoading } = trpc.admin.listAllCards.useQuery();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2"><CreditCard size={22} className="text-[#ff8309]" /> PDF Cards</h1>
        <p className="text-xs text-[#888] mt-0.5">All customer PDF cards</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8 text-[#888]">Loading...</div>
        ) : !cards || cards.length === 0 ? (
          <div className="text-center py-8 text-[#888]">No cards yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-[#f8f7f7]">
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">ID</th>
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">Business</th>
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">Owner</th>
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">Mobile</th>
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">Status</th>
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">Downloads</th>
                  <th className="text-[12px] font-bold text-[#888] uppercase px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-[#f8f7f7]">
                    <td className="px-4 py-3 text-xs text-[#888]">#{c.id}</td>
                    <td className="px-4 py-3 text-xs font-bold text-[#0a2b4a]">{c.businessName || "-"}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">{c.ownerName || "-"}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">{c.mobileNumber || "-"}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${c.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{c.status}</span></td>
                    <td className="px-4 py-3 text-xs text-[#555]">{c.downloadCount ?? 0}</td>
                    <td className="px-4 py-3 text-[12px] text-[#888]">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
