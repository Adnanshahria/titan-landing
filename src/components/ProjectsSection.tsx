import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import PhotoLightbox from "./PhotoLightbox";

const categories = ["All", "Power Sector", "Cement", "Fertilizer", "Refinery", "Sports", "Water"];

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
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full uppercase">
                  {p.category}
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); openLightbox(i); }}
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-navy/60 backdrop-blur-sm border border-steel/20 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Images size={16} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground uppercase">{p.name}</h3>
                <p className="text-muted-foreground text-sm mt-2">{p.desc}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{p.client}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{p.year}</span>
                </div>
                <Link
                  to={`/project/${p.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-orange hover:text-orange-glow text-xs font-heading font-semibold uppercase tracking-wider transition-colors"
                >
                  View Details <ArrowRight size={14} />
                </Link>
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
          images={[{ src: projects[lightbox.projectIndex].image, alt: projects[lightbox.projectIndex].name }]}
          currentIndex={lightbox.imageIndex}
          onIndexChange={(idx) => setLightbox((s) => ({ ...s, imageIndex: idx }))}
          projectName={projects[lightbox.projectIndex].name}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
