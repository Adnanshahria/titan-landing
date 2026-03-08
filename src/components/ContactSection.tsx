import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-10 bg-dark-bg noise-overlay relative rounded-2xl">
      <div ref={ref} className="container mx-auto px-4 relative z-10 max-w-2xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase text-center mb-8 heading-accent">Get In Touch</h2>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input required placeholder="Full Name" className="glass-card text-primary-foreground rounded-xl px-3 py-2.5 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
            <input placeholder="Company Name" className="glass-card text-primary-foreground rounded-xl px-3 py-2.5 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input required type="tel" placeholder="Phone" className="glass-card text-primary-foreground rounded-xl px-3 py-2.5 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
            <input required type="email" placeholder="Email" className="glass-card text-primary-foreground rounded-xl px-3 py-2.5 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
          </div>
          <select className="w-full glass-card text-steel rounded-xl px-3 py-2.5 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all">
            <option>Select Project Type</option>
            <option>Power Plant</option>
            <option>Civil & Mechanical</option>
            <option>Industrial Equipment</option>
            <option>Refractory & Insulation</option>
            <option>Other</option>
          </select>
          <textarea required rows={3} placeholder="Your Message" className="w-full glass-card text-primary-foreground rounded-xl px-3 py-2.5 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all resize-none" />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold py-2.5 rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange/20"
          >
            {submitted ? "Inquiry Sent ✓" : "Send Inquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
