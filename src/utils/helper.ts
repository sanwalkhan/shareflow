// src/utils/helpers.ts

// Format currency function
export const formatCurrency = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) return "$0";
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};