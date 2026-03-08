import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Building2, Cog, Flame, HardHat, Truck } from "lucide-react";

const services = [
  { icon: Zap, title: "Power Plant Works", desc: "Boiler, Turbine, Generator, Furnace & Chimney erection, commissioning and revamping for captive and grid power plants." },
  { icon: Building2, title: "Civil & Mechanical Erection", desc: "Factory shed design, steel structure, steel storage tanks, steel silo manufacturing and erection works." },
  { icon: Cog, title: "Industrial Equipment", desc: "Distillation tower, reformer, ETP plant, water treatment plant, cooling tower — design, installation & commissioning." },
  { icon: Flame, title: "Refractory & Insulation", desc: "Specialized refractory lining and insulation works for boilers, furnaces and high-temperature industrial equipment." },
  { icon: HardHat, title: "Manpower Supply", desc: "Supply of coded and Government-approved qualified technicians and construction management services nationwide." },
  { icon: Truck, title: "Transport & Handling", desc: "Inland transportation and heavy equipment handling works for large-scale industrial and infrastructure projects." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-dark-bg noise-overlay relative">
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase heading-accent">Our Core Services</h2>
          <p className="mt-6 text-steel max-w-2xl mx-auto">
            End-to-end engineering solutions across Bangladesh's energy and industrial sectors
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card rounded-2xl p-6 gradient-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange/5 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className="text-secondary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground uppercase" style={{ fontFamily: "'Abril Fatface', serif" }}>{s.title}</h3>
              </div>
              <p className="text-steel text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
