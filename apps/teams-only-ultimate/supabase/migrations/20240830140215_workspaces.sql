/*
 ___       __   ________  ________  ___  __    ________  ________  ________  ________  _______   ________
 |\  \     |\  \|\   __  \|\   __  \|\  \|\  \ |\   ____\|\   __  \|\   __  \|\   ____\|\  ___ \ |\   ____\
 \ \  \    \ \  \ \  \|\  \ \  \|\  \ \  \/  /|\ \  \___|\ \  \|\  \ \  \|\  \ \  \___|\ \   __/|\ \  \___|
 \ \  \  __\ \  \ \  \\\  \ \   _  _\ \   ___  \ \_____  \ \   ____\ \   __  \ \  \    \ \  \_|/_\ \  \
 \ \  \|\__\_\  \ \  \\\  \ \  \\  \\ \  \\ \  \|____|\  \ \  \___|\ \  \ \  \ \  \____\ \  \_|\ \ \  \____
 \ \____________\ \_______\ \__\\ _\\ \__\\ \__\____\_\  \ \__\    \ \__\ \__\ \_______\ \_______\ \_______\
 \|____________|\|_______|\|__|\|__|\|__| \|__|\_________\|__|     \|__|\|__|\|_______|\|_______|\|_______|
 \|_________|
 
 This file contains the database schema and related functions for the Workspaces feature.
 It includes tables for workspaces, team members, invitations, credits, and credit logs.
 The file also sets up triggers and Row Level Security (RLS) for these tables.
 */
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  slug character varying DEFAULT ("gen_random_uuid"())::"text" UNIQUE NOT NULL,
  name character varying NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);


