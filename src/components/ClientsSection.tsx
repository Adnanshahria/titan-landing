import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "Bangladesh Power Development Board (BPDB)",
  "Bangladesh Water Development Board (BWDB)",
  "Jamuna Fertilizer Company Ltd.",
  "Eastern Refinery Ltd.",
  "National Sports Council",
  "Karnaphuli Paper Mills Ltd.",
  "Ashuganj Power Station",
  "Chhatak Cement Company Ltd.",
  "SB Agro Chemical Industries",
  "Carew & Co. (BD) Ltd.",
];

const ClientsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="py-20 bg-dark-bg noise-overlay relative">
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase text-center mb-14 heading-accent">
          Trusted by Bangladesh's Leading Organizations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {clients.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 flex items-center justify-center text-center min-h-[80px] hover:border-orange/40 hover:scale-105 hover:shadow-lg hover:shadow-orange/5 transition-all duration-300 cursor-default"
            >
              <span className="text-primary-foreground text-sm font-medium">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
