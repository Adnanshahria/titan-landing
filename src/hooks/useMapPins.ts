import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MapPin {
  id: string;
  project_name: string;
  project_slug: string | null;
  description: string;
  image_url: string;
  location: string;
  category: string;
  year: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useMapPins = () => {
  return useQuery({
    queryKey: ["map-pins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_map_pins")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as MapPin[];
    },
  });
};

export const useAllMapPins = () => {
  return useQuery({
    queryKey: ["map-pins-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_map_pins")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as MapPin[];
    },
  });
};

export const useCreateMapPin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pin: Omit<MapPin, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("project_map_pins")
        .insert(pin)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["map-pins"] });
      qc.invalidateQueries({ queryKey: ["map-pins-all"] });
    },
  });
};

export const useUpdateMapPin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<MapPin> & { id: string }) => {
      const { data, error } = await supabase
        .from("project_map_pins")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["map-pins"] });
      qc.invalidateQueries({ queryKey: ["map-pins-all"] });
    },
  });
};

export const useDeleteMapPin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("project_map_pins")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["map-pins"] });
      qc.invalidateQueries({ queryKey: ["map-pins-all"] });
    },
  });
};
