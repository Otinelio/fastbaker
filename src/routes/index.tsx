import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Truck, Clock, Star, ShoppingCart, ChefHat, Sparkles, Leaf,
  Beef, Croissant, UtensilsCrossed, Cake, CupSoda, MessageCircle, ArrowRight,
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { MENU } from "@/data/menuData";
import { StatCounter } from "@/components/shared/StatCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fast Baker — Rapide. Artisanal. Gourmand. | Baguida, Lomé" },
      { name: "description", content: "Burgers, pâtisseries, plats du jour à Baguida. Livraison gratuite et commande WhatsApp." },
    ],
  }),
  component: HomePage,
});

const CATS = [
  { slug: "fast-food", label: "Fast Food", Icon: Beef, color: "var(--color-terracotta)", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { slug: "patisseries", label: "Pâtisseries", Icon: Croissant, color: "var(--color-caramel)", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
  { slug: "plats", label: "Plats", Icon: UtensilsCrossed, color: "var(--color-sage)", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop" },
  { slug: "desserts", label: "Desserts", Icon: Cake, color: "var(--color-rose)", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop" },
  { slug: "boissons", label: "Boissons", Icon: CupSoda, color: "var(--color-gold)", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop" },
];

const TESTI = [
  { name: "Aïcha K.", loc: "Baguida", quote: "Les burgers sont délicieux et la livraison toujours rapide. Une adresse à retenir !" },
  { name: "Komla A.", loc: "Lomé", quote: "Les pâtisseries sont juste incroyables. Le pain au chocolat me transporte à Paris." },
  { name: "Sandra D.", loc: "Baguida", quote: "Service au top, plats généreux. Le gâteau commandé pour mon anniversaire était parfait." },
];

function HomePage() {
  const featured = ["ff1", "pl4", "de1"].map((id) => MENU.find((m) => m.id === id)!);
  const patis = MENU.filter((m) => m.category === "patisseries").slice(0, 4);

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-screen pt-[72px] section-angle-bottom overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[55%_45%] gap-8 items-center min-h-[calc(100vh-72px)] py-12">
          <div className="space-y-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-xs">
              <Truck size={14} /> Livraison gratuite · Baguida, Lomé
            </motion.div>
            <div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="brand-script text-[72px] md:text-[96px] leading-none mb-3">Fast Baker</motion.h1>
              <div className="font-[var(--font-heading)] italic text-[var(--color-white)] text-3xl md:text-5xl space-y-1">
                {["Rapide.", "Artisanal.", "Gourmand."].map((w, i) => (
                  <motion.div key={w} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}>
                    {w}
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[#aaa] text-base max-w-md">
              Burgers, pâtisseries, plats du jour — livrés chez vous à Baguida.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-3">
              <Link to="/menu" className="btn-gold"><ShoppingCart size={16} /> Commander maintenant</Link>
              <Link to="/menu" className="btn-outline-gold">Voir le menu</Link>
            </motion.div>
            <div className="flex flex-wrap gap-5 text-[13px] text-[#bbb] pt-2">
              <span className="inline-flex items-center gap-1.5"><ChefHat size={14} className="text-[var(--color-gold)]" /> Qualité artisanale</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-[var(--color-gold)]" /> ~15 min</span>
              <span className="inline-flex items-center gap-1.5"><Star size={14} className="text-[var(--color-gold)]" fill="currentColor" /> 4.9/5</span>
            </div>
          </div>

          <div className="relative h-[420px] md:h-[560px]">
            <motion.div className="absolute inset-0 animate-floaty rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=1100&fit=crop" alt="Burger gourmand" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[var(--color-gold)]/10" />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />
      </section>

      {/* CATEGORIES */}
      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-[var(--font-heading)] mb-10 text-center">Que désirez-vous ?</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 md:grid md:grid-cols-5">
            {CATS.map((c, i) => (
              <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to="/menu" search={{ cat: c.slug }} className="group block min-w-[180px] md:min-w-0">
                  <div className="relative rounded-2xl overflow-hidden bg-[var(--color-bg)] h-[240px] border border-transparent hover:border-[var(--color-gold)] transition-all hover:-translate-y-1 shadow-[var(--shadow-card)]">
                    <div className="h-[60%] overflow-hidden">
                      <img src={c.image} alt={c.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <div className="h-[40%] p-3 flex items-center gap-2">
                      <c.Icon size={22} style={{ color: c.color }} />
                      <span className="font-[var(--font-heading)] text-xl text-white">{c.label}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-10">
            <h2 className="text-4xl md:text-5xl font-[var(--font-heading)] text-[var(--color-gold)]">Les Incontournables</h2>
            <span className="px-3 py-1 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] text-xs uppercase">Populaires ce soir</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((it) => <MenuItemCard key={it.id} item={it} />)}
          </div>
        </div>
      </section>

      {/* PATISSERIES SECTION (cream) */}
      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[45%_55%] gap-10 items-center">
          <div className="rounded-3xl overflow-hidden h-[420px]">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=900&fit=crop" alt="Pâtisseries" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-[var(--font-heading)] mb-3">Pâtisseries & Douceurs</h2>
            <p className="text-[#555] mb-6">Viennoiseries, gâteaux et créations du jour, préparés avec soin chaque matin.</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3">
              {patis.map((p) => (
                <div key={p.id} className="min-w-[160px] bg-white rounded-xl overflow-hidden shadow">
                  <img src={p.image} alt={p.name} className="w-full h-24 object-cover" />
                  <div className="p-2">
                    <div className="text-sm font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-[var(--color-terracotta)] font-bold">{p.price.toLocaleString("fr-FR")} FCFA</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/menu" search={{ cat: "patisseries" }} className="inline-flex items-center gap-2 mt-6 text-[var(--color-terracotta)] font-semibold">
              Voir toutes les pâtisseries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOM CAKE CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="card-gold relative overflow-hidden p-8 md:p-12 grid lg:grid-cols-[60%_40%] gap-8 items-center shimmer-line">
            <div>
              <Cake size={48} className="text-[var(--color-gold)] mb-4" />
              <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] text-[var(--color-gold)] mb-4">Gâteaux Personnalisés</h2>
              <p className="text-[#aaa] mb-6">Mariages, anniversaires, baptêmes, graduations... Confiez-nous votre commande événement.</p>
              <div className="flex flex-wrap gap-2">
                {["Livraison possible", "Sur devis", "48h avant"].map((p) => (
                  <span key={p} className="px-3 py-1 rounded-full bg-[var(--color-surface-alt)] text-xs text-[var(--color-white)]">{p}</span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "1535141192574-5d4897c12636", // wedding cake
                  "1578985545062-69928b1d9587", // birthday cake
                  "1578985545062-69928b1d9587", // chocolate cake
                  "1535141192574-5d4897c12636"  // fruit cake
                ].map((id) => (
                  <div key={id} className="aspect-square rounded-xl overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop`} alt="cake" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <Link to="/commande-sur-mesure" className="btn-gold w-full justify-center">Créer ma commande</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT STATS */}
      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { Icon: Truck, value: <>Gratuite</>, label: "Livraison à Baguida" },
            { Icon: Clock, value: <>~15<span className="text-xl">min</span></>, label: "Délai moyen" },
            { Icon: Leaf, value: <><StatCounter value={100} suffix="%" /></>, label: "Ingrédients frais" },
            { Icon: Star, value: <>4.9<span className="text-xl">/5</span></>, label: "Satisfaction client" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <s.Icon size={32} className="mx-auto text-[var(--color-terracotta)] mb-3" />
              <div className="text-4xl font-[var(--font-heading)] text-[var(--color-bordeaux)]">{s.value}</div>
              <div className="text-sm text-[#666] mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-[var(--font-heading)] text-[var(--color-gold)] text-center mb-12">Ce que disent nos clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTI.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-dark p-6">
                <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, n) => <Star key={n} size={16} className="text-[var(--color-gold)]" fill="currentColor" />)}</div>
                <p className="italic text-sm text-white mb-4 leading-relaxed">"{t.quote}"</p>
                <div className="text-sm font-bold text-[#bbb]">{t.name}</div>
                <div className="text-xs text-[#777]">{t.loc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[var(--color-cream)] text-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-[var(--font-heading)] text-center mb-14">Simple, rapide, savoureux.</h2>
          <div className="grid md:grid-cols-3 gap-10 relative">
            {[
              { Icon: UtensilsCrossed, t: "Choisissez vos plats", d: "Parcourez notre menu et ajoutez au panier." },
              { Icon: MessageCircle, t: "Confirmez via WhatsApp", d: "Le récapitulatif est envoyé instantanément." },
              { Icon: Truck, t: "Livraison gratuite", d: "Livré à votre porte à Baguida." },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[120px] font-[var(--font-heading)] text-[var(--color-gold)]/20 leading-none">{i + 1}</div>
                <div className="relative w-16 h-16 rounded-full bg-[var(--color-gold)] flex items-center justify-center mx-auto mb-4">
                  <s.Icon size={28} className="text-[#1A1A1A]" />
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl mb-2">{s.t}</h3>
                <p className="text-sm text-[#666]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
