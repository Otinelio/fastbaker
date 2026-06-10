import type { Badge as BadgeType } from "@/data/menuData";

const STYLES: Record<BadgeType, string> = {
  Populaire: "bg-[var(--color-gold)] text-[#1A1A1A]",
  Nouveau: "bg-[var(--color-bordeaux)] text-white",
  Épicé: "bg-[var(--color-terracotta)] text-white",
  Végé: "bg-[var(--color-sage)] text-white",
};

export function Badge({ label }: { label: BadgeType }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${STYLES[label]}`}
    >
      {label}
    </span>
  );
}
