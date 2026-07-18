import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { IndianRupee, Plus, Check, X, CheckCircle } from "lucide-react";

export default function AdminPackages() {
  const utils = trpc.useUtils();
  const { data: packages, isLoading } = trpc.admin.listPackages.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");

  const create = trpc.admin.createPackage.useMutation({
    onSuccess: () => { utils.admin.listPackages.invalidate(); setShowForm(false); setName(""); setSlug(""); setPrice(""); },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2"><IndianRupee size={22} className="text-[#ff8309]" /> Packages</h1>
          <p className="text-xs text-[#888] mt-0.5">Manage pricing packages</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-orange text-xs flex items-center gap-1.5"><Plus size={14} /> Add</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">New Package</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Package name"
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug"
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (99)"
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
          </div>
          <button onClick={() => create.mutate({ name, slug, price })} disabled={!name || !slug || !price}
            className="mt-3 px-5 py-2 bg-[#0a2b4a] text-white rounded-xl text-xs font-bold hover:bg-[#103558] disabled:opacity-50">
            {create.isPending ? "Creating..." : "Create Package"}
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="text-[#888] text-sm">Loading...</p>
        ) : !packages || packages.length === 0 ? (
          <p className="text-[#888] text-sm">No packages yet</p>
        ) : (
          packages.map((pkg: any) => (
            <div key={pkg.id} className={`rounded-2xl p-5 relative ${pkg.isActive ? "bg-gradient-to-br from-[#0a2b4a] to-[#08223b] text-white" : "bg-gray-100"}`}>
              <h3 className={`font-bold text-base ${pkg.isActive ? "text-white" : "text-[#0a2b4a]"}`}>{pkg.name}</h3>
              <div className="flex items-baseline gap-1 my-2">
                <span className={`text-xs ${pkg.isActive ? "text-white/50" : "text-[#888]"}`}>Rs</span>
                <span className={`text-3xl font-extrabold ${pkg.isActive ? "text-[#ff8309]" : "text-[#0a2b4a]"}`}>{pkg.price}</span>
              </div>
              <div className="space-y-1.5">
                {["maxCards","allowSocialLinks","allowPaymentQr","allowBusinessImages","allowServicesList","prioritySupport"].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs">
                    {pkg[feat] ? <CheckCircle size={12} className="text-green-400" /> : <X size={12} className={pkg.isActive ? "text-white/30" : "text-gray-300"} />}
                    <span className={pkg.isActive ? "text-white/70" : "text-[#888]"}>{feat.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
