import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const categoryKeys = [
  { en: "All", key: "category.all" },
  { en: "Power Sector", key: "category.powerSector" },
  { en: "Cement", key: "category.cement" },
  { en: "Fertilizer", key: "category.fertilizer" },
  { en: "Refinery", key: "category.refinery" },
  { en: "Sports", key: "category.sports" },
  { en: "Water", key: "category.water" },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="pt-28 pb-20 bg-steel-light flex-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground uppercase heading-accent">
              {t("projects.title")}
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categoryKeys.map((c) => (
              <button
                key={c.en}
                onClick={() => setFilter(c.en)}
                className={`text-[10px] uppercase tracking-[0.12em] px-4 py-1.5 rounded-full border-2 transition-all duration-400 ${
                  filter === c.en
                    ? "bg-navy border-navy text-primary-foreground shadow-xl shadow-navy/20 scale-105"
                    : "border-steel text-muted-foreground hover:border-navy hover:text-foreground hover:bg-navy/5"
                }`}
                style={{ fontFamily: "'Abril Fatface', serif", letterSpacing: "0.12em" }}
              >
                {t(c.key as any)}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
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
                  <Link
                    to={`/project/${p.slug}`}
                    className="font-heading text-lg font-semibold text-foreground uppercase hover:text-orange transition-colors"
                  >
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

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">{t("projects.noProjects")}</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
