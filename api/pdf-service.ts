import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { PdfCard } from "@db/schema";

export async function generatePDFCard(card: PdfCard): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 700]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Background
  page.drawRectangle({
    x: 0, y: 0, width, height,
    color: rgb(0.04, 0.17, 0.29),
  });

  // Header gradient area
  page.drawRectangle({
    x: 0, y: height - 200, width, height: 200,
    color: rgb(0.04, 0.17, 0.29),
  });

  // Orange accent bar
  page.drawRectangle({
    x: 0, y: height - 4, width, height: 4,
    color: rgb(1, 0.51, 0.04),
  });

  let y = height - 40;

  // Business Name
  if (card.businessName) {
    page.drawText(card.businessName, {
      x: 30, y,
      size: 22,
      font: fontBold,
      color: rgb(1, 1, 1),
    });
    y -= 28;
  }

  // Owner Name
  if (card.ownerName) {
    page.drawText(card.ownerName, {
      x: 30, y,
      size: 16,
      font,
      color: rgb(1, 0.51, 0.04),
    });
    y -= 24;
  }

  // Designation
  if (card.designation) {
    page.drawText(card.designation, {
      x: 30, y,
      size: 12,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });
    y -= 35;
  }

  // Divider
  page.drawLine({ start: { x: 30, y }, end: { x: width - 30, y }, thickness: 1, color: rgb(0.2, 0.3, 0.4) });
  y -= 25;

  // Contact Info Section
  const contactItems = [
    card.mobileNumber && { icon: "\u260E", text: card.mobileNumber, link: `tel:${card.mobileNumber}` },
    card.whatsappNumber && { icon: "WA", text: card.whatsappNumber, link: `https://wa.me/${card.whatsappNumber.replace(/\D/g, "")}` },
    card.email && { icon: "\u2709", text: card.email, link: `mailto:${card.email}` },
    card.website && { icon: "\u2601", text: card.website, link: card.website },
    card.address && { icon: "\u25A0", text: card.address },
  ].filter(Boolean) as { icon: string; text: string; link?: string }[];

  for (const item of contactItems) {
    if (item.link) {
      page.drawText(item.text, {
        x: 30, y,
        size: 11,
        font,
        color: rgb(1, 0.51, 0.04),
      });
    } else {
      page.drawText(item.text, {
        x: 30, y,
        size: 11,
        font,
        color: rgb(0.8, 0.8, 0.8),
      });
    }
    y -= 22;
  }

  y -= 15;

  // Social Links
  const socials = [
    card.facebook && { label: "Facebook", url: card.facebook },
    card.instagram && { label: "Instagram", url: card.instagram },
    card.linkedin && { label: "LinkedIn", url: card.linkedin },
    card.youtube && { label: "YouTube", url: card.youtube },
  ].filter(Boolean) as { label: string; url: string }[];

  if (socials.length > 0) {
    page.drawText("Social Links", { x: 30, y, size: 14, font: fontBold, color: rgb(1, 1, 1) });
    y -= 20;
    for (const social of socials) {
      page.drawText(social.label + ": " + social.url, {
        x: 30, y, size: 10, font, color: rgb(0.6, 0.7, 0.8),
      });
      y -= 18;
    }
    y -= 15;
  }

  // Services
  if (card.servicesList && card.servicesList.length > 0) {
    page.drawText("Services", { x: 30, y, size: 14, font: fontBold, color: rgb(1, 1, 1) });
    y -= 20;
    for (const service of card.servicesList) {
      page.drawText("\u2022 " + service, {
        x: 30, y, size: 10, font, color: rgb(0.8, 0.8, 0.8),
      });
      y -= 18;
    }
    y -= 15;
  }

  // Payment UPI
  if (card.upiId) {
    page.drawRectangle({
      x: 20, y: y - 50, width: width - 40, height: 50,
      color: rgb(0.06, 0.2, 0.35),
      borderColor: rgb(1, 0.51, 0.04),
      borderWidth: 1,
    });
    page.drawText("UPI Payment", { x: 30, y: y - 18, size: 11, font: fontBold, color: rgb(1, 1, 1) });
    page.drawText(card.upiId, { x: 30, y: y - 35, size: 13, font: fontBold, color: rgb(1, 0.51, 0.04) });
    y -= 70;
  }

  // Footer
  page.drawText("Powered by MyCarda | PDF Digital Business Card", {
    x: 30, y: 30, size: 8, font, color: rgb(0.4, 0.4, 0.4),
  });

  return pdfDoc.save();
}
