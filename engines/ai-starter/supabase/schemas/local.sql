

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."chat_visibility_type" AS ENUM (
    'private',
    'public'
);


ALTER TYPE "public"."chat_visibility_type" OWNER TO "postgres";


CREATE TYPE "public"."document_kind" AS ENUM (
    'text',
    'code',
    'image',
    'sheet'
);


ALTER TYPE "public"."document_kind" OWNER TO "postgres";


CREATE TYPE "public"."organization_joining_status" AS ENUM (
    'invited',
    'joinied',
    'declined_invitation',
    'joined'
);


ALTER TYPE "public"."organization_joining_status" OWNER TO "postgres";


CREATE TYPE "public"."organization_member_role" AS ENUM (
    'owner',
    'admin',
    'member',
    'readonly'
);


ALTER TYPE "public"."organization_member_role" OWNER TO "postgres";


CREATE TYPE "public"."pricing_plan_interval" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE "public"."pricing_plan_interval" OWNER TO "postgres";


CREATE TYPE "public"."pricing_type" AS ENUM (
    'one_time',
    'recurring'
);


ALTER TYPE "public"."pricing_type" OWNER TO "postgres";


CREATE TYPE "public"."project_status" AS ENUM (
    'draft',
    'pending_approval',
    'approved',
    'completed'
);


ALTER TYPE "public"."project_status" OWNER TO "postgres";


CREATE TYPE "public"."project_team_member_role" AS ENUM (
    'admin',
    'member',
    'readonly'
);


ALTER TYPE "public"."project_team_member_role" OWNER TO "postgres";


CREATE TYPE "public"."subscription_status" AS ENUM (
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid',
    'paused'
);


ALTER TYPE "public"."subscription_status" OWNER TO "postgres";


CREATE TYPE "public"."workspace_invitation_link_status" AS ENUM (
    'active',
    'finished_accepted',
    'finished_declined',
    'inactive'
);


ALTER TYPE "public"."workspace_invitation_link_status" OWNER TO "postgres";


CREATE TYPE "public"."workspace_member_role_type" AS ENUM (
    'owner',
    'admin',
    'member',
    'readonly'
);


ALTER TYPE "public"."workspace_member_role_type" OWNER TO "postgres";


CREATE TYPE "public"."workspace_membership_type" AS ENUM (
    'solo',
    'team'
);


ALTER TYPE "public"."workspace_membership_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_customer_workspace_id"("customer_id_arg" "text") RETURNS "uuid"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public', 'pg_temp'
    AS $$
DECLARE workspace_id UUID;
BEGIN
SELECT c."workspace_id" INTO workspace_id
FROM "public"."billing_customers" c
WHERE c."gateway_customer_id" = customer_id_arg;
RETURN workspace_id;
END;
$$;


ALTER FUNCTION "public"."get_customer_workspace_id"("customer_id_arg" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") RETURNS TABLE("member_id" "uuid")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $_$ BEGIN -- This function returns all admins of a workspace
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


CREATE OR REPLACE FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") RETURNS TABLE("member_id" "uuid")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $_$ BEGIN -- This function returns the member_id column for all rows in the organization_members table
  RETURN QUERY
SELECT workspace_members.workspace_member_id
FROM workspace_members
WHERE workspace_members.workspace_id = $1;
END;
$_$;


ALTER FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $$BEGIN
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
$$;


ALTER FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_auth_user_created"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp', 'auth'
    AS $$ BEGIN
INSERT INTO public.user_profiles (id)
VALUES (NEW.id);
INSERT INTO public.user_settings (id)
VALUES (NEW.id);
INSERT INTO public.user_application_settings (id, email_readonly)
VALUES (NEW.id, NEW.email);

RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_auth_user_created"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_workspace_created"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $$ BEGIN
INSERT INTO public.workspace_settings (workspace_id)
VALUES (NEW.id);
INSERT INTO public.workspace_admin_settings (workspace_id)
VALUES (NEW.id);
INSERT INTO public.workspace_application_settings (workspace_id)
VALUES (NEW.id);
RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_workspace_created"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $_$ BEGIN RETURN EXISTS (
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
$_$;


ALTER FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $_$ BEGIN RETURN EXISTS (
    SELECT 1
    FROM workspace_members
    WHERE workspace_members.workspace_member_id = $1
      AND workspace_members.workspace_id = $2
  );
END;
$_$;


ALTER FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_user_application_settings_email"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $$ BEGIN
UPDATE public.user_application_settings
SET email_readonly = NEW.email
WHERE id = NEW.id;
RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_user_application_settings_email"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."account_delete_tokens" (
    "token" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."account_delete_tokens" OWNER TO "postgres";


COMMENT ON TABLE "public"."account_delete_tokens" IS 'Tokens for account deletion requests.';



CREATE TABLE IF NOT EXISTS "public"."billing_customers" (
    "gateway_customer_id" "text" NOT NULL,
    "workspace_id" "uuid" NOT NULL,
    "gateway_name" "text" NOT NULL,
    "default_currency" "text",
    "billing_email" "text" NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb"
);


ALTER TABLE "public"."billing_customers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."billing_invoices" (
    "gateway_invoice_id" "text" NOT NULL,
    "gateway_customer_id" "text" NOT NULL,
    "gateway_product_id" "text",
    "gateway_price_id" "text",
    "gateway_name" "text" NOT NULL,
    "amount" numeric NOT NULL,
    "currency" "text" NOT NULL,
    "status" "text" NOT NULL,
    "due_date" "date",
    "paid_date" "date",
    "hosted_invoice_url" "text"
);


