import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Trash2, Edit2, Save, X, Eye, EyeOff } from "lucide-react";
import { useAllMapPins, useCreateMapPin, useUpdateMapPin, useDeleteMapPin, MapPin as MapPinType } from "@/hooks/useMapPins";
import { projects } from "@/data/projects";
import { toast } from "sonner";

const emptyPin = {
  project_name: "",
  project_slug: "",
  description: "",
  image_url: "",
  location: "",
  category: "",
  year: "",
  latitude: 23.8103,
  longitude: 90.4125,
  is_active: true,
};

const AdminMapPins = () => {
  const { data: pins = [], isLoading } = useAllMapPins();
  const createPin = useCreateMapPin();
  const updatePin = useUpdateMapPin();
  const deletePin = useDeleteMapPin();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MapPinType>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newPin, setNewPin] = useState({ ...emptyPin });

  const handleCreate = async () => {
    if (!newPin.project_name || !newPin.latitude || !newPin.longitude) {
      toast.error("Project name and coordinates are required!");
      return;
    }
    try {
      await createPin.mutateAsync(newPin as any);
      toast.success("Map pin added!");
      setNewPin({ ...emptyPin });
      setShowAdd(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updatePin.mutateAsync({ id, ...editForm });
      toast.success("Pin updated!");
      setEditingId(null);
      setEditForm({});
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this map pin?")) return;
    try {
      await deletePin.mutateAsync(id);
      toast.success("Pin deleted!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleToggleActive = async (pin: MapPinType) => {
    try {
      await updatePin.mutateAsync({ id: pin.id, is_active: !pin.is_active });
      toast.success(pin.is_active ? "Pin hidden" : "Pin visible");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const startEdit = (pin: MapPinType) => {
    setEditingId(pin.id);
    setEditForm({
      project_name: pin.project_name,
      project_slug: pin.project_slug,
      description: pin.description,
      image_url: pin.image_url,
      location: pin.location,
      category: pin.category,
      year: pin.year,
      latitude: pin.latitude,
      longitude: pin.longitude,
    });
  };

  if (isLoading) return <p className="text-steel text-sm">Loading map pins...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-steel text-sm">{pins.length} map pins configured</p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-1.5 text-orange text-sm font-heading uppercase tracking-wider hover:text-orange-glow transition-colors"
        >
          <Plus size={14} /> Add Pin
        </button>
      </div>

      {/* Add new pin form */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-card rounded-xl p-5 gradient-border space-y-3"
        >
          <h4 className="font-heading text-primary-foreground font-semibold uppercase text-xs">New Map Pin</h4>
          <PinForm
            form={newPin}
            onChange={setNewPin}
          />
          <div className="flex gap-2 pt-2">
            <button onClick={handleCreate} className="inline-flex items-center gap-1.5 bg-orange text-secondary-foreground px-4 py-2 rounded-lg text-xs font-heading font-semibold uppercase hover:bg-orange-glow transition-colors">
              <Save size={12} /> Save
            </button>
            <button onClick={() => setShowAdd(false)} className="text-steel text-xs hover:text-primary-foreground transition-colors">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Existing pins */}
      <div className="space-y-3">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className={`glass-card rounded-xl p-4 gradient-border transition-all ${!pin.is_active ? "opacity-50" : ""}`}
          >
            {editingId === pin.id ? (
              <div className="space-y-3">
                <PinForm
                  form={editForm}
                  onChange={(v) => setEditForm({ ...editForm, ...v })}
                />
                <div className="flex gap-2 pt-2">
                  <button onClick={() => handleUpdate(pin.id)} className="inline-flex items-center gap-1.5 bg-orange text-secondary-foreground px-4 py-2 rounded-lg text-xs font-heading font-semibold uppercase hover:bg-orange-glow transition-colors">
                    <Save size={12} /> Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-steel text-xs hover:text-primary-foreground transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange shrink-0" />
                    <h4 className="font-heading text-primary-foreground font-semibold text-sm truncate">{pin.project_name}</h4>
                  </div>
                  <p className="text-steel text-xs mt-1 truncate">{pin.location} • {pin.category} • {pin.year}</p>
                  <p className="text-steel/60 text-[10px] mt-0.5">Lat: {pin.latitude}, Lng: {pin.longitude}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => handleToggleActive(pin)} className="p-1.5 rounded-lg hover:bg-steel/10 transition-colors" title={pin.is_active ? "Hide" : "Show"}>
                    {pin.is_active ? <Eye size={14} className="text-steel" /> : <EyeOff size={14} className="text-steel" />}
                  </button>
                  <button onClick={() => startEdit(pin)} className="p-1.5 rounded-lg hover:bg-steel/10 transition-colors">
                    <Edit2 size={14} className="text-steel" />
                  </button>
                  <button onClick={() => handleDelete(pin.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                    <Trash2 size={14} className="text-destructive" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PinForm = ({ form, onChange }: { form: any; onChange: (v: any) => void }) => (
  <div className="space-y-3">
    <div className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Project Name *</label>
        <input
          value={form.project_name || ""}
          onChange={(e) => onChange({ ...form, project_name: e.target.value })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          placeholder="e.g. Dohazari Power Plant"
        />
      </div>
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Linked Project</label>
        <select
          value={form.project_slug || ""}
          onChange={(e) => onChange({ ...form, project_slug: e.target.value || null })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all bg-transparent"
        >
          <option value="" className="bg-navy">No linked project</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug} className="bg-navy">{p.name}</option>
          ))}
        </select>
      </div>
    </div>
    <div>
      <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Description</label>
      <textarea
        value={form.description || ""}
        onChange={(e) => onChange({ ...form, description: e.target.value })}
        rows={2}
        className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all resize-none"
        placeholder="Short project description..."
      />
    </div>
    <div className="grid sm:grid-cols-3 gap-3">
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Location</label>
        <input
          value={form.location || ""}
          onChange={(e) => onChange({ ...form, location: e.target.value })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          placeholder="e.g. Chittagong"
        />
      </div>
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Category</label>
        <input
          value={form.category || ""}
          onChange={(e) => onChange({ ...form, category: e.target.value })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          placeholder="e.g. Power Sector"
        />
      </div>
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Year</label>
        <input
          value={form.year || ""}
          onChange={(e) => onChange({ ...form, year: e.target.value })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          placeholder="e.g. 2023"
        />
      </div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Latitude *</label>
        <input
          type="number"
          step="0.0001"
          value={form.latitude || ""}
          onChange={(e) => onChange({ ...form, latitude: parseFloat(e.target.value) || 0 })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          placeholder="e.g. 22.3569"
        />
      </div>
      <div>
        <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Longitude *</label>
        <input
          type="number"
          step="0.0001"
          value={form.longitude || ""}
          onChange={(e) => onChange({ ...form, longitude: parseFloat(e.target.value) || 0 })}
          className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          placeholder="e.g. 91.7832"
        />
      </div>
    </div>
    <div>
      <label className="block text-steel text-[10px] uppercase tracking-wider mb-1">Image URL (optional)</label>
      <input
        value={form.image_url || ""}
        onChange={(e) => onChange({ ...form, image_url: e.target.value })}
        className="w-full glass-card text-primary-foreground rounded-lg px-3 py-2 text-xs focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
        placeholder="https://..."
      />
    </div>
  </div>
);

export default AdminMapPins;
