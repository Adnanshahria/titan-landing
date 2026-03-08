import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { projects } from "@/data/projects";
import { Upload, Trash2, GripVertical, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ProjectImage {
  id: string;
  project_slug: string;
  image_url: string;
  sort_order: number;
}

const AdminProjectImages = () => {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug || "");
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    if (!selectedSlug) return;
    const { data } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_slug", selectedSlug)
      .order("sort_order", { ascending: true });
    if (data) setImages(data as ProjectImage[]);
  };

  useEffect(() => {
    fetchImages();
  }, [selectedSlug]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop();
        const path = `${selectedSlug}/${Date.now()}-${i}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(path, file);

        if (uploadError) {
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(path);

        await supabase.from("project_images").insert({
          project_slug: selectedSlug,
          image_url: urlData.publicUrl,
          sort_order: images.length + i,
        });
      }

      toast.success("Images uploaded!");
      fetchImages();
    } catch {
      toast.error("Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (img: ProjectImage) => {
    // Extract path from URL
    const urlParts = img.image_url.split("/project-images/");
    const storagePath = urlParts[1];

    if (storagePath) {
      await supabase.storage.from("project-images").remove([storagePath]);
    }

    await supabase.from("project_images").delete().eq("id", img.id);
    toast.success("Image deleted");
    fetchImages();
  };

  return (
    <div className="space-y-6">
      {/* Project selector */}
      <div>
        <label className="block text-steel text-xs uppercase tracking-wider mb-1.5">Select Project</label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all bg-transparent"
        >
          {projects.map((p) => (
            <option key={p.slug} value={p.slug} className="bg-navy text-primary-foreground">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload area */}
      <div className="glass-card rounded-xl p-6 gradient-border">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="text-orange" size={18} />
          <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm">Upload Images</h3>
        </div>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-steel/20 rounded-xl p-8 cursor-pointer hover:border-orange/30 transition-colors">
          <ImageIcon className="text-steel mb-2" size={32} />
          <p className="text-steel text-sm">
            {uploading ? "Uploading..." : "Click or drag to upload images"}
          </p>
          <p className="text-steel/50 text-xs mt-1">JPG, PNG, WebP supported</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Image grid */}
      <div>
        <h3 className="font-heading text-primary-foreground font-semibold uppercase text-sm mb-3">
          Images ({images.length})
        </h3>
        {images.length === 0 ? (
          <p className="text-steel text-sm">No images uploaded for this project yet. The default cover image will be used.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((img, i) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-video">
                <img
                  src={img.image_url}
                  alt={`Project image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="text-primary-foreground text-xs font-heading font-semibold">#{i + 1}</span>
                  <button
                    onClick={() => handleDelete(img)}
                    className="w-8 h-8 rounded-full bg-destructive/80 flex items-center justify-center text-white hover:bg-destructive transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectImages;