ALTER TABLE "public"."billing_invoices" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."billing_one_time_payments" (
    "gateway_charge_id" "text" NOT NULL,
    "gateway_customer_id" "text" NOT NULL,
    "gateway_name" "text" NOT NULL,
    "amount" numeric NOT NULL,
    "currency" "text" NOT NULL,
    "status" "text" NOT NULL,
    "charge_date" timestamp with time zone NOT NULL,
    "gateway_invoice_id" "text" NOT NULL,
    "gateway_product_id" "text" NOT NULL,
    "gateway_price_id" "text" NOT NULL
);


ALTER TABLE "public"."billing_one_time_payments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."billing_prices" (
    "gateway_price_id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "gateway_product_id" "text" NOT NULL,
    "currency" "text" NOT NULL,
    "amount" numeric NOT NULL,
    "recurring_interval" "text" NOT NULL,
    "recurring_interval_count" integer DEFAULT 0 NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "tier" "text",
    "free_trial_days" integer,
    "gateway_name" "text" NOT NULL
);


ALTER TABLE "public"."billing_prices" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."billing_products" (
    "gateway_product_id" "text" NOT NULL,
    "gateway_name" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "features" "jsonb",
    "active" boolean DEFAULT true NOT NULL,
    "is_visible_in_ui" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."billing_products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."billing_subscriptions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "gateway_customer_id" "text" NOT NULL,
    "gateway_name" "text" NOT NULL,
    "gateway_subscription_id" "text" NOT NULL,
    "gateway_product_id" "text" NOT NULL,
    "gateway_price_id" "text" NOT NULL,
    "status" "public"."subscription_status" NOT NULL,
    "current_period_start" "date" NOT NULL,
    "current_period_end" "date" NOT NULL,
    "currency" "text" NOT NULL,
    "is_trial" boolean NOT NULL,
    "trial_ends_at" "date",
    "cancel_at_period_end" boolean NOT NULL,
    "quantity" integer
);


ALTER TABLE "public"."billing_subscriptions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_application_settings" (
    "id" "uuid" NOT NULL,
    "email_readonly" character varying NOT NULL
);


ALTER TABLE "public"."user_application_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_application_settings" IS 'These settings are updated by the application. Do not use this table to update the user email.';



CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" NOT NULL,
    "full_name" character varying,
    "avatar_url" character varying,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_profiles" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_profiles" IS 'Stores public user profile information including full name, avatar URL, and creation timestamp.';



CREATE TABLE IF NOT EXISTS "public"."user_settings" (
    "id" "uuid" NOT NULL,
    "default_workspace" "uuid"
);


ALTER TABLE "public"."user_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_settings" IS 'Stores user settings including the default organization.';



CREATE TABLE IF NOT EXISTS "public"."workspace_admin_settings" (
    "workspace_id" "uuid" NOT NULL,
    "workspace_settings" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."workspace_admin_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspace_application_settings" (
    "workspace_id" "uuid" NOT NULL,
    "membership_type" "public"."workspace_membership_type" DEFAULT 'solo'::"public"."workspace_membership_type" NOT NULL
);


ALTER TABLE "public"."workspace_application_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."workspace_application_settings" IS 'This table is for the application to manage workspace settings';



CREATE TABLE IF NOT EXISTS "public"."workspace_chat_messages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "chat_id" "uuid" NOT NULL,
    "role" character varying NOT NULL,
    "parts" "jsonb" NOT NULL,
    "attachments" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."workspace_chat_messages" OWNER TO "postgres";


COMMENT ON TABLE "public"."workspace_chat_messages" IS 'Stores messages for workspace chats';



CREATE TABLE IF NOT EXISTS "public"."workspace_chat_votes" (
    "chat_id" "uuid" NOT NULL,
    "message_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_upvoted" boolean NOT NULL
);


ALTER TABLE "public"."workspace_chat_votes" OWNER TO "postgres";


COMMENT ON TABLE "public"."workspace_chat_votes" IS 'Stores user votes on chat messages';



CREATE TABLE IF NOT EXISTS "public"."workspace_chats" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" NOT NULL,
    "workspace_id" "uuid" NOT NULL,
    "visibility" "public"."chat_visibility_type" DEFAULT 'private'::"public"."chat_visibility_type" NOT NULL
);


