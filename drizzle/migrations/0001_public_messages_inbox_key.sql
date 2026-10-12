CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

GRANT INSERT ON public.contact_messages TO anon, authenticated;
CREATE POLICY "Anyone can send a consultation message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) BETWEEN 1 AND 200 AND char_length(email) BETWEEN 3 AND 255 AND char_length(message) BETWEEN 1 AND 5000);

CREATE TABLE public.admin_inbox_key (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  key_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_inbox_key TO service_role;
ALTER TABLE public.admin_inbox_key ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.inbox_key_ok(p_key text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_inbox_key
    WHERE p_key IS NOT NULL AND char_length(p_key) >= 24
      AND key_hash = encode(extensions.digest(p_key, 'sha256'), 'hex')
  )
$$;
REVOKE ALL ON FUNCTION public.inbox_key_ok(text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.admin_list_messages(p_key text)
RETURNS SETOF public.contact_messages LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.inbox_key_ok(p_key) THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY SELECT * FROM public.contact_messages ORDER BY created_at DESC;
END $$;

CREATE OR REPLACE FUNCTION public.admin_delete_message(p_key text, p_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.inbox_key_ok(p_key) THEN RAISE EXCEPTION 'Not authorized'; END IF;
  DELETE FROM public.contact_messages WHERE id = p_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_list_messages(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_message(text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_list_messages(text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_message(text, uuid) TO anon, authenticated, service_role;