import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

export const Route = createFileRoute("/galerie")({
  head: () => ({ meta: [{ title: "Galerie — Fast Baker" }, { name: "description", content: "Nos créations en images : burgers, pâtisseries, plats et gâteaux d'événement." }] }),
  component: GalleryPage,
});

interface Pic { id: number; cat: string; q: string; name: string; tall?: boolean }
const PICS: Pic[] = [
  { id: 1, cat: "Fast Food", q: "burger,dark,gourmet", name: "Burger Spécial" },
  { id: 2, cat: "Pâtisseries", q: "croissants,golden", name: "Croissants frais", tall: true },
  { id: 3, cat: "Plats", q: "grilled,chicken,plate", name: "Poulet braisé" },
  { id: 4, cat: "Gâteaux Événements", q: "wedding,cake,white", name: "Gâteau de mariage", tall: true },
  { id: 5, cat: "Fast Food", q: "chicken,wings,spicy", name: "Ailes épicées" },
  { id: 6, cat: "Pâtisseries", q: "macarons,colorful", name: "Macarons" },
  { id: 7, cat: "Desserts", q: "chocolate,lava,cake", name: "Fondant" },
  { id: 8, cat: "Plats", q: "spaghetti,bolognese", name: "Spaghetti" },
  { id: 9, cat: "Gâteaux Événements", q: "birthday,cake,gold", name: "Anniversaire", tall: true },
  { id: 10, cat: "Fast Food", q: "loaded,fries,cheese", name: "Frites chargées" },
  { id: 11, cat: "Pâtisseries", q: "fruit,tart,dessert", name: "Tarte aux fruits" },
  { id: 12, cat: "Desserts", q: "tiramisu,coffee", name: "Tiramisu" },
];
const CATS = ["Tout", "Fast Food", "Pâtisseries", "Plats", "Gâteaux Événements"];

function GalleryPage() {
  const [filter, setFilter] = useState("Tout");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = filter === "Tout" ? PICS : PICS.filter((p) => p.cat === filter);
  const open = lightbox !== null ? visible[lightbox] : null;

  return (
    <PageTransition>
      <section className="pt-[72px]">
        <div className="h-[400px] flex flex-col items-center justify-center text-center px-6">
          <ImageIcon size={48} className="text-[var(--color-gold)] mb-3" />
          <h1 className="text-5xl md:text-6xl font-[var(--font-heading)] text-[var(--color-gold)]">Nos Créations</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 justify-center">
          {CATS.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className="px-4 py-2 rounded-full text-sm whitespace-nowrap border transition"
              style={filter === c ? { background: "var(--color-gold)", color: "#1A1A1A", borderColor: "var(--color-gold)" } : { borderColor: "rgba(255,255,255,.1)", color: "#aaa" }}>
              {c}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {visible.map((p, i) => (
            <motion.div key={p.id} layoutId={`pic-${p.id}`} onClick={() => setLightbox(i)}
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden">
              <img src={`https://source.unsplash.com/featured/${p.tall ? "600x900" : "600x500"}/?${p.q}`} alt={p.name} loading="lazy" className="w-full" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition text-center p-4 border border-[var(--color-gold)]">
                  <div className="font-[var(--font-heading)] text-xl text-white">{p.name}</div>
                  <div className="text-xs text-[var(--color-gold)] mt-1">{p.cat}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black/95 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 text-white" onClick={() => setLightbox(null)}><X size={28} /></button>
            <button className="absolute left-4 text-white" onClick={(e) => { e.stopPropagation(); setLightbox((p) => ((p! - 1 + visible.length) % visible.length)); }}><ChevronLeft size={36} /></button>
            <motion.img layoutId={`pic-${open.id}`} src={`https://source.unsplash.com/featured/1200x900/?${open.q}`} className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl" />
            <button className="absolute right-4 text-white" onClick={(e) => { e.stopPropagation(); setLightbox((p) => ((p! + 1) % visible.length)); }}><ChevronRight size={36} /></button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-[#aaa]">{lightbox! + 1} / {visible.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