ALTER TABLE "public"."workspace_chats" OWNER TO "postgres";


COMMENT ON TABLE "public"."workspace_chats" IS 'Stores chat sessions associated with workspaces';



COMMENT ON COLUMN "public"."workspace_chats"."visibility" IS 'Visibility level of the chat - private (workspace members only) or public';



CREATE TABLE IF NOT EXISTS "public"."workspace_document_suggestions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "document_id" "uuid" NOT NULL,
    "original_text" "text" NOT NULL,
    "suggested_text" "text" NOT NULL,
    "description" "text",
    "is_resolved" boolean DEFAULT false NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "document_created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."workspace_document_suggestions" OWNER TO "postgres";


COMMENT ON TABLE "public"."workspace_document_suggestions" IS 'Stores suggestions for improvements to workspace documents';



COMMENT ON COLUMN "public"."workspace_document_suggestions"."document_created_at" IS 'Timestamp when the document was created';



CREATE TABLE IF NOT EXISTS "public"."workspace_documents" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" NOT NULL,
    "content" "text",
    "workspace_id" "uuid" NOT NULL,
    "kind" "public"."document_kind" DEFAULT 'text'::"public"."document_kind" NOT NULL,
    CONSTRAINT "workspace_documents_kind_check" CHECK (("kind" = ANY (ARRAY['text'::"public"."document_kind", 'code'::"public"."document_kind", 'image'::"public"."document_kind", 'sheet'::"public"."document_kind"])))
);


ALTER TABLE "public"."workspace_documents" OWNER TO "postgres";


COMMENT ON TABLE "public"."workspace_documents" IS 'Stores documents associated with workspaces';



COMMENT ON COLUMN "public"."workspace_documents"."kind" IS 'Type of document content (text, code, image, sheet)';



CREATE TABLE IF NOT EXISTS "public"."workspace_invitations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "inviter_user_id" "uuid" NOT NULL,
    "status" "public"."workspace_invitation_link_status" DEFAULT 'active'::"public"."workspace_invitation_link_status" NOT NULL,
    "invitee_user_email" "text" NOT NULL,
    "workspace_id" "uuid" NOT NULL,
    "invitee_user_role" "public"."workspace_member_role_type" DEFAULT 'member'::"public"."workspace_member_role_type" NOT NULL,
    "invitee_user_id" "uuid"
);


ALTER TABLE "public"."workspace_invitations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspace_members" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "workspace_id" "uuid" NOT NULL,
    "workspace_member_id" "uuid" NOT NULL,
    "workspace_member_role" "public"."workspace_member_role_type" NOT NULL,
    "added_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."workspace_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspace_settings" (
    "workspace_id" "uuid" NOT NULL,
    "workspace_settings" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."workspace_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspaces" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" character varying DEFAULT ("gen_random_uuid"())::"text" NOT NULL,
    "name" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."workspaces" OWNER TO "postgres";


ALTER TABLE ONLY "public"."account_delete_tokens"
    ADD CONSTRAINT "account_delete_tokens_pkey" PRIMARY KEY ("token");



ALTER TABLE ONLY "public"."billing_customers"
    ADD CONSTRAINT "billing_customers_gateway_name_gateway_customer_id_key" UNIQUE ("gateway_name", "gateway_customer_id");



ALTER TABLE ONLY "public"."billing_customers"
    ADD CONSTRAINT "billing_customers_pkey" PRIMARY KEY ("gateway_customer_id");



ALTER TABLE ONLY "public"."billing_invoices"
    ADD CONSTRAINT "billing_invoices_gateway_name_gateway_invoice_id_key" UNIQUE ("gateway_name", "gateway_invoice_id");



ALTER TABLE ONLY "public"."billing_invoices"
    ADD CONSTRAINT "billing_invoices_pkey" PRIMARY KEY ("gateway_invoice_id");



ALTER TABLE ONLY "public"."billing_one_time_payments"
    ADD CONSTRAINT "billing_one_time_payments_pkey" PRIMARY KEY ("gateway_charge_id");



ALTER TABLE ONLY "public"."billing_prices"
    ADD CONSTRAINT "billing_prices_gateway_name_gateway_price_id_key" UNIQUE ("gateway_name", "gateway_price_id");



