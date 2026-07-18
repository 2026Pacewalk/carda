import { trpc } from "@/providers/trpc";
import { Ticket, CheckCircle, Clock, XCircle } from "lucide-react";

export default function AdminPayments() {
  const utils = trpc.useUtils();
  const { data: payments, isLoading } = trpc.admin.listAllPayments.useQuery();
  const updateStatus = trpc.admin.updatePaymentStatus.useMutation({
    onSuccess: () => { utils.admin.listAllPayments.invalidate(); utils.admin.getStats.invalidate(); },
  });

  const statusClass = (s: string) => {
    switch (s) {
      case "approved": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2"><Ticket size={22} className="text-[#ff8309]" /> Payments</h1>
        <p className="text-xs text-[#888] mt-0.5">Verify customer payment proofs</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8 text-[#888]">Loading...</div>
        ) : !payments || payments.length === 0 ? (
          <div className="text-center py-8 text-[#888]">No payments yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100 bg-[#f8f7f7]">
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">ID</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Customer</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Amount</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Method</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">UPI</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Status</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Action</th>
              </tr></thead>
              <tbody>
                {payments.map((p: any) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-[#f8f7f7]">
                    <td className="px-4 py-3 text-xs text-[#888]">#{p.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0a2b4a]">#{p.customerId}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">Rs {p.amount}</td>
                    <td className="px-4 py-3 text-xs text-[#555] uppercase">{p.paymentMethod}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">{p.upiId || "-"}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusClass(p.status)}`}>{p.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => updateStatus.mutate({ id: p.id, status: "approved" })} className="p-1 bg-green-50 rounded hover:bg-green-100" title="Approve"><CheckCircle size={12} className="text-green-600" /></button>
                        <button onClick={() => updateStatus.mutate({ id: p.id, status: "rejected" })} className="p-1 bg-red-50 rounded hover:bg-red-100" title="Reject"><XCircle size={12} className="text-red-600" /></button>
                      </div>
                    </td>
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
