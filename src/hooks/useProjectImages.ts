import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProjectImage {
  id: string;
  image_url: string;
  sort_order: number;
}

export const useProjectImages = (projectSlug: string | undefined) => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectSlug) return;

    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("project_images")
        .select("id, image_url, sort_order")
        .eq("project_slug", projectSlug)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setImages(data);
      }
      setLoading(false);
    };

    fetchImages();
  }, [projectSlug]);

  return { images, loading };
};