ALTER TABLE ONLY "public"."billing_prices"
    ADD CONSTRAINT "billing_prices_pkey" PRIMARY KEY ("gateway_price_id");



ALTER TABLE ONLY "public"."billing_products"
    ADD CONSTRAINT "billing_products_gateway_name_gateway_product_id_key" UNIQUE ("gateway_name", "gateway_product_id");



ALTER TABLE ONLY "public"."billing_products"
    ADD CONSTRAINT "billing_products_pkey" PRIMARY KEY ("gateway_product_id");



ALTER TABLE ONLY "public"."billing_subscriptions"
    ADD CONSTRAINT "billing_subscriptions_gateway_name_gateway_subscription_id_key" UNIQUE ("gateway_name", "gateway_subscription_id");



ALTER TABLE ONLY "public"."billing_subscriptions"
    ADD CONSTRAINT "billing_subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_application_settings"
    ADD CONSTRAINT "user_application_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_admin_settings"
    ADD CONSTRAINT "workspace_admin_settings_pkey" PRIMARY KEY ("workspace_id");



ALTER TABLE ONLY "public"."workspace_application_settings"
    ADD CONSTRAINT "workspace_application_settings_pkey" PRIMARY KEY ("workspace_id");



ALTER TABLE ONLY "public"."workspace_chat_messages"
    ADD CONSTRAINT "workspace_chat_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_chat_votes"
    ADD CONSTRAINT "workspace_chat_votes_pkey" PRIMARY KEY ("chat_id", "message_id", "user_id");



ALTER TABLE ONLY "public"."workspace_chats"
    ADD CONSTRAINT "workspace_chats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_document_suggestions"
    ADD CONSTRAINT "workspace_document_suggestions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_documents"
    ADD CONSTRAINT "workspace_documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_invitations"
    ADD CONSTRAINT "workspace_invitations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_members"
    ADD CONSTRAINT "workspace_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_settings"
    ADD CONSTRAINT "workspace_settings_pkey" PRIMARY KEY ("workspace_id");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_slug_key" UNIQUE ("slug");



CREATE INDEX "idx_account_delete_tokens_user_id" ON "public"."account_delete_tokens" USING "btree" ("user_id");



CREATE INDEX "idx_billing_customers_workspace" ON "public"."billing_customers" USING "btree" ("workspace_id");



CREATE INDEX "idx_billing_invoices_gateway_customer_id" ON "public"."billing_invoices" USING "btree" ("gateway_customer_id");



CREATE INDEX "idx_billing_invoices_gateway_name" ON "public"."billing_invoices" USING "btree" ("gateway_name");



CREATE INDEX "idx_billing_invoices_price_id" ON "public"."billing_invoices" USING "btree" ("gateway_price_id");



CREATE INDEX "idx_billing_invoices_product_id" ON "public"."billing_invoices" USING "btree" ("gateway_product_id");



CREATE INDEX "idx_billing_one_time_payments_customer_id" ON "public"."billing_one_time_payments" USING "btree" ("gateway_customer_id");



CREATE INDEX "idx_billing_one_time_payments_invoice_id" ON "public"."billing_one_time_payments" USING "btree" ("gateway_invoice_id");



CREATE INDEX "idx_billing_one_time_payments_price_id" ON "public"."billing_one_time_payments" USING "btree" ("gateway_price_id");



CREATE INDEX "idx_billing_one_time_payments_product_id" ON "public"."billing_one_time_payments" USING "btree" ("gateway_product_id");



CREATE INDEX "idx_billing_products_gateway_name" ON "public"."billing_products" USING "btree" ("gateway_name");



CREATE INDEX "idx_billing_products_gateway_product_id" ON "public"."billing_products" USING "btree" ("gateway_product_id");



CREATE INDEX "idx_billing_subscriptions_customer_id" ON "public"."billing_subscriptions" USING "btree" ("gateway_customer_id");



CREATE INDEX "idx_billing_subscriptions_plan_id" ON "public"."billing_subscriptions" USING "btree" ("gateway_product_id");



CREATE INDEX "idx_user_application_settings_email_readonly" ON "public"."user_application_settings" USING "btree" ("email_readonly");



CREATE INDEX "idx_user_settings_default_workspace" ON "public"."user_settings" USING "btree" ("default_workspace");



CREATE INDEX "idx_workspace_admin_settings_workspace_id" ON "public"."workspace_admin_settings" USING "btree" ("workspace_id");



CREATE INDEX "idx_workspace_application_settings_workspace_id" ON "public"."workspace_application_settings" USING "btree" ("workspace_id");



