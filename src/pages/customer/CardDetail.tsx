import { useParams, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { Phone, Mail, Globe, MapPin, Share2, MessageCircle, QrCode, Download, Edit, ArrowLeft } from "lucide-react";

export default function CustomerCardDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: card, isLoading } = trpc.customer.getCard.useQuery({ id: Number(id) });

  if (isLoading) return <div className="text-center py-12 text-[#888]">Loading...</div>;
  if (!card) return <div className="text-center py-12 text-[#888]">Card not found</div>;

  const socials = [
    { label: "Facebook", url: card.facebook, color: "bg-blue-600" },
    { label: "Instagram", url: card.instagram, color: "bg-pink-600" },
    { label: "LinkedIn", url: card.linkedin, color: "bg-blue-700" },
    { label: "Twitter", url: card.twitter, color: "bg-sky-500" },
    { label: "YouTube", url: card.youtube, color: "bg-red-600" },
  ].filter((s): s is { label: string; url: string; color: string } => !!s.url);

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/customer/my-cards" className="p-2 bg-white rounded-lg border border-gray-100 hover:bg-[#f8f7f7]"><ArrowLeft size={16} className="text-[#0a2b4a]" /></Link>
        <div>
          <h1 className="text-lg font-extrabold text-[#0a2b4a]">{card.businessName || "My Card"}</h1>
          <p className="text-[10px] text-[#888]">{card.ownerName} • {card.status}</p>
        </div>
        <Link to={`/customer/my-cards/${card.id}/edit`} className="ml-auto p-2 bg-[#ff8309]/10 rounded-lg hover:bg-[#ff8309] group transition-all">
          <Edit size={14} className="text-[#ff8309] group-hover:text-white" />
        </Link>
      </div>

      {/* Phone Preview */}
      <div className="w-full max-w-xs mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-[32px] p-2 shadow-xl">
        <div className="bg-white rounded-[24px] overflow-hidden">
          <div className="bg-gradient-to-br from-[#0a2b4a] to-[#103558] p-5 text-center">
            {card.logoUrl ? (
              <img src={card.logoUrl} alt="" className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            ) : (
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-2xl font-bold">{card.businessName?.charAt(0) || "C"}</div>
            )}
            <h3 className="text-white font-bold text-sm">{card.businessName || "Business Name"}</h3>
            <p className="text-white/60 text-[10px]">{card.ownerName}</p>
            {card.designation && <p className="text-[#ff8309] text-[10px] mt-0.5">{card.designation}</p>}
          </div>
          <div className="p-4 space-y-2">
            {card.mobileNumber && <a href={`tel:${card.mobileNumber}`} className="flex items-center gap-2 text-[11px] text-[#555] hover:text-[#ff8309]"><Phone size={11} className="text-[#ff8309]" /> {card.mobileNumber}</a>}
            {card.whatsappNumber && <a href={`https://wa.me/${card.whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] text-[#555] hover:text-green-600"><MessageCircle size={11} className="text-green-500" /> {card.whatsappNumber}</a>}
            {card.email && <a href={`mailto:${card.email}`} className="flex items-center gap-2 text-[11px] text-[#555] hover:text-[#ff8309]"><Mail size={11} className="text-[#ff8309]" /> {card.email}</a>}
            {card.website && <a href={card.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] text-[#555] hover:text-[#ff8309]"><Globe size={11} className="text-[#ff8309]" /> {card.website}</a>}
            {card.address && <p className="flex items-center gap-2 text-[11px] text-[#555]"><MapPin size={11} className="text-[#ff8309]" /> {card.address}</p>}
            {card.upiId && <p className="flex items-center gap-2 text-[11px] text-[#555]"><QrCode size={11} className="text-[#ff8309]" /> UPI: {card.upiId}</p>}

            {card.aboutBusiness && <p className="text-[10px] text-[#888] pt-2 border-t">{card.aboutBusiness}</p>}

            {socials.length > 0 && (
              <div className="flex gap-2 pt-2 border-t justify-center">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className={`${s.color} text-white text-[8px] font-bold px-2 py-1 rounded-full`}>{s.label}</a>
                ))}
              </div>
            )}

            {card.mobileNumber && (
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t">
                <a href={`tel:${card.mobileNumber}`} className="bg-[#0a2b4a] text-white text-[10px] font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1"><Phone size={10} /> CALL</a>
                <a href={`https://wa.me/${card.whatsappNumber?.replace(/\D/g, "") || card.mobileNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-[10px] font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1"><MessageCircle size={10} /> WHATSAPP</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link to={`/customer/my-cards/${card.id}/edit`} className="flex-1 btn-orange text-xs text-center flex items-center justify-center gap-1.5"><Edit size={12} /> Edit Card</Link>
        <button className="flex-1 btn-dark text-xs flex items-center justify-center gap-1.5"><Download size={12} /> Download PDF</button>
      </div>
    </div>
  );
}
