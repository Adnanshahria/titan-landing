import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Techno-Tech delivered our 100MW power plant project on time with exceptional quality. Their expertise in boiler erection and commissioning is unmatched in Bangladesh.",
    name: "Md. Rafiqul Islam",
    title: "Chief Engineer",
    org: "Bangladesh Power Development Board",
  },
  {
    quote: "We've partnered with Techno-Tech on multiple cement mill overhaul projects. Their technical competence and safety standards are world-class.",
    name: "Kamal Uddin Ahmed",
    title: "Plant Manager",
    org: "Chhatak Cement Company Ltd.",
  },
  {
    quote: "The urea stripper replacement was a complex job. Techno-Tech's team handled it with precision, minimizing our downtime significantly.",
    name: "Engr. Shahidul Haque",
    title: "Project Director",
    org: "Jamuna Fertilizer Company Ltd.",
  },
  {
    quote: "From refinery furnace revamping to pipeline works, Techno-Tech has been our go-to contractor for over a decade. Reliable and professional.",
    name: "Dr. Anisur Rahman",
    title: "Technical Advisor",
    org: "Eastern Refinery Ltd.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const go = (dir: number) => {
    setAutoplay(false);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-dark-bg noise-overlay relative overflow-hidden rounded-2xl">
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase heading-accent">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-steel max-w-2xl mx-auto">
            Trusted partnerships built on decades of engineering excellence
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Cards */}
          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: i === current ? 1 : 0,
                  scale: i === current ? 1 : 0.95,
                  y: i === current ? 0 : 20,
                  position: i === current ? "relative" as const : "absolute" as const,
                }}
                transition={{ duration: 0.5 }}
                className={`glass-card rounded-2xl p-6 md:p-8 gradient-border ${
                  i === current ? "relative" : "absolute inset-0 pointer-events-none"
                }`}
              >
                <Quote className="text-orange/30 mb-3" size={28} />
                <p className="text-primary-foreground text-sm md:text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center text-secondary-foreground font-heading font-bold text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-primary-foreground font-heading font-semibold text-xs uppercase">{t.name}</p>
                    <p className="text-steel text-xs">{t.title}, {t.org}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full bg-navy/80 backdrop-blur-sm border border-steel/10 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gradient-to-r from-orange to-orange-glow" : "w-2 bg-steel/30 hover:bg-steel/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full bg-navy/80 backdrop-blur-sm border border-steel/10 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