CREATE INDEX "idx_workspace_chat_messages_chat_id" ON "public"."workspace_chat_messages" USING "btree" ("chat_id");



CREATE INDEX "idx_workspace_chat_votes_message_id" ON "public"."workspace_chat_votes" USING "btree" ("message_id");



CREATE INDEX "idx_workspace_chat_votes_user_id" ON "public"."workspace_chat_votes" USING "btree" ("user_id");



CREATE INDEX "idx_workspace_chats_workspace_id" ON "public"."workspace_chats" USING "btree" ("workspace_id");



CREATE INDEX "idx_workspace_document_suggestions_document_id" ON "public"."workspace_document_suggestions" USING "btree" ("document_id");



CREATE INDEX "idx_workspace_document_suggestions_user_id" ON "public"."workspace_document_suggestions" USING "btree" ("user_id");



CREATE INDEX "idx_workspace_documents_workspace_id" ON "public"."workspace_documents" USING "btree" ("workspace_id");



CREATE INDEX "idx_workspace_invitations_invitee_user_id" ON "public"."workspace_invitations" USING "btree" ("invitee_user_id");



CREATE INDEX "idx_workspace_invitations_inviter_user_id" ON "public"."workspace_invitations" USING "btree" ("inviter_user_id");



CREATE INDEX "idx_workspace_invitations_workspace_id" ON "public"."workspace_invitations" USING "btree" ("workspace_id");



CREATE INDEX "idx_workspace_members_workspace_id" ON "public"."workspace_members" USING "btree" ("workspace_id");



CREATE INDEX "idx_workspace_members_workspace_member_id" ON "public"."workspace_members" USING "btree" ("workspace_member_id");



CREATE INDEX "idx_workspace_settings_workspace_id" ON "public"."workspace_settings" USING "btree" ("workspace_id");



CREATE OR REPLACE TRIGGER "on_workspace_created" AFTER INSERT ON "public"."workspaces" FOR EACH ROW EXECUTE FUNCTION "public"."handle_workspace_created"();



CREATE OR REPLACE TRIGGER "on_workspace_invitation_accepted_trigger" AFTER UPDATE ON "public"."workspace_invitations" FOR EACH ROW WHEN ((("old"."status" <> "new"."status") AND ("new"."status" = 'finished_accepted'::"public"."workspace_invitation_link_status"))) EXECUTE FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"();



ALTER TABLE ONLY "public"."account_delete_tokens"
    ADD CONSTRAINT "account_delete_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_customers"
    ADD CONSTRAINT "billing_customers_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id");



