import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Truck, Store, MessageCircle, Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAdminConfig } from "@/store/ordersStore";
import { formatFCFA, whatsappUrl } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, total, clear } = useCartStore();
  const wa = useAdminConfig((s) => s.whatsappPrimary);
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");

  const send = () => {
    if (!items.length) return;
    const lines = items.map((i) => `${i.name} x${i.qty} - ${formatFCFA(i.price * i.qty)}`).join("\n");
    const msg = `Nouvelle Commande - Fast Baker\n---------------------------------\n${lines}\n---------------------------------\nTotal : ${formatFCFA(total())}\nMode : ${mode === "delivery" ? "Livraison" : "Retrait"}\nAdresse : ${mode === "delivery" ? address || "Non précisée" : "Retrait à Baguida"}\n---------------------------------\nEnvoye depuis le site Fast Baker`;
    window.open(whatsappUrl(wa, msg), "_blank");
    clear();
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/70 z-[2100]"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[2200] w-full sm:w-[440px] bg-[var(--color-surface)] flex flex-col"
            style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
          >
            <header className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-2 text-lg font-semibold"><ShoppingCart size={20} className="text-[var(--color-gold)]" /> Mon Panier</div>
              <button onClick={close}><X size={22} /></button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <div className="text-center py-16 text-[#888]">
                  <ShoppingCart size={40} className="mx-auto mb-3 opacity-40" />
                  Votre panier est vide.
                </div>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 items-center bg-[var(--color-surface-alt)] rounded-xl p-3">
                  <img src={i.image} alt={i.name} className="w-[52px] h-[52px] rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{i.name}</div>
                    <div className="text-xs text-[var(--color-gold)]">{formatFCFA(i.price * i.qty)}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="w-6 h-6 rounded-full bg-[var(--color-gold)] text-[#1A1A1A] flex items-center justify-center"><Minus size={12} /></button>
                      <span className="text-xs w-4 text-center">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="w-6 h-6 rounded-full bg-[var(--color-gold)] text-[#1A1A1A] flex items-center justify-center"><Plus size={12} /></button>
                    </div>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-[#888] hover:text-[var(--color-bordeaux)]"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-white/5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span className="text-[var(--color-gold)] font-semibold">{formatFCFA(total())}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-sage)] text-sm"><Truck size={14} /> Livraison : Gratuite</div>
                <div className="flex gap-2">
                  <button onClick={() => setMode("delivery")} className={`flex-1 py-2 rounded-full text-xs flex items-center justify-center gap-1 ${mode === "delivery" ? "bg-[var(--color-gold)] text-[#1A1A1A]" : "border border-white/10 text-white"}`}><Truck size={14} /> Livraison</button>
                  <button onClick={() => setMode("pickup")} className={`flex-1 py-2 rounded-full text-xs flex items-center justify-center gap-1 ${mode === "pickup" ? "bg-[var(--color-gold)] text-[#1A1A1A]" : "border border-white/10 text-white"}`}><Store size={14} /> Retrait</button>
                </div>
                {mode === "delivery" && (
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse de livraison" rows={2} className="w-full bg-[var(--color-surface-alt)] rounded-lg p-3 text-sm outline-none border border-white/5 focus:border-[var(--color-gold)]" />
                )}
                <button onClick={send} className="btn-gold w-full justify-center"><MessageCircle size={16} /> Confirmer via WhatsApp</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
