/*
 This function, "handle_auth_user_created", is a trigger function that is executed
 after a new user is inserted into the auth.users table. It performs two main tasks:

 1. It creates a new entry in the public.user_profiles table with the same id
 as the newly created user. This ensures that each user has a corresponding
 profile record.

 2. It also creates a new entry in the public.user_settings table with the
 same id as the newly created user. This table likely stores sensitive or

 private information about the user that needs to be kept separate from
 the public profile.

 The function is set to run with SECURITY DEFINER, which means it executes with
 the privileges of the user who created it (in this case, postgres), rather than
 the user who calls it. This allows the function to insert into tables that the
 triggering user might not have direct access to.

 After performing these insertions, the function returns the NEW record, which
 represents the newly inserted user in the auth.users table.
 */
CREATE OR REPLACE FUNCTION "public"."handle_auth_user_created"() RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp,
  auth AS $$ BEGIN
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
REVOKE ALL ON FUNCTION "public"."handle_auth_user_created"()
FROM anon,
  authenticated;
GRANT ALL ON FUNCTION "public"."handle_auth_user_created"() TO "service_role";


/*
 This function, "handle_create_welcome_notification", is a trigger function that is executed
 after a new user is inserted into the auth.users table. It performs the following task:

 1. It creates a new entry in the public.user_notifications table for the newly created user.
 This entry serves as a welcome notification with a payload of type "welcome".

 The function is set to run with SECURITY DEFINER, which means it executes with
 the privileges of the user who created it (likely postgres), rather than
 the user who calls it. This allows the function to insert into tables that the
 triggering user might not have direct access to.

 After inserting the welcome notification, the function returns the NEW record, which
 represents the newly inserted user in the auth.users table.
 */
CREATE OR REPLACE FUNCTION "public"."handle_create_welcome_notification"() RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER
SET search_path = public,
  pg_temp AS $$ BEGIN
INSERT INTO public.user_notifications (user_id, payload)
VALUES (NEW.id, '{ "type": "welcome" }'::JSONB);
RETURN NEW;
END;
$$;

/*
 This function, "update_user_application_settings_email", is a trigger function that is executed
 after an update on the auth.users table. It performs the following task:

 1. It updates the email_readonly column in the public.user_application_settings table
 with the email from the auth.users table for the corresponding user.

 The function is set to run with SECURITY DEFINER, which means it executes with
 the privileges of the user who created it (likely postgres), rather than
 the user who calls it. This allows the function to update tables that the
 triggering user might not have direct access to.

 After updating the email_readonly, the function returns the NEW record, which
 represents the updated user in the auth.users table.

 This makes the email available to be queried using supabase client SDK.
 */
/*
 * Sync email for convenience
 */
-- Function to update email_readonly in user_application_settings
CREATE OR REPLACE FUNCTION public.update_user_application_settings_email() RETURNS TRIGGER
SET search_path = public,
  pg_temp AS $$ BEGIN
UPDATE public.user_application_settings
SET email_readonly = NEW.email
WHERE id = NEW.id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update email_readonly when auth.users email is updated
CREATE OR REPLACE TRIGGER on_auth_user_email_updated
AFTER
UPDATE OF email ON auth.users FOR EACH ROW EXECUTE FUNCTION public.update_user_application_settings_email();

-- Revoke execute permission from PUBLIC
REVOKE EXECUTE ON FUNCTION public.update_user_application_settings_email()
FROM anon,
  authenticated;

-- Grant execute permission only to postgres and service_role
GRANT EXECUTE ON FUNCTION public.update_user_application_settings_email() TO postgres,
  service_role;


ALTER FUNCTION "public"."handle_create_welcome_notification"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "public"."handle_create_welcome_notification"()
FROM anon,
  authenticated;
GRANT ALL ON FUNCTION "public"."handle_create_welcome_notification"() TO "service_role";


CREATE OR REPLACE TRIGGER "on_auth_user_created_create_profile"
AFTER
INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auth_user_created"();

CREATE OR REPLACE TRIGGER "on_auth_user_created_create_welcome_notification"
AFTER
INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_create_welcome_notification"();
