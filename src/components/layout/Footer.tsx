import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Instagram, Truck } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#111111" }} className="border-t border-[rgba(201,168,76,0.25)]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="brand-script text-[36px] leading-none">Fast Baker</div>
          <div className="text-[var(--color-gold)] mt-3 italic font-[var(--font-heading)] text-lg">Rapide. Artisanal. Gourmand.</div>
          <p className="text-[13px] text-[#888] mt-4 leading-relaxed">
            Hybride fast-food, pâtisserie artisanale et plats du jour. Livraison gratuite à Baguida, Lomé.
          </p>
        </div>
        <div>
          <h4 className="text-[var(--color-white)] text-base mb-4 font-[var(--font-heading)]">Navigation</h4>
          <ul className="space-y-2 text-[13px] text-[#aaa]">
            {[
              ["/", "Accueil"], ["/menu", "Menu"], ["/commande-sur-mesure", "Sur Mesure"],
              ["/a-propos", "À Propos"], ["/galerie", "Galerie"], ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-[var(--color-gold)] transition">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[var(--color-white)] text-base mb-4 font-[var(--font-heading)]">Contact</h4>
          <ul className="space-y-2 text-[13px] text-[#aaa]">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-[var(--color-gold)]" /> Baguida, Lomé, Togo</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-[var(--color-gold)]" /> +228 70 13 59 59</li>
            <li className="flex items-center gap-2"><MessageCircle size={14} className="text-[var(--color-gold)]" /> WhatsApp +228 96 35 74 74</li>
            <li className="flex items-center gap-2"><Instagram size={14} className="text-[var(--color-gold)]" /> @restaurant_fastbaker</li>
          </ul>
          <div className="mt-4 text-[12px] text-[#888]">
            <div>Lun–Ven : 07h00–22h00</div>
            <div>Sam : 07h00–23h00</div>
            <div>Dim : 08h00–21h00</div>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#666]">
          <span>© {new Date().getFullYear()} Fast Baker — Tous droits réservés.</span>
          <span className="inline-flex items-center gap-2 text-[var(--color-gold)] border border-[var(--color-gold)] rounded-full px-3 py-1">
            <Truck size={12} /> Livraison gratuite à Baguida
          </span>
        </div>
      </div>
    </footer>
  );
}
