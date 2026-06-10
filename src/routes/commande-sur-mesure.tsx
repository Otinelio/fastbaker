import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, MessageCircle, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAdminConfig } from "@/store/ordersStore";
import { whatsappUrl } from "@/lib/format";

export const Route = createFileRoute("/commande-sur-mesure")({
  head: () => ({
    meta: [
      { title: "Gâteaux & Commandes Événements — Fast Baker" },
      { name: "description", content: "Commandez votre gâteau sur mesure pour mariages, anniversaires, baptêmes et événements à Lomé." },
    ],
  }),
  component: CustomOrderPage,
});

const EVENTS = ["Anniversaire", "Mariage", "Baptême", "Graduation", "Entreprise", "Autre"];
const FLAVORS = ["Chocolat Intense", "Vanille Bourbon", "Red Velvet", "Citron Meringué", "Café", "Fraise"];
const FILLINGS = ["Ganache Chocolat", "Crème Beurre Vanille", "Coulis Fruits Rouges", "Nutella", "Sans Fourrage"];
const SIZES = [
  { label: "6 personnes", price: "À partir de 15 000 FCFA" },
  { label: "8 personnes", price: "À partir de 22 000 FCFA" },
  { label: "12 personnes", price: "À partir de 32 000 FCFA" },
  { label: "20+ personnes", price: "Sur devis" },
];

