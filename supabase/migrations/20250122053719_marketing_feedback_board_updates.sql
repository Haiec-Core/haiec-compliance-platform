-- Add color column to marketing_feedback_boards
ALTER TABLE public.marketing_feedback_boards
ADD COLUMN IF NOT EXISTS color TEXT DEFAULT NULL;

COMMENT ON COLUMN public.marketing_feedback_boards.color IS 'Optional color identifier for the board';
