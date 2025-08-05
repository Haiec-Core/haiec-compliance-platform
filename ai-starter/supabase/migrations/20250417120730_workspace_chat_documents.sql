/*

 This file contains the database schema for workspace-based chat and document system:
 - workspace_chats: Stores chat sessions associated with workspaces
 - workspace_chat_messages: Stores messages for each chat
 - workspace_chat_votes: Stores upvotes/downvotes for messages
 - workspace_documents: Stores documents associated with workspaces
 - workspace_document_suggestions: Stores suggestions for document improvements

 These tables enable collaborative communication and document management within workspaces.
 */
-- Workspace Chat Table
CREATE TABLE IF NOT EXISTS public.workspace_chats (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  title TEXT NOT NULL,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  visibility VARCHAR NOT NULL DEFAULT 'private' CHECK (visibility IN ('public', 'private'))
);

COMMENT ON TABLE public.workspace_chats IS 'Stores chat sessions associated with workspaces';
CREATE INDEX idx_workspace_chats_workspace_id ON public.workspace_chats(workspace_id);

-- Workspace Chat Messages Table
CREATE TABLE IF NOT EXISTS public.workspace_chat_messages (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  chat_id UUID NOT NULL REFERENCES public.workspace_chats(id) ON DELETE CASCADE,
  role VARCHAR NOT NULL,
  parts JSONB NOT NULL,
  attachments JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.workspace_chat_messages IS 'Stores messages for workspace chats';
CREATE INDEX idx_workspace_chat_messages_chat_id ON public.workspace_chat_messages(chat_id);

-- Workspace Chat Votes Table
CREATE TABLE IF NOT EXISTS public.workspace_chat_votes (
  chat_id UUID NOT NULL REFERENCES public.workspace_chats(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES public.workspace_chat_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  is_upvoted BOOLEAN NOT NULL,
  PRIMARY KEY (chat_id, message_id, user_id)
);

COMMENT ON TABLE public.workspace_chat_votes IS 'Stores user votes on chat messages';
CREATE INDEX idx_workspace_chat_votes_message_id ON public.workspace_chat_votes(message_id);
CREATE INDEX idx_workspace_chat_votes_user_id ON public.workspace_chat_votes(user_id);

-- Workspace Document Table
CREATE TABLE IF NOT EXISTS public.workspace_documents (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.workspace_documents IS 'Stores documents associated with workspaces';
CREATE INDEX idx_workspace_documents_workspace_id ON public.workspace_documents(workspace_id);

-- Workspace Document Suggestions Table
CREATE TABLE IF NOT EXISTS public.workspace_document_suggestions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4() NOT NULL,
  document_id UUID NOT NULL REFERENCES public.workspace_documents(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  suggested_text TEXT NOT NULL,
  description TEXT,
  is_resolved BOOLEAN DEFAULT FALSE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.workspace_document_suggestions IS 'Stores suggestions for improvements to workspace documents';
CREATE INDEX idx_workspace_document_suggestions_document_id ON public.workspace_document_suggestions(document_id);
CREATE INDEX idx_workspace_document_suggestions_user_id ON public.workspace_document_suggestions(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE public.workspace_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_chat_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_document_suggestions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workspace_chats
CREATE POLICY "Workspace members can view workspace chats" ON public.workspace_chats FOR
SELECT TO authenticated USING (
    public.is_workspace_member(auth.uid(), workspace_id)
    OR visibility = 'public'
  );

CREATE POLICY "Workspace members can insert workspace chats" ON public.workspace_chats FOR
INSERT TO authenticated WITH CHECK (
    public.is_workspace_member(auth.uid(), workspace_id)
  );

CREATE POLICY "Workspace members can update workspace chats" ON public.workspace_chats FOR
UPDATE TO authenticated USING (
    public.is_workspace_member(auth.uid(), workspace_id)
  );

CREATE POLICY "Workspace members can delete workspace chats" ON public.workspace_chats FOR DELETE TO authenticated USING (
  public.is_workspace_member(auth.uid(), workspace_id)
);

-- RLS Policies for workspace_chat_messages
CREATE POLICY "Users can view messages in accessible chats" ON public.workspace_chat_messages FOR
SELECT TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE id = chat_id
        AND (
          public.is_workspace_member(auth.uid(), workspace_id)
          OR visibility = 'public'
        )
    )
  );

CREATE POLICY "Workspace members can insert messages in their chats" ON public.workspace_chat_messages FOR
INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE id = chat_id
        AND public.is_workspace_member(auth.uid(), workspace_id)
    )
  );

CREATE POLICY "Workspace members can update messages in their chats" ON public.workspace_chat_messages FOR
UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE id = chat_id
        AND public.is_workspace_member(auth.uid(), workspace_id)
    )
  );

CREATE POLICY "Workspace members can delete messages in their chats" ON public.workspace_chat_messages FOR DELETE TO authenticated USING (
  EXISTS (
    SELECT 1
    FROM public.workspace_chats
    WHERE id = chat_id
      AND public.is_workspace_member(auth.uid(), workspace_id)
  )
);

-- RLS Policies for workspace_chat_votes
CREATE POLICY "Users can view votes in accessible chats" ON public.workspace_chat_votes FOR
SELECT TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE id = chat_id
        AND (
          public.is_workspace_member(auth.uid(), workspace_id)
          OR visibility = 'public'
        )
    )
  );

CREATE POLICY "Users can vote on messages in accessible chats" ON public.workspace_chat_votes FOR
INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.workspace_chats
      WHERE id = chat_id
        AND (
          public.is_workspace_member(auth.uid(), workspace_id)
          OR visibility = 'public'
        )
    )
    AND user_id = auth.uid()
  );

CREATE POLICY "Users can update their own votes" ON public.workspace_chat_votes FOR
UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own votes" ON public.workspace_chat_votes FOR DELETE TO authenticated USING (user_id = auth.uid());

-- RLS Policies for workspace_documents
CREATE POLICY "Workspace members can view workspace documents" ON public.workspace_documents FOR
SELECT TO authenticated USING (
    public.is_workspace_member(auth.uid(), workspace_id)
  );

CREATE POLICY "Workspace members can insert workspace documents" ON public.workspace_documents FOR
INSERT TO authenticated WITH CHECK (
    public.is_workspace_member(auth.uid(), workspace_id)
  );

CREATE POLICY "Workspace members can update workspace documents" ON public.workspace_documents FOR
UPDATE TO authenticated USING (
    public.is_workspace_member(auth.uid(), workspace_id)
  );

CREATE POLICY "Workspace members can delete workspace documents" ON public.workspace_documents FOR DELETE TO authenticated USING (
  public.is_workspace_member(auth.uid(), workspace_id)
);

-- RLS Policies for workspace_document_suggestions
CREATE POLICY "Workspace members can view document suggestions" ON public.workspace_document_suggestions FOR
SELECT TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM public.workspace_documents
      WHERE id = document_id
        AND public.is_workspace_member(auth.uid(), workspace_id)
    )
  );

CREATE POLICY "Workspace members can create document suggestions" ON public.workspace_document_suggestions FOR
INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.workspace_documents
      WHERE id = document_id
        AND public.is_workspace_member(auth.uid(), workspace_id)
    )
    AND user_id = auth.uid()
  );

CREATE POLICY "Users can update their own document suggestions" ON public.workspace_document_suggestions FOR
UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Document owners and suggestion creators can delete suggestions" ON public.workspace_document_suggestions FOR DELETE TO authenticated USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1
    FROM public.workspace_documents
    WHERE id = document_id
      AND public.is_workspace_admin(auth.uid(), workspace_id)
  )
);