import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface Lead {
  id: string;
  full_name: string;
  company_name: string;
  phone: string;
  email: string;
  project_type: string;
  message: string;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load leads");
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete lead");
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead deleted");
    }
  };

  if (loading) return <p className="text-steel text-sm">Loading leads...</p>;
  if (leads.length === 0) return <p className="text-steel text-sm">No leads yet.</p>;

  return (
    <div className="space-y-4">
      <p className="text-steel text-xs">{leads.length} lead(s) received</p>
      {leads.map((lead) => (
        <div key={lead.id} className="glass-card rounded-xl p-4 gradient-border space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-foreground font-heading font-semibold text-sm">{lead.full_name}</p>
              {lead.company_name && <p className="text-steel text-xs">{lead.company_name}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-steel text-[10px]">
                {new Date(lead.created_at).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <button onClick={() => deleteLead(lead.id)} className="text-steel hover:text-destructive transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1 text-steel"><Phone size={11} /> {lead.phone}</span>
            <span className="flex items-center gap-1 text-steel"><Mail size={11} /> {lead.email}</span>
            {lead.project_type && lead.project_type !== "Select Project Type" && (
              <span className="bg-orange/10 text-orange px-2 py-0.5 rounded-full text-[10px] font-heading uppercase">{lead.project_type}</span>
            )}
          </div>
          {lead.message && <p className="text-steel text-xs leading-relaxed">{lead.message}</p>}
        </div>
      ))}
    </div>
  );
};

export default AdminLeads;
