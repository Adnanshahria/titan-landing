import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { projects as defaultProjects, Project } from "@/data/projects";

export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutText: string;
  aboutHighlight: string;
  aboutBullets: string[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  projectsTitle: string;
  projectsSubtitle: string;
  clientsTitle: string;
  projects: Project[];
  servicesTitle: string;
  servicesSubtitle: string;
  services: { title: string; desc: string }[];
  clients: string[];
  testimonials: { quote: string; name: string; title: string; org: string; projectSlug?: string }[];
  heroStats: { value: number; suffix: string; label: string }[];
  whyChooseUs: { yearsCount: string; yearsLabel: string; points: string[] };
  contactFax: string;
  contactPhone2: string;
  contactOfficeHours: string;
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
  aboutTitle: "About the Company",
  aboutSubtitle: "Engineering Excellence Since 1995",
  aboutText: "Techno-Tech Engineering Ltd. was established in 1995 as a Mechanical Construction firm by a group of competent and qualified engineers. Since inception, the company has successfully completed sophisticated projects in Gas Pipeline, Storage Tanks, Power Plant, Oil Refinery & Industrial sectors.",
  aboutHighlight: "Certified Boiler License Holder for Industrial Boiler Works — with vast expertise in refractory, insulation, fabrication, installation and welding works.",
  aboutBullets: [
    "JVCA partnerships with local & international firms",
    "Prime contractor for nationwide energy & industry projects",
  ],
  contactEmail: "info@technotechengineering.com",
  contactPhone: "01711-003072",
  contactAddress: "106/A, Green Road (3rd Floor), Farmgate, Corner Place Super Market, Dhaka-1205",
  heroStats: [
    { value: 30, suffix: "+", label: "Years Experience" },
    { value: 46, suffix: "+", label: "Projects Completed" },
    { value: 15, suffix: "+", label: "Government Clients" },
    { value: 1995, suffix: "", label: "Established" },
  ],
  contactFax: "+880-2-9568037",
  contactPhone2: "01685-204406",
  contactOfficeHours: "Sun–Thu, 9AM–6PM",
  projectsTitle: "Major Reference Projects",
  projectsSubtitle: "Trusted by Bangladesh's largest public and private sector organizations",
  projects: defaultProjects,
  servicesTitle: "Our Core Services",
  servicesSubtitle: "End-to-end engineering solutions across Bangladesh's energy and industrial sectors",
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
  whyChooseUs: {
    yearsCount: "30",
    yearsLabel: "Years of Engineering Excellence",
    points: [
      "Nationwide project execution from Dhaka to Chittagong",
      "JVCA-capable with international engineering firms",
      "Government certified & boiler licensed contractor",
      "Experienced team of qualified mechanical engineers",
    ],
  },
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
