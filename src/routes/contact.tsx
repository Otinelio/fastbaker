import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, Phone, MessageCircle, Instagram, Mail } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAdminConfig } from "@/store/ordersStore";
import { whatsappUrl } from "@/lib/format";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Fast Baker" }, { name: "description", content: "Contactez Fast Baker à Baguida, Lomé. WhatsApp, téléphone, horaires." }] }),
  component: ContactPage,
});

function useIsOpen() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const check = () => {
      const d = new Date();
      const day = d.getDay(); const h = d.getHours();
      if (day === 0) setOpen(h >= 8 && h < 21);
      else if (day === 6) setOpen(h >= 7 && h < 23);
      else setOpen(h >= 7 && h < 22);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

function ContactPage() {
  const wa = useAdminConfig((s) => s.whatsappPrimary);
  const isOpen = useIsOpen();
  const [form, setForm] = useState({ name: "", phone: "", type: "Commande livraison", message: "" });

  const send = () => {
    const msg = `Demande - Fast Baker\n---------------------------------\nNom : ${form.name}\nTelephone : ${form.phone}\nType : ${form.type}\nMessage : ${form.message}\n---------------------------------`;
    window.open(whatsappUrl(wa, msg), "_blank");
  };

  return (
    <PageTransition>
      <section className="pt-[72px]">
        <div className="h-[400px] flex flex-col items-center justify-center text-center px-6">
          <Mail size={48} className="text-[var(--color-gold)] mb-3" />
          <h1 className="text-5xl md:text-6xl font-[var(--font-heading)] text-[var(--color-gold)]">Contactez-nous</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-[55%_45%] gap-8">
        <div className="rounded-2xl overflow-hidden h-[500px] border border-white/5">
          <iframe title="Carte" className="w-full h-full" src="https://www.google.com/maps?q=Baguida,Lome,Togo&output=embed" loading="lazy" />
        </div>

        <div className="space-y-4">
          {[
            { Icon: Phone, label: "+228 70 13 59 59", href: "tel:+22870135959" },
            { Icon: Phone, label: "+228 96 35 74 74", href: "tel:+22896357474" },
            { Icon: MessageCircle, label: "Écrire sur WhatsApp", href: `https://wa.me/${wa}`, primary: true },
            { Icon: Instagram, label: "@restaurant_fastbaker", href: "https://instagram.com/restaurant_fastbaker" },
            { Icon: MapPin, label: "Baguida, Lomé, Togo" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className={`flex items-center gap-4 card-dark p-4 border-l-4 ${c.primary ? "border-l-[var(--color-gold)] bg-[var(--color-gold)]/10" : "border-l-[var(--color-gold)]"} hover:bg-[var(--color-surface-alt)] transition`}>
              <c.Icon size={22} className="text-[var(--color-gold)]" />
              <span className="text-sm">{c.label}</span>
            </a>
          ))}

          <div className="card-dark p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: isOpen ? "#4ade80" : "#ef4444" }} />
              <span className="text-sm font-semibold">{isOpen ? "Ouvert maintenant" : "Fermé"}</span>
            </div>
            <div className="text-xs text-[#aaa] space-y-1">
              <div>Lun–Ven : 07h00–22h00</div>
              <div>Sam : 07h00–23h00</div>
              <div>Dim : 08h00–21h00</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-[var(--font-heading)] mb-6 text-center">Une demande spéciale ?</h2>
          <div className="space-y-3">
            <input placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white rounded-lg p-3 border border-black/10 outline-none focus:border-[var(--color-gold)]" />
            <input placeholder="Votre téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white rounded-lg p-3 border border-black/10 outline-none focus:border-[var(--color-gold)]" />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-white rounded-lg p-3 border border-black/10 outline-none focus:border-[var(--color-gold)]">
              <option>Commande livraison</option>
              <option>Réservation table</option>
              <option>Commande événement</option>
              <option>Autre</option>
            </select>
            <textarea placeholder="Votre message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white rounded-lg p-3 border border-black/10 outline-none focus:border-[var(--color-gold)]" />
            <button onClick={send} className="btn-gold w-full justify-center"><MessageCircle size={16} /> Envoyer via WhatsApp</button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
