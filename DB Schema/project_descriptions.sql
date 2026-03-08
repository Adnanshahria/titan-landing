-- Table: project_descriptions
-- Stores editable project overview descriptions, manageable from the admin panel.

CREATE TABLE public.project_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.project_descriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project descriptions"
  ON public.project_descriptions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage project descriptions"
  ON public.project_descriptions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
