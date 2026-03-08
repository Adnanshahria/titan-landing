import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, FileText, Users, Settings, MessageSquare, ArrowLeft,
  Save, Bot, Key, Database, Globe, ImageIcon
} from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminProjectImages from "@/components/admin/AdminProjectImages";
import AdminProjectDescriptions from "@/components/admin/AdminProjectDescriptions";
import { useSiteContent } from "@/context/SiteContext";
import { toast } from "sonner";

type Tab = "general" | "services" | "clients" | "testimonials" | "chatbot" | "images" | "descriptions";

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
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "chatbot", label: "AI Chatbot", icon: Bot },
    { id: "images", label: "Project Images", icon: ImageIcon },
    { id: "descriptions", label: "Descriptions", icon: FileText },
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
              <Field label="About Text" value={form.aboutText} onChange={(v) => setForm({ ...form, aboutText: v })} textarea />
              <Field label="About Highlight" value={form.aboutHighlight} onChange={(v) => setForm({ ...form, aboutHighlight: v })} textarea />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Contact Email" value={form.contactEmail} onChange={(v) => setForm({ ...form, contactEmail: v })} />
                <Field label="Contact Phone" value={form.contactPhone} onChange={(v) => setForm({ ...form, contactPhone: v })} />
              </div>
              <Field label="Contact Address" value={form.contactAddress} onChange={(v) => setForm({ ...form, contactAddress: v })} textarea />
            </motion.div>
          )}

          {tab === "services" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
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

          {tab === "testimonials" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
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
                  <button
                    onClick={() => setForm({ ...form, testimonials: form.testimonials.filter((_, j) => j !== i) })}
                    className="text-destructive text-xs hover:underline"
                  >
                    Remove testimonial
                  </button>
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, testimonials: [...form.testimonials, { quote: "", name: "", title: "", org: "" }] })}
                className="text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
              >
                + Add Testimonial
              </button>
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

          {tab === "images" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminProjectImages />
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
