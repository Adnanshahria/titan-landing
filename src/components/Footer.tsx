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
    <footer className="bg-footer-bg border-t-2 border-orange/30">
      <div className="container mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 text-primary-foreground mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center">
                <ArrowRight className="text-secondary-foreground" size={14} />
              </div>
              <span className="font-heading text-lg font-bold uppercase">Techno-Tech Engineering Ltd.</span>
            </div>
            <p className="text-steel text-sm">Engineering Bangladesh's Industrial Future</p>
          </div>
          <div>
            <h4 className="font-heading text-primary-foreground font-semibold uppercase mb-4">Contact</h4>
            <ul className="space-y-3">
              {contactItems.map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  <item.icon className="text-orange shrink-0 mt-0.5" size={14} />
                  <span className="text-steel text-xs">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-primary-foreground font-semibold uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-steel text-sm">
              {["Home", "About", "Services", "Projects", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-orange transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-primary-foreground font-semibold uppercase mb-4">Services</h4>
            <ul className="space-y-2 text-steel text-sm">
              {["Power Plant Works", "Civil & Mechanical", "Industrial Equipment", "Refractory & Insulation"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-steel/10 py-5">
        <p className="text-center text-steel text-xs">© 2025 Techno-Tech Engineering Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
