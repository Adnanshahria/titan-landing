import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Printer } from "lucide-react";
import { useSiteContent } from "@/context/SiteContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const { content } = useSiteContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactItems = [
    { icon: MapPin, text: content.contactAddress },
    { icon: Phone, text: `${content.contactPhone} | ${content.contactPhone2}` },
    { icon: Printer, text: `Fax: ${content.contactFax}` },
    { icon: Mail, text: content.contactEmail },
    { icon: Clock, text: `Office Hours: ${content.contactOfficeHours}` },
  ];

  return (
    <section id="contact" className="py-20 bg-dark-bg noise-overlay relative rounded-2xl">
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase text-center mb-14 heading-accent">Get In Touch</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactItems.map((item) => (
              <div key={item.text} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-orange" size={18} />
                </div>
                <span className="text-steel text-sm mt-2">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
              <input placeholder="Company Name" className="glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="tel" placeholder="Phone" className="glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
              <input required type="email" placeholder="Email" className="glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all" />
            </div>
            <select className="w-full glass-card text-steel rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all">
              <option>Select Project Type</option>
              <option>Power Plant</option>
              <option>Civil & Mechanical</option>
              <option>Industrial Equipment</option>
              <option>Refractory & Insulation</option>
              <option>Other</option>
            </select>
            <textarea required rows={4} placeholder="Your Message" className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all resize-none" />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange/20"
            >
              {submitted ? "Inquiry Sent ✓" : "Send Inquiry"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
