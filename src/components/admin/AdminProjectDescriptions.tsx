import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { projects } from "@/data/projects";
import { toast } from "sonner";
import { Save, FileText } from "lucide-react";

const AdminProjectDescriptions = () => {
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    // Load existing descriptions from DB
    supabase
      .from("project_descriptions")
      .select("project_slug, description")
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach((d) => {
          map[d.project_slug] = d.description;
        });
        // Fill missing with static defaults
        projects.forEach((p) => {
          if (!map[p.slug]) map[p.slug] = p.details;
        });
        setDescriptions(map);
      });
  }, []);

  const saveDescription = async (slug: string) => {
    setSaving(slug);
    const { error } = await supabase
      .from("project_descriptions")
      .upsert(
        { project_slug: slug, description: descriptions[slug], updated_at: new Date().toISOString() },
        { onConflict: "project_slug" }
      );
    setSaving(null);
    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Description saved!");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-steel text-xs">Edit the overview description shown on each project's detail page.</p>
      {projects.map((p) => (
        <div key={p.slug} className="glass-card rounded-xl p-5 gradient-border space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={14} className="text-orange" />
            <h3 className="font-heading text-primary-foreground font-semibold text-sm uppercase">{p.name}</h3>
          </div>
          <textarea
            value={descriptions[p.slug] ?? p.details}
            onChange={(e) => setDescriptions((prev) => ({ ...prev, [p.slug]: e.target.value }))}
            rows={4}
            className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all resize-none"
          />
          <button
            onClick={() => saveDescription(p.slug)}
            disabled={saving === p.slug}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground font-heading font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-orange/20 transition-all disabled:opacity-50"
          >
            <Save size={12} /> {saving === p.slug ? "Saving..." : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProjectDescriptions;
