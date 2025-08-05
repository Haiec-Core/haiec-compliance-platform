/*
 ______ ______ ______ _____  ____  ___   _____ _  __
 |  ____|  ____|  ____|  __ \|  _ \|__ \ / ____| |/ /
 | |__  | |__  | |__  | |  | | |_) |  ) | |    | ' /
 |  __| |  __| |  __| | |  | |  _ < / / | |    |  <
 | |    | |____| |____|  __/ | |_) / /_ | |____| . \
 |_|    |______|______|_|    |____/____(_)_____|_|\_\
 
 ____   ___    _    ____  ____  ____
 | __ ) / _ \  / \  |  _ \|  _ \/ ___|
 |  _ \| | | |/ _ \ | |_) | | | \___ \
 | |_) | |_| / ___ \|  _ <| |_| |___) |
 |____/ \___/_/   \_\_| \_\____/|____/
 
 *************************************************************
 * This migration adds support for feedback boards and reactions*
 * - Creates marketing_feedback_boards table                   *
 * - Creates reaction tracking tables                          *
 * - Modifies existing feedback tables to reference boards     *
 * - Implements RLS policies and security                      *
 *************************************************************
 */
-- Create reaction type enum
CREATE TYPE public.marketing_feedback_reaction_type AS ENUM ('like', 'heart', 'celebrate', 'upvote');

-- Create feedback boards table
CREATE TABLE IF NOT EXISTS public.marketing_feedback_boards (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_by UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  settings JSONB DEFAULT '{}'::jsonb NOT NULL
);

COMMENT ON TABLE public.marketing_feedback_boards IS 'Feedback boards that organize and group different feedback threads';

CREATE INDEX idx_marketing_feedback_boards_created_by ON public.marketing_feedback_boards(created_by);

ALTER TABLE public.marketing_feedback_boards OWNER TO postgres;
ALTER TABLE public.marketing_feedback_boards ENABLE ROW LEVEL SECURITY;

-- Add board reference to feedback threads
ALTER TABLE public.marketing_feedback_threads
ADD COLUMN board_id UUID DEFAULT NULL REFERENCES public.marketing_feedback_boards(id) ON DELETE CASCADE;

CREATE INDEX idx_marketing_feedback_threads_board_id ON public.marketing_feedback_threads(board_id);

-- Create feedback thread reactions table
CREATE TABLE IF NOT EXISTS public.marketing_feedback_thread_reactions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  thread_id UUID NOT NULL REFERENCES public.marketing_feedback_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  reaction_type public.marketing_feedback_reaction_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMENT ON TABLE public.marketing_feedback_thread_reactions IS 'Tracks user reactions to feedback threads';

CREATE UNIQUE INDEX idx_unique_thread_user_reaction ON public.marketing_feedback_thread_reactions(thread_id, user_id, reaction_type);
CREATE INDEX idx_marketing_feedback_thread_reactions_thread_id ON public.marketing_feedback_thread_reactions(thread_id);
CREATE INDEX idx_marketing_feedback_thread_reactions_user_id ON public.marketing_feedback_thread_reactions(user_id);

ALTER TABLE public.marketing_feedback_thread_reactions OWNER TO postgres;
ALTER TABLE public.marketing_feedback_thread_reactions ENABLE ROW LEVEL SECURITY;

-- Create feedback comment reactions table
CREATE TABLE IF NOT EXISTS public.marketing_feedback_comment_reactions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  comment_id UUID NOT NULL REFERENCES public.marketing_feedback_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  reaction_type public.marketing_feedback_reaction_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMENT ON TABLE public.marketing_feedback_comment_reactions IS 'Tracks user reactions to feedback comments';

CREATE UNIQUE INDEX idx_unique_comment_user_reaction ON public.marketing_feedback_comment_reactions(comment_id, user_id, reaction_type);
CREATE INDEX idx_marketing_feedback_comment_reactions_comment_id ON public.marketing_feedback_comment_reactions(comment_id);
CREATE INDEX idx_marketing_feedback_comment_reactions_user_id ON public.marketing_feedback_comment_reactions(user_id);

ALTER TABLE public.marketing_feedback_comment_reactions OWNER TO postgres;
ALTER TABLE public.marketing_feedback_comment_reactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Feedback Boards Policies
CREATE POLICY "Public boards are viewable by everyone" ON public.marketing_feedback_boards FOR
SELECT USING (is_active = TRUE);

CREATE POLICY "Only admins can manage boards" ON public.marketing_feedback_boards FOR ALL USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
);

-- Thread Reactions Policies
CREATE POLICY "Users can view all thread reactions" ON public.marketing_feedback_thread_reactions FOR
SELECT USING (TRUE);

CREATE POLICY "Users can add their own reactions" ON public.marketing_feedback_thread_reactions FOR
INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own reactions" ON public.marketing_feedback_thread_reactions FOR DELETE USING (auth.uid() = user_id);

-- Comment Reactions Policies
CREATE POLICY "Users can view all comment reactions" ON public.marketing_feedback_comment_reactions FOR
SELECT USING (TRUE);

CREATE POLICY "Users can add their own comment reactions" ON public.marketing_feedback_comment_reactions FOR
INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own comment reactions" ON public.marketing_feedback_comment_reactions FOR DELETE USING (auth.uid() = user_id);