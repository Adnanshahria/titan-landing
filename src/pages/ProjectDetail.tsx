import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Building2, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import InteractiveProjectMap from "@/components/InteractiveProjectMap";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProjectImages } from "@/hooks/useProjectImages";
import { useProjectDescription } from "@/hooks/useProjectDescription";
import { useProjectTranslation } from "@/hooks/useProjectTranslations";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const project = projects.find((p) => p.slug === slug);
  const { images: dbImages } = useProjectImages(slug);
  const { description: dbDescription } = useProjectDescription(slug);
  const { translation } = useProjectTranslation(slug);
  const [imgIndex, setImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isBn = lang === "bn";
  const projectName = isBn && translation?.name_bn ? translation.name_bn : project?.name || "";
  const projectClient = isBn && translation?.client_bn ? translation.client_bn : project?.client || "";
  const projectLocation = isBn && translation?.location_bn ? translation.location_bn : project?.location || "";
  const projectDetails = isBn && translation?.description_bn ? translation.description_bn : (dbDescription || project?.details || "");
  const projectScope = isBn && translation?.scope_bn?.some(s => s) 
    ? translation.scope_bn.map((s, i) => s || (project?.scope[i] || ""))
    : project?.scope || [];

  const allImages = dbImages.length > 0
    ? dbImages.map((img) => img.image_url)
    : project ? [project.image] : [];

  useEffect(() => { setImgIndex(0); }, [slug]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-primary-foreground uppercase mb-4">{t("projectDetail.notFound")}</h1>
          <Link to="/" className="text-orange hover:text-orange-glow transition-colors">{t("projectDetail.backHome")}</Link>
        </div>
      </div>
    );
  }

  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const suggestions = projects.filter((p) => p.slug !== slug);
  const sameCat = suggestions.filter((p) => p.category === project.category);
  const otherCat = suggestions.filter((p) => p.category !== project.category);
  const orderedSuggestions = [...sameCat, ...otherCat];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-4 bg-steel-light">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden relative h-[350px] md:h-[480px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={`${slug}-${imgIndex}`}
                src={allImages[imgIndex] || project.image}
                alt={`${project.name} - Image ${imgIndex + 1}`}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
            <span className="absolute bottom-4 left-4 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-xs font-heading font-semibold px-4 py-1.5 rounded-full uppercase z-10">
              {project.category}
            </span>
            {allImages.length > 1 && (
              <span className="absolute bottom-4 right-4 bg-navy/70 backdrop-blur-sm text-primary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full z-10">
                {imgIndex + 1} / {allImages.length}
              </span>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => { setDirection(-1); setImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length); }}
                className="w-11 h-11 rounded-full bg-orange flex items-center justify-center text-secondary-foreground hover:bg-orange-glow transition-colors shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > imgIndex ? 1 : -1); setImgIndex(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === imgIndex ? "w-6 h-2.5 bg-orange" : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => { setDirection(1); setImgIndex((prev) => (prev + 1) % allImages.length); }}
                className="w-11 h-11 rounded-full bg-orange flex items-center justify-center text-secondary-foreground hover:bg-orange-glow transition-colors shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <motion.div
            key={slug + "-info"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
             <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-4xl">
               {projectName}
             </h1>
             <div className="mt-5 rounded-2xl px-5 py-4 bg-navy/90 backdrop-blur-md border border-steel/15 inline-flex flex-wrap gap-x-6 gap-y-2 shadow-lg">
               {[
                 { icon: Building2, label: t("projectDetail.client"), value: projectClient },
                 { icon: MapPin, label: t("projectDetail.locationLabel"), value: projectLocation },
                 { icon: Calendar, label: t("projectDetail.year"), value: project.year },
                 { icon: Clock, label: t("projectDetail.duration"), value: project.duration },
               ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="text-orange" size={14} />
                  <span className="text-steel text-xs">{item.label}:</span>
                  <span className="text-primary-foreground text-xs font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-2 pb-6 bg-steel-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-1 lg:gap-6 items-start">
            <motion.div
              key={slug + "-content"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground uppercase mb-3" style={{ fontFamily: "'Abril Fatface', serif" }}>{t("projectDetail.overview")}</h2>
              <p className="text-foreground/80 leading-relaxed text-base">{projectDetails}</p>

              {allImages.length > 1 && (
                <div className="mt-8">
                  <h3 className="font-heading text-xl font-bold text-foreground uppercase mb-4">{t("projectDetail.gallery")}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {allImages.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="h-44 rounded-2xl overflow-hidden cursor-pointer"
                        onClick={() => { setDirection(i > imgIndex ? 1 : -1); setImgIndex(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.name} view ${i + 1}`}
                          className={`w-full h-full object-cover hover:scale-105 transition-all duration-700 ${i === imgIndex ? "ring-2 ring-orange" : "opacity-80 hover:opacity-100"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              key={slug + "-sidebar"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-card rounded-2xl p-5 gradient-border shadow-lg">
                <h3 className="font-heading text-lg font-bold text-foreground uppercase mb-4">{t("projectDetail.scope")}</h3>
                <ul className="space-y-2.5">
                  {projectScope.map((item, i) => (
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
                    {t("projectDetail.discuss")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-10 bg-steel-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground uppercase">
              {t("projectDetail.location")}
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              {t("projectDetail.locationDesc")}
            </p>
          </div>
          <InteractiveProjectMap highlightSlug={slug} permanentTooltip />
        </div>
      </section>

      <SuggestedProjects suggestions={orderedSuggestions} currentCategory={project.category} />
      <Footer />
      <Chatbot />
    </div>
  );
};

const SuggestedProjects = ({ suggestions, currentCategory }: { suggestions: typeof projects; currentCategory: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="py-14 bg-dark-bg noise-overlay relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange font-heading font-semibold uppercase tracking-widest text-xs mb-1">{t("projectDetail.youMayLike")}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase">
              {t("projectDetail.explore")}
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
                      {t("projectDetail.similar")}
                    </span>
                  )}
                </div>
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
                    {t("projects.viewDetails")} <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 border border-steel/20 text-steel hover:text-orange hover:border-orange/30 font-heading font-semibold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all"
          >
            {t("projects.viewAll")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
