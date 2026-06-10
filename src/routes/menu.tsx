import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Search } from "lucide-react";
import * as Icons from "lucide-react";
import { z } from "zod";
import { PageTransition } from "@/components/layout/PageTransition";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { MENU, CATEGORY_META, type Category, type Badge as BadgeT } from "@/data/menuData";

const searchSchema = z.object({ cat: z.string().optional() });

export const Route = createFileRoute("/menu")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Menu — Fast Baker" },
      { name: "description", content: "Découvrez notre menu complet : burgers, pâtisseries, plats, desserts et boissons." },
    ],
  }),
  component: MenuPage,
});

const CATS: Category[] = ["fast-food", "patisseries", "plats", "desserts", "boissons"];
const FILTERS: ("Tous" | BadgeT)[] = ["Tous", "Populaire", "Nouveau", "Végé"];

function MenuPage() {
  const search = useSearch({ from: "/menu" });
  const initialCat = (CATS as string[]).includes(search.cat ?? "") ? (search.cat as Category) : "fast-food";
  const [active, setActive] = useState<Category>(initialCat);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tous");

  const filtered = useMemo(() => {
    return MENU.filter((m) => m.category === active)
      .filter((m) => (q ? (m.name + m.description).toLowerCase().includes(q.toLowerCase()) : true))
      .filter((m) => (filter === "Tous" ? true : m.badges?.includes(filter as BadgeT)));
  }, [active, q, filter]);

  return (
    <PageTransition>
      <section className="pt-[72px] relative" style={{ background: "repeating-linear-gradient(45deg, var(--color-bg), var(--color-bg) 12px, #1d1d1d 12px, #1d1d1d 13px)" }}>
        <div className="h-[400px] flex flex-col items-center justify-center text-center px-6">
          <UtensilsCrossed size={48} className="text-[var(--color-gold)] mb-3" />
          <h1 className="text-5xl md:text-6xl font-[var(--font-heading)] text-[var(--color-gold)]">Notre Menu</h1>
          <p className="text-[#aaa] mt-3">Tout ce qui se passe entre nos fourneaux et votre assiette.</p>
        </div>
      </section>

      <div className="sticky top-[72px] z-40 backdrop-blur-xl bg-[rgba(26,26,26,0.85)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATS.map((c) => {
            const meta = CATEGORY_META[c];
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[meta.icon];
            return (
              <button key={c} onClick={() => setActive(c)} className="relative py-4 px-4 text-sm whitespace-nowrap flex items-center gap-2 transition-colors"
                style={{ color: active === c ? "var(--color-gold)" : "#666" }}>
                {Icon && <Icon size={16} />} {meta.label}
                {active === c && <motion.span layoutId="menu-tab" className="absolute left-2 right-2 bottom-0 h-[3px] rounded-full bg-[var(--color-gold)]" />}
              </button>
            );
          })}
        </div>
      </div>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un plat..."
                className="w-full h-12 pl-11 pr-4 rounded-full bg-[var(--color-surface-alt)] outline-none border border-white/5 focus:border-[var(--color-gold)] text-sm" />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className="px-4 py-2 rounded-full text-xs whitespace-nowrap border transition"
                  style={filter === f ? { background: "var(--color-gold)", color: "#1A1A1A", borderColor: "var(--color-gold)" } : { borderColor: "rgba(255,255,255,0.1)", color: "#aaa" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-[var(--font-heading)]">{CATEGORY_META[active].label}</h2>
            <span className="text-xs text-[var(--color-gold)]">{filtered.length} articles</span>
          </div>

          <motion.div layout className="grid md:grid-cols-2 gap-5">
            {filtered.map((m) => <MenuItemCard key={m.id} item={m} />)}
          </motion.div>
          {filtered.length === 0 && <div className="text-center py-16 text-[#666]">Aucun plat trouvé.</div>}
        </div>
      </section>
    </PageTransition>
  );
}
