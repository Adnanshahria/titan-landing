import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProjectTranslation {
  id: string;
  project_slug: string;
  name_bn: string;
  description_bn: string;
  client_bn: string;
  location_bn: string;
  scope_bn: string[];
  updated_at: string;
}

export const useProjectTranslation = (slug?: string) => {
  const { data } = useQuery({
    queryKey: ["project-translation", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("project_translations")
        .select("*")
        .eq("project_slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as ProjectTranslation | null;
    },
    enabled: !!slug,
  });
  return { translation: data };
};

export const useAllProjectTranslations = () => {
  return useQuery({
    queryKey: ["project-translations-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_translations")
        .select("*");
      if (error) throw error;
      return data as ProjectTranslation[];
    },
  });
};

export const useSaveProjectTranslation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Omit<ProjectTranslation, "id" | "updated_at">) => {
      const { data, error } = await supabase
        .from("project_translations")
        .upsert(
          { ...t, updated_at: new Date().toISOString() },
          { onConflict: "project_slug" }
        )
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["project-translations-all"] });
      qc.invalidateQueries({ queryKey: ["project-translation", data.project_slug] });
    },
  });
};
