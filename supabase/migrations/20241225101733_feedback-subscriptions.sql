/*
 ______ ______ ______ _____  ____          _____ _  __
 |  ___|| ___ \|  ___|  _  \|  _ \   /\   / ____| |/ /
 | |__  | |_/ /| |_  | | | || |_) | /  \ | |    | ' /
 |  __| |  __/ |  _| | | | ||  _ < / /\ \| |    |  <
 | |___ | |    | |   | |/ / | |_) / ____ \ |____| . \
 \____/ \_|    \_|   |___/  |____/_/    \_\_____|_|\_\
 
 _______ ______ _______ _______ ______ ____   _____
 |__   __|  ____|__   __|__   __|  ____|  _ \ / ____|
 | |  | |__     | |     | |  | |__  | |_) | (___
 | |  |  __|    | |     | |  |  __| |  _ < \___ \
 | |  | |____   | |     | |  | |____| |_) |____) |
 |_|  |______|  |_|     |_|  |______|____/|_____/
 
 *************************************************
 * Simple tables for board and thread             *
 * subscriptions with basic RLS policies          *
 *************************************************
 */
-- Create board subscriptions table
CREATE TABLE IF NOT EXISTS public.marketing_feedback_board_subscriptions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  board_id UUID NOT NULL REFERENCES public.marketing_feedback_boards(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMENT ON TABLE public.marketing_feedback_board_subscriptions IS 'Tracks user subscriptions to feedback boards';

CREATE UNIQUE INDEX idx_unique_board_subscription ON public.marketing_feedback_board_subscriptions(user_id, board_id);

CREATE INDEX idx_marketing_feedback_board_subscriptions_user_id ON public.marketing_feedback_board_subscriptions(user_id);

CREATE INDEX idx_marketing_feedback_board_subscriptions_board_id ON public.marketing_feedback_board_subscriptions(board_id);

ALTER TABLE public.marketing_feedback_board_subscriptions OWNER TO postgres;
ALTER TABLE public.marketing_feedback_board_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create thread subscriptions table
CREATE TABLE IF NOT EXISTS public.marketing_feedback_thread_subscriptions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  thread_id UUID NOT NULL REFERENCES public.marketing_feedback_threads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMENT ON TABLE public.marketing_feedback_thread_subscriptions IS 'Tracks user subscriptions to feedback threads';

CREATE UNIQUE INDEX idx_unique_thread_subscription ON public.marketing_feedback_thread_subscriptions(user_id, thread_id);

CREATE INDEX idx_marketing_feedback_thread_subscriptions_user_id ON public.marketing_feedback_thread_subscriptions(user_id);

CREATE INDEX idx_marketing_feedback_thread_subscriptions_thread_id ON public.marketing_feedback_thread_subscriptions(thread_id);

ALTER TABLE public.marketing_feedback_thread_subscriptions OWNER TO postgres;
ALTER TABLE public.marketing_feedback_thread_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for board subscriptions
CREATE POLICY "Users can view their own board subscriptions" ON public.marketing_feedback_board_subscriptions FOR
SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own board subscriptions" ON public.marketing_feedback_board_subscriptions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS Policies for thread subscriptions
CREATE POLICY "Users can view their own thread subscriptions" ON public.marketing_feedback_thread_subscriptions FOR
SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own thread subscriptions" ON public.marketing_feedback_thread_subscriptions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);