-- Create the auth hook function
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb) RETURNS jsonb language plpgsql immutable AS $$
DECLARE claims jsonb;
user_role public.app_role;
BEGIN -- Check if the user is marked as admin in the profiles table
SELECT role INTO user_role
FROM public.user_roles
WHERE user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    IF user_role IS NOT NULL THEN -- Set the claim
claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
ELSE claims := jsonb_set(claims, '{user_role}', 'null');
END IF;

    -- Update the 'claims' object in the original event
event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
RETURN event;
END;
$$;

GRANT USAGE ON schema public TO supabase_auth_admin;

GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook
FROM authenticated,
  anon;

GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;

REVOKE ALL ON TABLE public.user_roles
FROM authenticated,
  anon;

CREATE policy "Allow auth admin to read user roles" ON public.user_roles AS permissive FOR
SELECT TO supabase_auth_admin USING (TRUE)