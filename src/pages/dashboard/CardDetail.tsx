import { useParams, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { Download, Share2, Edit, ArrowLeft, Phone, Mail, Globe, MapPin, CreditCard, MessageCircle } from "lucide-react";

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const cardId = Number(id);
  const { data: card, isLoading } = trpc.card.getCard.useQuery({ id: cardId });
  const incrementDownload = trpc.card.incrementDownload.useMutation();

  if (isLoading) return <div className="text-center py-12 text-[#888]">Loading card...</div>;
  if (!card) return (
    <div className="text-center py-12">
      <p className="text-[#888] mb-3">Card not found</p>
      <Link to="/dashboard/cards" className="text-[#ff8309] text-sm hover:underline">Back to cards</Link>
    </div>
  );

  const handleDownload = () => {
    incrementDownload.mutate({ id: cardId });
    // Generate a simple PDF-like HTML and trigger download
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${card.ownerName ?? card.businessName ?? "Business Card"}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#0a2b4a,#08223b);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:rgba(255,255,255,0.05);border-radius:20px;padding:40px;max-width:400px;width:100%;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1)}
.avatar{width:80px;height:80px;border-radius:50%;background:#ff8309;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold;margin:0 auto 15px}
.name{text-align:center;font-size:20px;font-weight:bold;margin-bottom:5px}
.designation{text-align:center;color:rgba(255,255,255,0.5);font-size:13px;margin-bottom:3px}
.business{text-align:center;color:#ff8309;font-size:12px;font-weight:bold;margin-bottom:20px}
.about{color:rgba(255,255,255,0.7);font-size:12px;text-align:center;margin-bottom:20px;line-height:1.6}
.links{display:flex;flex-direction:column;gap:8px}
.links a{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.8);text-decoration:none;font-size:12px;padding:8px 12px;background:rgba(255,255,255,0.05);border-radius:8px;transition:background 0.2s}
.links a:hover{background:rgba(255,255,255,0.1)}
.links svg{width:14px;height:14px;flex-shrink:0}
.services{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-bottom:20px}
.service{background:rgba(255,131,9,0.15);color:#ff8309;padding:3px 10px;border-radius:12px;font-size:10px;font-weight:bold}
.footer{text-align:center;margin-top:20px;padding-top:15px;border-top:1px solid rgba(255,255,255,0.1)}
.footer p{font-size:10px;color:rgba(255,255,255,0.3)}
</style>
</head>
<body>
<div class="card">
  <div class="avatar">${(card.ownerName ?? card.businessName ?? "?").charAt(0)}</div>
  <div class="name">${card.ownerName ?? "Your Name"}</div>
  ${card.designation ? `<div class="designation">${card.designation}</div>` : ""}
  ${card.businessName ? `<div class="business">${card.businessName}</div>` : ""}
  ${card.aboutBusiness ? `<div class="about">${card.aboutBusiness}</div>` : ""}
  ${card.servicesList && (card.servicesList as string[]).length > 0 ? `<div class="services">${(card.servicesList as string[]).map((s: string) => `<span class="service">${s}</span>`).join("")}</div>` : ""}
  <div class="links">
    ${card.mobileNumber ? `<a href="tel:${card.mobileNumber}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> ${card.mobileNumber}</a>` : ""}
    ${card.whatsappNumber ? `<a href="https://wa.me/${card.whatsappNumber.replace(/\\D/g, "")}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg> WhatsApp</a>` : ""}
    ${card.email ? `<a href="mailto:${card.email}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> ${card.email}</a>` : ""}
    ${card.website ? `<a href="${card.website}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg> Website</a>` : ""}
    ${card.address ? `<a href="${card.googleMapLink ?? "#"}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> ${card.address}</a>` : ""}
    ${card.upiId ? `<a href="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Pay: ${card.upiId}</a>` : ""}
  </div>
  <div class="footer">
    <p>Created with MyCarda - PDF Digital Business Card</p>
    <p>https://mycarda.com</p>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(card.ownerName ?? card.businessName ?? "card").replace(/\s+/g, "_")}_business_card.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/cards" className="text-[#888] hover:text-[#0a2b4a]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-extrabold text-[#0a2b4a]">Card Details</h1>
      </div>

      {/* Card Preview */}
      <div className="bg-gradient-to-br from-[#0a2b4a] to-[#08223b] rounded-2xl p-6 text-white shadow-xl">
        <div className="text-center mb-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff8309] to-[#e57400] mx-auto mb-3 flex items-center justify-center text-2xl font-bold shadow-lg">
            {(card.ownerName ?? card.businessName ?? "?").charAt(0)}
          </div>
          <h2 className="text-lg font-bold">{card.ownerName ?? "Your Name"}</h2>
          {card.designation && <p className="text-white/50 text-xs mt-0.5">{card.designation}</p>}
          {card.businessName && <p className="text-[#ff8309] text-xs font-bold mt-1">{card.businessName}</p>}
        </div>

        {card.aboutBusiness && <p className="text-white/60 text-xs text-center mb-4 leading-relaxed">{card.aboutBusiness}</p>}

        {/* Services */}
        {card.servicesList && (card.servicesList as string[]).length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mb-4">
            {(card.servicesList as string[]).map((s: string, i: number) => (
              <span key={i} className="bg-[#ff8309]/15 text-[#ff8309] px-2.5 py-0.5 rounded-full text-[12px] font-bold">{s}</span>
            ))}
          </div>
        )}

        {/* Contact Links */}
        <div className="space-y-2">
          {card.mobileNumber && (
            <a href={`tel:${card.mobileNumber}`} className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all">
              <Phone size={14} className="text-[#ff8309]" /> {card.mobileNumber}
            </a>
          )}
          {card.whatsappNumber && (
            <a href={`https://wa.me/${card.whatsappNumber.replace(/\D/g, "")}`} target="_blank" className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all">
              <MessageCircle size={14} className="text-green-400" /> WhatsApp
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all">
              <Mail size={14} className="text-[#ff8309]" /> {card.email}
            </a>
          )}
          {card.website && (
            <a href={card.website} target="_blank" className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all">
              <Globe size={14} className="text-[#ff8309]" /> {card.website}
            </a>
          )}
          {card.address && (
            <a href={card.googleMapLink ?? "#"} target="_blank" className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all">
              <MapPin size={14} className="text-red-400" /> {card.address}
            </a>
          )}
          {card.upiId && (
            <div className="flex items-center gap-2.5 text-xs text-white/80 bg-white/5 p-2.5 rounded-xl">
              <CreditCard size={14} className="text-[#ff8309]" /> Pay: {card.upiId}
            </div>
          )}
        </div>

        {/* Social */}
        {(card.facebook || card.instagram || card.linkedin || card.twitter || card.youtube) && (
          <div className="flex gap-3 justify-center mt-4 pt-4 border-t border-white/10">
            {card.facebook && <a href={card.facebook} target="_blank" className="text-white/40 hover:text-white transition-colors text-xs">Facebook</a>}
            {card.instagram && <a href={card.instagram} target="_blank" className="text-white/40 hover:text-white transition-colors text-xs">Instagram</a>}
            {card.linkedin && <a href={card.linkedin} target="_blank" className="text-white/40 hover:text-white transition-colors text-xs">LinkedIn</a>}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#0a2b4a] to-[#103558] text-white rounded-xl text-xs font-bold hover:shadow-lg transition-all">
          <Download size={14} /> Download PDF
        </button>
        <Link to={`/dashboard/cards/${card.id}/edit`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-[#0a2b4a] rounded-xl text-xs font-bold hover:border-[#ff8309] transition-all">
          <Edit size={14} /> Edit Card
        </Link>
        <button onClick={() => {
          const text = `Check out my digital business card: ${window.location.origin}/dashboard/cards/${card.id}`;
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
        }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600 transition-all">
          <Share2 size={14} /> Share
        </button>
      </div>

      {/* Details Table */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <h3 className="text-xs font-bold text-[#0a2b4a] mb-3">All Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
          {[
            ["Status", card.status],
            ["Downloads", String(card.downloadCount ?? 0)],
            ["Created", new Date(card.createdAt).toLocaleDateString()],
            ["Updated", new Date(card.updatedAt).toLocaleDateString()],
          ].map(([k, v]) => (
            <div key={k}><span className="text-[#888]">{k}:</span> <span className="text-[#0a2b4a] font-medium">{v}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
