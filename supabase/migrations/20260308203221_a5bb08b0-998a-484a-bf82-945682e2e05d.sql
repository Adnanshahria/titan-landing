
CREATE TABLE public.project_map_pins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text NOT NULL,
  project_slug text,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.project_map_pins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view map pins"
  ON public.project_map_pins FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage map pins"
  ON public.project_map_pins FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
