import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-orange">
      {count}{suffix}
    </span>
  );
};

const HeroSection = () => {
  const { content } = useSiteContent();
  const { t } = useLanguage();
  const stats = content.heroStats;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-lg">
      <motion.img style={{ y: bgY }} src={heroBg} alt="Industrial power plant" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
      <motion.div style={{ y: contentY }} className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground uppercase leading-tight max-w-5xl mx-auto"
        >
          {t("hero.headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-steel text-lg md:text-xl max-w-2xl mx-auto"
        >
          {t("hero.subheadline")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange/20"
          >
            {t("hero.viewProjects")} <ArrowRight size={18} />
          </a>
          <button className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-navy font-heading font-semibold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 backdrop-blur-sm">
            <Download size={18} /> {t("hero.downloadProfile")}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl py-3 px-3 flex flex-col items-center">
              <Counter target={s.value} suffix={s.suffix} />
              <span className="text-steel text-sm mt-2 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
