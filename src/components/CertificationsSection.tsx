import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield } from "lucide-react";

const certs = [
  { name: "Certificate of Incorporation", authority: "Registrar of Joint Stock Companies, Bangladesh", detail: "No. C-111369/13 | 2013" },
  { name: "Boiler License", authority: "Government of Bangladesh", detail: "Industrial Boiler Works License" },
  { name: "Income Tax Registered", authority: "National Board of Revenue, Bangladesh", detail: "TIN: 580489426429" },
  { name: "Final Acceptance Certificate", authority: "Bangladesh Power Development Board", detail: "BPDB Approved Contractor" },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-20 bg-steel-light">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase">Certifications & Credentials</h2>
          <p className="mt-4 text-muted-foreground">Legally registered, certified and government approved</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-sm p-6 text-center border border-orange/20 shadow-md hover:shadow-orange/10 hover:shadow-lg transition-all"
            >
              <Shield className="text-orange mx-auto mb-4" size={40} />
              <h3 className="font-heading text-lg font-semibold text-foreground uppercase mb-2">{c.name}</h3>
              <p className="text-muted-foreground text-xs mb-1">{c.detail}</p>
              <p className="text-muted-foreground text-xs">{c.authority}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
