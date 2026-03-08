import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ArrowRight } from "lucide-react";

const navLinks = ["Home", "Services", "Projects", "Clients", "Certifications", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg py-3" : "bg-navy/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#home" onClick={() => scrollTo("home")} className="flex items-center gap-2 text-primary-foreground">
          <ArrowRight className="text-orange" size={20} />
          <span className="font-heading text-lg sm:text-xl font-bold tracking-wide uppercase">
            Techno-Tech Engineering Ltd.
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-steel text-sm font-medium hover:text-orange transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:01711003072" className="flex items-center gap-2 text-steel text-sm">
            <Phone size={14} className="text-orange" /> 01711-003072
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="bg-orange hover:bg-orange-glow text-secondary-foreground font-heading font-semibold px-5 py-2 rounded-sm text-sm uppercase tracking-wider transition-colors animate-gentle-pulse"
          >
            Get a Quote
          </button>
        </div>

        <button className="lg:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-navy overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="text-steel text-left py-2 hover:text-orange transition-colors"
                >
                  {l}
                </button>
              ))}
              <a href="tel:01711003072" className="flex items-center gap-2 text-steel text-sm py-2">
                <Phone size={14} className="text-orange" /> 01711-003072
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="bg-orange text-secondary-foreground font-heading font-semibold px-5 py-2 rounded-sm text-sm uppercase tracking-wider mt-2"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
