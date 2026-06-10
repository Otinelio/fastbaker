import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { Badge } from "@/components/shared/Badge";
import { useCartStore } from "@/store/cartStore";
import { formatFCFA } from "@/lib/format";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const setQty = useCartStore((s) => s.setQty);
  const inCart = items.find((i) => i.id === item.id);
  const qty = inCart?.qty ?? 0;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "var(--shadow-gold)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="card-dark p-4 flex flex-col relative overflow-hidden group"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition" />
      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-[var(--color-surface-alt)] mb-3">
        <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold text-[15px] text-[var(--color-white)] leading-snug">{item.name}</h3>
        <div className="flex flex-wrap gap-1">{item.badges?.map((b) => <Badge key={b} label={b} />)}</div>
      </div>
      <p className="text-[13px] text-[#888] line-clamp-2 mb-3 min-h-[34px]">{item.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[15px] font-bold text-[var(--color-gold)]">{formatFCFA(item.price)}</span>
        <AnimatePresence mode="wait" initial={false}>
          {qty === 0 ? (
            <motion.button
              key="add"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => add({ id: item.id, name: item.name, price: item.price, image: item.image })}
              className="btn-gold !py-2 !px-4 !text-xs"
            >
              <Plus size={14} /> Ajouter
            </motion.button>
          ) : (
            <motion.div
              key="qty"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <button onClick={() => setQty(item.id, qty - 1)} className="w-8 h-8 rounded-full bg-[var(--color-gold)] text-[#1A1A1A] flex items-center justify-center"><Minus size={14} /></button>
              <span className="w-5 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(item.id, qty + 1)} className="w-8 h-8 rounded-full bg-[var(--color-gold)] text-[#1A1A1A] flex items-center justify-center"><Plus size={14} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
