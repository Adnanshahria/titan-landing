import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { projects as defaultProjects, Project } from "@/data/projects";

export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  aboutHighlight: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  projects: Project[];
  services: { title: string; desc: string }[];
  clients: string[];
  testimonials: { quote: string; name: string; title: string; org: string; projectSlug?: string }[];
  chatbotConfig: {
    groqApiKey: string;
    tursoUrl: string;
    tursoToken: string;
    systemPrompt: string;
  };
}

const defaultContent: SiteContent = {
  heroHeadline: "Bangladesh's Most Trusted Engineering Construction Company",
  heroSubheadline: "30 Years of Excellence in Power, Energy & Industrial Sector",
  aboutText: "Techno-Tech Engineering Ltd. was established in 1995 as a Mechanical Construction firm by a group of competent and qualified engineers. Since inception, the company has successfully completed sophisticated projects in Gas Pipeline, Storage Tanks, Power Plant, Oil Refinery & Industrial sectors.",
  aboutHighlight: "Certified Boiler License Holder for Industrial Boiler Works — with vast expertise in refractory, insulation, fabrication, installation and welding works.",
  contactEmail: "info@technotechengineering.com",
  contactPhone: "01711-003072",
  contactAddress: "106/A, Green Road (3rd Floor), Farmgate, Corner Place Super Market, Dhaka-1205",
  projects: defaultProjects,
  services: [
    { title: "Power Plant Works", desc: "Boiler, Turbine, Generator, Furnace & Chimney erection, commissioning and revamping for captive and grid power plants." },
    { title: "Civil & Mechanical Erection", desc: "Factory shed design, steel structure, steel storage tanks, steel silo manufacturing and erection works." },
    { title: "Industrial Equipment", desc: "Distillation tower, reformer, ETP plant, water treatment plant, cooling tower — design, installation & commissioning." },
    { title: "Refractory & Insulation", desc: "Specialized refractory lining and insulation works for boilers, furnaces and high-temperature industrial equipment." },
    { title: "Manpower Supply", desc: "Supply of coded and Government-approved qualified technicians and construction management services nationwide." },
    { title: "Transport & Handling", desc: "Inland transportation and heavy equipment handling works for large-scale industrial and infrastructure projects." },
  ],
  clients: [
    "Bangladesh Power Development Board (BPDB)",
    "Bangladesh Water Development Board (BWDB)",
    "Jamuna Fertilizer Company Ltd.",
    "Eastern Refinery Ltd.",
    "National Sports Council",
    "Karnaphuli Paper Mills Ltd.",
    "Ashuganj Power Station",
    "Chhatak Cement Company Ltd.",
    "SB Agro Chemical Industries",
    "Carew & Co. (BD) Ltd.",
  ],
  testimonials: [
    { quote: "Techno-Tech delivered our 100MW power plant project on time with exceptional quality.", name: "Md. Rafiqul Islam", title: "Chief Engineer", org: "BPDB", projectSlug: "dohazari-100mw-power-plant" },
    { quote: "We've partnered with Techno-Tech on multiple cement mill overhaul projects.", name: "Kamal Uddin Ahmed", title: "Plant Manager", org: "Chhatak Cement", projectSlug: "chhatak-cement-mill-repair" },
    { quote: "The urea stripper replacement was handled with precision, minimizing downtime.", name: "Engr. Shahidul Haque", title: "Project Director", org: "Jamuna Fertilizer", projectSlug: "jamuna-fertilizer-urea-stripper" },
    { quote: "Techno-Tech has been our go-to contractor for over a decade.", name: "Dr. Anisur Rahman", title: "Technical Advisor", org: "Eastern Refinery", projectSlug: "eastern-refinery-distillation" },
  ],
  chatbotConfig: {
    groqApiKey: "",
    tursoUrl: "",
    tursoToken: "",
    systemPrompt: `You are an AI assistant for Techno-Tech Engineering Ltd., a Bangladeshi industrial engineering company established in 1995. You help visitors learn about our services, projects, certifications, and contact information. Be professional, helpful and concise. Answer in the context of heavy engineering, power plants, refineries, and industrial construction in Bangladesh.`,
  },
};

interface SiteContextType {
  content: SiteContent;
  updateContent: (updates: Partial<SiteContent>) => void;
}

const SiteContext = createContext<SiteContextType>({
  content: defaultContent,
  updateContent: () => {},
});

export const useSiteContent = () => useContext(SiteContext);

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem("site-content");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultContent, ...parsed, projects: defaultContent.projects };
      }
    } catch {}
    return defaultContent;
  });

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...updates };
      const { projects: _p, ...toSave } = next;
      localStorage.setItem("site-content", JSON.stringify(toSave));
      return next;
    });
  }, []);

  return <SiteContext.Provider value={{ content, updateContent }}>{children}</SiteContext.Provider>;
};
