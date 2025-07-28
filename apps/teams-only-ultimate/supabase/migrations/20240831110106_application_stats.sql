-- Application admin functions
CREATE OR REPLACE FUNCTION "public"."app_admin_get_workspaces_created_per_month"() RETURNS TABLE(
    "month" "date",
    "number_of_workspaces" integer
  ) LANGUAGE "plpgsql" AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
CREATE TEMPORARY TABLE temp_result (MONTH DATE, number_of_workspaces INTEGER) ON COMMIT DROP;

  WITH date_series AS (
  SELECT DATE_TRUNC('MONTH', dd)::DATE AS MONTH
  FROM generate_series(
      DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 YEAR'),
      DATE_TRUNC('MONTH', CURRENT_DATE),
      '1 MONTH'::INTERVAL
    ) dd
),
workspace_counts AS (
  SELECT DATE_TRUNC('MONTH', created_at)::DATE AS MONTH,
    COUNT(*) AS workspace_count
  FROM public.workspaces
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 YEAR'
  GROUP BY MONTH
)
INSERT INTO temp_result
SELECT date_series.month,
  COALESCE(workspace_counts.workspace_count, 0)
FROM date_series
  LEFT JOIN workspace_counts ON date_series.month = workspace_counts.month
ORDER BY date_series.month;

  RETURN QUERY
SELECT *
FROM temp_result;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_workspaces_created_per_month"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_workspaces_created_per_month"()
FROM anon,
  authenticated;


CREATE OR REPLACE FUNCTION "public"."app_admin_get_projects_created_per_month"() RETURNS TABLE("month" "date", "number_of_projects" integer) LANGUAGE "plpgsql" AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
CREATE TEMPORARY TABLE temp_result (MONTH DATE, number_of_projects INTEGER) ON COMMIT DROP;

  WITH date_series AS (
  SELECT DATE_TRUNC('MONTH', dd)::DATE AS MONTH
  FROM generate_series(
      DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 YEAR'),
      DATE_TRUNC('MONTH', CURRENT_DATE),
      '1 MONTH'::INTERVAL
    ) dd
),
project_counts AS (
  SELECT DATE_TRUNC('MONTH', created_at)::DATE AS MONTH,
    COUNT(*) AS project_count
  FROM public.projects
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 YEAR'
  GROUP BY MONTH
)
INSERT INTO temp_result
SELECT date_series.month,
  COALESCE(project_counts.project_count, 0)
FROM date_series
  LEFT JOIN project_counts ON date_series.month = project_counts.month
ORDER BY date_series.month;

  RETURN QUERY
SELECT *
FROM temp_result;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_projects_created_per_month"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_projects_created_per_month"()
FROM anon,
  authenticated;

CREATE OR REPLACE FUNCTION "public"."app_admin_get_recent_30_day_signin_count"() RETURNS integer LANGUAGE "plpgsql" AS $$
DECLARE signin_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO signin_count
FROM auth.users
WHERE last_sign_in_at >= CURRENT_DATE - INTERVAL '30 DAYS';

RETURN signin_count;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_recent_30_day_signin_count"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_recent_30_day_signin_count"()
FROM anon,
  authenticated;



CREATE OR REPLACE FUNCTION "public"."app_admin_get_total_organization_count"() RETURNS integer LANGUAGE "plpgsql" AS $$
DECLARE org_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO org_count
FROM public.organizations;
RETURN org_count;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_total_organization_count"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_total_organization_count"()
FROM anon,
  authenticated;

CREATE OR REPLACE FUNCTION "public"."app_admin_get_total_project_count"() RETURNS integer LANGUAGE "plpgsql" AS $$
DECLARE proj_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO proj_count
FROM public.projects;
RETURN proj_count;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_total_project_count"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_total_project_count"()
FROM anon,
  authenticated;

CREATE OR REPLACE FUNCTION "public"."app_admin_get_total_user_count"() RETURNS integer LANGUAGE "plpgsql" AS $$
DECLARE user_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO user_count
FROM public.user_profiles;
RETURN user_count;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_total_user_count"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_total_user_count"()
FROM anon,
  authenticated;

CREATE OR REPLACE FUNCTION "public"."app_admin_get_user_id_by_email"("emailarg" "text") RETURNS "uuid" LANGUAGE "plpgsql" SECURITY DEFINER AS $$
DECLARE v_user_id uuid;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;

SELECT id INTO v_user_id
FROM auth.users
WHERE LOWER(email) = LOWER(emailArg);

  RETURN v_user_id;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_user_id_by_email"("emailarg" "text") OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_user_id_by_email"("emailarg" "text")
FROM anon,
  authenticated;

CREATE OR REPLACE FUNCTION "public"."app_admin_get_users_created_per_month"() RETURNS TABLE("month" "date", "number_of_users" integer) LANGUAGE "plpgsql" AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
CREATE TEMPORARY TABLE temp_result (MONTH DATE, number_of_users INTEGER) ON COMMIT DROP;

  WITH date_series AS (
  SELECT DATE_TRUNC('MONTH', dd)::DATE AS MONTH
  FROM generate_series(
      DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 YEAR'),
      DATE_TRUNC('MONTH', CURRENT_DATE),
      '1 MONTH'::INTERVAL
    ) dd
),
user_counts AS (
  SELECT DATE_TRUNC('MONTH', created_at)::DATE AS MONTH,
    COUNT(*) AS user_count
  FROM public.user_profiles
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 YEAR'
  GROUP BY MONTH
)
INSERT INTO temp_result
SELECT date_series.month,
  COALESCE(user_counts.user_count, 0)
FROM date_series
  LEFT JOIN user_counts ON date_series.month = user_counts.month
ORDER BY date_series.month;

  RETURN QUERY
SELECT *
FROM temp_result;
END;
$$;

ALTER FUNCTION "public"."app_admin_get_users_created_per_month"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."app_admin_get_users_created_per_month"()
FROM anon,
  authenticated;
CREATE OR REPLACE FUNCTION "public"."check_if_authenticated_user_owns_email"("email" character varying) RETURNS boolean LANGUAGE "plpgsql" SECURITY DEFINER AS $_$ BEGIN -- Check if the email exists in the auth.users table and if the id column matches the (select auth.uid()) function
  IF EXISTS (
    SELECT *
    FROM auth.users
    WHERE (
        auth.users.email = $1
        OR LOWER(auth.users.email) = LOWER($1)
      )
      AND id = (
        SELECT auth.uid()
      )
  ) THEN RETURN TRUE;
ELSE RETURN false;
END IF;
END;
$_$;

ALTER FUNCTION "public"."check_if_authenticated_user_owns_email"("email" character varying) OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."check_if_authenticated_user_owns_email"("email" character varying)
FROM anon,
  authenticated;




CREATE OR REPLACE FUNCTION "public"."decrement_credits"("org_id" "uuid", "amount" integer) RETURNS "void" LANGUAGE "plpgsql" SECURITY DEFINER AS $$ BEGIN -- Decrement the credits column by the specified amount
UPDATE organization_credits
SET credits = credits - amount
WHERE organization_id = org_id;
END;
$$;

ALTER FUNCTION "public"."decrement_credits"("org_id" "uuid", "amount" integer) OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."decrement_credits"("org_id" "uuid", "amount" integer)
FROM anon,
  authenticated;
