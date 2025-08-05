/*
 _____  ______ _______ _______ _____ _   _  _____ _____
 / ____|  ____|__   __|__   __|_   _| \ | |/ ____|  __ \
 | (___ | |__     | |     | |    | | |  \| | |  __| |__) |
 \___ \|  __|    | |     | |    | | | . ` | | |_ |  _  /
 ____) | |____   | |     | |   _| |_| |\  | |__| | | \ \
 |_____/|______|  |_|     |_|  |_____|_| \_|\_____|_|  \_\
 
 ********************************************************************
 *                                                                    *
 * This file creates the app_settings table which stores              *
 * application-wide settings in a single row. The table uses a        *
 * boolean primary key and check constraint to ensure only one row    *
 * can exist.                                                         *
 *                                                                    *
 ********************************************************************
 */
CREATE TABLE IF NOT EXISTS "public"."app_settings" (
  "id" boolean PRIMARY KEY DEFAULT TRUE NOT NULL,
  "settings" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "updated_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT "single_row" CHECK (id)
);

COMMENT ON TABLE "public"."app_settings" IS 'Application-wide settings stored in a single row';

ALTER TABLE "public"."app_settings" OWNER TO "postgres";
ALTER TABLE "public"."app_settings" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view settings" ON "public"."app_settings";
DROP POLICY IF EXISTS "Admins can update settings" ON "public"."app_settings";

-- Create new policies using the helper function
CREATE POLICY "Admins can view settings" ON "public"."app_settings" FOR
SELECT TO authenticated USING (public.is_application_admin(auth.uid()));

CREATE POLICY "Admins can update settings" ON "public"."app_settings" FOR
UPDATE TO authenticated USING (public.is_application_admin(auth.uid())) WITH CHECK (public.is_application_admin(auth.uid()));