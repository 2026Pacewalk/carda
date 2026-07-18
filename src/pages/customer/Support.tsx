import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { HelpCircle, MessageCircle, Send, Check, Clock } from "lucide-react";

export default function CustomerSupport() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const utils = trpc.useUtils();

  const { data: tickets, isLoading } = trpc.customer.listMyTickets.useQuery();
  const createTicket = trpc.customer.createTicket.useMutation({
    onSuccess: () => {
      utils.customer.listMyTickets.invalidate();
      setSubject("");
      setMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    createTicket.mutate({ subject, message });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "open": return "bg-yellow-100 text-yellow-700";
      case "in_progress": return "bg-blue-100 text-blue-700";
      case "resolved": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Support</h1>
        <p className="text-xs text-[#888] mt-0.5">Get help with your PDF cards</p>
      </div>

      {/* WhatsApp */}
      <a href="https://wa.me/919517722444" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all">
        <MessageCircle size={24} className="text-green-600" />
        <div>
          <p className="text-sm font-bold text-green-800">Chat on WhatsApp</p>
          <p className="text-[12px] text-green-600">Get instant help via WhatsApp</p>
        </div>
      </a>

      {/* New Ticket */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0a2b4a] mb-3 flex items-center gap-2"><HelpCircle size={14} className="text-[#ff8309]" /> Create Ticket</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
            placeholder="Describe your issue..." className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309] resize-none" />
          <button type="submit" disabled={createTicket.isPending}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#ff8309] text-white rounded-xl text-xs font-bold hover:bg-[#e57400] disabled:opacity-50 transition-all">
            <Send size={12} /> {createTicket.isPending ? "Sending..." : "Submit Ticket"}
          </button>
        </form>
      </div>

      {/* Tickets */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">My Tickets</h3>
        {isLoading ? (
          <p className="text-xs text-[#888] text-center py-4">Loading...</p>
        ) : !tickets || tickets.length === 0 ? (
          <p className="text-xs text-[#888] text-center py-4">No tickets yet</p>
        ) : (
          <div className="space-y-2">
            {tickets.map((t: any) => (
              <div key={t.id} className="p-3 bg-[#f8f7f7] rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-[#0a2b4a]">{t.subject}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${getStatusClass(t.status)}`}>{t.status}</span>
                </div>
                <p className="text-[12px] text-[#555]">{t.message}</p>
                {t.adminReply && (
                  <div className="mt-2 p-2 bg-white rounded-lg border border-gray-100">
                    <p className="text-[11px] font-bold text-[#ff8309]">Reply:</p>
                    <p className="text-[12px] text-[#555]">{t.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
