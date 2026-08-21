import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function truncateText(text: string, maxLength: number = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
