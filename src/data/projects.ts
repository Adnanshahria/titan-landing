import dohazariImg from "@/assets/projects/dohazari-power-plant.jpg";
import rangpurImg from "@/assets/projects/rangpur-chimney.jpg";
import chhatakImg from "@/assets/projects/chhatak-cement.jpg";
import jamunaImg from "@/assets/projects/jamuna-fertilizer.jpg";
import easternImg from "@/assets/projects/eastern-refinery.jpg";
import sylhetImg from "@/assets/projects/sylhet-stadium.jpg";
import khulnaImg from "@/assets/projects/khulna-hitech-park.jpg";
import barishalImg from "@/assets/projects/barishal-gas-turbine.jpg";

export interface Project {
  slug: string;
  name: string;
  client: string;
  year: string;
  category: string;
  desc: string;
  image: string;
  location: string;
  duration: string;
  scope: string[];
  details: string;
  coordinates: { lat: number; lng: number };
}

export const projects: Project[] = [
  {
    slug: "dohazari-100mw-power-plant",
    name: "Dohazari 100MW Peaking Power Plant",
    client: "Bangladesh Power Development Board (BPDB)",
    year: "2023",
    category: "Power Sector",
    desc: "Removing fuel pipeline & 11kV underground cable, supply, installation & erection works.",
    image: dohazariImg,
    location: "Dohazari, Chittagong",
    duration: "18 Months",
    scope: [
      "Removal of existing fuel pipeline system",
      "11kV underground cable installation",
      "Supply of mechanical & electrical equipment",
      "Complete erection & commissioning works",
      "Testing and performance verification",
    ],
    details:
      "This landmark project involved the comprehensive upgrading of the Dohazari 100MW Peaking Power Plant for BPDB. Our scope included the careful removal of aging fuel pipeline infrastructure and replacement with modern systems, along with the installation of 11kV underground cable networks. The project demanded precision engineering and adherence to strict safety protocols given the operational nature of the facility.",
    coordinates: { lat: 22.1590, lng: 91.9960 },
  },
  {
    slug: "rangpur-20mw-chimney",
    name: "Rangpur 20MW GT Power Station Chimney",
    client: "BPDB, Rangpur",
    year: "2022",
    category: "Power Sector",
    desc: "Supply, renovation & construction of chimney on turnkey basis.",
    image: rangpurImg,
    location: "Rangpur Division",
    duration: "12 Months",
    scope: [
      "Structural assessment of existing chimney",
      "Design & engineering of new chimney structure",
      "Demolition of deteriorated sections",
      "Construction of reinforced chimney on turnkey basis",
      "Refractory lining and insulation works",
    ],
    details:
      "The Rangpur 20MW Gas Turbine Power Station required a complete chimney renovation to meet updated emission standards and structural integrity requirements. Techno-Tech undertook this project on a turnkey basis — from initial structural assessment through to final commissioning. The project included specialized refractory lining to withstand high exhaust temperatures and seismic reinforcement for long-term durability.",
    coordinates: { lat: 25.7439, lng: 89.2752 },
  },
  {
    slug: "chhatak-cement-mill-repair",
    name: "Chhatak Cement Company — Cement Mill Repair",
    client: "Chhatak Cement Company Ltd.",
    year: "2018",
    category: "Cement",
    desc: "Repair and overhauling of Cement Mill No. 504, 510 and 516.",
    image: chhatakImg,
    location: "Chhatak, Sunamganj",
    duration: "8 Months",
    scope: [
      "Complete overhaul of Cement Mill No. 504",
      "Repair and reconditioning of Mill No. 510",
      "Major overhaul of Cement Mill No. 516",
      "Bearing replacement and shaft alignment",
      "Gear system inspection and repair",
    ],
    details:
      "Chhatak Cement Company entrusted Techno-Tech with the critical task of overhauling three major cement mills simultaneously. This required meticulous planning to minimize production downtime. Our team of specialized mechanical engineers carried out precision bearing replacements, shaft realignments, and comprehensive gear system reconditioning — restoring all three mills to optimal operational efficiency.",
    coordinates: { lat: 25.0353, lng: 91.3980 },
  },
  {
    slug: "jamuna-fertilizer-urea-stripper",
    name: "Jamuna Fertilizer — Urea Stripper Replacement",
    client: "Jamuna Fertilizer Company Ltd.",
    year: "2011",
    category: "Fertilizer",
    desc: "Replacement of Urea Stripper at Jamalpur plant site.",
    image: jamunaImg,
    location: "Jamalpur",
    duration: "10 Months",
    scope: [
      "Removal of existing urea stripper column",
      "Heavy lifting and rigging operations",
      "Installation of new stripper column",
      "Piping connections and pressure testing",
      "Commissioning and performance trials",
    ],
    details:
      "The replacement of the Urea Stripper at Jamuna Fertilizer's Jamalpur plant was one of the most technically demanding projects in our portfolio. The stripper column — a critical component in the urea synthesis loop — required careful removal and replacement with a new unit. This involved heavy crane operations for lifting the multi-ton column, precision alignment, and extensive welding and pressure testing to ensure leak-free operation under high-temperature, high-pressure conditions.",
    coordinates: { lat: 24.9375, lng: 89.9372 },
  },
  {
    slug: "eastern-refinery-distillation",
    name: "Eastern Refinery — Atmospheric Distillation",
    client: "Eastern Refinery Ltd., Chittagong",
    year: "2009",
    category: "Refinery",
    desc: "Revamping of atmospheric distillation unit furnace F-1101 A/B.",
    image: easternImg,
    location: "Chittagong",
    duration: "14 Months",
    scope: [
      "Dismantling of existing furnace components",
      "Refractory demolition and relining",
      "New burner system installation",
      "Tube replacement and expansion joint works",
      "Hydrotesting and commissioning",
    ],
    details:
      "Eastern Refinery's atmospheric distillation unit is the heart of Bangladesh's petroleum refining capability. Techno-Tech was selected for the critical revamping of furnaces F-1101 A and B — involving complete refractory relining, burner system modernization, and tube replacement. The project was executed during a planned turnaround window, requiring round-the-clock operations to meet the tight schedule while maintaining the highest safety standards in this hazardous environment.",
    coordinates: { lat: 22.3475, lng: 91.8123 },
  },
  {
    slug: "sylhet-sports-complex",
    name: "National Sports Council — Sylhet Stadium",
    client: "National Sports Council",
    year: "2014",
    category: "Sports",
    desc: "Land development & construction of R.C.C. boundary wall, Sylhet Sports Complex.",
    image: sylhetImg,
    location: "Sylhet",
    duration: "6 Months",
    scope: [
      "Site clearing and land development",
      "Foundation works for boundary wall",
      "R.C.C. boundary wall construction",
      "Drainage system installation",
      "Finishing and landscaping works",
    ],
    details:
      "The Sylhet Sports Complex project represented a diversification of our capabilities into civil infrastructure. Commissioned by the National Sports Council, this project involved comprehensive land development and the construction of a reinforced concrete boundary wall enclosing the sports complex. Our civil engineering team managed the entire process — from earthworks and foundation laying through to the finished perimeter wall and integrated drainage system.",
    coordinates: { lat: 24.8949, lng: 91.8687 },
  },
  {
    slug: "khulna-hitech-park",
    name: "Khulna Hi-Tech Park — Electrical & Mechanical Works",
    client: "Bangladesh Hi-Tech Park Authority",
    year: "2021",
    category: "Power Sector",
    desc: "Complete electrical infrastructure, substation installation & mechanical services for the Hi-Tech Park.",
    image: khulnaImg,
    location: "Khulna",
    duration: "16 Months",
    scope: [
      "33/11kV substation design & installation",
      "Underground power cable network",
      "Mechanical HVAC system installation",
      "Fire detection & suppression systems",
      "Testing, commissioning & handover",
    ],
    details:
      "The Khulna Hi-Tech Park project involved delivering complete electrical and mechanical infrastructure for one of Bangladesh's flagship technology hubs. Techno-Tech was responsible for the design and installation of a 33/11kV substation, extensive underground power distribution networks, and full mechanical services including industrial-grade HVAC and fire protection systems — all executed to international standards within a tight timeline.",
    coordinates: { lat: 22.8456, lng: 89.5403 },
  },
  {
    slug: "barishal-gas-turbine",
    name: "Barishal 50MW Gas Turbine Power Plant",
    client: "Bangladesh Power Development Board (BPDB)",
    year: "2020",
    category: "Power Sector",
    desc: "Maintenance, overhauling & repair of 50MW gas turbine unit and auxiliary systems.",
    image: barishalImg,
    location: "Barishal",
    duration: "10 Months",
    scope: [
      "Gas turbine major overhaul & inspection",
      "Generator stator & rotor reconditioning",
      "Control system upgrade & modernization",
      "Auxiliary boiler maintenance",
      "Performance testing & efficiency optimization",
    ],
    details:
      "The Barishal 50MW Gas Turbine Power Plant required a comprehensive overhaul to restore its generating capacity and improve operational efficiency. Techno-Tech's specialist team carried out a major gas turbine inspection including blade replacement, hot gas path component reconditioning, and generator overhaul. The control system was modernized with digital instrumentation, significantly improving plant reliability and reducing maintenance intervals.",
    coordinates: { lat: 22.7010, lng: 90.3535 },
  },
];
