import type { SupabaseClient } from "@supabase/supabase-js";
import type { CoreMessage } from "ai";
import type { Database } from "./lib/database.types";

export type AppSupabaseClient = SupabaseClient<Database>;
export type DBTable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type DBTableInsertPayload<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type DBTableUpdatePayload<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type DBView<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"];
export type DBFunction<T extends keyof Database["public"]["Functions"]> =
  Database["public"]["Functions"][T]["Returns"];

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type Enum<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export interface SupabaseFileUploadOptions {
  /**
   * The number of seconds the asset is cached in the browser and in the Supabase CDN. This is set in the `Cache-Control: max-age=<seconds>` header. Defaults to 3600 seconds.
   */
  cacheControl?: string;
  /**
   * the `Content-Type` header value. Should be specified if using a `fileBody` that is neither `Blob` nor `File` nor `FormData`, otherwise will default to `text/plain;charset=UTF-8`.
   */
  contentType?: string;
  /**
   * When upsert is set to true, the file is overwritten if it exists. When set to false, an error is thrown if the object already exists. Defaults to false.
   */
  upsert?: boolean;
}

/** One of the providers supported by GoTrue. */
export type AuthProvider =
  | "apple"
  | "azure"
  | "bitbucket"
  | "discord"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "keycloak"
  | "linkedin"
  | "notion"
  | "slack"
  | "spotify"
  | "twitch"
  | "twitter"
  | "workos";

export type DropzoneFile = File & {
  path: string;
};

export type DropzoneFileWithDuration = DropzoneFile & {
  duration: number;
};

export type CommentWithUser = DBTable<"project_comments"> & {
  user_profile: DBTable<"user_profiles">;
};

export type TeamMemberRowProps = {
  name?: string;
  role: Enum<"workspace_member_role_type">;
  avatar_url?: string;
  id: string;
  index: number;
  created_at: string;
};

export type TeamMembersTableProps = {
  members: Array<TeamMemberRowProps>;
  organizationId: string;
};

export type SASuccessPayload<TData = undefined> = {
  status: "success";
} & (TData extends undefined ? { data?: TData } : { data: TData });

export type SAErrorPayload = {
  status: "error";
  message: string;
};

/**
 * Server Action Payload
 */
export type SAPayload<TData = undefined> =
  | SASuccessPayload<TData>
  | SAErrorPayload;

export type Message = CoreMessage & {
  id: string;
};

export type SlimWorkspace = {
  id: string;
  name: string;
  slug: string;
  membershipType: Enum<"workspace_membership_type">;
};
export type SlimWorkspaces = Array<SlimWorkspace>;
export type WorkspaceWithMembershipType = DBTable<"workspaces"> & {
  membershipType: Enum<"workspace_membership_type">;
};

export type WorkspaceInvitation = DBTable<"workspace_invitations"> & {
  workspace: Pick<DBTable<"workspaces">, "id" | "name">;
  inviter: DBTable<"user_profiles">;
  invitee: DBTable<"user_profiles">;
};
