import { trpc } from "@/providers/trpc";
import { ShoppingBag, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function CustomerOrders() {
  const { data: orders, isLoading } = trpc.customer.listMyOrders.useQuery();
  const { data: packages } = trpc.customer.listPackages.useQuery();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle size={14} className="text-green-500" />;
      case "pending": return <Clock size={14} className="text-yellow-500" />;
      default: return <AlertCircle size={14} className="text-red-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">My Orders</h1>
        <p className="text-xs text-[#888] mt-0.5">Track your PDF card orders</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-[#888]">Loading...</div>
      ) : !orders || orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <ShoppingBag size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-[#888]">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => {
            const pkg = packages?.find((p: any) => p.id === order.packageId);
            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0a2b4a]">Order #{order.id}</span>
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] font-bold ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                </div>
                <p className="text-sm text-[#555]">{pkg?.name || "Unknown Package"}</p>
                <p className="text-xs text-[#888]">Amount: Rs {order.amount}</p>
                <p className="text-[12px] text-[#aaa] mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
