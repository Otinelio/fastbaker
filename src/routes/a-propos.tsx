import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wheat, Clock, ChefHat, Sparkles, Heart, Leaf } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { StatCounter } from "@/components/shared/StatCounter";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "Notre Histoire — Fast Baker" },
      { name: "description", content: "Fast Baker : la passion du fast-food de qualité et de la pâtisserie artisanale à Baguida, Lomé." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageTransition>
      <section className="pt-[72px] relative h-screen">
        <img src="https://source.unsplash.com/featured/1600x900/?baker,hands,dough,warm" alt="Artisan boulanger" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-[var(--font-heading)] italic text-white text-center px-6">Notre Histoire</motion.h1>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-24 px-6 relative overflow-hidden">
        <Wheat size={400} className="absolute -right-20 -top-20 text-[var(--color-gold)]/10" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="rounded-3xl overflow-hidden h-[500px]">
            <img src="https://source.unsplash.com/featured/800x900/?pastry,chef,kitchen,warm" alt="Chef pâtissier" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="brand-script text-5xl mb-6">Fast Baker</div>
            <p className="text-[#444] leading-[1.9] text-[15px]">
              Fast Baker est né d'une passion pour la cuisine rapide de qualité et l'art de la pâtisserie artisanale. Basés à Baguida, nous croyons que rapidité et excellence ne s'excluent pas. Chaque burger est assemblé avec soin, chaque croissant est feuilleté avec patience, chaque gâteau est créé avec amour.
            </p>
            <p className="text-[#444] leading-[1.9] text-[15px] mt-4">
              Notre engagement : des ingrédients frais sélectionnés chaque jour, des recettes peaufinées et un service livraison gratuit qui fait de chaque commande une expérience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-[var(--font-heading)] text-[var(--color-gold)] text-center mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { Icon: Clock, t: "Rapidité", d: "Livraison en ~15 minutes" },
              { Icon: Leaf, t: "Qualité", d: "Ingrédients frais chaque jour" },
              { Icon: ChefHat, t: "Artisanat", d: "Recettes maison, sans compromis" },
              { Icon: Heart, t: "Passion", d: "Créés avec amour depuis Baguida" },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-dark p-6 hover:border-[var(--color-gold)] transition border">
                <v.Icon size={36} className="text-[var(--color-gold)] mb-4" />
                <h3 className="font-[var(--font-heading)] text-2xl mb-1">{v.t}</h3>
                <p className="text-sm text-[#888]">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: 500, s: "+", l: "Commandes" },
            { v: 40, s: "+", l: "Recettes" },
            { v: 0, s: "", l: "Frais de livraison" },
            { v: 1, s: "", l: "Adresse à Baguida" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-[var(--font-heading)] text-[var(--color-bordeaux)]">
                <StatCounter value={s.v} suffix={s.s} />
              </div>
              <div className="text-sm text-[#666] mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
