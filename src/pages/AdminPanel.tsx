import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import {
  Home, FileText, Users, Settings, MessageSquare, ArrowLeft,
  Save, Bot, Key, Database, Globe, ImageIcon, Inbox, Layout, MapPin, Languages
} from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminProjectImages from "@/components/admin/AdminProjectImages";
import AdminProjectDescriptions from "@/components/admin/AdminProjectDescriptions";
import AdminProjectTranslations from "@/components/admin/AdminProjectTranslations";
import AdminLeads from "@/components/admin/AdminLeads";
import AdminMapPins from "@/components/admin/AdminMapPins";
import { useSiteContent } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

type Tab = "general" | "services" | "clients" | "certifications" | "testimonials" | "whychooseus" | "footer" | "leads" | "chatbot" | "images" | "descriptions" | "translations" | "mappins";

const AdminPanel = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin-auth") === "1");
  const [tab, setTab] = useState<Tab>("general");
  const { content, updateContent } = useSiteContent();
  const { t } = useLanguage();

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
    { id: "general", label: t("admin.general"), icon: Home },
    { id: "services", label: t("admin.services"), icon: FileText },
    { id: "clients", label: t("admin.clients"), icon: Users },
    { id: "certifications", label: t("admin.certifications"), icon: Settings },
    { id: "testimonials", label: t("admin.testimonials"), icon: MessageSquare },
    { id: "whychooseus", label: t("admin.whyChooseUs"), icon: Settings },
    { id: "footer", label: t("admin.footer"), icon: Layout },
    { id: "leads", label: t("admin.leads"), icon: Inbox },
    { id: "chatbot", label: t("admin.chatbot"), icon: Bot },
    { id: "images", label: t("admin.images"), icon: ImageIcon },
    { id: "descriptions", label: t("admin.descriptions"), icon: FileText },
    { id: "translations", label: "Translations (বাংলা)", icon: Languages },
    { id: "mappins", label: t("admin.mapPins"), icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Sidebar */}
      <div className="w-60 bg-navy-card border-r border-steel/10 flex flex-col shrink-0">
        <div className="p-5 border-b border-steel/10">
          <h2 className="font-heading text-primary-foreground font-bold uppercase text-sm tracking-wider">{t("admin.title")}</h2>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === tabItem.id ? "bg-orange/10 text-orange" : "text-steel hover:text-primary-foreground hover:bg-steel/5"
              }`}
            >
              <tabItem.icon size={16} />
              {tabItem.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-steel/10 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-steel text-xs hover:text-orange transition-colors">
            <ArrowLeft size={14} /> {t("admin.backToSite")}
          </Link>
          <button
            onClick={() => { sessionStorage.removeItem("admin-auth"); setAuthed(false); }}
            className="text-steel text-xs hover:text-destructive transition-colors"
          >
            {t("admin.logout")}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-navy/90 backdrop-blur-md border-b border-steel/10 px-8 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl text-primary-foreground font-bold uppercase">{tabs.find((tabItem) => tabItem.id === tab)?.label}</h1>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground font-heading font-semibold px-5 py-2 rounded-full text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange/20 transition-all"
          >
            <Save size={14} /> {t("admin.saveChanges")}
          </button>
        </div>

        <div className="p-8 max-w-4xl">
          {tab === "general" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label={t("admin.heroHeadline")} value={form.heroHeadline} onChange={(v) => setForm({ ...form, heroHeadline: v })} textarea />
              <Field label={t("admin.heroSubheadline")} value={form.heroSubheadline} onChange={(v) => setForm({ ...form, heroSubheadline: v })} />

              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-4">{t("admin.aboutSection")}</h3>
              <Field label={t("admin.aboutTitle")} value={form.aboutTitle} onChange={(v) => setForm({ ...form, aboutTitle: v })} />
              <Field label={t("admin.aboutSubtitle")} value={form.aboutSubtitle} onChange={(v) => setForm({ ...form, aboutSubtitle: v })} />
              <Field label={t("admin.aboutText")} value={form.aboutText} onChange={(v) => setForm({ ...form, aboutText: v })} textarea />
              <Field label={t("admin.aboutHighlight")} value={form.aboutHighlight} onChange={(v) => setForm({ ...form, aboutHighlight: v })} textarea />
              <h4 className="font-heading text-primary-foreground font-semibold uppercase text-xs pt-2">{t("admin.aboutBullets")}</h4>
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
                    {t("common.remove")}
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, aboutBullets: [...form.aboutBullets, "New bullet point"] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                {t("common.addBulletPoint")}
              </button>

              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-4">{t("admin.heroStats")}</h3>
              {form.heroStats.map((s, i) => (
                <div key={i} className="glass-card rounded-xl p-4 gradient-border grid sm:grid-cols-3 gap-3">
                  <Field label={t("admin.value")} value={String(s.value)} onChange={(v) => {
                    const next = [...form.heroStats];
                    next[i] = { ...next[i], value: Number(v) || 0 };
                    setForm({ ...form, heroStats: next });
                  }} />
                  <Field label={t("admin.suffix")} value={s.suffix} onChange={(v) => {
                    const next = [...form.heroStats];
                    next[i] = { ...next[i], suffix: v };
                    setForm({ ...form, heroStats: next });
                  }} />
                  <Field label={t("admin.label")} value={s.label} onChange={(v) => {
                    const next = [...form.heroStats];
                    next[i] = { ...next[i], label: v };
                    setForm({ ...form, heroStats: next });
                  }} />
                </div>
              ))}

              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-4">{t("admin.contactMap")}</h3>
              <Field label={t("admin.contactSectionTitle")} value={form.contactTitle} onChange={(v) => setForm({ ...form, contactTitle: v })} />
              <Field label={t("admin.mapSectionTitle")} value={form.mapTitle} onChange={(v) => setForm({ ...form, mapTitle: v })} />
              <Field label={t("admin.mapEmbedUrl")} value={form.mapEmbedUrl} onChange={(v) => setForm({ ...form, mapEmbedUrl: v })} textarea />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("admin.contactEmail")} value={form.contactEmail} onChange={(v) => setForm({ ...form, contactEmail: v })} />
                <Field label={t("admin.contactPhone")} value={form.contactPhone} onChange={(v) => setForm({ ...form, contactPhone: v })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("admin.contactPhone2")} value={form.contactPhone2} onChange={(v) => setForm({ ...form, contactPhone2: v })} />
                <Field label={t("admin.fax")} value={form.contactFax} onChange={(v) => setForm({ ...form, contactFax: v })} />
              </div>
              <Field label={t("admin.contactAddress")} value={form.contactAddress} onChange={(v) => setForm({ ...form, contactAddress: v })} textarea />
              <Field label={t("admin.officeHours")} value={form.contactOfficeHours} onChange={(v) => setForm({ ...form, contactOfficeHours: v })} />
            </motion.div>
          )}

          {tab === "services" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label={t("admin.sectionTitle")} value={form.servicesTitle} onChange={(v) => setForm({ ...form, servicesTitle: v })} />
              <Field label={t("admin.sectionSubtitle")} value={form.servicesSubtitle} onChange={(v) => setForm({ ...form, servicesSubtitle: v })} textarea />
              {form.services.map((s, i) => (
                <div key={i} className="glass-card rounded-xl p-5 gradient-border space-y-3">
                  <Field label={`${t("admin.serviceTitle")} ${i + 1}`} value={s.title} onChange={(v) => {
                    const next = [...form.services];
                    next[i] = { ...next[i], title: v };
                    setForm({ ...form, services: next });
                  }} />
                  <Field label={t("admin.description")} value={s.desc} onChange={(v) => {
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
              <Field label={t("admin.sectionTitle")} value={form.clientsTitle} onChange={(v) => setForm({ ...form, clientsTitle: v })} />
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
                    {t("common.remove")}
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, clients: [...form.clients, "New Client"] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                {t("common.addClient")}
              </button>
            </motion.div>
          )}

          {tab === "certifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label={t("admin.sectionTitle")} value={form.certificationsTitle} onChange={(v) => setForm({ ...form, certificationsTitle: v })} />
              <Field label={t("admin.sectionSubtitle")} value={form.certificationsSubtitle} onChange={(v) => setForm({ ...form, certificationsSubtitle: v })} />
              {form.certifications.map((c, i) => (
                <div key={i} className="glass-card rounded-xl p-5 gradient-border space-y-3">
                  <Field label={t("admin.name")} value={c.name} onChange={(v) => {
                    const next = [...form.certifications];
                    next[i] = { ...next[i], name: v };
                    setForm({ ...form, certifications: next });
                  }} />
                  <Field label={t("admin.detail")} value={c.detail} onChange={(v) => {
                    const next = [...form.certifications];
                    next[i] = { ...next[i], detail: v };
                    setForm({ ...form, certifications: next });
                  }} />
                  <Field label={t("admin.authority")} value={c.authority} onChange={(v) => {
                    const next = [...form.certifications];
                    next[i] = { ...next[i], authority: v };
                    setForm({ ...form, certifications: next });
                  }} />
                  <button
                    onClick={() => setForm({ ...form, certifications: form.certifications.filter((_, j) => j !== i) })}
                    className="text-destructive text-xs hover:underline"
                  >
                    {t("common.removeCertification")}
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, certifications: [...form.certifications, { name: "", detail: "", authority: "" }] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                {t("common.addCertification")}
              </button>
            </motion.div>
          )}

          {tab === "testimonials" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label={t("admin.sectionTitle")} value={form.testimonialsTitle} onChange={(v) => setForm({ ...form, testimonialsTitle: v })} />
              <Field label={t("admin.sectionSubtitle")} value={form.testimonialsSubtitle} onChange={(v) => setForm({ ...form, testimonialsSubtitle: v })} />
              {form.testimonials.map((testimonial, i) => (
                <div key={i} className="glass-card rounded-xl p-5 gradient-border space-y-3">
                  <Field label={t("admin.quote")} value={testimonial.quote} onChange={(v) => {
                    const next = [...form.testimonials];
                    next[i] = { ...next[i], quote: v };
                    setForm({ ...form, testimonials: next });
                  }} textarea />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Field label={t("admin.name")} value={testimonial.name} onChange={(v) => {
                      const next = [...form.testimonials];
                      next[i] = { ...next[i], name: v };
                      setForm({ ...form, testimonials: next });
                    }} />
                    <Field label={t("admin.title2")} value={testimonial.title} onChange={(v) => {
                      const next = [...form.testimonials];
                      next[i] = { ...next[i], title: v };
                      setForm({ ...form, testimonials: next });
                    }} />
                    <Field label={t("admin.organization")} value={testimonial.org} onChange={(v) => {
                      const next = [...form.testimonials];
                      next[i] = { ...next[i], org: v };
                      setForm({ ...form, testimonials: next });
                    }} />
                  </div>
                  <div>
                    <label className="block text-steel text-xs uppercase tracking-wider mb-1.5">{t("admin.linkedProject")}</label>
                    <select
                      value={testimonial.projectSlug || ""}
                      onChange={(e) => {
                        const next = [...form.testimonials];
                        next[i] = { ...next[i], projectSlug: e.target.value || undefined };
                        setForm({ ...form, testimonials: next });
                      }}
                      className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all bg-transparent"
                    >
                      <option value="" className="bg-navy">{t("admin.noLinkedProject")}</option>
                      {projects.map((p) => (
                        <option key={p.slug} value={p.slug} className="bg-navy">{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setForm({ ...form, testimonials: form.testimonials.filter((_, j) => j !== i) })}
                    className="text-destructive text-xs hover:underline"
                  >
                    {t("common.removeTestimonial")}
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, testimonials: [...form.testimonials, { quote: "", name: "", title: "", org: "", projectSlug: "" }] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                {t("common.addTestimonial")}
              </button>
            </motion.div>
          )}

          {tab === "footer" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label={t("admin.companyName")} value={form.footerCompanyName} onChange={(v) => setForm({ ...form, footerCompanyName: v })} />
              <Field label={t("admin.tagline")} value={form.footerTagline} onChange={(v) => setForm({ ...form, footerTagline: v })} />
              <Field label={t("admin.copyrightText")} value={form.footerCopyright} onChange={(v) => setForm({ ...form, footerCopyright: v })} />
              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm pt-2">{t("admin.serviceLinks")}</h3>
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
                    {t("common.remove")}
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, footerServiceLinks: [...form.footerServiceLinks, "New Link"] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                {t("common.addServiceLink")}
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
                  <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">{t("admin.apiKeys")}</h3>
                </div>
                <p className="text-steel text-xs mb-2">{t("admin.apiKeysWarning")}</p>
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
                  <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">{t("admin.systemPrompt")}</h3>
                </div>
                <Field label={t("admin.aiSystemPrompt")} value={form.chatbotConfig.systemPrompt} onChange={(v) => setForm({ ...form, chatbotConfig: { ...form.chatbotConfig, systemPrompt: v } })} textarea rows={6} />
              </div>
            </motion.div>
          )}

          {tab === "whychooseus" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Field label={t("admin.sectionTitle")} value={form.whyChooseUs.title} onChange={(v) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, title: v } })} />
              <div className="glass-card rounded-xl p-5 gradient-border space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t("admin.yearsCount")} value={form.whyChooseUs.yearsCount} onChange={(v) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, yearsCount: v } })} />
                  <Field label={t("admin.yearsLabel")} value={form.whyChooseUs.yearsLabel} onChange={(v) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, yearsLabel: v } })} />
                </div>
              </div>
              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">{t("admin.keyPoints")}</h3>
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
                    {t("common.remove")}
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: [...form.whyChooseUs.points, "New point"] } })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                {t("common.addPoint")}
              </button>
            </motion.div>
          )}

          {tab === "images" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">{t("admin.projectsSection")}</h3>
              <Field label={t("admin.sectionTitle")} value={form.projectsTitle} onChange={(v) => setForm({ ...form, projectsTitle: v })} />
              <Field label={t("admin.sectionSubtitle")} value={form.projectsSubtitle} onChange={(v) => setForm({ ...form, projectsSubtitle: v })} textarea />
              <AdminProjectImages />
            </motion.div>
          )}

          {tab === "descriptions" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminProjectDescriptions />
            </motion.div>
          )}

          {tab === "mappins" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminMapPins />
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