function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [event, setEvent] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);
  const [filling, setFilling] = useState("");
  const [size, setSize] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", date: "", address: "", inscription: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const wa = useAdminConfig((s) => s.whatsappPrimary);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const send = () => {
    const msg = `COMMANDE GATEAU - Fast Baker
---------------------------------
Evenement : ${event}
Parfum : ${flavors.join(", ")}
Fourrage : ${filling}
Taille : ${size}
Inscription : ${form.inscription || "Aucune"}
---------------------------------
Date evenement : ${form.date}
Nom : ${form.name}
Telephone : ${form.phone}
Adresse : ${form.address}
Notes : ${form.notes || "Aucune"}
---------------------------------
Envoye depuis fastbaker.com`;
    window.open(whatsappUrl(wa, msg), "_blank");
  };

  return (
    <PageTransition>
      <section className="pt-[72px] relative">
        <div className="h-[500px] relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1600&h=900&fit=crop" alt="Gâteau de mariage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--color-bg)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <Cake size={56} className="text-[var(--color-gold)] mb-4" />
            <h1 className="text-4xl md:text-6xl font-[var(--font-heading)] text-white mb-2">Gâteaux & Commandes Événements</h1>
            <p className="text-[#ccc] max-w-2xl">Mariages · Anniversaires · Baptêmes · Graduations · Entreprises</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-10">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex items-center flex-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{ background: step >= n ? "var(--color-gold)" : "var(--color-surface-alt)", color: step >= n ? "#1A1A1A" : "#666" }}>
                  {step > n ? <Check size={16} /> : n}
                </div>
                {n < 5 && <div className="flex-1 h-0.5 mx-2" style={{ background: step > n ? "var(--color-gold)" : "var(--color-surface-alt)" }} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="card-dark p-8">
              {step === 1 && (
                <>
                  <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Type d'événement</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {EVENTS.map((e) => (
                      <button key={e} onClick={() => setEvent(e)} className="p-5 rounded-xl border text-sm transition"
                        style={{ borderColor: event === e ? "var(--color-gold)" : "rgba(255,255,255,.08)", background: event === e ? "rgba(201,168,76,0.1)" : "var(--color-surface-alt)" }}>
                        {e}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-gold)] mb-2">Parfum / Base</h2>
                  <p className="text-sm text-[#888] mb-6">Choix multiple possible</p>
                  <div className="flex flex-wrap gap-2">
                    {FLAVORS.map((f) => {
                      const sel = flavors.includes(f);
                      return (
                        <button key={f} onClick={() => setFlavors((p) => sel ? p.filter((x) => x !== f) : [...p, f])}
                          className="px-4 py-2 rounded-full border text-sm transition"
                          style={{ borderColor: sel ? "var(--color-gold)" : "rgba(255,255,255,.1)", background: sel ? "var(--color-gold)" : "transparent", color: sel ? "#1A1A1A" : "white" }}>
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Fourrage</h2>
                  <div className="flex flex-wrap gap-2">
                    {FILLINGS.map((f) => (
                      <button key={f} onClick={() => setFilling(f)} className="px-4 py-2 rounded-full border text-sm transition"
                        style={{ borderColor: filling === f ? "var(--color-gold)" : "rgba(255,255,255,.1)", background: filling === f ? "var(--color-gold)" : "transparent", color: filling === f ? "#1A1A1A" : "white" }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Taille</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {SIZES.map((s) => (
                      <button key={s.label} onClick={() => setSize(s.label)} className="p-5 rounded-xl border text-left transition"
                        style={{ borderColor: size === s.label ? "var(--color-gold)" : "rgba(255,255,255,.08)", background: size === s.label ? "rgba(201,168,76,0.1)" : "var(--color-surface-alt)" }}>
                        <div className="font-semibold text-[var(--color-white)]">{s.label}</div>
                        <div className="text-xs text-[var(--color-gold)] mt-1">{s.price}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 5 && !submitted && (
                <>
                  <h2 className="text-3xl font-[var(--font-heading)] text-[var(--color-gold)] mb-6">Vos Coordonnées</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input placeholder="Nom complet" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-base" />
                    <input placeholder="Téléphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-base" />
                    <input placeholder="Date événement" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-base md:col-span-2" />
                    <textarea placeholder="Adresse de livraison" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="input-base md:col-span-2" />
                    <input placeholder="Inscription sur le gâteau (optionnel)" value={form.inscription} onChange={(e) => setForm({ ...form, inscription: e.target.value })} className="input-base md:col-span-2" />
                    <textarea placeholder="Notes (optionnel)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="input-base md:col-span-2" />
                  </div>
                </>
              )}
              {step === 5 && submitted && (
                <div className="card-gold p-6 -m-2">
                  <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)] mb-4">Récapitulatif</h2>
                  <ul className="text-sm space-y-2 text-[#ccc]">
                    <li><strong className="text-white">Événement :</strong> {event}</li>
                    <li><strong className="text-white">Parfum :</strong> {flavors.join(", ")}</li>
                    <li><strong className="text-white">Fourrage :</strong> {filling}</li>
                    <li><strong className="text-white">Taille :</strong> {size}</li>
                    <li><strong className="text-white">Date :</strong> {form.date}</li>
                    <li><strong className="text-white">Nom :</strong> {form.name}</li>
                    <li><strong className="text-white">Téléphone :</strong> {form.phone}</li>
                  </ul>
                  <button onClick={send} className="btn-gold w-full justify-center mt-6"><MessageCircle size={16} /> Envoyer ma commande via WhatsApp</button>
                  <button onClick={() => setSubmitted(false)} className="text-xs text-[var(--color-gold)] mt-3">Modifier</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {!submitted && (
            <div className="flex justify-between mt-6">
              <button onClick={prev} disabled={step === 1} className="btn-outline-gold disabled:opacity-30"><ChevronLeft size={16} /> Précédent</button>
              {step < 5 && <button onClick={next} className="btn-gold">Suivant <ChevronRight size={16} /></button>}
              {step === 5 && <button onClick={() => setSubmitted(true)} className="btn-gold">Voir récap <ChevronRight size={16} /></button>}
            </div>
          )}
        </div>
      </section>

      <style>{`.input-base{background:var(--color-surface-alt);border:1px solid rgba(255,255,255,.05);border-radius:10px;padding:12px 14px;font-size:14px;color:white;outline:none;transition:border .2s;width:100%;}.input-base:focus{border-color:var(--color-gold);}`}</style>
    </PageTransition>
  );
}
