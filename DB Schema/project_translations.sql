-- Table: project_translations
-- Stores Bangla translations for project details.

CREATE TABLE public.project_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug text NOT NULL UNIQUE,
  name_bn text NOT NULL DEFAULT ''::text,
  description_bn text NOT NULL DEFAULT ''::text,
  client_bn text NOT NULL DEFAULT ''::text,
  location_bn text NOT NULL DEFAULT ''::text,
  scope_bn text[] NOT NULL DEFAULT '{}'::text[],
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.project_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project translations"
  ON public.project_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage project translations"
  ON public.project_translations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
