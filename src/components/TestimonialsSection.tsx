import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSiteContent } from "@/context/SiteContext";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const navigate = useNavigate();
  const { content } = useSiteContent();

  const testimonials = content.testimonials;

  useEffect(() => {
    if (!autoplay || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay, testimonials.length]);

  const go = (dir: number) => {
    setAutoplay(false);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

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
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                if (t.projectSlug) navigate(`/projects/${t.projectSlug}`);
              }}
              className={`glass-card rounded-2xl p-6 md:p-8 gradient-border ${
                t.projectSlug ? "cursor-pointer hover:border-orange/40 hover:shadow-lg hover:shadow-orange/10 transition-all" : ""
              }`}
            >
              <Quote className="text-orange/30 mb-3" size={28} />
              <p className="text-primary-foreground text-sm md:text-base leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center text-secondary-foreground font-heading font-bold text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-primary-foreground font-heading font-semibold text-xs uppercase">{t.name}</p>
                    <p className="text-steel text-xs">{t.title}, {t.org}</p>
                  </div>
                </div>
                {t.projectSlug && (
                  <span className="text-orange text-xs font-heading uppercase tracking-wider">
                    View Project →
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

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
