import { useParams, useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { Building2, User, Phone, Mail, Globe, MapPin, CreditCard, ArrowLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function CardEdit() {
  const { id } = useParams<{ id: string }>();
  const cardId = Number(id);
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { data: card, isLoading } = trpc.card.getCard.useQuery({ id: cardId });
  const updateCard = trpc.card.updateCard.useMutation({
    onSuccess: () => { utils.card.listMyCards.invalidate(); navigate(`/dashboard/cards/${cardId}`); },
  });

  const [form, setForm] = useState<Record<string, string>>({});
  const [services, setServices] = useState<string[]>([""]);

  useEffect(() => {
    if (card) {
      setForm({
        businessName: card.businessName ?? "",
        ownerName: card.ownerName ?? "",
        designation: card.designation ?? "",
        aboutBusiness: card.aboutBusiness ?? "",
        mobileNumber: card.mobileNumber ?? "",
        whatsappNumber: card.whatsappNumber ?? "",
        email: card.email ?? "",
        website: card.website ?? "",
        address: card.address ?? "",
        googleMapLink: card.googleMapLink ?? "",
        upiId: card.upiId ?? "",
        facebook: card.facebook ?? "",
        instagram: card.instagram ?? "",
        linkedin: card.linkedin ?? "",
        twitter: card.twitter ?? "",
        youtube: card.youtube ?? "",
      });
      setServices((card.servicesList as string[])?.length > 0 ? card.servicesList as string[] : [""]);
    }
  }, [card]);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    updateCard.mutate({
      id: cardId,
      ...Object.fromEntries(Object.entries(form).filter(([, v]) => v)),
      servicesList: services.filter(Boolean),
      status: "published",
    });
  };

  if (isLoading) return <div className="text-center py-12 text-[#888]">Loading...</div>;

  const Input = ({ label, field, type = "text", placeholder, icon: Icon }: any) => (
    <div className="mb-3">
      <label className="text-[13px] font-bold text-[#0a2b4a] mb-1 flex items-center gap-1">
        {Icon && <Icon size={12} className="text-[#ff8309]" />} {label}
      </label>
      <input type={type} value={form[field] ?? ""} onChange={(e) => update(field, e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309]" />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/dashboard/cards/${cardId}`)} className="text-[#888] hover:text-[#0a2b4a]"><ArrowLeft size={20} /></button>
        <h1 className="text-lg font-extrabold text-[#0a2b4a]">Edit Card</h1>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm space-y-1">
        <h2 className="text-sm font-bold text-[#0a2b4a] mb-3">Business Info</h2>
        <Input label="Business Name" field="businessName" placeholder="Business name" icon={Building2} />
        <Input label="Owner Name" field="ownerName" placeholder="Your name" icon={User} />
        <Input label="Designation" field="designation" placeholder="Your designation" icon={User} />
        <div className="mb-3">
          <label className="text-[13px] font-bold text-[#0a2b4a] mb-1 block">About Business</label>
          <textarea value={form.aboutBusiness ?? ""} onChange={(e) => update("aboutBusiness", e.target.value)} placeholder="About your business" rows={3}
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309] resize-none" />
        </div>

        <h2 className="text-sm font-bold text-[#0a2b4a] mb-3 mt-4">Contact</h2>
        <Input label="Mobile" field="mobileNumber" type="tel" placeholder="Mobile number" icon={Phone} />
        <Input label="WhatsApp" field="whatsappNumber" type="tel" placeholder="WhatsApp number" icon={Phone} />
        <Input label="Email" field="email" type="email" placeholder="Email address" icon={Mail} />
        <Input label="Website" field="website" placeholder="Website URL" icon={Globe} />
        <Input label="Address" field="address" placeholder="Business address" icon={MapPin} />
        <Input label="Google Map" field="googleMapLink" placeholder="Google Maps link" icon={MapPin} />
        <Input label="UPI ID" field="upiId" placeholder="UPI ID for payments" icon={CreditCard} />

        <h2 className="text-sm font-bold text-[#0a2b4a] mb-3 mt-4">Social Media</h2>
        <Input label="Facebook" field="facebook" placeholder="Facebook URL" icon={Globe} />
        <Input label="Instagram" field="instagram" placeholder="Instagram URL" icon={Globe} />
        <Input label="LinkedIn" field="linkedin" placeholder="LinkedIn URL" icon={Globe} />

        <h2 className="text-sm font-bold text-[#0a2b4a] mb-3 mt-4">Services</h2>
        {services.map((s, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={s} onChange={(e) => { const ns = [...services]; ns[i] = e.target.value; setServices(ns); }}
              placeholder={`Service ${i + 1}`} className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309]" />
            {services.length > 1 && <button onClick={() => setServices(services.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-xs px-2">Remove</button>}
          </div>
        ))}
        <button onClick={() => setServices([...services, ""])} className="text-[13px] text-[#ff8309] font-medium hover:underline">+ Add Service</button>

        <div className="pt-4">
          <button onClick={handleSave} disabled={updateCard.isPending}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#0a2b4a] to-[#103558] text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all disabled:opacity-50">
            <Check size={14} /> {updateCard.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {updateCard.isError && <p className="text-red-500 text-xs text-center mt-2">Error saving. Try again.</p>}
      </div>
    </div>
  );
}
