import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import bpdbLogo from "@/assets/clients/bpdb.png";
import bwdbLogo from "@/assets/clients/bwdb.png";
import apsclLogo from "@/assets/clients/apscl.jpg";

const clients = [
  { name: "Bangladesh Power Development Board (BPDB)", logo: bpdbLogo, url: "https://bpdb.gov.bd" },
  { name: "Bangladesh Water Development Board (BWDB)", logo: bwdbLogo, url: "https://www.bwdb.gov.bd" },
  { name: "Jamuna Fertilizer Company Ltd.", logo: null, url: "https://jfcl.gov.bd" },
  { name: "Eastern Refinery Ltd.", logo: null, url: "https://erl.gov.bd" },
  { name: "National Sports Council", logo: null, url: "https://nsc.gov.bd" },
  { name: "Karnaphuli Paper Mills Ltd.", logo: null, url: null },
  { name: "Ashuganj Power Station", logo: apsclLogo, url: "https://apscl.gov.bd" },
  { name: "Chhatak Cement Company Ltd.", logo: null, url: null },
  { name: "SB Agro Chemical Industries", logo: null, url: null },
  { name: "Carew & Co. (BD) Ltd.", logo: null, url: null },
];

const ShimmerPlaceholder = () => (
  <div className="w-14 h-14 rounded-lg bg-steel/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-steel/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
  </div>
);

const ClientsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="py-20 bg-dark-bg noise-overlay relative rounded-2xl">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase text-center mb-14 heading-accent">
          Trusted by Bangladesh's Leading Organizations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {clients.map((c, i) => {
            const Wrapper = c.url ? "a" : "div";
            const linkProps = c.url
              ? { href: c.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Wrapper
                  {...linkProps}
                  className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center min-h-[120px] gap-2 hover:border-orange/40 hover:scale-105 hover:shadow-lg hover:shadow-orange/5 transition-all duration-300 cursor-pointer block"
                >
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-14 h-14 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <ShimmerPlaceholder />
                  )}
                  <span className="text-primary-foreground text-xs font-medium leading-tight">{c.name}</span>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
