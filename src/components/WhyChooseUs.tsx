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
    <section className="grid lg:grid-cols-2">
      <div ref={ref} className="bg-dark-bg flex items-center justify-center py-20 px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="font-heading text-8xl md:text-9xl font-bold text-orange">30</span>
          <p className="font-heading text-2xl text-primary-foreground uppercase mt-4">Years of Engineering Excellence</p>
        </motion.div>
      </div>
      <div className="bg-steel-light flex items-center py-20 px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground uppercase mb-8">Why Choose Us</h2>
          {points.map((p) => (
            <div key={p} className="flex items-start gap-4">
              <CheckCircle className="text-orange shrink-0 mt-0.5" size={22} />
              <span className="text-foreground">{p}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