ALTER TABLE ONLY "public"."billing_invoices"
    ADD CONSTRAINT "billing_invoices_gateway_customer_id_fkey" FOREIGN KEY ("gateway_customer_id") REFERENCES "public"."billing_customers"("gateway_customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_invoices"
    ADD CONSTRAINT "billing_invoices_gateway_price_id_fkey" FOREIGN KEY ("gateway_price_id") REFERENCES "public"."billing_prices"("gateway_price_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_invoices"
    ADD CONSTRAINT "billing_invoices_gateway_product_id_fkey" FOREIGN KEY ("gateway_product_id") REFERENCES "public"."billing_products"("gateway_product_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_one_time_payments"
    ADD CONSTRAINT "billing_one_time_payments_gateway_customer_id_fkey" FOREIGN KEY ("gateway_customer_id") REFERENCES "public"."billing_customers"("gateway_customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_one_time_payments"
    ADD CONSTRAINT "billing_one_time_payments_gateway_invoice_id_fkey" FOREIGN KEY ("gateway_invoice_id") REFERENCES "public"."billing_invoices"("gateway_invoice_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_one_time_payments"
    ADD CONSTRAINT "billing_one_time_payments_gateway_price_id_fkey" FOREIGN KEY ("gateway_price_id") REFERENCES "public"."billing_prices"("gateway_price_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_one_time_payments"
    ADD CONSTRAINT "billing_one_time_payments_gateway_product_id_fkey" FOREIGN KEY ("gateway_product_id") REFERENCES "public"."billing_products"("gateway_product_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_prices"
    ADD CONSTRAINT "billing_prices_gateway_product_id_fkey" FOREIGN KEY ("gateway_product_id") REFERENCES "public"."billing_products"("gateway_product_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_subscriptions"
    ADD CONSTRAINT "billing_subscriptions_gateway_customer_id_fkey" FOREIGN KEY ("gateway_customer_id") REFERENCES "public"."billing_customers"("gateway_customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_subscriptions"
    ADD CONSTRAINT "billing_subscriptions_gateway_price_id_fkey" FOREIGN KEY ("gateway_price_id") REFERENCES "public"."billing_prices"("gateway_price_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_subscriptions"
    ADD CONSTRAINT "billing_subscriptions_gateway_product_id_fkey" FOREIGN KEY ("gateway_product_id") REFERENCES "public"."billing_products"("gateway_product_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_application_settings"
    ADD CONSTRAINT "user_application_settings_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_default_workspace_fkey" FOREIGN KEY ("default_workspace") REFERENCES "public"."workspaces"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_admin_settings"
    ADD CONSTRAINT "workspace_admin_settings_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_application_settings"
    ADD CONSTRAINT "workspace_application_settings_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_chat_messages"
    ADD CONSTRAINT "workspace_chat_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."workspace_chats"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_chat_votes"
    ADD CONSTRAINT "workspace_chat_votes_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."workspace_chats"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_chat_votes"
    ADD CONSTRAINT "workspace_chat_votes_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."workspace_chat_messages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_chat_votes"
    ADD CONSTRAINT "workspace_chat_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_chats"
    ADD CONSTRAINT "workspace_chats_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_document_suggestions"
    ADD CONSTRAINT "workspace_document_suggestions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."workspace_documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_document_suggestions"
    ADD CONSTRAINT "workspace_document_suggestions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_documents"
    ADD CONSTRAINT "workspace_documents_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_invitations"
    ADD CONSTRAINT "workspace_invitations_invitee_user_id_fkey" FOREIGN KEY ("invitee_user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_invitations"
    ADD CONSTRAINT "workspace_invitations_inviter_user_id_fkey" FOREIGN KEY ("inviter_user_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_invitations"
    ADD CONSTRAINT "workspace_invitations_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_members"
    ADD CONSTRAINT "workspace_members_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_members"
    ADD CONSTRAINT "workspace_members_workspace_member_id_fkey" FOREIGN KEY ("workspace_member_id") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_settings"
    ADD CONSTRAINT "workspace_settings_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE;



CREATE POLICY "All authenticated users can create workspaces" ON "public"."workspaces" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "All authenticated users can request deletion" ON "public"."account_delete_tokens" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Document owners and suggestion creators can delete suggestions" ON "public"."workspace_document_suggestions" FOR DELETE TO "authenticated" USING ((("user_id" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."workspace_documents"
  WHERE (("workspace_documents"."id" = "workspace_document_suggestions"."document_id") AND "public"."is_workspace_admin"("auth"."uid"(), "workspace_documents"."workspace_id"))))));



CREATE POLICY "Everyone can view billing_prices" ON "public"."billing_prices" FOR SELECT USING (true);



CREATE POLICY "Everyone can view plans" ON "public"."billing_products" FOR SELECT USING (true);



CREATE POLICY "Everyone can view user profile" ON "public"."user_profiles" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Invitees can view their invitations" ON "public"."workspace_invitations" FOR SELECT TO "authenticated" USING (("invitee_user_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Only the own user can update it" ON "public"."user_profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "User can only delete their own deletion token" ON "public"."account_delete_tokens" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "User can only read their own deletion token" ON "public"."account_delete_tokens" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "User can only update their own deletion token" ON "public"."account_delete_tokens" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can delete their own votes" ON "public"."workspace_chat_votes" FOR DELETE TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can update their own document suggestions" ON "public"."workspace_document_suggestions" FOR UPDATE TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can update their own settings" ON "public"."user_settings" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update their own votes" ON "public"."workspace_chat_votes" FOR UPDATE TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can view messages in accessible chats" ON "public"."workspace_chat_messages" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."workspace_chats"
  WHERE (("workspace_chats"."id" = "workspace_chat_messages"."chat_id") AND (("workspace_chats"."visibility" = 'public'::"public"."chat_visibility_type") OR "public"."is_workspace_member"("auth"."uid"(), "workspace_chats"."workspace_id"))))));



CREATE POLICY "Users can view their own application settings" ON "public"."user_application_settings" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can view their own settings" ON "public"."user_settings" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can view votes in accessible chats" ON "public"."workspace_chat_votes" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."workspace_chats"
  WHERE (("workspace_chats"."id" = ( SELECT "workspace_chat_messages"."chat_id"
           FROM "public"."workspace_chat_messages"
          WHERE ("workspace_chat_messages"."id" = "workspace_chat_votes"."message_id"))) AND (("workspace_chats"."visibility" = 'public'::"public"."chat_visibility_type") OR "public"."is_workspace_member"("auth"."uid"(), "workspace_chats"."workspace_id"))))));



CREATE POLICY "Users can vote on messages in accessible chats" ON "public"."workspace_chat_votes" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."workspace_chats"
  WHERE (("workspace_chats"."id" = ( SELECT "workspace_chat_messages"."chat_id"
           FROM "public"."workspace_chat_messages"
          WHERE ("workspace_chat_messages"."id" = "workspace_chat_votes"."message_id"))) AND (("workspace_chats"."visibility" = 'public'::"public"."chat_visibility_type") OR "public"."is_workspace_member"("auth"."uid"(), "workspace_chats"."workspace_id"))))));



