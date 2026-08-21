import { WHATSAPP_NUMBER } from "./constants";

export const WHATSAPP_TEMPLATES = {
  GENERAL: "Hello Karuna Travels, I would like to know more about your services.",
  CAR: (carName: string) => `Hello, I'm interested in booking the ${carName}. Please share availability and details.`,
  PACKAGE: (packageName: string) => `Hello, I want to book the ${packageName} tour package. Please share the itinerary and cost.`,
  CONTACT: "Hi, I have a query regarding a booking.",
};

export function buildWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