-- These can be viewed and updated by workspace members
CREATE TABLE IF NOT EXISTS public.workspace_settings (
  workspace_id UUID PRIMARY KEY NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  workspace_settings JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_workspace_settings_workspace_id ON public.workspace_settings(workspace_id);

-- These can only be viewed and updated by workspace admins
CREATE TABLE IF NOT EXISTS public.workspace_admin_settings (
  workspace_id UUID PRIMARY KEY NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  workspace_settings JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_workspace_admin_settings_workspace_id ON public.workspace_admin_settings(workspace_id);



-- These settings are automatically applied by application either via payments etc.
-- They are visible to all workspace members
CREATE TABLE IF NOT EXISTS public.workspace_application_settings (
  workspace_id UUID PRIMARY KEY NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  membership_type "public"."workspace_membership_type" DEFAULT 'solo' NOT NULL
);

CREATE INDEX idx_workspace_application_settings_workspace_id ON public.workspace_application_settings(workspace_id);

COMMENT ON TABLE public.workspace_application_settings IS 'This table is for the application to manage workspace settings';


-- Create workspace_members table
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  workspace_id UUID NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  workspace_member_id UUID NOT NULL REFERENCES public.user_profiles (id) ON DELETE CASCADE,
  workspace_member_role public.workspace_member_role_type NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_workspace_member_id ON public.workspace_members(workspace_member_id);

-- Create workspace_invitations table
CREATE TABLE IF NOT EXISTS public.workspace_invitations (
  id UUID PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  inviter_user_id UUID NOT NULL REFERENCES public.user_profiles (id) ON DELETE CASCADE,
  STATUS public.workspace_invitation_link_status DEFAULT 'active' NOT NULL,
  invitee_user_email TEXT NOT NULL,
  workspace_id UUID NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  invitee_user_role public.workspace_member_role_type DEFAULT 'member' NOT NULL,
  invitee_user_id UUID REFERENCES public.user_profiles (id) ON DELETE CASCADE
);

CREATE INDEX idx_workspace_invitations_workspace_id ON public.workspace_invitations(workspace_id);
CREATE INDEX idx_workspace_invitations_invitee_user_id ON public.workspace_invitations(invitee_user_id);
CREATE INDEX idx_workspace_invitations_inviter_user_id ON public.workspace_invitations(inviter_user_id);

-- Create workspace_credits table
CREATE TABLE IF NOT EXISTS public.workspace_credits (
  id UUID PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  workspace_id UUID NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  credits INT NOT NULL DEFAULT 12,
  last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspace_credits_workspace_id ON public.workspace_credits(workspace_id);

-- Create workspace_credits_logs table
CREATE TABLE IF NOT EXISTS public.workspace_credits_logs (
  id UUID PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  workspace_credits_id UUID NOT NULL REFERENCES public.workspace_credits (id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces (id) ON DELETE CASCADE,
  change_type TEXT NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  old_credits INT,
  new_credits INT
);

CREATE INDEX idx_workspace_credits_logs_workspace_id ON public.workspace_credits_logs(workspace_id);
CREATE INDEX idx_workspace_credits_logs_workspace_credits_id ON public.workspace_credits_logs(workspace_credits_id);



-- Enable Row Level Security (RLS) on the new tables
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_application_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_credits_logs ENABLE ROW LEVEL SECURITY;
--
--
-- End Workspaces
--
--
--

CREATE POLICY "All authenticated users can create workspaces" ON "public"."workspaces" FOR
INSERT TO "authenticated" WITH CHECK (TRUE);



-- Workspace functions
CREATE OR REPLACE FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") RETURNS TABLE("member_id" "uuid") LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp AS $_$ BEGIN -- This function returns the member_id column for all rows in the organization_members table
  RETURN QUERY
SELECT workspace_members.workspace_member_id
FROM workspace_members
WHERE workspace_members.workspace_id = $1;
END;
$_$;

ALTER FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid")
FROM "public";
REVOKE ALL ON FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid")
FROM "anon";


GRANT EXECUTE ON FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") TO "service_role";

CREATE OR REPLACE FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") RETURNS BOOLEAN LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp AS $$ BEGIN RETURN EXISTS (
    SELECT 1
    FROM workspace_members
    WHERE workspace_members.workspace_member_id = $1
      AND workspace_members.workspace_id = $2
  );
END;
$$;

ALTER FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid")
FROM "public";
REVOKE ALL ON FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid")
FROM "anon";


GRANT EXECUTE ON FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") TO "service_role";


CREATE OR REPLACE FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") RETURNS TABLE("member_id" "uuid") LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp AS $_$ BEGIN -- This function returns all admins of a workspace
  RETURN QUERY
SELECT workspace_members.workspace_member_id
FROM workspace_members
WHERE workspace_members.workspace_id = $1 -- workspace_member_role is admin or owner
  AND (
    workspace_members.workspace_member_role = 'admin'
    OR workspace_members.workspace_member_role = 'owner'
  );
END;
$_$;

ALTER FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid")
FROM "public";
REVOKE ALL ON FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid")
FROM "anon";


GRANT EXECUTE ON FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") TO "service_role";


CREATE OR REPLACE FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") RETURNS BOOLEAN LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp AS $$ BEGIN RETURN EXISTS (
    SELECT 1
    FROM workspace_members
    WHERE workspace_members.workspace_member_id = $1
      AND workspace_members.workspace_id = $2
      AND (
        workspace_members.workspace_member_role = 'admin'
        OR workspace_members.workspace_member_role = 'owner'
      )
  );
END;
$$;

ALTER FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid")
FROM "public";
REVOKE ALL ON FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid")
FROM "anon";


GRANT EXECUTE ON FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") TO "service_role";

/*
 * Row Level Security (RLS) Policies for Workspaces
 * ------------------------------------------------
 * These policies control access to the workspace-related tables based on the user's workspace_member_role and permissions.
 * They ensure that users can only access and modify data they are authorized to interact with.
 */
-- Workspace access policies
CREATE POLICY "Workspace members can read their workspaces" ON "public"."workspaces" FOR
SELECT TO authenticated USING (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      id
    )
  );

CREATE POLICY "Workspace members can update their workspaces" ON "public"."workspaces" FOR
UPDATE TO authenticated USING (
    "public"."is_workspace_member" (
      (
        SELECT auth.uid()
      ),
      id
    )
  );

-- Workspace settings policies
CREATE POLICY "Workspace members can access settings" ON "public"."workspace_settings" FOR ALL TO authenticated USING (
  "public"."is_workspace_member" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

CREATE POLICY "Workspace members can update settings" ON "public"."workspace_settings" FOR ALL TO authenticated USING (
  "public"."is_workspace_member" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

-- Workspace admin settings policies
CREATE POLICY "Workspace admins can access settings" ON "public"."workspace_admin_settings" FOR ALL TO authenticated USING (
  "public"."is_workspace_admin" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

CREATE POLICY "Workspace admins can update settings" ON "public"."workspace_admin_settings" FOR ALL TO authenticated USING (
  "public"."is_workspace_admin" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

-- Workspace application settings policies
CREATE POLICY "Workspace members can access settings" ON "public"."workspace_application_settings" FOR ALL TO authenticated USING (
  "public"."is_workspace_member" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);


-- Workspace team members policies
CREATE POLICY "Workspace members can read team members" ON "public"."workspace_members" FOR
SELECT TO authenticated USING (
    "public"."is_workspace_member" (
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  );

CREATE POLICY "Workspace admins can manage team members" ON "public"."workspace_members" FOR ALL TO authenticated USING (
  "public"."is_workspace_admin" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

-- workspace members can delete themselves
CREATE POLICY "Workspace members can delete themselves" ON "public"."workspace_members" FOR DELETE TO authenticated USING (
  workspace_member_id = (
    SELECT auth.uid()
  )
);



-- Workspace credits policies
CREATE POLICY "Workspace members can view credits" ON "public"."workspace_credits" FOR
SELECT TO authenticated USING (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  );

  -- workspace credit logs
CREATE POLICY "Workspace admins can view credit logs" ON "public"."workspace_credits_logs" FOR
SELECT TO authenticated USING (
    "public"."is_workspace_admin"(
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  );


-- Workspace join invitations policies
CREATE POLICY "Workspace admins can manage invitations" ON "public"."workspace_invitations" FOR ALL TO authenticated USING (
  "public"."is_workspace_admin" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

CREATE POLICY "Invitees can view their invitations" ON "public"."workspace_invitations" FOR
SELECT TO authenticated USING (
    invitee_user_id = (
      SELECT auth.uid()
    )
  );

-- Workspace settings policies
CREATE POLICY "Workspace admins can manage settings" ON "public"."workspace_settings" FOR ALL TO authenticated USING (
  "public"."is_workspace_admin" (
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);


-- foreign key for user_settings table
ALTER TABLE "public"."user_settings"
ADD CONSTRAINT "user_settings_default_workspace_fkey" FOREIGN KEY ("default_workspace") REFERENCES "public"."workspaces"("id") ON DELETE
SET NULL;