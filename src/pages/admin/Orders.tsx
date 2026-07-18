import { trpc } from "@/providers/trpc";
import { ShoppingBag, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function AdminOrders() {
  const utils = trpc.useUtils();
  const { data: orders, isLoading } = trpc.admin.listAllOrders.useQuery();
  const updateStatus = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => utils.admin.listAllOrders.invalidate(),
  });

  const statusClass = (s: string) => {
    switch (s) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2"><ShoppingBag size={22} className="text-[#ff8309]" /> Orders</h1>
        <p className="text-xs text-[#888] mt-0.5">Manage customer orders</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8 text-[#888]">Loading...</div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-8 text-[#888]">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100 bg-[#f8f7f7]">
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">ID</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Customer</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Amount</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Status</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Date</th>
                <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Action</th>
              </tr></thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-[#f8f7f7]">
                    <td className="px-4 py-3 text-xs text-[#888]">#{o.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0a2b4a]">#{o.customerId}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">Rs {o.amount}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusClass(o.status)}`}>{o.status}</span></td>
                    <td className="px-4 py-3 text-[10px] text-[#888]">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select value={o.status} onChange={(e) => updateStatus.mutate({ id: o.id, status: e.target.value as any })}
                        className="text-[10px] border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#ff8309]">
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
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
