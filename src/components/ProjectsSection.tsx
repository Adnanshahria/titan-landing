import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Power Sector", "Cement", "Fertilizer", "Refinery", "Sports", "Water"];

const projects = [
  { name: "Dohazari 100MW Peaking Power Plant", client: "BPDB", year: "2023", category: "Power Sector", desc: "Removing fuel pipeline & 11kV underground cable, supply, installation & erection works." },
  { name: "Rangpur 20MW GT Power Station Chimney", client: "BPDB, Rangpur", year: "2022", category: "Power Sector", desc: "Supply, renovation & construction of chimney on turnkey basis." },
  { name: "Chhatak Cement Company — Cement Mill Repair", client: "Chhatak Cement Co. Ltd.", year: "2018", category: "Cement", desc: "Repair and overhauling of Cement Mill No. 504, 510 and 516." },
  { name: "Jamuna Fertilizer — Urea Stripper Replacement", client: "Jamuna Fertilizer Company Ltd.", year: "2011", category: "Fertilizer", desc: "Replacement of Urea Stripper at Jamalpur plant site." },
  { name: "Eastern Refinery — Atmospheric Distillation", client: "Eastern Refinery Ltd., Chittagong", year: "2009", category: "Refinery", desc: "Revamping of atmospheric distillation unit furnace F-1101 A/B." },
  { name: "National Sports Council — Sylhet Stadium", client: "National Sports Council", year: "2014", category: "Sports", desc: "Land development & construction of R.C.C. boundary wall, Sylhet Sports Complex." },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-steel-light">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase">Major Reference Projects</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Trusted by Bangladesh's largest public and private sector organizations
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-heading text-sm uppercase tracking-wider px-4 py-2 rounded-sm border transition-colors ${
                filter === c
                  ? "bg-orange border-orange text-secondary-foreground"
                  : "border-muted text-muted-foreground hover:border-orange hover:text-orange"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-navy to-navy-card relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
                <span className="absolute top-3 left-3 bg-orange text-secondary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full uppercase">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground uppercase">{p.name}</h3>
                <p className="text-muted-foreground text-sm mt-2">{p.desc}</p>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground uppercase tracking-wider">
                  <span>{p.client}</span>
                  <span>{p.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 bg-orange hover:bg-orange-glow text-secondary-foreground font-heading font-semibold px-8 py-3 rounded-sm uppercase tracking-wider transition-colors">
            View All Projects <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
