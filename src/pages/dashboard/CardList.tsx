import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { CreditCard, Plus, Download, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export default function CardList() {
  const utils = trpc.useUtils();
  const { data: cards, isLoading } = trpc.card.listMyCards.useQuery();
  const deleteCard = trpc.card.deleteCard.useMutation({
    onSuccess: () => utils.card.listMyCards.invalidate(),
  });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  if (isLoading) return <div className="text-center py-12 text-[#888] text-sm">Loading your cards...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0a2b4a]">My Cards</h1>
          <p className="text-[#888] text-sm mt-1">{cards?.length ?? 0} card{cards?.length !== 1 ? "s" : ""} created</p>
        </div>
        <Link to="/dashboard/builder" className="flex items-center gap-1.5 px-4 py-2 bg-[#ff8309] text-white rounded-full text-xs font-bold hover:bg-[#e57400] transition-all">
          <Plus size={14} /> New Card
        </Link>
      </div>

      {!cards || cards.length === 0 ? (
        <div className="bg-white rounded-xl p-10 border border-gray-100 text-center">
          <CreditCard size={40} className="text-[#ddd] mx-auto mb-3" />
          <h2 className="text-[#0a2b4a] font-bold text-sm mb-1">No cards yet</h2>
          <p className="text-[#888] text-xs mb-4">Create your first professional PDF business card</p>
          <Link to="/dashboard/builder" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0a2b4a] to-[#103558] text-white rounded-full text-xs font-bold">
            <Plus size={14} /> Create Card
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              {/* Card preview header */}
              <div className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff8309] flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {(card.ownerName ?? card.businessName ?? "?").charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs truncate">{card.ownerName ?? "No Name"}</p>
                    <p className="text-white/50 text-[12px] truncate">{card.designation ?? "No Designation"}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[#0a2b4a] font-bold text-xs mb-0.5 truncate">{card.businessName ?? "Untitled"}</p>
                <p className="text-[#888] text-[12px] mb-2 truncate">{card.mobileNumber ?? "No phone"}</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[12px] px-2 py-0.5 rounded-full font-bold ${
                    card.status === "published" ? "bg-green-50 text-green-600" :
                    card.status === "draft" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    {card.status}
                  </span>
                  <span className="text-[12px] text-[#888]">{card.downloadCount ?? 0} downloads</span>
                </div>

                <div className="flex gap-1.5">
                  <Link to={`/dashboard/cards/${card.id}`} className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#f8f7f7] rounded-lg text-[12px] font-bold text-[#0a2b4a] hover:bg-[#ff8309]/10 hover:text-[#ff8309] transition-all">
                    <Eye size={12} /> View
                  </Link>
                  <Link to={`/dashboard/cards/${card.id}/edit`} className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#f8f7f7] rounded-lg text-[12px] font-bold text-[#0a2b4a] hover:bg-[#ff8309]/10 hover:text-[#ff8309] transition-all">
                    <Edit size={12} /> Edit
                  </Link>
                  <button onClick={() => { /* download logic */ }} className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#f8f7f7] rounded-lg text-[12px] font-bold text-[#0a2b4a] hover:bg-[#ff8309]/10 hover:text-[#ff8309] transition-all">
                    <Download size={12} /> PDF
                  </button>
                  <button
                    onClick={() => setConfirmDelete(card.id)}
                    className="px-2 py-2 bg-red-50 rounded-lg text-red-400 hover:bg-red-100 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {confirmDelete === card.id && (
                  <div className="mt-2 p-2 bg-red-50 rounded-lg text-center">
                    <p className="text-[12px] text-red-600 mb-1.5">Delete this card permanently?</p>
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => { deleteCard.mutate({ id: card.id }); setConfirmDelete(null); }} className="px-3 py-1 bg-red-500 text-white rounded-lg text-[12px] font-bold">Delete</button>
                      <button onClick={() => setConfirmDelete(null)} className="px-3 py-1 bg-white text-[#888] rounded-lg text-[12px] font-bold border border-gray-200">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
