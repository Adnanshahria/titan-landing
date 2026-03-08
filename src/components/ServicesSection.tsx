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
    <section id="services" className="py-20 bg-dark-bg">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase">Our Core Services</h2>
          <p className="mt-4 text-steel max-w-2xl mx-auto">
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
              className="group bg-navy-card rounded-sm p-6 border-t-2 border-transparent hover:border-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <s.icon className="text-orange mb-4" size={36} />
              <h3 className="font-heading text-xl font-semibold text-primary-foreground uppercase mb-3">{s.title}</h3>
              <p className="text-steel text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
