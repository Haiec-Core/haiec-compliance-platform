CREATE OR REPLACE FUNCTION "public"."make_user_app_admin"("user_id_arg" "uuid") RETURNS "void" LANGUAGE "plpgsql"
SET search_path = public,
  pg_temp AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only supabase_admin, dashboard_user, postgres can execute this function';
END IF;

INSERT INTO public.user_roles (user_id, role)
VALUES (user_id_arg, 'admin') ON CONFLICT (user_id, role) DO NOTHING;
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{user_role}',
    '"admin"'
  )
WHERE id = user_id_arg;

END;
$$;

ALTER FUNCTION "public"."make_user_app_admin"("user_id_arg" "uuid") OWNER TO "postgres";

REVOKE ALL ON FUNCTION public.make_user_app_admin(uuid)
FROM public,
  anon,
  authenticated,
  service_role;

CREATE OR REPLACE FUNCTION "public"."remove_app_admin_privilege_for_user"("user_id_arg" "uuid") RETURNS "void" LANGUAGE "plpgsql"
SET search_path = public,
  pg_temp AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only  supabase_admin, dashboard_user, postgres can execute this function';
END IF;

DELETE FROM public.user_roles
WHERE user_id = user_id_arg
  AND role = 'admin';

UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data - 'user_role'
WHERE id = user_id_arg
  AND raw_app_meta_data ? 'user_role';
END;
$$;

ALTER FUNCTION "public"."remove_app_admin_privilege_for_user"("user_id_arg" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION public.remove_app_admin_privilege_for_user(uuid)
FROM public,
  anon,
  authenticated,
  service_role;