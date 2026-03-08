import { ArrowRight, MapPin, Phone, Mail, Clock, Printer } from "lucide-react";
import { useSiteContent } from "@/context/SiteContext";

const Footer = () => {
  const { content } = useSiteContent();
  const phone2 = content.contactPhone2 || "01685-204406";
  const fax = content.contactFax || "+880-2-9568037";
  const hours = content.contactOfficeHours || "Sun–Thu, 9AM–6PM";

  const contactItems = [
    { icon: MapPin, text: content.contactAddress },
    { icon: Phone, text: `${content.contactPhone} | ${phone2}` },
    { icon: Printer, text: `Fax: ${fax}` },
    { icon: Mail, text: content.contactEmail },
    { icon: Clock, text: `Office Hours: ${hours}` },
  ];

  return (
    <footer className="bg-footer-bg overflow-hidden">
      <div className="container mx-auto px-6 pt-12 pb-8">
        {/* Top: Logo & tagline */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 text-primary-foreground mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center shadow-lg shadow-orange/20">
              <ArrowRight className="text-secondary-foreground" size={15} />
            </div>
            <span className="font-heading text-xl font-bold uppercase tracking-wide">Techno-Tech Engineering Ltd.</span>
          </div>
          <p className="text-steel text-sm">Engineering Bangladesh's Industrial Future</p>
        </div>

        {/* Columns */}
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="glass-card rounded-lg p-5">
            <h4 className="font-heading text-primary-foreground font-semibold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" /> Contact
            </h4>
            <ul className="space-y-2.5">
              {contactItems.map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  <item.icon className="text-orange shrink-0 mt-0.5" size={13} />
                  <span className="text-steel text-[11px] leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-lg p-5">
            <h4 className="font-heading text-primary-foreground font-semibold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" /> Quick Links
            </h4>
            <ul className="space-y-2 text-[11px]">
              {["Home", "About", "Services", "Projects", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-steel hover:text-orange transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-lg p-5">
            <h4 className="font-heading text-primary-foreground font-semibold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" /> Services
            </h4>
            <ul className="space-y-2 text-steel text-[11px]">
              {["Power Plant Works", "Civil & Mechanical", "Industrial Equipment", "Refractory & Insulation"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-steel/10 py-4 mx-6">
        <p className="text-center text-steel/50 text-[10px] tracking-wider uppercase">© 2025 Techno-Tech Engineering Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
