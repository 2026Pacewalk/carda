import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { Palette, Plus, Trash2, Check } from "lucide-react";

export default function AdminTemplates() {
  const utils = trpc.useUtils();
  const { data: templates, isLoading } = trpc.admin.listTemplates.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("professional");

  const create = trpc.admin.createTemplate.useMutation({
    onSuccess: () => { utils.admin.listTemplates.invalidate(); setShowForm(false); setName(""); },
  });
  const remove = trpc.admin.deleteTemplate.useMutation({
    onSuccess: () => utils.admin.listTemplates.invalidate(),
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0a2b4a] flex items-center gap-2"><Palette size={22} className="text-[#ff8309]" /> Templates</h1>
          <p className="text-xs text-[#888] mt-0.5">Manage card templates</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-orange text-xs flex items-center gap-1.5"><Plus size={14} /> Add</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">New Template</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name"
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]" />
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309]">
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
              <option value="minimal">Minimal</option>
              <option value="modern">Modern</option>
            </select>
          </div>
          <button onClick={() => create.mutate({ name, category })} disabled={!name || create.isPending}
            className="mt-3 px-5 py-2 bg-[#0a2b4a] text-white rounded-xl text-xs font-bold hover:bg-[#103558] disabled:opacity-50">
            {create.isPending ? "Creating..." : "Create Template"}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8 text-[#888]">Loading...</div>
        ) : !templates || templates.length === 0 ? (
          <div className="text-center py-8 text-[#888]">No templates yet</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {templates.map((t: any) => (
              <div key={t.id} className="bg-[#f8f7f7] rounded-xl p-4 border border-gray-100">
                <div className="w-full h-24 bg-gradient-to-br from-[#0a2b4a] to-[#103558] rounded-lg flex items-center justify-center mb-3">
                  <Palette size={24} className="text-white/50" />
                </div>
                <h4 className="text-sm font-bold text-[#0a2b4a]">{t.name}</h4>
                <p className="text-[12px] text-[#888] capitalize">{t.category} • {t.isActive ? "Active" : "Inactive"}</p>
                <button onClick={() => remove.mutate({ id: t.id })} className="mt-2 flex items-center gap-1 text-[12px] text-red-500 hover:text-red-700">
                  <Trash2 size={10} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
