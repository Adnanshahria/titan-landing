import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Building2, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useRef, useEffect } from "react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-primary-foreground uppercase mb-4">Project Not Found</h1>
          <Link to="/" className="text-orange hover:text-orange-glow transition-colors">← Back to Home</Link>
        </div>
      </div>
    );
  }

  // Get current index for prev/next navigation
  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;

  // All other projects for the suggestion carousel
  const suggestions = projects.filter((p) => p.slug !== slug);

  // Category-matched first, then others
  const sameCat = suggestions.filter((p) => p.category === project.category);
  const otherCat = suggestions.filter((p) => p.category !== project.category);
  const orderedSuggestions = [...sameCat, ...otherCat];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero - Gallery style */}
      <section className="pt-28 pb-10 bg-steel-light">
        <div className="container mx-auto px-4">
          {/* Image gallery grid */}
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-4 gap-3 max-h-[480px]"
          >
            {/* Main large image */}
            <div className="col-span-4 md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative h-[300px] md:h-full">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            {/* Top right */}
            <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden h-[140px] md:h-auto">
              <img src={project.image} alt={`${project.name} detail`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ objectPosition: "left center" }} />
            </div>
            {/* Top far right */}
            <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden h-[140px] md:h-auto">
              <img src={project.image} alt={`${project.name} detail`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ objectPosition: "right center" }} />
            </div>
            {/* Bottom right */}
            <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden h-[140px] md:h-auto">
              <img src={project.image} alt={`${project.name} detail`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ objectPosition: "center top" }} />
            </div>
            {/* Bottom far right */}
            <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden h-[140px] md:h-auto">
              <img src={project.image} alt={`${project.name} detail`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ objectPosition: "center bottom" }} />
            </div>
          </motion.div>

          {/* Project info below gallery */}
          <motion.div
            key={slug + "-info"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-block bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-xs font-heading font-semibold px-4 py-1.5 rounded-full uppercase">
                {project.category}
              </span>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">{project.year}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-4xl">
              {project.name}
            </h1>

            {/* Info chips */}
            <div className="mt-5 flex flex-wrap gap-4">
              {[
                { icon: Building2, label: "Client", value: project.client },
                { icon: MapPin, label: "Location", value: project.location },
                { icon: Calendar, label: "Year", value: project.year },
                { icon: Clock, label: "Duration", value: project.duration },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-card rounded-full px-4 py-2 border border-muted/20 shadow-sm">
                  <item.icon className="text-orange" size={14} />
                  <span className="text-muted-foreground text-xs">{item.label}:</span>
                  <span className="text-foreground text-xs font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-steel-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main */}
            <motion.div
              key={slug + "-content"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase mb-5">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.details}</p>


              {/* Prev/Next navigation */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {prevProject ? (
                  <Link to={`/project/${prevProject.slug}`} className="group flex items-center gap-3 rounded-xl p-5 bg-card border-2 border-orange/20 hover:border-orange/50 transition-all shadow-md hover:shadow-lg">
                    <ChevronLeft className="text-orange shrink-0" size={24} />
                    <div className="min-w-0">
                      <p className="text-orange text-xs font-heading font-semibold uppercase tracking-wider">Previous</p>
                      <p className="font-heading text-foreground text-base font-bold uppercase truncate group-hover:text-orange transition-colors mt-1">{prevProject.name}</p>
                    </div>
                  </Link>
                ) : <div />}
                {nextProject ? (
                  <Link to={`/project/${nextProject.slug}`} className="group flex items-center justify-end gap-3 rounded-xl p-5 bg-card border-2 border-orange/20 hover:border-orange/50 transition-all shadow-md hover:shadow-lg text-right">
                    <div className="min-w-0">
                      <p className="text-orange text-xs font-heading font-semibold uppercase tracking-wider">Next</p>
                      <p className="font-heading text-foreground text-base font-bold uppercase truncate group-hover:text-orange transition-colors mt-1">{nextProject.name}</p>
                    </div>
                    <ChevronRight className="text-orange shrink-0" size={24} />
                  </Link>
                ) : <div />}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              key={slug + "-sidebar"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-card rounded-2xl p-6 gradient-border shadow-lg sticky top-24">
                <h3 className="font-heading text-lg font-bold text-foreground uppercase mb-4">Scope of Work</h3>
                <ul className="space-y-2.5">
                  {project.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-secondary-foreground text-[10px] font-bold">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-muted/30">
                  <Link
                    to="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold px-5 py-3 rounded-full text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-orange/20"
                  >
                    Discuss a Similar Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Suggested Projects — E-commerce style horizontal carousel */}
      <SuggestedProjects suggestions={orderedSuggestions} currentCategory={project.category} />

      <Footer />
      <Chatbot />
    </div>
  );
};

/* ──────────────────────────────────────────── */
/* Horizontal scrollable suggestion strip       */
/* ──────────────────────────────────────────── */
const SuggestedProjects = ({ suggestions, currentCategory }: { suggestions: typeof projects; currentCategory: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="py-14 bg-dark-bg noise-overlay relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange font-heading font-semibold uppercase tracking-widest text-xs mb-1">You may also like</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase">
              Explore More Projects
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-9 h-9 rounded-full border border-steel/20 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-9 h-9 rounded-full border border-steel/20 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {suggestions.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="snap-start shrink-0 w-[280px] relative z-10"
            >
              <Link
                to={`/project/${p.slug}`}
                className="group block bg-card border border-steel/15 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 h-full"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full uppercase">
                    {p.category}
                  </span>
                  {p.category === currentCategory && (
                    <span className="absolute top-2.5 right-2.5 bg-primary-foreground/90 text-navy text-[9px] font-heading font-bold px-2 py-0.5 rounded-full uppercase">
                      Similar
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-display text-base font-bold text-orange uppercase leading-tight group-hover:text-orange-glow transition-colors line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-steel text-xs mt-2 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-steel/10">
                    <span className="text-steel text-[10px] uppercase tracking-wider">{p.client}</span>
                    <span className="text-orange text-[10px] font-heading font-semibold uppercase">{p.year}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-orange text-xs font-heading font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 border border-steel/20 text-steel hover:text-orange hover:border-orange/30 font-heading font-semibold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
