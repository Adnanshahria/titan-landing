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
    <section className="py-10 bg-dark-bg noise-overlay relative overflow-hidden rounded-2xl">
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
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center text-secondary-foreground font-heading font-bold text-xs">
                      {t.name.charAt(0)}
                    </div>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-[2px]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
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
