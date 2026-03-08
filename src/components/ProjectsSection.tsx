import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import PhotoLightbox from "./PhotoLightbox";
import { useSiteContent } from "@/context/SiteContext";
import InteractiveProjectMap from "./InteractiveProjectMap";
import { useLanguage } from "@/context/LanguageContext";

const categories = ["All", "Power Sector", "Cement", "Fertilizer", "Refinery", "Sports", "Water"];

const ProjectsSection = () => {
  const { content } = useSiteContent();
  const { t } = useLanguage();
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
    <section id="projects" className="py-20 bg-steel-light rounded-lg">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase heading-accent">{content.projectsTitle}</h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            {content.projectsSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-[10px] uppercase tracking-[0.12em] px-4 py-1.5 rounded-full border-2 transition-all duration-400 ${
                filter === c
                  ? "bg-navy border-navy text-primary-foreground shadow-xl shadow-navy/20 scale-105"
                  : "border-steel text-muted-foreground hover:border-navy hover:text-foreground hover:bg-navy/5"
              }`}
              style={{ fontFamily: "'Abril Fatface', serif", letterSpacing: "0.12em" }}
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
              </div>
              <div className="p-5">
                <Link to={`/project/${p.slug}`} className="font-heading text-lg font-semibold text-foreground uppercase hover:text-orange transition-colors">
                  {p.name}
                </Link>
                <p className="text-muted-foreground text-sm mt-2">{p.desc}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{p.client}</span>
                  <span className="text-xs text-orange uppercase tracking-wider font-semibold">{p.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Project Map */}
        <div className="mt-14">
          <div className="text-center mb-6">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground uppercase">
              Project Locations
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Hover over the pins to explore our projects across Bangladesh
            </p>
          </div>
          <InteractiveProjectMap filterCategory={filter} />
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange/20"
          >
            View All Projects <ArrowRight size={18} />
          </Link>
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
