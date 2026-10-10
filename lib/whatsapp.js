import { COMPANY_DETAILS } from "../constants/contactInfo";

export const WHATSAPP_PREFILL = "Hi Ideate X, I'd like to talk about a project.";

// Digits only, with country code (wa.me format). Prefers a dedicated settings.whatsapp number,
// otherwise the first phone number configured for the Contact page.
export function getWhatsAppNumber(settings) {
  const phones = settings?.phones?.length ? settings.phones : COMPANY_DETAILS.phones;
  const source = settings?.whatsapp || phones?.[0]?.raw || phones?.[0]?.display || "";
  return String(source).replace(/\D/g, "");
}

export function getWhatsAppHref(settings, text = WHATSAPP_PREFILL) {
  const number = getWhatsAppNumber(settings);
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : "";
}
