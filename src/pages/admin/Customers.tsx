import { trpc } from "@/providers/trpc";
import { Users, Shield, Ban } from "lucide-react";

export default function AdminCustomers() {
  const utils = trpc.useUtils();
  const { data: customers, isLoading } = trpc.admin.listCustomers.useQuery();
  const updateStatus = trpc.admin.updateCustomerStatus.useMutation({
    onSuccess: () => utils.admin.listCustomers.invalidate(),
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2"><Users size={22} className="text-[#ff8309]" /> Customers</h1>
        <p className="text-xs text-[#888] mt-0.5">Manage registered customers</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8 text-[#888]">Loading...</div>
        ) : !customers || customers.length === 0 ? (
          <div className="text-center py-8 text-[#888]">No customers yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-[#f8f7f7]">
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">ID</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Name</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Email</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Mobile</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Status</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Joined</th>
                  <th className="text-[10px] font-bold text-[#888] uppercase px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-[#f8f7f7]">
                    <td className="px-4 py-3 text-xs text-[#888]">#{c.id}</td>
                    <td className="px-4 py-3 text-xs font-bold text-[#0a2b4a]">{c.name}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">{c.email}</td>
                    <td className="px-4 py-3 text-xs text-[#555]">{c.mobile}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${c.status === "active" ? "bg-green-100 text-green-700" : c.status === "suspended" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>{c.status}</span></td>
                    <td className="px-4 py-3 text-[10px] text-[#888]">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => updateStatus.mutate({ id: c.id, status: "active" })} className="p-1 bg-green-50 rounded hover:bg-green-100" title="Activate"><Shield size={12} className="text-green-600" /></button>
                        <button onClick={() => updateStatus.mutate({ id: c.id, status: "suspended" })} className="p-1 bg-red-50 rounded hover:bg-red-100" title="Suspend"><Ban size={12} className="text-red-600" /></button>
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
