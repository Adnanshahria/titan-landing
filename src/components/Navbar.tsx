import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Languages } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/context/LanguageContext";

const navKeys = ["Home", "Services", "Projects", "Clients", "Certifications", "Contact"] as const;

const navTranslationMap: Record<string, string> = {
  Home: "nav.home",
  Services: "nav.services",
  Projects: "nav.projects",
  Clients: "nav.clients",
  Certifications: "nav.certifications",
  Contact: "nav.contact",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const showBg = scrolled || !isHome;
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navKeys.map((l) => l.toLowerCase());
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate("/#" + id.toLowerCase());
      return;
    }
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-2 left-3 right-3 z-50 transition-all duration-500 rounded-2xl ${
        showBg
          ? "bg-navy/95 backdrop-blur-md shadow-2xl shadow-black/20 py-2"
          : "bg-transparent py-5"
      }`}
    >
      {showBg && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange to-transparent opacity-40" />
      )}

      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <a href="/" onClick={(e) => { e.preventDefault(); if (isHome) { scrollTo("home"); } else { navigate("/"); } }} className="flex items-center gap-3 text-primary-foreground group">
          <img src={logoImg} alt="Techno-Tech Engineering Logo" className="w-10 h-10 object-contain" />
          <div className="h-6 w-[1px] bg-orange/40" />
          <span className="font-logo text-base sm:text-lg tracking-wider">TTEL</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navKeys.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="relative text-sm font-medium px-4 py-2 transition-colors"
            >
              <span className={`transition-colors duration-300 ${
                activeSection === l ? "text-orange" : "text-steel hover:text-primary-foreground"
              }`}>
                {t(navTranslationMap[l] as any)}
              </span>
              {activeSection === l && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-orange to-orange-glow rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-steel/20 text-steel hover:text-orange hover:border-orange/30 transition-all text-xs font-heading font-semibold uppercase tracking-wider"
            title={lang === "en" ? "বাংলায় দেখুন" : "Switch to English"}
          >
            <Languages size={14} />
            {lang === "en" ? "বাং" : "EN"}
          </button>

          <a href="tel:01711003072" className="flex items-center gap-2 text-steel text-sm hover:text-primary-foreground transition-colors">
            <div className="w-7 h-7 rounded-full bg-orange/10 flex items-center justify-center">
              <Phone size={12} className="text-orange" />
            </div>
            01711-003072
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 animate-gentle-pulse hover:shadow-lg hover:shadow-orange/20"
          >
            {t("nav.getQuote")}
          </button>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2 ml-auto">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-steel/20 text-steel text-[10px] font-heading font-semibold uppercase tracking-wider hover:text-orange hover:border-orange/30 transition-all"
          >
            <Languages size={12} />
            {lang === "en" ? "বাং" : "EN"}
          </button>
          <button className="text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} className="scale-y-150" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-navy z-50 lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-steel/10">
                <span className="font-heading text-primary-foreground font-bold uppercase text-sm tracking-wider">{t("nav.menu")}</span>
                <button onClick={() => setMobileOpen(false)} className="text-steel hover:text-primary-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-6 flex flex-col gap-1 flex-1">
                {navKeys.map((l, i) => (
                  <motion.button
                    key={l}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(l)}
                    className={`text-left py-3 px-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === l
                        ? "text-orange bg-orange/10"
                        : "text-steel hover:text-primary-foreground hover:bg-steel/5"
                    }`}
                  >
                    {t(navTranslationMap[l] as any)}
                  </motion.button>
                ))}
              </div>
              <div className="px-6 py-6 border-t border-steel/10 space-y-4">
                <a href="tel:01711003072" className="flex items-center gap-3 text-steel text-sm">
                  <Phone size={14} className="text-orange" /> 01711-003072
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground font-heading font-semibold px-5 py-3 rounded-full text-sm uppercase tracking-wider"
                >
                  {t("nav.getQuote")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
