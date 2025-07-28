/*
 ******************************************************************************
 *                                                                            *
 *                              PROJECTS                                      *
 *                                                                            *
 *  This file contains SQL migrations for the projects-related tables         *
 *  in the database. It includes the creation of the 'projects' and           *
 *  'project_comments' tables, along with their respective configurations.    *
 *                                                                            *
 *  Tables:                                                                   *
 *    - projects: Stores main project information                             *
 *    - project_comments: Stores comments associated with projects            *
 *                                                                            *
 *  ╔══════════════════════════════════════════════════════════════���═══════╗  *
 *  ║                          Project Structure                           ║  *
 *  ╠══════════════════════════════════════════════════════════════════════╣  *
 *  ║  ┌─────────────┐                  ┌──────────────────┐              ║  *
 *  ║  │  projects   │ 1              * │ project_comments │              ║  *
 *  ║  └─────────────┘ ─────────────────└──────────────────┘              ║  *
 *  ║         │                                                           ║  *
 *  ║         │ belongs to                                                ║  *
 *  ║         │                                                           ║  *
 *  ║  ┌─────────────┐                                                    ║  *
 *  ║  │ workspaces  │                                                    ║  *
 *  ║  └─────────────┘                                                    ║  *
 *  ╚════���═════════════════════════════════════════════════════════════════╝  *
 *                                                                            *
 ******************************************************************************
 */
CREATE TABLE IF NOT EXISTS "public"."projects" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" "text" NOT NULL,
  "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "workspace_id" "uuid" NOT NULL REFERENCES "public"."workspaces"("id") ON DELETE CASCADE,
  "project_status" "public"."project_status" DEFAULT 'draft'::"public"."project_status" NOT NULL,
  "slug" character varying(255) DEFAULT ("gen_random_uuid"())::"text" UNIQUE NOT NULL
);

CREATE INDEX idx_projects_workspace_id ON public.projects(workspace_id);

ALTER TABLE "public"."projects" OWNER TO "postgres";
ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "public"."project_comments" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT "now"(),
  "text" "text" NOT NULL,
  "user_id" "uuid" NOT NULL REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "in_reply_to" "uuid" REFERENCES "public"."project_comments"("id") ON DELETE
  SET NULL,
    "project_id" "uuid" NOT NULL REFERENCES "public"."projects"("id") ON DELETE CASCADE
);

CREATE INDEX idx_project_comments_project_id ON public.project_comments(project_id);

ALTER TABLE "public"."project_comments" OWNER TO "postgres";
ALTER TABLE "public"."project_comments" ENABLE ROW LEVEL SECURITY;

-- functions
CREATE OR REPLACE FUNCTION "public"."get_project_workspace_uuid" (project_id uuid) RETURNS uuid LANGUAGE plpgsql
SET search_path = public,
  pg_temp AS $$
DECLARE workspace_id uuid;
BEGIN
SELECT p."workspace_id" INTO workspace_id
FROM "public"."projects" p
WHERE p."id" = project_id;
RETURN workspace_id;
END;
$$;


/*
 * Row Level Security (RLS) Policies for Projects
 *
 * This section defines the RLS policies for the 'projects' table,
 * controlling access and operations based on user authentication
 * and ownership.
 */
CREATE POLICY "All authenticated users can create projects" ON "public"."projects" FOR
INSERT TO "authenticated" WITH CHECK (TRUE);

-- RLS Policies for projects table
-- Allow workspace members to create projects
CREATE POLICY "Workspace members can create projects" ON "public"."projects" FOR
INSERT TO authenticated WITH CHECK (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  );

-- Allow workspace members to view projects
CREATE POLICY "Workspace members can view projects" ON "public"."projects" FOR
SELECT TO authenticated USING (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  );

-- Allow workspace members to update projects
CREATE POLICY "Workspace members can update projects" ON "public"."projects" FOR
UPDATE TO authenticated USING (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  ) WITH CHECK (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      workspace_id
    )
  );

-- Allow workspace admins to delete projects
CREATE POLICY "Workspace admins can delete projects" ON "public"."projects" FOR DELETE TO authenticated USING (
  "public"."is_workspace_admin"(
    (
      SELECT auth.uid()
    ),
    workspace_id
  )
);

-- RLS Policies for project_comments table
-- Allow workspace members to create comments
CREATE POLICY "Workspace members can create project comments" ON "public"."project_comments" FOR
INSERT TO authenticated WITH CHECK (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      "public"."get_project_workspace_uuid"("project_id")
    )
  );

-- Allow workspace members to view comments
CREATE POLICY "Workspace members can view project comments" ON "public"."project_comments" FOR
SELECT TO authenticated USING (
    "public"."is_workspace_member"(
      (
        SELECT auth.uid()
      ),
      "public"."get_project_workspace_uuid"("project_id")
    )
  );

-- Allow comment owners to update their comments
CREATE POLICY "Comment owners can update their comments" ON "public"."project_comments" FOR
UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Allow comment owners to delete their comments
CREATE POLICY "Comment owners can delete their comments" ON "public"."project_comments" FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Allow workspace admins to delete any comment
CREATE POLICY "Workspace admins can delete any project comment" ON "public"."project_comments" FOR DELETE TO authenticated USING (
  "public"."is_workspace_admin"(
    (
      SELECT auth.uid()
    ),
    "public"."get_project_workspace_uuid"("project_id")
  )
);
