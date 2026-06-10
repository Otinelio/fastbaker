import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, QrCode, Printer, BellRing } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useOrdersStore, useAdminConfig, type OrderStatus } from "@/store/ordersStore";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/reception")({
  component: ReceptionPage,
});

function PinLogin({ pin, onOk, subtitle }: { pin: string; onOk: () => void; subtitle: string }) {
  const [val, setVal] = useState("");
  const [shake, setShake] = useState(false);

  const press = (d: string) => {
    if (d === "del") { setVal((v) => v.slice(0, -1)); return; }
    if (val.length >= 4) return;
    const next = val + d;
    setVal(next);
    if (next.length === 4) {
      if (next === pin) onOk();
      else { setShake(true); setTimeout(() => { setShake(false); setVal(""); }, 600); }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="brand-script text-5xl">Fast Baker</div>
      <Lock size={32} className="text-[var(--color-gold)] my-4" />
      <div className="text-[#aaa] font-[var(--font-heading)] text-xl mb-8">{subtitle}</div>
      <motion.div animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }} className="flex gap-3 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-14 rounded-lg border-2 flex items-center justify-center text-2xl"
            style={{ borderColor: val.length > i ? "var(--color-gold)" : "rgba(255,255,255,.1)" }}>
            {val.length > i ? "●" : ""}
          </div>
        ))}
      </motion.div>
      <div className="grid grid-cols-3 gap-3">
        {["1","2","3","4","5","6","7","8","9","","0","del"].map((d, i) => (
          d === "" ? <div key={i} /> :
          <button key={i} onClick={() => press(d)} className="w-16 h-16 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] text-xl font-semibold border border-white/5">
            {d === "del" ? "←" : d}
          </button>
        ))}
      </div>
    </div>
  );
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  Pending: "#F59E0B", Confirmed: "#3B82F6", Ready: "#10B981", Served: "#6B7280",
};
const STATUS_LABEL: Record<OrderStatus, string> = {
  Pending: "En attente", Confirmed: "Confirmé", Ready: "Prêt", Served: "Servi",
};

