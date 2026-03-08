import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useProjectDescription = (slug?: string) => {
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("project_descriptions")
      .select("description")
      .eq("project_slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setDescription(data?.description ?? null);
        setLoading(false);
      });
  }, [slug]);

  return { description, loading };
};
