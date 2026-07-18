import { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  Building2, User, Phone, Mail, Globe, MapPin, CreditCard,
  Share2, Check, ChevronRight, ChevronLeft, Palette, FileText
} from "lucide-react";

const steps = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Contact Details", icon: Phone },
  { id: 3, label: "Social Links", icon: Share2 },
  { id: 4, label: "Template", icon: Palette },
  { id: 5, label: "Preview", icon: FileText },
];

const socialFields = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/you" },
  { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/you" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/c/yourchannel" },
];

export default function CardBuilder() {
  const navigate = useNavigate();
  const createCard = trpc.card.createCard.useMutation({
    onSuccess: (data) => navigate(`/dashboard/cards/${data.id}`),
  });
  const { data: templates } = trpc.card.listTemplates.useQuery({});

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    businessName: "", ownerName: "", designation: "", aboutBusiness: "",
    mobileNumber: "", whatsappNumber: "", email: "", website: "",
    address: "", googleMapLink: "", upiId: "",
    facebook: "", instagram: "", linkedin: "", twitter: "", youtube: "",
    servicesList: [""], templateId: undefined as number | undefined,
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const addService = () => setForm((f) => ({ ...f, servicesList: [...f.servicesList, ""] }));
  const updateService = (i: number, v: string) => {
    const s = [...form.servicesList];
    s[i] = v;
    setForm((f) => ({ ...f, servicesList: s }));
  };
  const removeService = (i: number) => setForm((f) => ({ ...f, servicesList: f.servicesList.filter((_, j) => j !== i) }));

  const handleSubmit = () => {
    createCard.mutate({
      templateId: form.templateId,
      businessName: form.businessName || undefined,
      ownerName: form.ownerName || undefined,
      designation: form.designation || undefined,
      aboutBusiness: form.aboutBusiness || undefined,
      mobileNumber: form.mobileNumber || undefined,
      whatsappNumber: form.whatsappNumber || undefined,
      email: form.email || undefined,
      website: form.website || undefined,
      address: form.address || undefined,
      googleMapLink: form.googleMapLink || undefined,
      upiId: form.upiId || undefined,
      facebook: form.facebook || undefined,
      instagram: form.instagram || undefined,
      linkedin: form.linkedin || undefined,
      twitter: form.twitter || undefined,
      youtube: form.youtube || undefined,
      servicesList: form.servicesList.filter(Boolean),
    });
  };

  const Input = ({ label, field, type = "text", placeholder, icon: Icon }: { label: string, field: string, type?: string, placeholder: string, icon: any }) => (
    <div className="mb-3">
      <label className="text-[13px] font-bold text-[#0a2b4a] mb-1 flex items-center gap-1">
        {Icon && <Icon size={12} className="text-[#ff8309]" />} {label}
      </label>
      <input
        type={type}
        value={(form as any)[field]}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309] focus:ring-1 focus:ring-[#ff8309]/20 transition-all"
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-extrabold text-[#0a2b4a] mb-1">Create PDF Card</h1>
      <p className="text-[#888] text-sm mb-5">Step {step} of 5: {steps[step - 1].label}</p>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-6">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0 ${
              step > s.id ? "bg-green-500 text-white" :
              step === s.id ? "bg-[#ff8309] text-white" : "bg-gray-200 text-[#888]"
            }`}>
              {step > s.id ? <Check size={12} /> : s.id}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${step > s.id ? "bg-green-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Business Info */}
      {step === 1 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-[#0a2b4a] mb-4">Business Information</h2>
          <Input label="Business Name" field="businessName" placeholder="e.g., MyCarda Solutions" icon={Building2} />
          <Input label="Owner Name" field="ownerName" placeholder="e.g., Rahul Sharma" icon={User} />
          <Input label="Designation" field="designation" placeholder="e.g., Founder & CEO" icon={User} />
          <div className="mb-3">
            <label className="text-[13px] font-bold text-[#0a2b4a] mb-1 block">About Business</label>
            <textarea
              value={form.aboutBusiness}
              onChange={(e) => update("aboutBusiness", e.target.value)}
              placeholder="Brief description of your business..."
              rows={3}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309] focus:ring-1 focus:ring-[#ff8309]/20 transition-all resize-none"
            />
          </div>
          {/* Services */}
          <div className="mb-3">
            <label className="text-[13px] font-bold text-[#0a2b4a] mb-1 block">Services</label>
            {form.servicesList.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={s}
                  onChange={(e) => updateService(i, e.target.value)}
                  placeholder={`Service ${i + 1}`}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ff8309]"
                />
                {form.servicesList.length > 1 && (
                  <button onClick={() => removeService(i)} className="text-red-400 hover:text-red-600 text-xs px-2">Remove</button>
                )}
              </div>
            ))}
            <button onClick={addService} className="text-[13px] text-[#ff8309] font-medium hover:underline">+ Add Service</button>
          </div>
        </div>
      )}

      {/* Step 2: Contact */}
      {step === 2 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-[#0a2b4a] mb-4">Contact Details</h2>
          <Input label="Mobile Number" field="mobileNumber" type="tel" placeholder="+91 98765 43210" icon={Phone} />
          <Input label="WhatsApp Number" field="whatsappNumber" type="tel" placeholder="+91 98765 43210" icon={Phone} />
          <Input label="Email" field="email" type="email" placeholder="you@business.com" icon={Mail} />
          <Input label="Website" field="website" placeholder="https://yourbusiness.com" icon={Globe} />
          <Input label="Address" field="address" placeholder="Full business address" icon={MapPin} />
          <Input label="Google Map Link" field="googleMapLink" placeholder="https://maps.google.com/..." icon={MapPin} />
          <Input label="UPI ID (for payments)" field="upiId" placeholder="yourname@upi" icon={CreditCard} />
        </div>
      )}

      {/* Step 3: Social */}
      {step === 3 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-[#0a2b4a] mb-4">Social Media Links (Optional)</h2>
          {socialFields.map((s) => (
            <Input key={s.key} label={s.label} field={s.key} placeholder={s.placeholder} icon={Share2} />
          ))}
        </div>
      )}

      {/* Step 4: Template */}
      {step === 4 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-[#0a2b4a] mb-4">Choose Template</h2>
          <div className="grid grid-cols-2 gap-3">
            {templates?.map((t) => (
              <button
                key={t.id}
                onClick={() => setForm((f) => ({ ...f, templateId: t.id }))}
                className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                  form.templateId === t.id ? "border-[#ff8309] ring-2 ring-[#ff8309]/20" : "border-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-[#0a2b4a] to-[#103558] flex items-center justify-center">
                  <Palette size={24} className="text-white/40" />
                </div>
                <div className="p-2 text-center">
                  <p className="text-xs font-bold text-[#0a2b4a]">{t.name}</p>
                  <p className="text-[12px] text-[#888] capitalize">{t.category} &middot; {t.minPackage}</p>
                </div>
                {form.templateId === t.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#ff8309] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Preview */}
      {step === 5 && (
        <div className="space-y-4">
          {/* Card Preview */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h2 className="text-sm font-bold text-[#0a2b4a] mb-4">Preview</h2>
            <div className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] rounded-xl p-6 text-white max-w-sm mx-auto">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#ff8309] mx-auto mb-2 flex items-center justify-center text-xl font-bold">
                  {(form.ownerName || form.businessName || "?").charAt(0)}
                </div>
                <h3 className="font-bold text-sm">{form.ownerName || "Your Name"}</h3>
                <p className="text-white/50 text-[12px]">{form.designation || "Designation"}</p>
                {form.businessName && <p className="text-[#ff8309] text-[12px] font-bold mt-1">{form.businessName}</p>}
              </div>
              <div className="space-y-1.5">
                {form.mobileNumber && <p className="text-[12px] text-white/70 flex items-center gap-1"><Phone size={10} /> {form.mobileNumber}</p>}
                {form.whatsappNumber && <p className="text-[12px] text-white/70 flex items-center gap-1"><Phone size={10} /> WhatsApp: {form.whatsappNumber}</p>}
                {form.email && <p className="text-[12px] text-white/70 flex items-center gap-1"><Mail size={10} /> {form.email}</p>}
                {form.website && <p className="text-[12px] text-white/70 flex items-center gap-1"><Globe size={10} /> {form.website}</p>}
                {form.address && <p className="text-[12px] text-white/70 flex items-center gap-1"><MapPin size={10} /> {form.address}</p>}
                {form.upiId && <p className="text-[12px] text-white/70 flex items-center gap-1"><CreditCard size={10} /> UPI: {form.upiId}</p>}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-[#0a2b4a] mb-3">Details Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              {Object.entries({
                "Business": form.businessName || "-",
                "Owner": form.ownerName || "-",
                "Designation": form.designation || "-",
                "Mobile": form.mobileNumber || "-",
                "Email": form.email || "-",
                "Website": form.website || "-",
              }).map(([k, v]) => (
                <div key={k}><span className="text-[#888]">{k}:</span> <span className="text-[#0a2b4a] font-medium">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            step === 1 ? "text-gray-300 cursor-not-allowed" : "text-[#0a2b4a] bg-white border border-gray-200 hover:border-[#ff8309]"
          }`}
        >
          <ChevronLeft size={14} /> Previous
        </button>

        {step < 5 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-1 px-5 py-2.5 bg-[#ff8309] text-white rounded-xl text-xs font-bold hover:bg-[#e57400] transition-all"
          >
            Next <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={createCard.isPending}
            className="flex items-center gap-1 px-5 py-2.5 bg-gradient-to-r from-[#0a2b4a] to-[#103558] text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {createCard.isPending ? "Creating..." : "Create PDF Card"} <Check size={14} />
          </button>
        )}
      </div>

      {createCard.isError && (
        <p className="text-red-500 text-xs mt-3 text-center">Error creating card. Please try again.</p>
      )}
    </div>
  );
}
