-- Add document kind enum to workspace_documents table
-- Up migration
-- Create document kind enum type if it doesn't exist
DO $$ BEGIN CREATE TYPE document_kind AS ENUM ('text', 'code', 'image', 'sheet');
EXCEPTION
WHEN duplicate_object THEN NULL;
END $$;

-- Add kind column to workspace_documents
ALTER TABLE public.workspace_documents
ADD COLUMN IF NOT EXISTS kind document_kind NOT NULL DEFAULT 'text'::document_kind CHECK (kind IN ('text', 'code', 'image', 'sheet'));

COMMENT ON COLUMN public.workspace_documents.kind IS 'Type of document content (text, code, image, sheet)';

-- Add document_created_at column to workspace_document_suggestions
ALTER TABLE public.workspace_document_suggestions
ADD COLUMN IF NOT EXISTS document_created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW();

COMMENT ON COLUMN public.workspace_document_suggestions.document_created_at IS 'Timestamp when the document was created';

-- Down migration
-- ALTER TABLE public.workspace_document_suggestions DROP COLUMN IF EXISTS document_created_at;
-- ALTER TABLE public.workspace_documents DROP COLUMN IF EXISTS kind;
-- DROP TYPE IF EXISTS document_kind;