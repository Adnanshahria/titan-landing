import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Building2, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

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

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-steel hover:text-orange transition-colors text-sm mb-6"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <span className="inline-block bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-xs font-heading font-semibold px-4 py-1.5 rounded-full uppercase mb-4">
              {project.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground uppercase leading-tight max-w-4xl">
              {project.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-navy-card border-y border-steel/10">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Building2, label: "Client", value: project.client },
              { icon: MapPin, label: "Location", value: project.location },
              { icon: Calendar, label: "Year", value: project.year },
              { icon: Clock, label: "Duration", value: project.duration },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-orange" size={18} />
                </div>
                <div>
                  <p className="text-steel text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-primary-foreground text-sm font-medium mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-steel-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase mb-6">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{project.details}</p>

              {/* Gallery grid */}
              <div className="mt-10">
                <h3 className="font-heading text-xl font-bold text-foreground uppercase mb-4">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 h-64 rounded-2xl overflow-hidden">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-card relative">
                    <img src={project.image} alt={`${project.name} detail`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" style={{ objectPosition: "left center" }} />
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-card relative">
                    <img src={project.image} alt={`${project.name} detail`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" style={{ objectPosition: "right center" }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-card rounded-2xl p-6 gradient-border shadow-lg sticky top-24">
                <h3 className="font-heading text-xl font-bold text-foreground uppercase mb-5">Scope of Work</h3>
                <ul className="space-y-3">
                  {project.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-secondary-foreground text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-muted/30">
                  <Link
                    to="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-glow hover:from-orange-glow hover:to-orange text-secondary-foreground font-heading font-semibold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange/20"
                  >
                    Discuss a Similar Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="py-16 bg-dark-bg noise-overlay relative">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase mb-8 heading-accent text-center">
            Other Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/project/${p.slug}`} className="group block glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500">
                  <div className="h-44 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full uppercase">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-semibold text-primary-foreground uppercase group-hover:text-orange transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-1 mt-3 text-orange text-xs font-heading uppercase tracking-wider">
                      View Project <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
