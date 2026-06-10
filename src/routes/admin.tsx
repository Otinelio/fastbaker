import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, LayoutDashboard, Utensils, History, QrCode, BarChart3, Settings } from "lucide-react";
import { useOrdersStore, useAdminConfig } from "@/store/ordersStore";
import { MENU } from "@/data/menuData";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function PinLogin({ pin, onOk }: { pin: string; onOk: () => void }) {
  const [val, setVal] = useState("");
  const [shake, setShake] = useState(false);
  const press = (d: string) => {
    if (d === "del") { setVal((v) => v.slice(0, -1)); return; }
    if (val.length >= 4) return;
    const n = val + d;
    setVal(n);
    if (n.length === 4) { if (n === pin) onOk(); else { setShake(true); setTimeout(() => { setShake(false); setVal(""); }, 600); } }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="brand-script text-5xl">Fast Baker</div>
      <Lock size={32} className="text-[var(--color-gold)] my-4" />
      <div className="text-[#aaa] font-[var(--font-heading)] text-xl mb-8">Administration</div>
      <motion.div animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }} className="flex gap-3 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-14 rounded-lg border-2 flex items-center justify-center text-2xl"
            style={{ borderColor: val.length > i ? "var(--color-gold)" : "rgba(255,255,255,.1)" }}>{val.length > i ? "●" : ""}</div>
        ))}
      </motion.div>
      <div className="grid grid-cols-3 gap-3">
        {["1","2","3","4","5","6","7","8","9","","0","del"].map((d, i) =>
          d === "" ? <div key={i} /> :
          <button key={i} onClick={() => press(d)} className="w-16 h-16 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] text-xl border border-white/5">{d === "del" ? "←" : d}</button>
        )}
      </div>
    </div>
  );
}

const NAV = [
  { k: "dash", l: "Tableau de bord", Icon: LayoutDashboard },
  { k: "menu", l: "Gestion du Menu", Icon: Utensils },
  { k: "hist", l: "Historique", Icon: History },
  { k: "qr", l: "QR Codes", Icon: QrCode },
  { k: "ana", l: "Analytiques", Icon: BarChart3 },
  { k: "set", l: "Paramètres", Icon: Settings },
] as const;

