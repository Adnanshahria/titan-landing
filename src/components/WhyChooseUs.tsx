import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const points = [
  "Nationwide project execution from Dhaka to Chittagong",
  "JVCA-capable with international engineering firms",
  "Government certified & boiler licensed contractor",
  "Experienced team of qualified mechanical engineers",
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="bg-dark-bg noise-overlay relative flex items-center justify-center py-12 px-6 rounded-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center relative z-10"
            >
              <span className="font-heading text-7xl md:text-8xl font-bold bg-gradient-to-b from-orange to-orange-glow bg-clip-text text-transparent">30</span>
              <p className="font-heading text-xl text-primary-foreground uppercase mt-3">Years of Engineering Excellence</p>
            </motion.div>
          </div>
          <div className="bg-steel-light flex items-center py-12 px-6 lg:px-10 rounded-2xl">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5"
            >
              <h2 className="font-heading text-2xl font-bold text-foreground uppercase mb-6">Why Choose Us</h2>
              {points.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="text-orange" size={16} />
                  </div>
                  <span className="text-foreground text-sm">{p}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
