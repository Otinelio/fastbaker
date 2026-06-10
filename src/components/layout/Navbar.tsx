import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Menu" },
  { to: "/commande-sur-mesure", label: "Sur Mesure" },
  { to: "/a-propos", label: "À Propos" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const openCart = useCartStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-[1000] transition-all duration-300"
        style={{
          background: scrolled ? "rgba(26,26,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto h-[72px] px-5 md:px-8 flex items-center justify-between">
          <Link to="/" className="brand-script text-[32px] leading-none">Fast Baker</Link>

          <nav className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="relative text-[14px] tracking-[0.04em] transition-colors"
                  style={{ color: active ? "var(--color-gold)" : "var(--color-white)" }}
                >
                  {l.label}
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-2 h-0.5 rounded-full bg-[var(--color-gold)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={openCart} className="btn-gold relative !py-2.5 !px-5">
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Commander</span>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-bordeaux)] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{count}</span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-[var(--color-gold)] p-2">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[2000] bg-[#1A1A1A] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="brand-script text-[32px]">Fast Baker</span>
              <button onClick={() => setMobileOpen(false)} className="text-[var(--color-gold)]"><X size={28} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="font-[var(--font-heading)] text-[40px] leading-none" style={{ color: pathname === l.to ? "var(--color-gold)" : "var(--color-white)" }}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <button onClick={() => { setMobileOpen(false); openCart(); }} className="btn-gold w-full justify-center !py-4 !text-base">
                <ShoppingCart size={18} /> Commander
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
