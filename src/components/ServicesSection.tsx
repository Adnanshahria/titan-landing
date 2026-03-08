import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Building2, Cog, Flame, HardHat, Truck } from "lucide-react";
import { useSiteContent } from "@/context/SiteContext";

const icons = [Zap, Building2, Cog, Flame, HardHat, Truck];

const ServicesSection = () => {
  const { content } = useSiteContent();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-dark-bg noise-overlay relative rounded-lg">
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase heading-accent">{content.servicesTitle}</h2>
          <p className="mt-6 text-steel max-w-2xl mx-auto">
            {content.servicesSubtitle}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-card rounded-2xl p-6 gradient-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-secondary-foreground" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-foreground uppercase" style={{ fontFamily: "'Abril Fatface', serif" }}>{s.title}</h3>
                </div>
                <p className="text-steel text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
