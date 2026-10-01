INSERT INTO public.site_content (
  page,
  section,
  sort_order,
  eyebrow,
  title,
  subtitle,
  body,
  meta
)
SELECT
  'global',
  'footer',
  1,
  'Office',
  'Owerri, Imo State',
  'Regulated by the Nigerian Bar Association and the Rules of Professional Conduct. Prior results do not guarantee a similar outcome.',
  'Owerri, Imo State, Nigeria',
  '+234 (0) 9 291 0142 · chambers@equitychambers.ng'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.site_content
  WHERE page = 'global' AND section = 'footer'
);