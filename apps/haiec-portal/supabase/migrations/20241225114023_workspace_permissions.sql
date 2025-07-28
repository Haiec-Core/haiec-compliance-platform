/*
 ____  ____      _    _   _ _   _ _        _    ____
 / ___||  _ \    / \  | \ | | | | | |      / \  |  _ \
 | |  _  | |_) |  / _ \ |  \| | | | | |     / _ \ | |_) |
 | |_| | |  _ <  / ___ \| |\  | |_| | |___ / ___ \|  _ <
 \____| |_| \_\/_/   \_\_| \_|\___/|_____/_/   \_\_| \_\
 ____  _____ ____  __  __ ___ ____ ____ ___ ___  _   _ ____
 |  _ \| ____|  _ \|  \/  |_ _/ ___/ ___|_ _/ _ \| \ | / ___|
 | |_) |  _| | |_) | |\/| || |\___ \___ \| | | | |  \| \___ \
 |  __/| |___|  _ <| |  | || | ___) |__) | | |_| | |\  |___) |
 |_|   |_____|_| \_\_|  |_|___|____/____/___\___/|_| \_|____/
 
 This migration adds a permissions JSONB column to workspace_members table
 with granular permissions for viewing, adding, editing, and deleting resources.
 
 Permission structure:
 {
 "view_members": boolean,
 "edit_members": boolean,
 "delete_members": boolean,
 "view_billing": boolean,
 "manage_billing": boolean,
 "view_projects": boolean,
 "add_projects": boolean,
 "edit_projects": boolean,
 "delete_projects": boolean,
 "view_settings": boolean,
 "edit_settings": boolean
 }
 */
-- Add permissions column to workspace_members
ALTER TABLE public.workspace_members
ADD COLUMN IF NOT EXISTS permissions JSONB NOT NULL DEFAULT '{
  "view_members": true,
  "edit_members": true,
  "delete_members": true,
  "view_billing": true,
  "manage_billing": true,
  "view_projects": true,
  "add_projects": true,
  "edit_projects": true,
  "delete_projects": true,
  "view_settings": true,
  "edit_settings": true
}'::jsonb;

-- Function to check if a user has a specific permission
CREATE OR REPLACE FUNCTION public.has_workspace_permission(
    user_id UUID,
    workspace_id UUID,
    permission TEXT
  ) RETURNS BOOLEAN LANGUAGE plpgsql AS $$ BEGIN -- Workspace admins and owners always have all permissions
  IF EXISTS (
    SELECT 1
    FROM workspace_members
    WHERE workspace_member_id = user_id
      AND workspace_id = workspace_id
      AND workspace_member_role IN ('admin', 'owner')
  ) THEN RETURN TRUE;
END IF;

  -- Check specific permission
RETURN EXISTS (
  SELECT 1
  FROM workspace_members
  WHERE workspace_member_id = user_id
    AND workspace_id = workspace_id
    AND permissions->permission = 'true'
);
END;
$$;

-- Function for workspace admins to update member permissions
CREATE OR REPLACE FUNCTION public.update_workspace_member_permissions(
    member_id UUID,
    workspace_id UUID,
    new_permissions JSONB
  ) RETURNS void LANGUAGE plpgsql AS $$ BEGIN -- Check if caller is workspace admin
  IF NOT public.is_workspace_admin(auth.uid(), workspace_id) THEN RAISE EXCEPTION 'Only workspace admins can modify permissions';
END IF;

  -- Update permissions
UPDATE workspace_members
SET permissions = new_permissions
WHERE workspace_member_id = member_id
  AND workspace_id = workspace_id
  AND workspace_member_role NOT IN ('admin', 'owner');
-- Cannot modify admin/owner permissions
IF NOT FOUND THEN RAISE EXCEPTION 'Member not found or cannot modify admin/owner permissions';
END IF;
END;
$$;

-- Note: You can use the permissions schema to make even more granular RLS policies, but I prefer to keep
-- the RLS policies simple for workspaces and gatekeep in the frontend.