-- Privileged website requests must map to a currently active Supabase Auth
-- session. Password changes and global sign-out delete old auth.sessions rows,
-- which immediately invalidates the corresponding website admin cookies.
CREATE OR REPLACE FUNCTION public.is_active_owner_session(
  p_session_id uuid,
  p_user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.sessions AS auth_session
    JOIN auth.users AS owner_user ON owner_user.id = auth_session.user_id
    WHERE auth_session.id = p_session_id
      AND auth_session.user_id = p_user_id
      AND lower(owner_user.email) = 'jordilwbailey@gmail.com'
      AND (auth_session.not_after IS NULL OR auth_session.not_after > now())
  );
$$;

REVOKE ALL ON FUNCTION public.is_active_owner_session(uuid, uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_active_owner_session(uuid, uuid)
  TO service_role;

COMMENT ON FUNCTION public.is_active_owner_session(uuid, uuid) IS
  'Service-role-only guard for the 366 Industries owner administrator session.';
