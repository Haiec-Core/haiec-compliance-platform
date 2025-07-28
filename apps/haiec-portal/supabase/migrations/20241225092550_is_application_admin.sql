/*
 _    _ ______ _      _____  ______ _____
 | |  | |  ____| |    |  __ \|  ____|  __ \
 | |__| | |__  | |    | |__) | |__  | |__) |
 |  __  |  __| | |    |  ___/|  __| |  _  /
 | |  | | |____| |____| |    | |____| | \ \
 |_|  |_|______|______|_|    |______|_|  \_\
 
 ******************************************************************
 *                                                                *
 * This file creates a helper function is_application_admin       *
 * to check if the current user has application admin privileges  *
 * Used for RLS policies and security checks                      *
 *                                                                *
 ******************************************************************
 */
CREATE OR REPLACE FUNCTION public.is_application_admin("user_id" uuid DEFAULT auth.uid()) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public,
  pg_temp AS $$ BEGIN RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = $1
      AND user_roles.role = 'admin'
  );
END;
$$;

-- Function permissions
ALTER FUNCTION public.is_application_admin(uuid) OWNER TO postgres;

-- Allow authenticated users to execute
REVOKE ALL ON FUNCTION public.is_application_admin(uuid)
FROM public;
REVOKE ALL ON FUNCTION public.is_application_admin(uuid)
FROM anon;
GRANT EXECUTE ON FUNCTION public.is_application_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_application_admin(uuid) TO service_role;