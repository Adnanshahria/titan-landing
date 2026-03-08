import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Printer } from "lucide-react";

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
    <section id="contact" className="py-20 bg-dark-bg">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase text-center mb-14">Get In Touch</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, text: "106/A, Green Road (3rd Floor), Farmgate, Corner Place Super Market, Dhaka-1205" },
              { icon: Phone, text: "01711-003072 | 01685-204406" },
              { icon: Printer, text: "Fax: +880-2-9568037" },
              { icon: Mail, text: "info@technotechengineering.com" },
              { icon: Clock, text: "Office Hours: Sun–Thu, 9AM–6PM" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4">
                <item.icon className="text-orange shrink-0 mt-1" size={20} />
                <span className="text-steel text-sm">{item.text}</span>
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
              <input required placeholder="Full Name" className="bg-navy-card border border-steel/20 text-primary-foreground rounded-sm px-4 py-3 text-sm focus:border-orange focus:outline-none transition-colors" />
              <input placeholder="Company Name" className="bg-navy-card border border-steel/20 text-primary-foreground rounded-sm px-4 py-3 text-sm focus:border-orange focus:outline-none transition-colors" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="tel" placeholder="Phone" className="bg-navy-card border border-steel/20 text-primary-foreground rounded-sm px-4 py-3 text-sm focus:border-orange focus:outline-none transition-colors" />
              <input required type="email" placeholder="Email" className="bg-navy-card border border-steel/20 text-primary-foreground rounded-sm px-4 py-3 text-sm focus:border-orange focus:outline-none transition-colors" />
            </div>
            <select className="w-full bg-navy-card border border-steel/20 text-steel rounded-sm px-4 py-3 text-sm focus:border-orange focus:outline-none transition-colors">
              <option>Select Project Type</option>
              <option>Power Plant</option>
              <option>Civil & Mechanical</option>
              <option>Industrial Equipment</option>
              <option>Refractory & Insulation</option>
              <option>Other</option>
            </select>
            <textarea required rows={4} placeholder="Your Message" className="w-full bg-navy-card border border-steel/20 text-primary-foreground rounded-sm px-4 py-3 text-sm focus:border-orange focus:outline-none transition-colors resize-none" />
            <button
              type="submit"
              className="w-full bg-orange hover:bg-orange-glow text-secondary-foreground font-heading font-semibold py-3 rounded-sm uppercase tracking-wider transition-colors"
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
