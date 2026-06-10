export const formatFCFA = (n: number) =>
  n.toLocaleString("fr-FR").replace(/,/g, " ") + " FCFA";

export const whatsappUrl = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
