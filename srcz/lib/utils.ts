import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidJSON = (data: any) => {
  try {
    if (typeof data !== "string") {
      return false;
    }

    // Thử parse data
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
};