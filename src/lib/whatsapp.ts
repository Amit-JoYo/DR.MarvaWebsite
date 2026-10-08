const WHATSAPP_NUMBER = "972542167787";

export const CLINIC_PHONE_DISPLAY = "+972 54-216-7787";
export const CLINIC_PHONE_TEL = `+${WHATSAPP_NUMBER}`;

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
