import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { CreditCard, Plus, Download, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export default function CustomerMyCards() {
  const utils = trpc.useUtils();
  const { data: cards, isLoading } = trpc.customer.listMyCards.useQuery();
  const deleteCard = trpc.customer.deleteCard.useMutation({
    onSuccess: () => utils.customer.listMyCards.invalidate(),
  });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0a2b4a]">My PDF Cards</h1>
          <p className="text-xs text-[#888] mt-0.5">Manage all your business cards</p>
        </div>
        <Link to="/customer/create-card" className="btn-orange text-xs flex items-center gap-1.5">
          <Plus size={14} /> Create New
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-[#888] text-sm">Loading...</div>
      ) : !cards || cards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <CreditCard size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-[#888] mb-3">No cards yet. Create your first PDF card!</p>
          <Link to="/customer/create-card" className="btn-orange text-xs">Create Card</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((card: any) => (
            <div key={card.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-xl flex items-center justify-center text-white text-lg font-bold">
                  {card.businessName?.charAt(0) ?? "C"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#0a2b4a] truncate">{card.businessName || "Untitled"}</h3>
                  <p className="text-[12px] text-[#888]">{card.ownerName}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${card.status === "published" ? "bg-green-100 text-green-700" : card.status === "draft" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                    {card.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Link to={`/customer/my-cards/${card.id}`} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#f8f7f7] rounded-lg text-[12px] font-bold text-[#0a2b4a] hover:bg-[#ff8309]/10 transition-all">
                  <Eye size={10} /> View
                </Link>
                <Link to={`/customer/my-cards/${card.id}/edit`} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[#f8f7f7] rounded-lg text-[12px] font-bold text-[#0a2b4a] hover:bg-[#ff8309]/10 transition-all">
                  <Edit size={10} /> Edit
                </Link>
                {confirmDelete === card.id ? (
                  <button onClick={() => deleteCard.mutate({ id: card.id })} className="flex-1 py-1.5 bg-red-500 text-white rounded-lg text-[12px] font-bold">
                    Confirm
                  </button>
                ) : (
                  <button onClick={() => setConfirmDelete(card.id)} className="p-1.5 bg-[#f8f7f7] rounded-lg hover:bg-red-50 text-[#888] hover:text-red-500 transition-all">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
