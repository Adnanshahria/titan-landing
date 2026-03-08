import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, Project } from "@/data/projects";

// Bangladesh bounding box (approx): lat 20.7–26.6, lng 88.0–92.7
const MAP_BOUNDS = {
  minLat: 20.5,
  maxLat: 26.8,
  minLng: 87.8,
  maxLng: 92.9,
};

const latToY = (lat: number) =>
  ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
const lngToX = (lng: number) =>
  ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;

interface Props {
  highlightSlug?: string;
  filterCategory?: string;
}

const InteractiveProjectMap = ({ highlightSlug, filterCategory }: Props) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const filtered = filterCategory && filterCategory !== "All"
    ? projects.filter((p) => p.category === filterCategory)
    : projects;

  const handleMouseEnter = (project: Project, e: React.MouseEvent) => {
    setHoveredProject(project);
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden bg-navy/5 border border-steel/15"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--navy) / 0.08) 0%, hsl(var(--steel-light)) 100%)",
        }}
      >
        {/* Bangladesh SVG outline */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Simplified Bangladesh border path */}
          <path
            d="M 45 5 L 52 6 L 58 8 L 62 10 L 65 14 L 68 12 L 72 14 L 75 18 L 78 22 L 80 28 L 82 32 L 85 38 L 82 42 L 78 45 L 75 50 L 72 55 L 68 58 L 65 62 L 62 68 L 58 72 L 55 75 L 52 78 L 48 82 L 45 86 L 42 88 L 38 90 L 35 88 L 32 85 L 30 80 L 28 75 L 25 70 L 22 65 L 20 60 L 18 55 L 20 50 L 22 45 L 25 40 L 28 35 L 30 30 L 32 25 L 35 20 L 38 15 L 42 10 Z"
            fill="hsl(var(--navy) / 0.06)"
            stroke="hsl(var(--navy) / 0.2)"
            strokeWidth="0.5"
          />
          {/* Grid lines for visual effect */}
          {[20, 35, 50, 65, 80].map((v) => (
            <line key={`h-${v}`} x1="0" y1={v} x2="100" y2={v} stroke="hsl(var(--steel) / 0.1)" strokeWidth="0.2" strokeDasharray="2 2" />
          ))}
          {[20, 35, 50, 65, 80].map((v) => (
            <line key={`v-${v}`} x1={v} y1="0" x2={v} y2="100" stroke="hsl(var(--steel) / 0.1)" strokeWidth="0.2" strokeDasharray="2 2" />
          ))}
        </svg>

        {/* Project pins */}
        {filtered.map((project) => {
          const x = lngToX(project.coordinates.lng);
          const y = latToY(project.coordinates.lat);
          const isHighlighted = highlightSlug === project.slug;
          const isHovered = hoveredProject?.slug === project.slug;

          return (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="absolute z-10 group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -100%)",
              }}
              onMouseEnter={(e) => handleMouseEnter(project, e)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                animate={isHighlighted || isHovered ? {
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ background: "hsl(var(--orange) / 0.3)" }}
              />

              {/* Pin */}
              <motion.div
                whileHover={{ scale: 1.3, y: -4 }}
                className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg transition-all duration-300 cursor-pointer ${
                  isHighlighted
                    ? "bg-gradient-to-br from-orange to-orange-glow scale-125"
                    : "bg-gradient-to-br from-orange to-orange-glow"
                }`}
              >
                <MapPin size={14} className="text-secondary-foreground" />
                {/* Pin tail */}
                <div
                  className="absolute -bottom-1.5 w-2 h-2 rotate-45 bg-orange"
                />
              </motion.div>
            </Link>
          );
        })}

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 pointer-events-none"
              style={{
                left: `${Math.min(Math.max(lngToX(hoveredProject.coordinates.lng), 20), 70)}%`,
                top: `${Math.max(latToY(hoveredProject.coordinates.lat) - 5, 5)}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="bg-card rounded-xl shadow-2xl border border-steel/20 overflow-hidden w-56">
                <div className="h-28 overflow-hidden">
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-heading text-xs font-bold text-foreground uppercase leading-tight line-clamp-2">
                    {hoveredProject.name}
                  </h4>
                  <p className="text-muted-foreground text-[10px] mt-1 line-clamp-2">{hoveredProject.desc}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-steel/10">
                    <span className="text-muted-foreground text-[9px] uppercase tracking-wider font-bold">
                      {hoveredProject.location}
                    </span>
                    <span className="text-orange text-[9px] font-heading font-semibold">{hoveredProject.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map label */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-steel/15">
          <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-heading font-semibold">
            {filtered.length} Projects across Bangladesh
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveProjectMap;