CREATE POLICY "Workspace admins can access settings" ON "public"."workspace_admin_settings" TO "authenticated" USING ("public"."is_workspace_admin"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace admins can manage invitations" ON "public"."workspace_invitations" TO "authenticated" USING ("public"."is_workspace_admin"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace admins can manage settings" ON "public"."workspace_settings" TO "authenticated" USING ("public"."is_workspace_admin"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace admins can manage team members" ON "public"."workspace_members" TO "authenticated" USING ("public"."is_workspace_admin"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace admins can update settings" ON "public"."workspace_admin_settings" TO "authenticated" USING ("public"."is_workspace_admin"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace members can access settings" ON "public"."workspace_application_settings" TO "authenticated" USING ("public"."is_workspace_member"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace members can access settings" ON "public"."workspace_settings" TO "authenticated" USING ("public"."is_workspace_member"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace members can create document suggestions" ON "public"."workspace_document_suggestions" FOR INSERT TO "authenticated" WITH CHECK (((EXISTS ( SELECT 1
   FROM "public"."workspace_documents"
  WHERE (("workspace_documents"."id" = "workspace_document_suggestions"."document_id") AND "public"."is_workspace_member"("auth"."uid"(), "workspace_documents"."workspace_id")))) AND ("user_id" = "auth"."uid"())));



CREATE POLICY "Workspace members can delete messages in their chats" ON "public"."workspace_chat_messages" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."workspace_chats"
  WHERE (("workspace_chats"."id" = "workspace_chat_messages"."chat_id") AND "public"."is_workspace_member"("auth"."uid"(), "workspace_chats"."workspace_id")))));



CREATE POLICY "Workspace members can delete themselves" ON "public"."workspace_members" FOR DELETE TO "authenticated" USING (("workspace_member_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Workspace members can delete workspace chats" ON "public"."workspace_chats" FOR DELETE TO "authenticated" USING ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



CREATE POLICY "Workspace members can delete workspace documents" ON "public"."workspace_documents" FOR DELETE TO "authenticated" USING ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



CREATE POLICY "Workspace members can insert messages in their chats" ON "public"."workspace_chat_messages" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."workspace_chats"
  WHERE (("workspace_chats"."id" = "workspace_chat_messages"."chat_id") AND "public"."is_workspace_member"("auth"."uid"(), "workspace_chats"."workspace_id")))));



CREATE POLICY "Workspace members can insert workspace chats" ON "public"."workspace_chats" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



CREATE POLICY "Workspace members can insert workspace documents" ON "public"."workspace_documents" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



CREATE POLICY "Workspace members can read team members" ON "public"."workspace_members" FOR SELECT TO "authenticated" USING ("public"."is_workspace_member"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace members can read their workspaces" ON "public"."workspaces" FOR SELECT TO "authenticated" USING ("public"."is_workspace_member"(( SELECT "auth"."uid"() AS "uid"), "id"));



CREATE POLICY "Workspace members can update messages in their chats" ON "public"."workspace_chat_messages" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."workspace_chats"
  WHERE (("workspace_chats"."id" = "workspace_chat_messages"."chat_id") AND "public"."is_workspace_member"("auth"."uid"(), "workspace_chats"."workspace_id")))));



CREATE POLICY "Workspace members can update settings" ON "public"."workspace_settings" TO "authenticated" USING ("public"."is_workspace_member"(( SELECT "auth"."uid"() AS "uid"), "workspace_id"));



CREATE POLICY "Workspace members can update their workspaces" ON "public"."workspaces" FOR UPDATE TO "authenticated" USING ("public"."is_workspace_member"(( SELECT "auth"."uid"() AS "uid"), "id"));



CREATE POLICY "Workspace members can update workspace chats" ON "public"."workspace_chats" FOR UPDATE TO "authenticated" USING ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



CREATE POLICY "Workspace members can update workspace documents" ON "public"."workspace_documents" FOR UPDATE TO "authenticated" USING ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



CREATE POLICY "Workspace members can view document suggestions" ON "public"."workspace_document_suggestions" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."workspace_documents"
  WHERE (("workspace_documents"."id" = "workspace_document_suggestions"."document_id") AND "public"."is_workspace_member"("auth"."uid"(), "workspace_documents"."workspace_id")))));



