import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Plus, Minus, Check, ShoppingCart } from "lucide-react";
import { MENU, CATEGORY_META, type Category } from "@/data/menuData";
import { useOrdersStore } from "@/store/ordersStore";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/table/$tableNumber")({
  component: TablePage,
});

function TablePage() {
  const { tableNumber } = Route.useParams();
  const [cat, setCat] = useState<Category>("fast-food");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const addOrder = useOrdersStore((s) => s.addOrder);
  const orders = useOrdersStore((s) => s.orders);

  const items = useMemo(() => MENU.filter((m) => m.category === cat), [cat]);
  const cartList = useMemo(() => Object.entries(cart).map(([id, qty]) => {
    const it = MENU.find((m) => m.id === id)!;
    return { ...it, qty };
  }), [cart]);
  const total = cartList.reduce((a, i) => a + i.qty * i.price, 0);
  const count = cartList.reduce((a, i) => a + i.qty, 0);
  const myOrder = confirmed ? orders.find((o) => o.id === confirmed) : null;

  const submit = () => {
    const order = addOrder({
      table: tableNumber,
      customerName: name || "Invité",
      items: cartList.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
    });
    setConfirmed(order.id);
    setCart({});
    setShowName(false);
  };

  if (confirmed && myOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 250 }}>
          <Check size={64} className="text-[var(--color-gold)] mb-4" />
        </motion.div>
        <h1 className="text-3xl font-[var(--font-heading)] text-[var(--color-gold)]">Commande envoyée !</h1>
        <p className="text-[#aaa] mt-3 max-w-sm">La réception confirme votre commande sous peu.</p>
        <div className="card-dark p-5 mt-6 w-full max-w-sm">
          <div className="text-xs text-[#888]">Statut</div>
          <div className="text-xl font-semibold text-[var(--color-gold)] mt-1">{statusLabel(myOrder.status)}</div>
          <div className="text-xs text-[#666] mt-3">Table {tableNumber} · {formatFCFA(myOrder.total)}</div>
        </div>
        <button onClick={() => setConfirmed(null)} className="btn-outline-gold mt-6">Nouvelle commande</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <header className="py-6 text-center border-b border-white/5">
        <div className="brand-script text-4xl">Fast Baker</div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Utensils size={16} className="text-[var(--color-gold)]" />
          <span className="text-xl font-[var(--font-heading)]">Table {tableNumber}</span>
        </div>
      </header>

      <div className="sticky top-0 z-30 backdrop-blur-xl bg-[rgba(26,26,26,0.9)] border-b border-white/5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
          {(Object.keys(CATEGORY_META) as Category[]).map((c) => (
            <button key={c} onClick={() => setCat(c)} className="relative py-3 px-3 text-sm whitespace-nowrap"
              style={{ color: cat === c ? "var(--color-gold)" : "#666" }}>
              {CATEGORY_META[c].label}
              {cat === c && <motion.span layoutId="tab-tab" className="absolute left-2 right-2 bottom-0 h-0.5 bg-[var(--color-gold)] rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 grid sm:grid-cols-2 gap-4">
        {items.map((it) => {
          const qty = cart[it.id] || 0;
          return (
            <div key={it.id} className="card-dark p-3 flex gap-3 items-center">
              <img src={it.image} alt={it.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{it.name}</div>
                <div className="text-xs text-[#888] line-clamp-1">{it.description}</div>
                <div className="text-sm text-[var(--color-gold)] font-bold mt-1">{formatFCFA(it.price)}</div>
              </div>
              {qty === 0 ? (
                <button onClick={() => setCart({ ...cart, [it.id]: 1 })} className="btn-gold !p-2"><Plus size={16} /></button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setCart((p) => { const n = { ...p }; n[it.id] = qty - 1; if (n[it.id] <= 0) delete n[it.id]; return n; })} className="w-7 h-7 rounded-full bg-[var(--color-gold)] text-[#1A1A1A] flex items-center justify-center"><Minus size={12} /></button>
                  <span className="w-5 text-center text-sm">{qty}</span>
                  <button onClick={() => setCart({ ...cart, [it.id]: qty + 1 })} className="w-7 h-7 rounded-full bg-[var(--color-gold)] text-[#1A1A1A] flex items-center justify-center"><Plus size={12} /></button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {count > 0 && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 inset-x-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-gold)]/30 p-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-[#888]">{count} article(s)</div>
            <div className="text-lg font-bold text-[var(--color-gold)]">{formatFCFA(total)}</div>
          </div>
          <button onClick={() => setShowName(true)} className="btn-gold"><ShoppingCart size={16} /> Passer la commande</button>
        </motion.div>
      )}

      <AnimatePresence>
        {showName && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6" onClick={() => setShowName(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="card-dark p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-[var(--font-heading)] text-2xl text-[var(--color-gold)] mb-4">Votre nom ?</h3>
              <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Jean" className="w-full bg-[var(--color-surface-alt)] rounded-lg p-3 outline-none border border-white/5 focus:border-[var(--color-gold)]" />
              <button onClick={submit} className="btn-gold w-full justify-center mt-4">Confirmer la commande</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function statusLabel(s: string) {
  return { Pending: "En attente", Confirmed: "Confirmée", Ready: "Prête", Served: "Servie" }[s] || s;
}
