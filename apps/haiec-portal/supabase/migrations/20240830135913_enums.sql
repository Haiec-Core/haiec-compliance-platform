/*
 _____ _   _ _   _ __  __  _____
 |  ___| \ | | | | |  \/  |/ ____|
 | |__ |  \| | | | | \  / | (___
 |  __|| . ` | | | | |\/| |\___ \
 | |___| |\  | |_| | |  | |____) |
 |_____|_| \_|\___/|_|  |_|_____/
 
 *********************************************
 *                                           *
 *  This file contains enum type definitions *
 *  for the database schema. These enums     *
 *  are used to constrain values in various  *
 *  tables and ensure data consistency.      *
 *                                           *
 *********************************************
 */
CREATE TYPE "public"."app_role" AS ENUM ('admin');


CREATE TYPE "public"."marketing_blog_post_status" AS ENUM ('draft', 'published');


CREATE TYPE "public"."marketing_feedback_thread_priority" AS ENUM ('low', 'medium', 'high');


CREATE TYPE "public"."marketing_feedback_thread_status" AS ENUM (
  'open',
  'under_review',
  'planned',
  'closed',
  'in_progress',
  'completed',
  'moderator_hold'
);

CREATE TYPE public.marketing_feedback_moderator_hold_category AS ENUM ('spam', 'off_topic', 'inappropriate', 'other');


CREATE TYPE "public"."marketing_feedback_thread_type" AS ENUM ('bug', 'feature_request', 'general');


-- CREATE TYPE "public"."organization_join_invitation_link_status" AS ENUM (
--   'active',
--   'finished_accepted',
--   'finished_declined',
--   'inactive'
-- );
-- ALTER TYPE "public"."organization_join_invitation_link_status" OWNER TO "postgres";
CREATE TYPE "public"."organization_joining_status" AS ENUM (
  'invited',
  'joinied',
  'declined_invitation',
  'joined'
);


CREATE TYPE "public"."organization_member_role" AS ENUM ('owner', 'admin', 'member', 'readonly');


CREATE TYPE "public"."pricing_plan_interval" AS ENUM ('day', 'week', 'month', 'year');


CREATE TYPE "public"."pricing_type" AS ENUM ('one_time', 'recurring');


CREATE TYPE "public"."project_status" AS ENUM (
  'draft',
  'pending_approval',
  'approved',
  'completed'
);


CREATE TYPE "public"."project_team_member_role" AS ENUM ('admin', 'member', 'readonly');


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


-- Create enum types
CREATE TYPE public.workspace_member_role_type AS ENUM('owner', 'admin', 'member', 'readonly');
CREATE TYPE public.workspace_invitation_link_status AS ENUM(
  'active',
  'finished_accepted',
  'finished_declined',
  'inactive'
);
CREATE TYPE public.workspace_membership_type AS ENUM ('solo', 'team');


CREATE TYPE public.marketing_changelog_status AS ENUM ('draft', 'published');