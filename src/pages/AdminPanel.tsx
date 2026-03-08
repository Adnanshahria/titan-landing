import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import {
  Home, FileText, Users, Settings, MessageSquare, ArrowLeft,
  Save, Bot, Key, Database, Globe, ImageIcon, Inbox, Layout, MapPin
} from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminProjectImages from "@/components/admin/AdminProjectImages";
import AdminProjectDescriptions from "@/components/admin/AdminProjectDescriptions";
import AdminLeads from "@/components/admin/AdminLeads";
import AdminMapPins from "@/components/admin/AdminMapPins";
import { useSiteContent } from "@/context/SiteContext";
import { toast } from "sonner";

type Tab = "general" | "services" | "clients" | "certifications" | "testimonials" | "whychooseus" | "footer" | "leads" | "chatbot" | "images" | "descriptions" | "mappins";

const AdminPanel = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin-auth") === "1");
  const [tab, setTab] = useState<Tab>("general");
  const { content, updateContent } = useSiteContent();

  // Local editable state
  const [form, setForm] = useState({ ...content });

  useEffect(() => {
    setForm((f) => ({ ...f, ...content }));
  }, [content]);

  if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />;

  const save = () => {
    updateContent(form);
    toast.success("Changes saved successfully!");
  };

  const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: "general", label: "General", icon: Home },
    { id: "services", label: "Services", icon: FileText },
    { id: "clients", label: "Clients", icon: Users },
    { id: "certifications", label: "Certifications", icon: Settings },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "whychooseus", label: "Why Choose Us", icon: Settings },
    { id: "footer", label: "Footer", icon: Layout },
    { id: "leads", label: "Leads", icon: Inbox },
    { id: "chatbot", label: "AI Chatbot", icon: Bot },
    { id: "images", label: "Project Images", icon: ImageIcon },
    { id: "descriptions", label: "Descriptions", icon: FileText },
    { id: "mappins", label: "Map Pins", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Sidebar */}
      <div className="w-60 bg-navy-card border-r border-steel/10 flex flex-col shrink-0">
        <div className="p-5 border-b border-steel/10">
          <h2 className="font-heading text-primary-foreground font-bold uppercase text-sm tracking-wider">Admin Panel</h2>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === t.id ? "bg-orange/10 text-orange" : "text-steel hover:text-primary-foreground hover:bg-steel/5"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-steel/10 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-steel text-xs hover:text-orange transition-colors">
            <ArrowLeft size={14} /> Back to Site
          </Link>
          <button
            onClick={() => { sessionStorage.removeItem("admin-auth"); setAuthed(false); }}
            className="text-steel text-xs hover:text-destructive transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-navy/90 backdrop-blur-md border-b border-steel/10 px-8 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl text-primary-foreground font-bold uppercase">{tabs.find((t) => t.id === tab)?.label}</h1>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground font-heading font-semibold px-5 py-2 rounded-full text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange/20 transition-all"
          >
            <Save size={14} /> Save Changes
          </button>
        </div>

        <div className="p-8 max-w-4xl">
          {tab === "general" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label="Hero Headline" value={form.heroHeadline} onChange={(v) => setForm({ ...form, heroHeadline: v })} textarea />
              <Field label="Hero Subheadline" value={form.heroSubheadline} onChange={(v) => setForm({ ...form, heroSubheadline: v })} />

              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-4">About Section</h3>
              <Field label="About Title" value={form.aboutTitle} onChange={(v) => setForm({ ...form, aboutTitle: v })} />
              <Field label="About Subtitle" value={form.aboutSubtitle} onChange={(v) => setForm({ ...form, aboutSubtitle: v })} />
              <Field label="About Text" value={form.aboutText} onChange={(v) => setForm({ ...form, aboutText: v })} textarea />
              <Field label="About Highlight" value={form.aboutHighlight} onChange={(v) => setForm({ ...form, aboutHighlight: v })} textarea />
              <h4 className="font-heading text-primary-foreground font-semibold uppercase text-xs pt-2">About Bullet Points</h4>
              {form.aboutBullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={b}
                    onChange={(e) => {
                      const next = [...form.aboutBullets];
                      next[i] = e.target.value;
                      setForm({ ...form, aboutBullets: next });
                    }}
                    className="flex-1 glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                  />
                  <button
                    onClick={() => setForm({ ...form, aboutBullets: form.aboutBullets.filter((_, j) => j !== i) })}
                    className="text-steel hover:text-destructive text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, aboutBullets: [...form.aboutBullets, "New bullet point"] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Bullet Point
              </button>

              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-4">Hero Stats</h3>
              {form.heroStats.map((s, i) => (
                <div key={i} className="glass-card rounded-xl p-4 gradient-border grid sm:grid-cols-3 gap-3">
                  <Field label="Value" value={String(s.value)} onChange={(v) => {
                    const next = [...form.heroStats];
                    next[i] = { ...next[i], value: Number(v) || 0 };
                    setForm({ ...form, heroStats: next });
                  }} />
                  <Field label="Suffix" value={s.suffix} onChange={(v) => {
                    const next = [...form.heroStats];
                    next[i] = { ...next[i], suffix: v };
                    setForm({ ...form, heroStats: next });
                  }} />
                  <Field label="Label" value={s.label} onChange={(v) => {
                    const next = [...form.heroStats];
                    next[i] = { ...next[i], label: v };
                    setForm({ ...form, heroStats: next });
                  }} />
                </div>
              ))}

              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-4">Contact & Map</h3>
              <Field label="Contact Section Title" value={form.contactTitle} onChange={(v) => setForm({ ...form, contactTitle: v })} />
              <Field label="Map Section Title" value={form.mapTitle} onChange={(v) => setForm({ ...form, mapTitle: v })} />
              <Field label="Map Embed URL" value={form.mapEmbedUrl} onChange={(v) => setForm({ ...form, mapEmbedUrl: v })} textarea />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Contact Email" value={form.contactEmail} onChange={(v) => setForm({ ...form, contactEmail: v })} />
                <Field label="Contact Phone" value={form.contactPhone} onChange={(v) => setForm({ ...form, contactPhone: v })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Contact Phone 2" value={form.contactPhone2} onChange={(v) => setForm({ ...form, contactPhone2: v })} />
                <Field label="Fax" value={form.contactFax} onChange={(v) => setForm({ ...form, contactFax: v })} />
              </div>
              <Field label="Contact Address" value={form.contactAddress} onChange={(v) => setForm({ ...form, contactAddress: v })} textarea />
              <Field label="Office Hours" value={form.contactOfficeHours} onChange={(v) => setForm({ ...form, contactOfficeHours: v })} />
            </motion.div>
          )}

          {tab === "services" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label="Section Title" value={form.servicesTitle} onChange={(v) => setForm({ ...form, servicesTitle: v })} />
              <Field label="Section Subtitle" value={form.servicesSubtitle} onChange={(v) => setForm({ ...form, servicesSubtitle: v })} textarea />
              {form.services.map((s, i) => (
                <div key={i} className="glass-card rounded-xl p-5 gradient-border space-y-3">
                  <Field label={`Service ${i + 1} Title`} value={s.title} onChange={(v) => {
                    const next = [...form.services];
                    next[i] = { ...next[i], title: v };
                    setForm({ ...form, services: next });
                  }} />
                  <Field label="Description" value={s.desc} onChange={(v) => {
                    const next = [...form.services];
                    next[i] = { ...next[i], desc: v };
                    setForm({ ...form, services: next });
                  }} textarea />
                </div>
              ))}
            </motion.div>
          )}

          {tab === "clients" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Field label="Section Title" value={form.clientsTitle} onChange={(v) => setForm({ ...form, clientsTitle: v })} />
              {form.clients.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={c}
                    onChange={(e) => {
                      const next = [...form.clients];
                      next[i] = e.target.value;
                      setForm({ ...form, clients: next });
                    }}
                    className="flex-1 glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                  />
                  <button
                    onClick={() => setForm({ ...form, clients: form.clients.filter((_, j) => j !== i) })}
                    className="text-steel hover:text-destructive text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, clients: [...form.clients, "New Client"] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Client
              </button>
            </motion.div>
          )}

          {tab === "certifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label="Section Title" value={form.certificationsTitle} onChange={(v) => setForm({ ...form, certificationsTitle: v })} />
              <Field label="Section Subtitle" value={form.certificationsSubtitle} onChange={(v) => setForm({ ...form, certificationsSubtitle: v })} />
              {form.certifications.map((c, i) => (
                <div key={i} className="glass-card rounded-xl p-5 gradient-border space-y-3">
                  <Field label="Name" value={c.name} onChange={(v) => {
                    const next = [...form.certifications];
                    next[i] = { ...next[i], name: v };
                    setForm({ ...form, certifications: next });
                  }} />
                  <Field label="Detail" value={c.detail} onChange={(v) => {
                    const next = [...form.certifications];
                    next[i] = { ...next[i], detail: v };
                    setForm({ ...form, certifications: next });
                  }} />
                  <Field label="Authority" value={c.authority} onChange={(v) => {
                    const next = [...form.certifications];
                    next[i] = { ...next[i], authority: v };
                    setForm({ ...form, certifications: next });
                  }} />
                  <button
                    onClick={() => setForm({ ...form, certifications: form.certifications.filter((_, j) => j !== i) })}
                    className="text-destructive text-xs hover:underline"
                  >
                    Remove certification
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, certifications: [...form.certifications, { name: "", detail: "", authority: "" }] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Certification
              </button>
            </motion.div>
          )}

          {tab === "testimonials" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label="Section Title" value={form.testimonialsTitle} onChange={(v) => setForm({ ...form, testimonialsTitle: v })} />
              <Field label="Section Subtitle" value={form.testimonialsSubtitle} onChange={(v) => setForm({ ...form, testimonialsSubtitle: v })} />
              {form.testimonials.map((t, i) => (
                <div key={i} className="glass-card rounded-xl p-5 gradient-border space-y-3">
                  <Field label="Quote" value={t.quote} onChange={(v) => {
                    const next = [...form.testimonials];
                    next[i] = { ...next[i], quote: v };
                    setForm({ ...form, testimonials: next });
                  }} textarea />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Field label="Name" value={t.name} onChange={(v) => {
                      const next = [...form.testimonials];
                      next[i] = { ...next[i], name: v };
                      setForm({ ...form, testimonials: next });
                    }} />
                    <Field label="Title" value={t.title} onChange={(v) => {
                      const next = [...form.testimonials];
                      next[i] = { ...next[i], title: v };
                      setForm({ ...form, testimonials: next });
                    }} />
                    <Field label="Organization" value={t.org} onChange={(v) => {
                      const next = [...form.testimonials];
                      next[i] = { ...next[i], org: v };
                      setForm({ ...form, testimonials: next });
                    }} />
                  </div>
                  <div>
                    <label className="block text-steel text-xs uppercase tracking-wider mb-1.5">Linked Project</label>
                    <select
                      value={t.projectSlug || ""}
                      onChange={(e) => {
                        const next = [...form.testimonials];
                        next[i] = { ...next[i], projectSlug: e.target.value || undefined };
                        setForm({ ...form, testimonials: next });
                      }}
                      className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all bg-transparent"
                    >
                      <option value="" className="bg-navy">No linked project</option>
                      {projects.map((p) => (
                        <option key={p.slug} value={p.slug} className="bg-navy">{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setForm({ ...form, testimonials: form.testimonials.filter((_, j) => j !== i) })}
                    className="text-destructive text-xs hover:underline"
                  >
                    Remove testimonial
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, testimonials: [...form.testimonials, { quote: "", name: "", title: "", org: "", projectSlug: "" }] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Testimonial
              </button>
            </motion.div>
          )}

          {tab === "footer" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label="Company Name" value={form.footerCompanyName} onChange={(v) => setForm({ ...form, footerCompanyName: v })} />
              <Field label="Tagline" value={form.footerTagline} onChange={(v) => setForm({ ...form, footerTagline: v })} />
              <Field label="Copyright Text" value={form.footerCopyright} onChange={(v) => setForm({ ...form, footerCopyright: v })} />
              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-2">Service Links</h3>
              {form.footerServiceLinks.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={s}
                    onChange={(e) => {
                      const next = [...form.footerServiceLinks];
                      next[i] = e.target.value;
                      setForm({ ...form, footerServiceLinks: next });
                    }}
                    className="flex-1 glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                  />
                  <button
                    onClick={() => setForm({ ...form, footerServiceLinks: form.footerServiceLinks.filter((_, j) => j !== i) })}
                    className="text-steel hover:text-destructive text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, footerServiceLinks: [...form.footerServiceLinks, "New Link"] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Service Link
              </button>
            </motion.div>
          )}

          {tab === "leads" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminLeads />
            </motion.div>
          )}

          {tab === "chatbot" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass-card rounded-xl p-5 gradient-border space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Key className="text-orange" size={18} />
                  <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">API Keys</h3>
                </div>
                <p className="text-steel text-xs mb-2">⚠️ Keys are stored in localStorage. For production, move to server-side secrets.</p>
                <Field label="Groq API Key" value={form.chatbotConfig.groqApiKey} onChange={(v) => setForm({ ...form, chatbotConfig: { ...form.chatbotConfig, groqApiKey: v } })} placeholder="gsk_..." />
              </div>

              <div className="glass-card rounded-xl p-5 gradient-border space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="text-orange" size={18} />
                  <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">Turso Database</h3>
                </div>
                <Field label="Turso Database URL" value={form.chatbotConfig.tursoUrl} onChange={(v) => setForm({ ...form, chatbotConfig: { ...form.chatbotConfig, tursoUrl: v } })} placeholder="libsql://your-db.turso.io" />
                <Field label="Turso Auth Token" value={form.chatbotConfig.tursoToken} onChange={(v) => setForm({ ...form, chatbotConfig: { ...form.chatbotConfig, tursoToken: v } })} placeholder="eyJ..." />
              </div>

              <div className="glass-card rounded-xl p-5 gradient-border space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="text-orange" size={18} />
                  <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">System Prompt</h3>
                </div>
                <Field label="AI System Prompt" value={form.chatbotConfig.systemPrompt} onChange={(v) => setForm({ ...form, chatbotConfig: { ...form.chatbotConfig, systemPrompt: v } })} textarea rows={6} />
              </div>
            </motion.div>
          )}

          {tab === "whychooseus" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label="Section Title" value={form.whyChooseUs.title} onChange={(v) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, title: v } })} />
              <div className="glass-card rounded-xl p-5 gradient-border space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Years Count" value={form.whyChooseUs.yearsCount} onChange={(v) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, yearsCount: v } })} />
                  <Field label="Years Label" value={form.whyChooseUs.yearsLabel} onChange={(v) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, yearsLabel: v } })} />
                </div>
              </div>
              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">Key Points</h3>
              {form.whyChooseUs.points.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={p}
                    onChange={(e) => {
                      const next = [...form.whyChooseUs.points];
                      next[i] = e.target.value;
                      setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: next } });
                    }}
                    className="flex-1 glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                  />
                  <button
                    onClick={() => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: form.whyChooseUs.points.filter((_, j) => j !== i) } })}
                    className="text-steel hover:text-destructive text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: [...form.whyChooseUs.points, "New point"] } })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Point
              </button>
            </motion.div>
          )}

          {tab === "images" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">Projects Section</h3>
              <Field label="Section Title" value={form.projectsTitle} onChange={(v) => setForm({ ...form, projectsTitle: v })} />
              <Field label="Section Subtitle" value={form.projectsSubtitle} onChange={(v) => setForm({ ...form, projectsSubtitle: v })} textarea />
              <AdminProjectImages />
            </motion.div>
          )}

          {tab === "descriptions" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminProjectDescriptions />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label, value, onChange, textarea, placeholder, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string; rows?: number;
}) => (
  <div>
    <label className="block text-steel text-xs uppercase tracking-wider mb-1.5">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all resize-none"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
      />
    )}
  </div>
);

export default AdminPanel;
