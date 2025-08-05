/*
 * This function is a trigger function that handles the creation of a new workspace.
 * It is designed to be executed automatically after a new workspace is inserted into the 'workspaces' table.
 *
 * The function performs the following actions:
 * 1. It inserts a new record into the 'workspace_settings' table.
 * 2. The new record's 'id' is set to the 'id' of the newly created workspace (NEW.id).
 *
 * This ensures that for every new workspace, there's a corresponding entry in the private info table.
 * The function is defined with SECURITY DEFINER, meaning it runs with the privileges of the user who defined it,
 * rather than the user who calls it, providing an additional layer of security.
 */
CREATE OR REPLACE FUNCTION "public"."handle_workspace_created"() RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp AS $$ BEGIN
INSERT INTO public.workspace_settings (workspace_id)
VALUES (NEW.id);
INSERT INTO public.workspace_admin_settings (workspace_id)
VALUES (NEW.id);
INSERT INTO public.workspace_application_settings (workspace_id)
VALUES (NEW.id);
INSERT INTO public.workspace_credits (workspace_id)
VALUES (NEW.id);
RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."handle_workspace_created"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."handle_workspace_created"()
FROM anon,
  authenticated;
GRANT ALL ON FUNCTION "public"."handle_workspace_created"() TO "service_role";



/*
 * This function is a trigger function that handles the addition of a workspace member after an invitation is accepted.
 * It is designed to be executed automatically after an invitation is updated in the 'workspace_invitations' table.
 *
 * The function performs the following actions:
 * 1. It inserts a new record into the 'workspace_members' table.
 * 2. The new record's 'workspace_member_id' is set to the 'invitee_user_id' of the invitation (NEW.invitee_user_id).
 * 3. The new record's 'workspace_member_role' is set to the 'invitee_workspace_role' of the invitation (NEW.invitee_workspace_role).
 * 4. The new record's 'workspace_id' is set to the 'workspace_id' of the invitation (NEW.workspace_id).
 */
CREATE OR REPLACE FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"() RETURNS "trigger"
SET search_path = public,
  pg_temp AS $$BEGIN
INSERT INTO workspace_members(
    workspace_member_id,
    workspace_member_role,
    workspace_id
  )
VALUES (
    NEW.invitee_user_id,
    NEW.invitee_user_role,
    NEW.workspace_id
  );
RETURN NEW;
END;
$$ LANGUAGE "plpgsql" SECURITY DEFINER;

ALTER FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"()
FROM anon,
  authenticated;
GRANT ALL ON FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"() TO "service_role";



CREATE OR REPLACE TRIGGER "on_workspace_created"
AFTER
INSERT ON "public"."workspaces" FOR EACH ROW EXECUTE FUNCTION "public"."handle_workspace_created"();

CREATE OR REPLACE TRIGGER "on_workspace_invitation_accepted_trigger"
AFTER
UPDATE ON "public"."workspace_invitations" FOR EACH ROW
  WHEN (
    (
      ("old"."status" <> "new"."status")
      AND (
        "new"."status" = 'finished_accepted'::"public"."workspace_invitation_link_status"
      )
    )
  ) EXECUTE FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"();







  -- Create function to log workspace credits changes
CREATE OR REPLACE FUNCTION public.log_workspace_credits_changes() RETURNS TRIGGER
SET search_path = public,
  pg_temp AS $$ BEGIN IF TG_OP = 'UPDATE' THEN
INSERT INTO workspace_credits_logs (
    workspace_credits_id,
    workspace_id,
    change_type,
    changed_at,
    old_credits,
    new_credits
  )
VALUES (
    NEW.id,
    NEW.workspace_id,
    'UPDATE',
    NOW(),
    OLD.credits,
    NEW.credits
  );
ELSIF TG_OP = 'INSERT' THEN
INSERT INTO workspace_credits_logs (
    workspace_credits_id,
    workspace_id,
    change_type,
    changed_at,
    new_credits
  )
VALUES (
    NEW.id,
    NEW.workspace_id,
    'INSERT',
    NOW(),
    NEW.credits
  );
ELSIF TG_OP = 'DELETE' THEN
INSERT INTO workspace_credits_logs (
    workspace_credits_id,
    workspace_id,
    change_type,
    changed_at,
    old_credits
  )
VALUES (
    OLD.id,
    OLD.workspace_id,
    'DELETE',
    NOW(),
    OLD.credits
  );
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for workspace credits changes
CREATE OR REPLACE TRIGGER "workspace_credits_changes_trigger"
AFTER
INSERT
  OR
UPDATE ON "public"."workspace_credits" FOR EACH ROW EXECUTE FUNCTION "public"."log_workspace_credits_changes"();