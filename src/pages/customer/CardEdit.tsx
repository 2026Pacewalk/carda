import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { ArrowLeft, Save, Check } from "lucide-react";
import { Link } from "react-router";

export default function CustomerCardEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cardId = Number(id);
  const { data: card, isLoading } = trpc.customer.getCard.useQuery({ id: cardId });
  const utils = trpc.useUtils();

  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (card) {
      setForm({
        businessName: card.businessName || "",
        ownerName: card.ownerName || "",
        designation: card.designation || "",
        aboutBusiness: card.aboutBusiness || "",
        mobileNumber: card.mobileNumber || "",
        whatsappNumber: card.whatsappNumber || "",
        email: card.email || "",
        website: card.website || "",
        address: card.address || "",
        googleMapLink: card.googleMapLink || "",
        facebook: card.facebook || "",
        instagram: card.instagram || "",
        linkedin: card.linkedin || "",
        twitter: card.twitter || "",
        youtube: card.youtube || "",
        upiId: card.upiId || "",
        logoUrl: card.logoUrl || "",
        profilePhotoUrl: card.profilePhotoUrl || "",
      });
    }
  }, [card]);

  const updateCard = trpc.customer.updateCard.useMutation({
    onSuccess: () => {
      utils.customer.listMyCards.invalidate();
      utils.customer.getCard.invalidate({ id: cardId });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSave = () => {
    updateCard.mutate({ id: cardId, ...form });
  };

  if (isLoading) return <div className="text-center py-12 text-[#888]">Loading...</div>;
  if (!card) return <div className="text-center py-12 text-[#888]">Card not found</div>;

  const sections = [
    { title: "Business Info", fields: [
      { label: "Business Name", key: "businessName", required: true },
      { label: "Owner Name", key: "ownerName", required: true },
      { label: "Designation", key: "designation" },
      { label: "About Business", key: "aboutBusiness", textarea: true },
    ]},
    { title: "Contact", fields: [
      { label: "Mobile", key: "mobileNumber", required: true },
      { label: "WhatsApp", key: "whatsappNumber" },
      { label: "Email", key: "email" },
      { label: "Website", key: "website" },
      { label: "Address", key: "address", textarea: true },
      { label: "Google Map", key: "googleMapLink" },
    ]},
    { title: "Social & Payment", fields: [
      { label: "Facebook", key: "facebook" },
      { label: "Instagram", key: "instagram" },
      { label: "LinkedIn", key: "linkedin" },
      { label: "Twitter", key: "twitter" },
      { label: "YouTube", key: "youtube" },
      { label: "UPI ID", key: "upiId" },
    ]},
    { title: "Media", fields: [
      { label: "Logo URL", key: "logoUrl" },
      { label: "Profile Photo URL", key: "profilePhotoUrl" },
    ]},
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/customer/my-cards" className="p-2 bg-white rounded-lg border border-gray-100 hover:bg-[#f8f7f7]"><ArrowLeft size={16} className="text-[#0a2b4a]" /></Link>
          <div>
            <h1 className="text-lg font-extrabold text-[#0a2b4a]">Edit Card</h1>
            <p className="text-[12px] text-[#888]">{card.businessName}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={updateCard.isPending}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${saved ? "bg-green-500 text-white" : "bg-[#ff8309] text-white hover:bg-[#e57400]"}`}>
          {saved ? <><Check size={12} /> Saved</> : <><Save size={12} /> {updateCard.isPending ? "Saving..." : "Save"}</>}
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-[#0a2b4a] mb-3">{section.title}</h3>
          <div className="space-y-3">
            {section.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-[13px] font-bold text-[#0a2b4a] mb-1">{field.label} {field.required && "*"}</label>
                {field.textarea ? (
                  <textarea value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)} rows={3}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309] transition-all resize-none" />
                ) : (
                  <input type="text" value={form[field.key] || ""} onChange={(e) => update(field.key, e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309] transition-all" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleSave} disabled={updateCard.isPending}
        className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${saved ? "bg-green-500 text-white" : "bg-[#0a2b4a] text-white hover:bg-[#103558]"}`}>
        {saved ? "Saved Successfully!" : updateCard.isPending ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
