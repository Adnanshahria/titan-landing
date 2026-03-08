import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMapPins, MapPin as MapPinType } from "@/hooks/useMapPins";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

// Bangladesh geographic bounds (approx)
const GEO_BOUNDS = {
  minLat: 20.59,
  maxLat: 26.63,
  minLng: 88.01,
  maxLng: 92.68,
};

// Convert lat/lng to SVG coordinates (0-1000 viewBox)
const geoToSvg = (lat: number, lng: number) => {
  const x = ((lng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng)) * 1000;
  const y = ((GEO_BOUNDS.maxLat - lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) * 1000;
  return { x, y };
};

interface Props {
  highlightSlug?: string;
  filterCategory?: string;
}

const InteractiveProjectMap = ({ highlightSlug, filterCategory }: Props) => {
  const { data: pins = [] } = useMapPins();
  const [hoveredPin, setHoveredPin] = useState<MapPinType | null>(null);
  const [tappedPin, setTappedPin] = useState<MapPinType | null>(null);
  const navigate = useNavigate();

  const activeTooltipPin = tappedPin || hoveredPin;

  // On mobile: first tap shows tooltip, second tap navigates
  const handlePinTap = useCallback((pin: MapPinType, e: React.MouseEvent | React.TouchEvent) => {
    // Check if touch device
    if ("ontouchstart" in window) {
      e.preventDefault();
      e.stopPropagation();
      if (tappedPin?.id === pin.id) {
        // Second tap — navigate
        if (pin.project_slug) navigate(`/project/${pin.project_slug}`);
        setTappedPin(null);
      } else {
        setTappedPin(pin);
      }
    }
  }, [tappedPin, navigate]);

  const filtered = filterCategory && filterCategory !== "All"
    ? pins.filter((p) => p.category === filterCategory)
    : pins;

  // Get project image from local data if no image_url in DB
  const getPinImage = (pin: MapPinType) => {
    if (pin.image_url) return pin.image_url;
    const localProject = projects.find((p) => p.slug === pin.project_slug);
    return localProject?.image || "";
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Bangladesh SVG Map as background */}
        <div className="relative">
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 4px 20px hsl(var(--navy) / 0.1))" }}
          >
            {/* Load actual Bangladesh SVG inline — we'll use an image fallback */}
            <image
              href="/bangladesh-map.svg"
              x="0"
              y="0"
              width="1000"
              height="1000"
              opacity="0.25"
            />

            {/* Division labels */}
            {[
              { name: "রংপুর", x: 250, y: 150 },
              { name: "রাজশাহী", x: 170, y: 350 },
              { name: "ময়মনসিংহ", x: 430, y: 280 },
              { name: "সিলেট", x: 700, y: 260 },
              { name: "ঢাকা", x: 420, y: 470 },
              { name: "খুলনা", x: 240, y: 620 },
              { name: "বরিশাল", x: 420, y: 660 },
              { name: "চট্টগ্রাম", x: 700, y: 600 },
            ].map((div) => (
              <text
                key={div.name}
                x={div.x}
                y={div.y}
                textAnchor="middle"
                fill="hsl(var(--navy) / 0.2)"
                fontSize="28"
                fontWeight="700"
                fontFamily="'Abril Fatface', serif"
                className="select-none pointer-events-none"
              >
                {div.name}
              </text>
            ))}

            {/* Project pins as SVG elements */}
            {filtered.map((pin) => {
              const pos = geoToSvg(pin.latitude, pin.longitude);
              const isHighlighted = highlightSlug === pin.project_slug;
              const isHovered = hoveredPin?.id === pin.id;

              return (
                <g key={pin.id}>
                  {/* Pulse circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHighlighted || isHovered ? 25 : 15}
                    fill="hsl(var(--orange) / 0.2)"
                    className="animate-pulse"
                  />
                  {/* Pin circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHighlighted ? 16 : 12}
                    fill="hsl(var(--orange))"
                    stroke="hsl(var(--secondary-foreground))"
                    strokeWidth="3"
                    className="cursor-pointer"
                    style={{
                      filter: isHighlighted ? "drop-shadow(0 0 8px hsl(var(--orange) / 0.6))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                      transition: "all 0.3s ease",
                    }}
                  />
                  {/* Inner icon dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHighlighted ? 5 : 4}
                    fill="hsl(var(--secondary-foreground))"
                  />
                </g>
              );
            })}
          </svg>

          {/* Overlay interactive hit areas (HTML for hover/click/touch) */}
          <div
            className="absolute inset-0"
            onClick={() => { if (tappedPin) setTappedPin(null); }}
            onTouchStart={(e) => {
              // Dismiss tooltip when tapping empty area
              if (tappedPin && !(e.target as HTMLElement).closest("[data-map-pin]")) {
                setTappedPin(null);
              }
            }}
          >
            {filtered.map((pin) => {
              const pos = geoToSvg(pin.latitude, pin.longitude);
              const xPercent = pos.x / 10;
              const yPercent = pos.y / 10;

              return (
                <a
                  key={pin.id}
                  data-map-pin
                  href={pin.project_slug ? `/project/${pin.project_slug}` : undefined}
                  className="absolute z-10 w-10 h-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={(e) => handlePinTap(pin, e)}
                  onTouchEnd={(e) => handlePinTap(pin, e)}
                />
              );
            })}
          </div>

          {/* Hover/Touch tooltip */}
          <AnimatePresence>
            {activeTooltipPin && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`absolute z-50 ${tappedPin ? "pointer-events-auto" : "pointer-events-none"}`}
                style={{
                  left: `${Math.min(Math.max(geoToSvg(activeTooltipPin.latitude, activeTooltipPin.longitude).x / 10, 20), 70)}%`,
                  top: `${Math.max(geoToSvg(activeTooltipPin.latitude, activeTooltipPin.longitude).y / 10 - 2, 2)}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="bg-card rounded-xl shadow-2xl border border-steel/20 overflow-hidden w-60">
                  {getPinImage(activeTooltipPin) && (
                    <div className="h-32 overflow-hidden relative">
                      <img
                        src={getPinImage(activeTooltipPin)}
                        alt={activeTooltipPin.project_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-2 left-2 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-[9px] font-heading font-semibold px-2 py-0.5 rounded-full uppercase">
                        {activeTooltipPin.category}
                      </span>
                    </div>
                  )}
                  <div className="p-3">
                    <h4 className="font-heading text-xs font-bold text-foreground uppercase leading-tight line-clamp-2">
                      {activeTooltipPin.project_name}
                    </h4>
                    <p className="text-muted-foreground text-[10px] mt-1.5 line-clamp-2">{activeTooltipPin.description}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-steel/10">
                      <div className="flex items-center gap-1">
                        <MapPin size={9} className="text-orange" />
                        <span className="text-muted-foreground text-[9px] font-semibold">{activeTooltipPin.location}</span>
                      </div>
                      <span className="text-orange text-[9px] font-heading font-bold">{activeTooltipPin.year}</span>
                    </div>
                    {/* Mobile: show tap-to-navigate hint */}
                    {tappedPin && tappedPin.project_slug && (
                      <Link
                        to={`/project/${tappedPin.project_slug}`}
                        className="block mt-2 text-center bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-[10px] font-heading font-semibold py-1.5 rounded-lg uppercase tracking-wider"
                        onClick={() => setTappedPin(null)}
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-3 h-3 bg-card border-r border-b border-steel/20 rotate-45 mx-auto -mt-1.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-steel/15 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-heading font-semibold">
              {filtered.length} Projects across Bangladesh
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