CREATE POLICY "Workspace members can view their customer" ON "public"."billing_customers" FOR SELECT USING ("public"."is_workspace_member"("workspace_id", ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Workspace members can view their invoices" ON "public"."billing_invoices" FOR SELECT USING ("public"."is_workspace_member"("public"."get_customer_workspace_id"("gateway_customer_id"), ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Workspace members can view their one time payments" ON "public"."billing_one_time_payments" FOR SELECT USING ("public"."is_workspace_member"("public"."get_customer_workspace_id"("gateway_customer_id"), ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Workspace members can view their subscriptions" ON "public"."billing_subscriptions" FOR SELECT USING ("public"."is_workspace_member"("public"."get_customer_workspace_id"("gateway_customer_id"), ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Workspace members can view workspace chats" ON "public"."workspace_chats" FOR SELECT USING ((("visibility" = 'public'::"public"."chat_visibility_type") OR "public"."is_workspace_member"("auth"."uid"(), "workspace_id")));



CREATE POLICY "Workspace members can view workspace documents" ON "public"."workspace_documents" FOR SELECT TO "authenticated" USING ("public"."is_workspace_member"("auth"."uid"(), "workspace_id"));



ALTER TABLE "public"."account_delete_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_customers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_invoices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_one_time_payments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_prices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_application_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_admin_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_application_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_chat_messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_chat_votes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_chats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_document_suggestions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_documents" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_invitations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspaces" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

















































































































































































GRANT ALL ON FUNCTION "public"."get_customer_workspace_id"("customer_id_arg" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_workspace_team_member_admins"("workspace_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_workspace_team_member_ids"("workspace_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_add_workspace_member_after_invitation_accepted"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_auth_user_created"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_workspace_created"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_admin"("user_id" "uuid", "workspace_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_workspace_member"("user_id" "uuid", "workspace_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_user_application_settings_email"() TO "service_role";


















GRANT ALL ON TABLE "public"."account_delete_tokens" TO "anon";
GRANT ALL ON TABLE "public"."account_delete_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."account_delete_tokens" TO "service_role";



GRANT ALL ON TABLE "public"."billing_customers" TO "anon";
GRANT ALL ON TABLE "public"."billing_customers" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_customers" TO "service_role";



GRANT ALL ON TABLE "public"."billing_invoices" TO "anon";
GRANT ALL ON TABLE "public"."billing_invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_invoices" TO "service_role";



GRANT ALL ON TABLE "public"."billing_one_time_payments" TO "anon";
GRANT ALL ON TABLE "public"."billing_one_time_payments" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_one_time_payments" TO "service_role";



GRANT ALL ON TABLE "public"."billing_prices" TO "anon";
GRANT ALL ON TABLE "public"."billing_prices" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_prices" TO "service_role";



GRANT ALL ON TABLE "public"."billing_products" TO "anon";
GRANT ALL ON TABLE "public"."billing_products" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_products" TO "service_role";



GRANT ALL ON TABLE "public"."billing_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."billing_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."user_application_settings" TO "anon";
GRANT ALL ON TABLE "public"."user_application_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."user_application_settings" TO "service_role";



GRANT ALL ON TABLE "public"."user_profiles" TO "anon";
GRANT ALL ON TABLE "public"."user_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."user_settings" TO "anon";
GRANT ALL ON TABLE "public"."user_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."user_settings" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_admin_settings" TO "anon";
GRANT ALL ON TABLE "public"."workspace_admin_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_admin_settings" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_application_settings" TO "anon";
GRANT ALL ON TABLE "public"."workspace_application_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_application_settings" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_chat_messages" TO "anon";
GRANT ALL ON TABLE "public"."workspace_chat_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_chat_messages" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_chat_votes" TO "anon";
GRANT ALL ON TABLE "public"."workspace_chat_votes" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_chat_votes" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_chats" TO "anon";
GRANT ALL ON TABLE "public"."workspace_chats" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_chats" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_document_suggestions" TO "anon";
GRANT ALL ON TABLE "public"."workspace_document_suggestions" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_document_suggestions" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_documents" TO "anon";
GRANT ALL ON TABLE "public"."workspace_documents" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_documents" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_invitations" TO "anon";
GRANT ALL ON TABLE "public"."workspace_invitations" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_invitations" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_members" TO "anon";
GRANT ALL ON TABLE "public"."workspace_members" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_members" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_settings" TO "anon";
GRANT ALL ON TABLE "public"."workspace_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_settings" TO "service_role";



GRANT ALL ON TABLE "public"."workspaces" TO "anon";
GRANT ALL ON TABLE "public"."workspaces" TO "authenticated";
GRANT ALL ON TABLE "public"."workspaces" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
