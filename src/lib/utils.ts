import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

/** Compact Indian notation: 1.2 Cr, 45.0 L, 8,500 */
export function inrShort(amount: number) {
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(amount >= 1e9 ? 0 : 1)} Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1)} L`;
  return inr(amount);
}
