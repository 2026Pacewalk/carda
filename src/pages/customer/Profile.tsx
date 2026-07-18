import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { User, Mail, Phone, Lock, Save, Check, Shield } from "lucide-react";

export default function CustomerProfile() {
  const { data: customer } = trpc.customerAuth.me.useQuery();
  const utils = trpc.useUtils();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [error, setError] = useState("");

  const updateProfile = trpc.customerAuth.updateProfile.useMutation({
    onSuccess: () => {
      utils.customerAuth.me.invalidate();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  const changePassword = trpc.customerAuth.changePassword.useMutation({
    onSuccess: () => {
      setPassSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setPassSaved(false), 2000);
    },
    onError: (err) => setError(err.message),
  });

  const handleProfileSave = () => {
    updateProfile.mutate({
      name: name || undefined,
      mobile: mobile || undefined,
    });
  };

  const handlePasswordChange = () => {
    setError("");
    if (!currentPassword || !newPassword) { setError("Fill both fields"); return; }
    if (newPassword.length < 6) { setError("New password must be 6+ chars"); return; }
    changePassword.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Profile</h1>
        <p className="text-xs text-[#888] mt-0.5">Manage your account settings</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center text-white text-xl font-bold">
            {customer?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0a2b4a]">{customer?.name || "User"}</h3>
            <p className="text-[10px] text-[#888]">{customer?.email}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[9px] font-bold">
              <Shield size={8} /> {customer?.status || "active"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-[#0a2b4a] mb-1">Name</label>
            <div className="relative">
              <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input type="text" defaultValue={customer?.name || ""} onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#0a2b4a] mb-1">Email</label>
            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input type="email" value={customer?.email || ""} disabled
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#888]" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#0a2b4a] mb-1">Mobile</label>
            <div className="relative">
              <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input type="tel" defaultValue={customer?.mobile || ""} onChange={(e) => setMobile(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
            </div>
          </div>
          <button onClick={handleProfileSave} disabled={updateProfile.isPending}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${saved ? "bg-green-500 text-white" : "bg-[#ff8309] text-white hover:bg-[#e57400]"}`}>
            {saved ? <><Check size={12} className="inline" /> Saved</> : updateProfile.isPending ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0a2b4a] mb-3 flex items-center gap-2"><Lock size={14} className="text-[#ff8309]" /> Change Password</h3>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        <div className="space-y-3">
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 6 chars)" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
          <button onClick={handlePasswordChange} disabled={changePassword.isPending}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${passSaved ? "bg-green-500 text-white" : "bg-[#0a2b4a] text-white hover:bg-[#103558]"}`}>
            {passSaved ? "Password Updated!" : changePassword.isPending ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
