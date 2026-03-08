import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, Project } from "@/data/projects";

// Bangladesh bounding box
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

// Division label positions (approximate centers)
const divisions = [
  { name: "রংপুর", lat: 25.75, lng: 89.25 },
  { name: "রাজশাহী", lat: 24.60, lng: 88.60 },
  { name: "ময়মনসিংহ", lat: 24.85, lng: 90.40 },
  { name: "সিলেট", lat: 24.90, lng: 91.85 },
  { name: "ঢাকা", lat: 23.80, lng: 90.40 },
  { name: "খুলনা", lat: 22.80, lng: 89.50 },
  { name: "বরিশাল", lat: 22.40, lng: 90.35 },
  { name: "চট্টগ্রাম", lat: 22.50, lng: 91.80 },
];

interface Props {
  highlightSlug?: string;
  filterCategory?: string;
}

const InteractiveProjectMap = ({ highlightSlug, filterCategory }: Props) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const filtered = filterCategory && filterCategory !== "All"
    ? projects.filter((p) => p.category === filterCategory)
    : projects;

  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] max-w-lg mx-auto rounded-2xl overflow-hidden border border-steel/20"
        style={{
          background: "linear-gradient(145deg, hsl(var(--navy) / 0.04) 0%, hsl(var(--steel-light)) 50%, hsl(var(--navy) / 0.06) 100%)",
        }}
      >
        {/* SVG Map */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Subtle grid */}
          {[15, 30, 45, 60, 75, 90].map((v) => (
            <g key={`grid-${v}`}>
              <line x1="0" y1={v} x2="100" y2={v} stroke="hsl(var(--navy) / 0.06)" strokeWidth="0.15" />
              <line x1={v} y1="0" x2={v} y2="100" stroke="hsl(var(--navy) / 0.06)" strokeWidth="0.15" />
            </g>
          ))}

          {/* Bangladesh country outline - detailed */}
          <path
            d="M 38.5 7 L 40 6.5 L 42 7 L 44 8.5 L 46 8 L 48 9 L 50 8.5 L 52 9.5 L 54 9 L 56 10 L 58 9.5 L 60 10.5 L 62 11 L 64 12 L 66 11.5 L 68 13 L 70 14.5 L 72 15 L 74 17 L 76 19 L 77 21 L 78.5 23 L 80 26 L 81 29 L 82 32 L 82.5 35 L 82 37 L 80 39 L 78 41 L 76 43 L 74 45.5 L 72 48 L 70 50 L 68 52 L 66 54 L 65 56 L 64 58 L 63 60 L 62 63 L 60 66 L 58.5 69 L 57 72 L 56 74 L 55 76 L 54 78 L 52 80 L 50 82 L 48 84 L 46 86 L 44 88 L 42 89 L 40 90 L 38 89.5 L 36 88 L 34 86 L 33 84 L 32 81 L 31 78 L 30 75 L 29 72 L 27 69 L 25 66 L 23 63 L 22 60 L 21 57 L 20 54 L 19.5 51 L 20 48 L 21 45 L 22 42 L 23 39 L 24.5 36 L 26 33 L 27.5 30 L 29 27 L 30.5 24 L 32 21 L 33.5 18 L 35 15 L 36.5 12 L 38 9 Z"
            fill="hsl(var(--navy) / 0.05)"
            stroke="hsl(var(--navy) / 0.25)"
            strokeWidth="0.4"
            strokeLinejoin="round"
          />

          {/* Division boundaries - approximate internal lines */}
          {/* Rangpur-Rajshahi border */}
          <path d="M 20 35 Q 35 33 50 32 Q 55 32 60 33" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />
          {/* Rajshahi-Dhaka border */}
          <path d="M 22 50 Q 38 48 50 47 Q 55 46.5 58 47" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />
          {/* Mymensingh-Sylhet border */}
          <path d="M 55 15 L 55 32 L 55 47" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />
          {/* Dhaka-Sylhet border */}
          <path d="M 58 33 Q 65 40 68 48" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />
          {/* Dhaka-Chittagong border */}
          <path d="M 58 47 Q 62 55 65 60 Q 67 65 68 70" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />
          {/* Khulna-Barishal border */}
          <path d="M 38 60 Q 42 62 48 63 Q 52 64 56 66" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />
          {/* Dhaka-Khulna/Barishal vertical */}
          <path d="M 42 48 Q 43 55 42 60 Q 41 70 40 80" stroke="hsl(var(--navy) / 0.12)" strokeWidth="0.25" strokeDasharray="1.5 1" fill="none" />

          {/* Division labels */}
          {divisions.map((div) => (
            <text
              key={div.name}
              x={lngToX(div.lng)}
              y={latToY(div.lat)}
              textAnchor="middle"
              className="select-none pointer-events-none"
              fill="hsl(var(--navy) / 0.18)"
              fontSize="2.2"
              fontWeight="700"
              fontFamily="'Abril Fatface', serif"
            >
              {div.name}
            </text>
          ))}

          {/* Rivers - Padma, Jamuna, Meghna (very subtle) */}
          <path
            d="M 22 47 Q 30 50 38 52 Q 45 54 52 55 Q 58 56 62 58"
            stroke="hsl(210 60% 60% / 0.15)"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 48 20 Q 47 28 46 35 Q 45 42 44 50"
            stroke="hsl(210 60% 60% / 0.12)"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 62 42 Q 58 50 55 58 Q 52 66 50 75"
            stroke="hsl(210 60% 60% / 0.12)"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
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
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                animate={isHighlighted || isHovered ? {
                  scale: [1, 2, 1],
                  opacity: [0.4, 0, 0.4],
                } : {
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{ duration: isHighlighted ? 1.5 : 3, repeat: Infinity }}
                style={{ background: "hsl(var(--orange) / 0.3)" }}
              />

              {/* Pin */}
              <motion.div
                whileHover={{ scale: 1.4, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isHighlighted ? "w-9 h-9" : "w-7 h-7"
                } rounded-full shadow-lg ${
                  isHighlighted
                    ? "bg-gradient-to-br from-orange to-orange-glow ring-2 ring-orange/40 ring-offset-2 ring-offset-transparent"
                    : "bg-gradient-to-br from-orange to-orange-glow"
                }`}
              >
                <MapPin size={isHighlighted ? 16 : 13} className="text-secondary-foreground" />
                <div className="absolute -bottom-1.5 w-2 h-2 rotate-45 bg-orange" />
              </motion.div>
            </Link>
          );
        })}

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute z-50 pointer-events-none"
              style={{
                left: `${Math.min(Math.max(lngToX(hoveredProject.coordinates.lng), 25), 75)}%`,
                top: `${Math.max(latToY(hoveredProject.coordinates.lat) - 3, 3)}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="bg-card rounded-xl shadow-2xl border border-steel/20 overflow-hidden w-60">
                <div className="h-32 overflow-hidden relative">
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-[9px] font-heading font-semibold px-2 py-0.5 rounded-full uppercase">
                    {hoveredProject.category}
                  </span>
                </div>
                <div className="p-3">
                  <h4 className="font-heading text-xs font-bold text-foreground uppercase leading-tight line-clamp-2">
                    {hoveredProject.name}
                  </h4>
                  <p className="text-muted-foreground text-[10px] mt-1.5 line-clamp-2">{hoveredProject.desc}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-steel/10">
                    <div className="flex items-center gap-1">
                      <MapPin size={9} className="text-orange" />
                      <span className="text-muted-foreground text-[9px] font-semibold">
                        {hoveredProject.location}
                      </span>
                    </div>
                    <span className="text-orange text-[9px] font-heading font-bold">{hoveredProject.year}</span>
                  </div>
                </div>
              </div>
              {/* Tooltip arrow */}
              <div className="w-3 h-3 bg-card border-r border-b border-steel/20 rotate-45 mx-auto -mt-1.5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map legend */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-steel/15 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-heading font-semibold">
              {filtered.length} Projects
            </span>
          </div>
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-steel/15 shadow-sm">
            <span className="text-[9px] text-muted-foreground font-heading uppercase tracking-wider">🇧🇩 Bangladesh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveProjectMap;
