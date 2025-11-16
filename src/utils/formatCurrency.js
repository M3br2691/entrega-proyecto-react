// src/utils/formatCurrency.js
export function formatCurrency(value, currency = "ARS", locale = "en-US") {
  if (value === null || value === undefined || isNaN(value)) return "";

  const base = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

  // Resultado: "$365,499.00 ARS"
  return `${base} ${currency}`;
}
