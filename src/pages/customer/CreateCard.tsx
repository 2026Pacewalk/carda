import { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  Building2, User, Phone, Mail, Globe, MapPin, Share2,
  CreditCard, Palette, ChevronRight, ChevronLeft, Check,
  FileText, MessageCircle, Image, QrCode
} from "lucide-react";

const steps = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Contact", icon: Phone },
  { id: 3, label: "Social", icon: Share2 },
  { id: 4, label: "Media", icon: Image },
  { id: 5, label: "Preview", icon: FileText },
];

export default function CustomerCreateCard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Record<string, string>>({
    businessName: "", ownerName: "", designation: "", aboutBusiness: "",
    mobileNumber: "", whatsappNumber: "", email: "", website: "", address: "", googleMapLink: "",
    facebook: "", instagram: "", linkedin: "", twitter: "", youtube: "",
    upiId: "",
    logoUrl: "", profilePhotoUrl: "",
  });
  const [servicesText, setServicesText] = useState("");

  const createCard = trpc.customer.createCard.useMutation({
    onSuccess: (data) => navigate(`/customer/my-cards/${data.id}/edit`),
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = () => {
    const servicesList = servicesText.split(",").map((s) => s.trim()).filter(Boolean);
    createCard.mutate({
      businessName: form.businessName,
      ownerName: form.ownerName,
      designation: form.designation,
      aboutBusiness: form.aboutBusiness,
      mobileNumber: form.mobileNumber,
      whatsappNumber: form.whatsappNumber,
      email: form.email,
      website: form.website,
      address: form.address,
      googleMapLink: form.googleMapLink,
      facebook: form.facebook,
      instagram: form.instagram,
      linkedin: form.linkedin,
      twitter: form.twitter,
      youtube: form.youtube,
      upiId: form.upiId,
      logoUrl: form.logoUrl,
      profilePhotoUrl: form.profilePhotoUrl,
      servicesList,
    });
  };

  const Field = ({ label, field, placeholder, type = "text", icon: Icon }: any) => (
    <div>
      <label className="block text-[13px] font-bold text-[#0a2b4a] mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />}
        <input type={type} value={form[field] || ""} onChange={(e) => update(field, e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309] transition-all`} />
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#0a2b4a]">Create PDF Card</h1>
        <p className="text-xs text-[#888] mt-0.5">Step {step} of 5: {steps[step - 1].label}</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-1">
        {steps.map((s) => (
          <button key={s.id} onClick={() => setStep(s.id)} className={`flex-1 flex items-center gap-1.5 px-2 py-2 rounded-lg text-[12px] font-bold transition-all ${step === s.id ? "bg-[#ff8309] text-white" : step > s.id ? "bg-green-100 text-green-700" : "bg-gray-100 text-[#888]"}`}>
            <s.icon size={12} /> {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0a2b4a] flex items-center gap-2"><Building2 size={16} className="text-[#ff8309]" /> Business Information</h3>
            <Field label="Business Name *" field="businessName" placeholder="Your Company Name" icon={Building2} />
            <Field label="Your Full Name *" field="ownerName" placeholder="John Doe" icon={User} />
            <Field label="Designation" field="designation" placeholder="CEO / Manager" icon={User} />
            <div>
              <label className="block text-[13px] font-bold text-[#0a2b4a] mb-1">About Business</label>
              <textarea value={form.aboutBusiness} onChange={(e) => update("aboutBusiness", e.target.value)}
                rows={3} placeholder="Brief description of your business"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309] transition-all resize-none" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0a2b4a] flex items-center gap-2"><Phone size={16} className="text-[#ff8309]" /> Contact Details</h3>
            <Field label="Mobile Number *" field="mobileNumber" placeholder="+91 98765 43210" icon={Phone} />
            <Field label="WhatsApp Number" field="whatsappNumber" placeholder="+91 98765 43210" icon={MessageCircle} />
            <Field label="Email" field="email" placeholder="you@company.com" icon={Mail} />
            <Field label="Website" field="website" placeholder="https://yourwebsite.com" icon={Globe} />
            <Field label="Address" field="address" placeholder="Your business address" icon={MapPin} />
            <Field label="Google Map Link" field="googleMapLink" placeholder="https://maps.google.com/..." icon={MapPin} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0a2b4a] flex items-center gap-2"><Share2 size={16} className="text-[#ff8309]" /> Social Media Links</h3>
            <Field label="Facebook" field="facebook" placeholder="https://facebook.com/yourpage" icon={Share2} />
            <Field label="Instagram" field="instagram" placeholder="https://instagram.com/yourhandle" icon={Share2} />
            <Field label="LinkedIn" field="linkedin" placeholder="https://linkedin.com/in/you" icon={Share2} />
            <Field label="Twitter" field="twitter" placeholder="https://twitter.com/you" icon={Share2} />
            <Field label="YouTube" field="youtube" placeholder="https://youtube.com/c/you" icon={Share2} />
            <Field label="UPI ID for Payments" field="upiId" placeholder="yourname@upi" icon={QrCode} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0a2b4a] flex items-center gap-2"><Image size={16} className="text-[#ff8309]" /> Media & Services</h3>
            <Field label="Logo URL" field="logoUrl" placeholder="https://example.com/logo.png" icon={Image} />
            <Field label="Profile Photo URL" field="profilePhotoUrl" placeholder="https://example.com/photo.jpg" icon={User} />
            <div>
              <label className="block text-[13px] font-bold text-[#0a2b4a] mb-1">Services (comma separated)</label>
              <textarea value={servicesText} onChange={(e) => setServicesText(e.target.value)}
                rows={3} placeholder="Web Design, SEO, Marketing"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff8309] transition-all resize-none" />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0a2b4a] flex items-center gap-2"><FileText size={16} className="text-[#ff8309]" /> Preview</h3>

            {/* Card Preview */}
            <div className="w-full max-w-xs mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-[28px] p-2 shadow-xl">
              <div className="bg-white rounded-[22px] overflow-hidden">
                <div className="bg-gradient-to-br from-[#0a2b4a] to-[#103558] p-5 text-center">
                  {form.logoUrl ? (
                    <img src={form.logoUrl} alt="" className="w-16 h-16 rounded-full mx-auto mb-2 object-cover bg-white/10" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold">
                      {form.businessName?.charAt(0) || "C"}
                    </div>
                  )}
                  <h3 className="text-white font-bold text-sm">{form.businessName || "Business Name"}</h3>
                  <p className="text-white/60 text-[12px]">{form.ownerName}</p>
                  {form.designation && <p className="text-[#ff8309] text-[12px]">{form.designation}</p>}
                </div>
                <div className="p-3 space-y-1.5">
                  {form.mobileNumber && <p className="text-[12px] text-[#555] flex items-center gap-1"><Phone size={9} className="text-[#ff8309]" /> {form.mobileNumber}</p>}
                  {form.email && <p className="text-[12px] text-[#555] flex items-center gap-1"><Mail size={9} className="text-[#ff8309]" /> {form.email}</p>}
                  {form.website && <p className="text-[12px] text-[#555] flex items-center gap-1"><Globe size={9} className="text-[#ff8309]" /> {form.website}</p>}
                  {form.address && <p className="text-[12px] text-[#555] flex items-center gap-1"><MapPin size={9} className="text-[#ff8309]" /> {form.address}</p>}
                  {form.upiId && <p className="text-[12px] text-[#555] flex items-center gap-1"><QrCode size={9} className="text-[#ff8309]" /> UPI: {form.upiId}</p>}
                  {form.whatsappNumber && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <a href={`tel:${form.mobileNumber}`} className="bg-[#0a2b4a] text-white text-[11px] font-bold py-1.5 rounded-lg text-center flex items-center justify-center gap-1"><Phone size={8} /> CALL</a>
                      <a href={`https://wa.me/${form.whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-[11px] font-bold py-1.5 rounded-lg text-center flex items-center justify-center gap-1"><MessageCircle size={8} /> WHATSAPP</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#f8f7f7] rounded-xl p-3 text-[13px] text-[#555]">
              <p className="font-bold text-[#0a2b4a] mb-1">Card Summary:</p>
              {form.businessName && <p>Business: {form.businessName}</p>}
              {form.ownerName && <p>Owner: {form.ownerName}</p>}
              {form.mobileNumber && <p>Mobile: {form.mobileNumber}</p>}
              {form.email && <p>Email: {form.email}</p>}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-5 pt-4 border-t border-gray-100">
          <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-[#0a2b4a] hover:border-[#ff8309] disabled:opacity-30 transition-all">
            <ChevronLeft size={14} /> Back
          </button>
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#ff8309] text-white rounded-xl text-xs font-bold hover:bg-[#e57400] transition-all">
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!form.businessName || !form.ownerName || createCard.isPending}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0a2b4a] text-white rounded-xl text-xs font-bold hover:bg-[#103558] disabled:opacity-50 transition-all">
              <Check size={14} /> {createCard.isPending ? "Creating..." : "Create Card"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
