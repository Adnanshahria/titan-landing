import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import PhotoLightbox from "./PhotoLightbox";

const categories = ["All", "Power Sector", "Cement", "Fertilizer", "Refinery", "Sports", "Water"];

const projects = [
  {
    name: "Dohazari 100MW Peaking Power Plant", client: "BPDB", year: "2023", category: "Power Sector",
    desc: "Removing fuel pipeline & 11kV underground cable, supply, installation & erection works.",
    gallery: [
      { src: "", alt: "Power plant overview" },
      { src: "", alt: "Pipeline installation" },
      { src: "", alt: "Cable erection works" },
    ],
  },
  {
    name: "Rangpur 20MW GT Power Station Chimney", client: "BPDB, Rangpur", year: "2022", category: "Power Sector",
    desc: "Supply, renovation & construction of chimney on turnkey basis.",
    gallery: [
      { src: "", alt: "Chimney construction" },
      { src: "", alt: "Renovation progress" },
      { src: "", alt: "Completed chimney" },
    ],
  },
  {
    name: "Chhatak Cement Company — Cement Mill Repair", client: "Chhatak Cement Co. Ltd.", year: "2018", category: "Cement",
    desc: "Repair and overhauling of Cement Mill No. 504, 510 and 516.",
    gallery: [
      { src: "", alt: "Cement mill exterior" },
      { src: "", alt: "Overhauling work" },
      { src: "", alt: "Mill repair detail" },
    ],
  },
  {
    name: "Jamuna Fertilizer — Urea Stripper Replacement", client: "Jamuna Fertilizer Company Ltd.", year: "2011", category: "Fertilizer",
    desc: "Replacement of Urea Stripper at Jamalpur plant site.",
    gallery: [
      { src: "", alt: "Urea stripper equipment" },
      { src: "", alt: "Replacement process" },
    ],
  },
  {
    name: "Eastern Refinery — Atmospheric Distillation", client: "Eastern Refinery Ltd., Chittagong", year: "2009", category: "Refinery",
    desc: "Revamping of atmospheric distillation unit furnace F-1101 A/B.",
    gallery: [
      { src: "", alt: "Distillation unit" },
      { src: "", alt: "Furnace revamping" },
    ],
  },
  {
    name: "National Sports Council — Sylhet Stadium", client: "National Sports Council", year: "2014", category: "Sports",
    desc: "Land development & construction of R.C.C. boundary wall, Sylhet Sports Complex.",
    gallery: [
      { src: "", alt: "Stadium construction" },
      { src: "", alt: "Boundary wall" },
    ],
  },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{ open: boolean; projectIndex: number; imageIndex: number }>({
    open: false, projectIndex: 0, imageIndex: 0,
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const openLightbox = (pIdx: number) => {
    const actualIdx = projects.indexOf(filtered[pIdx]);
    setLightbox({ open: true, projectIndex: actualIdx, imageIndex: 0 });
  };

  return (
    <section id="projects" className="py-20 bg-steel-light">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase heading-accent">Major Reference Projects</h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Trusted by Bangladesh's largest public and private sector organizations
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-heading text-sm uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 ${
                filter === c
                  ? "bg-gradient-to-r from-orange to-orange-glow border-orange text-secondary-foreground shadow-lg shadow-orange/20"
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
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-navy to-navy-card relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50 group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full uppercase">
                  {p.category}
                </span>
                {/* Gallery trigger */}
                <button
                  onClick={() => openLightbox(i)}
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-navy/60 backdrop-blur-sm border border-steel/20 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Images size={16} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground uppercase">{p.name}</h3>
                <p className="text-muted-foreground text-sm mt-2">{p.desc}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    <span>{p.client}</span>
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{p.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange/20">
            View All Projects <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {lightbox.open && (
        <PhotoLightbox
          open={lightbox.open}
          onClose={() => setLightbox((s) => ({ ...s, open: false }))}
          images={projects[lightbox.projectIndex].gallery}
          currentIndex={lightbox.imageIndex}
          onIndexChange={(idx) => setLightbox((s) => ({ ...s, imageIndex: idx }))}
          projectName={projects[lightbox.projectIndex].name}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
