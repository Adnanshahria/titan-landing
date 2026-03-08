import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import aboutImg from "@/assets/about-img.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-steel-light">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="border-4 border-orange rounded-sm overflow-hidden">
              <img src={aboutImg} alt="Engineers at industrial construction site" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-orange font-heading font-semibold uppercase tracking-widest text-sm">About the Company</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 uppercase">
              Engineering Excellence Since 1995
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Techno-Tech Engineering Ltd. was established in 1995 as a Mechanical Construction firm by a group of competent and qualified engineers. Since inception, the company has successfully completed sophisticated projects in Gas Pipeline, Storage Tanks, Power Plant, Oil Refinery & Industrial sectors.
            </p>
            <div className="mt-6 border-l-4 border-orange bg-card p-4 rounded-r-sm">
              <p className="text-foreground font-medium text-sm leading-relaxed">
                Certified Boiler License Holder for Industrial Boiler Works — with vast expertise in refractory, insulation, fabrication, installation and welding works.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "JVCA partnerships with local & international firms",
                "Prime contractor for nationwide energy & industry projects",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle className="text-orange mt-0.5 shrink-0" size={20} />
                  <span className="text-foreground text-sm">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
