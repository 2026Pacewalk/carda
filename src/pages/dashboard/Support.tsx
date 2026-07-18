import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { HelpCircle, MessageCircle, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function Support() {
  const utils = trpc.useUtils();
  const { data: tickets } = trpc.card.listMyTickets.useQuery();
  const createTicket = trpc.card.createTicket.useMutation({
    onSuccess: () => { utils.card.listMyTickets.invalidate(); setSubject(""); setMessage(""); },
  });

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const statusIcon = (status: string) => {
    if (status === "resolved" || status === "closed") return <CheckCircle size={12} className="text-green-500" />;
    if (status === "in_progress") return <Clock size={12} className="text-amber-500" />;
    return <AlertCircle size={12} className="text-blue-500" />;
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Support</h1>
        <p className="text-[#888] text-sm mt-1">Get help with your PDF cards</p>
      </div>

      {/* New Ticket */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h2 className="text-sm font-bold text-[#0a2b4a] mb-4">Create Support Ticket</h2>
        <div className="mb-3">
          <label className="text-[11px] font-bold text-[#0a2b4a] mb-1 block">Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's the issue?"
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309]" />
        </div>
        <div className="mb-3">
          <label className="text-[11px] font-bold text-[#0a2b4a] mb-1 block">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue in detail..."
            rows={4} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309] resize-none" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => createTicket.mutate({ subject, message })}
            disabled={!subject.trim() || !message.trim() || createTicket.isPending}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#0a2b4a] to-[#103558] text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all disabled:opacity-40">
            <Send size={12} /> {createTicket.isPending ? "Submitting..." : "Submit Ticket"}
          </button>
          <a href="https://wa.me/919517722444" target="_blank" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition-all">
            <MessageCircle size={12} /> WhatsApp
          </a>
        </div>
      </div>

      {/* Tickets */}
      <div>
        <h2 className="text-sm font-bold text-[#0a2b4a] mb-3">Your Tickets</h2>
        {tickets && tickets.length > 0 ? (
          <div className="space-y-2">
            {tickets.map((t) => (
              <div key={t.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  {statusIcon(t.status)}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    t.status === "resolved" ? "bg-green-50 text-green-600" :
                    t.status === "in_progress" ? "bg-amber-50 text-amber-600" :
                    "bg-blue-50 text-blue-600"
                  }`}>{t.status.replace("_", " ")}</span>
                  <span className="text-[10px] text-[#888] ml-auto">{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xs font-bold text-[#0a2b4a] mb-0.5">{t.subject}</h3>
                <p className="text-[#888] text-[11px]">{t.message}</p>
                {t.adminReply && (
                  <div className="mt-2 p-2 bg-[#f8f7f7] rounded-lg">
                    <p className="text-[10px] text-[#ff8309] font-bold mb-0.5">Reply from team:</p>
                    <p className="text-[11px] text-[#555]">{t.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <HelpCircle size={28} className="text-[#ddd] mx-auto mb-2" />
            <p className="text-[#888] text-xs">No tickets yet. Need help? Create one above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
