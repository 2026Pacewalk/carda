import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { User, Shield, Bell, Package } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const { data: packages } = trpc.card.listPackages.useQuery();

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Settings</h1>
        <p className="text-[#888] text-sm mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User size={14} className="text-[#ff8309]" />
          <h2 className="text-sm font-bold text-[#0a2b4a]">Profile</h2>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff8309] to-[#e57400] flex items-center justify-center text-lg font-bold text-white">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <div>
            <p className="text-[#0a2b4a] font-bold text-sm">{user?.name ?? "User"}</p>
            <p className="text-[#888] text-xs">{user?.email ?? ""}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${
              user?.role === "admin" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
            }`}>{user?.role ?? "user"}</span>
          </div>
        </div>
      </div>

      {/* Package */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Package size={14} className="text-[#ff8309]" />
          <h2 className="text-sm font-bold text-[#0a2b4a]">Available Packages</h2>
        </div>
        <div className="space-y-3">
          {packages?.map((pkg) => (
            <div key={pkg.id} className={`p-3 rounded-xl border ${pkg.slug === "premium" ? "border-[#ff8309]/30 bg-[#fff8f0]" : "border-gray-100 bg-[#f8f7f7]"}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-[#0a2b4a]">{pkg.name}</p>
                <p className="text-sm font-extrabold text-[#ff8309]">Rs {pkg.price}</p>
              </div>
              <p className="text-[10px] text-[#888] mb-2">{pkg.description}</p>
              {pkg.features && (pkg.features as string[]).map((f: string, i: number) => (
                <span key={i} className="inline-block text-[10px] bg-white px-2 py-0.5 rounded-full text-[#555] mr-1 mb-1">{f}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className="text-[#ff8309]" />
          <h2 className="text-sm font-bold text-[#0a2b4a]">Security</h2>
        </div>
        <p className="text-[#888] text-xs">Your account is secured with OAuth 2.0 authentication.</p>
      </div>

      {/* Support */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Bell size={14} className="text-[#ff8309]" />
          <h2 className="text-sm font-bold text-[#0a2b4a]">Need Help?</h2>
        </div>
        <a href="https://wa.me/919517722444" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-all">
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
}