function ReceptionPage() {
  const pin = useAdminConfig((s) => s.receptionPin);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"orders" | "qr">("orders");
  const orders = useOrdersStore((s) => s.orders);
  const setStatus = useOrdersStore((s) => s.setStatus);
  const [now, setNow] = useState(new Date());
  const [tableCount, setTableCount] = useState(10);
  const [lastCount, setLastCount] = useState(0);

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const todays = useMemo(() => orders.filter((o) => new Date(o.timestamp).toDateString() === new Date().toDateString()), [orders]);
  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  useEffect(() => {
    if (!authed) return;
    if (orders.length > lastCount && lastCount !== 0) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880; gain.gain.value = 0.1;
        osc.start(); osc.stop(ctx.currentTime + 0.18);
      } catch { /* noop */ }
    }
    setLastCount(orders.length);
    document.title = pendingCount > 0 ? `(${pendingCount}) Nouvelles — Fast Baker Réception` : "Fast Baker Réception";
  }, [orders.length, authed, lastCount, pendingCount]);

  if (!authed) return <PinLogin pin={pin} onOk={() => setAuthed(true)} subtitle="Réception — Accès Sécurisé" />;

  const topItem = (() => {
    const map: Record<string, number> = {};
    todays.forEach((o) => o.items.forEach((i) => { map[i.name] = (map[i.name] || 0) + i.qty; }));
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  })();
  const revenue = todays.reduce((a, o) => a + o.total, 0);

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[var(--color-surface)]">
        <div className="brand-script text-2xl">Fast Baker <span className="font-[var(--font-ui)] text-base text-[#888] ml-2">— Réception</span></div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#aaa]">{now.toLocaleTimeString("fr-FR")}</span>
          <button onClick={() => setAuthed(false)} className="text-[var(--color-gold)]"><LogOut size={20} /></button>
        </div>
      </header>

      <div className="flex gap-2 px-6 pt-4 border-b border-white/5">
        {[["orders","Commandes",BellRing],["qr","QR Codes",QrCode]].map(([k, l, I]) => {
          const Icon = I as React.ComponentType<{ size?: number }>;
          return (
            <button key={k as string} onClick={() => setTab(k as "orders" | "qr")} className="py-3 px-4 text-sm flex items-center gap-2"
              style={{ color: tab === k ? "var(--color-gold)" : "#888", borderBottom: tab === k ? "2px solid var(--color-gold)" : "2px solid transparent" }}>
              <Icon size={16} /> {l as string}
            </button>
          );
        })}
      </div>

      {tab === "orders" && (
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { l: "Commandes du jour", v: todays.length },
              { l: "Revenus du jour", v: formatFCFA(revenue) },
              { l: "En attente", v: pendingCount, accent: pendingCount > 0 },
              { l: "Plus commandé", v: topItem },
            ].map((s, i) => (
              <div key={i} className="card-dark p-4">
                <div className="text-xs text-[#888]">{s.l}</div>
                <div className="text-2xl font-[var(--font-heading)] mt-1" style={{ color: s.accent ? "#F59E0B" : "var(--color-gold)" }}>{s.v}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-[var(--font-heading)]">Commandes en Direct</h2>
            {pendingCount > 0 && <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs">{pendingCount}</span>}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {orders.filter((o) => o.status !== "Served").map((o) => (
                <motion.div key={o.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="card-dark p-4" style={{ borderLeft: `4px solid ${STATUS_COLOR[o.status]}` }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-gold)]">Table {o.table}</div>
                      <div className="text-sm">{o.customerName}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1" style={{ background: STATUS_COLOR[o.status] + "20", color: STATUS_COLOR[o.status] }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[o.status] }} />{STATUS_LABEL[o.status]}
                    </span>
                  </div>
                  <ul className="text-xs text-[#aaa] space-y-1 my-3">
                    {o.items.map((i, ix) => <li key={ix}>{i.name} × {i.qty} — {formatFCFA(i.price * i.qty)}</li>)}
                  </ul>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-[var(--color-gold)]">{formatFCFA(o.total)}</span>
                    <span className="text-xs text-[#666]">{relative(o.timestamp)}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {o.status === "Pending" && <button onClick={() => setStatus(o.id, "Confirmed")} className="px-3 py-1.5 rounded-full text-xs bg-blue-500 text-white">Confirmer</button>}
                    {o.status === "Confirmed" && <button onClick={() => setStatus(o.id, "Ready")} className="px-3 py-1.5 rounded-full text-xs bg-green-500 text-white">Marquer Prêt</button>}
                    {o.status === "Ready" && <button onClick={() => setStatus(o.id, "Served")} className="px-3 py-1.5 rounded-full text-xs bg-gray-500 text-white">Servi</button>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {orders.filter((o) => o.status !== "Served").length === 0 && (
              <div className="col-span-full text-center py-16 text-[#666]">Aucune commande active.</div>
            )}
          </div>
        </div>
      )}

      {tab === "qr" && (
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 print:hidden">
            <label className="text-sm">Nombre de tables :</label>
            <input type="number" value={tableCount} onChange={(e) => setTableCount(+e.target.value)} className="bg-[var(--color-surface-alt)] rounded px-3 py-2 w-24 outline-none" />
            <button onClick={() => window.print()} className="btn-gold"><Printer size={14} /> Imprimer</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: tableCount }).map((_, i) => {
              const n = i + 1;
              const url = `${typeof window !== "undefined" ? window.location.origin : ""}/table/${n}`;
              return (
                <div key={n} className="bg-white text-black p-4 rounded-lg text-center break-inside-avoid">
                  <QRCodeSVG value={url} size={160} className="mx-auto" />
                  <div className="font-bold mt-2">Table {n}</div>
                  <div className="text-[10px] text-gray-500 truncate">{url}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function relative(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 60000;
  if (diff < 1) return "à l'instant";
  if (diff < 60) return `il y a ${Math.floor(diff)} min`;
  return `il y a ${Math.floor(diff / 60)}h`;
}
