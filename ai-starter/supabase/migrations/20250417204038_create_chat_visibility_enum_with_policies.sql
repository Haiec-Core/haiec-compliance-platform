-- Create chat visibility enum type
CREATE TYPE public.chat_visibility_type AS ENUM('private', 'public');

-- Save existing policies
-- Save the policy for workspace_chats
DO $$ BEGIN -- Drop existing policies that depend on the visibility column
DROP POLICY IF EXISTS "Workspace members can view workspace chats" ON public.workspace_chats;
DROP POLICY IF EXISTS "Users can view messages in accessible chats" ON public.workspace_chat_messages;
DROP POLICY IF EXISTS "Users can view votes in accessible chats" ON public.workspace_chat_votes;
DROP POLICY IF EXISTS "Users can vote on messages in accessible chats" ON public.workspace_chat_votes;
END $$;

-- Up Migration: Convert workspace_chats.visibility column from VARCHAR to chat_visibility_type enum
-- Using a safer approach that works with RLS policies
ALTER TABLE public.workspace_chats
ADD COLUMN visibility_new public.chat_visibility_type NOT NULL DEFAULT 'private'::public.chat_visibility_type;

-- Copy data from the old column to the new one
UPDATE public.workspace_chats
SET visibility_new = visibility::public.chat_visibility_type;

-- Drop the old column
ALTER TABLE public.workspace_chats DROP COLUMN visibility CASCADE;

-- Rename the new column to the original name
ALTER TABLE public.workspace_chats
  RENAME COLUMN visibility_new TO visibility;

COMMENT ON COLUMN public.workspace_chats.visibility IS 'Visibility level of the chat - private (workspace members only) or public';

-- Recreate the policies with the new column type
CREATE POLICY "Workspace members can view workspace chats" ON public.workspace_chats FOR
SELECT USING (
    (
      visibility = 'public'::public.chat_visibility_type
    )
    OR is_workspace_member(auth.uid(), workspace_id)
  );

CREATE POLICY "Users can view messages in accessible chats" ON public.workspace_chat_messages FOR
SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE public.workspace_chats.id = public.workspace_chat_messages.chat_id
        AND (
          (
            public.workspace_chats.visibility = 'public'::public.chat_visibility_type
          )
          OR is_workspace_member(auth.uid(), public.workspace_chats.workspace_id)
        )
    )
  );

CREATE POLICY "Users can view votes in accessible chats" ON public.workspace_chat_votes FOR
SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE public.workspace_chats.id = (
          SELECT chat_id
          FROM public.workspace_chat_messages
          WHERE id = public.workspace_chat_votes.message_id
        )
        AND (
          (
            public.workspace_chats.visibility = 'public'::public.chat_visibility_type
          )
          OR is_workspace_member(auth.uid(), public.workspace_chats.workspace_id)
        )
    )
  );

CREATE POLICY "Users can vote on messages in accessible chats" ON public.workspace_chat_votes FOR
INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE public.workspace_chats.id = (
          SELECT chat_id
          FROM public.workspace_chat_messages
          WHERE id = public.workspace_chat_votes.message_id
        )
        AND (
          (
            public.workspace_chats.visibility = 'public'::public.chat_visibility_type
          )
          OR is_workspace_member(auth.uid(), public.workspace_chats.workspace_id)
        )
    )
  );

-- Down Migration: Convert workspace_chats.visibility column back to VARCHAR
/*
 -- Save existing policies
 DO $$
 BEGIN
 -- Drop existing policies that depend on the visibility column
 DROP POLICY IF EXISTS "Workspace members can view workspace chats" ON public.workspace_chats;
 DROP POLICY IF EXISTS "Users can view messages in accessible chats" ON public.workspace_chat_messages;
 DROP POLICY IF EXISTS "Users can view votes in accessible chats" ON public.workspace_chat_votes;
 DROP POLICY IF EXISTS "Users can vote on messages in accessible chats" ON public.workspace_chat_votes;
 END
 $$;

 -- Convert back to VARCHAR
 ALTER TABLE public.workspace_chats
 ADD COLUMN visibility_old VARCHAR NOT NULL DEFAULT 'private';

 UPDATE public.workspace_chats
 SET visibility_old = visibility::VARCHAR;

 ALTER TABLE public.workspace_chats
 DROP COLUMN visibility CASCADE;

 ALTER TABLE public.workspace_chats
 RENAME COLUMN visibility_old TO visibility;

 ALTER TABLE public.workspace_chats
 ADD CONSTRAINT workspace_chats_visibility_check CHECK (visibility IN ('public', 'private'));

 -- Recreate the policies with the old column type
 CREATE POLICY "Workspace members can view workspace chats" ON public.workspace_chats
 FOR SELECT
 USING (
 (visibility = 'public') OR
 is_workspace_member(auth.uid(), workspace_id)
 );

 CREATE POLICY "Users can view messages in accessible chats" ON public.workspace_chat_messages
 FOR SELECT
 USING (
 EXISTS (
 SELECT 1 FROM public.workspace_chats
 WHERE
 public.workspace_chats.id = public.workspace_chat_messages.chat_id
 AND (
 (public.workspace_chats.visibility = 'public')
 OR is_workspace_member(auth.uid(), public.workspace_chats.workspace_id)
 )
 )
 );

 CREATE POLICY "Users can view votes in accessible chats" ON public.workspace_chat_votes
 FOR SELECT
 USING (
 EXISTS (
 SELECT 1 FROM public.workspace_chats
 WHERE
 public.workspace_chats.id = (
 SELECT chat_id FROM public.workspace_chat_messages
 WHERE id = public.workspace_chat_votes.message_id
 )
 AND (
 (public.workspace_chats.visibility = 'public')
 OR is_workspace_member(auth.uid(), public.workspace_chats.workspace_id)
 )
 )
 );

 CREATE POLICY "Users can vote on messages in accessible chats" ON public.workspace_chat_votes
 FOR INSERT
 WITH CHECK (
 EXISTS (
 SELECT 1 FROM public.workspace_chats
 WHERE
 public.workspace_chats.id = (
 SELECT chat_id FROM public.workspace_chat_messages
 WHERE id = public.workspace_chat_votes.message_id
 )
 AND (
 (public.workspace_chats.visibility = 'public')
 OR is_workspace_member(auth.uid(), public.workspace_chats.workspace_id)
 )
 )
 );

 DROP TYPE public.chat_visibility_type;
 */