function AdminPage() {
  const cfg = useAdminConfig();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<typeof NAV[number]["k"]>("dash");
  const orders = useOrdersStore((s) => s.orders);

  const todays = useMemo(() => orders.filter((o) => new Date(o.timestamp).toDateString() === new Date().toDateString()), [orders]);
  const revenue = orders.reduce((a, o) => a + o.total, 0);
  const todayRev = todays.reduce((a, o) => a + o.total, 0);
  const itemCounts = useMemo(() => {
    const m: Record<string, number> = {};
    orders.forEach((o) => o.items.forEach((i) => { m[i.name] = (m[i.name] || 0) + i.qty; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  if (!authed) return <PinLogin pin={cfg.adminPin} onOk={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen flex">
      <aside className="w-[220px] bg-[#111] border-r border-white/5 flex flex-col min-h-screen">
        <div className="brand-script text-2xl p-5 border-b border-white/5">Fast Baker</div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <button key={n.k} onClick={() => setTab(n.k)} className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2 text-sm transition"
              style={{ background: tab === n.k ? "rgba(201,168,76,.12)" : "transparent", color: tab === n.k ? "var(--color-gold)" : "#aaa" }}>
              <n.Icon size={16} /> {n.l}
            </button>
          ))}
        </nav>
        <button onClick={() => setAuthed(false)} className="m-3 px-3 py-2 text-sm text-[#888] hover:text-[var(--color-gold)] flex items-center gap-2"><LogOut size={16} /> Déconnexion</button>
      </aside>

      <main className="flex-1 p-6 overflow-x-auto">
        {tab === "dash" && (
          <>
            <h1 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Tableau de bord</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                ["Commandes totales", orders.length],
                ["Commandes du jour", todays.length],
                ["Revenu total", formatFCFA(revenue)],
                ["Revenu du jour", formatFCFA(todayRev)],
              ].map(([l, v], i) => (
                <div key={i} className="card-dark p-4">
                  <div className="text-xs text-[#888]">{l}</div>
                  <div className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mt-1">{v}</div>
                </div>
              ))}
            </div>
            <h2 className="font-[var(--font-heading)] text-xl mb-3">5 dernières commandes</h2>
            <div className="card-dark overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)] text-xs text-[#888]">
                  <tr><th className="text-left p-3">Heure</th><th className="text-left p-3">Table</th><th className="text-left p-3">Articles</th><th className="text-right p-3">Total</th></tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-t border-white/5">
                      <td className="p-3 text-xs">{new Date(o.timestamp).toLocaleTimeString("fr-FR")}</td>
                      <td className="p-3 font-bold">{o.table}</td>
                      <td className="p-3 text-xs text-[#aaa]">{o.items.length}</td>
                      <td className="p-3 text-right text-[var(--color-gold)]">{formatFCFA(o.total)}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-[#666]">Aucune commande</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "menu" && (
          <>
            <h1 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Gestion du Menu</h1>
            <div className="card-dark overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)] text-xs text-[#888]">
                  <tr><th className="text-left p-3">Image</th><th className="text-left p-3">Nom</th><th className="text-left p-3">Catégorie</th><th className="text-right p-3">Prix</th></tr>
                </thead>
                <tbody>
                  {MENU.map((m) => (
                    <tr key={m.id} className="border-t border-white/5">
                      <td className="p-3"><img src={m.image} alt="" className="w-10 h-10 rounded object-cover" /></td>
                      <td className="p-3">{m.name}</td>
                      <td className="p-3 text-xs text-[#aaa]">{m.category}</td>
                      <td className="p-3 text-right text-[var(--color-gold)]">{formatFCFA(m.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "hist" && (
          <>
            <h1 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Historique des commandes</h1>
            <div className="card-dark overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)] text-xs text-[#888]">
                  <tr><th className="text-left p-3">Date</th><th className="text-left p-3">Heure</th><th className="text-left p-3">Table</th><th className="text-left p-3">Client</th><th className="text-right p-3">Total</th><th className="text-left p-3">Statut</th></tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-white/5">
                      <td className="p-3 text-xs">{new Date(o.timestamp).toLocaleDateString("fr-FR")}</td>
                      <td className="p-3 text-xs">{new Date(o.timestamp).toLocaleTimeString("fr-FR")}</td>
                      <td className="p-3 font-bold">{o.table}</td>
                      <td className="p-3">{o.customerName}</td>
                      <td className="p-3 text-right text-[var(--color-gold)]">{formatFCFA(o.total)}</td>
                      <td className="p-3 text-xs">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "qr" && (
          <>
            <h1 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-4">Générateur QR</h1>
            <p className="text-sm text-[#888]">Utilisez l'onglet "QR Codes" de la <a href="/reception" className="text-[var(--color-gold)] underline">réception</a>.</p>
          </>
        )}

        {tab === "ana" && (
          <>
            <h1 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Analytiques</h1>
            <div className="card-dark p-6">
              <h2 className="font-[var(--font-heading)] text-lg mb-4">Top 5 articles</h2>
              <div className="space-y-2">
                {itemCounts.slice(0, 5).map(([name, qty]) => {
                  const max = itemCounts[0]?.[1] || 1;
                  return (
                    <div key={name}>
                      <div className="flex justify-between text-xs mb-1"><span>{name}</span><span className="text-[var(--color-gold)]">{qty}</span></div>
                      <div className="h-2 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--color-gold)]" style={{ width: `${(qty / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
                {itemCounts.length === 0 && <p className="text-[#666] text-sm">Pas encore de données.</p>}
              </div>
            </div>
          </>
        )}

        {tab === "set" && (
          <>
            <h1 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Paramètres</h1>
            <div className="card-dark p-6 max-w-xl space-y-4">
              {[
                ["PIN Réception", cfg.receptionPin, cfg.setReceptionPin],
                ["PIN Admin", cfg.adminPin, cfg.setAdminPin],
                ["WhatsApp principal", cfg.whatsappPrimary, cfg.setWhatsappPrimary],
                ["WhatsApp secondaire", cfg.whatsappSecondary, cfg.setWhatsappSecondary],
              ].map(([l, v, set], i) => (
                <div key={i}>
                  <label className="text-xs text-[#888] block mb-1">{l as string}</label>
                  <input value={v as string} onChange={(e) => (set as (s: string) => void)(e.target.value)}
                    className="w-full bg-[var(--color-surface-alt)] rounded-lg p-3 outline-none border border-white/5 focus:border-[var(--color-gold)]" />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
