-- Table: project_images
-- Stores additional images for each project, manageable from the admin panel.

CREATE TABLE public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug text NOT NULL,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project images"
  ON public.project_images FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage project images"
  ON public.project_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
