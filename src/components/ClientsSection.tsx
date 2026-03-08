import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import bpdbLogo from "@/assets/clients/bpdb.png";
import bwdbLogo from "@/assets/clients/bwdb.png";
import jfclLogo from "@/assets/clients/jfcl.png";
import erlLogo from "@/assets/clients/erl.png";
import nscLogo from "@/assets/clients/nsc.png";
import kpmlLogo from "@/assets/clients/kpml.png";
import apsclLogo from "@/assets/clients/apscl.jpg";
import chhatakLogo from "@/assets/clients/chhatak.png";
import sbagroLogo from "@/assets/clients/sbagro.png";
import carewLogo from "@/assets/clients/carew.png";

const clients = [
  { name: "Bangladesh Power Development Board (BPDB)", logo: bpdbLogo },
  { name: "Bangladesh Water Development Board (BWDB)", logo: bwdbLogo },
  { name: "Jamuna Fertilizer Company Ltd.", logo: jfclLogo },
  { name: "Eastern Refinery Ltd.", logo: erlLogo },
  { name: "National Sports Council", logo: nscLogo },
  { name: "Karnaphuli Paper Mills Ltd.", logo: kpmlLogo },
  { name: "Ashuganj Power Station", logo: apsclLogo },
  { name: "Chhatak Cement Company Ltd.", logo: chhatakLogo },
  { name: "SB Agro Chemical Industries", logo: sbagroLogo },
  { name: "Carew & Co. (BD) Ltd.", logo: carewLogo },
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
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center min-h-[120px] gap-2 hover:border-orange/40 hover:scale-105 hover:shadow-lg hover:shadow-orange/5 transition-all duration-300 cursor-default"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-14 h-14 object-contain"
                loading="lazy"
              />
              <span className="text-primary-foreground text-xs font-medium leading-tight">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
