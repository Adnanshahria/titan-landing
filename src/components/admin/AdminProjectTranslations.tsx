import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { useAllProjectTranslations, useSaveProjectTranslation } from "@/hooks/useProjectTranslations";
import { toast } from "sonner";
import { Save, Languages } from "lucide-react";

const AdminProjectTranslations = () => {
  const { data: translations = [] } = useAllProjectTranslations();
  const saveMutation = useSaveProjectTranslation();
  const [forms, setForms] = useState<Record<string, {
    name_bn: string;
    description_bn: string;
    client_bn: string;
    location_bn: string;
    scope_bn: string[];
  }>>({});

  useEffect(() => {
    const map: typeof forms = {};
    projects.forEach((p) => {
      const existing = translations.find((t) => t.project_slug === p.slug);
      map[p.slug] = {
        name_bn: existing?.name_bn || "",
        description_bn: existing?.description_bn || "",
        client_bn: existing?.client_bn || "",
        location_bn: existing?.location_bn || "",
        scope_bn: existing?.scope_bn?.length ? existing.scope_bn : p.scope.map(() => ""),
      };
    });
    setForms(map);
  }, [translations]);

  const saveTranslation = async (slug: string) => {
    const form = forms[slug];
    if (!form) return;
    try {
      await saveMutation.mutateAsync({
        project_slug: slug,
        ...form,
      });
      toast.success("বাংলা অনুবাদ সংরক্ষিত হয়েছে!");
    } catch {
      toast.error("সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  const updateField = (slug: string, field: string, value: string | string[]) => {
    setForms((prev) => ({ ...prev, [slug]: { ...prev[slug], [field]: value } }));
  };

  return (
    <div className="space-y-6">
      <p className="text-steel text-xs">প্রতিটি প্রকল্পের বাংলা অনুবাদ এখানে যোগ/সম্পাদনা করুন। খালি রাখলে ইংরেজি দেখাবে।</p>
      {projects.map((p) => {
        const form = forms[p.slug];
        if (!form) return null;
        return (
          <div key={p.slug} className="glass-card rounded-xl p-5 gradient-border space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Languages size={14} className="text-orange" />
              <h3 className="font-heading text-primary-foreground font-semibold text-sm uppercase">{p.name}</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-steel text-xs uppercase tracking-wider mb-1">প্রকল্পের নাম (বাংলা)</label>
                <input
                  value={form.name_bn}
                  onChange={(e) => updateField(p.slug, "name_bn", e.target.value)}
                  placeholder={p.name}
                  className="w-full glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-steel text-xs uppercase tracking-wider mb-1">ক্লায়েন্ট (বাংলা)</label>
                <input
                  value={form.client_bn}
                  onChange={(e) => updateField(p.slug, "client_bn", e.target.value)}
                  placeholder={p.client}
                  className="w-full glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-steel text-xs uppercase tracking-wider mb-1">অবস্থান (বাংলা)</label>
              <input
                value={form.location_bn}
                onChange={(e) => updateField(p.slug, "location_bn", e.target.value)}
                placeholder={p.location}
                className="w-full glass-card text-primary-foreground rounded-xl px-4 py-2.5 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-steel text-xs uppercase tracking-wider mb-1">বিবরণ (বাংলা)</label>
              <textarea
                value={form.description_bn}
                onChange={(e) => updateField(p.slug, "description_bn", e.target.value)}
                placeholder={p.details}
                rows={3}
                className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-steel text-xs uppercase tracking-wider mb-2">কাজের পরিধি (বাংলা)</label>
              {form.scope_bn.map((s, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <span className="text-steel text-xs w-4 shrink-0">{i + 1}.</span>
                  <input
                    value={s}
                    onChange={(e) => {
                      const next = [...form.scope_bn];
                      next[i] = e.target.value;
                      updateField(p.slug, "scope_bn", next);
                    }}
                    placeholder={p.scope[i] || ""}
                    className="flex-1 glass-card text-primary-foreground rounded-xl px-4 py-2 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => saveTranslation(p.slug)}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground font-heading font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-orange/20 transition-all disabled:opacity-50"
            >
              <Save size={12} /> {saveMutation.isPending ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AdminProjectTranslations;
