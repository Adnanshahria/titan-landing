import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield } from "lucide-react";
import { useSiteContent } from "@/context/SiteContext";

const CertificationsSection = () => {
  const { content } = useSiteContent();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-20 bg-steel-light rounded-lg">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase heading-accent">{content.certificationsTitle}</h2>
          <p className="mt-6 text-muted-foreground">{content.certificationsSubtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center gradient-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange/10 to-orange/5 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-orange" size={32} />
              </div>
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
